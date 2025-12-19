import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Reports from './pages/admin/Reports';
import Home from './pages/client/Home';

// Page Imports
import Catalog from './pages/client/Catalog';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/client/Profile';
import Dashboard from './pages/admin/Dashboard';

// Route Protection
import AdminRoute from './components/AdminRoute';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <div className="container" style={{ padding: '20px' }}>
              <Routes>
                {/* Home is now the starting point */}
                <Route path="/" element={<Home />} />

                <Route path="/catalog" element={<Catalog />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                
                <Route 
                  path="/admin/dashboard" 
                  element={<AdminRoute><Dashboard /></AdminRoute>} 
                />
                <Route 
                  path="/admin/reports" 
                  element={<AdminRoute><Reports /></AdminRoute>} 
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;