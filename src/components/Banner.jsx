// ---------------------heatmap--------------------------

// import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
// import {
//   Sparkles, TrendingUp, BarChart2, PieChart, Factory, FlaskConical, DollarSign, Car, Code,
//   HeartPulse, Scissors, ShoppingBag, Building2, Hammer, Wheat, Ship, Briefcase, Battery,
//   Cpu, Droplets, Home, Banknote, Smartphone, Plane, Utensils, Zap, Recycle, Trees, Radio,
//   Globe2, Microscope, Film, Beaker, Wrench, Shield, Truck, Satellite, Package, Server, Coins, BookOpen
// } from 'lucide-react';
// import { Typewriter } from 'react-simple-typewriter';
// import axios from 'axios';


// const Banner = () => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: '-50px' });
//   const [industries, setIndustries] = useState([]);
//   const [selectedIndustry, setSelectedIndustry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [highlightedIndustry, setHighlightedIndustry] = useState(null);
//   const [isDark, setIsDark] = useState(false);

//   const industryIcons = {
//     "Pharmaceuticals & Drugs": HeartPulse,
//     "Refineries ": Factory,
//     "Chemicals": FlaskConical,
//     "Finance - NBFC": DollarSign,
//     "Automobiles - Passenger Cars": Car,
//     "IT - Software": Code,
//     "Healthcare": HeartPulse,
//     "Textile": Scissors,
//     "Household & Personal Products": ShoppingBag,
//     "Cement & Construction Materials": Building2,
//     "Auto Ancillary": Hammer,
//     "Electrodes & Welding Equipment": Hammer,
//     "Pesticides & Agrochemicals": Wheat,
//     "Shipping": Ship,
//     "Finance - Investment": Banknote,
//     "Insurance": Shield,
//     "Telecom": Radio,
//     "Media & Entertainment": Film,
//     "Education": BookOpen,
//     "Energy": Zap,
//     "Power Generation & Distribution": Battery,
//     "Diesel Engines": Droplets,
//     "Aviation": Plane,
//     "Hospitality": Utensils,
//     "Real Estate": Home,
//     "Automobile Two & Three Wheelers": Truck,
//     "Defence": Shield,
//     "Mining": Hammer,
//     "Electric Equipment": Cpu,
//     "Electronics": Smartphone,
//     "Environment & Sustainability": Recycle,
//     "Forestry & Paper": Trees,
//     "Research & Development": Microscope,
//     "Global Trade": Globe2,
//     "Logistics": Package,
//     "Engineering - Industrial Equipments": Server,
//     "Finance - Asset Management": Coins,
//     "Construction": Wrench,
//     "Aerospace": Satellite,
//     "Consulting": Briefcase,
//   };

//   const parseDividendBracket = (bracket) => {
//     if (!bracket || typeof bracket !== 'string') return 0;
//     const cleaned = bracket.replace(/[()[\]]/g, '').replace(/\s+/g, '');
//     const parts = cleaned.split(',').map(Number);
//     if (parts.length < 2) return 0;
//     return (parts[0] + parts[1]) / 2;
//   };

//   const getGreenShade = (intensity) => {
//     if (intensity === 0) return isDark ? "rgb(30,70,50)" : "rgb(212,244,226)";
//     const normalizedIntensity = Math.min(1, Math.max(0, intensity));
//     if (isDark) {
//       const r = Math.round(6 + (100 - 6) * normalizedIntensity);
//       const g = Math.round(95 + (200 - 95) * normalizedIntensity);
//       const b = Math.round(70 + (150 - 70) * normalizedIntensity);
//       return `rgb(${r},${g},${b})`;
//     } else {
//       const r = Math.round(212 - (212 - 6) * normalizedIntensity);
//       const g = Math.round(244 - (244 - 95) * normalizedIntensity);
//       const b = Math.round(226 - (226 - 70) * normalizedIntensity);
//       return `rgb(${r},${g},${b})`;
//     }
//   };

//   const formatDecimal = (num) => {
//     if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
//     return Math.round(num * 100) / 100;
//   };


//   const formatDividendBracket = (bracket) => {
//     if (!bracket || typeof bracket !== "string") return "N/A";

//     // Remove any () [] and spaces
//     let cleaned = bracket.replace(/[()[\]]/g, "").replace(/\s+/g, "");

//     // Handle "5+" type (and multiply by 100)
//     if (cleaned.endsWith("+")) {
//       const num = parseFloat(cleaned.replace("+", ""));
//       return isNaN(num) ? "N/A" : `${(num * 100).toFixed(2)}%+`;
//     }

//     // Handle ranges like "0,0.0013" or "0-0.0013"
//     const parts = cleaned.split(/[-,]/).map(n => parseFloat(n)).filter(n => !isNaN(n));

