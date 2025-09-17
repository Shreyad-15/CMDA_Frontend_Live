// ----------------sorting by 1CAGR------------------

// import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, useInView } from 'framer-motion';
// import {
//   Factory, FlaskConical, DollarSign, Car, Code, HeartPulse,
//   Scissors, ShoppingBag, Building2, Hammer, PieChart
// } from 'lucide-react';
// import axios from 'axios';
// import SectorDetails from './SectorDetails';

// const SectorStrip = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-50px' });
//   const [sectors, setSectors] = useState([]);
//   const [selectedSector, setSelectedSector] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [highlightedSector, setHighlightedSector] = useState(null);
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [isDark, setIsDark] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showDetails, setShowDetails] = useState(false);
//   const [maxPELessThan10Sector, setMaxPELessThan10Sector] = useState(null);
//   const [minPELessThan10Sector, setMinPELessThan10Sector] = useState(null);

//   const colorPalette = [
//     'rgba(31, 119, 180, 0.8)', 'rgba(255, 127, 14, 0.8)', 'rgba(13, 84, 105, 0.8)',
//     'rgba(214, 39, 40, 0.8)', 'rgba(148, 103, 189, 0.8)', 'rgba(23, 190, 207, 0.8)',
//     'rgba(227, 119, 194, 0.8)', 'rgba(188, 189, 34, 0.8)', 'rgba(127, 127, 127, 0.8)',
//     'rgba(70, 130, 180, 0.8)'
//   ];

//   const sectorIcons = {
//     'Capital Goods': Factory,
//     'Chemicals': FlaskConical,
//     'Finance': DollarSign,
//     'Automobile & Ancillaries': Car,
//     'IT': Code,
//     'Healthcare': HeartPulse,
//     'Textile': Scissors,
//     'FMCG': ShoppingBag,
//     'Infrastructure': Building2,
//     'Iron & Steel': Hammer,
//     'Abrasives': Hammer,
//     'Agri': Scissors
//   };

//   const formatDecimal = (num) => {
//     if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
//     return Math.round(num * 100) / 100;
//   };

//   const formatNumber = useCallback((num) => {
//     if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
//     const absNum = Math.abs(num);
//     const sign = num < 0 ? '-' : '';
//     if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}cr`;
//     if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}L`;
//     return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
//   }, []);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDark(mediaQuery.matches);
//     const handleChange = (e) => setIsDark(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();
//     const cacheDuration = 60 * 60 * 1000; // 1hr
//     const fetchSectors = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         setSectors([]);

//         const cachedData = localStorage.getItem('sectorData');
//         const cacheTimestamp = localStorage.getItem('sectorDataTimestamp');
//         let validSectors = [];

//         if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
//           const parsedData = JSON.parse(cachedData);
//           validSectors = parsedData.data
//             .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
//             .map((sector, index) => {
//               const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
//                 const pe = sector.Companies.PE?.[i];
//                 return pe != null && !isNaN(pe) && pe < 10;
//               }).length;
//               return {
//                 ...sector,
//                 color: colorPalette[index % colorPalette.length],
//                 highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
//                 PELessThan10Count: peLessThan10Count,
//                 TotalCompanies: sector.Companies.Symbol.length
//               };
//             });
//         } else {
//           const response = await axios.get(`${API_BASE}/landpage/sector-summary`, { signal: controller.signal });
//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
//             throw new Error(response.data.message || 'API response is not valid');
//           }
//           validSectors = response.data.data
//             .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
//             .map((sector, index) => {
//               const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
//                 const pe = sector.Companies.PE?.[i];
//                 return pe != null && !isNaN(pe) && pe < 10;
//               }).length;
//               return {
//                 ...sector,
//                 color: colorPalette[index % colorPalette.length],
//                 highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
//                 PELessThan10Count: peLessThan10Count,
//                 TotalCompanies: sector.Companies.Symbol.length
//               };
//             });
//           localStorage.setItem('sectorData', JSON.stringify(response.data));
//           localStorage.setItem('sectorDataTimestamp', Date.now().toString());
//         }

//         if (validSectors.length === 0) {
//           setSectors([]);
//           setSelectedSector(null);
//           setMaxPELessThan10Sector(null);
//           setMinPELessThan10Sector(null);
//           setLoading(false);
//           return;
//         }

//         const sortedSectors = [...validSectors].sort((a, b) => {
//           return sortOrder === 'desc' ? b.SectorCAGR_1Y_MCap - a.SectorCAGR_1Y_MCap : a.SectorCAGR_1Y_MCap - b.SectorCAGR_1Y_MCap;
//         });

//         setSectors(sortedSectors);

//         const maxPELessThan10Sector = validSectors.reduce((max, sector) => {
//           if (!max) return sector;
//           if (sector.PELessThan10Count === max.PELessThan10Count) {
//             return sector.TotalCompanies < max.TotalCompanies ? sector : max;
//           }
//           return sector.PELessThan10Count > max.PELessThan10Count ? sector : max;
//         }, validSectors[0]);

//         const minPELessThan10Sector = validSectors.reduce((min, sector) => {
//           if (!min) return sector;
//           if (sector.PELessThan10Count === min.PELessThan10Count) {
//             return sector.TotalCompanies < min.TotalCompanies ? sector : min;
//           }
//           return sector.PELessThan10Count < min.PELessThan10Count ? sector : min;
//         }, validSectors[0]);

//         setMaxPELessThan10Sector(maxPELessThan10Sector);
//         setMinPELessThan10Sector(minPELessThan10Sector);

//         if (sortedSectors.length > 0) {
//           setSelectedSector(sortedSectors[0]);
//         } else {
//           setSelectedSector(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         if (error.name === 'AbortError') return;
//         setError(error.message || 'Failed to fetch sector data');
//         console.error('Error fetching sector data:', error, error.response?.data);
//         setSectors([]);
//         setSelectedSector(null);
//         setMaxPELessThan10Sector(null);
//         setMinPELessThan10Sector(null);
//         setLoading(false);
//       }
//     };

