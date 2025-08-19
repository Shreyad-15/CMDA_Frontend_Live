// ----------------------23/7/25 cd-----------------

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('authToken'));
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const login = () => setIsLoggedIn(true);
//   const logout = () => {
//     localStorage.removeItem('authToken');
    
//     setIsLoggedIn(false);
    
//   };
//   const getAuthToken = () => localStorage.getItem('authToken');

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// ----------------------swati code---------------------------

import React, { createContext, useContext, useState, useEffect } from 'react';
import JwtUtil from '../services/JwtUtil';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('authToken');
    return !!token && !JwtUtil.isTokenExpired(token);
  });
   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

  // Handle logout with API call
  const logout = async () => {
    const token = localStorage.getItem('authToken');
    const email = JwtUtil.extractEmail(token);

    if (token && email) {
      try {
        await axios.post(
          `${API_BASE}/auth/logout`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        toast.success("Logout successful");
      } catch (error) {
        // console.error(error.response?.data?.message || "Logout API failed");
      }
    } else if (!email) {
        // toast.error("Session expired. Please log in again.");
    }

    // Clear all relevant localStorage items
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('hasShownQuizPopup');
    setIsLoggedIn(false);
  };

  // Handle login
  const login = (token) => {
    if (token && !JwtUtil.isTokenExpired(token)) {
      localStorage.setItem('authToken', token);
      setIsLoggedIn(true);
    } else {
        // toast.error("Session expired. Please log in again.");
      setIsLoggedIn(false);
    }
  };

  // Get auth token
  const getAuthToken = () => localStorage.getItem('authToken');

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('authToken');
      if (token && JwtUtil.isTokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        logout();
      }
    };

    checkTokenExpiration(); // Initial check
    const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Handle storage events for cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token && !JwtUtil.isTokenExpired(token));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     return localStorage.getItem('authToken') ? { isLoggedIn: true } : null;
//   });

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUser(localStorage.getItem('authToken') ? { isLoggedIn: true } : null);
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   const login = () => setUser({ isLoggedIn: true });
//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setUser(null);
//   };
//   const getAuthToken = () => localStorage.getItem('authToken');

//   return (
//     <AuthContext.Provider value={{ user, login, logout, getAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);