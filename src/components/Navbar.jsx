// import React, { useEffect, useState, useRef } from "react";

// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs";
// import Profile from "./Profile";
// import UpdateIndividualProfile from "./UpdateIndividualProfile";
// import UpdateCorporateProfile from "./UpdateCorporateProfile";
// import Username from "./Username";
// import ProfilePicture from "./ProfilePicture";
// import profile from "../../public/profile.png";
// import { CgLogIn, CgProfile } from "react-icons/cg";
// import { HiOutlineLogout } from "react-icons/hi";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";
// import { Search } from "lucide-react";
// import SearchList from "./EquityHub/SearchList";
// import axios from "axios";
// import { IoMdArrowDropdown } from "react-icons/io";
// import QuizModal from "./QuizModal";
// import JwtUtil from "../services/JwtUtil";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [sticky, setSticky] = useState(false);
//   const [userType, setUserType] = useState(localStorage.getItem('userType') || 'individual');
//   const [fullName, setFullName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [hasShownQuizPopup, setHasShownQuizPopup] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();
//   const profileCollapseRef = useRef(null);
//   const settingsCollapseRef = useRef(null);
//   const quizCollapseRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000;
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
//   const TOKEN_CHECK_INTERVAL = 60 * 1000;

//   let inactivityTimer;

//   const resetInactivityTimer = () => {
//     if (inactivityTimer) clearTimeout(inactivityTimer);
//     if (isLoggedIn) inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//   };

//   const handleLogout = async () => {
//     const token = localStorage.getItem('authToken');
//     const email = JwtUtil.extractEmail(token);

//     if (!email) {
//       toast.error("Missing user email. Cannot logout.");
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('hasSeenQuizModal');
//       localStorage.removeItem('hasTakenQuiz');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       setShowQuizModal(false);
//       setProfileImage(profile);
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE}/auth/logout`,
//         { email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       toast.success("Logout successful");
//     } catch (error) {
//       console.error(error.response?.data?.message || "Logout API failed");
//     } finally {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('hasSeenQuizModal');
//       localStorage.removeItem('hasTakenQuiz');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       setShowQuizModal(false);
//       setProfileImage(profile);
//     }
//   };

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         toast.error("Session expired. Please log in again.");
//         handleLogout();
//       }
//     };

//     if (isLoggedIn) {
//       checkTokenExpiration();
//       const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//       return () => clearInterval(interval);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => resetInactivityTimer();

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) clearTimeout(inactivityTimer);
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) setQuizQuestions(res.data);
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) setIsPortfolioOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const fetchProfileImage = async () => {
//     try {
//       const url = await getProfilePicture();
//       setProfileImage(url ? `${url}?t=${Date.now()}` : profile);
//     } catch (error) {
//       console.error("Failed to fetch profile picture:", error);
//       setProfileImage(profile);
//       toast.error("Failed to load profile picture");
//     }
//   };

//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn) fetchProfileImage();
//     else setProfileImage(profile);
//   }, [isLoggedIn]);

//   const fetchName = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;

//     const email = JwtUtil.extractEmail(token);
//     if (!email) return;

//     try {
//       const url = userType === 'corporate' ? `/corporate/${email}` : `/Userprofile/${email}`;
//       const response = await axios.get(`${API_BASE}${url}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const name = userType === 'corporate' ? response.data.employeeName : response.data.fullname || response.data.fullName;
//       setFullName(name);
//     } catch (error) {
//       console.error('Failed to fetch user name:', error);
//     }
//   };

//   useEffect(() => {
//     fetchName();

//     const syncName = () => {
//       setUserType(localStorage.getItem('userType') || 'individual');
//       fetchName();
//     };

//     window.addEventListener('authChange', syncName);
//     window.addEventListener('storage', syncName);

//     return () => {
//       window.removeEventListener('authChange', syncName);
//       window.removeEventListener('storage', syncName);
//     };
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn && !localStorage.getItem("hasTakenQuiz")) {
//       const hasSeenQuizModal = localStorage.getItem("hasSeenQuizModal") === "true";
//       if (!hasShownQuizPopup && !hasSeenQuizModal) {
//         const timer = setTimeout(() => {
//           setShowQuizModal(true);
//           setHasShownQuizPopup(true);
//         }, 3000);
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [isLoggedIn, hasShownQuizPopup]);

//   const handleDeleteAccount = async () => {
//     const apiUrl = userType === "corporate" ? `${API_BASE}/corporate/delete-account` : `${API_BASE}/Userprofile/delete-account`;

//     try {
//       await axios.delete(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Account deleted successfully");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("userType");
//       localStorage.removeItem("hasSeenQuizModal");
//       localStorage.removeItem("hasTakenQuiz");
//       logout();
//       navigate("/");
//       setShowDeleteModal(false);
//       setProfileImage(profile);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete account");
//     }
//   };

//   const handleNavClick = async (label) => {
//     await logActivity(`${label} tab clicked`);
//   };

//   const isActive = (path) => location.pathname === path;

//   const handleDashboardClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       toast.error("Please login to access the Dashboard");
//     } else {
//       handleNavClick("Dashboard");
//     }
//   };

