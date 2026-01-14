import React, { useState } from 'react';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await onDelete(id);
    }
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="glass-card text-center">
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          📊 No Expenses Yet
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Start tracking your expenses by adding one above!
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
        📋 Your Expenses
      </h2>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Comments</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-gradient)',
                    fontSize: '0.875rem'
                  }}>
                    {expense.category}
                  </span>
                </td>
                <td style={{ fontWeight: '600', color: 'var(--success-color)' }}>
                  {formatAmount(expense.amount)}
                </td>
                <td style={{ color: 'var(--text-secondary)', maxWidth: '200px' }}>
                  {expense.comments || '-'}
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {formatDate(expense.created_at)}
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  {formatDate(expense.updated_at)}
                </td>
                <td>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(expense)}
                      className="btn btn-sm btn-primary"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="btn btn-sm btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ 
        marginTop: 'var(--spacing-md)', 
        padding: 'var(--spacing-md)',
        background: 'var(--surface-light)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>
          Total Expenses: <strong>{expenses.length}</strong>
        </span>
        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--success-color)' }}>
          Total: {formatAmount(expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0))}
        </span>
      </div>
    </div>
  );
};

export default ExpenseTable;
