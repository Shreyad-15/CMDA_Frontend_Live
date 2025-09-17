// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { motion, useInView } from 'framer-motion';

// const MarketIndices = () => {
//     const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//     const ref = useRef(null);
//     const detailsRef = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: '-50px' });
//     const [indices, setIndices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [selectedIndex, setSelectedIndex] = useState(null);
//     const [showDetails, setShowDetails] = useState(false);
//     const [isDark, setIsDark] = useState(false);

//     // List of 10 top indices to fetch
//     const indexNames = [
//         "NIFTY 50",
//         "NIFTY NEXT 50",
//         "NIFTY BANK",
//         "NIFTY MIDCAP 100",
//         "NIFTY SMALLCAP 250",
//         "NIFTY ALPHA 50",
//         "NIFTY100 QUALITY 30",
//         "NIFTY50 VALUE20",
//         "NIFTY100 LOW VOlL.30",
//         "NIFTY CPSE"
//     ];

//     const colorPalette = [
//         'rgba(31, 119, 180, 0.8)', 'rgba(255, 127, 14, 0.8)', 'rgba(13, 84, 105, 0.8)',
//         'rgba(214, 39, 40, 0.8)', 'rgba(148, 103, 189, 0.8)', 'rgba(23, 190, 207, 0.8)',
//         'rgba(227, 119, 194, 0.8)', 'rgba(188, 189, 34, 0.8)', 'rgba(127, 127, 127, 0.8)',
//         'rgba(70, 130, 180, 0.8)'
//     ];

//     const formatDecimal = (num) => {
//         if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
//         return Math.round(num * 100) / 100;
//     };

//     const formatNumber = useCallback((num) => {
//         if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
//         const absNum = Math.abs(num);
//         const sign = num < 0 ? '-' : '';
//         if (absNum >= 1e7) return `${sign}₹${(absNum / 1e7).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}cr`;
//         if (absNum >= 1e5) return `${sign}₹${(absNum / 1e5).toLocaleString('en-IN', { minimumFractionDigits: absNum % 1 === 0 ? 0 : 2 })}L`;
//         return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
//     }, []);

//     useEffect(() => {
//         const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//         setIsDark(mediaQuery.matches);
//         const handleChange = (e) => setIsDark(e.matches);
//         mediaQuery.addEventListener('change', handleChange);
//         return () => mediaQuery.removeEventListener('change', handleChange);
//     }, []);

//     useEffect(() => {
//         const controller = new AbortController();
//         const cacheDuration = 60 * 60 * 1000; // 1 hour

//         const fetchIndices = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 const cachedData = localStorage.getItem('indicesData');
//                 const cacheTimestamp = localStorage.getItem('indicesDataTimestamp');
//                 let validIndices = [];

//                 if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
//                     validIndices = JSON.parse(cachedData).filter(
//                         (index) => index?.index_name && Number.isFinite(index.free_float_mcap) && Number.isFinite(index.pe)
//                     );
//                 } else {
//                     const responses = await Promise.all(
//                         indexNames.map((name) =>
//                             axios.get(`${API_BASE}/indices`, { params: { name } })
//                         )
//                     );
//                     console.log('before respose', responses);

//                     validIndices = responses
//                         .map((response, index) => {
//                             try {
//                                 if (response.data.status === 'success') {
//                                     const indexData = response.data.data;
//                                     if (indexData && indexData.index_name && Number.isFinite(indexData.free_float_mcap) && Number.isFinite(indexData.pe)) {
//                                         return {
//                                             ...indexData,
//                                             requestedName: indexNames[index],
//                                             color: colorPalette[index % colorPalette.length],
//                                             highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)')
//                                         };
//                                     }
//                                 }
//                                 return null;
//                             } catch (e) {
//                                 console.error(`Error processing response for ${indexNames[index]}:`, e);
//                                 return null;
//                             }
//                         })
//                         .filter(Boolean);
//                     console.log('valiedd', validIndices);