//     if (parts.length === 2) {
//       return `${(parts[0] * 100).toFixed(2)}% - ${(parts[1] * 100).toFixed(2)}%`;
//     }

//     // Single value
//     if (parts.length === 1) {
//       return `${(parts[0] * 100).toFixed(2)}%`;
//     }

//     return "N/A"; // fallback
//   };


//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDark(mediaQuery.matches);

//     const handleChange = (e) => setIsDark(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();
//     const cacheDuration = 60 * 60 * 1000; // 1 hour

//     const fetchIndustries = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         setIndustries([]);

//         const cachedData = localStorage.getItem('industryDividendData');
//         const cacheTimestamp = localStorage.getItem('industryDividendDataTimestamp');
//         let validIndustries = [];

//         if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
//           const parsedData = JSON.parse(cachedData);
//           validIndustries = parsedData.data
//             .filter((industry) => industry?.industry && Number.isFinite(industry.CountInBracket) && industry.DividendBracket)
//             .map((industry) => ({
//               ...industry,
//               bracketAvg: parseDividendBracket(industry.DividendBracket),
//             }));
//         } else {
//           // const response = await axios.get('http://127.0.0.1:8000/industry_dividend_yield', {
//           //   signal: controller.signal,
//           // });
//           const response = await axios.get(`${API_BASE}/landpage/industry-dividend-yield`, { signal: controller.signal });
//           if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
//             throw new Error(response.data.message || 'API response is not valid');
//           }
//           validIndustries = response.data.data
//             .filter((industry) => industry?.industry && Number.isFinite(industry.CountInBracket) && industry.DividendBracket)
//             .map((industry) => ({
//               ...industry,
//               bracketAvg: parseDividendBracket(industry.DividendBracket),
//             }));
//           localStorage.setItem('industryDividendData', JSON.stringify(response.data));
//           localStorage.setItem('industryDividendDataTimestamp', Date.now().toString());
//         }

//         if (validIndustries.length === 0) {
//           setIndustries([]);
//           setSelectedIndustry(null);
//           setLoading(false);
//           return;
//         }

//         setIndustries(validIndustries.slice(0, 25));
//         if (validIndustries.length > 0) {
//           setSelectedIndustry(validIndustries[0]);
//         } else {
//           setSelectedIndustry(null);
//         }
//         setLoading(false);
//       } catch (error) {
//         if (error.name === 'AbortError') return;
//         setError(error.message || 'Failed to fetch industry data');
//         setIndustries([]);
//         setSelectedIndustry(null);
//         setLoading(false);
//       }
//     };

//     const debounceFetch = setTimeout(() => fetchIndustries(), 100);
//     return () => {
//       controller.abort();
//       clearTimeout(debounceFetch);
//     };
//   }, []);

//   // const formatNumber = useCallback((num) => {
//   //   if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
//   //   const absNum = Math.abs(num);
//   //   const sign = num < 0 ? '-' : '';
//   //   if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: 2 })}cr`;
//   //   if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: 2 })}L`;
//   //   return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
//   // }, []);
//   const formatter = new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });

//   const formatNumber = (num) => {
//     const parsed = Number(num);
//     if (!Number.isFinite(parsed)) return "₹0";

//     const absNum = Math.abs(parsed);
//     const sign = parsed < 0 ? "-" : "";

//     if (absNum >= 1e7) {
//       return `${sign}₹${formatter.format(absNum / 1e7)} cr`;
//     }

//     if (absNum >= 1e5) {
//       return `${sign}₹${formatter.format(absNum / 1e5)} L`;
//     }

//     return `${sign}₹${formatter.format(absNum)}`;
//   };


//   const maxBracketAvg = useMemo(() => {
//     if (industries.length === 0) return 1;
//     const max = Math.max(...industries.map((industry) => industry.bracketAvg || 0));
//     return max > 0 ? max : 1;
//   }, [industries]);

//   const heatmapData = useMemo(() => {
//     if (!Array.isArray(industries) || industries.length === 0) return [];
//     return industries.map((industry, index) => ({
//       ...industry,
//       intensity: industry.bracketAvg / maxBracketAvg,
//       index,
//     }));
//   }, [industries, maxBracketAvg]);





//   return (
//     <div className="relative px-4 py-8 sm:py-12 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[80vh] flex items-center justify-center">
//       <div ref={ref} className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 z-10">
//         {/* Left Section: Title and Selected Industry Card */}
//         <div className="mt-10 w-full lg:w-1/2 text-gray-800 dark:text-gray-100">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-700 dark:text-indigo-300 text-sm font-medium">
//               <Sparkles className="w-4 h-4" />
//               <span>Analyse Platform</span>
//               <span className="inline-block -rotate-10 bg-white text-sky-600 font-bold text-[15px]  py-0.5 rounded shadow-sm border border-sky-200 dark:bg-slate-800 dark:border-sky-700">
//                 BETA
//               </span>

