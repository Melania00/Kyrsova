import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#343a40',
      color: 'white',
      padding: '40px 20px 20px 20px',
      marginTop: '50px',
      borderTop: '5px solid #007bff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px'
      }}>
        {/* About Section */}
        <div>
          <h4 style={{ color: '#007bff', marginBottom: '15px' }}>Hotel Management System</h4>
          <p style={{ fontSize: '0.9rem', color: '#adb5bd', lineHeight: '1.6' }}>
            A comprehensive solution for room booking, customer management, and financial reporting.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: '15px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/" style={{ color: '#adb5bd', textDecoration: 'none' }}>Room Catalog</Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/login" style={{ color: '#adb5bd', textDecoration: 'none' }}>Login</Link>
            </li>
            <li style={{ marginBottom: '8px' }}>
              <Link to="/register" style={{ color: '#adb5bd', textDecoration: 'none' }}>Register</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 style={{ marginBottom: '15px' }}>Contact</h4>
          <p style={{ fontSize: '0.9rem', color: '#adb5bd', margin: '5px 0' }}>123 Hospitality Lane</p>
          <p style={{ fontSize: '0.9rem', color: '#adb5bd', margin: '5px 0' }}>support@hotelsystem.com</p>
          <p style={{ fontSize: '0.9rem', color: '#adb5bd', margin: '5px 0' }}>+1 (555) 000-1234</p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #495057',
        fontSize: '0.8rem',
        color: '#6c757d'
      }}>
        © {currentYear} Hotel Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;