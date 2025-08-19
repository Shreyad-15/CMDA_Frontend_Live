
// -----------------------wc-----------------------
// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import Profile from "./Profile";
// import UpdateIndividualProfile from "./UpdateIndividualProfile";
// import UpdateCorporateProfile from "./UpdateCorporateProfile";
// import Username from "./Username";
// import ProfilePicture from "./ProfilePicture";
// import profile from "../../public/profile.png";
// import { CgLogIn } from "react-icons/cg";
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
//   const [userType, setUserType] = useState(null);
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

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Inactivity timer
//   let inactivityTimer;

//   // Reset inactivity timer on user activity
//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     if (isLoggedIn) {
//       inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//     }
//   };

//   // Handle logout
//   const handleLogout = async () => {
//     const token = localStorage.getItem('authToken');
//     const email = JwtUtil.extractEmail(token);

//     if (!email) {
//       toast.error("Missing user email. Cannot logout.");
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       localStorage.removeItem("hasShownQuizPopup");
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
//       console.error(
//         error.response?.data?.message || "Logout API failed"
//       );
//     } finally {
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userType');
//       localStorage.removeItem('userEmail');
//       logout();
//       navigate('/');
//       setIsLoggedIn(false);
//       setHasShownQuizPopup(false);
//       localStorage.removeItem("hasShownQuizPopup");
//     }
//   };

//   // Check token expiration periodically
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

//   // Set up inactivity timer and event listeners
//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) {
//         clearTimeout(inactivityTimer);
//       }
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   // Fetch quiz questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) {
//           setQuizQuestions(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Portfolio dropdown handlers
//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // User data and profile image
//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const fetchImage = async () => {
//       try {
//         const url = await getProfilePicture();
//         setProfileImage(url || profile);
//       } catch (error) {
//         console.error("Failed to fetch profile picture:", error);
//         setProfileImage(profile);
//         toast.error("Failed to load profile picture");
//       }
//     };
//     fetchImage();
//   }, []);