//             </div>
//             <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left">
//               Capital Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-300">Data Analysis</span>
//             </h1>
//             {/* <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
//               <Typewriter
//                 words={[
//                   'Warren Buffett - "You do things when opportunities come along"',
//                   'Warren Buffett - "Risk Comes from Not knowing What you are doing"',
//                   'Warren Buffett - "Best Chance to deploy capital are when things are down"',
//                   'Mentor - "Value of money is not determined by what can it be exchanged for, rather by how it can be used to protect against uncertainties"',
//                   'Charlie Munger - "Big money is not in buying and selling, its in waiting when to buy and when to sell"',
//                   'Charlie Munger - "People calculate too much and think too little"',
//                 ]}
//                 loop={0}
//                 cursor
//                 cursorStyle="|"
//                 typeSpeed={60}
//                 deleteSpeed={30}
//                 delaySpeed={1500}
//               />
//             </p> */}
//             <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-left min-h-[60px]">
//               <Typewriter
//                 words={[
//                   'Warren Buffett - "You do things when opportunities come along"',
//                   'Warren Buffett - "Risk Comes from Not knowing What you are doing"',
//                   'Warren Buffett - "Best Chance to deploy capital are when things are down"',
//                   'Mentor - "Value of money is not determined by what can it be exchanged for, rather by how it can be used to protect against uncertainties"',
//                   'Charlie Munger - "Big money is not in buying and selling, its in waiting when to buy and when to sell"',
//                   'Charlie Munger - "People calculate too much and think too little"',
//                 ]}
//                 loop={0}
//                 cursor
//                 cursorStyle="|"
//                 typeSpeed={60}
//                 deleteSpeed={30}
//                 delaySpeed={1500}
//               />
//             </p>
//           </motion.div>

//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loading"
//                 className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="animate-pulse flex flex-col items-center space-y-4">
//                   <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//                   <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                   <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                   <div className="grid grid-cols-2 gap-3 w-full">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex flex-col space-y-1">
//                         <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
//                         <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             ) : !selectedIndustry || industries.length === 0 ? (
//               <motion.div
//                 key="no-data"
//                 className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6 text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
//                   No industry data available
//                 </p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-sm transition-colors duration-200"
//                 >
//                   Retry
//                 </button>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="data"
//                 className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <motion.div
//                     className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
//                     style={{
//                       backgroundColor: getGreenShade(selectedIndustry.intensity || 0),
//                       color: 'black',
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 10 }}
//                   >
//                     {industryIcons[selectedIndustry.industry] ? (
//                       React.createElement(industryIcons[selectedIndustry.industry], {
//                         className: 'w-6 h-6',
//                         strokeWidth: 1.5,
//                       })
//                     ) : (
//                       <PieChart className="w-6 h-6" strokeWidth={1.5} />
//                     )}
//                   </motion.div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                       {selectedIndustry.industry}
//                     </h3>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Industry dividend overview
//                     </p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   {/* <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
//                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
//                       <BarChart2 className="w-4 h-4 opacity-70" />
//                       Modal Range
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {selectedIndustry.DividendBracket}
//                     </p>
//                   </div> */}
//                   <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
//                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
//                       <BarChart2 className="w-4 h-4 opacity-70" />
//                       Modal Range
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {formatDividendBracket(selectedIndustry.DividendBracket)}
//                     </p>
//                   </div>