//     const debounceFetch = setTimeout(() => fetchSectors(), 100);
//     return () => {
//       controller.abort();
//       clearTimeout(debounceFetch);
//     };
//   }, [API_BASE, sortOrder]);

//   const sortedSectors = useMemo(() => {
//     return [...sectors]
//       .filter((sector) => {
//         const query = searchQuery.toLowerCase();
//         const sectorMatch = sector.Sector.toLowerCase().includes(query);
//         const companyMatch = sector.Companies.Symbol.some((company) =>
//           company.toLowerCase().includes(query)
//         );
//         return sectorMatch || companyMatch;
//       })
//       .sort((a, b) => {
//         return sortOrder === 'desc' ? b.SectorCAGR_1Y_MCap - a.SectorCAGR_1Y_MCap : a.SectorCAGR_1Y_MCap - b.SectorCAGR_1Y_MCap;
//       })
//       ;
//   }, [sectors, sortOrder, searchQuery]);

//   const toggleSortOrder = () => {
//     setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
//   };

//   const handleViewDetails = (sector, index) => {
//     setSelectedSector(sector);
//     setHighlightedSector(index);
//     setShowDetails(true);
//   };

//   return (
//     <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-[60vh]">
//       <div ref={ref} className="max-w-7xl w-full mx-auto">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Sector Performance</h2>
//         <p className="text-xs mb-5 text-gray-600 dark:text-gray-400 mx-auto">
//           Analyze market trends and performance metrics across all sectors, sorted by 1-year CAGR (highest to lowest)
//         </p>

//         {/* PE Ratio Note */}
//         <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//           <p className="text-xs text-blue-800 dark:text-blue-200">
//             <span className="font-semibold">Note:</span> This section highlights companies with a PE ratio less than 10. 
//             {/* A low PE ratio may indicate undervalued stocks or companies facing challenges. */}
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row mt-5 gap-4 mb-4">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1">
//             {maxPELessThan10Sector ? (
//               <motion.div
//                 className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 flex-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Highest Count (PE &lt; 10)</p>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {maxPELessThan10Sector.Sector}
//                     </p>
//                   </div>
//                   <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-xs font-medium">
//                     {maxPELessThan10Sector.PELessThan10Count}/{maxPELessThan10Sector.TotalCompanies}{' '}
//                     {maxPELessThan10Sector.PELessThan10Count === 1 ? 'Company' : 'Companies'}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <p className="text-xs text-gray-500 dark:text-gray-400 text-center">No data available</p>
//             )}
//             {minPELessThan10Sector ? (
//               <motion.div
//                 className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 flex-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.1 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Lowest Count (PE &lt; 10)</p>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {minPELessThan10Sector.Sector}
//                     </p>
//                   </div>
//                   <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-800 dark:text-purple-200 text-xs font-medium">
//                     {minPELessThan10Sector.PELessThan10Count}/{minPELessThan10Sector.TotalCompanies}{' '}
//                     {minPELessThan10Sector.PELessThan10Count === 1 ? 'Company' : 'Companies'}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <p className="text-xs text-gray-500 dark:text-gray-400 text-center">No data available</p>
//             )}
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search sectors or companies..."
//               className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-64"
//             />
//             <button
//               onClick={toggleSortOrder}
//               disabled={loading}
//               className={`px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-xs font-medium transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-200 dark:hover:bg-blue-800'}`}
//             >
//               Sort by 1Y CAGR: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
//             </button>
//           </div>
//         </div>
//         <div className="flex gap-4 p-4 overflow-x-auto pb-6">
//           {loading ? (
//             [...Array(5)].map((_, i) => (
//               <div key={i} className="min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
//                 <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
//                 <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
//                 <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//               </div>
//             ))
//           ) : error || sortedSectors.length === 0 ? (
//             <div className="text-center px-4 py-5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm w-full">
//               {error ? `Error: ${error}` : searchQuery ? 'No sectors or companies match your search' : 'No sectors available'}
//             </div>
//           ) : (
//             sortedSectors.map((sector, index) => (
//               <motion.div
//                 key={sector.Sector}
//                 className={`min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border ${highlightedSector === index ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'} overflow-hidden p-4 cursor-pointer`}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 whileHover={{ scale: 1.03 }}
//                 onClick={() => {
//                   setSelectedSector(sector);
//                   setHighlightedSector(index);
//                 }}
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <div
//                     className="w-8 h-8 rounded-md flex items-center justify-center"
//                     style={{
//                       backgroundColor: sector.color,
//                       color: 'white',
//                     }}
//                   >
//                     {sectorIcons[sector.Sector] ? (
//                       React.createElement(sectorIcons[sector.Sector], {
//                         className: "w-4 h-4",
//                         strokeWidth: 1.5,
//                       })
//                     ) : (
//                       <PieChart className="w-4 h-4" strokeWidth={1.5} />
//                     )}
//                   </div>
//                   <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                     {sector.Sector}
//                   </h4>
//                 </div>
//                 <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">1Y Growth:</span>
//                     <span className={`font-medium ${sector.SectorCAGR_1Y_MCap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                       {sector.SectorCAGR_1Y_MCap ? `${formatDecimal(sector.SectorCAGR_1Y_MCap * 100)}%` : 'N/A'}
//                     </span>
//                   </div>
//                 <div className="space-y-2 text-xs">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(sector.SectorMarketCap)}</span>
//                   </div>

