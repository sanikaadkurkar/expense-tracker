import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Personal Care',
  'Travel',
  'Other'
];

const ExpenseForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || '',
        amount: initialData.amount || '',
        comments: initialData.comments || ''
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    await onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    // Reset form if not editing
    if (!initialData) {
      setFormData({
        category: '',
        amount: '',
        comments: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="glass-card">
      <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
        {initialData ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>
              {errors.category}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Amount *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="form-input"
            step="0.01"
          />
          {errors.amount && (
            <div className="alert alert-error" style={{ marginTop: '0.5rem' }}>
              {errors.amount}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Comments (Optional)</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Add any additional notes..."
            className="form-textarea"
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {initialData ? 'Update Expense' : 'Add Expense'}
          </button>
          {initialData && onCancel && (
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
