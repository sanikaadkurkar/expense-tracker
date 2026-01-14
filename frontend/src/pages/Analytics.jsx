import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PieChart from '../components/PieChart';
import { analyticsAPI } from '../utils/api';

const Analytics = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsAPI.getCategoryDistribution();
      setChartData(response.data.distribution);
      setError('');
    } catch (err) {
      setError('Failed to load analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalAmount = chartData.reduce((sum, item) => sum + item.total_amount, 0);

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: 'var(--spacing-xl)', paddingBottom: 'var(--spacing-xl)' }}>
        <div className="dashboard-header">
          <h1 className="dashboard-title">📊 Expense Analytics</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
            Visualize your spending patterns by category
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="spinner" />
        ) : chartData.length === 0 ? (
          <div className="glass-card text-center">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              📈 No Data Available
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add some expenses to see your analytics!
            </p>
          </div>
        ) : (
          <>
            <div className="glass-card" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
                💰 Category-wise Distribution
              </h2>
              <PieChart data={chartData} />
            </div>

            <div className="glass-card">
              <h2 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                📋 Category Breakdown
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-md)'
              }}>
                {chartData.map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      background: 'var(--surface-light)',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-xs)',
                      color: 'var(--text-primary)'
                    }}>
                      {item.category}
                    </div>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700',
                      color: 'var(--success-color)',
                      marginBottom: 'var(--spacing-xs)'
                    }}>
                      {formatAmount(item.total_amount)}
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)'
                    }}>
                      {item.count} {item.count === 1 ? 'expense' : 'expenses'}
                      {' • '}
                      {((item.total_amount / totalAmount) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                background: 'var(--primary-gradient)',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  TOTAL SPENDING
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800' }}>
                  {formatAmount(totalAmount)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Analytics;
