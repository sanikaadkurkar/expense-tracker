from flask import Blueprint, jsonify
from app.models import db, Expense
from app.auth import token_required
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/category-distribution', methods=['GET'])
@token_required
def category_distribution(current_user):
    """Get category-wise expense distribution for pie chart"""
    
    # Aggregate expenses by category
    results = db.session.query(
        Expense.category,
        func.sum(Expense.amount).label('total_amount'),
        func.count(Expense.id).label('count')
    ).filter_by(user_id=current_user.id)\
     .group_by(Expense.category)\
     .all()
    
    # Format data for pie chart
    distribution = [
        {
            'category': result.category,
            'total_amount': float(result.total_amount),
            'count': result.count
        }
        for result in results
    ]
    
    return jsonify({
        'distribution': distribution
    }), 200
