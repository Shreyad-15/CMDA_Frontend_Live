// import React, { useEffect, useState } from 'react';
// import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { MdOutlineDashboardCustomize, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
// import { BiSolidSave } from 'react-icons/bi';
// import { IoMdClose, IoMdSave } from 'react-icons/io';
// import { FaHome } from 'react-icons/fa';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Link, useLocation } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import SidebarRight from './SidebarRight';
// import AddNewModal from './AddNewModal';
// import DragStartModal from './DragStartModal';
// // import PortfolioSelectModal from './PortfolioSelectModal';
// import DroppableArea from './DroppableArea';
// import { equityHubMap, portfolioMap } from './ComponentRegistry';
// import { GoSidebarExpand } from 'react-icons/go';
// import { GraphDataProvider } from '../Portfolio/GraphDataContext';
// import PortfolioSelectModal from './PortfolioSelectModal';
// import {  FaChartLine, FaBriefcase } from 'react-icons/fa';

// Modal.setAppElement('#root');

// const DashBoard = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const [showModal, setShowModal] = useState(false);
//   const [tabs, setTabs] = useState(['Dashboard 1']);
//   const [activeTab, setActiveTab] = useState('Dashboard 1');
//   const [uploadId, setUploadId] = useState(null);
//   const [platform, setPlatform] = useState('');
//   const [symbol, setSymbol] = useState(null);
//   const [savedStocks, setSavedStocks] = useState([]);
//   const [savedPortfolios, setSavedPortfolios] = useState([]);
//   const [droppedMap, setDroppedMap] = useState({ 'Dashboard 1': { equity: [], portfolio: [] } });
//   const [editingTab, setEditingTab] = useState(null);
//   const [editedTabName, setEditedTabName] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchedStocks, setSearchedStocks] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showDragModal, setShowDragModal] = useState(false);
//   const [showPortfolioModal, setShowPortfolioModal] = useState(false);
//   const [collapsed, setCollapsed] = useState(true);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dragCountMap, setDragCountMap] = useState({ 'Dashboard 1': {} });
//   const [currentDragItem, setCurrentDragItem] = useState(null);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get('query') || '';

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//     useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
//   );

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) setIsLoggedIn(true);
//   }, []);

//   // Fetch saved portfolios
//   const fetchSavedPortfolio = async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         setError('Please login to view your portfolios');
//         return;
//       }
//       const response = await fetch(`${API_BASE}/file/saved`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) {
//         const err = await response.json();
//         setError(err.error || 'Failed to fetch saved portfolios');
//         return;
//       }
//       const data = await response.json();
//       if (data.length > 0) {
//         setSavedPortfolios(data);
//         setUploadId(data[0].uploadId);
//         setPlatform(data[0].platform);
//       } else {
//         setSavedPortfolios([]);
//         setError('No portfolios found');
//       }
//     } catch (err) {
//       console.error('Error fetching saved portfolios:', err);
//       setError('Network error. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchSavedPortfolio();
//   }, [API_BASE]);

//   const handleStockSearch = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/stocks/test/search?query=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (Array.isArray(data) && data.length > 0) {
//         setSearchedStocks(data);
//         setSavedStocks(data);
//       } else {
//         setSearchedStocks([]);
//         toast.info('No stocks found for the search term.');
//         setError('Company not found');
//       }
//     } catch (err) {
//       console.error('Error fetching stock suggestions:', err);
//       setSearchedStocks([]);
//       setError('Company not found in our list. Please check the name and search again.');
//     }
//   };

//   const handleRenameTab = (oldName, newName) => {
//     if (!newName || newName.trim() === '') return;
//     if (tabs.includes(newName)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prevTabs) => prevTabs.map((tab) => (tab === oldName ? newName : tab)));
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     setDragCountMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     if (activeTab === oldName) setActiveTab(newName);
//     setEditingTab(null);
//     setEditedTabName('');
//   };

//   const handleDeleteComponent = (areaId, index) => {
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[activeTab] = {
//         ...prev[activeTab],
//         [areaId]: prev[activeTab][areaId].filter((_, idx) => idx !== index),
//       };
//       return updated;
//     });
//     const label = droppedMap[activeTab][areaId][index].label;
//     const remaining = droppedMap[activeTab][areaId].filter((item, idx) => idx !== index && item.label === label);
//     if (remaining.length === 0) {
//       setDragCountMap((prev) => ({
//         ...prev,
//         [activeTab]: { ...prev[activeTab], [label]: 0 },
//       }));
//     }
//   };

//   const handleClearCompany = (companyName) => {
//     setDroppedMap((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         equity: prev[activeTab].equity.filter((item) => item.companyName !== companyName),
//       },
//     }));
//     const affectedLabels = droppedMap[activeTab].equity
//       .filter((item) => item.companyName === companyName)
//       .map((item) => item.label);
//     setDragCountMap((prev) => {
//       const updated = { ...prev, [activeTab]: { ...prev[activeTab] } };
//       affectedLabels.forEach((label) => {
//         const remaining = droppedMap[activeTab].equity.filter(
//           (item) => item.label === label && item.companyName !== companyName
//         );
//         updated[activeTab][label] = remaining.length > 0 ? prev[activeTab][label] || 1 : 0;
//       });
//       return updated;
//     });
//     toast.success(`Company ${companyName} and associated graphs removed`);
//   };

//   const generateDefaultDashboardName = async (baseName = 'Dashboard') => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (existingNames.includes(defaultName) || tabs.includes(defaultName));
//       return defaultName;
//     } catch (err) {
//       console.error('Error fetching dashboards for name generation:', err);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (tabs.includes(defaultName));
//       return defaultName;
//     }
//   };

//   const handleNewDashboard = async (title) => {
//     const newTitle = title && title.trim() ? title : await generateDefaultDashboardName();
//     if (tabs.includes(newTitle)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prev) => [...prev, newTitle]);
//     setDroppedMap((prev) => ({ ...prev, [newTitle]: { equity: [], portfolio: [] } }));
//     setActiveTab(newTitle);
//     setShowModal(false);
//     setDragCountMap((prev) => ({ ...prev, [newTitle]: {} }));
//     setIsMenuOpen(false);
//   };

//   const handleDragStart = (event) => {
//     const { active } = event;
//     const label = active?.data?.current?.label;
//     setCurrentDragItem(active?.data?.current);
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);
//     if (equityLabels.includes(label)) {
//       const currentDragCount = dragCountMap[activeTab]?.[label] || 0;
//       if (currentDragCount === 0 && !droppedMap[activeTab].equity.some((item) => item.label === label)) {
//         setShowDragModal(true);
//       } else if (currentDragCount >= 1) {
//         setShowDragModal(true);
//       }
//     } else if (portfolioLabels.includes(label)) {
//       setShowPortfolioModal(true);
//     }
//   };

//   const handleItemClick = (item) => {
//     const { id, label } = item;
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     let section = null;
//     if (equityLabels.includes(label)) section = 'equity';
//     if (portfolioLabels.includes(label)) section = 'portfolio';

//     if (section === 'equity') {
//       setCurrentDragItem({ label });
//       setShowDragModal(true);
//       return;
//     }

//     if (section === 'portfolio') {
//       setCurrentDragItem({ label });
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { over, active } = event;
//     const label = active?.data?.current?.label;
//     const id = active?.id;
//     if (!over || !label || !id) return;

//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     let section = null;
//     if (equityLabels.includes(label)) section = 'equity';
//     if (portfolioLabels.includes(label)) section = 'portfolio';

//     if (section && over.id !== section) {
//       toast.error(`"${label}" can only be dropped in the "${section}" section.`);
//       return;
//     }

//     if (section === 'equity') {
//       setCurrentDragItem(active?.data?.current);
//       setShowDragModal(true);
//       return;
//     }

