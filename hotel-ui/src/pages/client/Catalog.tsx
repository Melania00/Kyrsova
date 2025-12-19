import React, { useEffect, useState } from 'react';
import { roomService, type Room } from '../../services/roomService';
import { BookingStatus, Category, CategoryLabels } from '../../constants/enums';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../services/bookingService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Catalog: React.FC = () => {
  const { customer } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  
  // Filter States
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minCapacity, setMinCapacity] = useState<number>(1);
  
  // Date States for Calculation
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + 86400000));

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getAllRooms();
        setRooms(data);
        setFilteredRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms", err);
      }
    };
    fetchRooms();
  }, []);

  // Filter Logic: Category, Price, and Capacity
  useEffect(() => {
    let result = rooms;

    if (categoryFilter !== 'all') {
      result = result.filter(r => r.category === parseInt(categoryFilter));
    }

    result = result.filter(r => r.pricePerNight <= maxPrice);
    result = result.filter(r => r.capacity >= minCapacity);

    setFilteredRooms(result);
  }, [categoryFilter, maxPrice, minCapacity, rooms]);

  const calculateTotal = (pricePerNight: number) => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 0 ? diffDays * pricePerNight : pricePerNight;
  };

  const handleBooking = async (room: Room) => {
    if (!customer) {
      alert("Please login to book a room");
      return;
    }

    const total = calculateTotal(Number(room.pricePerNight));

    const payload = {
        roomId: room.id,
        customerId: customer.id,
        checkInDate: startDate?.toISOString() || '',
        checkOutDate: endDate?.toISOString() || '',
        totalPrice: total,
        status: BookingStatus.Pending, // Use the constant instead of '0'
        additionalServices: []
};

    try {
      await bookingService.createBooking(payload);
      alert(`Success! Room ${room.id} has been requested.`);
    } catch (err) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Hotel Room Catalog</h1>

      {/* Filter Section */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#9e9b11ff', 
        borderRadius: '10px',
        border: '1px solid #557fa9ff' 
      }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Category</label>
          <select onChange={(e) => setCategoryFilter(e.target.value)} style={{ padding: '8px' }}>
            <option value="all">All Categories</option>
            <option value={Category.Economy}>Economy</option>
            <option value={Category.Standard}>Standard</option>
            <option value={Category.Deluxe}>Deluxe</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Max Price: ${maxPrice}</label>
          <input type="range" min="0" max="1000" step="50" value={maxPrice} 
            onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Min Capacity</label>
          <input type="number" min="1" value={minCapacity} 
            onChange={(e) => setMinCapacity(parseInt(e.target.value))} style={{ width: '60px', padding: '5px' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Select Stay Dates</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                selectsStart 
                startDate={startDate || undefined} 
                endDate={endDate || undefined} 
            />
  
                <span style={{ alignSelf: 'center' }}>to</span>
  
            <DatePicker 
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                selectsEnd 
                startDate={startDate || undefined} 
                endDate={endDate || undefined} 
                minDate={startDate || undefined} 
            />
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {filteredRooms.map(room => (
          <div key={room.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img src={room.imageUrl || 'https://via.placeholder.com/400x250?text=Hotel+Room'} 
                 alt="Room" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            
            <div style={{ padding: '20px', flexGrow: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{CategoryLabels[room.category]} Room</h3>
                <span style={{ 
                  backgroundColor: '#d4edda', 
                  color: '#155724', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  Available for Booking
                </span>
              </div>
              
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '10px 0' }}>{room.description}</p>
              
              <div style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
                <strong>Capacity:</strong> {room.capacity} Persons <br />
                <strong>Base Price:</strong> ${room.pricePerNight} / night
              </div>

              <div style={{ 
                marginTop: 'auto', 
                padding: '15px', 
                backgroundColor: '#f1f3f5', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ color: '#666', marginBottom: '10px', fontSize: '1.1rem' }}>
                  Total: <strong>${calculateTotal(Number(room.pricePerNight))}</strong>
                </div>
                <button 
                  onClick={() => handleBooking(room)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
</div>
      
      {filteredRooms.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h3>No rooms found matching your filters.</h3>
        </div>
      )}
    </div>
    
  );
};

export default Catalog;