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

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import JwtUtil from '../services/JwtUtil';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     const token = localStorage.getItem('authToken');
//     return !!token && !JwtUtil.isTokenExpired(token);
//   });
//    const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Handle logout with API call
//   const logout = async () => {
//     const token = localStorage.getItem('authToken');
//     const email = JwtUtil.extractEmail(token);

//     if (token && email) {
//       try {
//         await axios.post(
//           `${API_BASE}/auth/logout`,
//           { email },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         toast.success("Logout successful");
//       } catch (error) {
//         // console.error(error.response?.data?.message || "Logout API failed");
//       }
//     } else if (!email) {
//         // toast.error("Session expired. Please log in again.");
//     }

//     // Clear all relevant localStorage items
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('hasShownQuizPopup');
//     setIsLoggedIn(false);
//   };

//   // Handle login
//   const login = (token) => {
//     if (token && !JwtUtil.isTokenExpired(token)) {
//       localStorage.setItem('authToken', token);
//       setIsLoggedIn(true);
//     } else {
//         // toast.error("Session expired. Please log in again.");
//       setIsLoggedIn(false);
//     }
//   };

//   // Get auth token
//   const getAuthToken = () => localStorage.getItem('authToken');

//   // Check token expiration periodically
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         toast.error("Session expired. Please log in again.");
//         logout();
//       }
//     };

//     checkTokenExpiration(); // Initial check
//     const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle storage events for cross-tab synchronization
//   useEffect(() => {
//     const handleStorageChange = () => {
//       const token = localStorage.getItem('authToken');
//       setIsLoggedIn(!!token && !JwtUtil.isTokenExpired(token));
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// ----------------prev-code----------

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import JwtUtil from '../services/JwtUtil';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     const token = localStorage.getItem('authToken');
//     return !!token && !JwtUtil.isTokenExpired(token);
//   });

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Handle logout with API call
//   const logout = async () => {
//     const token = localStorage.getItem('authToken');
//     const email = JwtUtil.extractEmail(token);

//     if (token && email) {
//       try {
//         await axios.post(
//           `${API_BASE}/auth/logout`,
//           { email },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         toast.success("Logout successful");
//       } catch (error) {
//         console.error(error.response?.data?.message || "Logout API failed");
//         toast.error(error.response?.data?.message || "Failed to logout");
//       }
//     } else if (!email) {
//       // toast.error("Session expired. Please log in again.");
//     }

//     // Clear all relevant localStorage items
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('profilePicture');
//     localStorage.removeItem('hasShownQuizPopup');
//     setIsLoggedIn(false);
//     window.dispatchEvent(new Event('authChange')); // Notify other components
//   };

//   // Handle login
//   const login = (token) => {
//     if (token && !JwtUtil.isTokenExpired(token)) {
//       localStorage.setItem('authToken', token);
//       setIsLoggedIn(true);
//       window.dispatchEvent(new Event('authChange')); // Notify other components
//       return true;
//     } else {
//       // toast.error("Invalid or expired token. Please try again.");
//       setIsLoggedIn(false);
//       return false;
//     }
//   };

//   // Get auth token
//   const getAuthToken = () => localStorage.getItem('authToken');

//   // Check token expiration periodically
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         toast.error("Session expired. Please log in again.");
//         logout();
//       } else if (token && !isLoggedIn) {
//         // Ensure isLoggedIn is true if a valid token exists
//         setIsLoggedIn(true);
//       }
//     };

//     checkTokenExpiration(); // Initial check
//     const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//     return () => clearInterval(interval);
//   }, [isLoggedIn]); // Add isLoggedIn as a dependency to re-check on state changes

//   // Handle storage events for cross-tab synchronization
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === 'authToken') {
//         const token = localStorage.getItem('authToken');
//         const newIsLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//         setIsLoggedIn(newIsLoggedIn);
//         if (!newIsLoggedIn) {
//           // toast.error("Session expired in another tab. Please log in again.");
//         }
//       }
//     };
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, []);

//   // Handle custom authChange event for immediate updates
//   useEffect(() => {
//     const handleAuthChange = () => {
//       const token = localStorage.getItem('authToken');
//       const newIsLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//       setIsLoggedIn(newIsLoggedIn);
//     };
//     window.addEventListener('authChange', handleAuthChange);
//     return () => window.removeEventListener('authChange', handleAuthChange);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import JwtUtil from "../services/JwtUtil";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute

  // Initialize login state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token && !JwtUtil.isTokenExpired(token);
  });

  /** --- Core helpers --- */
  const getAuthToken = () => localStorage.getItem("authToken");

  const clearSession = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("profilePicture");
    localStorage.removeItem("hasShownQuizPopup");
    setIsLoggedIn(false);
  };

  /** --- Auth actions --- */
  const login = (token) => {
    if (token && !JwtUtil.isTokenExpired(token)) {
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
      window.dispatchEvent(new Event("authChange"));
      return true;
    }
    setIsLoggedIn(false);
    return false;
  };

  const logout = async () => {
    const token = getAuthToken();
    const email = JwtUtil.extractEmail(token);

    if (token && email) {
      try {
        await axios.post(
          `${API_BASE}/auth/logout`,
          { email },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Logout successful");
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to logout";
        console.error(msg);
        toast.error(msg);
      }
    }
    clearSession();
    window.dispatchEvent(new Event("authChange"));
  };

  /** --- Token monitoring --- */
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getAuthToken();
      if (token && JwtUtil.isTokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else if (token && !isLoggedIn) {
        setIsLoggedIn(true);
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  /** --- Sync across tabs --- */
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "authToken") {
        const token = getAuthToken();
        const valid = !!token && !JwtUtil.isTokenExpired(token);
        setIsLoggedIn(valid);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  /** --- Immediate updates via custom event --- */
  useEffect(() => {
    const handleAuthChange = () => {
      const token = getAuthToken();
      const valid = !!token && !JwtUtil.isTokenExpired(token);
      setIsLoggedIn(valid);
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