//   // Check login status and trigger quiz pop-up
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn && !hasShownQuizPopup) {
//       const timer = setTimeout(() => {
//         setShowQuizModal(true);
//         setHasShownQuizPopup(true);
//         localStorage.setItem("hasShownQuizPopup", "true");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [isLoggedIn, hasShownQuizPopup]);

//   // Navigation handlers
//   const handleDeleteAccount = async () => {
//     const apiUrl =
//       userType === "corporate"
//         ? `${API_BASE}/corporate/delete-account`
//         : `${API_BASE}/Userprofile/delete-account`;

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
//       localStorage.removeItem("hasShownQuizPopup");
//       logout();
//       navigate("/");
//       setShowDeleteModal(false);
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

//   // Search functionality
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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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

//   // Login modal handlers
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//   };

//   // Navigation items
//   const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Equity Hub
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
//           className={`text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10"
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
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           About
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/plan"
//           onClick={() => handleNavClick("Subscription")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/plan") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Subscription
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <>
//       <nav
//         className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 md:px-2 py-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all ${
//           sticky ? "bg-opacity-90" : ""
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
//           <Link to="/" className="text-2xl font-bold text-white flex">
//             #CMD
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "1vh",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "25px",
//                   fontWeight: "900",
//                   background:
//                     "linear-gradient(45deg, #0e84f1ff, #1280acff, #08ebdfff, #33D4FF, #12b8ebff)",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
//                   marginTop: "23px",
//                 }}
//               >
//                 A
//               </h1>
//               <h1
//                 style={{
//                   fontSize: "25px",
//                   fontWeight: "900",
//                   background:
//                     "linear-gradient(45deg, #0e84f1ff, #1280acff, #08abebff, #33D4FF, #782fffff)",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
//                   marginTop: "23px",
//                 }}
//               >
//                 H
//               </h1>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
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

//           {/* Right Side Items with Fixed Width Container */}
//           <div className="flex items-center gap-2 max-w-[300px]">
//             {/* Search Field */}
//             <div className="relative w-64 flex-shrink-0 hidden md:block">
//               <form onSubmit={handleSearch} className="relative">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4" />
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
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full ring ring-gray-300 overflow-hidden">
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
//                   <div className="menu w-full dark:bg-slate-800 sm:w-80 min-h-full bg-white p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                       {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <p className="text-sm font-bold dark:text-white">{fullName}</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title dark:text-white flex gap-4 text-black text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm text-black">
//                           {userType === "individual" ? (
//                             <Link
//                               to="/updateIndividualProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Profile
//                             </Link>
//                           ) : (
//                             <Link
//                               to="/updateCorporateProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Corporate Profile
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title flex items-center gap-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-md p-4 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                           onClick={handleLogout}
//                         >
//                           <HiOutlineLogout className="text-blue-500 h-6 w-6" />
//                           <span className="tracking-wide">Logout</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title flex items-center gap-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 rounded-md p-4 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-900/50 cursor-pointer transition-colors duration-200"
//                           onClick={() => setShowDeleteModal(true)}
//                         >
//                           <MdDelete className="text-blue-500 h-6 w-6" />
//                           <span className="tracking-wide">Delete Account</span>
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
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity Hub
//               </Link>
//             </li>
//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/plan"
//                 onClick={() => handleNavClick("Subscription")}
//                 className={`block py-2 ${isActive("/plan") ? "text-sky-400" : "text-white"}`}
//               >
//                 Subscription
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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


// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs"; // Added icon for quiz
// import Profile from "./Profile";
// import UpdateIndividualProfile from "./UpdateIndividualProfile";
// import UpdateCorporateProfile from "./UpdateCorporateProfile";
// import Username from "./Username";
// import ProfilePicture from "./ProfilePicture";
// import profile from "../../public/profile.png";
// import { CgLogIn } from "react-icons/cg";
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
//   const [userType, setUserType] = useState(null);
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
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Inactivity timer
//   let inactivityTimer;

//   // Reset inactivity timer on user activity
//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     if (isLoggedIn) {
//       inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//     }
//   };

//   // Handle logout
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
//       console.error(
//         error.response?.data?.message || "Logout API failed"
//       );
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
//     }
//   };

//   // Check token expiration periodically
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         // toast.error("Session expired. Please log in again.");
//         handleLogout();
//       }
//     };

//     if (isLoggedIn) {
//       checkTokenExpiration();
//       const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//       return () => clearInterval(interval);
//     }
//   }, [isLoggedIn]);

//   // Set up inactivity timer and event listeners
//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) {
//         clearTimeout(inactivityTimer);
//       }
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   // Fetch quiz questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) {
//           setQuizQuestions(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Portfolio dropdown handlers
//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // User data and profile image
//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const fetchImage = async () => {
//       try {
//         const url = await getProfilePicture();
//         setProfileImage(url || profile);
//       } catch (error) {
//         console.error("Failed to fetch profile picture:", error);
//         setProfileImage(profile);
//         toast.error("Failed to load profile picture");
//       }
//     };
//     fetchImage();
//   }, []);

//   // Check login status and trigger quiz pop-up
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

//   // Navigation handlers
//   const handleDeleteAccount = async () => {
//     const apiUrl =
//       userType === "corporate"
//         ? `${API_BASE}/corporate/delete-account`
//         : `${API_BASE}/Userprofile/delete-account`;

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

//   // Search functionality
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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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

//   // Login modal handlers
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     // Reset quiz modal flags on login to ensure it shows again
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
//   };

//   // Quiz modal handler
//   const handleOpenQuiz = () => {
//     setShowQuizModal(true);
//   };

//   // Navigation items
//   const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Equity Hub
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
//           className={`text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10"
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
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           About
//         </Link>
//       </li>
//         <li className={isDisabled ? "disable" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
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
//         className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 md:px-2 py-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all ${
//           sticky ? "bg-opacity-90" : ""
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
//           <Link to="/" className="text-2xl font-bold text-white flex">
//             #CMD
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "1vh",
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "25px",
//                   fontWeight: "900",
//                   background:
//                     "linear-gradient(45deg, #0e84f1ff, #1280acff, #08ebdfff, #33D4FF, #12b8ebff)",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
//                   marginTop: "23px",
//                 }}
//               >
//                 A
//               </h1>
//               <h1
//                 style={{
//                   fontSize: "25px",
//                   fontWeight: "900",
//                   background:
//                     "linear-gradient(45deg, #0e84f1ff, #1280acff, #08abebff, #33D4FF, #782fffff)",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
//                   marginTop: "23px",
//                 }}
//               >
//                 H
//               </h1>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
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

//           {/* Right Side Items with Fixed Width Container */}
//           <div className="flex items-center gap-2 max-w-[300px]">
//             {/* Search Field */}
//             <div className="relative w-64 flex-shrink-0 hidden md:block">
//               <form onSubmit={handleSearch} className="relative">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4" />
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
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full ring ring-gray-300 overflow-hidden">
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
//                   <div className="menu w-full dark:bg-slate-800 sm:w-80 min-h-full bg-white p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                       {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <p className="text-sm font-bold dark:text-white">{fullName}</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title dark:text-white flex gap-4 text-black text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm text-black">
//                           {userType === "individual" ? (
//                             <Link
//                               to="/updateIndividualProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Profile
//                             </Link>
//                           ) : (
//                             <Link
//                               to="/updateCorporateProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Corporate Profile
//                             </Link>
//                           )}
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title flex items-center gap-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-md p-4 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                           onClick={handleOpenQuiz}
//                         >
//                           <BsQuestionCircle className="text-blue-500 h-6 w-6" />
//                           <span className="tracking-wide">Take Quiz</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title flex items-center gap-4 text-lg font-semibold text-gray-800 hover:bg-gray-100 rounded-md p-4 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-200"
//                           onClick={handleLogout}
//                         >
//                           <HiOutlineLogout className="text-blue-500 h-6 w-6" />
//                           <span className="tracking-wide">Logout</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title flex items-center gap-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 rounded-md p-4 dark:bg-gray-900 dark:text-red-400 dark:hover:bg-red-900/50 cursor-pointer transition-colors duration-200"
//                           onClick={() => setShowDeleteModal(true)}
//                         >
//                           <MdDelete className="text-blue-500 h-6 w-6" />
//                           <span className="tracking-wide">Delete Account</span>
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
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity Hub
//               </Link>
//             </li>
//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "disable" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-white hover:text-sky-400"
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               // onSuccess={handleLoginSuccess}
//               	onSuccess={() => {
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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






// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs"; // Added icon for quiz
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
//   const [userType, setUserType] = useState(null);
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
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Inactivity timer
//   let inactivityTimer;

//   // Reset inactivity timer on user activity
//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     if (isLoggedIn) {
//       inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//     }
//   };

//   // Handle logout
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
//       console.error(
//         error.response?.data?.message || "Logout API failed"
//       );
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
//     }
//   };

//   // Check token expiration periodically
//   useEffect(() => {
//     const checkTokenExpiration = () => {
//       const token = localStorage.getItem('authToken');
//       if (token && JwtUtil.isTokenExpired(token)) {
//         // toast.error("Session expired. Please log in again.");
//         handleLogout();
//       }
//     };

//     if (isLoggedIn) {
//       checkTokenExpiration();
//       const interval = setInterval(checkTokenExpiration, TOKEN_CHECK_INTERVAL);
//       return () => clearInterval(interval);
//     }
//   }, [isLoggedIn]);

//   // Set up inactivity timer and event listeners
//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) {
//         clearTimeout(inactivityTimer);
//       }
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   // Fetch quiz questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) {
//           setQuizQuestions(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Portfolio dropdown handlers
//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // User data and profile image
//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const fetchImage = async () => {
//       try {
//         const url = await getProfilePicture();
//         setProfileImage(url || profile);
//       } catch (error) {
//         console.error("Failed to fetch profile picture:", error);
//         setProfileImage(profile);
//         toast.error("Failed to load profile picture");
//       }
//     };
//     fetchImage();
//   }, []);

//   // Check login status and trigger quiz pop-up
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

//   // Navigation handlers
//   const handleDeleteAccount = async () => {
//     const apiUrl =
//       userType === "corporate"
//         ? `${API_BASE}/corporate/delete-account`
//         : `${API_BASE}/Userprofile/delete-account`;

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

//   // Search functionality
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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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

//   // Login modal handlers
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     // Reset quiz modal flags on login to ensure it shows again
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
//   };

//   // Quiz modal handler
//   const handleOpenQuiz = () => {
//     setShowQuizModal(true);
//   };

//   // Navigation items
//   const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Equity
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
//           className={`text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10"
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
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           About
//         </Link>
//       </li>
//         <li className={isDisabled ? "disable" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
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
//         className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 md:px-2 py-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all ${
//           sticky ? "bg-opacity-90" : ""
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
//        <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//   <div style={{
//     display: 'inline-flex',
//     alignItems: 'flex-start',
//     gap: '0', // Changed from 4px to 0 to remove gap
//     position: 'relative',
//   }}>
//     {/* #CMD */}
//     <span style={{
//       fontSize: '28px',
//       fontWeight: '800',
//       color: '#ffffff',
//       letterSpacing: '0.05em',
//       textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//     }}>
//       #CMD
//     </span>

//     {/* AH with gradient */}
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '1px',
//       marginLeft: '-2px', // Added to compensate for letter spacing
//     }}>
//       <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         A
//       </span>
//       <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #782fff)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         H
//       </span>
//     </div>

//     {/* BETA badge */}
//     <span style={{
//       position: 'absolute',
//       right: '-38px', // Adjusted position
//       bottom: '16px',
//       backgroundColor: '#ffffff',
//       color: '#17b3f1ff',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       padding: '2px 6px',
//       borderRadius: '4px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//       transform: 'rotate(12deg)',
//       whiteSpace: 'nowrap',
//       lineHeight: '1',
//     }}>
//       BETA
//     </span>
//   </div>
// </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
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

//           {/* Right Side Items with Fixed Width Container */}
//           <div className="flex items-center gap-2 max-w-[300px]">
//             {/* Search Field */}
//             <div className="relative w-64 flex-shrink-0 hidden md:block">
//               <form onSubmit={handleSearch} className="relative">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4" />
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
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full ring ring-gray-300 overflow-hidden">
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
//                   <div className="menu w-full dark:bg-slate-800 sm:w-80 min-h-full bg-white p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                       {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <p className="text-sm font-bold dark:text-white">{fullName}</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title dark:text-white flex gap-4 text-black text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400 mt-1" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400 mt-1" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm text-black">




//                           {userType === "individual" ? (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateIndividualProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Profile
//                             </Link>
//                             </div>
//                           ) : (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateCorporateProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Corporate Profile
//                             </Link>
//                             </div>
//                           )}

//            <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                          className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                            onClick={handleLogout}
//                         >
//                           <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Logout</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                           onClick={() => setShowDeleteModal(true)}
//                         >
//                           <MdDelete  className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Delete Account</span>
//                         </div>
//                       </div>



//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                          className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3"   onClick={handleOpenQuiz}
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
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
//               </Link>
//             </li>
//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "disable" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-white hover:text-sky-400"
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               // onSuccess={handleLoginSuccess}
//               	onSuccess={() => {
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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



// import React, { useEffect, useState } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs"; // Added icon for quiz
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
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Inactivity timer
//   let inactivityTimer;

//   // Reset inactivity timer on user activity
//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     if (isLoggedIn) {
//       inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//     }
//   };

//   // Handle logout
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
//   setProfileImage(profile); 
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
//       console.error(
//         error.response?.data?.message || "Logout API failed"
//       );
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
//  setProfileImage(profile);
//     }
//   };

//   // Check token expiration periodically
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

//   // Set up inactivity timer and event listeners
//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) {
//         clearTimeout(inactivityTimer);
//       }
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   // Fetch quiz questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) {
//           setQuizQuestions(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Portfolio dropdown handlers
//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Function to fetch profile image
//   const fetchProfileImage = async () => {
//     try {
//       const url = await getProfilePicture();
//       setProfileImage(url ? `${url}?t=${Date.now()}` : profile); // Cache-busting parameter
//     } catch (error) {
//       console.error("Failed to fetch profile picture:", error);
//       setProfileImage(profile);
//       toast.error("Failed to load profile picture");
//     }
//   };

//   // User data and profile image
//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn) {
//       fetchProfileImage(); // Fetch image if user is logged in
//     } else {
//       setProfileImage(profile); // Set default image if not logged in
//     }
//   }, [isLoggedIn]);




//   const fetchName = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;

//     const email = JwtUtil.extractEmail(token);
//     if (!email) return;

//     try {
//       const url =
//         userType === 'corporate'
//           ? `/corporate/${email}`
//           : `/Userprofile/${email}`;

//       const response = await axios.get(`${API_BASE}${url}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const name =
//         userType === 'corporate'
//           ? response.data.employeeName
//           : response.data.fullname || response.data.fullName;

//       setUserName(name);
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





//   // Check login status and trigger quiz pop-up
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

//   // Navigation handlers
//   const handleDeleteAccount = async () => {
//     const apiUrl =
//       userType === "corporate"
//         ? `${API_BASE}/corporate/delete-account`
//         : `${API_BASE}/Userprofile/delete-account`;

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
//  setProfileImage(profile);
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

//   // Search functionality
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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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

//   // Login modal handlers
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     // Reset quiz modal flags on login to ensure it shows again
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
// fetchProfileImage();
//   };

//   // Quiz modal handler
//   const handleOpenQuiz = () => {
//     setShowQuizModal(true);
//   };

//   // Navigation items
//   const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Equity
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
//           className={`text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10"
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
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           About
//         </Link>
//       </li>
//         <li className={isDisabled ? "disable" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
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
//         className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 md:px-2 py-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all ${
//           sticky ? "bg-opacity-90" : ""
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
//        <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//   <div style={{
//     display: 'inline-flex',
//     alignItems: 'flex-start',
//     gap: '0', // Changed from 4px to 0 to remove gap
//     position: 'relative',
//   }}>
//     {/* #CMD */}
//     <span style={{
//       fontSize: '28px',
//       fontWeight: '800',
//       color: '#ffffff',
//       letterSpacing: '0.05em',
//       textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//     }}>
//       #CMD
//     </span>

//     {/* AH with gradient */}
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '1px',
//       marginLeft: '-2px', // Added to compensate for letter spacing
//     }}>
//       <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         A
//       </span>
//       {/* <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #782fff)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         H
//       </span> */}
//     </div>

//     {/* BETA badge */}
//     <span style={{
//       position: 'absolute',
//       right: '-38px', // Adjusted position
//       bottom: '16px',
//       backgroundColor: '#ffffff',
//       color: '#17b3f1ff',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       padding: '2px 6px',
//       borderRadius: '4px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//       transform: 'rotate(12deg)',
//       whiteSpace: 'nowrap',
//       lineHeight: '1',
//     }}>
//       BETA
//     </span>
//   </div>
// </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
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

//           {/* Right Side Items with Fixed Width Container */}
//           <div className="flex items-center gap-2 max-w-[300px]">
//             {/* Search Field */}
//             <div className="relative w-64 flex-shrink-0 hidden md:block">
//               <form onSubmit={handleSearch} className="relative">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4" />
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
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full ring ring-gray-300 overflow-hidden">
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
//                   <div className="menu w-full dark:bg-slate-800 sm:w-80 min-h-full bg-white p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                        {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <p className="text-sm font-bold dark:text-white">{fullName}</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title dark:text-white flex gap-4 text-black text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400 mt-1" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <input type="checkbox" className="peer" />
//                         <div className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400 mt-1" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm text-black">




//                           {userType === "individual" ? (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateIndividualProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Profile
//                             </Link>
//                             </div>
//                           ) : (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateCorporateProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Corporate Profile
//                             </Link>
//                             </div>
//                           )}

//            <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                          className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                            onClick={handleLogout}
//                         >
//                           <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Logout</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                           onClick={() => setShowDeleteModal(true)}
//                         >
//                           <MdDelete  className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Delete Account</span>
//                         </div>
//                       </div>



//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                          className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3"   onClick={handleOpenQuiz}
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
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
//               </Link>
//             </li>
//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "disable" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-white hover:text-sky-400"
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               // onSuccess={handleLoginSuccess}
//               	onSuccess={() => {
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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


// -0---------------------------------wc----------------------

// import React, { useEffect, useState, useRef } from "react";
// import Login from "./Login";
// import { logActivity, getProfilePicture } from "../services/api";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaSun, FaMoon } from "react-icons/fa";
// import { MdDelete, MdOutlineSettings } from "react-icons/md";
// import { AiFillProfile } from "react-icons/ai";
// import { BsQuestionCircle } from "react-icons/bs"; // Added icon for quiz
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
//  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Track drawer state
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { login, logout } = useAuth();

//   const profileCollapseRef = useRef(null);
//   const settingsCollapseRef = useRef(null);
//   const quizCollapseRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
//   const TOKEN_CHECK_INTERVAL = 60 * 1000; // 1 minute in milliseconds

//   // Inactivity timer
//   let inactivityTimer;

//   // Reset inactivity timer on user activity
//   const resetInactivityTimer = () => {
//     if (inactivityTimer) {
//       clearTimeout(inactivityTimer);
//     }
//     if (isLoggedIn) {
//       inactivityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
//     }
//   };

//   // Handle logout
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
//   setProfileImage(profile); 
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
//       console.error(
//         error.response?.data?.message || "Logout API failed"
//       );
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
//  setProfileImage(profile);
//     }
//   };

//   // Check token expiration periodically
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

//   // Set up inactivity timer and event listeners
//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

//     const handleActivity = () => {
//       resetInactivityTimer();
//     };

//     if (isLoggedIn) {
//       resetInactivityTimer();
//       events.forEach(event => window.addEventListener(event, handleActivity));
//     }

//     return () => {
//       if (inactivityTimer) {
//         clearTimeout(inactivityTimer);
//       }
//       events.forEach(event => window.removeEventListener(event, handleActivity));
//     };
//   }, [isLoggedIn]);

//   // Fetch quiz questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/assessment/questions`);
//         if (res.status === 200) {
//           setQuizQuestions(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch quiz questions", error);
//         toast.error("Failed to load quiz questions");
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Portfolio dropdown handlers
//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     setIsPortfolioOpen(true);
//     handleNavClick("Portfolio");
//     navigate("/portDash");
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Function to fetch profile image
//   const fetchProfileImage = async () => {
//     try {
//       const url = await getProfilePicture();
//       setProfileImage(url ? `${url}?t=${Date.now()}` : profile); // Cache-busting parameter
//     } catch (error) {
//       console.error("Failed to fetch profile picture:", error);
//       setProfileImage(profile);
//       toast.error("Failed to load profile picture");
//     }
//   };

//   // User data and profile image
//   useEffect(() => {
//     const storedUserType = localStorage.getItem("userType") || "individual";
//     setUserType(storedUserType);

//     const token = localStorage.getItem("authToken");
//     const isCurrentlyLoggedIn = !!token && !JwtUtil.isTokenExpired(token);
//     setIsLoggedIn(isCurrentlyLoggedIn);

//     if (isCurrentlyLoggedIn) {
//       fetchProfileImage(); // Fetch image if user is logged in
//     } else {
//       setProfileImage(profile); // Set default image if not logged in
//     }
//   }, [isLoggedIn]);




//   const fetchName = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;

//     const email = JwtUtil.extractEmail(token);
//     if (!email) return;

//     try {
//       const url =
//         userType === 'corporate'
//           ? `/corporate/${email}`
//           : `/Userprofile/${email}`;

//       const response = await axios.get(`${API_BASE}${url}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const name =
//         userType === 'corporate'
//           ? response.data.employeeName
//           : response.data.fullname || response.data.fullName;

//       setUserName(name);
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





//   // Check login status and trigger quiz pop-up
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

//   // Navigation handlers
//   const handleDeleteAccount = async () => {
//     const apiUrl =
//       userType === "corporate"
//         ? `${API_BASE}/corporate/delete-account`
//         : `${API_BASE}/Userprofile/delete-account`;

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
//  setProfileImage(profile);
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

//   // Search functionality
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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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

//   // Login modal handlers
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//     setIsLoggedIn(true);
//     // Reset quiz modal flags on login to ensure it shows again
//     localStorage.removeItem("hasSeenQuizModal");
//     localStorage.removeItem("hasTakenQuiz");
//     setHasShownQuizPopup(false);
// fetchProfileImage();
//   };

//   // Quiz modal handler
//   const handleOpenQuiz = () => {
//     setShowQuizModal(true);
//   };

//     // Reset collapse states when drawer is opened
//   const handleDrawerToggle = (e) => {
//     const isChecked = e.target.checked;
//     setIsDrawerOpen(isChecked);
//     if (isChecked) {
//       // Reset collapse inputs when drawer opens
//       if (profileCollapseRef.current) profileCollapseRef.current.checked = false;
//       if (settingsCollapseRef.current) settingsCollapseRef.current.checked = false;
//       if (quizCollapseRef.current) quizCollapseRef.current.checked = false;
//     }
// };
//     const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={() => handleNavClick("Home")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Home
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/equityhub"
//           onClick={() => handleNavClick("Equity Hub")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Equity
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
//           className={`text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10"
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
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={() => handleNavClick("About")}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//         >
//           About
//         </Link>
//       </li>
//         <li className={isDisabled ? "disable" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             handleNavClick("Subscription");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
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
//         className={`fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 md:px-2 py-2 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all ${
//           sticky ? "bg-opacity-90" : ""
//         }`}
//       >
//         <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
//        <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//   <div style={{
//     display: 'inline-flex',
//     alignItems: 'flex-start',
//     gap: '0', // Changed from 4px to 0 to remove gap
//     position: 'relative',
//   }}>
//     {/* #CMD */}
//     <span style={{
//       fontSize: '28px',
//       fontWeight: '800',
//       color: '#ffffff',
//       letterSpacing: '0.05em',
//       textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//     }}>
//       #CMD
//     </span>

//     {/* AH with gradient */}
//     <div style={{
//       display: 'inline-flex',
//       alignItems: 'center',
//       gap: '1px',
//       marginLeft: '-2px', // Added to compensate for letter spacing
//     }}>
//       <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         A
//       </span>
//       {/* <span style={{
//         fontSize: '28px',
//         fontWeight: '800',
//         background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #782fff)',
//         WebkitBackgroundClip: 'text',
//         backgroundClip: 'text',
//         color: 'transparent',
//         textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//         lineHeight: '1.2',
//       }}>
//         H
//       </span> */}
//     </div>

//     {/* BETA badge */}
//     <span style={{
//       position: 'absolute',
//       right: '-38px', // Adjusted position
//       bottom: '16px',
//       backgroundColor: '#ffffff',
//       color: '#17b3f1ff',
//       fontSize: '12px',
//       fontWeight: 'bold',
//       padding: '2px 6px',
//       borderRadius: '4px',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//       transform: 'rotate(12deg)',
//       whiteSpace: 'nowrap',
//       lineHeight: '1',
//     }}>
//       BETA
//     </span>
//   </div>
// </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:block">{navItems}</div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
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

//           {/* Right Side Items with Fixed Width Container */}
//           <div className="flex items-center gap-2 max-w-[300px]">
//             {/* Search Field */}
//             <div className="relative w-64 flex-shrink-0 hidden md:block">
//               <form onSubmit={handleSearch} className="relative">
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search stocks..."
//                     className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm"
//                     value={searchQuery}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setSearchQuery(value);
//                       fetchData(value);
//                     }}
//                   />
//                   <button
//                     type="submit"
//                     className="absolute right-2 flex items-center justify-center w-6 h-6 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
//                     aria-label="Search stocks"
//                   >
//                     <Search className="w-4 h-4" />
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
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Logout
//               </button>
//             ) : (
//               <button
//                 onClick={handleLoginClick}
//                 className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//               >
//                 Login
//               </button>
//             )}

//             {/* Profile Section */}
//             {isLoggedIn && (
//               <div className="drawer drawer-end z-50" id="profile-section">
//                 <input
// 		 id="my-drawer-4" 
// 		 type="checkbox"
// 		  className="drawer-toggle"
// 		   onChange={handleDrawerToggle}
// 		    />
//                 <div className="drawer-content">
//                   <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
//                     <div className="avatar">
//                       <div className="w-10 h-10 rounded-full ring ring-gray-300 overflow-hidden">
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
//                   <div className="menu w-full dark:bg-slate-800 sm:w-80 min-h-full bg-white p-5 shadow-lg text-white">
//                     <div className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
//                           <ProfilePicture />
//                         </div>
//                       </div>
//                        {userType && (
//                         <div className="dark:bg-slate-800">
//                           <p className="text-xs text-gray-500">Welcome back,</p>
//                           <p className="text-sm font-bold dark:text-white">{fullName}</p>
//                           <Username userType={userType} setFullName={setFullName} />
//                         </div>
//                       )}
//                     </div>
//                     <div className="mt-6 space-y-4 dark:bg-slate-800">
//                       <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={profileCollapseRef} />
//                         <div className="collapse-title dark:text-white flex gap-4 text-black text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <AiFillProfile className="text-blue-400 mt-1" />
//                           View Profile
//                         </div>
//                         <div className="collapse-content px-4 pb-3 dark:text-white text-sm">
//                           <Profile />
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl shadow dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <input type="checkbox" className="peer" ref={settingsCollapseRef} />
//                         <div className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3">
//                           <MdOutlineSettings className="text-blue-400 mt-1" />
//                           Settings
//                         </div>
//                         <div className="collapse-content px-4 pb-3 text-sm text-black">




//                           {userType === "individual" ? (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateIndividualProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Profile
//                             </Link>
//                             </div>
//                           ) : (
//                                   <div
//                           className="collapse-title  border-b-2 border-gray-400 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"

//                         >
//                            <CgProfile  className="text-blue-700 font-bold mt-2" />
//                             <Link
//                               to="/updateCorporateProfile"
//                               className="block py-1 dark:text-white hover:text-blue-500"
//                             >
//                               Update Corporate Profile
//                             </Link>
//                             </div>
//                           )}

//            <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                          className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                            onClick={handleLogout}
//                         >
//                           <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Logout</span>
//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
//                         <div
//                           className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-4 text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
//                           onClick={() => setShowDeleteModal(true)}
//                         >
//                           <MdDelete  className="text-blue-700 font-bold mt-1" />
//                           <span className="tracking-wide">Delete Account</span>
//                         </div>
//                       </div>



//                         </div>
//                       </div>
//                       <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl shadow dark:hover:bg-slate-800 dark:shadow-sm dark:shadow-white dark:bg-slate-800">
//                         <div
//                          className="collapse-title text-black dark:text-white flex gap-4 text-lg font-medium hover:bg-gray-200 rounded-md p-3"   onClick={handleOpenQuiz}
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
//         <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//           <ul className="p-4 space-y-4">
//             <li>
//               <Link
//                 to="/"
//                 onClick={() => handleNavClick("Home")}
//                 className={`block py-2 ${isActive("/") ? "text-sky-400" : "text-white"}`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
//               </Link>
//             </li>
//             <li>
//               <details>
//                 <summary
//                   className={`block flex gap-1 py-2 ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
//                 >
//                   Portfolio
//                   <IoMdArrowDropdown className="mt-1" />
//                 </summary>
//                 <ul className="pl-4 space-y-2 mt-2">
//                   <li>
//                     <Link
//                       to="/portDash"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Upload File
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/my-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Saved Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/resculpt-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       Recreate Portfolio
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/portDash/customize-portfolio"
//                       className="block py-1 text-white hover:text-sky-400"
//                     >
//                       BuildUrPortfolio
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard"
//                 onClick={handleDashboardClick}
//                 className={`block py-2 ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 onClick={() => handleNavClick("About")}
//                 className={`block py-2 ${isActive("/about") ? "text-sky-400" : "text-white"}`}
//               >
//                 About
//               </Link>
//             </li>
//             <li className={isDisabled ? "disable" : ""}>
//               <Link
//                 to="/plan"
//                 className={`block py-2 ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                 data-tour="subscription-link"
//               >
//                 Subscription
//               </Link>
//             </li>
//             {isLoggedIn && (
//               <li>
//                 <button
//                   onClick={handleOpenQuiz}
//                   className="block py-2 text-white hover:text-sky-400"
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               // onSuccess={handleLoginSuccess}
//               	onSuccess={() => {
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
//           <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
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
//               <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//               <p className="mt-2 text-gray-600">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="mt-6 flex justify-center gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
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
//     // const [searchedQueries, setSearchedQueries] = useState(new Set());
//     // const initialQuery = queryParams.get("query") || "";

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
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value, shouldSave: false },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("No matching stocks found.");
//       } else {
//         setResults(filteredResults);
//         setCachedData(cacheKey, filteredResults);
//         setError(null);
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
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
//               <Link
//                 to="/equityhub"
//                 onClick={() => handleNavClick("Equity Hub")}
//                 className={`block py-2 text-base ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
//               >
//                 Equity
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
//               {/* <Link
//                 to="/plan"
//                 className={`block py-2 text-base ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                 data-tour="subscription-link"
//               > */}
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
import { FaSun, FaMoon } from "react-icons/fa";
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
import { IoMdArrowDropdown } from "react-icons/io";
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
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout } = useAuth();
  const profileCollapseRef = useRef(null);
  const settingsCollapseRef = useRef(null);
  const quizCollapseRef = useRef(null);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const CACHE_TTL = 60 * 60 * 1000;
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
  const TOKEN_CHECK_INTERVAL = 60 * 1000;

  let inactivityTimer;

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
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleNavClick = async (label) => {
    await logActivity(`${label} tab clicked`);
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
      setError(null);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
        params: { prefix: value },
        timeout: 10000,
      });

      const filteredResults = response.data;
      if (filteredResults.length === 0) {
        setError("No matching stocks found.");
      } else {
        setResults(filteredResults);
        setCachedData(cacheKey, filteredResults);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching search results:", {
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      });
      setError(
        error.response?.status === 404
          ? "Endpoint not found. Check server configuration."
          : error.response?.data?.error || error.message || "Failed to fetch search results."
      );
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
    }
  };

  const handleSelectItem = (item) => {
    if (item && item.symbol) {
      setSearchQuery("");
      setResults([]);
      setError(null);
      navigate(`/equityhub?query=${encodeURIComponent(item.symbol)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setError(null);
  };

  const handleLoginClick = () => setShowLoginModal(true);
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

  const handleOpenQuiz = () => setShowQuizModal(true);

  const handleDrawerToggle = (e) => {
    const isChecked = e.target.checked;
    setIsDrawerOpen(isChecked);
    if (isChecked) {
      if (profileCollapseRef.current) profileCollapseRef.current.checked = false;
      if (settingsCollapseRef.current) settingsCollapseRef.current.checked = false;
      if (quizCollapseRef.current) quizCollapseRef.current.checked = false;
    }
  };

  const navItems = (
    <ul className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
      <li>
        <Link
          to="/"
          onClick={() => handleNavClick("Home")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/") ? "text-sky-400 underline underline-offset-8 font-bold" : "text-white"} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/equityhub"
          onClick={() => handleNavClick("Equity Hub")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/equityhub") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Equity
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
            ${isActive("/portDash") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Portfolio
        </span>
        {isPortfolioOpen && (
          <ul
            className="absolute left-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2 z-10 lg:mt-0"
            onMouseEnter={() => setIsPortfolioOpen(true)}
            onMouseLeave={() => setIsPortfolioOpen(false)}
          >
            <li>
              <Link
                to="/portDash"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
              >
                Upload File
              </Link>
              <Link
                to="/portDash/my-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
              >
                Saved Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/resculpt-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
              >
                Recreate Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/customize-portfolio"
                onClick={() => setIsPortfolioOpen(false)}
                className="block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
              >
                BuildUrPortfolio
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link
          to="/dashboard"
          onClick={handleDashboardClick}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/dashboard") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          onClick={() => handleNavClick("About")}
          className={`text-base font-medium transition-all duration-300 ease-in-out 
            ${isActive("/about") ? "text-sky-400 underline underline-offset-8" : "text-white"} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
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
            ${isActive('/plan') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
            hover:text-sky-700 hover:underline hover:underline-offset-8 lg:text-lg`}
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
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-10 py-3 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 shadow-md transition-all duration-300 ${sticky ? "bg-opacity-90" : ""
          }`}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between items-center gap-y-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
            <div style={{
              display: 'inline-flex',
              alignItems: 'flex-start',
              gap: '0',
              position: 'relative',
            }}>
              <span style={{
                fontSize: 'clamp(20px, 5vw, 28px)',
                fontWeight: '800',
                color: '#ffffff',
                letterSpacing: '0.05em',
                textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
              }}>
                #CMD
              </span>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1px',
                marginLeft: '-2px',
              }}>
                <span style={{
                  fontSize: 'clamp(20px, 5vw, 28px)',
                  fontWeight: '800',
                  background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
                  lineHeight: '1.2',
                }}>
                  A
                </span>
              </div>
              <span style={{
                position: 'absolute',
                right: '-38px',
                bottom: '16px',
                backgroundColor: '#ffffff',
                color: '#17b3f1ff',
                fontSize: 'clamp(10px, 2vw, 12px)',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '4px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                transform: 'rotate(12deg)',
                whiteSpace: 'nowrap',
                lineHeight: '1',
              }}>
                BETA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center">{navItems}</div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <label htmlFor="mobile-menu" className="btn btn-ghost text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-2 sm:gap-4 max-w-[90%] sm:max-w-[400px] lg:max-w-[500px]">
            {/* Search Field */}
            <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchQuery(value);
                      fetchData(value);
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
                    aria-label="Search stocks"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
                {results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-slate-800 text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-white hover:text-black transition-colors duration-200"
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
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring ring-gray-300 overflow-hidden">
                        <img
                          src={profileImage || profile}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </label>
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-4" className="drawer-overlay bg-black/50"></label>
                  <div className="menu w-full sm:w-80 min-h-full bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-lg text-white">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-slate-800 shadow">
                      <div className="avatar">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-400 overflow-hidden">
                          <ProfilePicture />
                        </div>
                      </div>
                      {userType && (
                        <div className="dark:bg-slate-800">
                          <p className="text-xs text-gray-500">Welcome back,</p>
                          <Username userType={userType} setFullName={setFullName} />
                        </div>
                      )}
                    </div>
                    <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 dark:bg-slate-800">
                      <div className="collapse bg-white rounded-md shadow dark:shadow-white dark:bg-slate-800">
                        <input type="checkbox" className="peer" ref={profileCollapseRef} />
                        <div className="collapse-title dark:text-white flex gap-3 sm:gap-4 text-black text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
                          <AiFillProfile className="text-blue-400 mt-1" />
                          View Profile
                        </div>
                        <div className="collapse-content px-4 pb-3 dark:text-white text-sm sm:text-base">
                          <Profile />
                        </div>
                      </div>
                      <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
                        <input type="checkbox" className="peer" ref={settingsCollapseRef} />
                        <div className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3">
                          <MdOutlineSettings className="text-blue-400 mt-1" />
                          Settings
                        </div>
                        <div className="collapse-content px-4 pb-3 text-sm sm:text-base text-black">
                          {userType === "individual" ? (
                            <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
                              <CgProfile className="text-blue-700 font-bold mt-2" />
                              <Link
                                to="/updateIndividualProfile"
                                className="block py-1 dark:text-white hover:text-blue-500"
                              >
                                Update Profile
                              </Link>
                            </div>
                          ) : (
                            <div className="collapse-title border-b-2 border-gray-400 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer">
                              <CgProfile className="text-blue-700 font-bold mt-2" />
                              <Link
                                to="/updateCorporateProfile"
                                className="block py-1 dark:text-white hover:text-blue-500"
                              >
                                Update Corporate Profile
                              </Link>
                            </div>
                          )}
                          <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div
                              className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
                              onClick={handleLogout}
                            >
                              <HiOutlineLogout className="text-blue-700 font-bold mt-1" />
                              <span className="tracking-wide">Logout</span>
                            </div>
                          </div>
                          <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
                            <div
                              className="collapse-title border-b-2 border-gray-400 hover:text-blue-500 flex gap-3 sm:gap-4 text-sm sm:text-base text-black font-medium hover:bg-gray-200 rounded-md p-3 dark:bg-slate-800 dark:text-white cursor-pointer"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              <MdDelete className="text-blue-700 font-bold mt-1" />
                              <span className="tracking-wide">Delete Account</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="collapse bg-white rounded-md shadow-lg transition-all duration-300 hover:shadow-xl dark:shadow-sm dark:shadow-white dark:bg-slate-800">
                        <div
                          className="collapse-title text-black dark:text-white flex gap-3 sm:gap-4 text-base sm:text-lg font-medium hover:bg-gray-200 rounded-md p-3"
                          onClick={handleOpenQuiz}
                        >
                          <BsQuestionCircle className="text-blue-500 mt-1" />
                          <span className="tracking-wide">Take Quiz</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Content */}
        <input type="checkbox" id="mobile-menu" className="hidden peer" />
        <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-4 rounded-lg shadow-lg">
          <ul className="p-4 space-y-4">
            <li>
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] hidden sm:flex">
                <form onSubmit={handleSearch} className="relative w-full">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search stocks..."
                      className="w-full px-5 py-1.5 sm:px-4 sm:py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white text-gray-800 shadow-sm text-sm sm:text-base"
                      value={searchQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        fetchData(value);
                      }}
                    />
                    <button
                      type="submit"
                      className="absolute right-2 flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sky-600 hover:bg-sky-700 text-white transition-colors duration-200"
                      aria-label="Search stocks"
                    >
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  {error && <div className="absolute mt-1 text-xs text-red-600">{error}</div>}
                  {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
            </li>
            <li>
              <Link
                to="/"
                onClick={() => handleNavClick("Home")}
                className={`block py-2 text-base ${isActive("/") ? "text-sky-400" : "text-white"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/equityhub"
                onClick={() => handleNavClick("Equity Hub")}
                className={`block py-2 text-base ${isActive("/equityhub") ? "text-sky-400" : "text-white"}`}
              >
                Equity
              </Link>
            </li>
            <li>
              <details>
                <summary
                  className={`block flex gap-1 py-2 text-base ${isActive("/portDash") ? "text-sky-400" : "text-white"}`}
                >
                  Portfolio
                  <IoMdArrowDropdown className="mt-1" />
                </summary>
                <ul className="pl-4 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/portDash"
                      className="block py-1 text-sm text-white hover:text-sky-400"
                    >
                      Upload File
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/portDash/my-portfolio"
                      className="block py-1 text-sm text-white hover:text-sky-400"
                    >
                      Saved Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/portDash/resculpt-portfolio"
                      className="block py-1 text-sm text-white hover:text-sky-400"
                    >
                      Recreate Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/portDash/customize-portfolio"
                      className="block py-1 text-sm text-white hover:text-sky-400"
                    >
                      BuildUrPortfolio
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={handleDashboardClick}
                className={`block py-2 text-base ${isActive("/dashboard") ? "text-sky-400" : "text-white"}`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => handleNavClick("About")}
                className={`block py-2 text-base ${isActive("/about") ? "text-sky-400" : "text-white"}`}
              >
                About
              </Link>
            </li>
            <li className={isDisabled ? "opacity-50 pointer-events-none" : ""}>
              <Link
                to="/plan"
                className={`block py-2 text-base ${isActive('/plan') ? 'text-sky-400' : 'text-white'} hover:text-sky-400`}
                data-tour="subscription-link"
              >
                Subscription
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <button
                  onClick={handleOpenQuiz}
                  className="block py-2 text-base text-white hover:text-sky-400"
                >
                  Take Quiz
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
          <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90%] sm:max-w-md">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
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
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded text-sm sm:text-base hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-300 text-gray-800 rounded text-sm sm:text-base hover:bg-gray-400"
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