//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">PE Ratio:</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{formatDecimal(sector.SectorPE_Mode || 'N/A')}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">Companies (PE &lt; 10):</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{sector.PELessThan10Count}/{sector.TotalCompanies}</span>
//                   </div>
//                   <div className="pt-2">
//                     <button
//                       onClick={() => handleViewDetails(sector)}
//                       className="w-full px-3 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//         {showDetails && selectedSector && (
//           <SectorDetails
//             sector={selectedSector}
//             isOpen={showDetails}
//             onClose={() => setShowDetails(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default SectorStrip;


// ---------------------sorting by both  mcap and cagr--------------

// import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, useInView } from 'framer-motion';
// import {
//   Factory, FlaskConical, DollarSign, Car, Code, HeartPulse,
//   Scissors, ShoppingBag, Building2, Hammer, PieChart,
//   Info,
//   ArrowDown,
//   ArrowUp,
//   TrendingUp
// } from 'lucide-react';
// import axios from 'axios';
// import SectorDetails from './SectorDetails';

// const SectorStrip = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-50px' });
//   const [sectors, setSectors] = useState([]);
//   const [selectedSector, setSelectedSector] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [highlightedSector, setHighlightedSector] = useState(null);
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [sortBy, setSortBy] = useState('cagr'); // 'cagr' or 'marketCap'
//   const [isDark, setIsDark] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showDetails, setShowDetails] = useState(false);
//   const [maxPELessThan10Sector, setMaxPELessThan10Sector] = useState(null);
//   const [minPELessThan10Sector, setMinPELessThan10Sector] = useState(null);

//   const colorPalette = [
//     'rgba(31, 119, 180, 0.8)', 'rgba(255, 127, 14, 0.8)', 'rgba(13, 84, 105, 0.8)',
//     'rgba(214, 39, 40, 0.8)', 'rgba(148, 103, 189, 0.8)', 'rgba(23, 190, 207, 0.8)',
//     'rgba(227, 119, 194, 0.8)', 'rgba(188, 189, 34, 0.8)', 'rgba(127, 127, 127, 0.8)',
//     'rgba(70, 130, 180, 0.8)'
//   ];

//   const sectorIcons = {
//     'Capital Goods': Factory,
//     'Chemicals': FlaskConical,
//     'Finance': DollarSign,
//     'Automobile & Ancillaries': Car,
//     'IT': Code,
//     'Healthcare': HeartPulse,
//     'Textile': Scissors,
//     'FMCG': ShoppingBag,
//     'Infrastructure': Building2,
//     'Iron & Steel': Hammer,
//     'Abrasives': Hammer,
//     'Agri': Scissors
//   };

//   const formatDecimal = (num) => {
//     if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
//     return Math.round(num * 100) / 100;
//   };

//   const formatNumber = useCallback((num) => {
//     if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
//     const absNum = Math.abs(num);
//     const sign = num < 0 ? '-' : '';
//     if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}cr`;
//     if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}L`;
//     return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
//   }, []);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDark(mediaQuery.matches);
//     const handleChange = (e) => setIsDark(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();
//     const cacheDuration = 60 * 60 * 1000; // 1hr
//     const fetchSectors = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         setSectors([]);

//         const cachedData = localStorage.getItem('sectorData');
//         const cacheTimestamp = localStorage.getItem('sectorDataTimestamp');
//         let validSectors = [];

//         if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
//           const parsedData = JSON.parse(cachedData);
//           validSectors = parsedData.data
//             .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
//             .map((sector, index) => {
//               const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
//                 const pe = sector.Companies.PE?.[i];
//                 return pe != null && !isNaN(pe) && pe < 10;
//               }).length;
//               return {
//                 ...sector,
//                 color: colorPalette[index % colorPalette.length],
//                 highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
//                 PELessThan10Count: peLessThan10Count,
//                 TotalCompanies: sector.Companies.Symbol.length
//               };
//             });
//         } else {
//           // const response = await axios.get('http://127.0.0.1:8000/equity_sectoral_analysis', { signal: controller.signal });
//           const response = await axios.get(`${API_BASE}/landpage/sector-summary`, { signal: controller.signal });
//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
//             throw new Error(response.data.message || 'API response is not valid');
//           }
//           validSectors = response.data.data
//             .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
//             .map((sector, index) => {
//               const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
//                 const pe = sector.Companies.PE?.[i];
//                 return pe != null && !isNaN(pe) && pe < 10;
//               }).length;
//               return {
//                 ...sector,
//                 color: colorPalette[index % colorPalette.length],
//                 highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
//                 PELessThan10Count: peLessThan10Count,
//                 TotalCompanies: sector.Companies.Symbol.length
//               };
//             });
//           localStorage.setItem('sectorData', JSON.stringify(response.data));
//           localStorage.setItem('sectorDataTimestamp', Date.now().toString());
//         }

//         if (validSectors.length === 0) {
//           setSectors([]);
//           setSelectedSector(null);
//           setMaxPELessThan10Sector(null);
//           setMinPELessThan10Sector(null);
//           setLoading(false);
//           return;
//         }

//         const sortedSectors = [...validSectors].sort((a, b) => {
//           const valueA = sortBy === 'cagr' ? a.SectorCAGR_1Y_MCap : a.SectorMarketCap;
//           const valueB = sortBy === 'cagr' ? b.SectorCAGR_1Y_MCap : b.SectorMarketCap;
//           return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
//         });

//         setSectors(sortedSectors);

//         const maxPELessThan10Sector = validSectors.reduce((max, sector) => {
//           if (!max) return sector;
//           if (sector.PELessThan10Count === max.PELessThan10Count) {
//             return sector.TotalCompanies < max.TotalCompanies ? sector : max;
//           }
//           return sector.PELessThan10Count > max.PELessThan10Count ? sector : max;
//         }, validSectors[0]);

//         const minPELessThan10Sector = validSectors.reduce((min, sector) => {
//           if (!min) return sector;
//           if (sector.PELessThan10Count === min.PELessThan10Count) {
//             return sector.TotalCompanies < min.TotalCompanies ? sector : min;
//           }
//           return sector.PELessThan10Count < min.PELessThan10Count ? sector : min;
//         }, validSectors[0]);