//     if (section === 'portfolio') {
//       setCurrentDragItem(active?.data?.current);
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handlePortfolioSelect = (portfolio) => {
//     if (currentDragItem) {
//       const draggedItem = {
//         label: currentDragItem.label,
//         symbol: '',
//         companyName: '',
//         graphType: currentDragItem.label,
//         uploadId: portfolio.uploadId,
//         platform: portfolio.platform,
//         id: `${currentDragItem.label}-${Date.now()}`,
//       };

//       setDroppedMap((prev) => {
//         const currentTab = prev[activeTab] || { equity: [], portfolio: [] };
//         const currentSection = currentTab['portfolio'] || [];
//         return {
//           ...prev,
//           [activeTab]: { ...currentTab, portfolio: [...currentSection, draggedItem] },
//         };
//       });

//       setShowPortfolioModal(false);
//       setCurrentDragItem(null);
//     }
//   };

//   const getGridClass = () => 'grid-cols-1 sm:grid-cols-2';

//   const getVisibleItems = (items) => items;

//   useEffect(() => {
//     const fetchSavedStocks = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch(`${API_BASE}/stocks/saved`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           const symbols = data.map((stock) => stock.symbol);
//           setSymbol(symbols);
//         }
//       } catch (err) {
//         console.error('Failed to fetch saved stocks:', err);
//       }
//     };
//     fetchSavedStocks();
//   }, [API_BASE]);

//   const handleSaveDashboard = async () => {
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');
//     const userType = localStorage.getItem('userType');
//     const equityPlots = droppedMap?.[activeTab]?.equity || [];
//     const portfolioPlots = droppedMap?.[activeTab]?.portfolio || [];

//     if (!token) {
//       toast.error('Please login first to save your dashboard.');
//       return;
//     }

//     if (equityPlots.length === 0 && portfolioPlots.length === 0) {
//       toast.error('Please drag and drop at least one plot before saving.');
//       return;
//     }

//     let finalDashboardName = activeTab;
//     try {
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       if (existingNames.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     } catch (err) {
//       console.error('Error checking dashboard names:', err);
//       if (tabs.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     }

//     const savedData = {
//       dashboard: { dashboardName: finalDashboardName, userId: userId ? parseInt(userId) : 0, userType: userType || '' },
//       equityHubPlots: [],
//       portfolioPlots: [],
//     };

//     droppedMap[activeTab]?.equity?.forEach(({ label, symbol, companyName, graphType }) => {
//       let finalSymbol = symbol;
//       let finalCompany = companyName;

//       if (!finalSymbol || !finalCompany) {
//         const matched = savedStocks.find(
//           (stock) => stock.symbol === finalSymbol || stock.graphType === graphType || stock.label === label
//         );
//         if (matched) {
//           finalSymbol = finalSymbol || matched.symbol;
//           finalCompany = finalCompany || matched.companyName;
//         }
//       }

//       savedData.equityHubPlots.push({ symbol: finalSymbol, companyName: finalCompany, graphType: graphType || label });
//     });

//     droppedMap[activeTab]?.portfolio?.forEach(({ uploadId, platform, label }) => {
//       savedData.portfolioPlots.push({ uploadId, platform, graphType: label });
//     });

//     try {
//       const response = await fetch(`${API_BASE}/dashboard/save`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(savedData),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         toast.success(`Dashboard saved! ID: ${result.dashId}`);
//       } else {
//         toast.error('Failed to save dashboard');
//       }
//     } catch (err) {
//       console.error('Save failed:', err);
//       toast.error('Save failed');
//     }
//     setIsMenuOpen(false);
//   };

//   const handleDeleteDashboardAPI = async (dashboardName) => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/delete/${dashboardName}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to delete dashboard');
//       setTabs((prev) => prev.filter((tab) => tab !== dashboardName));
//       setDroppedMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       setDragCountMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       if (activeTab === dashboardName) {
//         const remainingTabs = tabs.filter((tab) => tab !== dashboardName);
//         setActiveTab(remainingTabs[0] || '');
//       }
//       toast.success('Dashboard deleted successfully');
//       setIsMenuOpen(false);
//     } catch (err) {
//       console.error('Delete error:', err);
//       toast.error('Failed to delete dashboard');
//     }
//   };

//   const getUniqueCompanies = () => {
//     const equityItems = droppedMap[activeTab]?.equity || [];
//     return [...new Set(equityItems.map((item) => item.companyName).filter(Boolean))];
//   };

//   const isDashboardEmpty = () => {
//     const currentTab = droppedMap[activeTab] || { equity: [], portfolio: [] };
//     return currentTab.equity.length === 0 && currentTab.portfolio.length === 0;
//   };

//   return (
//     <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//       <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
//         <div
//           className={`flex-1 transition-all duration-300 ease-in-out ${collapsed ? 'w-full' : 'sm:pr-64 xs:pr-56'} overflow-x-hidden`}
//         >
//           <header className="top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-gray-800 text-white shadow-md">
//             <h1 className="text-lg sm:text-xl font-semibold ">
//               <span className="text-gray-300">#CMDA</span><span className='text-sky-400'>Hub</span>
//             </h1>
//             <button
//               className="sm:hidden text-white hover:text-gray-300 transition-colors"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//               aria-expanded={isMenuOpen}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//                 />
//               </svg>
//             </button>
//             <div
//               className={`${
//                 isMenuOpen ? 'flex' : 'hidden'
//               } sm:flex flex-col sm:flex-row items-center justify-between gap-3 absolute sm:static top-16 left-0 right-0 bg-gray-800 sm:bg-transparent px-4 py-4 sm:py-0 sm:max-w-7xl sm:mx-4 sm:flex-1 transition-all duration-300 ease-in-out z-30 shadow-md sm:shadow-none border-b sm:border-none border-gray-700`}
//             >
//               <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:w-auto">
//                 {tabs.map((tab) => (
//                   <div key={tab} className="flex items-center bg-gray-700 px-3 py-1.5 rounded-md shadow-sm w-full sm:w-auto">
//                     {editingTab === tab ? (
//                       <div className="flex items-center gap-2 w-full">
//                         <input
//                           type="text"
//                           value={editedTabName}
//                           onChange={(e) => setEditedTabName(e.target.value)}
//                           onKeyDown={(e) => e.key === 'Enter' && handleRenameTab(tab, editedTabName)}
//                           className="w-full sm:w-32 px-2 py-1 text-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900 dark:text-white"
//                         />
//                         <button
//                           onClick={() => handleRenameTab(tab, editedTabName)}
//                           className="text-gray-300 hover:text-white transition-colors"
//                           title="Save"
//                         >
//                           <IoMdSave size={16} />
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2 w-full sm:w-auto">
//                         <button
//                           onClick={() => {
//                             setActiveTab(tab);
//                             setIsMenuOpen(false);
//                           }}
//                           className={`flex-1 sm:flex-none text-sm font-medium px-3 py-1 rounded-md transition-colors ${
//                             activeTab === tab ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-600'
//                           }`}
//                         >
//                           {tab}
//                         </button>
//                         <button
//                           onClick={() => {
//                             setEditingTab(tab);
//                             setEditedTabName(tab);
//                           }}
//                           className="text-gray-300 hover:text-white transition-colors"
//                           title="Rename"
//                         >
//                           <MdOutlineDriveFileRenameOutline size={16} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteDashboardAPI(tab)}
//                           className="text-gray-300 hover:text-white transition-colors"
//                           title="Delete"
//                         >
//                           <IoMdClose size={16} />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//               <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full sm:w-auto mt-3 sm:mt-0">
//                 <Link
//                   to="/"
//                   className="flex items-center gap-2 px-3 py-1.5  text-white  hover:bg-sky-700 transition-colors text-lg w-full sm:w-auto"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <FaHome size={16} />
//                    Home
//                 </Link>
//                 <Link
//                   to="/equityhub"
//                   className="flex items-center gap-2 px-3 py-1.5  text-white  hover:bg-sky-600 transition-colors text-lg w-full sm:w-auto"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                  <FaChartLine /> Equity
//                 </Link>
//                 <Link
//                   to="/portdash"
//                   className="flex items-center gap-2 px-3 py-1.5  text-white  hover:bg-sky-600 transition-colors text-lg w-full sm:w-auto"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <FaBriefcase /> Portfolio
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setShowModal(true);
//                     setIsMenuOpen(false);
//                   }}
//                   className="flex items-center gap-2 px-3 py-1.5  text-white r hover:bg-sky-600 transition-colors text-lg w-full sm:w-auto"
//                 >
//                   <MdOutlineDashboardCustomize size={16} /> Add
//                 </button>
//                 <button
//                   onClick={handleSaveDashboard}
//                   className="flex items-center gap-2 px-3 py-1.5  text-white hover:bg-sky-600 transition-colors text-lg w-full sm:w-auto"
//                 >
//                   <BiSolidSave size={16} /> Save
//                 </button>
//                 <Link
//                   to="/savedDashboard"
//                   onClick={() => {
//                     const token = localStorage.getItem('authToken');
//                     if (!token) {
//                       toast.error('Login first to see your dashboard.');
//                       return;
//                     }
//                     setIsMenuOpen(false);
//                   }}
//                   className="flex items-center gap-2 px-3 py-1.5  text-white  hover:bg-sky-600 transition-colors text-lg w-full sm:w-auto"
//                 >
//                   <BiSolidSave size={16} /> Saved Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setCollapsed(!collapsed);
//                     setIsMenuOpen(false);
//                   }}
//                   className="sm:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors text-sm w-full"
//                   aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
//                 >
//                   <GoSidebarExpand size={16} /> {collapsed ? 'Open Sidebar' : 'Close Sidebar'}
//                 </button>
//               </div>
//             </div>
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden sm:block text-white hover:text-gray-300 transition-colors"
//               aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d={collapsed ? 'M6 9l6 6 6-6' : 'M4 6h16M4 12h16M4 18h16'}
//                 />
//               </svg>
//             </button>
//           </header>

//           <div className="px-4 py-2 bg- dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 max-w-8xl mx-auto">
//             {getUniqueCompanies().length > 0 ? (
//               <div className="flex flex-wrap gap-2 items-center">
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Selected Stocks:
//                 </span>
//                 {getUniqueCompanies().map((companyName) => (
//                   <div
//                     key={companyName}
//                     className="flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
//                   >
//                     <span className="truncate max-w-xs">{companyName}</span>
//                     <button
//                       onClick={() => handleClearCompany(companyName)}
//                       className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//                       title="Remove stock"
//                       aria-label={`Remove ${companyName}`}
//                     >
//                       <IoMdClose size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 No stocks selected. Add stocks from the sidebar.
//               </p>
//             )}
//           </div>

//           <AnimatePresence>
//         {collapsed && isDashboardEmpty() && (
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.4 }}
//             className="text-center py-12 px-6 bg dark:bg-gray-800 rounded-xl dark:border-gray-700 max-w-3xl mx-auto mt-2"
//           >
//             <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//               Welcome to Your Dashboard
//             </h2>
//             <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
//               Open the sidebar and drag and drop your graph to get started!
//             </p>
//             <button
//               onClick={() => setCollapsed(false)}
//               className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-full hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
//             >
//               <GoSidebarExpand size={18} /> Open Sidebar
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//           <main className="px-4 py-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto min-h-[calc(100vh-4rem)]">
//             {['equity', 'portfolio'].map((areaId) => {
//               const droppedItems = droppedMap?.[activeTab]?.[areaId] || [];
//               const ComponentMap = areaId === 'equity' ? equityHubMap : portfolioMap;
//               const visibleItems = getVisibleItems(droppedItems);
//               return (
//                 <section key={areaId} className="space-y-4">
//                   <div className="text-center">
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                       {areaId === 'equity' ? 'Equity Hub Section' : 'Portfolio Section'}
//                     </h2>
//                     {areaId === 'equity' && droppedItems.length > 0 && (
//                       <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                         Companies: <span className="font-medium">{getUniqueCompanies().join(', ')}</span>
//                       </p>
//                     )}
//                   </div>
//                   <DroppableArea id={areaId}>
//                     {droppedItems.length === 0 ? (
//                       <div className="flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400">
//                         <svg
//                           className="h-10 w-10 mb-3"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M4 8v8m0 0h8m-8 0l8-8m4 8v-8m0 0H8m8 0l-8 8" />
//                         </svg>
//                         <p className="text-sm font-medium">Drop or tap components here</p>
//                       </div>
//                     ) : (
//                       <div className={`grid gap-4 ${getGridClass()}`}>
//                         {visibleItems.map(({ label, symbol, companyName, id, uploadId, platform }, idx) => {
//                           const isLastAndOdd = idx === visibleItems.length - 1 && visibleItems.length % 2 === 1;
//                           const Component = ComponentMap[label];
//                           if (!Component) {
//                             console.error(`Component for label "${label}" not found in ${areaId} map.`);
//                             return (
//                               <motion.div
//                                 key={`${areaId}-${id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${
//                                   isLastAndOdd ? 'sm:col-span-2' : ''
//                                 }`}
//                               >
//                                 <button
//                                   onClick={() => handleDeleteComponent(areaId, droppedItems.findIndex((item) => item.id === id))}
//                                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                   aria-label="Delete component"
//                                 >
//                                   ✕
//                                 </button>
//                                 <p className="text-red-500 text-sm">Component "{label}" not found</p>
//                               </motion.div>
//                             );
//                           }
//                           if (areaId === 'equity' && !symbol) {
//                             console.warn(`No symbol provided for ${label} (${companyName})`);
//                             return (
//                               <motion.div
//                                 key={`${areaId}-${id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${
//                                   isLastAndOdd ? 'sm:col-span-2' : ''
//                                 }`}
//                               >
//                                 <button
//                                   onClick={() => handleDeleteComponent(areaId, droppedItems.findIndex((item) => item.id === id))}
//                                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                   aria-label="Delete component"
//                                 >
//                                   ✕
//                                 </button>
//                                 <p className="text-yellow-500 text-sm">Waiting for company selection for {label}</p>
//                               </motion.div>
//                             );
//                           }
//                           return (
//                             <motion.div
//                               key={`${areaId}-${id}`}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.3, delay: idx * 0.1 }}
//                               className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${
//                                 isLastAndOdd ? 'sm:col-span-2' : ''
//                               }`}
//                             >
//                               <button
//                                 onClick={() => handleDeleteComponent(areaId, droppedItems.findIndex((item) => item.id === id))}
//                                 className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                 aria-label="Delete component"
//                               >
//                                 ✕
//                               </button>
//                               <h3 className="text-sm font-medium mb-3 text-gray-800 dark:text-white truncate">
//                                 {label} {companyName ? `(${companyName})` : platform ? `(${platform})` : ''}
//                               </h3>
//                               <div className="min-h-[200px] w-full overflow-hidden">
//                                 {areaId === 'equity' ? (
//                                   <Component symbol={symbol} key={`${id}-${symbol}`} />
//                                 ) : (
//                                   <GraphDataProvider>
//                                     <Component uploadId={uploadId} key={`${id}-${uploadId}`} />
//                                   </GraphDataProvider>
//                                 )}
//                               </div>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </DroppableArea>
//                 </section>
//               );
//             })}
//           </main>
//         </div>
//         <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
//         {showModal && <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />}
//         <DragStartModal
//           isOpen={showDragModal}
//           onClose={() => {
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           onSearch={handleStockSearch}
//           searchTerm={searchTerm}
//           setSearchTerm={(value) => {
//             setSearchTerm(value);
//             setError(null);
//             if (value.length >= 2) handleStockSearch();
//             else setSearchedStocks([]);
//           }}
//           searchedStocks={searchedStocks}
//           onSelectItem={(item) => {
//             if (currentDragItem) {
//               setDroppedMap((prev) => {
//                 const currentTab = prev[activeTab] || { equity: [], portfolio: [] };
//                 const equityItems = currentTab.equity || [];
//                 const lastItemIndex = equityItems.findLastIndex((i) => i.label === currentDragItem.label && !i.symbol);
//                 if (lastItemIndex >= 0) {
//                   const updatedItems = [...equityItems];
//                   updatedItems[lastItemIndex] = {
//                     ...updatedItems[lastItemIndex],
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, equity: updatedItems } };
//                 } else {
//                   const newItem = {
//                     label: currentDragItem.label,
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                     graphType: currentDragItem.label,
//                     id: `${currentDragItem.label}-${Date.now()}`,
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, equity: [...equityItems, newItem] } };
//                 }
//               });
//               setDragCountMap((prev) => ({
//                 ...prev,
//                 [activeTab]: { ...prev[activeTab], [currentDragItem.label]: (prev[activeTab]?.[currentDragItem.label] || 0) + 1 },
//               }));
//             }
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           onClear={() => {
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setError(null);
//           }}
//           selectedCompany={null}
//           error={error}
//         />
//         <PortfolioSelectModal
//           isOpen={showPortfolioModal}
//           onClose={() => {
//             setShowPortfolioModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           portfolios={savedPortfolios}
//           onSelectPortfolio={handlePortfolioSelect}
//           error={error}
//         />
//       </div>
//     </DndContext>
//   );
// };

// export default DashBoard;

// -----------------------3sep---------------------------

// import React, { useEffect, useState, useRef } from 'react';
// import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { MdOutlineDashboardCustomize, MdOutlineDriveFileRenameOutline } from 'react-icons/md';
// import { BiSolidSave } from 'react-icons/bi';
// import { IoMdClose, IoMdSave } from 'react-icons/io';
// import { FaHome } from 'react-icons/fa';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import SidebarRight from './SidebarRight';
// import AddNewModal from './AddNewModal';
// import DragStartModal from './DragStartModal';
// import DroppableArea from './DroppableArea';
// import { equityHubMap, portfolioMap } from './ComponentRegistry';
// import { GoSidebarExpand } from 'react-icons/go';
// import { GraphDataProvider } from '../Portfolio/GraphDataContext';
// import PortfolioSelectModal from './PortfolioSelectModal';
// import { FaChartLine, FaBriefcase } from 'react-icons/fa';
// import { Search } from "lucide-react";
// import SearchList from '../EquityHub/SearchList';
// import { useAuth } from '../AuthContext';
// import { CiLogout } from "react-icons/ci";
// import { logActivity } from '../../services/api';
// import { IoMdArrowDropdown } from "react-icons/io";
// import axios from 'axios';

// Modal.setAppElement('#root');

// const DashBoard = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const [showModal, setShowModal] = useState(false);
//   const [tabs, setTabs] = useState(['Dashboard 1']);
//   const [activeTab, setActiveTab] = useState('Dashboard 1');
//   const [uploadId, setUploadId] = useState(null);
//   const [platform, setPlatform] = useState('');
//   const [symbol, setSymbol] = useState(null);
//   const [savedStocks, setSavedStocks] = useState([]);
//   const [savedPortfolios, setSavedPortfolios] = useState([]);
//   const [droppedMap, setDroppedMap] = useState({ 'Dashboard 1': { equity: [], portfolio: [] } });
//   const [editingTab, setEditingTab] = useState(null);
//   const [editedTabName, setEditedTabName] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchedStocks, setSearchedStocks] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showDragModal, setShowDragModal] = useState(false);
//   const [showPortfolioModal, setShowPortfolioModal] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dragCountMap, setDragCountMap] = useState({ 'Dashboard 1': {} });
//   const [currentDragItem, setCurrentDragItem] = useState(null);
//   const [error, setError] = useState(null);
//   const [showUnsavedModal, setShowUnsavedModal] = useState(false);
//   const [showSavedModal, setShowSavedModal] = useState(false);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [pendingNavigation, setPendingNavigation] = useState(null);
//   const [pendingTab, setPendingTab] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const [sticky, setSticky] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const [fullName, setFullName] = useState('');
//   const initialQuery = queryParams.get('query') || '';
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const { login, logout } = useAuth();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
//   const drawerRef = useRef(null);

//   const isActive = (path) => location.pathname === path;

//   const handleNavClick = async (label, path) => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label, path });
//       setShowUnsavedModal(true);
//       return false;
//     }
//     await logActivity(`${label} tab clicked`);
//     navigate(path);
//     return true;
//   };

//   const handleDashboardClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       toast.error("Please login to access the Dashboard");
//     } else {
//       handleNavClick("Dashboard", "/dashboard");
//     }
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

//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'logout', path: '/' });
//       setShowUnsavedModal(true);
//       return;
//     }
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     logout();
//     toast.success("Logout successfully!");
//     navigate('/');
//   };

//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'portfolio', path: '/portDash' });
//       setShowUnsavedModal(true);
//       return;
//     }
//     setIsPortfolioOpen(true);
//     logActivity("Portfolio tab clicked");
//     navigate('/portDash');
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//     useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
//   );

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) setIsLoggedIn(true);
//   }, []);

//   useEffect(() => {
//     const storedUploadId = localStorage.getItem('uploadId');
//     const storedPlatform = localStorage.getItem('platform');
//     if (storedUploadId && storedPlatform) {
//       setUploadId(storedUploadId);
//       setPlatform(storedPlatform);
//     }
//   }, []);

//   useEffect(() => {
//     const currentTab = droppedMap[activeTab] || { equity: [], portfolio: [] };
//     const hasChanges = currentTab.equity.length > 0 || currentTab.portfolio.length > 0;
//     setHasUnsavedChanges(hasChanges);
//   }, [droppedMap, activeTab]);

//   const fetchSavedPortfolio = async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         setError('Please login to view your portfolios');
//         return;
//       }
//       const response = await fetch(`${API_BASE}/file/saved`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) {
//         const err = await response.json();
//         setError(err.error || 'Failed to fetch saved portfolios');
//         return;
//       }
//       const data = await response.json();
//       if (data.length > 0) {
//         setSavedPortfolios(data);
//         setUploadId(data[0].uploadId);
//         setPlatform(data[0].platform);
//       } else {
//         setSavedPortfolios([]);
//         setError('No portfolios found');
//       }
//     } catch (err) {
//       console.error('Error fetching saved portfolios:', err);
//       setError('Network error. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchSavedPortfolio();
//   }, [API_BASE]);

//   const handleStockSearch = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/stocks/test/search?query=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (Array.isArray(data) && data.length > 0) {
//         setSearchedStocks(data);
//         setSavedStocks(data);
//       } else {
//         setSearchedStocks([]);
//         toast.info('No stocks found for the search term.');
//         setError('Company not found');
//       }
//     } catch (err) {
//       console.error('Error fetching stock suggestions:', err);
//       setSearchedStocks([]);
//       setError('Company not found in our list. Please check the name and search again.');
//     }
//   };

//   const handleRenameTab = (oldName, newName) => {
//     if (!newName || newName.trim() === '') return;
//     if (tabs.includes(newName)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prevTabs) => prevTabs.map((tab) => (tab === oldName ? newName : tab)));
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     setDragCountMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     if (activeTab === oldName) setActiveTab(newName);
//     setEditingTab(null);
//     setEditedTabName('');
//     const currentTab = droppedMap[newName] || { equity: [], portfolio: [] };
//     setHasUnsavedChanges(currentTab.equity.length > 0 || currentTab.portfolio.length > 0);
//   };

//   const handleDeleteComponent = (areaId, index) => {
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[activeTab] = {
//         ...prev[activeTab],
//         [areaId]: prev[activeTab][areaId].filter((_, idx) => idx !== index),
//       };
//       return updated;
//     });
//     const label = droppedMap[activeTab][areaId][index].label;
//     const remaining = droppedMap[activeTab][areaId].filter((item, idx) => idx !== index && item.label === label);
//     if (remaining.length === 0) {
//       setDragCountMap((prev) => ({
//         ...prev,
//         [activeTab]: { ...prev[activeTab], [label]: 0 },
//       }));
//     }
//     const currentTab = droppedMap[activeTab] || { equity: [], portfolio: [] };
//     setHasUnsavedChanges(currentTab.equity.length > 0 || currentTab.portfolio.length > 0);
//   };

//   const handleClearCompany = (companyName) => {
//     setDroppedMap((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         equity: prev[activeTab].equity.filter((item) => item.companyName !== companyName),
//       },
//     }));
//     const affectedLabels = droppedMap[activeTab].equity
//       .filter((item) => item.companyName === companyName)
//       .map((item) => item.label);
//     setDragCountMap((prev) => {
//       const updated = { ...prev, [activeTab]: { ...prev[activeTab] } };
//       affectedLabels.forEach((label) => {
//         const remaining = droppedMap[activeTab].equity.filter(
//           (item) => item.label === label && item.companyName !== companyName
//         );
//         updated[activeTab][label] = remaining.length > 0 ? prev[activeTab][label] || 1 : 0;
//       });
//       return updated;
//     });
//     toast.success(`Company ${companyName} and associated graphs removed`);
//     const currentTab = droppedMap[activeTab] || { equity: [], portfolio: [] };
//     setHasUnsavedChanges(currentTab.equity.length > 0 || currentTab.portfolio.length > 0);
//   };

//   const generateDefaultDashboardName = async (baseName = 'Dashboard') => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (existingNames.includes(defaultName) || tabs.includes(defaultName));
//       return defaultName;
//     } catch (err) {
//       console.error('Error fetching dashboards for name generation:', err);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (tabs.includes(defaultName));
//       return defaultName;
//     }
//   };

//   const handleNewDashboard = async (title) => {
//     const newTitle = title && title.trim() ? title : await generateDefaultDashboardName();
//     if (tabs.includes(newTitle)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prev) => [...prev, newTitle]);
//     setDroppedMap((prev) => ({ ...prev, [newTitle]: { equity: [], portfolio: [] } }));
//     setActiveTab(newTitle);
//     setShowModal(false);
//     setDragCountMap((prev) => ({ ...prev, [newTitle]: {} }));
//     setIsMenuOpen(false);
//     setHasUnsavedChanges(false);
//   };

//   const handleDragStart = (event) => {
//     const { active } = event;
//     const label = active?.data?.current?.label;
//     setCurrentDragItem(active?.data?.current);
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);
//     if (equityLabels.includes(label)) {
//       const currentDragCount = dragCountMap[activeTab]?.[label] || 0;
//       if (currentDragCount === 0 && !droppedMap[activeTab].equity.some((item) => item.label === label)) {
//         setShowDragModal(true);
//       } else if (currentDragCount >= 1) {
//         setShowDragModal(true);
//       }
//     } else if (portfolioLabels.includes(label)) {
//       setShowPortfolioModal(true);
//     }
//   };

//   const handleItemClick = (item) => {
//     const { id, label } = item;
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     let section = null;
//     if (equityLabels.includes(label)) section = 'equity';
//     if (portfolioLabels.includes(label)) section = 'portfolio';

//     if (section === 'equity') {
//       setCurrentDragItem({ label });
//       setShowDragModal(true);
//       return;
//     }

//     if (section === 'portfolio') {
//       setCurrentDragItem({ label });
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { over, active } = event;
//     const label = active?.data?.current?.label;
//     const id = active?.id;
//     if (!over || !label || !id) return;

//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     let section = null;
//     if (equityLabels.includes(label)) section = 'equity';
//     if (portfolioLabels.includes(label)) section = 'portfolio';

//     if (section && over.id !== section) {
//       toast.error(`"${label}" can only be dropped in the "${section}" section.`);
//       return;
//     }

//     if (section === 'equity') {
//       setCurrentDragItem(active?.data?.current);
//       setShowDragModal(true);
//       return;
//     }

//     if (section === 'portfolio') {
//       setCurrentDragItem(active?.data?.current);
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handlePortfolioSelect = (portfolio) => {
//     if (currentDragItem) {
//       const draggedItem = {
//         label: currentDragItem.label,
//         symbol: '',
//         companyName: '',
//         graphType: currentDragItem.label,
//         uploadId: portfolio.uploadId,
//         platform: portfolio.platform,
//         id: `${currentDragItem.label}-${Date.now()}`,
//       };

//       setDroppedMap((prev) => {
//         const currentTab = prev[activeTab] || { equity: [], portfolio: [] };
//         const currentSection = currentTab['portfolio'] || [];
//         return {
//           ...prev,
//           [activeTab]: { ...currentTab, portfolio: [...currentSection, draggedItem] },
//         };
//       });
//       setUploadId(portfolio.uploadId);
//       setPlatform(portfolio.platform);
//       localStorage.setItem('uploadId', portfolio.uploadId.toString());
//       localStorage.setItem('platform', portfolio.platform);
//       setShowPortfolioModal(false);
//       setCurrentDragItem(null);
//       setHasUnsavedChanges(true);
//     }
//   };

//   const getGridClass = () => 'grid-cols-1 sm:grid-cols-2';

//   const getVisibleItems = (items) => items;

//   useEffect(() => {
//     const fetchSavedStocks = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch(`${API_BASE}/stocks/saved`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           const symbols = data.map((stock) => stock.symbol);
//           setSymbol(symbols);
//         }
//       } catch (err) {
//         console.error('Failed to fetch saved stocks:', err);
//       }
//     };
//     fetchSavedStocks();
//   }, [API_BASE]);

//   const handleSaveDashboard = async () => {
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');
//     const userType = localStorage.getItem('userType');
//     const equityPlots = droppedMap?.[activeTab]?.equity || [];
//     const portfolioPlots = droppedMap?.[activeTab]?.portfolio || [];

//     if (!token) {
//       toast.error('Please login first to save your dashboard.');
//       return;
//     }

//     if (equityPlots.length === 0 && portfolioPlots.length === 0) {
//       toast.error('Please drag and drop at least one plot before saving.');
//       return;
//     }

//     let finalDashboardName = activeTab;
//     try {
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       if (existingNames.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     } catch (err) {
//       console.error('Error checking dashboard names:', err);
//       if (tabs.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     }

//     const savedData = {
//       dashboard: { dashboardName: finalDashboardName, userId: userId ? parseInt(userId) : 0, userType: userType || '' },
//       equityHubPlots: [],
//       portfolioPlots: [],
//     };

//     droppedMap[activeTab]?.equity?.forEach(({ label, symbol, companyName, graphType }) => {
//       let finalSymbol = symbol;
//       let finalCompany = companyName;

//       if (!finalSymbol || !finalCompany) {
//         const matched = savedStocks.find(
//           (stock) => stock.symbol === finalSymbol || stock.graphType === graphType || stock.label === label
//         );
//         if (matched) {
//           finalSymbol = finalSymbol || matched.symbol;
//           finalCompany = finalCompany || matched.companyName;
//         }
//       }

//       savedData.equityHubPlots.push({ symbol: finalSymbol, companyName: finalCompany, graphType: graphType || label });
//     });

//     droppedMap[activeTab]?.portfolio?.forEach(({ uploadId, platform, label }) => {
//       savedData.portfolioPlots.push({ uploadId, platform, graphType: label });
//     });

//     try {
//       const response = await fetch(`${API_BASE}/dashboard/save`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(savedData),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setHasUnsavedChanges(false);
//         setShowSavedModal(true);
//         setTimeout(() => setShowSavedModal(false), 2000);
//         // toast.success(`Dashboard saved! ID: ${result.dashId}`);
//       } else {
//         toast.error('Failed to save dashboard');
//       }
//     } catch (err) {
//       console.error('Save failed:', err);
//       toast.error('Save failed');
//     }
//     setIsMenuOpen(false);
//   };

//   const handleDeleteDashboardAPI = async (dashboardName) => {
//     if (hasUnsavedChanges) {
//       setPendingTab(dashboardName);
//       setShowUnsavedModal(true);
//       return;
//     }
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/delete/${dashboardName}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to delete dashboard');
//       setTabs((prev) => prev.filter((tab) => tab !== dashboardName));
//       setDroppedMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       setDragCountMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       if (activeTab === dashboardName) {
//         const remainingTabs = tabs.filter((tab) => tab !== dashboardName);
//         setActiveTab(remainingTabs[0] || '');
//         const newTab = droppedMap[remainingTabs[0]] || { equity: [], portfolio: [] };
//         setHasUnsavedChanges(newTab.equity.length > 0 || newTab.portfolio.length > 0);
//       }
//       toast.success('Dashboard deleted successfully');
//       setIsMenuOpen(false);
//     } catch (err) {
//       console.error('Delete error:', err);
//       toast.error('Failed to delete dashboard');
//     }
//   };

//   const getUniqueCompanies = () => {
//     const equityItems = droppedMap[activeTab]?.equity || [];
//     return [...new Set(equityItems.map((item) => item.companyName).filter(Boolean))];
//   };

//   const isDashboardEmpty = () => {
//     const currentTab = droppedMap[activeTab] || { equity: [], portfolio: [] };
//     return currentTab.equity.length === 0 && currentTab.portfolio.length === 0;
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

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setResults([]);
//     setError(null);
//   };

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//   };

//   const handleDeleteAccount = async () => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'deleteAccount', path: '/' });
//       setShowUnsavedModal(true);
//       return;
//     }
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

//   const handleTabSwitch = (tab) => {
//     if (hasUnsavedChanges && activeTab !== tab) {
//       setPendingTab(tab);
//       setShowUnsavedModal(true);
//     } else {
//       setActiveTab(tab);
//       setIsMenuOpen(false);
//       const currentTab = droppedMap[tab] || { equity: [], portfolio: [] };
//       setHasUnsavedChanges(currentTab.equity.length > 0 || currentTab.portfolio.length > 0);
//     }
//   };

//   const handleConfirmNavigation = async () => {
//     setShowUnsavedModal(false);
//     if (pendingNavigation) {
//       if (pendingNavigation.label === 'logout') {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userType');
//         localStorage.removeItem('userEmail');
//         logout();
//         toast.success("Logout successfully!");
//         navigate('/');
//       } else if (pendingNavigation.label === 'deleteAccount') {
//         await handleDeleteAccount();
//       } else if (pendingNavigation.label === 'addDashboard') {
//         setShowModal(true);
//         setIsMenuOpen(false);
//       } else {
//         await logActivity(`${pendingNavigation.label} tab clicked`);
//         navigate(pendingNavigation.path);
//       }
//       setPendingNavigation(null);
//     } else if (pendingTab) {
//       setActiveTab(pendingTab);
//       setPendingTab(null);
//       setIsMenuOpen(false);
//       const currentTab = droppedMap[pendingTab] || { equity: [], portfolio: [] };
//       setHasUnsavedChanges(currentTab.equity.length > 0 || currentTab.portfolio.length > 0);
//     }
//   };

//   const handleCancelNavigation = () => {
//     setShowUnsavedModal(false);
//     setPendingNavigation(null);
//     setPendingTab(null);
//   };

//   const handleSaveAndNavigate = async () => {
//     await handleSaveDashboard();
//     if (pendingNavigation || pendingTab) {
//       handleConfirmNavigation();
//     }
//   };

//   const navItems = (
//     <ul className="flex space-x-6">
//       <li>
//         <Link
//           to="/"
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("Home", "/");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/') ? 'text-sky-400 underline underline-offset-8 font-bold' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//           data-tour="home-link"
//         >
//           Home
//         </Link>
//       </li>

//       <li
//         id="portfolio-dropdown"
//         className="relative"
//         onMouseEnter={() => setIsPortfolioOpen(true)}
//         onMouseLeave={() => setIsPortfolioOpen(false)}
//         data-tour="portfolio-link"
//       >
//         <span
//           onClick={handlePortfolioClick}
//           className={`portfolio-link text-lg font-medium transition-all duration-300 ease-in-out cursor-pointer 
//             ${isActive('/portDash') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//           data-tour="portfolio-link"
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
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="upload-portfolio block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//                 data-tour="upload-portfolio"
//               >
//                 Upload File
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/my-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/my-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="portfolio-saved block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//                 data-tour="portfolio-saved"
//               >
//                 Saved Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/resculpt-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/resculpt-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="recreate block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400 portfolio-recreate"
//                 data-tour="portfolio-recreate"
//               >
//                 Recreate Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/customize-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/customize-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="portfolio-create block px-4 py-2 text-sm text-white hover:bg-slate-700 hover:text-sky-400"
//                 data-tour="portfolio-create"
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
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("Equity Hub", "/equityhub");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/equityhub') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//           data-tour="equityhub-link"
//         >
//           Equity
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/dashboard') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//           data-tour="dashboard-link"
//         >
//           Dashboard
//         </Link>
//       </li>

//       <li>
//         <Link
//           to="/about"
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("About", "/about");
//           }}
//           className={`text-lg font-medium transition-all duration-300 ease-in-out 
//             ${isActive('/about') ? 'text-sky-400 underline underline-offset-8' : 'text-white'} 
//             hover:text-sky-700 hover:underline hover:underline-offset-8`}
//           data-tour="about-link"
//         >
//           About
//         </Link>
//       </li>
//       <li className={isDisabled ? "disable" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             e.preventDefault();
//             handleNavClick("Subscription", "/plan");
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
//     <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//       <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
//         <div
//           className={`flex-1 transition-all duration-300 ease-in-out ${collapsed ? 'w-full' : 'sm:pr-64 xs:pr-56'
//             } overflow-x-hidden`}
//         >
//           <div className="w-full bg-slate-800">
//             <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center gap-y-3 py-3 px-4">
//               <Link to="/" className="text-2xl font-bold text-white flex items-center relative">
//                 <div style={{
//                   display: 'inline-flex',
//                   alignItems: 'flex-start',
//                   gap: '0',
//                   position: 'relative',
//                 }}>
//                   <span style={{
//                     fontSize: '28px',
//                     fontWeight: '800',
//                     color: '#ffffff',
//                     letterSpacing: '0.05em',
//                     textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//                   }}>
//                     #CMD
//                   </span>
//                   <div style={{
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: '1px',
//                     marginLeft: '-2px',
//                   }}>
//                     <span style={{
//                       fontSize: '28px',
//                       fontWeight: '800',
//                       background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                       textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//                       lineHeight: '1.2',
//                     }}>
//                       A
//                     </span>
//                   </div>
//                   <span style={{
//                     position: 'absolute',
//                     right: '-38px',
//                     bottom: '16px',
//                     backgroundColor: '#ffffff',
//                     color: '#17b3f1ff',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//                     transform: 'rotate(12deg)',
//                     whiteSpace: 'nowrap',
//                     lineHeight: '1',
//                   }}>
//                     BETA
//                   </span>
//                 </div>
//               </Link>
//               <div className="hidden lg:block">{navItems}</div>
//               <div className="lg:hidden">
//                 <label htmlFor="mobile-menu" className="btn btn-ghost text-white">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </label>
//               </div>
//               <div className="flex items-center gap-2 max-w-[300px]">
//                 {isLoggedIn ? (
//                   <button
//                     onClick={handleLogout}
//                     className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleLoginClick}
//                     className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//                     data-tour="login-button"
//                   >
//                     Login
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <input type="checkbox" id="mobile-menu" className="hidden peer" />
//           <div className="hidden peer-checked:block lg:hidden w-full bg-slate-800 mt-2 rounded-lg shadow-lg">
//             <ul className="p-4 space-y-4">
//               <li>
//                 <Link
//                   to="/"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavClick('Home', '/');
//                   }}
//                   className={`block py-2 ${isActive('/') ? 'text-sky-400' : 'text-white'}`}
//                   data-tour="home-link"
//                 >
//                   Home
//                 </Link>
//               </li>

//               <li>
//                 <details>
//                   <summary
//                     className={`block flex gap-1 py-2 ${isActive('/portDash') ? 'text-sky-400' : 'text-white'
//                       }`}
//                     data-tour="portfolio-link"
//                   >
//                     Portfolio
//                     <IoMdArrowDropdown className="mt-1" />
//                   </summary>
//                   <ul className="pl-4 space-y-2 mt-2">
//                     <li>
//                       <Link
//                         to="/portDash"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (hasUnsavedChanges) {
//                             setPendingNavigation({ label: 'portfolio', path: '/portDash' });
//                             setShowUnsavedModal(true);
//                             return;
//                           }
//                         }}
//                         className="block py-1 text-white hover:text-sky-400"
//                         data-tour="portfolio-upload-file"
//                       >
//                         Upload File
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/portDash/my-portfolio"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (hasUnsavedChanges) {
//                             setPendingNavigation({ label: 'portfolio', path: '/portDash/my-portfolio' });
//                             setShowUnsavedModal(true);
//                             return;
//                           }
//                         }}
//                         className="block py-1 text-white hover:text-sky-400"
//                         data-tour="portfolio-saved"
//                       >
//                         Saved Portfolio
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/portDash/resculpt-portfolio"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (hasUnsavedChanges) {
//                             setPendingNavigation({ label: 'portfolio', path: '/portDash/resculpt-portfolio' });
//                             setShowUnsavedModal(true);
//                             return;
//                           }
//                         }}
//                         className="block py-1 text-white hover:text-sky-400"
//                         data-tour="portfolio-recreate"
//                       >
//                         Recreate Portfolio
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/portDash/customize-portfolio"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           if (hasUnsavedChanges) {
//                             setPendingNavigation({ label: 'portfolio', path: '/portDash/customize-portfolio' });
//                             setShowUnsavedModal(true);
//                             return;
//                           }
//                         }}
//                         className="block py-1 text-white hover:text-sky-400"
//                         data-tour="portfolio-create"
//                       >
//                         BuildUrPortfolio
//                       </Link>
//                     </li>
//                   </ul>
//                 </details>
//               </li>
//               <li>
//                 <Link
//                   to="/equityhub"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavClick('Equity Hub', '/equityhub');
//                   }}
//                   className={`block py-2 ${isActive('/equityhub') ? 'text-sky-400' : 'text-white'}`}
//                   data-tour="equityhub-link"
//                 >
//                   Equity
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/dashboard"
//                   onClick={handleDashboardClick}
//                   className={`block py-2 ${isActive('/dashboard') ? 'text-sky-400' : 'text-white'}`}
//                   data-tour="dashboard-link"
//                 >
//                   Dashboard
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/about"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavClick('About', '/about');
//                   }}
//                   className={`block py-2 ${isActive('/about') ? 'text-sky-400' : 'text-white'}`}
//                   data-tour="about-link"
//                 >
//                   About
//                 </Link>
//               </li>
//               <li className={isDisabled ? 'disable' : ''}>
//                 <Link
//                   to="/plan"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (isDisabled) return;
//                     handleNavClick('Subscription', '/plan');
//                   }}
//                   className={`block py-2 ${isActive('/plan') ? 'text-sky-400' : 'text-white'}`}
//                   data-tour="subscription-link"
//                 >
//                   Subscription
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div className="px-4 py-2 bg-dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 max-w-8xl mx-auto">
//             <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full">
//               {tabs.map((tab) => (
//                 <div
//                   key={tab}
//                   className="flex items-center bg-gray-700 px-3 py-1.5 rounded-md shadow-sm w-full sm:w-auto"
//                 >
//                   {editingTab === tab ? (
//                     <div className="flex items-center gap-2 w-full">
//                       <input
//                         type="text"
//                         value={editedTabName}
//                         onChange={(e) => setEditedTabName(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleRenameTab(tab, editedTabName)}
//                         className="w-full sm:w-32 px-2 py-1 text-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-900 dark:text-white"
//                       />
//                       <button
//                         onClick={() => handleRenameTab(tab, editedTabName)}
//                         className="text-gray-300 hover:text-white transition-colors"
//                         title="Save"
//                       >
//                         <IoMdSave size={16} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2 w-full sm:w-auto">
//                       <button
//                         onClick={() => handleTabSwitch(tab)}
//                         className={`flex-1 sm:flex-none text-sm font-medium px-3 py-1 rounded-md transition-colors ${activeTab === tab ? 'bg-white text-gray-900' : 'text-gray-300 hover:bg-gray-600'
//                           }`}
//                       >
//                         {tab}
//                       </button>
//                       <button
//                         onClick={() => {
//                           setEditingTab(tab);
//                           setEditedTabName(tab);
//                         }}
//                         className="text-gray-300 hover:text-white transition-colors"
//                         title="Rename"
//                       >
//                         <MdOutlineDriveFileRenameOutline size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteDashboardAPI(tab)}
//                         className="text-gray-300 hover:text-white transition-colors"
//                         title="Delete"
//                       >
//                         <IoMdClose size={16} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
//                 <button
//                   onClick={() => {
//                     if (hasUnsavedChanges) {
//                       setPendingNavigation({ label: 'addDashboard', path: null });
//                       setShowUnsavedModal(true);
//                       return;
//                     }
//                     setShowModal(true);
//                     setIsMenuOpen(false);
//                   }}
//                   className="dashboard-add flex items-center gap-2 px-3 py-1.5 text-white bg-gray-700 rounded-md hover:bg-sky-700 transition-colors text-sm w-full sm:w-auto"
//                   data-tour="dashboard-add"
//                 >
//                   <MdOutlineDashboardCustomize size={16} /> Add Dashboard
//                 </button>
//                 <button
//                   onClick={handleSaveDashboard}
//                   className="dashboard-save flex items-center gap-2 px-3 py-1.5 text-white bg-gray-700 rounded-md hover:bg-sky-700 transition-colors text-sm w-full sm:w-auto"
//                   data-tour="dashboard-save"
//                 >
//                   <BiSolidSave size={16} /> Save
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (!isLoggedIn) {
//                       toast.error('Login first to see your dashboards.');
//                       return;
//                     }
//                     handleNavClick('Saved Dashboards', '/savedDashboard');
//                   }}
//                   className="dashboard-saved flex items-center gap-2 px-3 py-1.5 text-white bg-gray-700 rounded-md hover:bg-sky-700 transition-colors text-sm w-full sm:w-auto"
//                   data-tour="dashboard-saved"
//                 >
//                   <BiSolidSave size={16} /> Saved Dashboards
//                 </button>
//               </div>
//             </div>
//             {getUniqueCompanies().length > 0 ? (
//               <div className="flex flex-wrap gap-2 items-center mt-2">
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Selected Stocks:
//                 </span>
//                 {getUniqueCompanies().map((companyName) => (
//                   <div
//                     key={companyName}
//                     className="flex items-center gap-1 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
//                   >
//                     <span className="truncate max-w-xs">{companyName}</span>
//                     <button
//                       onClick={() => handleClearCompany(companyName)}
//                       className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//                       title="Remove stock"
//                       aria-label={`Remove ${companyName}`}
//                     >
//                       <IoMdClose size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                 No stocks selected. Add stocks from the sidebar.
//               </p>
//             )}
//           </div>

//           <AnimatePresence>
//             {collapsed && isDashboardEmpty() && (
//               <motion.div
//                 initial={{ opacity: 0, y: -30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ duration: 0.4 }}
//                 className="text-center py-12 px-6 bg dark:bg-gray-800 rounded-xl dark:border-gray-700 max-w-3xl mx-auto mt-2"
//               >
//                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
//                   Welcome to Your Dashboard
//                 </h2>
//                 <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
//                   Open the sidebar and drag and drop your graph to get started!
//                 </p>
//                 <button
//                   onClick={() => setCollapsed(false)}
//                   className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gray-700 text-white rounded-full hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
//                 >
//                   <GoSidebarExpand size={18} /> Open Sidebar
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <main className="px-4 py-8 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto min-h-[calc(100vh-4rem)]">
//             {['equity', 'portfolio'].map((areaId) => {
//               const droppedItems = droppedMap?.[activeTab]?.[areaId] || [];
//               const ComponentMap = areaId === 'equity' ? equityHubMap : portfolioMap;
//               const visibleItems = getVisibleItems(droppedItems);
//               return (
//                 <section key={areaId} className="space-y-4">
//                   <div className="text-center">
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//                       {areaId === 'equity' ? 'Equity Hub Section' : 'Portfolio Section'}
//                     </h2>
//                     {areaId === 'equity' && droppedItems.length > 0 && (
//                       <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                         Companies: <span className="font-medium">{getUniqueCompanies().join(', ')}</span>
//                       </p>
//                     )}
//                   </div>
//                   <DroppableArea id={areaId}>
//                     {droppedItems.length === 0 ? (
//                       <div className="flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400">
//                         <svg
//                           className="h-10 w-10 mb-3"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M4 8v8m0 0h8m-8 0l8-8m4 8v-8m0 0H8m8 0l-8 8"
//                           />
//                         </svg>
//                         <p className="text-sm font-medium">Drop or tap components here</p>
//                       </div>
//                     ) : (
//                       <div className={`grid gap-4 ${getGridClass()}`}>
//                         {visibleItems.map(({ label, symbol, companyName, id, uploadId, platform }, idx) => {
//                           const isLastAndOdd = idx === visibleItems.length - 1 && visibleItems.length % 2 === 1;
//                           const Component = ComponentMap[label];
//                           if (!Component) {
//                             console.error(`Component for label "${label}" not found in ${areaId} map.`);
//                             return (
//                               <motion.div
//                                 key={`${areaId}-${id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${isLastAndOdd ? 'sm:col-span-2' : ''
//                                   }`}
//                               >
//                                 <button
//                                   onClick={() =>
//                                     handleDeleteComponent(
//                                       areaId,
//                                       droppedItems.findIndex((item) => item.id === id)
//                                     )
//                                   }
//                                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                   aria-label="Delete component"
//                                 >
//                                   ✕
//                                 </button>
//                                 <p className="text-red-500 text-sm">Component "{label}" not found</p>
//                               </motion.div>
//                             );
//                           }
//                           if (areaId === 'equity' && !symbol) {
//                             console.warn(`No symbol provided for ${label} (${companyName})`);
//                             return (
//                               <motion.div
//                                 key={`${areaId}-${id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${isLastAndOdd ? 'sm:col-span-2' : ''
//                                   }`}
//                               >
//                                 <button
//                                   onClick={() =>
//                                     handleDeleteComponent(
//                                       areaId,
//                                       droppedItems.findIndex((item) => item.id === id)
//                                     )
//                                   }
//                                   className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                   aria-label="Delete component"
//                                 >
//                                   ✕
//                                 </button>
//                                 <p className="text-yellow-500 text-sm">Waiting for company selection for {label}</p>
//                               </motion.div>
//                             );
//                           }
//                           return (
//                             <motion.div
//                               key={`${areaId}-${id}`}
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.3, delay: idx * 0.1 }}
//                               className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-600 hover:shadow-lg transition-shadow ${isLastAndOdd ? 'sm:col-span-2' : ''
//                                 }`}
//                             >
//                               <button
//                                 onClick={() =>
//                                   handleDeleteComponent(
//                                     areaId,
//                                     droppedItems.findIndex((item) => item.id === id)
//                                   )
//                                 }
//                                 className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors text-base"
//                                 aria-label="Delete component"
//                               >
//                                 ✕
//                               </button>
//                               <h3 className="text-sm font-medium mb-3 text-gray-800 dark:text-white truncate">
//                                 {label} {companyName ? `(${companyName})` : platform ? `(${platform})` : ''}
//                               </h3>
//                               <div className="min-h-[200px] w-full overflow-hidden">
//                                 {areaId === 'equity' ? (
//                                   <Component symbol={symbol} key={`${id}-${symbol}`} />
//                                 ) : (
//                                   <GraphDataProvider>
//                                     <Component uploadId={uploadId} key={`${id}-${uploadId}`} />
//                                   </GraphDataProvider>
//                                 )}
//                               </div>
//                             </motion.div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </DroppableArea>
//                 </section>
//               );
//             })}
//           </main>
//         </div>
//         <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
//         {showModal && (
//           <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />
//         )}
//         <DragStartModal
//           isOpen={showDragModal}
//           onClose={() => {
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           onSearch={handleStockSearch}
//           searchTerm={searchTerm}
//           setSearchTerm={(value) => {
//             setSearchTerm(value);
//             setError(null);
//             if (value.length >= 2) handleStockSearch();
//             else setSearchedStocks([]);
//           }}
//           searchedStocks={searchedStocks}
//           onSelectItem={(item) => {
//             if (currentDragItem) {
//               setDroppedMap((prev) => {
//                 const currentTab = prev[activeTab] || { equity: [], portfolio: [] };
//                 const equityItems = currentTab.equity || [];
//                 const lastItemIndex = equityItems.findLastIndex(
//                   (i) => i.label === currentDragItem.label && !i.symbol
//                 );
//                 if (lastItemIndex >= 0) {
//                   const updatedItems = [...equityItems];
//                   updatedItems[lastItemIndex] = {
//                     ...updatedItems[lastItemIndex],
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, equity: updatedItems } };
//                 } else {
//                   const newItem = {
//                     label: currentDragItem.label,
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                     graphType: currentDragItem.label,
//                     id: `${currentDragItem.label}-${Date.now()}`,
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, equity: [...equityItems, newItem] } };
//                 }
//               });
//               setDragCountMap((prev) => ({
//                 ...prev,
//                 [activeTab]: {
//                   ...prev[activeTab],
//                   [currentDragItem.label]: (prev[activeTab]?.[currentDragItem.label] || 0) + 1,
//                 },
//               }));
//             }
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//             setHasUnsavedChanges(true);
//           }}
//           onClear={() => {
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setError(null);
//           }}
//           selectedCompany={null}
//           error={error}
//         />
//         <PortfolioSelectModal
//           isOpen={showPortfolioModal}
//           onClose={() => {
//             setShowPortfolioModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           portfolios={savedPortfolios}
//           onSelectPortfolio={handlePortfolioSelect}
//           error={error}
//         />
//         {showUnsavedModal && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//               <button
//                 onClick={handleCancelNavigation}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//               <div className="text-center">
//                 <h2 className="text-xl font-bold text-gray-800"> Unsaved Changes</h2>
//                 <p className="mt-2 text-gray-600">

