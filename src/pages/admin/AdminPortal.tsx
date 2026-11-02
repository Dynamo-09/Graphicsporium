import React, { useState, useEffect } from 'react';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminDashboardPage } from './AdminDashboardPage';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = sessionStorage.getItem('gp_admin_session');
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed.authenticated) {
          setIsAuthenticated(true);
        }
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gp_admin_session');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white">
        <div className="w-8 h-8 border-2 border-[#ff5a00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminDashboardPage onLogout={handleLogout} />
  ) : (
    <AdminLoginPage onLoginSuccess={handleLoginSuccess} />
  );
};
