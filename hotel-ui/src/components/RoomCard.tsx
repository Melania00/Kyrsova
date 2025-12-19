import React from 'react';
import { type Room } from '../services/roomService';
import { CategoryLabels } from '../constants/enums';

interface RoomCardProps {
  room: Room;
  totalPrice: number;
  onBook: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, totalPrice, onBook }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      height: '100%'
    }}>
      {/* Renders the ImageUrl from your DB Seeding */}
      <img 
        src={room.imageUrl} 
        alt={room.description} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
            {CategoryLabels[room.category]}
          </h3>
          <span style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '4px 10px', 
            borderRadius: '20px', 
            fontSize: '0.75rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>
            Available
          </span>
        </div>
        
        {/* Renders the Description from your DB */}
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '15px', flexGrow: 1 }}>
          {room.description}
        </p>
        
        <div style={{ fontSize: '0.9rem', marginBottom: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <div style={{ marginBottom: '5px' }}>
            <strong>Capacity:</strong> {room.capacity} {room.capacity === 1 ? 'Person' : 'People'}
          </div>
          <div>
            <strong>Price:</strong> ${Number(room.pricePerNight).toFixed(2)} / night
          </div>
        </div>

        <div style={{ 
          marginTop: 'auto', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ marginBottom: '8px', fontSize: '0.85rem', color: '#666' }}>
            Estimated Total
          </div>
          <div style={{ marginBottom: '12px', fontSize: '1.4rem', color: '#007bff' }}>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button 
            onClick={() => onBook(room)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Book This Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;