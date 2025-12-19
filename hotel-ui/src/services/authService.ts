import api from './api';

export interface Customer {
  id: number;
  name: string;
  email: string;
  role: string;
  bonusPoints: number;
}

interface AuthResponse {
  token: string;
  user: Customer; 
}

export const authService = {
  async login(credentials: { email: string; password: any }): Promise<Customer> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('customer', JSON.stringify(user));
    
    return user;
  },

  async register(model: any) {
    // Matches RegisterDto
    return await api.post('/auth/register', model);
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('customer');
  },

  getCurrentCustomer(): Customer | null {
    const customer = localStorage.getItem('customer');
    return customer ? JSON.parse(customer) : null;
  }
};