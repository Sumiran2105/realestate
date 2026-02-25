import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role = 'buyer') => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock API call - replace with actual API
      const mockUsers = {
        buyer: { id: 1, name: 'John Buyer', email, role: 'buyer', kycStatus: 'verified' },
        agent: { id: 2, name: 'Mike Agent', email, role: 'agent', kycStatus: 'verified', agentId: 'RERA12345', rating: 4.5 },
        seller: { id: 3, name: 'Sarah Seller', email, role: 'seller', kycStatus: 'pending', properties: 3 }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = mockUsers[role] || mockUsers.buyer;
      const token = `mock_token_${Date.now()}`;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - replace with actual API
      const newUser = {
        id: Date.now(),
        ...userData,
        kycStatus: 'not_started',
        createdAt: new Date().toISOString()
      };

      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateKYCStatus = (status) => {
    if (user) {
      const updatedUser = { ...user, kycStatus: status };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateKYCStatus,
    isAuthenticated: !!user,
    isAgent: user?.role === 'agent',
    isSeller: user?.role === 'seller',
    isBuyer: user?.role === 'buyer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};