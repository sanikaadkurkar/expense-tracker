from flask import Blueprint, request, jsonify
from app.models import db, Expense
from app.auth import token_required
from datetime import datetime

expenses_bp = Blueprint('expenses', __name__)

@expenses_bp.route('', methods=['GET'])
@token_required
def get_expenses(current_user):
    """Get all expenses for the authenticated user"""
    expenses = Expense.query.filter_by(user_id=current_user.id)\
        .order_by(Expense.created_at.desc()).all()
    
    return jsonify({
        'expenses': [expense.to_dict() for expense in expenses]
    }), 200


@expenses_bp.route('', methods=['POST'])
@token_required
def create_expense(current_user):
    """Create a new expense"""
    data = request.get_json()
    
    # Validate input
    if not data or not data.get('category') or not data.get('amount'):
        return jsonify({'error': 'Missing required fields (category, amount)'}), 400
    
    try:
        amount = float(data['amount'])
        if amount <= 0:
            return jsonify({'error': 'Amount must be positive'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid amount format'}), 400
    
    # Create new expense
    expense = Expense(
        user_id=current_user.id,
        category=data['category'],
        amount=amount,
        comments=data.get('comments', '')
    )
    
    try:
        db.session.add(expense)
        db.session.commit()
        
        return jsonify({
            'message': 'Expense created successfully',
            'expense': expense.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@expenses_bp.route('/<int:expense_id>', methods=['PUT'])
@token_required
def update_expense(current_user, expense_id):
    """Update an existing expense"""
    expense = Expense.query.filter_by(id=expense_id, user_id=current_user.id).first()
    
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    
    data = request.get_json()
    
    # Update fields
    if 'category' in data:
        expense.category = data['category']
    
    if 'amount' in data:
        try:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({'error': 'Amount must be positive'}), 400
            expense.amount = amount
        except ValueError:
            return jsonify({'error': 'Invalid amount format'}), 400
    
    if 'comments' in data:
        expense.comments = data['comments']
    
    expense.updated_at = datetime.utcnow()
    
    try:
        db.session.commit()
        
        return jsonify({
            'message': 'Expense updated successfully',
            'expense': expense.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@expenses_bp.route('/<int:expense_id>', methods=['DELETE'])
@token_required
def delete_expense(current_user, expense_id):
    """Delete an expense"""
    expense = Expense.query.filter_by(id=expense_id, user_id=current_user.id).first()
    
    if not expense:
        return jsonify({'error': 'Expense not found'}), 404
    
    try:
        db.session.delete(expense)
        db.session.commit()
        
        return jsonify({
            'message': 'Expense deleted successfully'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
