import api from './api';
import { type BookingStatus } from '../constants/enums';

export interface AdditionalService {
    id: number;
    name: string;
    price: number;
}

export interface Booking {
    id?: number;
    roomId: number;
    customerId: number;
    checkInDate: string; // ISO string format for backend DateTime
    checkOutDate: string;
    totalPrice: number;
    status: BookingStatus;
    additionalServices: AdditionalService[];
}

export const bookingService = {
    // Sends the booking to your .NET controller
    async createBooking(bookingData: Omit<Booking, 'id'>) {
        const response = await api.post<Booking>('/bookings', bookingData);
        return response.data;
    },

    // Gets history for the Personal Client Account
    async getMyBookings() {
        const response = await api.get<Booking[]>('/bookings/my-bookings');
        return response.data;
    },

    // For Admin: Monitoring occupancy and updating statuses
    async updateBookingStatus(bookingId: number, status: BookingStatus) {
        const response = await api.put(`/bookings/${bookingId}/status`, { status });
        return response.data;
    },

    async getAllBookings() {
        const response = await api.get<Booking[]>('/bookings');
        return response.data;
    }
};