//                   <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-green-100 dark:border-gray-600">
//                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
//                       <PieChart className="w-4 h-4 opacity-70" />
//                       Industry Dividend Yield
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {(selectedIndustry.AvgDividendYield * 100).toFixed(2)}%
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
//                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
//                       <TrendingUp className="w-4 h-4 opacity-70" />
//                       Range Frequency
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {selectedIndustry.CountInBracket}
//                     </p>
//                   </div>
//                   <div className="bg-gradient-to-br from-sky-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
//                     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
//                       <BarChart2 className="w-4 h-4 opacity-70" />
//                       Company Count
//                     </div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {selectedIndustry.CompanyCount}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Right Section: Heatmap */}
//         <div className="mt-10 w-full lg:w-1/2 mt-8 lg:mt-0" data-tour="home-hero">
//           {error ? (
//             <div className="text-center px-4 py-6 text-gray-600 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
//               Could not load industry visualization: {error}
//             </div>
//           ) : loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 animate-pulse">
//               {[...Array(25)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-md h-24"
//                   style={{ backgroundColor: getGreenShade(0.5) }}
//                 ></div>
//               ))}
//             </div>
//           ) : heatmapData.length === 0 ? (
//             <div className="text-center px-4 py-6 text-gray-500 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
//               No industry data available
//             </div>
//           ) : (
//             <div className="relative w-full">
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
//                 {heatmapData.slice(0, 25).map((industry, index) => (
//                   <motion.div
//                     key={industry.industry}
//                     className="relative rounded-md cursor-pointer flex items-center justify-center p-3 bg-opacity-90 shadow-sm hover:shadow-md transition-shadow duration-200"
//                     style={{
//                       backgroundColor: getGreenShade(industry.intensity),
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: 'spring', stiffness: 250, damping: 14 }}
//                     onClick={() => setSelectedIndustry(industry)}
//                     onMouseEnter={() => setHighlightedIndustry(index)}
//                     onMouseLeave={() => setHighlightedIndustry(null)}
//                   >
//                     {/* <div className="flex flex-col items-center justify-center text-center">
//                       {industryIcons[industry.industry] ? (
//                         React.createElement(industryIcons[industry.industry], {
//                           className: 'w-5 h-5 mb-2',
//                           strokeWidth: 1.5,
//                           color: isDark ? '#e5e7eb' : '#374151',
//                         })
//                       ) : (
//                         <PieChart
//                           className="w-5 h-5 mb-2"
//                           strokeWidth={1.5}
//                           color={isDark ? '#e5e7eb' : '#757b86ff'}
//                         />
//                       )}
//                       <p className={`text-xs font-medium text-wrap truncate w-full ${isDark ? '#e5e7eb' : '#374151'}`}>
//                         {industry.industry}
//                       </p>
//                       <p className={`text-xs ${isDark ? '#e5e7eb' : '#374151'}`}>
//                         {industry.DividendBracket}
//                       </p>
//                     </div> */}

//                     {/* <div className="flex flex-col items-center justify-center text-center">
//                       {industryIcons[industry.industry] ? (
//                         React.createElement(industryIcons[industry.industry], {
//                           className: 'w-5 h-5 mb-2',
//                           strokeWidth: 1.5,
//                           color:
//                             industry.bgColor === '#064e3b' // dark green background
//                               ? '#ffffff' // white icon
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#374151',
//                         })
//                       ) : (
//                         <PieChart
//                           className="w-5 h-5 mb-2"
//                           strokeWidth={1.5}
//                           color={
//                             industry.bgColor === '#064e3b'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#757b86'
//                           }
//                         />
//                       )}

//                       {/* Industry Name 
//                       <p
//                         className="text-xs font-bold font-medium text-wrap truncate w-full"
//                         style={{
//                           color:
//                             industry.bgColor === '#064e3b'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#1a9ee0ff',
//                           WebkitTextStroke:
//                             industry.bgColor === '#064e3b'
//                               ? '0.5px #000000' // thin black outline for readability
//                               : '0px transparent',
//                         }}
//                       >
//                         {industry.industry}
//                       </p>

//                       {/* Dividend Bracket 
//                       <p
//                         className="text-xs"
//                         style={{
//                           color:
//                             industry.bgColor === '#064e3b'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#b0b1b3ff'
//                                 : '#1a9ee0ff',
//                           WebkitTextStroke:
//                             industry.bgColor === '#064e3b'
//                               ? '0.5px #d3cacaff'
//                               : '0px transparent',
//                         }}
//                       >
//                         {industry.DividendBracket}
//                       </p>
//                     </div> */}

//                     <div className="flex flex-col items-center justify-center text-center">
//                       {industryIcons[industry.industry] ? (
//                         React.createElement(industryIcons[industry.industry], {
//                           className: 'w-5 h-5 mb-2',
//                           strokeWidth: 1.5,
//                           color:
//                             industry.bgColor === '#065f46' // dark green background
//                               ? '#ffffff' // white icon
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#374151',
//                         })
//                       ) : (
//                         <PieChart
//                           className="w-5 h-5 mb-2"
//                           strokeWidth={1.5}
//                           color={
//                             industry.bgColor === '#065f46'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#020202ff'
//                           }
//                         />
//                       )}

//                       {/* Industry Name */}
//                       <p
//                         className="text-xs font-bold font-medium text-wrap truncate w-full"
//                         style={{
//                           color:
//                             industry.bgColor === '#065f46'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#e5e7eb'
//                                 : '#000000ef',
//                           WebkitTextStroke:
//                             industry.bgColor === '#065f46'
//                               ? '0.5px #fde6e6ff' // thin black outline for readability
//                               : '0px transparent',
//                         }}
//                       >
//                         {industry.industry}
//                       </p>

//                       {/* Dividend Bracket */}
//                       <p
//                         className="text-xs"
//                         style={{
//                           color:
//                             industry.bgColor === '#065f46'
//                               ? '#ffffff'
//                               : isDark
//                                 ? '#ffffffff'
//                                 : '#000000ff',
//                           WebkitTextStroke:
//                             industry.bgColor === '#065f46'
//                               ? '0.5px #d3cacaff'
//                               : '0px transparent',
//                         }}
//                       >
//                         {industry.DividendBracket}
//                       </p>
//                     </div>