//                     localStorage.setItem('indicesData', JSON.stringify(validIndices));
//                     localStorage.setItem('indicesDataTimestamp', Date.now().toString());
//                 }

//                 if (validIndices.length === 0) {
//                     setError('No valid index data available. Please check if the API supports the provided index names.');
//                     setIndices([]);
//                 } else {
//                     setIndices(validIndices);
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 if (error.name === 'AbortError') return;
//                 setError('Failed to fetch index data. Please check the network, CORS settings, or API base URL.');
//                 console.error('Error fetching index data:', error, error.response?.data);
//                 setIndices([]);
//                 setLoading(false);
//             }
//         };

//         fetchIndices();
//         console.log('fetch', fetchIndices());

//         return () => controller.abort();
//     }, [API_BASE]);

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % indices.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + indices.length) % indices.length);
//     };

//     const handleViewDetails = (index, i) => {
//         setSelectedIndex(index);
//         setCurrentSlide(i);
//         setShowDetails(true);
//         setTimeout(() => {
//             if (detailsRef.current) {
//                 detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//             }
//         }, 100);
//     };

//     return (
//         <div className="relative px-4 py-6 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-[60vh]">
//             <div ref={ref} className="max-w-7xl w-full mx-auto">
//                 <div>
//                     <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                         Index Performance Slider
//                     </h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
//                         Explore the top 10 indices with their performance metrics
//                     </p>
//                 </div>