//         setMaxPELessThan10Sector(maxPELessThan10Sector);
//         setMinPELessThan10Sector(minPELessThan10Sector);

//         if (sortedSectors.length > 0) {
//           setSelectedSector(sortedSectors[0]);
//         } else {
//           setSelectedSector(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         if (error.name === 'AbortError') return;
//         setError(error.message || 'Failed to fetch sector data');
//         console.error('Error fetching sector data:', error, error.response?.data);
//         setSectors([]);
//         setSelectedSector(null);
//         setMaxPELessThan10Sector(null);
//         setMinPELessThan10Sector(null);
//         setLoading(false);
//       }
//     };

//     const debounceFetch = setTimeout(() => fetchSectors(), 100);
//     return () => {
//       controller.abort();
//       clearTimeout(debounceFetch);
//     };
//   }, [API_BASE, sortOrder, sortBy]);

//   const sortedSectors = useMemo(() => {
//     return [...sectors]
//       .filter((sector) => {
//         const query = searchQuery.toLowerCase();
//         const sectorMatch = sector.Sector.toLowerCase().includes(query);
//         const companyMatch = sector.Companies.Symbol.some((company) =>
//           company.toLowerCase().includes(query)
//         );
//         return sectorMatch || companyMatch;
//       })
//       .sort((a, b) => {
//         const valueA = sortBy === 'cagr' ? a.SectorCAGR_1Y_MCap : a.SectorMarketCap;
//         const valueB = sortBy === 'cagr' ? b.SectorCAGR_1Y_MCap : b.SectorMarketCap;
//         return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
//       })
//       ;
//   }, [sectors, sortOrder, sortBy, searchQuery]);

//   const toggleSortOrder = () => {
//     setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
//   };

//   const handleViewDetails = (sector, index) => {
//     setSelectedSector(sector);
//     setHighlightedSector(index);
//     setShowDetails(true);
//   };

//   return (
//     <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-[60vh]">
//       <div ref={ref} className="max-w-7xl w-full mx-auto">
//         {/* <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Sector Performance</h2>
//         <p className="text-xs mb-5 text-gray-600 dark:text-gray-400 mx-auto">
//           Analyze market trends and performance metrics across all sectors, sorted by 1-year CAGR (highest to lowest)
//         </p>

//         {/* PE Ratio Note 
//         <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//           <p className="text-xs text-blue-800 dark:text-blue-200">
//             <span className="font-semibold">Note:</span> This section highlights companies with a PE ratio less than 10. 
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row mt-5 gap-4 mb-4">
//           <div className="flex flex-col sm:flex-row gap-3 flex-1">
//             {maxPELessThan10Sector ? (
//               <motion.div
//                 className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 flex-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Highest Count (PE &lt; 10)</p>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {maxPELessThan10Sector.Sector}
//                     </p>
//                   </div>
//                   <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-800 dark:text-blue-200 text-xs font-medium">
//                     {maxPELessThan10Sector.PELessThan10Count}/{maxPELessThan10Sector.TotalCompanies}{' '}
//                     {maxPELessThan10Sector.PELessThan10Count === 1 ? 'Company' : 'Companies'}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <p className="text-xs text-gray-500 dark:text-gray-400 text-center">No data available</p>
//             )}
//             {minPELessThan10Sector ? (
//               <motion.div
//                 className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 flex-1"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.1 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Lowest Count (PE &lt; 10)</p>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {minPELessThan10Sector.Sector}
//                     </p>
//                   </div>
//                   <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-800 dark:text-purple-200 text-xs font-medium">
//                     {minPELessThan10Sector.PELessThan10Count}/{minPELessThan10Sector.TotalCompanies}{' '}
//                     {minPELessThan10Sector.PELessThan10Count === 1 ? 'Company' : 'Companies'}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <p className="text-xs text-gray-500 dark:text-gray-400 text-center">No data available</p>
//             )}
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search sectors or companies..."
//               className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-64"
//             />
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full sm:w-32"
//             >
//               <option value="cagr">1Y CAGR</option>
//               <option value="marketCap">Market Cap</option>
//             </select>
//             <button
//               onClick={toggleSortOrder}
//               disabled={loading}
//               className={`px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-xs font-medium transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-200 dark:hover:bg-blue-800'}`}
//             >
//               Sort by {sortBy === 'cagr' ? '1Y CAGR' : 'Market Cap'}: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
//             </button>
//           </div>
//         </div> */}

//         <div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//             Sector Performance
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
//             Analyze market trends and performance metrics across all sectors, sorted by 1-year CAGR (highest to lowest)
//           </p>
//         </div>

//         {/* <div className="flex items-center gap-2">
//         <div className="relative group">
//          <Info size={16} className="text-blue-500 cursor-help flex flex-end" />
//           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-10">
//             <span className="font-semibold">Note:</span> This section highlights companies with a PE ratio less than 10.
//           </div>
//         </div>
//       </div> */}


//         {/* PE Ratio Stats Cards */}
//         <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           {maxPELessThan10Sector && (
//             <motion.div
//               className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full"></div>
//               <div className="relative z-10">
//                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Highest Count (PE &lt; 10)</p>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                   {maxPELessThan10Sector.Sector}
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
//                       <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                         {maxPELessThan10Sector.PELessThan10Count}
//                       </span>
//                       <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//                         / {maxPELessThan10Sector.TotalCompanies} companies
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
//                       {Math.round((maxPELessThan10Sector.PELessThan10Count / maxPELessThan10Sector.TotalCompanies) * 100)}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {minPELessThan10Sector && (
//             <motion.div
//               className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//             >
//               <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-bl-full"></div>
//               <div className="relative z-10">
//                 <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Lowest Count (PE &lt; 10)</p>
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                   {minPELessThan10Sector.Sector}
//                 </h3>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2">
//                       <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <div>
//                       <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//                         {minPELessThan10Sector.PELessThan10Count}
//                       </span>
//                       <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//                         / {minPELessThan10Sector.TotalCompanies} companies
//                       </span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
//                       {Math.round((minPELessThan10Sector.PELessThan10Count / minPELessThan10Sector.TotalCompanies) * 100)}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//         <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//           <p className="text-xs text-blue-800 dark:text-blue-200">
//             <span className="font-semibold">Note:</span> The above section highlights companies with a PE ratio less than 10.
//             {/* A low PE ratio may indicate undervalued stocks or companies facing challenges. */}
//           </p>
//         </div>