//                     {highlightedIndustry === index && (
//                       <div className="absolute z-20 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md text-xs -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
//                         <p className="font-semibold text-gray-900 dark:text-gray-100">{industry.industry}</p>
//                         <p className="text-gray-600 dark:text-gray-300">
//                           Dividend Bracket Avg: {(industry.bracketAvg * 100).toFixed(2)}%
//                         </p>
//                       </div>
//                     )}
//                   </motion.div>
//                 ))}
//               </div>
//               {/* <div className="mt-6 flex flex-col items-center">
//                 <p className="text-sm text-sky-600 dark:text-sky-300 font-medium mb-2">
//                   Dividend Bracket Average Heatmap (Top 25 Industries)
//                 </p>
//                 <div className="w-full max-w-xs flex items-center gap-2">
//                   <span className="text-xs text-gray-600 dark:text-gray-300">0.00%</span>
//                   <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-green-100 via-green-400 to-green-900"></div>
//                   <span className="text-xs text-gray-600 dark:text-gray-300">
//                     {Math.max(...heatmapData.map(i => i.bracketAvg * 100)).toFixed(2)}%
//                   </span>
//                 </div>
//               </div> */}
//               <div className="mt-6 flex flex-col items-center">
//                 <p className="text-sm text-sky-600 dark:text-sky-300 font-medium mb-2">
//                   Dividend Bracket Average Heatmap (Top 25 Industries)
//                 </p>
//                 <div className="w-full max-w-md flex items-center gap-2">
//                   <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">0.00%</span>
//                   {/* <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-green-100 to-green-900"></div> */}
//                   <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-green-100 to-green-900 dark:from-green-900 dark:to-green-100"></div>
//                   <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
//                     {Math.max(...heatmapData.map(i => i.bracketAvg * 100)).toFixed(2)}%
//                   </span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;



// --------------------new heatmap----------------------------


import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Sparkles, TrendingUp, BarChart2, PieChart, Factory, FlaskConical, DollarSign, Car, Code,
    HeartPulse, Scissors, ShoppingBag, Building2, Hammer, Wheat, Ship, Briefcase, Battery,
    Cpu, Droplets, Home, Banknote, Smartphone, Plane, Utensils, Zap, Recycle, Trees, Radio,
    Globe2, Microscope, Film, Beaker, Wrench, Shield, Truck, Satellite, Package, Server, Coins, BookOpen
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';


