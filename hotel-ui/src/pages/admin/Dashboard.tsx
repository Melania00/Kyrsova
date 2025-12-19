import React, { useEffect, useState } from 'react';
import { bookingService, type Booking } from '../../services/bookingService';
import { BookingStatus, StatusLabels } from '../../constants/enums';

const Dashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Using the service method you already have
        const data = await bookingService.getMyBookings(); 
        setBookings(data);
      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  // Calculation for Financial Indicators
  const totalIncome = bookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);
  
  // Calculation for Room Occupancy (Confirmed bookings)
  const occupiedCount = bookings.filter(b => b.status === BookingStatus.Confirmed).length;

  const handleStatusChange = async (id: number, newStatus: BookingStatus) => {
    try {
      await bookingService.updateBookingStatus(id, newStatus);
      // Refresh local state to show the update
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div>Loading reports...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Administration Reports</h1>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
          <h3>Total Income</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0d47a1' }}>${totalIncome.toFixed(2)}</p>
        </div>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f1f8e9', borderRadius: '8px' }}>
          <h3>Current Occupancy</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#33691e' }}>{occupiedCount} Rooms</p>
        </div>
      </div>

      <h3>All Bookings Management</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th>ID</th>
            <th>Room</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{b.id}</td>
              <td>{b.roomId}</td>
              <td>{b.customerId}</td>
              <td>${b.totalPrice}</td>
              <td>{StatusLabels[b.status]}</td>
              <td>
                {b.status === BookingStatus.Pending && (
                  <button 
                    onClick={() => handleStatusChange(b.id!, BookingStatus.Confirmed)}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;