//         {/* Controls Section */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search sectors or companies..."
//                 className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//               />
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-2">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//             >
//               <option value="cagr">Sort by: 1Y CAGR</option>
//               <option value="marketCap">Sort by: Market Cap</option>
//             </select>

//             <button
//               onClick={toggleSortOrder}
//               disabled={loading}
//               className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${loading
//                   ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400'
//                   : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 }`}
//             >
//               {sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
//               {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
//             </button>
//           </div>
//         </div>
//         <div className="flex gap-4 p-4 overflow-x-auto pb-6">
//           {loading ? (
//             [...Array(5)].map((_, i) => (
//               <div key={i} className="min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
//                 <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
//                 <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
//                 <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//               </div>
//             ))
//           ) : error || sortedSectors.length === 0 ? (
//             <div className="text-center px-4 py-5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm w-full">
//               {error ? `Error: ${error}` : searchQuery ? 'No sectors or companies match your search' : 'No sectors available'}
//             </div>
//           ) : (
//             sortedSectors.map((sector, index) => (
//               <motion.div
//                 key={sector.Sector}
//                 className={`min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border ${highlightedSector === index ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'} overflow-hidden p-4 cursor-pointer`}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
//                 transition={{ duration: 0.3, delay: index * 0.05 }}
//                 whileHover={{ scale: 1.03 }}
//                 onClick={() => {
//                   setSelectedSector(sector);
//                   setHighlightedSector(index);
//                 }}
//               >
//                 <div className="flex items-center gap-3 mb-3">
//                   <div
//                     className="w-8 h-8 rounded-md flex items-center justify-center"
//                     style={{
//                       backgroundColor: sector.color,
//                       color: 'white',
//                     }}
//                   >
//                     {sectorIcons[sector.Sector] ? (
//                       React.createElement(sectorIcons[sector.Sector], {
//                         className: "w-4 h-4",
//                         strokeWidth: 1.5,
//                       })
//                     ) : (
//                       <PieChart className="w-4 h-4" strokeWidth={1.5} />
//                     )}
//                   </div>
//                   <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
//                     {sector.Sector}
//                   </h4>
//                 </div>
//                 <div className="space-y-2 text-xs">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(sector.SectorMarketCap)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">1Y Growth:</span>
//                     <span className={`font-medium ${sector.SectorCAGR_1Y_MCap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                       {sector.SectorCAGR_1Y_MCap ? `${formatDecimal(sector.SectorCAGR_1Y_MCap * 100)}%` : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">PE Ratio:</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{formatDecimal(sector.SectorPE_Mode || 'N/A')}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600 dark:text-gray-400">Companies (PE &lt; 10):</span>
//                     <span className="font-medium text-gray-900 dark:text-gray-100">{sector.PELessThan10Count}/{sector.TotalCompanies}</span>
//                   </div>
//                   <div className="pt-2">
//                     <button
//                       onClick={() => handleViewDetails(sector)}
//                       className="w-full px-3 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           )}
//         </div>
//         {showDetails && selectedSector && (
//           <SectorDetails
//             sector={selectedSector}
//             isOpen={showDetails}
//             onClose={() => setShowDetails(false)}
//           />
//         )}
//       </div>
//     </div>
//     //     <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[60vh]">
//     //   <div ref={ref} className="max-w-7xl w-full mx-auto">
//     //     {/* Header Section */}
//     //     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//     //       <div>
//     //         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//     //           Sector Performance
//     //         </h2>
//     //         <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
//     //           Analyze market trends and performance metrics across all sectors, sorted by 1-year CAGR (highest to lowest)
//     //         </p>
//     //       </div>

//     //       <div className="flex items-center gap-2">
//     //         <div className="relative group">
//     //           <Info size={16} className="text-blue-500 cursor-help" />
//     //           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-10">
//     //             <span className="font-semibold">Note:</span> This section highlights companies with a PE ratio less than 10, which may indicate potential value opportunities.
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>

//     //     {/* PE Ratio Stats Cards */}
//     //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//     //       {maxPELessThan10Sector && (
//     //         <motion.div
//     //           className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
//     //           initial={{ opacity: 0, y: 10 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.4 }}
//     //         >
//     //           <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full"></div>
//     //           <div className="relative z-10">
//     //             <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Highest Count (PE &lt; 10)</p>
//     //             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//     //               {maxPELessThan10Sector.Sector}
//     //             </h3>
//     //             <div className="flex items-center justify-between">
//     //               <div className="flex items-center">
//     //                 <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
//     //                   <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
//     //                 </div>
//     //                 <div>
//     //                   <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//     //                     {maxPELessThan10Sector.PELessThan10Count}
//     //                   </span>
//     //                   <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//     //                     / {maxPELessThan10Sector.TotalCompanies} companies
//     //                   </span>
//     //                 </div>
//     //               </div>
//     //               <div className="text-right">
//     //                 <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
//     //                   {Math.round((maxPELessThan10Sector.PELessThan10Count / maxPELessThan10Sector.TotalCompanies) * 100)}%
//     //                 </span>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </motion.div>
//     //       )}