//   const getCachedData = (key) => {
//     const cached = localStorage.getItem(key);
//     if (!cached) return null;
//     try {
//       const { data, timestamp } = JSON.parse(cached);
//       if (Date.now() - timestamp > CACHE_TTL) {
//         localStorage.removeItem(key);
//         return null;
//       }
//       return data;
//     } catch (err) {
//       setError("Failed to parse cached data.");
//       console.error("Cache parse error:", err);
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     } catch (err) {
//       setError("Failed to cache data.");
//       console.error("Cache set error:", err);
//     }
//   };

//   const fetchData = async (value) => {
//     if (!value || value.length < 2) {
//       setResults([]);
//       setError(null);
//       return;
//     }

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
//         params: { prefix: value },

//       });

//       const filteredResults = response.data;
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", {
//         message: error.message,
//         status: error.response?.status,
//         response: error.response?.data,
//       });
//       setError(
//         error.response?.status === 404
//           ? "Endpoint not found. Check server configuration."
//           : error.response?.data?.error || error.message || "Failed to fetch search results."
//       );
//       setResults([]);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/equityhub?query=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setResults([]);
//       setError(null);
//     }
//   };

//   const handleSelectItem = (item) => {
//     if (item && item.symbol) {
//       setSearchQuery("");
//       setResults([]);
//       setError(null);
//       navigate(`/equityhub?query=${encodeURIComponent(item.symbol)}`);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setResults([]);
//     setError(null);
//   };

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
//     fetchProfileImage();
//   };

//   const handleOpenQuiz = () => setShowQuizModal(true);

//   const handleDrawerToggle = (e) => {
//     const isChecked = e.target.checked;
//     setIsDrawerOpen(isChecked);
//     if (isChecked) {
//       if (profileCollapseRef.current) profileCollapseRef.current.checked = false;
//       if (settingsCollapseRef.current) settingsCollapseRef.current.checked = false;
//       if (quizCollapseRef.current) quizCollapseRef.current.checked = false;
//     }
//   };

//   const navItems = (
//     <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Home
//         </Link>
//       </li>

//       <li
//         id="portfolio-dropdown"
//         className="relative"
//         onMouseEnter={() => setIsPortfolioOpen(true)}
//         onMouseLeave={() => setIsPortfolioOpen(false)}
//       >
//         <span
//           onClick={handlePortfolioClick}
//           className={`text-base font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10 lg:mt-0"
//             onMouseEnter={() => setIsPortfolioOpen(true)}
//             onMouseLeave={() => setIsPortfolioOpen(false)}
//           >
//             <li>
//               <Link
//                 to="/portDash"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Upload File
//               </Link>
//               <Link
//                 to="/portDash/my-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Saved Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/resculpt-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Recreate Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/customize-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 BuildUrPortfolio
//               </Link>
//             </li>
//           </ul>
//         )}
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Equity
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Dashboard
//         </Link>
//       </li>
      
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           About
//         </Link>
//       </li>
//       <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//           data-tour="subscription-link"
//         >
//           Subscription
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 py-3 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all duration-300 ${sticky ? "bg-opacity-90" : ""
//           }`}
//       >
//         <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-y-4">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//             <div style={{
//               display: 'inline-flex',
//               alignItems: 'flex-start',
//               gap: '0',
//               position: 'relative',
//             }}>
//               <span style={{
//                 fontSize: 'clamp(20px, 5vw, 28px)',
//                 fontWeight: '800',
//                 color: '#ffffff',
//                 letterSpacing: '0.05em',
//                 textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//               }}>
//                 #CMD
//               </span>
//               <div style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '1px',
//                 marginLeft: '-2px',
//               }}>
//                 <span style={{
//                   fontSize: 'clamp(20px, 5vw, 28px)',
//                   fontWeight: '800',
//                   background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//                   lineHeight: '1.2',
//                 }}>
//                   A
//                 </span>
//               </div>
//               <span style={{
//                 position: 'absolute',
//                 right: '-38px',
//                 bottom: '16px',
//                 backgroundColor: '#ffffff',
//                 color: '#17b3f1ff',
//                 fontSize: 'clamp(10px, 2vw, 12px)',
//                 fontWeight: 'bold',
//                 padding: '2px 6px',
//                 borderRadius: '4px',
//                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//                 transform: 'rotate(12deg)',
//                 whiteSpace: 'nowrap',
//                 lineHeight: '1',
//               }}>
//                 BETA
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex lg:items-center">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white p-2">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </label>
//           </div>

//           {/* Right Side Items */}
//           <div className="flex items-center gap-2 sm:gap-4 max-w-[90%] sm:max-w-[400px] lg:max-w-[500px]">
//             {/* Search Field */}
//             <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
//               <form onSubmit={handleSearch} className="relative w-full">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>
//                 {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
//                 {results.length > 0 && (
//                   <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     <SearchList
//                       results={results}
//                       query={searchQuery}
//                       onSelectItem={handleSelectItem}
//                       onClear={handleClearSearch}
//                     />
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* Login/Logout Button */}
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input
//                   id="my-drawer-4"
//                   type="checkbox"
//                   className="drawer-toggle"
//                   onChange={handleDrawerToggle}
//                 />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring ring-gray-300 overflow-hidden">
//                         <img
//                           src={profileImage || profile}
//                           alt="Profile"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//                 <div className="drawer-side">
//                   <label htmlFor="my-drawer-4" className="drawer-overlay bg-black/50"></label>
//                   <div className="menu w-full sm:w-80 min-h-full bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                       {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={profileCollapseRef} />
//                         <div className="collapse-title dark:text-white flex gap-3 sm:gap-4 text-black text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400 mt-1" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm sm:text-base">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={settingsCollapseRef} />
//                         <div className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400 mt-1" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm sm:text-base text-black">
//                           {userType === "individual" ? (
//                             <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
//                               <CgProfile className="text-blue-700 font-bold mt-2" />
//                               <Link
//                                 to="/updateIndividualProfile"
//                                 className="block py-1 dark:text-white hover:text-blue-500"
//                               >
//                                 Update Profile
//                               </Link>
//                             </div>
//                           ) : (
//                             <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
//                               <CgProfile className="text-blue-700 font-bold mt-2" />
//                               <Link
//                                 to="/updateCorporateProfile"
//                                 className="block py-1 dark:text-white hover:text-blue-500"
//                               >
//                                 Update Corporate Profile
//                               </Link>
//                             </div>
//                           )}
//                           <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                             <div
//                               className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                               onClick={handleLogout}
//                             >
//                               <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
//                               <span className="tracking-wide">Logout</span>
//                             </div>
//                           </div>
//                           <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                             <div
//                               className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                               onClick={() => setShowDeleteModal(true)}
//                             >
//                               <MdDelete className="text-blue-700 font-bold mt-1" />
//                               <span className="tracking-wide">Delete Account</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <div
//                           className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3"
//                           onClick={handleOpenQuiz}
//                         >
//                           <BsQuestionCircle className="text-blue-500 mt-1" />
//                           <span className="tracking-wide">Take Quiz</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Content */}
//         <input type="checkbox" id="mobile-menu" className="hidden peer" />
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-4 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
//                 <form onSubmit={handleSearch} className="relative w-full">
//                   <div className="relative flex items-center">
//                     <input
//                       type="text"
//                       placeholder="Search stocks..."
//                       className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
//                       value={searchQuery}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setSearchQuery(value);
//                         fetchData(value);
//                       }}
//                     />
//                     <button
//                       type="submit"
//                       className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                       aria-label="Search stocks"
//                     >
//                       <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                   {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList
//                         results={results}
//                         query={searchQuery}
//                         onSelectItem={handleSelectItem}
//                         onClear={handleClearSearch}
//                       />
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </li>
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 text-base ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 text-base ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//              <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 text-base ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 text-base ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
           
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 text-base ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 text-base ${isActive('/plan') ? 'text-sky-400' : 'text-white'} hover:text-sky-400`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-base text-white hover:text-sky-400"
//                 >
//                   Take Quiz
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <Login
//               isOpen={showLoginModal}
//               onClose={handleCloseModal}
//               onSuccess={() => {
//                 setIsLoggedIn(true);
//                 handleCloseModal();
//                 handleLoginSuccess();
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Quiz Modal */}
//       <QuizModal
//         showModal={showQuizModal}
//         setShowModal={setShowQuizModal}
//         allQuestions={quizQuestions}
//         userId={localStorage.getItem("userId") || null}
//         onLoginClick={handleLoginClick}
//       />

//       {/* Delete Account Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <div className="text-center">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-sm sm:text-base text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-sm sm:text-base hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-300 text-gray-800 rounded text-sm sm:text-base hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

// import React, { useEffect, useState, useRef } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs";
// import Profile from "./Profile";
// import UpdateIndividualProfile from "./UpdateIndividualProfile";
// import UpdateCorporateProfile from "./UpdateCorporateProfile";
// import Username from "./Username";
// import ProfilePicture from "./ProfilePicture";
// import profile from "../../public/profile.png";
// import { CgLogIn, CgProfile } from "react-icons/cg";
// import { HiOutlineLogout } from "react-icons/hi";
// import toast from "react-hot-toast";
// import { useAuth } from "./AuthContext";
// import { Search } from "lucide-react";
// import SearchList from "./EquityHub/SearchList";
// import axios from "axios";
// import { IoMdArrowDropdown } from "react-icons/io";
// import QuizModal from "./QuizModal";
// import JwtUtil from "../services/JwtUtil";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [sticky, setSticky] = useState(false);
//   const [userType, setUserType] = useState(localStorage.getItem('userType') || 'individual');
//   const [fullName, setFullName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState(null);
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [hasShownQuizPopup, setHasShownQuizPopup] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();
//   const profileCollapseRef = useRef(null);
//   const settingsCollapseRef = useRef(null);
//   const quizCollapseRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000;
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
//   const TOKEN_CHECK_INTERVAL = 60 * 1000;

//   let inactivityTimer;

//   const resetInactivityTimer = () => {
//     if (inactivityTimer) clearTimeout(inactivityTimer);
//     if (isLoggedIn) inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//   };

//   const handleLogout = async () => {
//     const token = localStorage.getItem('authToken');
//     const email = JwtUtil.extractEmail(token);

//     if (!email) {
//       toast.error("Missing user email. Cannot logout.");
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('hasSeenQuizModal');
//       localStorage.removeItem('hasTakenQuiz');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       setShowQuizModal(false);
//       setProfileImage(profile);
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE}/auth/logout`,
//         { email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       toast.success("Logout successful");
//     } catch (error) {
//       console.error(error.response?.data?.message || "Logout API failed");
//     } finally {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       localStorage.removeItem('hasSeenQuizModal');
//       localStorage.removeItem('hasTakenQuiz');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       setShowQuizModal(false);
//       setProfileImage(profile);
//     }
//   };

//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         toast.error("Session expired. Please log in again.");
//         handleLogout();
//       }
//     };

//     if (isLoggedIn) {
//       checkTokenExpiration();
//       const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//       return () => clearInterval(interval);
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => resetInactivityTimer();

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) clearTimeout(inactivityTimer);
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) setQuizQuestions(res.data);
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) setIsPortfolioOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const fetchProfileImage = async () => {
//     try {
//       const url = await getProfilePicture();
//       setProfileImage(url ? `${url}?t=${Date.now()}` : profile);
//     } catch (error) {
//       console.error("Failed to fetch profile picture:", error);
//       setProfileImage(profile);
//       toast.error("Failed to load profile picture");
//     }
//   };

//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn) fetchProfileImage();
//     else setProfileImage(profile);
//   }, [isLoggedIn]);

//   const fetchName = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;

//     const email = JwtUtil.extractEmail(token);
//     if (!email) return;

//     try {
//       const url = userType === 'corporate' ? `/corporate/${email}` : `/Userprofile/${email}`;
//       const response = await axios.get(`${API_BASE}${url}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const name = userType === 'corporate' ? response.data.employeeName : response.data.fullname || response.data.fullName;
//       setFullName(name);
//     } catch (error) {
//       console.error('Failed to fetch user name:', error);
//     }
//   };

//   useEffect(() => {
//     fetchName();

//     const syncName = () => {
//       setUserType(localStorage.getItem('userType') || 'individual');
//       fetchName();
//     };

//     window.addEventListener('authChange', syncName);
//     window.addEventListener('storage', syncName);

//     return () => {
//       window.removeEventListener('authChange', syncName);
//       window.removeEventListener('storage', syncName);
//     };
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn && !localStorage.getItem("hasTakenQuiz")) {
//       const hasSeenQuizModal = localStorage.getItem("hasSeenQuizModal") === "true";
//       if (!hasShownQuizPopup && !hasSeenQuizModal) {
//         const timer = setTimeout(() => {
//           setShowQuizModal(true);
//           setHasShownQuizPopup(true);
//         }, 3000);
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [isLoggedIn, hasShownQuizPopup]);

