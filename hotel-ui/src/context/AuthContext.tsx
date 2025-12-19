import { createContext, useState, useEffect, type ReactNode } from 'react';
import { authService, type Customer } from '../services/authService';

interface AuthContextType {
  customer: Customer | null;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCustomer = authService.getCurrentCustomer();
    if (savedCustomer) {
      setCustomer(savedCustomer);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: any) => {
    const customerData = await authService.login(credentials);
    setCustomer(customerData);
  };

  const logout = () => {
    authService.logout();
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};