//                   You haven’t saved your dashboard yet.
//                   Do you want to save before leaving?


//                 </p>
//                 <div className="mt-6 flex justify-center gap-4">
//                   <button
//                     onClick={handleSaveAndNavigate}
//                     className="px-3 py-2 bg-sky-500 text-white rounded hover:bg-sky-700"
//                   >
//                     Save and Continue
//                   </button>
//                   <button
//                     onClick={handleConfirmNavigation}
//                     className="px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//                   >
//                     Leave Without Saving
//                   </button>
//                   <button
//                     onClick={handleCancelNavigation}
//                     className="px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//                   >
//                     Stay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         {showSavedModal && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//               <div className="text-center">
//                 <h2 className="text-xl font-bold text-gray-800">✅ Dashboard Saved!</h2>
//                 <p className="mt-2 text-gray-600">
//                   Your dashboard masterpiece has been safely saved! 🎉
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//         {showDeleteModal && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//             <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//               <div className="text-center">
//                 <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
//                 <p className="mt-2 text-gray-600">
//                   Are you sure you want to delete your account? This action cannot be undone.
//                 </p>
//                 <div className="mt-6 flex justify-center gap-4">
//                   <button
//                     onClick={handleDeleteAccount}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => setShowDeleteModal(false)}
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DndContext>
//   );
// };