//     //       {minPELessThan10Sector && (
//     //         <motion.div
//     //           className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
//     //           initial={{ opacity: 0, y: 10 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           transition={{ duration: 0.4, delay: 0.1 }}
//     //         >
//     //           <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-bl-full"></div>
//     //           <div className="relative z-10">
//     //             <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Lowest Count (PE &lt; 10)</p>
//     //             <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
//     //               {minPELessThan10Sector.Sector}
//     //             </h3>
//     //             <div className="flex items-center justify-between">
//     //               <div className="flex items-center">
//     //                 <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2">
//     //                   <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
//     //                 </div>
//     //                 <div>
//     //                   <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//     //                     {minPELessThan10Sector.PELessThan10Count}
//     //                   </span>
//     //                   <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//     //                     / {minPELessThan10Sector.TotalCompanies} companies
//     //                   </span>
//     //                 </div>
//     //               </div>
//     //               <div className="text-right">
//     //                 <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
//     //                   {Math.round((minPELessThan10Sector.PELessThan10Count / minPELessThan10Sector.TotalCompanies) * 100)}%
//     //                 </span>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </motion.div>
//     //       )}
//     //     </div>

//     //     {/* Controls Section */}
//     //     <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
//     //       <div className="flex-1">
//     //         <div className="relative">
//     //           <input
//     //             type="text"
//     //             value={searchQuery}
//     //             onChange={(e) => setSearchQuery(e.target.value)}
//     //             placeholder="Search sectors or companies..."
//     //             className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//     //           />
//     //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//     //             <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     //             </svg>
//     //           </div>
//     //         </div>
//     //       </div>

//     //       <div className="flex flex-col sm:flex-row gap-2">
//     //         <select
//     //           value={sortBy}
//     //           onChange={(e) => setSortBy(e.target.value)}
//     //           className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//     //         >
//     //           <option value="cagr">Sort by: 1Y CAGR</option>
//     //           <option value="marketCap">Sort by: Market Cap</option>
//     //         </select>

//     //         <button
//     //           onClick={toggleSortOrder}
//     //           disabled={loading}
//     //           className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//     //             loading 
//     //               ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400' 
//     //               : 'bg-blue-600 hover:bg-blue-700 text-white'
//     //           }`}
//     //         >
//     //           {sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
//     //           {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
//     //         </button>
//     //       </div>
//     //     </div>

//     //     {/* Sector Cards Grid */}
//     //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-6">
//     //       {loading ? (
//     //         [...Array(8)].map((_, i) => (
//     //           <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 animate-pulse">
//     //             <div className="flex items-center gap-3 mb-4">
//     //               <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
//     //               <div className="flex-1">
//     //                 <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
//     //                 <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//     //               </div>
//     //             </div>
//     //             <div className="space-y-3">
//     //               {[...Array(4)].map((_, j) => (
//     //                 <div key={j} className="flex justify-between">
//     //                   <div className="w-1/3 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//     //                   <div className="w-1/4 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//     //                 </div>
//     //               ))}
//     //             </div>
//     //             <div className="mt-4 w-full h-9 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
//     //           </div>
//     //         ))
//     //       ) : error || sortedSectors.length === 0 ? (
//     //         <div className="col-span-full text-center px-4 py-10 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
//     //           <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
//     //             <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//     //             </svg>
//     //           </div>
//     //           <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
//     //             {error ? 'Error Loading Data' : 'No Sectors Found'}
//     //           </h3>
//     //           <p className="text-sm text-gray-500 dark:text-gray-400">
//     //             {error ? error : searchQuery ? 'No sectors or companies match your search' : 'No sectors available at the moment'}
//     //           </p>
//     //           {error && (
//     //             <button
//     //               onClick={() => window.location.reload()}
//     //               className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
//     //             >
//     //               Try Again
//     //             </button>
//     //           )}
//     //         </div>
//     //       ) : (
//     //         sortedSectors.map((sector, index) => (
//     //           <motion.div
//     //             key={sector.Sector}
//     //             className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border ${highlightedSector === index ? 'border-blue-500 dark:border-blue-400 shadow-md' : 'border-gray-200 dark:border-gray-700'} overflow-hidden p-5 cursor-pointer transition-all duration-200 hover:shadow-md`}
//     //             initial={{ opacity: 0, y: 20 }}
//     //             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
//     //             transition={{ duration: 0.3, delay: index * 0.05 }}
//     //             whileHover={{ y: -5 }}
//     //             onClick={() => {
//     //               setSelectedSector(sector);
//     //               setHighlightedSector(index);
//     //             }}
//     //           >
//     //             <div className="flex items-center gap-3 mb-4">
//     //               <div
//     //                 className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
//     //                 style={{
//     //                   backgroundColor: sector.color || '#3b82f6',
//     //                   color: 'white',
//     //                 }}
//     //               >
//     //                 {sectorIcons[sector.Sector] ? (
//     //                   React.createElement(sectorIcons[sector.Sector], {
//     //                     className: "w-5 h-5",
//     //                     strokeWidth: 1.5,
//     //                   })
//     //                 ) : (
//     //                   <PieChart className="w-5 h-5" strokeWidth={1.5} />
//     //                 )}
//     //               </div>
//     //               <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
//     //                 {sector.Sector}
//     //               </h4>
//     //             </div>

//     //             <div className="space-y-3 text-sm mb-4">
//     //               <div className="flex justify-between items-center">
//     //                 <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
//     //                 <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(sector.SectorMarketCap)}</span>
//     //               </div>

//     //               <div className="flex justify-between items-center">
//     //                 <span className="text-gray-600 dark:text-gray-400">1Y Growth:</span>
//     //                 <span className={`font-medium ${sector.SectorCAGR_1Y_MCap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//     //                   {sector.SectorCAGR_1Y_MCap ? `${formatDecimal(sector.SectorCAGR_1Y_MCap * 100)}%` : 'N/A'}
//     //                   {sector.SectorCAGR_1Y_MCap && (
//     //                     <span className="ml-1">
//     //                       {sector.SectorCAGR_1Y_MCap >= 0 ? '↗' : '↘'}
//     //                     </span>
//     //                   )}
//     //                 </span>
//     //               </div>