//   const handleDeleteAccount = async () => {
//     const apiUrl = userType === "corporate" ? `${API_BASE}/corporate/delete-account` : `${API_BASE}/Userprofile/delete-account`;

//     try {
//       await axios.delete(apiUrl, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Account deleted successfully");
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("userType");
//       localStorage.removeItem("hasSeenQuizModal");
//       localStorage.removeItem("hasTakenQuiz");
//       logout();
//       navigate("/");
//       setShowDeleteModal(false);
//       setProfileImage(profile);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete account");
//     }
//   };

//   const handleNavClick = async (label) => {
//     await logActivity(`${label} tab clicked`);
//   };

//   const isActive = (path) => location.pathname === path;

//   const handleDashboardClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       toast.error("Please login to access the Dashboard");
//     } else {
//       handleNavClick("Dashboard");
//     }
//   };

//   const getCachedData = (key) => {
//     const cached = localStorage.getItem(key);
//     if (!cached) return null;
//     try {
//       const { data, timestamp } = JSON.parse(cached);
//       if (Date.now() - timestamp > CACHE_TTL) {
//         localStorage.removeItem(key);
//         return null;
//       }
//       return data;
//     } catch (err) {
//       setError("Failed to parse cached data.");
//       console.error("Cache parse error:", err);
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     } catch (err) {
//       setError("Failed to cache data.");
//       console.error("Cache set error:", err);
//     }
//   };

//   const fetchData = async (value) => {
//     if (!value || value.length < 2) {
//       setResults([]);
//       setError(null);
//       return;
//     }

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
//         params: { prefix: value },

//       });

//       const filteredResults = response.data;
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", {
//         message: error.message,
//         status: error.response?.status,
//         response: error.response?.data,
//       });
//       setError(
//         error.response?.status === 404
//           ? "Endpoint not found. Check server configuration."
//           : error.response?.data?.error || error.message || "Failed to fetch search results."
//       );
//       setResults([]);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/equityhub?query=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery("");
//       setResults([]);
//       setError(null);
//     }
//   };

//   const handleSelectItem = (item) => {
//     if (item && item.symbol) {
//       setSearchQuery("");
//       setResults([]);
//       setError(null);
//       navigate(`/equityhub?query=${encodeURIComponent(item.symbol)}`);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery("");
//     setResults([]);
//     setError(null);
//   };

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
//     fetchProfileImage();
//   };

//   const handleOpenQuiz = () => setShowQuizModal(true);

//   const handleDrawerToggle = (e) => {
//     const isChecked = e.target.checked;
//     setIsDrawerOpen(isChecked);
//     if (isChecked) {
//       if (profileCollapseRef.current) profileCollapseRef.current.checked = false;
//       if (settingsCollapseRef.current) settingsCollapseRef.current.checked = false;
//       if (quizCollapseRef.current) quizCollapseRef.current.checked = false;
//     }
//   };

//   const navItems = (
//     <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Home
//         </Link>
//       </li>

//       <li
//         id="portfolio-dropdown"
//         className="relative"
//         onMouseEnter={() => setIsPortfolioOpen(true)}
//         onMouseLeave={() => setIsPortfolioOpen(false)}
//       >
//         <span
//           onClick={handlePortfolioClick}
//           className={`text-base font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10 lg:mt-0"
//             onMouseEnter={() => setIsPortfolioOpen(true)}
//             onMouseLeave={() => setIsPortfolioOpen(false)}
//           >
//             <li>
//               <Link
//                 to="/portDash"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Upload File
//               </Link>
//               <Link
//                 to="/portDash/my-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Saved Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/resculpt-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 Recreate Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/customize-portfolio"
//                 onClick={() => setIsPortfolioOpen(false)}
//                 className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//               >
//                 BuildUrPortfolio
//               </Link>
//             </li>
//           </ul>
//         )}
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Equity
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           Dashboard
//         </Link>
//       </li>
      
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//         >
//           About
//         </Link>
//       </li>
//       <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-base font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
//           data-tour="subscription-link"
//         >
//           Subscription
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 py-3 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all duration-300 ${sticky ? "bg-opacity-90" : ""
//           }`}
//       >
//         <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-y-4">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//             <div style={{
//               display: 'inline-flex',
//               alignItems: 'flex-start',
//               gap: '0',
//               position: 'relative',
//             }}>
//               <span style={{
//                 fontSize: 'clamp(20px, 5vw, 28px)',
//                 fontWeight: '800',
//                 color: '#ffffff',
//                 letterSpacing: '0.05em',
//                 textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//               }}>
//                 #CMD
//               </span>
//               <div style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: '1px',
//                 marginLeft: '-2px',
//               }}>
//                 <span style={{
//                   fontSize: 'clamp(20px, 5vw, 28px)',
//                   fontWeight: '800',
//                   background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//                   WebkitBackgroundClip: 'text',
//                   backgroundClip: 'text',
//                   color: 'transparent',
//                   textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//                   lineHeight: '1.2',
//                 }}>
//                   A
//                 </span>
//               </div>
//               <span style={{
//                 position: 'absolute',
//                 right: '-38px',
//                 bottom: '16px',
//                 backgroundColor: '#ffffff',
//                 color: '#17b3f1ff',
//                 fontSize: 'clamp(10px, 2vw, 12px)',
//                 fontWeight: 'bold',
//                 padding: '2px 6px',
//                 borderRadius: '4px',
//                 boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//                 transform: 'rotate(12deg)',
//                 whiteSpace: 'nowrap',
//                 lineHeight: '1',
//               }}>
//                 BETA
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex lg:items-center">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white p-2">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </label>
//           </div>

//           {/* Right Side Items */}
//           <div className="flex items-center gap-2 sm:gap-4 max-w-[90%] sm:max-w-[400px] lg:max-w-[500px]">
//             {/* Search Field */}
//             <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
//               <form onSubmit={handleSearch} className="relative w-full">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>
//                 {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
//                 {results.length > 0 && (
//                   <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                     <SearchList
//                       results={results}
//                       query={searchQuery}
//                       onSelectItem={handleSelectItem}
//                       onClear={handleClearSearch}
//                     />
//                   </div>
//                 )}
//               </form>
//             </div>

//             {/* Login/Logout Button */}
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input
//                   id="my-drawer-4"
//                   type="checkbox"
//                   className="drawer-toggle"
//                   onChange={handleDrawerToggle}
//                 />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring ring-gray-300 overflow-hidden">
//                         <img
//                           src={profileImage || profile}
//                           alt="Profile"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   </label>
//                 </div>
//                 <div className="drawer-side">
//                   <label htmlFor="my-drawer-4" className="drawer-overlay bg-black/50"></label>
//                   <div className="menu w-full sm:w-80 min-h-full bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                       {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={profileCollapseRef} />
//                         <div className="collapse-title dark:text-white flex gap-3 sm:gap-4 text-black text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400 mt-1" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm sm:text-base">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={settingsCollapseRef} />
//                         <div className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400 mt-1" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm sm:text-base text-black">
//                           {userType === "individual" ? (
//                             <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
//                               <CgProfile className="text-blue-700 font-bold mt-2" />
//                               <Link
//                                 to="/updateIndividualProfile"
//                                 className="block py-1 dark:text-white hover:text-blue-500"
//                               >
//                                 Update Profile
//                               </Link>
//                             </div>
//                           ) : (
//                             <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
//                               <CgProfile className="text-blue-700 font-bold mt-2" />
//                               <Link
//                                 to="/updateCorporateProfile"
//                                 className="block py-1 dark:text-white hover:text-blue-500"
//                               >
//                                 Update Corporate Profile
//                               </Link>
//                             </div>
//                           )}
//                           <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                             <div
//                               className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                               onClick={handleLogout}
//                             >
//                               <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
//                               <span className="tracking-wide">Logout</span>
//                             </div>
//                           </div>
//                           <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                             <div
//                               className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                               onClick={() => setShowDeleteModal(true)}
//                             >
//                               <MdDelete className="text-blue-700 font-bold mt-1" />
//                               <span className="tracking-wide">Delete Account</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <div
//                           className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3"
//                           onClick={handleOpenQuiz}
//                         >
//                           <BsQuestionCircle className="text-blue-500 mt-1" />
//                           <span className="tracking-wide">Take Quiz</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Content */}
//         <input type="checkbox" id="mobile-menu" className="hidden peer" />
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-4 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
//                 <form onSubmit={handleSearch} className="relative w-full">
//                   <div className="relative flex items-center">
//                     <input
//                       type="text"
//                       placeholder="Search stocks..."
//                       className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
//                       value={searchQuery}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setSearchQuery(value);
//                         fetchData(value);
//                       }}
//                     />
//                     <button
//                       type="submit"
//                       className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                       aria-label="Search stocks"
//                     >
//                       <Search className="w-4 h-4 sm:w-5 sm:h-5" />
//                     </button>
//                   </div>
//                   {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList
//                         results={results}
//                         query={searchQuery}
//                         onSelectItem={handleSelectItem}
//                         onClear={handleClearSearch}
//                       />
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </li>
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 text-base ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>

//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 text-base ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-sm text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//              <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 text-base ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 text-base ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
           
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 text-base ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 text-base ${isActive('/plan') ? 'text-sky-400' : 'text-white'} hover:text-sky-400`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-base text-white hover:text-sky-400"
//                 >
//                   Take Quiz
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </nav>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <Login
//               isOpen={showLoginModal}
//               onClose={handleCloseModal}
//               onSuccess={() => {
//                 setIsLoggedIn(true);
//                 handleCloseModal();
//                 handleLoginSuccess();
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Quiz Modal */}
//       <QuizModal
//         showModal={showQuizModal}
//         setShowModal={setShowQuizModal}
//         allQuestions={quizQuestions}
//         userId={localStorage.getItem("userId") || null}
//         onLoginClick={handleLoginClick}
//       />

//       {/* Delete Account Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <div className="text-center">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-sm sm:text-base text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-sm sm:text-base hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-300 text-gray-800 rounded text-sm sm:text-base hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useEffect, useState, useRef } from "react";
import Login from "./Login";
import { logActivity, getProfilePicture } from "../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaTimes } from "react-icons/fa";
import { MdDelete, MdOutlineSettings } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import Profile from "./Profile";
import UpdateIndividualProfile from "./UpdateIndividualProfile";
import UpdateCorporateProfile from "./UpdateCorporateProfile";
import Username from "./Username";
import ProfilePicture from "./ProfilePicture";
import profile from "../../public/profile.png";
import { CgLogIn, CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { Search } from "lucide-react";
import SearchList from "./EquityHub/SearchList";
import axios from "axios";
import { IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import QuizModal from "./QuizModal";
import JwtUtil from "../services/JwtUtil";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [sticky, setSticky] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem('userType') || 'individual');
  const [fullName, setFullName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [hasShownQuizPopup, setHasShownQuizPopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();

  const profileCollapseRef = useRef(null);
  const settingsCollapseRef = useRef(null);
  const quizCollapseRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const CACHE_TTL = 60 * 60 * 1000;
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
  const TOKEN_CHECK_INTERVAL = 60 * 1000;

  let inactivityTimer;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
        setError(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (isLoggedIn) inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    const email = JwtUtil.extractEmail(token);

    if (!email) {
      toast.error("Missing user email. Cannot logout.");
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('hasSeenQuizModal');
      localStorage.removeItem('hasTakenQuiz');
      logout();
      navigate('/');
      setIsLoggedIn(false);
      setHasShownQuizPopup(false);
      setShowQuizModal(false);
      setProfileImage(profile);
      return;
    }

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
      console.error(error.response?.data?.message || "Logout API failed");
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userType');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('hasSeenQuizModal');
      localStorage.removeItem('hasTakenQuiz');
      logout();
      navigate('/');
      setIsLoggedIn(false);
      setHasShownQuizPopup(false);
      setShowQuizModal(false);
      setProfileImage(profile);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('authToken');
      if (token && JwtUtil.isTokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
      }
    };

    if (isLoggedIn) {
      checkTokenExpiration();
      const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const handleActivity = () => resetInactivityTimer();

    if (isLoggedIn) {
      resetInactivityTimer();
      events.forEach(event => window.addEventListener(event, handleActivity));
    }

    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      events.forEach(event => window.removeEventListener(event, handleActivity));
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/assessment/questions`);
        if (res.status === 200) setQuizQuestions(res.data);
      } catch (error) {
        console.error("Failed to fetch quiz questions", error);
        toast.error("Failed to load quiz questions");
      }
    };
    fetchQuestions();
  }, []);

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    setIsPortfolioOpen(true);
    handleNavClick("Portfolio");
    navigate("/portDash");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#portfolio-dropdown")) setIsPortfolioOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchProfileImage = async () => {
    try {
      const url = await getProfilePicture();
      setProfileImage(url ? `${url}?t=${Date.now()}` : profile);
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
      setProfileImage(profile);
      toast.error("Failed to load profile picture");
    }
  };

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "individual";
    setUserType(storedUserType);

    const token = localStorage.getItem("authToken");
    const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
    setIsLoggedIn(isCurrentlyLoggedIn);

    if (isCurrentlyLoggedIn) fetchProfileImage();
    else setProfileImage(profile);
  }, [isLoggedIn]);

  const fetchName = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const email = JwtUtil.extractEmail(token);
    if (!email) return;

    try {
      const url = userType === 'corporate' ? `/corporate/${email}` : `/Userprofile/${email}`;
      const response = await axios.get(`${API_BASE}${url}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const name = userType === 'corporate' ? response.data.employeeName : response.data.fullname || response.data.fullName;
      setFullName(name);
    } catch (error) {
      console.error('Failed to fetch user name:', error);
    }
  };

  useEffect(() => {
    fetchName();

    const syncName = () => {
      setUserType(localStorage.getItem('userType') || 'individual');
      fetchName();
    };

    window.addEventListener('authChange', syncName);
    window.addEventListener('storage', syncName);

    return () => {
      window.removeEventListener('authChange', syncName);
      window.removeEventListener('storage', syncName);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
    setIsLoggedIn(isCurrentlyLoggedIn);

    if (isCurrentlyLoggedIn && !localStorage.getItem("hasTakenQuiz")) {
      const hasSeenQuizModal = localStorage.getItem("hasSeenQuizModal") === "true";
      if (!hasShownQuizPopup && !hasSeenQuizModal) {
        const timer = setTimeout(() => {
          setShowQuizModal(true);
          setHasShownQuizPopup(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn, hasShownQuizPopup]);

  const handleDeleteAccount = async () => {
    const apiUrl = userType === "corporate" ? `${API_BASE}/corporate/delete-account` : `${API_BASE}/Userprofile/delete-account`;

    try {
      await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Account deleted successfully");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
      localStorage.removeItem("hasSeenQuizModal");
      localStorage.removeItem("hasTakenQuiz");
      logout();
      navigate("/");
      setShowDeleteModal(false);
      setProfileImage(profile);
      setIsMobileMenuOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleNavClick = async (label) => {
    await logActivity(`${label} tab clicked`);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login to access the Dashboard");
    } else {
      handleNavClick("Dashboard");
    }
  };

  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_TTL) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (err) {
      setError("Failed to parse cached data.");
      console.error("Cache parse error:", err);
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      setError("Failed to cache data.");
      console.error("Cache set error:", err);
    }
  };

  const fetchData = async (value) => {
    if (!value || value.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    const cacheKey = `search_${value.toLowerCase()}`;
    const cachedResults = getCachedData(cacheKey);
    if (cachedResults) {
      setResults(cachedResults);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
        params: { prefix: value },

      });
      const filteredResults = response.data.filter((symbol) =>
        symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
      );
      if (filteredResults.length === 0) {
        setError("No matching stocks found.");
      } else {
        setResults(filteredResults);
        setCachedData(cacheKey, filteredResults);
        setError(null);
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
      setResults([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/equityhub?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setResults([]);
      setError(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSelectItem = (item) => {
    if (item && item.symbol) {
      setSearchQuery("");
      setResults([]);
      setError(null);
      navigate(`/equityhub?query=${encodeURIComponent(item.symbol)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setError(null);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleCloseModal = () => setShowLoginModal(false);

  const handleLoginSuccess = () => {
    login();
    handleCloseModal();
    setIsLoggedIn(true);
    localStorage.removeItem("hasSeenQuizModal");
    localStorage.removeItem("hasTakenQuiz");
    setHasShownQuizPopup(false);
    fetchProfileImage();
  };

  const handleOpenQuiz = () => {
    setShowQuizModal(true);
    setIsMobileMenuOpen(false);
  };

  const handleDrawerToggle = (e) => {
    const isChecked = e.target.checked;
    setIsDrawerOpen(isChecked);
    if (isChecked) {
      if (profileCollapseRef.current) profileCollapseRef.current.checked = false;
      if (settingsCollapseRef.current) settingsCollapseRef.current.checked = false;
      if (quizCollapseRef.current) quizCollapseRef.current.checked = false;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = (
    <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
      <li>
        <Link
          to="/"
          onClick={() => handleNavClick("Home")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/") ? "text-primary-500 underline underline-offset-8 font-bold" : "text-gray-800 dark:text-white"} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Home
        </Link>
      </li>
      <li
        id="portfolio-dropdown"
        className="relative"
        onMouseEnter={() => setIsPortfolioOpen(true)}
        onMouseLeave={() => setIsPortfolioOpen(false)}
      >
        <span
          onClick={handlePortfolioClick}
          className={`text-base font-medium transition-all duration-300 ease-in-out cursor-pointer 
            ${isActive("/portDash") ? "text-primary-500 underline underline-offset-8" : "text-gray-800 dark:text-white"} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Portfolio
        </span>
        {isPortfolioOpen && (
          <ul
            className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-10 lg:mt-0 border border-gray-200 dark:border-gray-700"
            onMouseEnter={() => setIsPortfolioOpen(true)}
            onMouseLeave={() => setIsPortfolioOpen(false)}
          >
            <li>
              <Link
                to="/portDash"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500"
              >
                Upload File
              </Link>
              <Link
                to="/portDash/my-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500"
              >
                Saved Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/resculpt-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500"
              >
                Recreate Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/customize-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500"
              >
                Create own Portfolio
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link
          to="/equityhub"
          onClick={() => handleNavClick("Equity Hub")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/equityhub") ? "text-primary-500 underline underline-offset-8" : "text-gray-800 dark:text-white"} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Equity Insights
        </Link>
      </li>

      <li>
        <Link
          to="/dashboard"
          onClick={handleDashboardClick}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/dashboard") ? "text-primary-500 underline underline-offset-8" : "text-gray-800 dark:text-white"} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Research Panel
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          onClick={() => handleNavClick("About")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/about") ? "text-primary-500 underline underline-offset-8" : "text-gray-800 dark:text-white"} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          About
        </Link>
      </li>
      <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
        <Link
          to="/plan"
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            handleNavClick("Subscription");
          }}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive('/plan') ? 'text-primary-500 underline underline-offset-8' : 'text-gray-800 dark:text-white'} 
            hover:text-primary-600 hover:underline hover:underline-offset-8 lg:text-lg`}
          data-tour="subscription-link"
        >
          Subscription
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 py-3 transition-all duration-300 ${sticky
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-y-4">
          {/* Logo */}
          {/* <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-white flex items-center">
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              #CMDA
            </span>
            <span className="ml-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded-full">
              BETA
            </span>
          </Link> */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center">{navItems}</div>

          {/* Right Side Items */}
          <div className="flex items-center gap-2 sm:gap-4 max-w-[90%] sm:max-w-[400px] lg:max-w-[500px]">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {/* Search Field */}
            <div ref={searchRef} className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] flex">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search "
                    className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm text-sm sm:text-base transition-all"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchQuery(value);
                      fetchData(value);
                    }}
                  />
                  <Search className="absolute left-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <button
                    type="submit"
                    className="absolute right-1 flex items-center justify-center w-8 h-8 rounded-full text-white transition-colors duration-200"
                    aria-label="Search stocks"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
                {results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <SearchList
                      results={results}
                      query={searchQuery}
                      onSelectItem={handleSelectItem}
                      onClear={handleClearSearch}
                    />
                  </div>
                )}
              </form>
            </div>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden sm:flex bg-primary-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-primary-600 transition-colors duration-200 shadow-sm"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="hidden sm:flex bg-primary-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-primary-600 transition-colors duration-200 shadow-sm"
              >
                Login
              </button>
            )}

            {/* Profile Section */}
            {isLoggedIn && (
              <div className="drawer drawer-end z-50" id="profile-section">
                <input
                  id="my-drawer-4"
                  type="checkbox"
                  className="drawer-toggle"
                  onChange={handleDrawerToggle}
                />
                <div className="drawer-content">
                  <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                    <div className="avatar">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary-500 overflow-hidden shadow-md">
                        <img
                          src={profileImage || profile}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = profile; // Fallback on error
                          }}
                        />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-4" className="drawer-overlay bg-black/50"></label>
                  <div className="menu w-full sm:w-80 min-h-full bg-white dark:bg-gray-800 p-4 sm:p-5 shadow-lg text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 shadow-sm mb-4">
                      <div className="avatar">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-400 overflow-hidden shadow-md">
                         <ProfilePicture src={profileImage || profile}  />
                        </div>
                      </div>
                      {userType && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Welcome back,</p>
                          <Username userType={userType} setFullName={setFullName} />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                      <div className="collapse bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                        <input type="checkbox" className="peer" ref={profileCollapseRef} />
                        <div className="collapse-title flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-3">
                          <AiFillProfile className="text-primary-500 mt-1" />
                          View Profile
                        </div>
                        <div className="collapse-content px-4 pb-3 text-sm sm:text-base">
                          <Profile />
                        </div>
                      </div>
                      <div className="collapse bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                        <input type="checkbox" className="peer" ref={settingsCollapseRef} />
                        <div className="collapse-title flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-3">
                          <MdOutlineSettings className="text-primary-500 mt-1" />
                          Settings
                        </div>
                        <div className="collapse-content px-4 pb-3 text-sm sm:text-base">
                          {userType === "individual" ? (
                            <div className="border-b border-gray-200 dark:border-gray-600 flex gap-3 sm:gap-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-3 cursor-pointer">
                              <CgProfile className="text-primary-500 mt-1" />
                              <Link
                                to="/updateIndividualProfile"
                                className="block py-1 hover:text-primary-500"
                              >
                                Update Profile
                              </Link>
                            </div>
                          ) : (
                            <div className="border-b border-gray-200 dark:border-gray-600 flex gap-3 sm:gap-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-3 cursor-pointer">
                              <CgProfile className="text-primary-500 mt-1" />
                              <Link
                                to="/updateCorporateProfile"
                                className="block py-1 hover:text-primary-500"
                              >
                                Update Corporate Profile
                              </Link>
                            </div>
                          )}
                          <div className="border-b border-gray-200 dark:border-gray-600 flex gap-3 sm:gap-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-3 cursor-pointer"
                            onClick={handleLogout}
                          >
                            <HiOutlineLogout className="text-primary-500 mt-1" />
                            <span className="tracking-wide">Logout</span>
                          </div>
                          <div className="flex gap-3 sm:gap-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md p-3 cursor-pointer"
                            onClick={() => setShowDeleteModal(true)}
                          >
                            <MdDelete className="text-primary-500 mt-1" />
                            <span className="tracking-wide">Delete Account</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                        <div
                          className="flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-3 cursor-pointer"
                          onClick={handleOpenQuiz}
                        >
                          <BsQuestionCircle className="text-primary-500 mt-1" />
                          <span className="tracking-wide">Take Quiz</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="btn btn-ghost text-gray-800 dark:text-white p-2"
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <IoMdMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <div
          ref={mobileMenuRef}
          className={`fixed inset-0 top-16 z-40 bg-white dark:bg-gray-800 lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-4 overflow-y-auto h-full">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    className="w-full px-5 py-2 pl-10 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm text-sm"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchQuery(value);
                      fetchData(value);
                    }}
                  />
                  <Search className="absolute left-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
                {results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <SearchList
                      results={results}
                      query={searchQuery}
                      onSelectItem={handleSelectItem}
                      onClear={handleClearSearch}
                    />
                  </div>
                )}
              </form>
            </div>

            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavClick("Home")}
                  className={`block py-2 text-base ${isActive("/") ? "text-primary-500" : "text-gray-800 dark:text-white"}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <details>
                  <summary
                    className={`flex items-center justify-between py-2 text-base ${isActive("/portDash") ? "text-primary-500" : "text-gray-800 dark:text-white"} cursor-pointer`}
                  >
                    <span>Portfolio</span>
                    <IoMdArrowDropdown className="text-lg" />
                  </summary>
                  <ul className="pl-4 space-y-2 mt-2">
                    <li>
                      <Link
                        to="/portDash"
                        onClick={() => handleNavClick("Upload File")}
                        className="block py-1 text-sm text-gray-800 dark:text-white hover:text-primary-500"
                      >
                        Upload File
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/portDash/my-portfolio"
                        onClick={() => handleNavClick("Saved Portfolio")}
                        className="block py-1 text-sm text-gray-800 dark:text-white hover:text-primary-500"
                      >
                        Saved Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/portDash/resculpt-portfolio"
                        onClick={() => handleNavClick("Recreate Portfolio")}
                        className="block py-1 text-sm text-gray-800 dark:text-white hover:text-primary-500"
                      >
                        Recreate Portfolio
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/portDash/customize-portfolio"
                        onClick={() => handleNavClick("Create own Portfolio")}
                        className="block py-1 text-sm text-gray-800 dark:text-white hover:text-primary-500"
                      >
                        BuildUrPortfolio
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link
                  to="/equityhub"
                  onClick={() => handleNavClick("Equity Hub")}
                  className={`block py-2 text-base ${isActive("/equityhub") ? "text-primary-500" : "text-gray-800 dark:text-white"}`}
                >
                  Equity
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  onClick={handleDashboardClick}
                  className={`block py-2 text-base ${isActive("/dashboard") ? "text-primary-500" : "text-gray-800 dark:text-white"}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleNavClick("About")}
                  className={`block py-2 text-base ${isActive("/about") ? "text-primary-500" : "text-gray-800 dark:text-white"}`}
                >
                  About
                </Link>
              </li>
              <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
                <Link
                  to="/plan"
                  onClick={() => handleNavClick("Subscription")}
                  className={`block py-2 text-base ${isActive('/plan') ? 'text-primary-500' : 'text-gray-800 dark:text-white'} hover:text-primary-500`}
                  data-tour="subscription-link"
                >
                  Subscription
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <button
                    onClick={handleOpenQuiz}
                    className="block w-full text-left py-2 text-base text-gray-800 dark:text-white hover:text-primary-500"
                  >
                    Take Quiz
                  </button>
                </li>
              )}
              <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-gray-800 dark:text-white w-full py-2"
                >
                  {theme === 'dark' ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
              </li>
              <li className="pt-2 border-t border-gray-200 dark:border-gray-700">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-primary-500 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="w-full bg-primary-500 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-primary-600 transition-colors duration-200 shadow-sm"
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Login
              isOpen={showLoginModal}
              onClose={handleCloseModal}
              onSuccess={() => {
                setIsLoggedIn(true);
                handleCloseModal();
                handleLoginSuccess();
              }}
            />
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      <QuizModal
        showModal={showQuizModal}
        setShowModal={setShowQuizModal}
        allQuestions={quizQuestions}
        userId={localStorage.getItem("userId") || null}
        onLoginClick={handleLoginClick}
      />

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md shadow-xl">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">Confirm Account Deletion</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-sm sm:text-base hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded text-sm sm:text-base hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;