const Banner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [industries, setIndustries] = useState([]);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [highlightedIndustry, setHighlightedIndustry] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [selectedView, setSelectedView] = useState('');
    const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
    const handleViewChange = (event) => {
        setSelectedView(event.target.value);
    };

    const industryIcons = {
        "Pharmaceuticals & Drugs": HeartPulse,
        "Refineries ": Factory,
        "Chemicals": FlaskConical,
        "Finance - NBFC": DollarSign,
        "Automobiles - Passenger Cars": Car,
        "IT - Software": Code,
        "Healthcare": HeartPulse,
        "Textile": Scissors,
        "Household & Personal Products": ShoppingBag,
        "Cement & Construction Materials": Building2,
        "Auto Ancillary": Hammer,
        "Electrodes & Welding Equipment": Hammer,
        "Pesticides & Agrochemicals": Wheat,
        "Shipping": Ship,
        "Finance - Investment": Banknote,
        "Insurance": Shield,
        "Telecom": Radio,
        "Media & Entertainment": Film,
        "Education": BookOpen,
        "Energy": Zap,
        "Power Generation & Distribution": Battery,
        "Diesel Engines": Droplets,
        "Aviation": Plane,
        "Hospitality": Utensils,
        "Real Estate": Home,
        "Automobile Two & Three Wheelers": Truck,
        "Defence": Shield,
        "Mining": Hammer,
        "Electric Equipment": Cpu,
        "Electronics": Smartphone,
        "Environment & Sustainability": Recycle,
        "Forestry & Paper": Trees,
        "Research & Development": Microscope,
        "Global Trade": Globe2,
        "Logistics": Package,
        "Engineering - Industrial Equipments": Server,
        "Finance - Asset Management": Coins,
        "Construction": Wrench,
        "Aerospace": Satellite,
        "Consulting": Briefcase,
    };

    const parseDividendBracket = (bracket) => {
        if (!bracket || typeof bracket !== 'string') return 0;
        const cleaned = bracket.replace(/[()[\]]/g, '').replace(/\s+/g, '');
        const parts = cleaned.split(',').map(Number);
        if (parts.length < 2) return 0;
        return (parts[0] + parts[1]) / 2;
    };

    const getGreenShade = (intensity) => {
        if (intensity === 0) return isDark ? "rgb(30,70,50)" : "rgb(212,244,226)";
        const normalizedIntensity = Math.min(1, Math.max(0, intensity));
        if (isDark) {
            const r = Math.round(6 + (100 - 6) * normalizedIntensity);
            const g = Math.round(95 + (200 - 95) * normalizedIntensity);
            const b = Math.round(70 + (150 - 70) * normalizedIntensity);
            return `rgb(${r},${g},${b})`;
        } else {
            const r = Math.round(212 - (212 - 6) * normalizedIntensity);
            const g = Math.round(244 - (244 - 95) * normalizedIntensity);
            const b = Math.round(226 - (226 - 70) * normalizedIntensity);
            return `rgb(${r},${g},${b})`;
        }
    };

    const formatDecimal = (num) => {
        if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
        return Math.round(num * 100) / 100;
    };


    const formatDividendBracket = (bracket) => {
        if (!bracket || typeof bracket !== "string") return "N/A";

        // Remove any () [] and spaces
        let cleaned = bracket.replace(/[()[\]]/g, "").replace(/\s+/g, "");

        // Handle "5+" type (and multiply by 100)
        if (cleaned.endsWith("+")) {
            const num = parseFloat(cleaned.replace("+", ""));
            return isNaN(num) ? "N/A" : `${(num * 100).toFixed(2)}%+`;
        }

        // Handle ranges like "0,0.0013" or "0-0.0013"
        const parts = cleaned.split(/[-,]/).map(n => parseFloat(n)).filter(n => !isNaN(n));

        if (parts.length === 2) {
            return `${(parts[0] * 100).toFixed(2)}% - ${(parts[1] * 100).toFixed(2)}%`;
        }

        // Single value
        if (parts.length === 1) {
            return `${(parts[0] * 100).toFixed(2)}%`;
        }

        return "N/A"; // fallback
    };


    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);

        const handleChange = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const cacheDuration = 60 * 60 * 1000; // 1 hour

        const fetchIndustries = async () => {
            try {
                setLoading(true);
                setError(null);
                setIndustries([]);

                const cachedData = localStorage.getItem('industryDividendData');
                const cacheTimestamp = localStorage.getItem('industryDividendDataTimestamp');
                let validIndustries = [];

                if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
                    const parsedData = JSON.parse(cachedData);
                    validIndustries = parsedData.data
                        .filter((industry) => industry?.industry && Number.isFinite(industry.CountInBracket) && industry.DividendBracket)
                        .map((industry) => ({
                            ...industry,
                            bracketAvg: parseDividendBracket(industry.DividendBracket),
                        }));
                } else {
                    //   const response = await axios.get('http://127.0.0.1:8000/industry_dividend_yield', {
                    //     signal: controller.signal,
                    //   });
                    const response = await axios.get(`${API_BASE}/landpage/industry-dividend-yield`, { signal: controller.signal });
                    if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
                        throw new Error(response.data.message || 'API response is not valid');
                    }
                    validIndustries = response.data.data
                        .filter((industry) => industry?.industry && Number.isFinite(industry.CountInBracket) && industry.DividendBracket)
                        .map((industry) => ({
                            ...industry,
                            bracketAvg: parseDividendBracket(industry.DividendBracket),
                        }));
                    localStorage.setItem('industryDividendData', JSON.stringify(response.data));
                    localStorage.setItem('industryDividendDataTimestamp', Date.now().toString());
                }

                if (validIndustries.length === 0) {
                    setIndustries([]);
                    setSelectedIndustry(null);
                    setLoading(false);
                    return;
                }

                setIndustries(validIndustries.slice(0, 25));
                if (validIndustries.length > 0) {
                    setSelectedIndustry(validIndustries[0]);
                } else {
                    setSelectedIndustry(null);
                }
                setLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') return;
                setError(error.message || 'Failed to fetch industry data');
                setIndustries([]);
                setSelectedIndustry(null);
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(() => fetchIndustries(), 100);
        return () => {
            controller.abort();
            clearTimeout(debounceFetch);
        };
    }, []);

    const formatNumber = useCallback((num) => {
        if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
        const absNum = Math.abs(num);
        const sign = num < 0 ? '-' : '';
        if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: 2 })}cr`;
        if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: 2 })}L`;
        return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
    }, []);

    const maxBracketAvg = useMemo(() => {
        if (industries.length === 0) return 1;
        const max = Math.max(...industries.map((industry) => industry.bracketAvg || 0));
        return max > 0 ? max : 1;
    }, [industries]);

    const heatmapData = useMemo(() => {
        if (!Array.isArray(industries) || industries.length === 0) return [];
        return industries.map((industry, index) => ({
            ...industry,
            intensity: industry.bracketAvg / maxBracketAvg,
            index,
        }));
    }, [industries, maxBracketAvg]);





    return (
        <div className=" relative px-3 py-6 sm:py-12 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[80vh] flex items-center justify-center">

            <div ref={ref} className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 z-10">
                {/* Left Section: Title and Selected Industry Card */}
                <div className="w-full lg:w-1/2 text-gray-800 dark:text-gray-100">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center justify-center lg:justify-start  text-slate-700 dark:text-indigo-300 text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>Analyse Platform</span>

                        </div>
                        <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left">
                            Capital Market{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-300">
                                Data Analytics
                            </span>
                            <span className="z-10 align-right inline-block -rotate-6 bg-white text-sky-600 dark:bg-slate-800 font-semibold text-xs px-2 py-0.5 rounded-md border border-sky-300 dark:border-sky-600 shadow-sm">
                                BETA
                            </span>
                        </h1>


                        {/* <p className="mt-5 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <Typewriter
                words={[
                  'Warren Buffett - "You do things when opportunities come along"',
                  'Warren Buffett - "Risk Comes from Not knowing What you are doing"',
                  'Warren Buffett - "Best Chance to deploy capital are when things are down"',
                  'Mentor - "Value of money is not determined by what can it be exchanged for, rather by how it can be used to protect against uncertainties"',
                  'Charlie Munger - "Big money is not in buying and selling, its in waiting when to buy and when to sell"',
                  'Charlie Munger - "People calculate too much and think too little"',
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={1500}
              />
            </p> */}

                        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-left min-h-[60px]">
                            <Typewriter
                                words={[
                                    'Ratan Tata - "I do not believe in taking right decisions, I take decisions and then make them RIGHT."',
                                    // 'Warren Buffett - "You do things when opportunities come along"',
                                    'Warren Buffett - "Risk Comes from Not knowing What you are doing"',
                                    'Charlie Munger - "People calculate too much and think too little"',
                                    // 'Warren Buffett - "Best Chance to deploy capital are when things are down"',
                                    'Mentor - "Value of money is not determined by what can it be exchanged for, rather by how it can be used to protect against uncertainties"',
                                    'Charlie Munger - "Big money is not in buying and selling, its in waiting when to buy and when to sell"',

                                ]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={60}
                                deleteSpeed={30}
                                delaySpeed={1500}
                            />
                        </p>

                    </motion.div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="animate-pulse flex flex-col items-center space-y-4">
                                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                                    <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                    <div className="grid grid-cols-2 gap-3 w-full">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex flex-col space-y-1">
                                                <div className="w-1/2 h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : !selectedIndustry || industries.length === 0 ? (
                            <motion.div
                                key="no-data"
                                className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                                    No industry data available
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-sm transition-colors duration-200"
                                >
                                    Retry
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="data"
                                className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-md mx-auto lg:mx-0 p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <motion.div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md"
                                        style={{
                                            backgroundColor: getGreenShade(selectedIndustry.intensity || 0),
                                            color: 'black',
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                                    >
                                        {industryIcons[selectedIndustry.industry] ? (
                                            React.createElement(industryIcons[selectedIndustry.industry], {
                                                className: 'w-6 h-6',
                                                strokeWidth: 1.5,
                                            })
                                        ) : (
                                            <PieChart className="w-6 h-6" strokeWidth={1.5} />
                                        )}
                                    </motion.div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {selectedIndustry.industry}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Industry dividend overview
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                      <BarChart2 className="w-4 h-4 opacity-70" />
                      Modal Range
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {selectedIndustry.DividendBracket}
                    </p>
                  </div> */}
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                                            <BarChart2 className="w-4 h-4 opacity-70" />
                                            Dividend Range
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {formatDividendBracket(selectedIndustry.DividendBracket)}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-green-100 dark:border-gray-600">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                                            <PieChart className="w-4 h-4 opacity-70" />
                                            Industry Dividend Yield
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {(selectedIndustry.AvgDividendYield * 100).toFixed(2)}%
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-blue-100 dark:border-gray-600">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                                            <TrendingUp className="w-4 h-4 opacity-70" />
                                            Range Frequency
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {selectedIndustry.CountInBracket}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-sky-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-purple-100 dark:border-gray-600">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                                            <BarChart2 className="w-4 h-4 opacity-70" />
                                            Company Count
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {selectedIndustry.CompanyCount}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


                {/* Right Section: Heatmap */}
                <div className="w-full lg:w-1/2 mt-8 lg:mt-0" data-tour="home-hero">
                    {error ? (
                        <div className="text-center px-4 py-6 text-gray-600 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                            Could not load industry visualization: {error}
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 animate-pulse">
                            {[...Array(25)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded-md h-24"
                                    style={{ backgroundColor: getGreenShade(0.5) }}
                                ></div>
                            ))}
                        </div>
                    ) : heatmapData.length === 0 ? (
                        <div className="text-center px-4 py-6 text-gray-500 dark:text-gray-300 text-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                            No industry data available
                        </div>
                    ) : (
                        <div className="relative w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
                                {heatmapData.slice(0, 25).map((industry, index) => (
                                    <motion.div
                                        key={industry.industry}
                                        className="relative rounded-md cursor-pointer flex items-center justify-center p-3 bg-opacity-90 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        style={{
                                            backgroundColor: getGreenShade(industry.intensity),
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 250, damping: 14 }}
                                        onClick={() => setSelectedIndustry(industry)}
                                        onMouseEnter={() => setHighlightedIndustry(index)}
                                        onMouseLeave={() => setHighlightedIndustry(null)}
                                    >
                                        {/* <div className="flex flex-col items-center justify-center text-center">
                      {industryIcons[industry.industry] ? (
                        React.createElement(industryIcons[industry.industry], {
                          className: 'w-5 h-5 mb-2',
                          strokeWidth: 1.5,
                          color: isDark ? '#e5e7eb' : '#374151',
                        })
                      ) : (
                        <PieChart
                          className="w-5 h-5 mb-2"
                          strokeWidth={1.5}
                          color={isDark ? '#e5e7eb' : '#757b86ff'}
                        />
                      )}
                      <p className={`text-xs font-medium text-wrap truncate w-full ${isDark ? '#e5e7eb' : '#374151'}`}>
                        {industry.industry}
                      </p>
                      <p className={`text-xs ${isDark ? '#e5e7eb' : '#374151'}`}>
                        {industry.DividendBracket}
                      </p>
                    </div> */}

                                        <div className="flex flex-col items-center justify-center text-center">
                                            {industryIcons[industry.industry] ? (
                                                React.createElement(industryIcons[industry.industry], {
                                                    className: 'w-5 h-5 mb-2',
                                                    strokeWidth: 1.5,
                                                    color:
                                                        industry.bgColor === '#065f46' // dark green background
                                                            ? '#ffffff' // white icon
                                                            : isDark
                                                                ? '#e5e7eb'
                                                                : '#374151',
                                                })
                                            ) : (
                                                <PieChart
                                                    className="w-5 h-5 mb-2"
                                                    strokeWidth={1.5}
                                                    color={
                                                        industry.bgColor === '#065f46'
                                                            ? '#ffffff'
                                                            : isDark
                                                                ? '#e5e7eb'
                                                                : '#020202ff'
                                                    }
                                                />
                                            )}

                                            {/* Industry Name */}
                                            <p
                                                className="text-xs font-bold font-medium text-wrap truncate w-full"
                                                style={{
                                                    color:
                                                        industry.bgColor === '#065f46'
                                                            ? '#ffffff'
                                                            : isDark
                                                                ? '#e5e7eb'
                                                                : '#000000ef',
                                                    WebkitTextStroke:
                                                        industry.bgColor === '#065f46'
                                                            ? '0.5px #fde6e6ff' // thin black outline for readability
                                                            : '0px transparent',
                                                }}
                                            >
                                                {industry.industry}
                                            </p>

                                            {/* Dividend Bracket */}
                                            <p
                                                className="text-xs"
                                                style={{
                                                    color:
                                                        industry.bgColor === '#065f46'
                                                            ? '#ffffff'
                                                            : isDark
                                                                ? '#ffffffff'
                                                                : '#000000ff',
                                                    WebkitTextStroke:
                                                        industry.bgColor === '#065f46'
                                                            ? '0.5px #d3cacaff'
                                                            : '0px transparent',
                                                }}
                                            >
                                                {formatDividendBracket(industry.DividendBracket)}

                                            </p>
                                        </div>



                                        {highlightedIndustry === index && (
                                            <div className="absolute z-20 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-md text-xs -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                <p className="font-semibold text-gray-900 dark:text-gray-100">{industry.industry}</p>
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    Dividend Bracket Avg: {(industry.bracketAvg * 100).toFixed(2)}%
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            {/* <div className="mt-6 flex flex-col items-center">
                <p className="text-sm text-sky-600 dark:text-sky-300 font-medium mb-2">
                  Dividend Bracket Average Heatmap (Top 25 Industries)
                </p>
                <div className="w-full max-w-xs flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-gray-300">0.00%</span>
                  <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-green-100 via-green-400 to-green-900"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {Math.max(...heatmapData.map(i => i.bracketAvg * 100)).toFixed(2)}%
                  </span>
                </div>
              </div> */}
                            <div className="mt-6 flex flex-col items-center">
                                <p className="text-sm text-sky-600 dark:text-sky-300 font-medium mb-2">
                                    Dividend Bracket Average Heatmap (Top 25 Industries)
                                </p>
                                <div className="w-full max-w-md flex items-center gap-2">
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">0.00%</span>
                                    <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-green-100 to-green-900 dark:from-green-900 dark:to-green-100"></div>
                                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                        {Math.max(...heatmapData.map(i => i.bracketAvg * 100)).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Banner;