//                 <div className="relative mt-6">
//                     {loading ? (
//                         <div className="text-center text-gray-600 dark:text-gray-400 text-xl mt-10">Loading...</div>
//                     ) : error && indices.length === 0 ? (
//                         <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">{error}</div>
//                     ) : (
//                         <>
//                             <div className="relative bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-2xl mx-auto">
//                                 {indices.length > 0 && (
//                                     <>
//                                         <motion.h2
//                                             className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100"
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: isInView ? 1 : 0 }}
//                                             transition={{ duration: 0.5 }}
//                                         >
//                                             {indices[currentSlide].index_name}
//                                         </motion.h2>
//                                         <div className="grid grid-cols-5 gap-4">
//                                             <div className="flex justify-between border-b py-2">
//                                                 <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
//                                                 <span className="font-medium text-gray-900 dark:text-gray-100">
//                                                     {formatNumber(indices[currentSlide].free_float_mcap)}
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between border-b py-2">
//                                                 <span className="text-gray-600 dark:text-gray-400">1Y Return:</span>
//                                                 <span className={`font-medium ${indices[currentSlide].return_1y >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                                                     {indices[currentSlide].return_1y ? `${formatDecimal(indices[currentSlide].return_1y * 100)}%` : 'N/A'}
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between border-b py-2">
//                                                 <span className="text-gray-600 dark:text-gray-400">P/E Ratio:</span>
//                                                 <span className="font-medium text-gray-900 dark:text-gray-100">
//                                                     {formatDecimal(indices[currentSlide].pe)}
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between border-b py-2">
//                                                 <span className="text-gray-600 dark:text-gray-400">P/B Ratio:</span>
//                                                 <span className="font-medium text-gray-900 dark:text-gray-100">
//                                                     {formatDecimal(indices[currentSlide].pb)}
//                                                 </span>
//                                             </div>
//                                             <div className="flex justify-between border-b py-2">
//                                                 <span className="text-gray-600 dark:text-gray-400">Dividend Yield:</span>
//                                                 <span className="font-medium text-gray-900 dark:text-gray-100">
//                                                     {formatDecimal(indices[currentSlide].dividend_yield * 100)}%
//                                                 </span>
//                                             </div>
//                                             <div className="pt-4 text-center">
//                                                 <button
//                                                     onClick={() => handleViewDetails(indices[currentSlide], currentSlide)}
//                                                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                                                 >
//                                                     View More
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                             <div className="flex justify-between mt-4 max-w-2xl mx-auto">
//                                 <button
//                                     onClick={prevSlide}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                                 >
//                                     Previous
//                                 </button>
//                                 <span className="text-gray-600 dark:text-gray-400">
//                                     {currentSlide + 1} / {indices.length}
//                                 </span>
//                                 <button
//                                     onClick={nextSlide}
//                                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                                 >
//                                     Next
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 {showDetails && selectedIndex && (
//                     <div ref={detailsRef} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg mt-8">
//                         <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{selectedIndex.index_name} Constituents</h3>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full table-auto text-xs text-gray-900 dark:text-gray-100">
//                                 <thead>
//                                     <tr className="bg-gray-100 dark:bg-gray-700">
//                                         <th className="px-4 py-2 text-left">Symbol</th>
//                                         <th className="px-4 py-2 text-left">Company Name</th>
//                                         <th className="px-4 py-2 text-left">Price (₹)</th>
//                                         <th className="px-4 py-2 text-left">P/E</th>
//                                         <th className="px-4 py-2 text-left">P/B</th>
//                                         <th className="px-4 py-2 text-left">Div Yield (%)</th>
//                                         <th className="px-4 py-2 text-left">FF MCap (₹cr)</th>
//                                         <th className="px-4 py-2 text-left">1Y Return (%)</th>
//                                         <th className="px-4 py-2 text-left">Weight (%)</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedIndex.constituents && selectedIndex.constituents.map((constituent, idx) => (
//                                         <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
//                                             <td className="px-4 py-2">{constituent.Symbol}</td>
//                                             <td className="px-4 py-2">{constituent.CompanyName}</td>
//                                             <td className="px-4 py-2">{formatDecimal(constituent.Price)}</td>
//                                             <td className="px-4 py-2">{formatDecimal(constituent.PE)}</td>
//                                             <td className="px-4 py-2">{formatDecimal(constituent.PB)}</td>
//                                             <td className="px-4 py-2">{formatDecimal(constituent.DivYld * 100)}</td>
//                                             <td className="px-4 py-2">{formatNumber(constituent.FF_MCap)}</td>
//                                             <td className="px-4 py-2">{constituent.Return1Y ? formatDecimal(constituent.Return1Y * 100) : 'N/A'}</td>
//                                             <td className="px-4 py-2">{formatDecimal(constituent.WeightPct)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <button
//                             onClick={() => setShowDetails(false)}
//                             className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MarketIndices;


import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const MarketIndices = () => {
    const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
    const [indices, setIndices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // List of 10 top indices to fetch
    const indexNames = [
        "NIFTY 50",
        "NIFTY NEXT 50",
        "NIFTY BANK",
        "NIFTY MIDCAP 100",
        "NIFTY SMALLCAP 250",
        "NIFTY ALPHA 50",
        "NIFTY100 QUALITY 30",
        // "NIFTY50 VALUE 20",
        // "NIFTY100 LOW VOL30",
        "NIFTY CPSE"
    ];

    const colorPalette = [
        'rgba(31, 119, 180, 0.8)', 'rgba(255, 127, 14, 0.8)', 'rgba(13, 84, 105, 0.8)',
        'rgba(214, 39, 40, 0.8)', 'rgba(148, 103, 189, 0.8)', 'rgba(23, 190, 207, 0.8)',
        'rgba(227, 119, 194, 0.8)', 'rgba(188, 189, 34, 0.8)', 'rgba(127, 127, 127, 0.8)',
        'rgba(70, 130, 180, 0.8)'
    ];

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
        const cacheDuration = 60 * 60 * 1000; // 1 hour

        const fetchIndices = async () => {
            try {
                setLoading(true);
                setError(null);

                const cachedData = localStorage.getItem('indicesData');
                const cacheTimestamp = localStorage.getItem('indicesDataTimestamp');
                let validIndices = [];

                if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
                    validIndices = JSON.parse(cachedData).filter(
                        (index) => index?.index_name && Number.isFinite(index.free_float_mcap) && Number.isFinite(index.pe)
                    );
                } else {
                    const responses = await Promise.all(
                        indexNames.map((name) =>
                            axios.get(`${API_BASE}/indices`, { params: { name } })
                        )
                    );

                    validIndices = responses
                        .map((response, index) => {
                            try {
                                if (response.data.status === 'success') {
                                    const indexData = response.data.data;
                                    if (indexData && indexData.index_name && Number.isFinite(indexData.free_float_mcap) && Number.isFinite(indexData.pe)) {
                                        return {
                                            ...indexData,
                                            requestedName: indexNames[index],
                                            color: colorPalette[index % colorPalette.length],
                                            highlightColor: colorPalette[index % colorPalette.length].replace('0.8)', '1)')
                                        };
                                    }
                                }
                                return null;
                            } catch (e) {
                                console.error(`Error processing response for ${indexNames[index]}:`, e);
                                return null;
                            }
                        })
                        .filter(Boolean);

                    localStorage.setItem('indicesData', JSON.stringify(validIndices));
                    localStorage.setItem('indicesDataTimestamp', Date.now().toString());
                }

                if (validIndices.length === 0) {
                    setError('No valid index data available. Please check if the API supports the provided index names.');
                    setIndices([]);
                } else {
                    setIndices(validIndices);
                }
                setLoading(false);
            } catch (error) {
                if (error.name === 'AbortError') return;
                setError('Failed to fetch index data. Please check the network, CORS settings, or API base URL.');
                console.error('Error fetching index data:', error, error.response?.data);
                setIndices([]);
                setLoading(false);
            }
        };

        fetchIndices();

        return () => controller.abort();
    }, [API_BASE]);

    const handleViewDetails = (index) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedIndex(null);
    };

    return (
        <div className="px-4 py-8 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Market Indices Overview
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Explore the top 10 indices with their performance metrics
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-64 animate-pulse">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error && indices.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                        <div className="text-red-600 dark:text-red-400 text-xl mb-4">{error}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {indices.map((index, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div
                                    className="h-2 w-full"
                                    style={{ backgroundColor: index.color || colorPalette[i % colorPalette.length] }}
                                ></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                        {index.index_name}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Market Cap:</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {formatNumber(index.free_float_mcap)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">1Y Return:</span>
                                            <span className={`font-medium ${index.return_1y >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                {index.return_1y ? `${formatDecimal(index.return_1y * 100)}%` : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">P/E Ratio:</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {formatDecimal(index.pe)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">P/B Ratio:</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {formatDecimal(index.pb)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Dividend Yield:</span>
                                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                                {formatDecimal(index.dividend_yield * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleViewDetails(index)}
                                        className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Modal for detailed view */}
                <AnimatePresence>
                    {isModalOpen && selectedIndex && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            >
                                <div
                                    className="h-2 w-full"
                                    style={{ backgroundColor: selectedIndex.color || colorPalette[0] }}
                                ></div>
                                <div className="p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                            {selectedIndex.index_name} Constituents
                                        </h3>
                                        <button
                                            onClick={closeModal}
                                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{formatNumber(selectedIndex.free_float_mcap)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">P/E Ratio</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{formatDecimal(selectedIndex.pe)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">P/B Ratio</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{formatDecimal(selectedIndex.pb)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Div Yield</p>
                                            <p className="font-semibold text-gray-900 dark:text-gray-100">{formatDecimal(selectedIndex.dividend_yield * 100)}%</p>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-700">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Symbol</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price (₹)</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P/E</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Weight (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                {selectedIndex.constituents && selectedIndex.constituents.slice(0, 20).map((constituent, idx) => (
                                                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">{constituent.Symbol}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{constituent.CompanyName}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDecimal(constituent.Price)}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDecimal(constituent.PE)}</td>
                                                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{formatDecimal(constituent.WeightPct)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {selectedIndex.constituents && selectedIndex.constituents.length > 20 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                                            Showing top 20 of {selectedIndex.constituents.length} constituents
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MarketIndices;