// export default DashBoard;














// import React, { useEffect, useState, useRef } from 'react';
// import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { MdOutlineDashboardCustomize, MdOutlineDriveFileRenameOutline, MdSubdirectoryArrowRight } from 'react-icons/md';
// import { BiSolidSave } from 'react-icons/bi';
// import { IoMdClose, IoMdSave, IoMdArrowDropdown } from 'react-icons/io';
// import { FaHome } from 'react-icons/fa';
// import { AnimatePresence, motion } from 'framer-motion';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Modal from 'react-modal';
// import SidebarRight from './SidebarRight';
// import AddNewModal from './AddNewModal';
// import DragStartModal from './DragStartModal';
// import DroppableArea from './DroppableArea';
// import { equityHubMap, portfolioMap } from './ComponentRegistry';
// import { GoSidebarExpand } from 'react-icons/go';
// import { GraphDataProvider } from '../Portfolio/GraphDataContext';
// import PortfolioSelectModal from './PortfolioSelectModal';
// import { FaChartLine, FaBriefcase } from 'react-icons/fa';
// import { Search } from "lucide-react";
// import SearchList from '../EquityHub/SearchList';
// import { useAuth } from '../AuthContext';
// import { CiLogout } from "react-icons/ci";
// import { logActivity } from '../../services/api';
// import axios from 'axios';
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';
// import PlotCard from './PlotCard';
// import SampleDashImage from '/public/assets/SampleDashboard_snapshot.png'

// Modal.setAppElement('#root');

// const DashBoard = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const [showModal, setShowModal] = useState(false);
//   const [tabs, setTabs] = useState(['Sample Dashboard']);
//   const [activeTab, setActiveTab] = useState('Sample Dashboard');
//   const [uploadId, setUploadId] = useState(null);
//   const [platform, setPlatform] = useState('');
//   const [symbol, setSymbol] = useState(null);
//   const [savedStocks, setSavedStocks] = useState([]);
//   const [savedPortfolios, setSavedPortfolios] = useState([]);
//   const [droppedMap, setDroppedMap] = useState({
//     'Sample Dashboard': {
//       general: [
//         {
//           label: 'Avg Box Plots',
//           symbol: 'UNIVCABLES',
//           companyName: 'Universal Cables',
//           graphType: 'Avg Box Plots',
//           id: 'sample1',
//           type: 'equity',
//           width: 400,
//           height: 300
//         },
//         {
//           label: 'Sensex Stock Correlation Bar',
//           symbol: 'KAJARIACER',
//           companyName: 'Kajaria Ceramics',
//           graphType: 'Sensex Stock Correlation Bar',
//           id: 'sample2',
//           type: 'equity',
//           width: 400,
//           height: 300
//         },
//         {
//           label: 'ShareholdingPlot',
//           uploadId: 'eaf8f73b-3063-4d87-8f78-7647f1a400f4',  // Assume a default or fetch from API
//           platform: 'Axis Bank',
//           graphType: 'ShareholdingPlot',
//           id: 'sample3',
//           type: 'portfolio',
//           width: 400,
//           height: 300
//         }
//       ]
//     }
//   });
//   const [dragCountMap, setDragCountMap] = useState({
//     'Sample Dashboard': {
//       'Avg Box Plots': 1,
//       'Sensex Stock Correlation Bar': 1,
//       'ShareholdingPlot': 1
//     }
//   });

//   const handleImageClick = () => {
//     const plots = [
//       {
//         label: 'Avg Box Plots',
//         symbol: 'UNIVCABLES',
//         companyName: 'Universal Cables',
//         graphType: 'Avg Box Plots',
//         id: `avg-box-${Date.now()}`,
//         type: 'equity',
//         width: 400,
//         height: 300
//       },
//       {
//         label: 'Sensex Stock Correlation Bar',
//         symbol: 'KAJARIACER',
//         companyName: 'Kajaria Ceramics',
//         graphType: 'Sensex Stock Correlation Bar',
//         id: `sensex-corr-${Date.now()}`,
//         type: 'equity',
//         width: 400,
//         height: 300
//       },
//       {
//         label: 'ShareholdingPlot',
//         uploadId: 'eaf8f73b-3063-4d87-8f78-7647f1a400f4', // Explicitly set for consistency
//         platform: 'Axis Bank',
//         graphType: 'ShareholdingPlot',
//         id: `ShareholdingPlot-${Date.now()}`,
//         type: 'portfolio',
//         width: 400,
//         height: 300
//       }
//     ];
//     setDroppedMap((prev) => {
//       const currentTab = prev[activeTab] || { general: [] };
//       return {
//         ...prev,
//         [activeTab]: { ...currentTab, general: [...currentTab.general, ...plots] },
//       };
//     });
//     plots.forEach(plot => {
//       setDragCountMap((prev) => ({
//         ...prev,
//         [activeTab]: {
//           ...prev[activeTab],
//           [plot.label]: (prev[activeTab]?.[plot.label] || 0) + 1,
//         },
//       }));
//     });
//     setHasUnsavedChanges(true);
//     toast.success('Plots added to the whiteboard!');
//   };

//   const [editingTab, setEditingTab] = useState(null);
//   const [editedTabName, setEditedTabName] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchedStocks, setSearchedStocks] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showDragModal, setShowDragModal] = useState(false);
//   const [showPortfolioModal, setShowPortfolioModal] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [currentDragItem, setCurrentDragItem] = useState(null);
//   const [error, setError] = useState(null);
//   const [showUnsavedModal, setShowUnsavedModal] = useState(false);
//   const [showSavedModal, setShowSavedModal] = useState(false);
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//   const [pendingNavigation, setPendingNavigation] = useState(null);
//   const [pendingTab, setPendingTab] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const [sticky, setSticky] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const [fullName, setFullName] = useState('');
//   const initialQuery = queryParams.get('query') || '';
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const { login, logout } = useAuth();
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
//   const [showSampleImage, setShowSampleImage] = useState(false);
//   const [showDashboardMenu, setShowDashboardMenu] = useState(false);
//   const drawerRef = useRef(null);

//   const isActive = (path) => location.pathname === path;

//   const handleNavClick = async (label, path) => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label, path });
//       setShowUnsavedModal(true);
//       return false;
//     }
//     await logActivity(`${label} tab clicked`);
//     navigate(path);
//     return true;
//   };

//   const handleDashboardClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       toast.error("Please login to access the Dashboard");
//     } else {
//       handleNavClick("Dashboard", "/dashboard");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest("#portfolio-dropdown")) {
//         setIsPortfolioOpen(false);
//       }
//       if (!event.target.closest("#dashboard-menu")) {
//         setShowDashboardMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setSticky(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'logout', path: '/' });
//       setShowUnsavedModal(true);
//       return;
//     }
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     logout();
//     toast.success("Logout successfully!");
//     navigate('/');
//   };

//   const handlePortfolioClick = (e) => {
//     e.preventDefault();
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'portfolio', path: '/portDash' });
//       setShowUnsavedModal(true);
//       return;
//     }
//     setIsPortfolioOpen(true);
//     logActivity("Portfolio tab clicked");
//     navigate('/portDash');
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
//     useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
//   );

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) setIsLoggedIn(true);
//   }, []);

//   useEffect(() => {
//     const storedUploadId = localStorage.getItem('uploadId');
//     const storedPlatform = localStorage.getItem('platform');
//     if (storedUploadId && storedPlatform) {
//       setUploadId(storedUploadId);
//       setPlatform(storedPlatform);
//     }
//   }, []);

//   useEffect(() => {
//     const currentTab = droppedMap[activeTab] || { general: [] };
//     const hasChanges = currentTab.general.length > 0;
//     setHasUnsavedChanges(hasChanges);
//   }, [droppedMap, activeTab]);

//   const fetchSavedPortfolio = async () => {
//     try {
//       setError('');
//       const token = localStorage.getItem('authToken');
//       if (!token) {
//         setError('Please login to view your portfolios');
//         return;
//       }
//       const response = await fetch(`${API_BASE}/file/saved`, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) {
//         const err = await response.json();
//         setError(err.error || 'Failed to fetch saved portfolios');
//         return;
//       }
//       const data = await response.json();
//       if (data.length > 0) {
//         setSavedPortfolios(data);
//         setUploadId(data[0].uploadId);
//         setPlatform(data[0].platform);
//       } else {
//         setSavedPortfolios([]);
//         setError('No portfolios found');
//       }
//     } catch (err) {
//       console.error('Error fetching saved portfolios:', err);
//       setError('Network error. Please try again later.');
//     }
//   };

//   useEffect(() => {
//     fetchSavedPortfolio();
//   }, [API_BASE]);

//   const handleStockSearch = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/stocks/test/search?query=${searchTerm}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (Array.isArray(data) && data.length > 0) {
//         setSearchedStocks(data);
//         setSavedStocks(data);
//       } else {
//         setSearchedStocks([]);
//         toast.info('No stocks found for the search term.');
//         setError('Company not found');
//       }
//     } catch (err) {
//       console.error('Error fetching stock suggestions:', err);
//       setSearchedStocks([]);
//       setError('Company not found in our list. Please check the name and search again.');
//     }
//   };

