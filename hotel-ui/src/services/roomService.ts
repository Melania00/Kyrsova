import api from './api';
import { type Category } from '../constants/enums';

export interface Amenities {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  category: Category;
  description: string;
  capacity: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: Amenities[]; // Matching your List<Amenities>
}

export const roomService = {
  async getAllRooms(startDate?: string, endDate?: string) {
    const response = await api.get<Room[]>('/Room', {
      params: { startDate, endDate }
    }); 
    return response.data;
  }
};