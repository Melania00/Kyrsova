import React, { useEffect, useState } from 'react';
import { bookingService, type Booking } from '../../services/bookingService';
import { BookingStatus } from '../../constants/enums';

const Reports: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const data = await bookingService.getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportsData();
  }, []);

  // 1. Financial Indicators: Income by month
  const getMonthlyIncome = () => {
    const incomeMap: Record<string, number> = {};
    bookings.forEach(b => {
      const month = new Date(b.checkInDate).toLocaleString('default', { month: 'long', year: 'numeric' });
      incomeMap[month] = (incomeMap[month] || 0) + Number(b.totalPrice);
    });
    return incomeMap;
  };

  // 2. Room Occupancy: Percentage of rooms currently "Confirmed"
  // Assuming a total of 6 rooms based on your HotelDBContext seeding
  const totalRooms = 6; 
  const occupiedRooms = bookings.filter(b => b.status === BookingStatus.Confirmed).length;
  const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);

  // 3. Popularity of room categories
  const getCategoryPopularity = () => {
    const popularity: Record<string, number> = {};
    bookings.forEach(b => {
      // In a real app, you'd join with Room data. For now, we use roomId to represent category groups.
      const categoryName = b.roomId <= 2 ? 'Economy' : b.roomId <= 4 ? 'Standard' : 'Deluxe';
      popularity[categoryName] = (popularity[categoryName] || 0) + 1;
    });
    return popularity;
  };

  if (loading) return <div>Generating reports...</div>;

  const monthlyIncome = getMonthlyIncome();
  const popularity = getCategoryPopularity();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Administration Reports</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        {/* Occupancy Card */}
        <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '10px' }}>
          <h4>Current Room Occupancy</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0' }}>{occupancyRate}%</p>
          <p>{occupiedRooms} out of {totalRooms} rooms are currently booked.</p>
        </div>

        {/* Total Revenue Summary */}
        <div style={{ padding: '20px', backgroundColor: '#d4edda', borderRadius: '10px' }}>
          <h4>Total Revenue</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', color: '#155724' }}>
            ${Object.values(monthlyIncome).reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
          <p>Total income across all months.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Monthly Income Table */}
        <div>
          <h3>Income by Month</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Month</th>
                <th style={{ padding: '10px' }}>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyIncome).map(([month, income]) => (
                <tr key={month} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{month}</td>
                  <td style={{ padding: '10px' }}>${income.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Popularity Table */}
        <div>
          <h3>Category Popularity</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #333', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Total Bookings</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(popularity).map(([cat, count]) => (
                <tr key={cat} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{cat}</td>
                  <td style={{ padding: '10px' }}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;