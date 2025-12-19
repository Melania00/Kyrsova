import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.1.0&auto=format&fit=crop&w=1920&q=80")',
        height: '60vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Welcome to TestLab Hotel</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}>
          Experience luxury and comfort in the heart of the city. Book your perfect stay today.
        </p>
        <button 
          onClick={() => navigate('/catalog')}
          style={{
            padding: '15px 40px',
            fontSize: '1.1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          View Our Rooms
        </button>
      </section>

      {/* Features/Services Section */}
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Why Choose Us?</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginBottom: '50px',
        color: 'black'
      }}>
        <div style={featureStyle}>
          <div style={iconStyle}>🏨</div>
          <h3>Premium Categories</h3>
          <p>From Economy to Deluxe Suites, find the perfect space for your needs.</p>
        </div>
        <div style={featureStyle}>
          <div style={iconStyle}>💆</div>
          <h3>SPA & Wellness</h3>
          <p>Relax and rejuvenate with our exclusive SPA and massage services.</p>
        </div>
        <div style={featureStyle}>
          <div style={iconStyle}>🎁</div>
          <h3>Bonus System</h3>
          <p>Earn points with every stay and redeem them for exclusive rewards.</p>
        </div>
        <div style={featureStyle}>
          <div style={iconStyle}>🚐</div>
          <h3>Easy Transfer</h3>
          <p>We provide comfortable airport transfers and local city tours.</p>
        </div>
      </div>
    </div>
  );
};

// Simple styles for the feature cards
const featureStyle: React.CSSProperties = {
  padding: '30px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const iconStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  marginBottom: '15px'
};

export default Home;