//     //               <div className="flex justify-between items-center">
//     //                 <span className="text-gray-600 dark:text-gray-400">PE Ratio:</span>
//     //                 <span className="font-medium text-gray-900 dark:text-gray-100">{formatDecimal(sector.SectorPE_Mode || 'N/A')}</span>
//     //               </div>

//     //               <div className="flex justify-between items-center">
//     //                 <span className="text-gray-600 dark:text-gray-400">PE &lt; 10:</span>
//     //                 <span className="font-medium text-gray-900 dark:text-gray-100">
//     //                   {sector.PELessThan10Count}/{sector.TotalCompanies}
//     //                   <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
//     //                     ({Math.round((sector.PELessThan10Count / sector.TotalCompanies) * 100)}%)
//     //                   </span>
//     //                 </span>
//     //               </div>
//     //             </div>

//     //             <button
//     //               onClick={(e) => {
//     //                 e.stopPropagation();
//     //                 handleViewDetails(sector);
//     //               }}
//     //               className="w-full py-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
//     //             >
//     //               View Details
//     //               <ArrowUpRight size={14} />
//     //             </button>
//     //           </motion.div>
//     //         ))
//     //       )}
//     //     </div>

//     //     {showDetails && selectedSector && (
//     //       <SectorDetails
//     //         sector={selectedSector}
//     //         isOpen={showDetails}
//     //         onClose={() => setShowDetails(false)}
//     //       />
//     //     )}
//     //   </div>
//     // </div>
//   );
// };

// export default SectorStrip;













import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Factory, FlaskConical, DollarSign, Car, Code, HeartPulse,
  Scissors, ShoppingBag, Building2, Hammer, PieChart,
  Info, ArrowDown, ArrowUp, TrendingUp
} from 'lucide-react';
import axios from 'axios';
import SectorDetails from './SectorDetails';

