// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Check for stored user data on mount
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');
    
//     if (storedUser && storedToken) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (e) {
//         console.error('Failed to parse stored user:', e);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password, role = 'buyer') => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Mock API call - replace with actual API
//       const mockUsers = {
//         buyer: { id: 1, name: 'John Buyer', email, role: 'buyer', kycStatus: 'verified' },
//         agent: { id: 2, name: 'Mike Agent', email, role: 'agent', kycStatus: 'verified', agentId: 'RERA12345', rating: 4.5 },
//         seller: { id: 3, name: 'Sarah Seller', email, role: 'seller', kycStatus: 'pending', properties: 3 }
//       };

//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const userData = mockUsers[role] || mockUsers.buyer;
//       const token = `mock_token_${Date.now()}`;

//       localStorage.setItem('user', JSON.stringify(userData));
//       localStorage.setItem('token', token);
//       setUser(userData);
      
//       return { success: true, user: userData };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (userData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock registration - replace with actual API
//       const newUser = {
//         id: Date.now(),
//         ...userData,
//         kycStatus: 'not_started',
//         createdAt: new Date().toISOString()
//       };

//       return { success: true, user: newUser };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   const updateKYCStatus = (status) => {
//     if (user) {
//       const updatedUser = { ...user, kycStatus: status };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
//   };

//   const value = {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//     updateKYCStatus,
//     isAuthenticated: !!user,
//     isAgent: user?.role === 'agent',
//     isSeller: user?.role === 'seller',
//     isBuyer: user?.role === 'buyer'
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


























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
  const [tempRegistrationData, setTempRegistrationData] = useState(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Store registration data temporarily
      setTempRegistrationData({
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      });
      
      // Simulate API call to send OTPs
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        message: 'Registration initiated. Please verify OTP.' 
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (emailOTP, phoneOTP) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP verification (in real app, verify with backend)
      if (emailOTP === '123456' && phoneOTP === '123456') {
        // Create user account after OTP verification
        const newUser = {
          ...tempRegistrationData,
          kycStatus: 'not_started', // Important: Set KYC status
          emailVerified: true,
          phoneVerified: true
        };
        
        // In a real app, you would save this to your backend
        // For demo, we'll just store in temp
        localStorage.setItem('pendingUser', JSON.stringify(newUser));
        
        setTempRegistrationData(null);
        return { 
          success: true, 
          message: 'Verification successful! Please login.' 
        };
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (type) => {
    try {
      setLoading(true);
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: `OTP resent to your ${type}` };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if there's a pending user from registration
      const pendingUser = localStorage.getItem('pendingUser');
      let userData;
      
      if (pendingUser) {
        const parsedPending = JSON.parse(pendingUser);
        if (parsedPending.email === email) {
          userData = parsedPending;
          // Clear pending user
          localStorage.removeItem('pendingUser');
        }
      }
      
      // If no pending user, use mock data based on email domain
      if (!userData) {
        // Mock user data with different roles for demo
        if (email.includes('agent')) {
          userData = {
            id: 2,
            name: 'Mike Agent',
            email,
            role: 'agent',
            kycStatus: 'verified', // Set to not_started to trigger KYC
            emailVerified: true,
            phoneVerified: true
          };
        } else if (email.includes('seller')) {
          userData = {
            id: 3,
            name: 'Sarah Seller',
            email,
            role: 'seller',
            kycStatus: 'verified', // Set to not_started to trigger KYC
            emailVerified: true,
            phoneVerified: true
          };
        } else {
          userData = {
            id: 1,
            name: '',
            email,
            role: 'buyer',
            kycStatus: 'not_started', // Set to not_started to trigger KYC
            emailVerified: true,
            phoneVerified: true
          };
        }
      }

      // For demo purposes, accept any password
      const token = `mock_token_${Date.now()}`;

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      // Update state
      setUser(userData);
      
      return { success: true, user: userData };
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
    localStorage.removeItem('pendingUser');
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
    verifyOTP,
    resendOTP,
    updateKYCStatus,
    isAuthenticated: !!user,
    isAgent: user?.role === 'agent',
    isSeller: user?.role === 'seller',
    isBuyer: user?.role === 'buyer',
    needsKYC: user && (user.kycStatus === 'not_started' || user.kycStatus === 'pending')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};