//   const handleRenameTab = (oldName, newName) => {
//     if (!newName || newName.trim() === '') return;
//     if (tabs.includes(newName)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prevTabs) => prevTabs.map((tab) => (tab === oldName ? newName : tab)));
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     setDragCountMap((prev) => {
//       const updated = { ...prev };
//       updated[newName] = prev[oldName];
//       delete updated[oldName];
//       return updated;
//     });
//     if (activeTab === oldName) setActiveTab(newName);
//     setEditingTab(null);
//     setEditedTabName('');
//     const currentTab = droppedMap[newName] || { general: [] };
//     setHasUnsavedChanges(currentTab.general.length > 0);
//   };

//   const handleDeleteComponent = (index) => {
//     setDroppedMap((prev) => {
//       const updated = { ...prev };
//       updated[activeTab] = {
//         ...prev[activeTab],
//         general: prev[activeTab].general.filter((_, idx) => idx !== index),
//       };
//       return updated;
//     });
//     const label = droppedMap[activeTab].general[index].label;
//     const remaining = droppedMap[activeTab].general.filter((item, idx) => idx !== index && item.label === label);
//     if (remaining.length === 0) {
//       setDragCountMap((prev) => ({
//         ...prev,
//         [activeTab]: { ...prev[activeTab], [label]: 0 },
//       }));
//     }
//     const currentTab = droppedMap[activeTab] || { general: [] };
//     setHasUnsavedChanges(currentTab.general.length > 0);
//   };

//   const handleClearCompany = (companyName) => {
//     setDroppedMap((prev) => ({
//       ...prev,
//       [activeTab]: {
//         ...prev[activeTab],
//         general: prev[activeTab].general.filter((item) => item.companyName !== companyName),
//       },
//     }));
//     const affectedLabels = droppedMap[activeTab].general
//       .filter((item) => item.companyName === companyName)
//       .map((item) => item.label);
//     setDragCountMap((prev) => {
//       const updated = { ...prev, [activeTab]: { ...prev[activeTab] } };
//       affectedLabels.forEach((label) => {
//         const remaining = droppedMap[activeTab].general.filter(
//           (item) => item.label === label && item.companyName !== companyName
//         );
//         updated[activeTab][label] = remaining.length > 0 ? prev[activeTab][label] || 1 : 0;
//       });
//       return updated;
//     });
//     toast.success(`Company ${companyName} and associated graphs removed`);
//     const currentTab = droppedMap[activeTab] || { general: [] };
//     setHasUnsavedChanges(currentTab.general.length > 0);
//   };

//   const generateDefaultDashboardName = async (baseName = 'Dashboard') => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (existingNames.includes(defaultName) || tabs.includes(defaultName));
//       return defaultName;
//     } catch (err) {
//       console.error('Error fetching dashboards for name generation:', err);
//       let index = 1;
//       let defaultName;
//       do {
//         defaultName = `${baseName} ${index}`;
//         index++;
//       } while (tabs.includes(defaultName));
//       return defaultName;
//     }
//   };

//   const handleNewDashboard = async (title) => {
//     const newTitle = title && title.trim() ? title : await generateDefaultDashboardName();
//     if (tabs.includes(newTitle)) {
//       toast.info('A dashboard with this name already exists.');
//       return;
//     }
//     setTabs((prev) => [...prev, newTitle]);
//     setDroppedMap((prev) => ({ ...prev, [newTitle]: { general: [] } }));
//     setActiveTab(newTitle);
//     setShowModal(false);
//     setDragCountMap((prev) => ({ ...prev, [newTitle]: {} }));
//     setIsMenuOpen(false);
//     setHasUnsavedChanges(false);
//   };

//   const handleDragStart = (event) => {
//     const { active } = event;
//     const label = active?.data?.current?.label;
//     setCurrentDragItem(active?.data?.current);
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);
//     if (equityLabels.includes(label)) {
//       const currentDragCount = dragCountMap[activeTab]?.[label] || 0;
//       if (currentDragCount === 0 && !droppedMap[activeTab].general.some((item) => item.label === label)) {
//         setShowDragModal(true);
//       } else if (currentDragCount >= 1) {
//         setShowDragModal(true);
//       }
//     } else if (portfolioLabels.includes(label)) {
//       setShowPortfolioModal(true);
//     }
//   };

//   const handleItemClick = (item) => {
//     const { id, label } = item;
//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     let section = null;
//     if (equityLabels.includes(label)) section = 'equity';
//     if (portfolioLabels.includes(label)) section = 'portfolio';

//     if (section === 'equity') {
//       setCurrentDragItem({ label });
//       setShowDragModal(true);
//       return;
//     }

//     if (section === 'portfolio') {
//       setCurrentDragItem({ label });
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { over, active } = event;
//     const label = active?.data?.current?.label;
//     const id = active?.id;
//     if (!over || !label || !id) return;

//     if (over.id !== 'general') {
//       toast.error(`"${label}" can only be dropped in the whiteboard area.`);
//       return;
//     }

//     const equityLabels = Object.keys(equityHubMap);
//     const portfolioLabels = Object.keys(portfolioMap);

//     if (equityLabels.includes(label)) {
//       setCurrentDragItem(active?.data?.current);
//       setShowDragModal(true);
//       return;
//     }

//     if (portfolioLabels.includes(label)) {
//       setCurrentDragItem(active?.data?.current);
//       setShowPortfolioModal(true);
//       return;
//     }
//   };

//   const handlePortfolioSelect = (portfolio) => {
//     if (currentDragItem) {
//       const draggedItem = {
//         label: currentDragItem.label,
//         symbol: '',
//         companyName: '',
//         graphType: currentDragItem.label,
//         uploadId: portfolio.uploadId,
//         platform: portfolio.platform,
//         id: `${currentDragItem.label}-${Date.now()}`,
//         type: 'portfolio',
//         width: 400,
//         height: 300
//       };

//       setDroppedMap((prev) => {
//         const currentTab = prev[activeTab] || { general: [] };
//         const currentSection = currentTab['general'] || [];
//         return {
//           ...prev,
//           [activeTab]: { ...currentTab, general: [...currentSection, draggedItem] },
//         };
//       });
//       setUploadId(portfolio.uploadId);
//       setPlatform(portfolio.platform);
//       localStorage.setItem('uploadId', portfolio.uploadId.toString());
//       localStorage.setItem('platform', portfolio.platform);
//       setShowPortfolioModal(false);
//       setCurrentDragItem(null);
//       setHasUnsavedChanges(true);
//     }
//   };

//   const getGridClass = (items) => {
//     if (items.length === 0) return 'grid-cols-1';
//     const firstRowCount = Math.min(items.length);
//     const remainingCount = items.length - firstRowCount;
//     return `grid grid-cols-1 sm:grid-cols-${firstRowCount} gap-4 ${remainingCount > 0 ? 'sm:grid-rows-2' : ''}`;
//   };

//   const getVisibleItems = (items) => items;

//   useEffect(() => {
//     const fetchSavedStocks = async () => {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch(`${API_BASE}/stocks/saved`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         if (Array.isArray(data)) {
//           const symbols = data.map((stock) => stock.symbol);
//           setSymbol(symbols);
//         }
//       } catch (err) {
//         console.error('Failed to fetch saved stocks:', err);
//       }
//     };
//     fetchSavedStocks();
//   }, [API_BASE]);

//   const handleSaveDashboard = async () => {
//     const token = localStorage.getItem('authToken');
//     const userId = localStorage.getItem('userId');
//     const userType = localStorage.getItem('userType');
//     const generalPlots = droppedMap?.[activeTab]?.general || [];

//     if (!token) {
//       toast.error('Please login first to save your dashboard.');
//       return;
//     }

//     if (generalPlots.length === 0) {
//       toast.error('Please drag and drop at least one plot before saving.');
//       return;
//     }

//     let finalDashboardName = activeTab;
//     try {
//       const response = await fetch(`${API_BASE}/dashboard/fetch`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to fetch dashboards');
//       const data = await response.json();
//       const existingNames = data.dashboards.map((dash) => dash.dashboardName);
//       if (existingNames.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     } catch (err) {
//       console.error('Error checking dashboard names:', err);
//       if (tabs.includes(finalDashboardName)) {
//         finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
//         setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
//         setDroppedMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setDragCountMap((prev) => {
//           const updated = { ...prev };
//           updated[finalDashboardName] = prev[activeTab];
//           delete updated[activeTab];
//           return updated;
//         });
//         setActiveTab(finalDashboardName);
//         toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
//       }
//     }

//     const savedData = {
//       dashboard: { dashboardName: finalDashboardName, userId: userId ? parseInt(userId) : 0, userType: userType || '' },
//       equityHubPlots: [],
//       portfolioPlots: [],
//     };

//     generalPlots.forEach(({ label, symbol, companyName, graphType, uploadId, platform, type }) => {
//       if (type === 'equity') {
//         let finalSymbol = symbol;
//         let finalCompany = companyName;

//         if (!finalSymbol || !finalCompany) {
//           const matched = savedStocks.find(
//             (stock) => stock.symbol === finalSymbol || stock.graphType === graphType || stock.label === label
//           );
//           if (matched) {
//             finalSymbol = finalSymbol || matched.symbol;
//             finalCompany = finalCompany || matched.companyName;
//           }
//         }

//         savedData.equityHubPlots.push({ symbol: finalSymbol, companyName: finalCompany, graphType: graphType || label });
//       } else if (type === 'portfolio') {
//         savedData.portfolioPlots.push({ uploadId, platform, graphType: label });
//       }
//     });

//     try {
//       const response = await fetch(`${API_BASE}/dashboard/save`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
//         body: JSON.stringify(savedData),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setHasUnsavedChanges(false);
//         setShowSavedModal(true);
//         setTimeout(() => setShowSavedModal(false), 2000);
//       } else {
//         toast.error('Failed to save dashboard');
//       }
//     } catch (err) {
//       console.error('Save failed:', err);
//       toast.error('Save failed');
//     }
//     setIsMenuOpen(false);
//   };

//   const handleDeleteDashboardAPI = async (dashboardName) => {
//     if (hasUnsavedChanges) {
//       setPendingTab(dashboardName);
//       setShowUnsavedModal(true);
//       return;
//     }
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch(`${API_BASE}/dashboard/delete/${dashboardName}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error('Failed to delete dashboard');
//       setTabs((prev) => prev.filter((tab) => tab !== dashboardName));
//       setDroppedMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       setDragCountMap((prev) => {
//         const updated = { ...prev };
//         delete updated[dashboardName];
//         return updated;
//       });
//       if (activeTab === dashboardName) {
//         const remainingTabs = tabs.filter((tab) => tab !== dashboardName);
//         setActiveTab(remainingTabs[0] || '');
//         const newTab = droppedMap[remainingTabs[0]] || { general: [] };
//         setHasUnsavedChanges(newTab.general.length > 0);
//       }
//       toast.success('Dashboard deleted successfully');
//       setIsMenuOpen(false);
//     } catch (err) {
//       console.error('Delete error:', err);
//       toast.error('Failed to delete dashboard');
//     }
//   };

//   const getUniqueCompanies = () => {
//     const generalItems = droppedMap[activeTab]?.general || [];
//     return [...new Set(generalItems.filter(item => item.companyName).map((item) => item.companyName))];
//   };

//   const isDashboardEmpty = () => {
//     const currentTab = droppedMap[activeTab] || { general: [] };
//     return currentTab.general.length === 0;
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

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setResults([]);
//     setError(null);
//   };

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => {
//     login();
//     handleCloseModal();
//   };

//   const handleDeleteAccount = async () => {
//     if (hasUnsavedChanges) {
//       setPendingNavigation({ label: 'deleteAccount', path: '/' });
//       setShowUnsavedModal(true);
//       return;
//     }
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

//   const handleTabSwitch = (tab) => {
//     if (hasUnsavedChanges && activeTab !== tab) {
//       setPendingTab(tab);
//       setShowUnsavedModal(true);
//     } else {
//       setActiveTab(tab);
//       setIsMenuOpen(false);
//       const currentTab = droppedMap[tab] || { general: [] };
//       setHasUnsavedChanges(currentTab.general.length > 0);
//     }
//   };

//   const handleConfirmNavigation = async () => {
//     setShowUnsavedModal(false);
//     if (pendingNavigation) {
//       if (pendingNavigation.label === 'logout') {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userType');
//         localStorage.removeItem('userEmail');
//         logout();
//         toast.success("Logout successfully!");
//         navigate('/');
//       } else if (pendingNavigation.label === 'deleteAccount') {
//         await handleDeleteAccount();
//       } else if (pendingNavigation.label === 'addDashboard') {
//         setShowModal(true);
//         setIsMenuOpen(false);
//       } else {
//         await logActivity(`${pendingNavigation.label} tab clicked`);
//         navigate(pendingNavigation.path);
//       }
//       setPendingNavigation(null);
//     } else if (pendingTab) {
//       setActiveTab(pendingTab);
//       setPendingTab(null);
//       setIsMenuOpen(false);
//       const currentTab = droppedMap[pendingTab] || { general: [] };
//       setHasUnsavedChanges(currentTab.general.length > 0);
//     }
//   };

//   const handleCancelNavigation = () => {
//     setShowUnsavedModal(false);
//     setPendingNavigation(null);
//     setPendingTab(null);
//   };

//   const handleSaveAndNavigate = async () => {
//     await handleSaveDashboard();
//     if (pendingNavigation || pendingTab) {
//       handleConfirmNavigation();
//     }
//   };

//   const handleViewSavedDashboards = (e) => {
//     e.preventDefault();
//     if (!isLoggedIn) {
//       toast.error('Login first to see your dashboards.');
//       return;
//     }
//     handleNavClick('Saved Dashboards', '/savedDashboard');
//   };

//   const navItems = (
//     <ul className="flex flex-wrap items-center gap-6">
//       <li>
//         <Link
//           to="/"
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("Home", "/");
//           }}
//           className={`text-base font-semibold transition-all duration-300 
//             ${isActive('/') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="home-link"
//         >
//           Home
//         </Link>
//       </li>
//       <li
//         id="portfolio-dropdown"
//         className="relative"
//         onMouseEnter={() => setIsPortfolioOpen(true)}
//         onMouseLeave={() => setIsPortfolioOpen(false)}
//         data-tour="portfolio-link"
//       >
//         <span
//           onClick={handlePortfolioClick}
//           className={`text-base font-semibold transition-all duration-300 cursor-pointer 
//             ${isActive('/portDash') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="portfolio-link"
//         >
//           Portfolio
//         </span>
//         {isPortfolioOpen && (
//           <ul
//             className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5"
//             onMouseEnter={() => setIsPortfolioOpen(true)}
//             onMouseLeave={() => setIsPortfolioOpen(false)}
//           >
//             <li>
//               <Link
//                 to="/portDash"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
//                 data-tour="upload-portfolio"
//               >
//                 Upload File
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/my-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/my-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
//                 data-tour="portfolio-saved"
//               >
//                 Saved Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/resculpt-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/resculpt-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
//                 data-tour="portfolio-recreate"
//               >
//                 Recreate Portfolio
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/portDash/customize-portfolio"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (hasUnsavedChanges) {
//                     setPendingNavigation({ label: 'portfolio', path: '/portDash/customize-portfolio' });
//                     setShowUnsavedModal(true);
//                     return;
//                   }
//                   setIsPortfolioOpen(false);
//                 }}
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
//                 data-tour="portfolio-create"
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
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("Equity Hub", "/equityhub");
//           }}
//           className={`text-base font-semibold transition-all duration-300 
//             ${isActive('/equityhub') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="equityhub-link"
//         >
//           Equity
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/dashboard"
//           onClick={handleDashboardClick}
//           className={`text-base font-semibold transition-all duration-300 
//             ${isActive('/dashboard') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="dashboard-link"
//         >
//           Dashboard
//         </Link>
//       </li>
//       <li>
//         <Link
//           to="/about"
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavClick("About", "/about");
//           }}
//           className={`text-base font-semibold transition-all duration-300 
//             ${isActive('/about') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="about-link"
//         >
//           About
//         </Link>
//       </li>
//       <li className={isDisabled ? "pointer-events-none opacity-50" : ""}>
//         <Link
//           to="/plan"
//           onClick={(e) => {
//             if (isDisabled) {
//               e.preventDefault();
//               return;
//             }
//             e.preventDefault();
//             handleNavClick("Subscription", "/plan");
//           }}
//           className={`text-base font-semibold transition-all duration-300 
//             ${isActive('/plan') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
//             pb-2`}
//           data-tour="subscription-link"
//         >
//           Subscription
//         </Link>
//       </li>
//     </ul>
//   );

//   return (
//     <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//       <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
//         <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
//         {showModal && (
//           <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />
//         )}
//         <div
//           className={`flex-1 transition-all duration-300 ease-in-out ${collapsed ? 'w-full' : 'sm:pr-64 xs:pr-56'}
//                         } overflow-x-hidden`}
//         >
//           <header className="sticky top-0 z-50 w-full bg-gray-800 dark:bg-gray-900 shadow-lg border-b border-gray-700 dark:border-gray-800">
//             <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
//               <Link to="/" className="text-2xl font-bold text-blue-400 dark:text-blue-300 flex items-center relative">
//                 <div style={{
//                   display: 'inline-flex',
//                   alignItems: 'flex-start',
//                   gap: '0',
//                   position: 'relative',
//                 }}>
//                   <span style={{
//                     fontSize: '28px',
//                     fontWeight: '800',
//                     color: '#ffffff',
//                     letterSpacing: '0.05em',
//                     textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
//                   }}>
//                     #CMD
//                   </span>
//                   <div style={{
//                     display: 'inline-flex',
//                     alignItems: 'center',
//                     gap: '1px',
//                     marginLeft: '-2px',
//                   }}>
//                     <span style={{
//                       fontSize: '28px',
//                       fontWeight: '800',
//                       background: 'linear-gradient(45deg, #0e84f1, #12b8eb, #33D4FF)',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                       textShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
//                       lineHeight: '1.2',
//                     }}>
//                       A
//                     </span>
//                   </div>
//                   <span style={{
//                     position: 'absolute',
//                     right: '-38px',
//                     bottom: '16px',
//                     backgroundColor: '#ffffff',
//                     color: '#17b3f1ff',
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
//                     transform: 'rotate(12deg)',
//                     whiteSpace: 'nowrap',
//                     lineHeight: '1',
//                   }}>
//                     BETA
//                   </span>
//                 </div>
//               </Link>
//               <nav className="hidden lg:block">{navItems}</nav>
//               <div className="lg:hidden">
//                 <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 dark:text-gray-200">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="flex items-center gap-4">
//                 {isLoggedIn ? (
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleLoginClick}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                     data-tour="login-button"
//                   >
//                     Login
//                   </button>
//                 )}
//               </div>
//             </div>
//             {isMenuOpen && (
//               <div className="lg:hidden bg-gray-800 dark:bg-gray-900 p-4 shadow-md">
//                 {navItems}
//               </div>
//             )}
//           </header>

//           <div className="max-w-7xl mx-auto px-6 py-4">
//             <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
//               {tabs.map((tab) => (
//                 <div key={tab} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
//                   {editingTab === tab ? (
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={editedTabName}
//                         onChange={(e) => setEditedTabName(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleRenameTab(tab, editedTabName)}
//                         className="w-32 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//                       />
//                       <button
//                         onClick={() => handleRenameTab(tab, editedTabName)}
//                         className="text-gray-500 hover:text-blue-500"
//                         title="Save"
//                       >
//                         <IoMdSave size={16} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleTabSwitch(tab)}
//                         className={`text-sm font-medium ${activeTab === tab ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
//                       >
//                         {tab}
//                       </button>
//                       <button
//                         onClick={() => {
//                           setEditingTab(tab);
//                           setEditedTabName(tab);
//                         }}
//                         className="text-gray-500 hover:text-blue-500"
//                         title="Rename"
//                       >
//                         <MdOutlineDriveFileRenameOutline size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteDashboardAPI(tab)}
//                         className="text-gray-500 hover:text-red-500"
//                         title="Delete"
//                       >
//                         <IoMdClose size={16} />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div id="dashboard-menu" className="relative">
//                 <button
//                   onClick={() => setShowDashboardMenu(!showDashboardMenu)}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                   data-tour="dashboard-menu"
//                 >
//                   <MdOutlineDashboardCustomize size={16} /> Dashboards <IoMdArrowDropdown size={16} />
//                 </button>
//                 {showDashboardMenu && (
//                   <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
//                     <li>
//                       <button
//                         onClick={() => {
//                           if (hasUnsavedChanges) {
//                             setPendingNavigation({ label: 'addDashboard', path: null });
//                             setShowUnsavedModal(true);
//                             return;
//                           }
//                           setShowModal(true);
//                           setShowDashboardMenu(false);
//                         }}
//                         className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
//                         data-tour="dashboard-add"
//                       >
//                         Add Dashboard
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={() => {
//                           handleSaveDashboard();
//                           setShowDashboardMenu(false);
//                         }}
//                         className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
//                         data-tour="dashboard-save"
//                       >
//                         Save Dashboard
//                       </button>
//                     </li>
//                     <li>
//                       <button
//                         onClick={(e) => {
//                           handleViewSavedDashboards(e);
//                           setShowDashboardMenu(false);
//                         }}
//                         className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
//                         data-tour="dashboard-saved"
//                       >
//                         Saved Dashboards
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </div>
//             </div>
//             {getUniqueCompanies().length > 0 ? (
//               <div className="flex flex-wrap gap-2 items-center mb-6">
//                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Stocks:</span>
//                 {getUniqueCompanies().map((companyName) => (
//                   <div key={companyName} className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
//                     <span className="truncate">{companyName}</span>
//                     <button
//                       onClick={() => handleClearCompany(companyName)}
//                       className="text-gray-500 hover:text-red-500"
//                       title="Remove"
//                     >
//                       <IoMdClose size={12} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">No stocks selected. Add stocks from the sidebar.</p>
//             )}
//             <div className="mb-6">
//               <button
//                 onClick={() => setShowSampleImage(!showSampleImage)}
//                 className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
//               >
//                 <MdSubdirectoryArrowRight size={16} className={`${showSampleImage ? 'rotate-90' : ''} transition-transform`} /> {showSampleImage ? 'Hide' : 'View'} Sample Dashboard
//               </button>
//               {showSampleImage && (
//                 <img
//                   src={SampleDashImage}
//                   alt="Dashboard Plots"
//                   onClick={handleImageClick}
//                   className="cursor-pointer w-full max-w-md mx-auto rounded-lg shadow-md hover:shadow-lg transition-shadow mt-4"
//                 />
//               )}
//             </div>
//           </div>

//           <main className="w-full h-auto mx-auto px-6 py-8 space-y-8">
//             <section className="space-y-4">
//               <div className="text-center">
//                 <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Whiteboard</h2>
//               </div>
//               <DroppableArea id="general">
//                 {(() => {
//                   const droppedItems = droppedMap?.[activeTab]?.general || [];
//                   const visibleItems = getVisibleItems(droppedItems);
//                   if (visibleItems.length === 0) {
//                     return (
//                       <div className="flex flex-col items-center justify-center py-16 px-4 dark:bg-gray-800 border-2 dark:text-gray-400">
//                         <svg className="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8v8m0 0h8m-8 0l8-8m4 8v-8m0 0H8m8 0l-8 8" />
//                         </svg>
//                         <p className="text-base font-medium">Drop or tap components here</p>
//                       </div>
//                     );
//                   }

//                   return (
//                     <div className="flex flex-wrap gap-6">
//                       {visibleItems.map(({ label, symbol, companyName, id, uploadId, platform, type, width, height }, idx) => {
//                         const ComponentMap = type === 'equity' ? equityHubMap : portfolioMap;
//                         const Component = ComponentMap[label];
//                         if (activeTab !== 'Sample Dashboard') {
//                           return (
//                             <ResizableBox
//                               key={`general-${id}`}
//                               width={width || 400}
//                               height={height || 300}
//                               minConstraints={[200, 200]}
//                               maxConstraints={[800, 600]}
//                               onResizeStop={(e, data) => {
//                                 const newWidth = data.size.width;
//                                 const newHeight = data.size.height;
//                                 setDroppedMap((prev) => {
//                                   const newGeneral = prev[activeTab].general.map((it) =>
//                                     it.id === id ? { ...it, width: newWidth, height: newHeight } : it
//                                   );
//                                   return { ...prev, [activeTab]: { general: newGeneral } };
//                                 });
//                               }}
//                             >
//                               <PlotCard
//                                 label={label}
//                                 symbol={symbol}
//                                 companyName={companyName}
//                                 id={id}
//                                 uploadId={uploadId}
//                                 platform={platform}
//                                 type={type}
//                                 delay={idx * 0.1}
//                                 onDelete={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
//                               />
//                             </ResizableBox>
//                           );
//                         }
//                         if (!Component) {
//                           return (
//                             <ResizableBox
//                               key={`general-${id}`}
//                               width={width || 400}
//                               height={height || 300}
//                               minConstraints={[200, 200]}
//                               maxConstraints={[800, 600]}
//                               onResizeStop={(e, data) => {
//                                 const newWidth = data.size.width;
//                                 const newHeight = data.size.height;
//                                 setDroppedMap((prev) => {
//                                   const newGeneral = prev[activeTab].general.map((it) =>
//                                     it.id === id ? { ...it, width: newWidth, height: newHeight } : it
//                                   );
//                                   return { ...prev, [activeTab]: { general: newGeneral } };
//                                 });
//                               }}
//                             >
//                               <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
//                               >
//                                 <button
//                                   onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
//                                   className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//                                   aria-label="Delete component"
//                                 >
//                                   <IoMdClose size={20} />
//                                 </button>
//                                 <p className="text-red-500 text-sm">Component "{label}" not found</p>
//                               </motion.div>
//                             </ResizableBox>
//                           );
//                         }
//                         if (type === 'equity' && !symbol) {
//                           return (
//                             <ResizableBox
//                               key={`general-${id}`}
//                               width={width || 400}
//                               height={height || 300}
//                               minConstraints={[200, 200]}
//                               maxConstraints={[800, 600]}
//                               onResizeStop={(e, data) => {
//                                 const newWidth = data.size.width;
//                                 const newHeight = data.size.height;
//                                 setDroppedMap((prev) => {
//                                   const newGeneral = prev[activeTab].general.map((it) =>
//                                     it.id === id ? { ...it, width: newWidth, height: newHeight } : it
//                                   );
//                                   return { ...prev, [activeTab]: { general: newGeneral } };
//                                 });
//                               }}
//                             >
//                               <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.3, delay: idx * 0.1 }}
//                                 className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
//                               >
//                                 <button
//                                   onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
//                                   className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//                                   aria-label="Delete component"
//                                 >
//                                   <IoMdClose size={20} />
//                                 </button>
//                                 <p className="text-yellow-500 text-sm">Waiting for company selection for {label}</p>
//                               </motion.div>
//                             </ResizableBox>
//                           );
//                         }
//                         return (
//                           <ResizableBox
//                             key={`general-${id}`}
//                             width={width || 400}
//                             height={height || 300}
//                             minConstraints={[200, 200]}
//                             maxConstraints={[800, 600]}
//                             onResizeStop={(e, data) => {
//                               const newWidth = data.size.width;
//                               const newHeight = data.size.height;
//                               setDroppedMap((prev) => {
//                                 const newGeneral = prev[activeTab].general.map((it) =>
//                                   it.id === id ? { ...it, width: newWidth, height: newHeight } : it
//                                 );
//                                 return { ...prev, [activeTab]: { general: newGeneral } };
//                               });
//                             }}
//                           >
//                             <motion.div
//                               initial={{ opacity: 0, y: 20 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               transition={{ duration: 0.3, delay: idx * 0.1 }}
//                               className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
//                             >
//                               <button
//                                 onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
//                                 className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
//                                 aria-label="Delete component"
//                               >
//                                 <IoMdClose size={20} />
//                               </button>
//                               <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white truncate">
//                                 {label} {companyName ? `(${companyName})` : platform ? `(${platform})` : ''}
//                               </h3>
//                               <div className="w-full h-full overflow-hidden">
//                                 {type === 'equity' ? (
//                                   <Component symbol={symbol} key={`${id}-${symbol}`} />
//                                 ) : (
//                                   <GraphDataProvider>
//                                     <Component uploadId={uploadId} key={`${id}-${uploadId}`} />
//                                   </GraphDataProvider>
//                                 )}
//                               </div>
//                             </motion.div>
//                           </ResizableBox>
//                         );
//                       })}
//                     </div>
//                   );
//                 })()}
//               </DroppableArea>
//             </section>
//           </main>


//         </div>
//         <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
//         {showModal && (
//           <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />
//         )}
//         <DragStartModal
//           isOpen={showDragModal}
//           onClose={() => {
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           onSearch={handleStockSearch}
//           searchTerm={searchTerm}
//           setSearchTerm={(value) => {
//             setSearchTerm(value);
//             setError(null);
//             if (value.length >= 2) handleStockSearch();
//             else setSearchedStocks([]);
//           }}
//           searchedStocks={searchedStocks}
//           onSelectItem={(item) => {
//             if (currentDragItem) {
//               setDroppedMap((prev) => {
//                 const currentTab = prev[activeTab] || { general: [] };
//                 const generalItems = currentTab.general || [];
//                 const lastItemIndex = generalItems.findLastIndex(
//                   (i) => i.label === currentDragItem.label && !i.symbol
//                 );
//                 if (lastItemIndex >= 0) {
//                   const updatedItems = [...generalItems];
//                   updatedItems[lastItemIndex] = {
//                     ...updatedItems[lastItemIndex],
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                     type: 'equity',
//                     width: 400,
//                     height: 300
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, general: updatedItems } };
//                 } else {
//                   const newItem = {
//                     label: currentDragItem.label,
//                     symbol: item.symbol,
//                     companyName: item.companyName,
//                     graphType: currentDragItem.label,
//                     id: `${currentDragItem.label}-${Date.now()}`,
//                     type: 'equity',
//                     width: 400,
//                     height: 300
//                   };
//                   return { ...prev, [activeTab]: { ...currentTab, general: [...generalItems, newItem] } };
//                 }
//               });
//               setDragCountMap((prev) => ({
//                 ...prev,
//                 [activeTab]: {
//                   ...prev[activeTab],
//                   [currentDragItem.label]: (prev[activeTab]?.[currentDragItem.label] || 0) + 1,
//                 },
//               }));
//             }
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setShowDragModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//             setHasUnsavedChanges(true);
//           }}
//           onClear={() => {
//             setSearchTerm('');
//             setSearchedStocks([]);
//             setError(null);
//           }}
//           selectedCompany={null}
//           error={error}
//         />
//         <PortfolioSelectModal
//           isOpen={showPortfolioModal}
//           onClose={() => {
//             setShowPortfolioModal(false);
//             setCurrentDragItem(null);
//             setError(null);
//           }}
//           portfolios={savedPortfolios}
//           onSelectPortfolio={handlePortfolioSelect}
//           error={error}
//         />
//         {showUnsavedModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl">
//               <button
//                 onClick={handleCancelNavigation}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <IoMdClose size={24} />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Unsaved Changes</h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 You have unsaved changes. Would you like to save before leaving?
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleSaveAndNavigate}
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Save and Continue
//                 </button>
//                 <button
//                   onClick={handleConfirmNavigation}
//                   className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Leave Without Saving
//                 </button>
//                 <button
//                   onClick={handleCancelNavigation}
//                   className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {showSavedModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl text-center">
//               <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Dashboard Saved!</h2>
//               <p className="text-gray-600 dark:text-gray-300">Your changes have been saved successfully.</p>
//             </div>
//           </div>
//         )}
//         {showDeleteModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//             <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <IoMdClose size={24} />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Confirm Deletion</h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 Are you sure you want to delete your account? This action cannot be undone.
//               </p>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleDeleteAccount}
//                   className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </DndContext>
//   );
// };