const SectorStrip = () => {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const ref = useRef(null);
  const sectorDetailsRef = useRef(null); // New ref for SectorDetails
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedSector, setHighlightedSector] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('cagr');
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [maxPELessThan10Sector, setMaxPELessThan10Sector] = useState(null);
  const [minPELessThan10Sector, setMinPELessThan10Sector] = useState(null);

  const colorPalette = [
    'rgba(31, 119, 180, 0.8)', 'rgba(255, 127, 14, 0.8)', 'rgba(13, 84, 105, 0.8)',
    'rgba(214, 39, 40, 0.8)', 'rgba(148, 103, 189, 0.8)', 'rgba(23, 190, 207, 0.8)',
    'rgba(227, 119, 194, 0.8)', 'rgba(188, 189, 34, 0.8)', 'rgba(127, 127, 127, 0.8)',
    'rgba(70, 130, 180, 0.8)'
  ];

  const sectorIcons = {
    'Capital Goods': Factory,
    'Chemicals': FlaskConical,
    'Finance': DollarSign,
    'Automobile & Ancillaries': Car,
    'IT': Code,
    'Healthcare': HeartPulse,
    'Textile': Scissors,
    'FMCG': ShoppingBag,
    'Infrastructure': Building2,
    'Iron & Steel': Hammer,
    'Abrasives': Hammer,
    'Agri': Scissors
  };

  const formatDecimal = (num) => {
    if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
    return Math.round(num * 100) / 100;
  };

  const formatNumber = useCallback((num) => {
    if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}cr`;
    if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}L`;
    return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const cacheDuration = 60 * 60 * 1000; // 1hr
    const fetchSectors = async () => {
      try {
        setLoading(true);
        setError(null);
        setSectors([]);

        const cachedData = localStorage.getItem('sectorData');
        const cacheTimestamp = localStorage.getItem('sectorDataTimestamp');
        let validSectors = [];

        if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
          const parsedData = JSON.parse(cachedData);
          validSectors = parsedData.data
            .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
            .map((sector, index) => {
              const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
                const pe = sector.Companies.PE?.[i];
                return pe != null && !isNaN(pe) && pe < 10;
              }).length;
              return {
                ...sector,
                color: colorPalette[index % colorPalette.length],
                highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
                PELessThan10Count: peLessThan10Count,
                TotalCompanies: sector.Companies.Symbol.length
              };
            });
        } else {
          const response = await axios.get(`${API_BASE}/landpage/sector-summary`, { signal: controller.signal });
          if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
            throw new Error(response.data.message || 'API response is not valid');
          }
          validSectors = response.data.data
            .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
            .map((sector, index) => {
              const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
                const pe = sector.Companies.PE?.[i];
                return pe != null && !isNaN(pe) && pe < 10;
              }).length;
              return {
                ...sector,
                color: colorPalette[index % colorPalette.length],
                highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)'),
                PELessThan10Count: peLessThan10Count,
                TotalCompanies: sector.Companies.Symbol.length
              };
            });
          localStorage.setItem('sectorData', JSON.stringify(response.data));
          localStorage.setItem('sectorDataTimestamp', Date.now().toString());
        }

        if (validSectors.length === 0) {
          setSectors([]);
          setSelectedSector(null);
          setMaxPELessThan10Sector(null);
          setMinPELessThan10Sector(null);
          setLoading(false);
          return;
        }

        const sortedSectors = [...validSectors].sort((a, b) => {
          const valueA = sortBy === 'cagr' ? a.SectorCAGR_1Y_MCap : a.SectorMarketCap;
          const valueB = sortBy === 'cagr' ? b.SectorCAGR_1Y_MCap : b.SectorMarketCap;
          return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
        });

        setSectors(sortedSectors);

        const maxPELessThan10Sector = validSectors.reduce((max, sector) => {
          if (!max) return sector;
          if (sector.PELessThan10Count === max.PELessThan10Count) {
            return sector.TotalCompanies < max.TotalCompanies ? sector : max;
          }
          return sector.PELessThan10Count > max.PELessThan10Count ? sector : max;
        }, validSectors[0]);

        const minPELessThan10Sector = validSectors.reduce((min, sector) => {
          if (!min) return sector;
          if (sector.PELessThan10Count === min.PELessThan10Count) {
            return sector.TotalCompanies < min.TotalCompanies ? sector : min;
          }
          return sector.PELessThan10Count < min.PELessThan10Count ? sector : min;
        }, validSectors[0]);

        setMaxPELessThan10Sector(maxPELessThan10Sector);
        setMinPELessThan10Sector(minPELessThan10Sector);

        if (sortedSectors.length > 0) {
          setSelectedSector(sortedSectors[0]);
        } else {
          setSelectedSector(null);
        }
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setError(error.message || 'Failed to fetch sector data');
        console.error('Error fetching sector data:', error, error.response?.data);
        setSectors([]);
        setSelectedSector(null);
        setMaxPELessThan10Sector(null);
        setMinPELessThan10Sector(null);
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => fetchSectors(), 100);
    return () => {
      controller.abort();
      clearTimeout(debounceFetch);
    };
  }, [API_BASE, sortOrder, sortBy]);

  const sortedSectors = useMemo(() => {
    return [...sectors]
      .filter((sector) => {
        const query = searchQuery.toLowerCase();
        const sectorMatch = sector.Sector.toLowerCase().includes(query);
        const companyMatch = sector.Companies.Symbol.some((company) =>
          company.toLowerCase().includes(query)
        );
        return sectorMatch || companyMatch;
      })
      .sort((a, b) => {
        const valueA = sortBy === 'cagr' ? a.SectorCAGR_1Y_MCap : a.SectorMarketCap;
        const valueB = sortBy === 'cagr' ? b.SectorCAGR_1Y_MCap : b.SectorMarketCap;
        return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
      });
  }, [sectors, sortOrder, sortBy, searchQuery]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handleViewDetails = (sector, index) => {
    setSelectedSector(sector);
    setHighlightedSector(index);
    setShowDetails(true);
    // Scroll to SectorDetails after a slight delay to ensure it is rendered
    setTimeout(() => {
      if (sectorDetailsRef.current) {
        sectorDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-[60vh]">
      <div ref={ref} className="max-w-7xl w-full mx-auto">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Sector Performance
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Analyze market trends and performance metrics across all sectors, sorted by 1-year CAGR (highest to lowest)
          </p>
        </div>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {maxPELessThan10Sector && (
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Highest Count (PE &lt; 10)</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {maxPELessThan10Sector.Sector}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                      <TrendingUp size={16} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {maxPELessThan10Sector.PELessThan10Count}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        / {maxPELessThan10Sector.TotalCompanies} companies
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      {Math.round((maxPELessThan10Sector.PELessThan10Count / maxPELessThan10Sector.TotalCompanies) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {minPELessThan10Sector && (
            <motion.div
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-bl-full"></div>
              <div className="relative z-10">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Lowest Count (PE &lt; 10)</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {minPELessThan10Sector.Sector}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2">
                      <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {minPELessThan10Sector.PELessThan10Count}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        / {minPELessThan10Sector.TotalCompanies} companies
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                      {Math.round((minPELessThan10Sector.PELessThan10Count / minPELessThan10Sector.TotalCompanies) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Note:</span> The above section highlights companies with a PE ratio less than 10.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sectors or companies..."
                className="w-full px-4 py-2.5 pl-10 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg text-sm border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <option value="cagr">Sort by: 1Y CAGR</option>
              <option value="marketCap">Sort by: Market Cap</option>
            </select>

            <button
              onClick={toggleSortOrder}
              disabled={loading}
              className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${loading
                ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {sortOrder === 'desc' ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
              {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
            </button>
          </div>
        </div>
        <div className="flex gap-4 p-4 overflow-x-auto pb-6">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
            ))
          ) : error || sortedSectors.length === 0 ? (
            <div className="text-center px-4 py-5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm w-full">
              {error ? `Error: ${error}` : searchQuery ? 'No sectors or companies match your search' : 'No sectors available'}
            </div>
          ) : (
            sortedSectors.map((sector, index) => (
              <motion.div
                key={sector.Sector}
                className={`min-w-[280px] md:min-w-[320px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border ${highlightedSector === index ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'} overflow-hidden p-4 cursor-pointer`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setSelectedSector(sector);
                  setHighlightedSector(index);
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{
                      backgroundColor: sector.color,
                      color: 'white',
                    }}
                  >
                    {sectorIcons[sector.Sector] ? (
                      React.createElement(sectorIcons[sector.Sector], {
                        className: "w-4 h-4",
                        strokeWidth: 1.5,
                      })
                    ) : (
                      <PieChart className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {sector.Sector}
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatNumber(sector.SectorMarketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">1Y Growth:</span>
                    <span className={`font-medium ${sector.SectorCAGR_1Y_MCap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {sector.SectorCAGR_1Y_MCap ? `${formatDecimal(sector.SectorCAGR_1Y_MCap * 100)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">PE Ratio:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{formatDecimal(sector.SectorPE_Mode || 'N/A')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Companies (PE &lt; 10):</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{sector.PELessThan10Count}/{sector.TotalCompanies}</span>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => handleViewDetails(sector, index)}
                      className="w-full px-3 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
        {showDetails && selectedSector && (
          <div ref={sectorDetailsRef}>
            <SectorDetails
              sector={selectedSector}
              isOpen={showDetails}
              onClose={() => setShowDetails(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorStrip;