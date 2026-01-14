import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { expenseAPI } from '../utils/api';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getAll();
      setExpenses(response.data.expenses);
      setError('');
    } catch (err) {
      setError('Failed to load expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await expenseAPI.create(expenseData);
      setExpenses([response.data.expense, ...expenses]);
      setSuccessMessage('Expense added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  };

  const handleEditExpense = async (expenseData) => {
    try {
      const response = await expenseAPI.update(editingExpense.id, expenseData);
      setExpenses(expenses.map(exp => 
        exp.id === editingExpense.id ? response.data.expense : exp
      ));
      setEditingExpense(null);
      setSuccessMessage('Expense updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update expense');
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      setExpenses(expenses.filter(exp => exp.id !== id));
      setSuccessMessage('Expense deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
        <div className="dashboard-header">
          <h1 className="dashboard-title">💼 Expense Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Track and manage all your expenses in one place
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <div className="dashboard-grid">
          <div>
            <ExpenseForm 
              onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
              initialData={editingExpense}
              onCancel={editingExpense ? handleCancelEdit : null}
            />
          </div>
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <ExpenseTable 
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDeleteExpense}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
