
// ------------------woco-----------------------


// import { useState, useEffect } from "react";
// import { YearFilterProvider } from "./context/YearFilterContext";
// import GraphSlider from "./GraphSlider";
// import Navbar from "../Navbar";

// const MyPortfolioPage = () => {
//   const [savedPortfolios, setSavedPortfolios] = useState([]);
//   const [activeTabIndex, setActiveTabIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const [activeTab, setActiveTab] = useState("portfolio1");

//   // Fetch saved portfolios
//   const fetchSavedPortfolio = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setError("Please login to view your portfolios");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${API_BASE}/file/saved`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         setError(err.error || "Failed to fetch saved portfolios");
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       if (data.length > 0) {
//         setSavedPortfolios(data);
//         setActiveTabIndex(0);
//         localStorage.setItem("uploadId", data[0].uploadId);
//       } else {
//         setSavedPortfolios([]);
//         setError("");
//         localStorage.removeItem("uploadId");
//       }
//     } catch (err) {
//       console.error("Error fetching saved portfolios:", err);
//       setError("Network error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab !== "portfolio1") return;
//     fetchSavedPortfolio();
//   }, [activeTab]);

//   const handleSavedPortfolioClick = (index) => {
//     setActiveTabIndex(index);
//     localStorage.setItem("uploadId", savedPortfolios[index].uploadId);
//   };

//   const handleDeletePortfolio = async (uploadId, index) => {
//     const confirmed = window.confirm("Are you sure you want to delete this portfolio?");
//     if (!confirmed) return;

//     try {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         setError("Session expired. Please login again.");
//         return;
//       }

//       const response = await fetch(`${API_BASE}/file/delete?uploadId=${uploadId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const message = await response.text();
//         throw new Error(message);
//       }

//       setSavedPortfolios((prev) => {
//         const newList = prev.filter((p) => p.uploadId !== uploadId);
//         if (newList.length > 0) {
//           localStorage.setItem("uploadId", newList[0].uploadId);
//           setActiveTabIndex(0);
//         } else {
//           localStorage.removeItem("uploadId");
//           setActiveTabIndex(0);
//         }
//         return newList;
//       });
//     } catch (err) {
//       console.error("Error deleting portfolio:", err);
//       setError(err.message || "Error deleting portfolio.");
//     }
//   };

//   const activeUploadId = savedPortfolios.length > 0 ? savedPortfolios[activeTabIndex]?.uploadId : null;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:text-white">
//     <Navbar/>
//       <div className="text-center mt-16 mb-10 dark:text-white">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">My Saved Portfolios</h1>
//         <p className="text-lg text-gray-600 dark:text-gray-300">Manage and analyze your saved portfolios</p>
//       </div>

//       <div className="flex justify-center mb-8">
//         <div className="inline-flex bg-gray-100 p-1 rounded-lg dark:bg-slate-800 dark:text-white">
//           <TabButton
//             label="My Portfolios"
//             isActive={activeTab === "portfolio1"}
//             onClick={() => setActiveTab("portfolio1")}
//           />
//           {/* Additional tabs can be added here */}
//         </div>
//       </div>

//       {activeTab === "portfolio1" && (
//         <div className="space-y-8">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600 mb-4"></div>
//               <p className="text-gray-600 text-lg">Loading your portfolios...</p>
//             </div>
//           ) : error ? (
//             <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
//               <div className="flex items-center">
//                 <svg className="h-6 w-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 <p className="text-red-700 font-medium">{error}</p>
//               </div>
//             </div>
//           ) : savedPortfolios.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
//               <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
//                 <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-medium text-gray-900 mb-2">No portfolios yet</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 You haven't saved any portfolios yet. Upload your first portfolio to get started with analysis.
//               </p>
//               <button 
//                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
//                 onClick={() => {/* Add your upload handler here */}}
//               >
//                 <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Upload Portfolio
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {savedPortfolios.map((portfolio, index) => (
//                   <div
//                     key={portfolio.uploadId}
//                     className={`relative p-6 rounded-xl shadow-sm border transition-all duration-200 ease-in-out flex flex-col h-full dark:bg-slate-800 dark:text-white ${
//                       index === activeTabIndex
//                         ? "ring-2 ring-sky-500 bg-sky-50 border-sky-200 dark:text-white"
//                         : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300 dark:text-white"
//                     }`}
//                   >
//                     <div
//                       onClick={() => handleSavedPortfolioClick(index)}
//                       className="flex flex-col flex-grow cursor-pointer dark:text-white"
//                     >
//                       <div className="flex justify-between items-start mb-3">
//                         <h3 className="text-xl font-bold text-gray-800 truncate dark:text-white">{portfolio.PortfolioName}</h3>
//                         {index === activeTabIndex && (
//                           <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:text-black">
//                             Active
//                           </span>
//                         )}
//                       </div>
                      
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4 self-start dark:text-black">
//                         {portfolio.platform}
//                       </span>
                      
//                       <div className="flex items-center text-sm text-gray-500 mb-5">
//                         <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
//                         </svg>
//                         {new Date(
//                           portfolio.uploadedAt[0],
//                           portfolio.uploadedAt[1] - 1,
//                           portfolio.uploadedAt[2]
//                         ).toLocaleDateString("en-GB", {
//                           day: "numeric",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDeletePortfolio(portfolio.uploadId, index);
//                       }}
//                       className="mt-auto w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                     >
//                       <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                       Delete Portfolio
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {activeUploadId && (
//                 <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ease-in-out dark:bg-slate-800 dark:text-white">
//                   <h3 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">Portfolio Analysis</h3>
//                   <YearFilterProvider>
//                     <GraphSlider key={activeUploadId} uploadId={activeUploadId} />
//                   </YearFilterProvider>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// function TabButton({ label, isActive, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
//         isActive 
//           ? "bg-white text-sky-600 shadow-sm border border-gray-300"
//           : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// export default MyPortfolioPage;


import { useState, useEffect } from "react";
import { YearFilterProvider } from "./context/YearFilterContext";
import GraphSlider from "./GraphSlider";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const MyPortfolioPage = () => {
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const [activeTab, setActiveTab] = useState("portfolio1");
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/portDash");
  };

  // Fetch saved portfolios
  const fetchSavedPortfolio =async (uploadId, index) => {
     
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("authToken");

      if ( token === null ) {
        setError("Please login to view your portfolios");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/file/saved`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Failed to fetch saved portfolios");
        setLoading(false);
        return;
        return;
      }

      const data = await response.json();
      if (data.length > 0) {
        setSavedPortfolios(data);
        // Find the index of the portfolio matching the stored uploadId
        const storedUploadId = localStorage.getItem("uploadId");
        const initialIndex = storedUploadId
          ? data.findIndex((p) => p.uploadId.toString() === storedUploadId)
          : 0;
        setActiveTabIndex(initialIndex !== -1 ? initialIndex : 0);
        localStorage.setItem("uploadId", data[initialIndex !== -1 ? initialIndex : 0].uploadId.toString());
      } else {
        setSavedPortfolios([]);
        setError("");
        localStorage.removeItem("uploadId");
        setActiveTabIndex(0);
      }
    } catch (err) {
      console.error("Error fetching saved portfolios:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUploadId = localStorage.getItem("uploadId");
      if (storedUploadId && savedPortfolios.length > 0) {
        const index = savedPortfolios.findIndex((p) => p.uploadId.toString() === storedUploadId);
        if (index !== -1 && index !== activeTabIndex) {
          setActiveTabIndex(index);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [savedPortfolios, activeTabIndex]);

  useEffect(() => {
    if (activeTab !== "portfolio1") return;
    fetchSavedPortfolio();
  }, [activeTab]);

  const handleSavedPortfolioClick = (index) => {
    setActiveTabIndex(index);
    localStorage.setItem("uploadId", savedPortfolios[index].uploadId.toString());
  };

  const handleDeletePortfolio = async (uploadId, index) => {
    const confirmed = window.confirm("Are you sure you want to delete this portfolio?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Session expired. Please login again.");
        return;
      }

      const response = await fetch(`${API_BASE}/file/delete?uploadId=${uploadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      setSavedPortfolios((prev) => {
        const newList = prev.filter((p) => p.uploadId !== uploadId);
        if (newList.length > 0) {
          localStorage.setItem("uploadId", newList[0].uploadId.toString());
          setActiveTabIndex(0);
        } else {
          localStorage.removeItem("uploadId");
          setActiveTabIndex(0);
        }
        return newList;
      });
    } catch (err) {
      console.error("Error deleting portfolio:", err);
      setError(err.message || "Error deleting portfolio.");
    }
  };

  const activeUploadId = savedPortfolios.length > 0 ? savedPortfolios[activeTabIndex]?.uploadId : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:text-white">
      <Navbar />
      <div className="text-center mt-24 mb-10 dark:text-white">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">My Saved Portfolios</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Manage and analyze your saved portfolios</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 p-1 rounded-lg dark:bg-slate-800 dark:text-white">
          <TabButton
            label="My Portfolios"
            isActive={activeTab === "portfolio1"}
            onClick={() => setActiveTab("portfolio1")}
          />
        </div>
      </div>

      {activeTab === "portfolio1" && (
        <div className="space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading your portfolios...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          ) : savedPortfolios.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                You haven't saved any portfolios yet. Upload your first portfolio to get started with analysis.
              </p>
              <button
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
                onClick={handleUploadClick}
              >
                <svg className="-ml-1 mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Upload Portfolio
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPortfolios.map((portfolio, index) => (
                  <div
                    key={portfolio.uploadId}
                    className={`relative p-6 rounded-xl shadow-sm border transition-all duration-200 ease-in-out flex flex-col h-full dark:bg-slate-800 dark:text-white ${
                      index === activeTabIndex
                        ? "ring-2 ring-sky-500 bg-sky-50 border-sky-200 dark:text-white"
                        : "bg-white border-gray-200 hover:shadow-md hover:border-gray-300 dark:text-white"
                    }`}
                  >
                    <div
                      onClick={() => handleSavedPortfolioClick(index)}
                      className="flex flex-col flex-grow cursor-pointer dark:text-white"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800 truncate dark:text-white">{portfolio.PortfolioName}</h3>
                        {index === activeTabIndex && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:text-black">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4 self-start dark:text-black">
                        {portfolio.platform}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 mb-5">
                        <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(
                          portfolio.uploadedAt[0],
                          portfolio.uploadedAt[1] - 1,
                          portfolio.uploadedAt[2]
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePortfolio(portfolio.uploadId, index);
                      }}
                      className="mt-auto w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Portfolio
                    </button>
                  </div>
                ))}
              </div>

              {activeUploadId && (
                <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 ease-in-out dark:bg-slate-800 dark:text-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 dark:text-white">Portfolio Analysis</h3>
                  <YearFilterProvider>
                    <GraphSlider key={activeUploadId} uploadId={activeUploadId} />
                  </YearFilterProvider>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

function TabButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? "bg-white text-sky-600 shadow-sm border border-gray-300"
          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

export default MyPortfolioPage;