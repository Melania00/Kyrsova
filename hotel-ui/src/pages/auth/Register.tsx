import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      // Redirect to login after successful registration
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Client Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name</label>
          <input type="text" required style={{ width: '100%' }}
            onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input type="email" required style={{ width: '100%' }}
            onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Phone Number</label>
          <input type="text" required style={{ width: '100%' }}
            onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password</label>
          <input type="password" required style={{ width: '100%' }}
            onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '10px' }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;