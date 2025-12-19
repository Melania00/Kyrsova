import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1rem 2rem', 
      backgroundColor: '#343a40', 
      color: 'white',
      marginBottom: '20px'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Hotel</Link>
      </div>

      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, alignItems: 'center' }}>
        <li>
          <Link to="/catalog" style={{ color: 'white', textDecoration: 'none' }}>Catalog</Link>
        </li>

        {customer ? (
          <>
            {/* Show Admin Dashboard only if the role is Admin */}
            {customer && customer.role === 'Admin' && (
                <>
                  <li>
                    <Link to="/admin/dashboard" style={{ color: '#ffc107', fontWeight: 'bold', textDecoration: 'none' }}>
                      Admin Panel
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/reports" style={{ color: '#ffc107', fontWeight: 'bold', textDecoration: 'none', marginLeft: '15px' }}>
                      Reports
                    </Link>
                  </li>
                </>
            )}

            <li>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                My Profile ({customer.bonusPoints} pts)
              </Link>
            </li>

            <li>
              <button 
                onClick={handleLogout}
                style={{ 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  borderRadius: '4px', 
                  cursor: 'pointer' 
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            </li>
            <li>
              <Link to="/register" style={{ 
                backgroundColor: '#007bff', 
                padding: '5px 15px', 
                borderRadius: '4px', 
                color: 'white', 
                textDecoration: 'none' 
              }}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;