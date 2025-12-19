import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { customer, loading } = useAuth();

  // Prevent redirecting while the AuthContext is still initializing
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <h3>Loading session...</h3>
      </div>
    );
  }

  /**
   * Your backend logic: model.Email.EndsWith("@hotel.com") ? "Admin" : "Client"
   * We check that exact "Admin" string here.
   */
  if (!customer || customer.role !== 'Admin') {
    console.warn("Access denied: User is not an Admin");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;