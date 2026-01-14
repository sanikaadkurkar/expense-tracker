import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">💰 Expense Tracker</div>
        
        {user && (
          <ul className="navbar-nav">
            <li>
              <Link 
                to="/dashboard" 
                className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/analytics" 
                className={`navbar-link ${isActive('/analytics') ? 'active' : ''}`}
              >
                Analytics
              </Link>
            </li>
            <li>
              <span className="navbar-link" style={{ cursor: 'default' }}>
                👤 {user.username}
              </span>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
