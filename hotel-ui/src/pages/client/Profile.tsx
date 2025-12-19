import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { bookingService, type Booking } from '../../services/bookingService';
import { StatusLabels } from '../../constants/enums';

const Profile: React.FC = () => {
  const { customer } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await bookingService.getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Could not fetch history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (customer) fetchHistory();
  }, [customer]);

  if (!customer) return <div>Please log in.</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '15px', 
        borderLeft: '5px solid #007bff',
        marginBottom: '30px'
      }}>
        <h2>User Account</h2>
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Role:</strong> {customer.role}</p>
        
        {/* BonusPoints comes from your backend CustomerSessionDto */}
        <div style={{ 
          marginTop: '15px', 
          padding: '10px 20px', 
          background: '#28a745', 
          color: 'white', 
          borderRadius: '8px',
          display: 'inline-block',
          fontWeight: 'bold'
        }}>
          Current Bonus Balance: {customer.bonusPoints} pts
        </div>
      </div>

      <h3>Your Bookings</h3>
      {loading ? (
        <p>Loading history...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Room</th>
              <th style={{ padding: '10px' }}>Dates</th>
              <th style={{ padding: '10px' }}>Total</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>Room #{b.roomId}</td>
                <td style={{ padding: '10px' }}>
                  {new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px' }}>${b.totalPrice}</td>
                <td style={{ padding: '10px' }}>{StatusLabels[b.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Profile;