// export default DashBoard;


import React, { useEffect, useState, useRef } from 'react';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { MdOutlineDashboardCustomize, MdOutlineDriveFileRenameOutline, MdSubdirectoryArrowRight } from 'react-icons/md';
import { BiSolidSave } from 'react-icons/bi';
import { IoMdClose, IoMdSave, IoMdArrowDropdown } from 'react-icons/io';
import { FaHome } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import SidebarRight from './SidebarRight';
import AddNewModal from './AddNewModal';
import DragStartModal from './DragStartModal';
import DroppableArea from './DroppableArea';
import { equityHubMap, portfolioMap } from './ComponentRegistry';
import { GoSidebarExpand } from 'react-icons/go';
import { GraphDataProvider } from '../Portfolio/GraphDataContext';
import PortfolioSelectModal from './PortfolioSelectModal';
import { FaChartLine, FaBriefcase } from 'react-icons/fa';
import { Search } from "lucide-react";
import SearchList from '../EquityHub/SearchList';
import { useAuth } from '../AuthContext';
import { CiLogout } from "react-icons/ci";
import { logActivity } from '../../services/api';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import PlotCard from './PlotCard';
import SampleDashImage from '/public/assets/SampleDashboard_snapshot.png'

Modal.setAppElement('#root');

const DashBoard = () => {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const [showModal, setShowModal] = useState(false);
  const [tabs, setTabs] = useState(['Sample Dashboard']);
  const [activeTab, setActiveTab] = useState('Sample Dashboard');
  const [uploadId, setUploadId] = useState(null);
  const [platform, setPlatform] = useState('');
  const [symbol, setSymbol] = useState(null);
  const [savedStocks, setSavedStocks] = useState([]);
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [droppedMap, setDroppedMap] = useState({
    // 'Sample Dashboard': {
    //   general: [
    //     {
    //       label: 'Avg Box Plots',
    //       symbol: 'UNIVCABLES',
    //       companyName: 'Universal Cables',
    //       graphType: 'Avg Box Plots',
    //       id: 'sample1',
    //       type: 'equity',
    //       width: 400,
    //       height: 300
    //     },
    //     {
    //       label: 'SensexStockCorrBar',
    //       symbol: 'KAJARIACER',
    //       companyName: 'Kajaria Ceramics',
    //       graphType: 'SensexStockCorrBar',
    //       id: 'sample2',
    //       type: 'equity',
    //       width: 400,
    //       height: 300
    //     },
    //     {
    //       label: 'ShareholdingPlot',
    //       uploadId: 'eaf8f73b-3063-4d87-8f78-7647f1a400f4',  // Assume a default or fetch from API
    //       platform: 'Axis Bank',
    //       graphType: 'ShareholdingPlot',
    //       id: 'sample3',
    //       type: 'portfolio',
    //       width: 400,
    //       height: 300
    //     }
    //   ]
    // }
  });
  const [dragCountMap, setDragCountMap] = useState({
    'Sample Dashboard': {
      'Avg Box Plots': 1,
      'SensexStockCorrBar': 1,
      'ShareholdingPlot': 1
    }
  });

  const handleImageClick = () => {
    const plots = [
      {
        label: 'Avg Box Plots',
        symbol: 'UNIVCABLES',
        companyName: 'Universal Cables',
        graphType: 'Avg Box Plots',
        id: `avg-box-${Date.now()}`,
        type: 'equity',
        width: 800,
        height: 600
      },
      {
        label: 'SensexStockCorrBar',
        symbol: 'KAJARIACER',
        companyName: 'Kajaria Ceramics',
        graphType: 'SensexStockCorrBar',
        id: `sensex-corr-${Date.now()}`,
        type: 'equity',
        width: 800,
        height: 600
      },
      {
        label: 'ShareholdingPlot',
        uploadId: 'eaf8f73b-3063-4d87-8f78-7647f1a400f4', // Explicitly set for consistency
        platform: 'Axis Bank',
        graphType: 'ShareholdingPlot',
        id: `ShareholdingPlot-${Date.now()}`,
        type: 'portfolio',
        width: 800,
        height: 600
      }
    ];
    setDroppedMap((prev) => {
      const currentTab = prev[activeTab] || { general: [] };
      return {
        ...prev,
        [activeTab]: { ...currentTab, general: [...currentTab.general, ...plots] },
      };
    });
    plots.forEach(plot => {
      setDragCountMap((prev) => ({
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          [plot.label]: (prev[activeTab]?.[plot.label] || 0) + 1,
        },
      }));
    });
    setHasUnsavedChanges(true);
    toast.success('Plots added to the whiteboard!');
  };

  const [editingTab, setEditingTab] = useState(null);
  const [editedTabName, setEditedTabName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedStocks, setSearchedStocks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDragModal, setShowDragModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDragItem, setCurrentDragItem] = useState(null);
  const [error, setError] = useState(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [pendingTab, setPendingTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [sticky, setSticky] = useState(false);
  const [userType, setUserType] = useState(null);
  const [fullName, setFullName] = useState('');
  const initialQuery = queryParams.get('query') || '';
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const { login, logout } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [showSampleImage, setShowSampleImage] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const drawerRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const handleNavClick = async (label, path) => {
    if (hasUnsavedChanges) {
      setPendingNavigation({ label, path });
      setShowUnsavedModal(true);
      return false;
    }
    await logActivity(`${label} tab clicked`);
    navigate(path);
    return true;
  };

  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login to access the Dashboard");
    } else {
      handleNavClick("Dashboard", "/dashboard");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#portfolio-dropdown")) {
        setIsPortfolioOpen(false);
      }
      if (!event.target.closest("#dashboard-menu")) {
        setShowDashboardMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (hasUnsavedChanges) {
      setPendingNavigation({ label: 'logout', path: '/' });
      setShowUnsavedModal(true);
      return;
    }
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    logout();
    toast.success("Logout successfully!");
    navigate('/');
  };

  const handlePortfolioClick = (e) => {
    e.preventDefault();
    if (hasUnsavedChanges) {
      setPendingNavigation({ label: 'portfolio', path: '/portDash' });
      setShowUnsavedModal(true);
      return;
    }
    setIsPortfolioOpen(true);
    logActivity("Portfolio tab clicked");
    navigate('/portDash');
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const storedUploadId = localStorage.getItem('uploadId');
    const storedPlatform = localStorage.getItem('platform');
    if (storedUploadId && storedPlatform) {
      setUploadId(storedUploadId);
      setPlatform(storedPlatform);
    }
  }, []);

  useEffect(() => {
    const currentTab = droppedMap[activeTab] || { general: [] };
    const hasChanges = currentTab.general.length > 0;
    setHasUnsavedChanges(hasChanges);
  }, [droppedMap, activeTab]);

  const fetchSavedPortfolio = async () => {
    try {
      setError('');
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Please login to view your portfolios');
        return;
      }
      const response = await fetch(`${API_BASE}/file/saved`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const err = await response.json();
        setError(err.error || 'Failed to fetch saved portfolios');
        return;
      }
      const data = await response.json();
      if (data.length > 0) {
        setSavedPortfolios(data);
        setUploadId(data[0].uploadId);
        setPlatform(data[0].platform);
      } else {
        setSavedPortfolios([]);
        setError('No portfolios found');
      }
    } catch (err) {
      console.error('Error fetching saved portfolios:', err);
      setError('Network error. Please try again later.');
    }
  };

  useEffect(() => {
    fetchSavedPortfolio();
  }, [API_BASE]);

  const handleStockSearch = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/stocks/test/search?query=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setSearchedStocks(data);
        setSavedStocks(data);
      } else {
        setSearchedStocks([]);
        toast.info('No stocks found for the search term.');
        setError('Company not found');
      }
    } catch (err) {
      console.error('Error fetching stock suggestions:', err);
      setSearchedStocks([]);
      setError('Company not found in our list. Please check the name and search again.');
    }
  };

  const handleRenameTab = (oldName, newName) => {
    if (!newName || newName.trim() === '') return;
    if (tabs.includes(newName)) {
      toast.info('A dashboard with this name already exists.');
      return;
    }
    setTabs((prevTabs) => prevTabs.map((tab) => (tab === oldName ? newName : tab)));
    setDroppedMap((prev) => {
      const updated = { ...prev };
      updated[newName] = prev[oldName];
      delete updated[oldName];
      return updated;
    });
    setDragCountMap((prev) => {
      const updated = { ...prev };
      updated[newName] = prev[oldName];
      delete updated[oldName];
      return updated;
    });
    if (activeTab === oldName) setActiveTab(newName);
    setEditingTab(null);
    setEditedTabName('');
    const currentTab = droppedMap[newName] || { general: [] };
    setHasUnsavedChanges(currentTab.general.length > 0);
  };

  const handleDeleteComponent = (index) => {
    setDroppedMap((prev) => {
      const updated = { ...prev };
      updated[activeTab] = {
        ...prev[activeTab],
        general: prev[activeTab].general.filter((_, idx) => idx !== index),
      };
      return updated;
    });
    const label = droppedMap[activeTab].general[index].label;
    const remaining = droppedMap[activeTab].general.filter((item, idx) => idx !== index && item.label === label);
    if (remaining.length === 0) {
      setDragCountMap((prev) => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], [label]: 0 },
      }));
    }
    const currentTab = droppedMap[activeTab] || { general: [] };
    setHasUnsavedChanges(currentTab.general.length > 0);
  };

  const handleClearCompany = (companyName) => {
    setDroppedMap((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        general: prev[activeTab].general.filter((item) => item.companyName !== companyName),
      },
    }));
    const affectedLabels = droppedMap[activeTab].general
      .filter((item) => item.companyName === companyName)
      .map((item) => item.label);
    setDragCountMap((prev) => {
      const updated = { ...prev, [activeTab]: { ...prev[activeTab] } };
      affectedLabels.forEach((label) => {
        const remaining = droppedMap[activeTab].general.filter(
          (item) => item.label === label && item.companyName !== companyName
        );
        updated[activeTab][label] = remaining.length > 0 ? prev[activeTab][label] || 1 : 0;
      });
      return updated;
    });
    toast.success(`Company ${companyName} and associated graphs removed`);
    const currentTab = droppedMap[activeTab] || { general: [] };
    setHasUnsavedChanges(currentTab.general.length > 0);
  };

  const generateDefaultDashboardName = async (baseName = 'Dashboard') => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/dashboard/fetch`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch dashboards');
      const data = await response.json();
      const existingNames = data.dashboards.map((dash) => dash.dashboardName);
      let index = 1;
      let defaultName;
      do {
        defaultName = `${baseName} ${index}`;
        index++;
      } while (existingNames.includes(defaultName) || tabs.includes(defaultName));
      return defaultName;
    } catch (err) {
      console.error('Error fetching dashboards for name generation:', err);
      let index = 1;
      let defaultName;
      do {
        defaultName = `${baseName} ${index}`;
        index++;
      } while (tabs.includes(defaultName));
      return defaultName;
    }
  };

  const handleNewDashboard = async (title) => {
    const newTitle = title && title.trim() ? title : await generateDefaultDashboardName();
    if (tabs.includes(newTitle)) {
      toast.info('A dashboard with this name already exists.');
      return;
    }
    setTabs((prev) => [...prev, newTitle]);
    setDroppedMap((prev) => ({ ...prev, [newTitle]: { general: [] } }));
    setActiveTab(newTitle);
    setShowModal(false);
    setDragCountMap((prev) => ({ ...prev, [newTitle]: {} }));
    setIsMenuOpen(false);
    setHasUnsavedChanges(false);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const label = active?.data?.current?.label;
    setCurrentDragItem(active?.data?.current);
    const equityLabels = Object.keys(equityHubMap);
    const portfolioLabels = Object.keys(portfolioMap);
    if (equityLabels.includes(label)) {
      const currentDragCount = dragCountMap[activeTab]?.[label] || 0;
      if (currentDragCount === 0 && !droppedMap[activeTab].general.some((item) => item.label === label)) {
        setShowDragModal(true);
      } else if (currentDragCount >= 1) {
        setShowDragModal(true);
      }
    } else if (portfolioLabels.includes(label)) {
      setShowPortfolioModal(true);
    }
  };

  const handleItemClick = (item) => {
    const { id, label } = item;
    const equityLabels = Object.keys(equityHubMap);
    const portfolioLabels = Object.keys(portfolioMap);

    let section = null;
    if (equityLabels.includes(label)) section = 'equity';
    if (portfolioLabels.includes(label)) section = 'portfolio';

    if (section === 'equity') {
      setCurrentDragItem({ label });
      setShowDragModal(true);
      return;
    }

    if (section === 'portfolio') {
      setCurrentDragItem({ label });
      setShowPortfolioModal(true);
      return;
    }
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    const label = active?.data?.current?.label;
    const id = active?.id;
    if (!over || !label || !id) return;

    if (over.id !== 'general') {
      toast.error(`"${label}" can only be dropped in the whiteboard area.`);
      return;
    }

    const equityLabels = Object.keys(equityHubMap);
    const portfolioLabels = Object.keys(portfolioMap);

    if (equityLabels.includes(label)) {
      setCurrentDragItem(active?.data?.current);
      setShowDragModal(true);
      return;
    }

    if (portfolioLabels.includes(label)) {
      setCurrentDragItem(active?.data?.current);
      setShowPortfolioModal(true);
      return;
    }
  };

  const handlePortfolioSelect = (portfolio) => {
    if (currentDragItem) {
      const draggedItem = {
        label: currentDragItem.label,
        symbol: '',
        companyName: '',
        graphType: currentDragItem.label,
        uploadId: portfolio.uploadId,
        platform: portfolio.platform,
        id: `${currentDragItem.label}-${Date.now()}`,
        type: 'portfolio',
        width: 400,
        height: 300
      };

      setDroppedMap((prev) => {
        const currentTab = prev[activeTab] || { general: [] };
        const currentSection = currentTab['general'] || [];
        return {
          ...prev,
          [activeTab]: { ...currentTab, general: [...currentSection, draggedItem] },
        };
      });
      setUploadId(portfolio.uploadId);
      setPlatform(portfolio.platform);
      localStorage.setItem('uploadId', portfolio.uploadId.toString());
      localStorage.setItem('platform', portfolio.platform);
      setShowPortfolioModal(false);
      setCurrentDragItem(null);
      setHasUnsavedChanges(true);
    }
  };

  const getGridClass = (items) => {
    if (items.length === 0) return 'grid-cols-1';
    const firstRowCount = Math.min(items.length);
    const remainingCount = items.length - firstRowCount;
    return `grid grid-cols-1 sm:grid-cols-${firstRowCount} gap-4 ${remainingCount > 0 ? 'sm:grid-rows-2' : ''}`;
  };

  const getVisibleItems = (items) => items;

  useEffect(() => {
    const fetchSavedStocks = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE}/stocks/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          const symbols = data.map((stock) => stock.symbol);
          setSymbol(symbols);
        }
      } catch (err) {
        console.error('Failed to fetch saved stocks:', err);
      }
    };
    fetchSavedStocks();
  }, [API_BASE]);

  const handleSaveDashboard = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    const generalPlots = droppedMap?.[activeTab]?.general || [];

    if (!token) {
      toast.error('Please login first to save your dashboard.');
      return;
    }

    if (generalPlots.length === 0) {
      toast.error('Please drag and drop at least one plot before saving.');
      return;
    }

    let finalDashboardName = activeTab;
    try {
      const response = await fetch(`${API_BASE}/dashboard/fetch`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch dashboards');
      const data = await response.json();
      const existingNames = data.dashboards.map((dash) => dash.dashboardName);
      if (existingNames.includes(finalDashboardName)) {
        finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
        setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
        setDroppedMap((prev) => {
          const updated = { ...prev };
          updated[finalDashboardName] = prev[activeTab];
          delete updated[activeTab];
          return updated;
        });
        setDragCountMap((prev) => {
          const updated = { ...prev };
          updated[finalDashboardName] = prev[activeTab];
          delete updated[activeTab];
          return updated;
        });
        setActiveTab(finalDashboardName);
        toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
      }
    } catch (err) {
      console.error('Error checking dashboard names:', err);
      if (tabs.includes(finalDashboardName)) {
        finalDashboardName = await generateDefaultDashboardName(activeTab.split(' ')[0] || 'Dashboard');
        setTabs((prevTabs) => prevTabs.map((tab) => (tab === activeTab ? finalDashboardName : tab)));
        setDroppedMap((prev) => {
          const updated = { ...prev };
          updated[finalDashboardName] = prev[activeTab];
          delete updated[activeTab];
          return updated;
        });
        setDragCountMap((prev) => {
          const updated = { ...prev };
          updated[finalDashboardName] = prev[activeTab];
          delete updated[activeTab];
          return updated;
        });
        setActiveTab(finalDashboardName);
        toast.info(`Dashboard name changed to "${finalDashboardName}" to avoid duplication.`);
      }
    }

    const savedData = {
      dashboard: { dashboardName: finalDashboardName, userId: userId ? parseInt(userId) : 0, userType: userType || '' },
      equityHubPlots: [],
      portfolioPlots: [],
    };

    generalPlots.forEach(({ label, symbol, companyName, graphType, uploadId, platform, type }) => {
      if (type === 'equity') {
        let finalSymbol = symbol;
        let finalCompany = companyName;

        if (!finalSymbol || !finalCompany) {
          const matched = savedStocks.find(
            (stock) => stock.symbol === finalSymbol || stock.graphType === graphType || stock.label === label
          );
          if (matched) {
            finalSymbol = finalSymbol || matched.symbol;
            finalCompany = finalCompany || matched.companyName;
          }
        }

        savedData.equityHubPlots.push({ symbol: finalSymbol, companyName: finalCompany, graphType: graphType || label });
      } else if (type === 'portfolio') {
        savedData.portfolioPlots.push({ uploadId, platform, graphType: label });
      }
    });

    try {
      const response = await fetch(`${API_BASE}/dashboard/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(savedData),
      });
      if (response.ok) {
        const result = await response.json();
        setHasUnsavedChanges(false);
        setShowSavedModal(true);
        setTimeout(() => setShowSavedModal(false), 2000);
      } else {
        toast.error('Failed to save dashboard');
      }
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('Save failed');
    }
    setIsMenuOpen(false);
  };

  const handleDeleteDashboardAPI = async (dashboardName) => {
    if (hasUnsavedChanges) {
      setPendingTab(dashboardName);
      setShowUnsavedModal(true);
      return;
    }
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE}/dashboard/delete/${dashboardName}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete dashboard');
      setTabs((prev) => prev.filter((tab) => tab !== dashboardName));
      setDroppedMap((prev) => {
        const updated = { ...prev };
        delete updated[dashboardName];
        return updated;
      });
      setDragCountMap((prev) => {
        const updated = { ...prev };
        delete updated[dashboardName];
        return updated;
      });
      if (activeTab === dashboardName) {
        const remainingTabs = tabs.filter((tab) => tab !== dashboardName);
        setActiveTab(remainingTabs[0] || '');
        const newTab = droppedMap[remainingTabs[0]] || { general: [] };
        setHasUnsavedChanges(newTab.general.length > 0);
      }
      toast.success('Dashboard deleted successfully');
      setIsMenuOpen(false);
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete dashboard');
    }
  };

  const getUniqueCompanies = () => {
    const generalItems = droppedMap[activeTab]?.general || [];
    return [...new Set(generalItems.filter(item => item.companyName).map((item) => item.companyName))];
  };

  const isDashboardEmpty = () => {
    const currentTab = droppedMap[activeTab] || { general: [] };
    return currentTab.general.length === 0;
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

  const handleClearSearch = () => {
    setSearchQuery('');
    setResults([]);
    setError(null);
  };

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => {
    login();
    handleCloseModal();
  };

  const handleDeleteAccount = async () => {
    if (hasUnsavedChanges) {
      setPendingNavigation({ label: 'deleteAccount', path: '/' });
      setShowUnsavedModal(true);
      return;
    }
    const apiUrl =
      userType === "corporate"
        ? `${API_BASE}/corporate/delete-account`
        : `${API_BASE}/Userprofile/delete-account`;

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
      localStorage.removeItem("hasShownQuizPopup");
      logout();
      navigate("/");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  const handleTabSwitch = (tab) => {
    if (hasUnsavedChanges && activeTab !== tab) {
      setPendingTab(tab);
      setShowUnsavedModal(true);
    } else {
      setActiveTab(tab);
      setIsMenuOpen(false);
      const currentTab = droppedMap[tab] || { general: [] };
      setHasUnsavedChanges(currentTab.general.length > 0);
    }
  };

  const handleConfirmNavigation = async () => {
    setShowUnsavedModal(false);
    if (pendingNavigation) {
      if (pendingNavigation.label === 'logout') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        logout();
        toast.success("Logout successfully!");
        navigate('/');
      } else if (pendingNavigation.label === 'deleteAccount') {
        await handleDeleteAccount();
      } else if (pendingNavigation.label === 'addDashboard') {
        setShowModal(true);
        setIsMenuOpen(false);
      } else {
        await logActivity(`${pendingNavigation.label} tab clicked`);
        navigate(pendingNavigation.path);
      }
      setPendingNavigation(null);
    } else if (pendingTab) {
      setActiveTab(pendingTab);
      setPendingTab(null);
      setIsMenuOpen(false);
      const currentTab = droppedMap[pendingTab] || { general: [] };
      setHasUnsavedChanges(currentTab.general.length > 0);
    }
  };

  const handleCancelNavigation = () => {
    setShowUnsavedModal(false);
    setPendingNavigation(null);
    setPendingTab(null);
  };

  const handleSaveAndNavigate = async () => {
    await handleSaveDashboard();
    if (pendingNavigation || pendingTab) {
      handleConfirmNavigation();
    }
  };

  const handleViewSavedDashboards = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error('Login first to see your dashboards.');
      return;
    }
    handleNavClick('Saved Dashboards', '/savedDashboard');
  };

  const navItems = (
    <ul className="flex flex-wrap items-center gap-6">
      <li>
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("Home", "/");
          }}
          className={`text-base font-semibold transition-all duration-300 
            ${isActive('/') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="home-link"
        >
          Home
        </Link>
      </li>
      <li
        id="portfolio-dropdown"
        className="relative"
        onMouseEnter={() => setIsPortfolioOpen(true)}
        onMouseLeave={() => setIsPortfolioOpen(false)}
        data-tour="portfolio-link"
      >
        <span
          onClick={handlePortfolioClick}
          className={`text-base font-semibold transition-all duration-300 cursor-pointer 
            ${isActive('/portDash') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="portfolio-link"
        >
          Portfolio
        </span>
        {isPortfolioOpen && (
          <ul
            className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5"
            onMouseEnter={() => setIsPortfolioOpen(true)}
            onMouseLeave={() => setIsPortfolioOpen(false)}
          >
            <li>
              <Link
                to="/portDash"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasUnsavedChanges) {
                    setPendingNavigation({ label: 'portfolio', path: '/portDash' });
                    setShowUnsavedModal(true);
                    return;
                  }
                  setIsPortfolioOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
                data-tour="upload-portfolio"
              >
                Upload File
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/my-portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasUnsavedChanges) {
                    setPendingNavigation({ label: 'portfolio', path: '/portDash/my-portfolio' });
                    setShowUnsavedModal(true);
                    return;
                  }
                  setIsPortfolioOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
                data-tour="portfolio-saved"
              >
                Saved Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/resculpt-portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasUnsavedChanges) {
                    setPendingNavigation({ label: 'portfolio', path: '/portDash/resculpt-portfolio' });
                    setShowUnsavedModal(true);
                    return;
                  }
                  setIsPortfolioOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
                data-tour="portfolio-recreate"
              >
                Recreate Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/portDash/customize-portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasUnsavedChanges) {
                    setPendingNavigation({ label: 'portfolio', path: '/portDash/customize-portfolio' });
                    setShowUnsavedModal(true);
                    return;
                  }
                  setIsPortfolioOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500"
                data-tour="portfolio-create"
              >
                BuildUrPortfolio
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li>
        <Link
          to="/equityhub"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("Equity Hub", "/equityhub");
          }}
          className={`text-base font-semibold transition-all duration-300 
            ${isActive('/equityhub') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="equityhub-link"
        >
          Equity Insights

        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          onClick={handleDashboardClick}
          className={`text-base font-semibold transition-all duration-300 
            ${isActive('/dashboard') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="dashboard-link"
        >
          Research Panel
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("About", "/about");
          }}
          className={`text-base font-semibold transition-all duration-300 
            ${isActive('/about') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="about-link"
        >
          About
        </Link>
      </li>
      <li className={isDisabled ? "pointer-events-none opacity-50" : ""}>
        <Link
          to="/plan"
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            e.preventDefault();
            handleNavClick("Subscription", "/plan");
          }}
          className={`text-base font-semibold transition-all duration-300 
            ${isActive('/plan') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-300 hover:text-white'} 
            pb-2`}
          data-tour="subscription-link"
        >
          Subscription
        </Link>
      </li>
    </ul>
  );

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
        {showModal && (
          <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />
        )}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${collapsed ? 'w-full' : 'sm:pr-64 xs:pr-56'}
                        } overflow-x-hidden`}
        >
          <header className="sticky top-0 z-50 w-full bg-gray-800 dark:bg-gray-900 shadow-lg border-b border-gray-700 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
              <Link to="/" className="text-2xl font-bold text-blue-400 dark:text-blue-300 flex items-center relative">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'flex-start',
                  gap: '0',
                  position: 'relative',
                }}>
                  <span style={{
                    fontSize: '28px',
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
                      fontSize: '28px',
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
                    fontSize: '12px',
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
              <nav className="hidden lg:block">{navItems}</nav>
              <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 dark:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    data-tour="login-button"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
            {isMenuOpen && (
              <div className="lg:hidden bg-gray-800 dark:bg-gray-900 p-4 shadow-md">
                {navItems}
              </div>
            )}
          </header>

          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              {tabs.map((tab) => (
                <div key={tab} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md">
                  {editingTab === tab ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedTabName}
                        onChange={(e) => setEditedTabName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRenameTab(tab, editedTabName)}
                        className="w-32 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={() => handleRenameTab(tab, editedTabName)}
                        className="text-gray-500 hover:text-blue-500"
                        title="Save"
                      >
                        <IoMdSave size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTabSwitch(tab)}
                        className={`text-sm font-medium ${activeTab === tab ? 'text-blue-500' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        {tab}
                      </button>
                      <button
                        onClick={() => {
                          setEditingTab(tab);
                          setEditedTabName(tab);
                        }}
                        className="text-gray-500 hover:text-blue-500"
                        title="Rename"
                      >
                        <MdOutlineDriveFileRenameOutline size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteDashboardAPI(tab)}
                        className="text-gray-500 hover:text-red-500"
                        title="Delete"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div id="dashboard-menu" className="relative">
                <button
                  onClick={() => setShowDashboardMenu(!showDashboardMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  data-tour="dashboard-menu"
                >
                  <MdOutlineDashboardCustomize size={16} /> Dashboards <IoMdArrowDropdown size={16} />
                </button>
                {showDashboardMenu && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5">
                    <li>
                      <button
                        onClick={() => {
                          if (hasUnsavedChanges) {
                            setPendingNavigation({ label: 'addDashboard', path: null });
                            setShowUnsavedModal(true);
                            return;
                          }
                          setShowModal(true);
                          setShowDashboardMenu(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
                        data-tour="dashboard-add"
                      >
                        Add Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleSaveDashboard();
                          setShowDashboardMenu(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
                        data-tour="dashboard-save"
                      >
                        Save Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => {
                          handleViewSavedDashboards(e);
                          setShowDashboardMenu(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 w-full text-left"
                        data-tour="dashboard-saved"
                      >
                        Created Dashboards
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {getUniqueCompanies().length > 0 ? (
              <div className="flex flex-wrap gap-2 items-center mb-6">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Stocks:</span>
                {getUniqueCompanies().map((companyName) => (
                  <div key={companyName} className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                    <span className="truncate">{companyName}</span>
                    <button
                      onClick={() => handleClearCompany(companyName)}
                      className="text-gray-500 hover:text-red-500"
                      title="Remove"
                    >
                      <IoMdClose size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">No stocks selected. Add stocks from the sidebar.</p>
            )}
            <div className="mb-6">
              <button
                onClick={() => setShowSampleImage(!showSampleImage)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                <MdSubdirectoryArrowRight size={16} className={`${showSampleImage ? 'rotate-90' : ''} transition-transform`} /> {showSampleImage ? 'Hide' : 'View'} Sample Dashboard
              </button>
              {showSampleImage && (
                <img
                  src={SampleDashImage}
                  alt="Dashboard Plots"
                  onClick={handleImageClick}
                  className="cursor-pointer w-32 h-20 object-cover rounded-md shadow"
                />
              )}
            </div>
          </div>

          <main className="w-full h-auto mx-auto px-6 py-8 space-y-8">
            <section className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Whiteboard</h2>
              </div>
              {/*<DroppableArea id="general">
                {(() => {
                  const droppedItems = droppedMap?.[activeTab]?.general || [];
                  const visibleItems = getVisibleItems(droppedItems);
                  if (visibleItems.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center py-16 px-4 dark:bg-gray-800 border-2 dark:text-gray-400">
                        <svg className="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8v8m0 0h8m-8 0l8-8m4 8v-8m0 0H8m8 0l-8 8" />
                        </svg>
                        <p className="text-base font-medium">Drop or tap components here</p>
                      </div>
                    );
                  }

                  return (
                    <div className="flex flex-wrap gap-6">
                      {visibleItems.map(({ label, symbol, companyName, id, uploadId, platform, type, width, height }, idx) => {
                        const ComponentMap = type === 'equity' ? equityHubMap : portfolioMap;
                        const Component = ComponentMap[label];
                        if (activeTab !== 'Dashboard') {
                          return (
                            <ResizableBox
                              key={`general-${id}`}
                              width={width || 800}
                              height={height || 600}
                              minConstraints={[200, 200]}
                              maxConstraints={[800, 600]}
                              onResizeStop={(e, data) => {
                                const newWidth = data.size.width;
                                const newHeight = data.size.height;
                                setDroppedMap((prev) => {
                                  const newGeneral = prev[activeTab].general.map((it) =>
                                    it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                                  );
                                  return { ...prev, [activeTab]: { general: newGeneral } };
                                });
                              }}
                            >
                              <PlotCard
                                label={label}
                                symbol={symbol}
                                companyName={companyName}
                                id={id}
                                uploadId={uploadId}
                                platform={platform}
                                type={type}
                                delay={idx * 0.1}
                                onDelete={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                              />
                            </ResizableBox>
                          );
                        }
                        if (!Component) {
                          return (
                            <ResizableBox
                              key={`general-${id}`}
                              width={width || 800}
                              height={height || 600}
                              minConstraints={[200, 200]}
                              maxConstraints={[800, 600]}
                              onResizeStop={(e, data) => {
                                const newWidth = data.size.width;
                                const newHeight = data.size.height;
                                setDroppedMap((prev) => {
                                  const newGeneral = prev[activeTab].general.map((it) =>
                                    it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                                  );
                                  return { ...prev, [activeTab]: { general: newGeneral } };
                                });
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
                              >
                                <button
                                  onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                                  aria-label="Delete component"
                                >
                                  <IoMdClose size={20} />
                                </button>
                                <p className="text-red-500 text-sm">Component "{label}" not found</p>
                              </motion.div>
                            </ResizableBox>
                          );
                        }
                        if (type === 'equity' && !symbol) {
                          return (
                            <ResizableBox
                              key={`general-${id}`}
                              width={width || 800}
                              height={height || 600}
                              minConstraints={[200, 200]}
                              maxConstraints={[800, 600]}
                              onResizeStop={(e, data) => {
                                const newWidth = data.size.width;
                                const newHeight = data.size.height;
                                setDroppedMap((prev) => {
                                  const newGeneral = prev[activeTab].general.map((it) =>
                                    it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                                  );
                                  return { ...prev, [activeTab]: { general: newGeneral } };
                                });
                              }}
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
                              >
                                <button
                                  onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                                  aria-label="Delete component"
                                >
                                  <IoMdClose size={20} />
                                </button>
                                <p className="text-yellow-500 text-sm">Waiting for company selection for {label}</p>
                              </motion.div>
                            </ResizableBox>
                          );
                        }
                        return (
                          <ResizableBox
                            key={`general-${id}`}
                            width={width || 800}
                            height={height || 600}
                            minConstraints={[200, 200]}
                            maxConstraints={[800, 600]}
                            onResizeStop={(e, data) => {
                              const newWidth = data.size.width;
                              const newHeight = data.size.height;
                              setDroppedMap((prev) => {
                                const newGeneral = prev[activeTab].general.map((it) =>
                                  it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                                );
                                return { ...prev, [activeTab]: { general: newGeneral } };
                              });
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
                            >
                              <button
                                onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                                aria-label="Delete component"
                              >
                                <IoMdClose size={20} />
                              </button>
                              <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white truncate">
                                {label} {companyName ? `(${companyName})` : platform ? `(${platform})` : ''}
                              </h3>
                              <div className="w-full h-full overflow-hidden">
                                {type === 'equity' ? (
                                  <Component symbol={symbol} key={`${id}-${symbol}`} />
                                ) : (
                                  <GraphDataProvider>
                                    <Component uploadId={uploadId} key={`${id}-${uploadId}`} />
                                  </GraphDataProvider>
                                )}
                              </div>
                            </motion.div>
                          </ResizableBox>
                        );
                      })}
                    </div>
                  );
                })()}
              </DroppableArea>*/}

              <DroppableArea id="general" className="w-screen h-screen overflow-auto">
  {(() => {
    const droppedItems = droppedMap?.[activeTab]?.general || [];
    const visibleItems = getVisibleItems(droppedItems);
    if (visibleItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 border-2 dark:text-gray-400">
          <svg className="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8v8m0 0h8m-8 0l8-8m4 8v-8m0 0H8m8 0l-8 8" />
          </svg>
          <p className="text-base font-medium">Drop or tap components here</p>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-6 p-4">
        {visibleItems.map(({ label, symbol, companyName, id, uploadId, platform, type, width, height }, idx) => {
          const ComponentMap = type === 'equity' ? equityHubMap : portfolioMap;
          const Component = ComponentMap[label];
          if (activeTab !== 'Dashboard') {
            return (
              <ResizableBox
                key={`general-${id}`}
                width={width || 800}
                height={height || 600}
                minConstraints={[200, 200]}
                maxConstraints={[window.innerWidth - 40, window.innerHeight - 40]} // Adjust constraints for full screen
                onResizeStop={(e, data) => {
                  const newWidth = data.size.width;
                  const newHeight = data.size.height;
                  setDroppedMap((prev) => {
                    const newGeneral = prev[activeTab].general.map((it) =>
                      it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                    );
                    return { ...prev, [activeTab]: { general: newGeneral } };
                  });
                }}
              >
                <PlotCard
                  label={label}
                  symbol={symbol}
                  companyName={companyName}
                  id={id}
                  uploadId={uploadId}
                  platform={platform}
                  type={type}
                  delay={idx * 0.1}
                  onDelete={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                />
              </ResizableBox>
            );
          }
          if (!Component) {
            return (
              <ResizableBox
                key={`general-${id}`}
                width={width || 800}
                height={height || 600}
                minConstraints={[200, 200]}
                maxConstraints={[window.innerWidth - 40, window.innerHeight - 40]} // Adjust constraints for full screen
                onResizeStop={(e, data) => {
                  const newWidth = data.size.width;
                  const newHeight = data.size.height;
                  setDroppedMap((prev) => {
                    const newGeneral = prev[activeTab].general.map((it) =>
                      it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                    );
                    return { ...prev, [activeTab]: { general: newGeneral } };
                  });
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
                >
                  <button
                    onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    aria-label="Delete component"
                  >
                    <IoMdClose size={20} />
                  </button>
                  <p className="text-red-500 text-sm">Component "{label}" not found</p>
                </motion.div>
              </ResizableBox>
            );
          }
          if (type === 'equity' && !symbol) {
            return (
              <ResizableBox
                key={`general-${id}`}
                width={width || 800}
                height={height || 600}
                minConstraints={[200, 200]}
                maxConstraints={[window.innerWidth - 40, window.innerHeight - 40]} // Adjust constraints for full screen
                onResizeStop={(e, data) => {
                  const newWidth = data.size.width;
                  const newHeight = data.size.height;
                  setDroppedMap((prev) => {
                    const newGeneral = prev[activeTab].general.map((it) =>
                      it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                    );
                    return { ...prev, [activeTab]: { general: newGeneral } };
                  });
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
                >
                  <button
                    onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                    aria-label="Delete component"
                  >
                    <IoMdClose size={20} />
                  </button>
                  <p className="text-yellow-500 text-sm">Waiting for company selection for {label}</p>
                </motion.div>
              </ResizableBox>
            );
          }
          return (
            <ResizableBox
              key={`general-${id}`}
              width={width || 800}
              height={height || 600}
              minConstraints={[200, 200]}
              maxConstraints={[window.innerWidth - 40, window.innerHeight - 40]} // Adjust constraints for full screen
              onResizeStop={(e, data) => {
                const newWidth = data.size.width;
                const newHeight = data.size.height;
                setDroppedMap((prev) => {
                  const newGeneral = prev[activeTab].general.map((it) =>
                    it.id === id ? { ...it, width: newWidth, height: newHeight } : it
                  );
                  return { ...prev, [activeTab]: { general: newGeneral } };
                });
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-full"
              >
                <button
                  onClick={() => handleDeleteComponent(droppedItems.findIndex((item) => item.id === id))}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                  aria-label="Delete component"
                >
                  <IoMdClose size={20} />
                </button>
                <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white truncate">
                  {label} {companyName ? `(${companyName})` : platform ? `(${platform})` : ''}
                </h3>
                <div className="w-full h-full overflow-hidden">
                  {type === 'equity' ? (
                    <Component symbol={symbol} key={`${id}-${symbol}`} />
                  ) : (
                    <GraphDataProvider>
                      <Component uploadId={uploadId} key={`${id}-${uploadId}`} />
                    </GraphDataProvider>
                  )}
                </div>
              </motion.div>
            </ResizableBox>
          );
        })}
      </div>
    );
  })()}
</DroppableArea>
            </section>
          </main>


        </div>
        <SidebarRight collapsed={collapsed} setCollapsed={setCollapsed} onItemClick={handleItemClick} />
        {showModal && (
          <AddNewModal onClose={() => setShowModal(false)} onCreateTab={handleNewDashboard} />
        )}
        <DragStartModal
          isOpen={showDragModal}
          onClose={() => {
            setShowDragModal(false);
            setCurrentDragItem(null);
            setError(null);
          }}
          onSearch={handleStockSearch}
          searchTerm={searchTerm}
          setSearchTerm={(value) => {
            setSearchTerm(value);
            setError(null);
            if (value.length >= 2) handleStockSearch();
            else setSearchedStocks([]);
          }}
          searchedStocks={searchedStocks}
          onSelectItem={(item) => {
            if (currentDragItem) {
              setDroppedMap((prev) => {
                const currentTab = prev[activeTab] || { general: [] };
                const generalItems = currentTab.general || [];
                const lastItemIndex = generalItems.findLastIndex(
                  (i) => i.label === currentDragItem.label && !i.symbol
                );
                if (lastItemIndex >= 0) {
                  const updatedItems = [...generalItems];
                  updatedItems[lastItemIndex] = {
                    ...updatedItems[lastItemIndex],
                    symbol: item.symbol,
                    companyName: item.companyName,
                    type: 'equity',
                    width: 400,
                    height: 300
                  };
                  return { ...prev, [activeTab]: { ...currentTab, general: updatedItems } };
                } else {
                  const newItem = {
                    label: currentDragItem.label,
                    symbol: item.symbol,
                    companyName: item.companyName,
                    graphType: currentDragItem.label,
                    id: `${currentDragItem.label}-${Date.now()}`,
                    type: 'equity',
                    width: 400,
                    height: 300
                  };
                  return { ...prev, [activeTab]: { ...currentTab, general: [...generalItems, newItem] } };
                }
              });
              setDragCountMap((prev) => ({
                ...prev,
                [activeTab]: {
                  ...prev[activeTab],
                  [currentDragItem.label]: (prev[activeTab]?.[currentDragItem.label] || 0) + 1,
                },
              }));
            }
            setSearchTerm('');
            setSearchedStocks([]);
            setShowDragModal(false);
            setCurrentDragItem(null);
            setError(null);
            setHasUnsavedChanges(true);
          }}
          onClear={() => {
            setSearchTerm('');
            setSearchedStocks([]);
            setError(null);
          }}
          selectedCompany={null}
          error={error}
        />
        <PortfolioSelectModal
          isOpen={showPortfolioModal}
          onClose={() => {
            setShowPortfolioModal(false);
            setCurrentDragItem(null);
            setError(null);
          }}
          portfolios={savedPortfolios}
          onSelectPortfolio={handlePortfolioSelect}
          error={error}
        />
        {showUnsavedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl">
              <button
                onClick={handleCancelNavigation}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Unsaved Changes</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have unsaved changes. Would you like to save before leaving?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleSaveAndNavigate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save and Continue
                </button>
                <button
                  onClick={handleConfirmNavigation}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Leave Without Saving
                </button>
                <button
                  onClick={handleCancelNavigation}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showSavedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">Dashboard Saved!</h2>
              <p className="text-gray-600 dark:text-gray-300">Your changes have been saved successfully.</p>
            </div>
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-2xl">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoMdClose size={24} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default DashBoard;