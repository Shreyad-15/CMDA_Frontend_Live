// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import OpenCloseCards from "./OpenCloseCards";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';

// // const API_URL = process.env.REACT_APP_API_URL || "${VITE_URL}";


// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const stockRefs = useRef({}); // Store refs for each stock div
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]); // Clear results
//     initialQuery(""); // Clear query
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);

//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100); // Ensure the div is rendered first
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <div className='flex flex-row px-4 md:px-10"'>
//         <div  className="w-full max-w-7xl">
//           <div className="mt-20 md:mt-32 text-center px-4">
//             <h3 className="text-xl md:text-2xl font-bold mb-4">
//               <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//               <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//               <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//               mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//             </h3>
//           </div>

//           <div className="flex justify-center mt-5">
//             <div className="relative w-full md:w-1/2 max-w-lg m-5">
//               <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
             
//               <input
//                 type="text"
//                 className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Search for insights, data, or trends..."
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   fetchData(e.target.value);
//                 }}
//               />
// 	        <div className="flex flex-wrap gap-2 mt-2">
//                {selectedStocks.map((stock) => (
//                 <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                   {stock.symbol}
//                   <button
//                     className="ml-2 text-xl text-red-500 font-bold"
//                     onClick={() => removeStock(stock.symbol)}
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//               {results.length > 0 && (
//                 <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white" >
//                   <SearchList results={results} query={input} onSelectItem={handleSelectItem}  onClear={handleClearSearch}/>
//                 </div>
//               )}
//             </div>
//           </div>
//           </div>

//           <div className="w-full mt-6 flex justify-center px-4">
//   <div className="w-full max-w-4xl">
//     <SearchTutorial />
//   </div>

// </div>
//         </div>

//         <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//           {selectedStocks.map((stock) => (
//             <div
//               key={stock.symbol}
//               ref={(el) => (stockRefs.current[stock.symbol] = el)}
//               className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                 selectedStocks.length === 1 ? "w-full" : "w-auto"
//               }`}
//             >
//               <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                 <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mt-2">
//                 <strong>Basic Industry:</strong> {stock.basicIndustry}
//               </p>
//               <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//               <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
             
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import OpenCloseCards from "./OpenCloseCards";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [searchDone, setSearchDone] = useState(false); // New state to track if search is done
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//       setSearchDone(true); // Mark search as done if there is an initial query
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setSearchDone(false); // Reset search done when clearing the search
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setSearchDone(true); // Set search as done when results are fetched
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100);
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <div className={`flex flex-row px-4 md:px-10 ${searchDone ? "pt-5" : ""}`}>
//           <div className="w-full max-w-7xl">
//             {/* Conditionally render the quote section */}
          
//               <div className="mt-20 md:mt-32 text-center px-4">
//                 <h3 className="text-xl md:text-2xl font-bold mb-4">
//                   <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                   <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//                   <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//                   mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//                 </h3>
//               </div>
            

//             {/* Conditionally render the video section */}
//             {!searchDone && (
//               <div className="mt-6 flex justify-center px-4">
//                 <div className="w-full max-w-4xl">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}

//             {/* Conditionally render the search bar */}
//             <div className={`relative w-full md:w-1/2 max-w-lg m-5 ${searchDone ? "absolute top-0 left-0 w-full" : ""}`}>
//               <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//               <input
//                 type="text"
//                 className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Search for insights, data, or trends..."
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   fetchData(e.target.value);
//                 }}
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {selectedStocks.map((stock) => (
//                   <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                     {stock.symbol}
//                     <button
//                       className="ml-2 text-xl text-red-500 font-bold"
//                       onClick={() => removeStock(stock.symbol)}
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//               {results.length > 0 && (
//                 <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                   <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//           {selectedStocks.map((stock) => (
//             <div
//               key={stock.symbol}
//               ref={(el) => (stockRefs.current[stock.symbol] = el)}
//               className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                 selectedStocks.length === 1 ? "w-full" : "w-auto"
//               }`}
//             >
//               <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                 <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mt-2">
//                 <strong>Basic Industry:</strong> {stock.basicIndustry}
//               </p>
//               {/* <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} /> */}
//               <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />.
//     </div>
//   );
// };

// export default EquityHub;


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import { FaPlayCircle } from "react-icons/fa";
// import SearchTutorial from './SearchTutorial';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [searchDone, setSearchDone] = useState(false);
//   const [showVideo, setShowVideo] = useState(false); // New state to show video manually

//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//       setSearchDone(true);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setSearchDone(false);
//     setShowVideo(false); // Hide video when clearing search
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setSearchDone(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100);
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <div className={`flex flex-row px-4 md:px-10 ${searchDone ? "pt-5" : ""}`}>
//           <div className="w-full max-w-7xl">

//             {/* Quote section */}
//             <div className="mt-20 md:mt-32 text-center px-4">
//               <h3 className="text-xl md:text-2xl font-bold mb-4">
//                 <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                 <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//                 <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//                 mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//               </h3>
//             </div>

//             {/* Video tutorial or play button */}
//             {!searchDone || showVideo ? (
//               <div className="mt-6 flex justify-center px-4">
//                 <div className="w-full max-w-4xl">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             ) : searchDone && !showVideo ? (
//               <div className="flex justify-end px-4 mt-6">
//                 <button
//                   className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-800 transition"
//                   onClick={() => setShowVideo(true)}
//                 >
//                   <FaPlayCircle size={20} />
//                   Watch Tutorial
//                 </button>
//               </div>
//             ) : null}

//             {/* Search bar */}
//             <div className={`relative w-full md:w-1/2 max-w-lg m-5 ${searchDone ? "absolute top-0 left-0 w-full" : ""}`}>
//               <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//               <input
//                 type="text"
//                 className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Search for insights, data, or trends..."
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   fetchData(e.target.value);
//                 }}
//               />
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {selectedStocks.map((stock) => (
//                   <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                     {stock.symbol}
//                     <button
//                       className="ml-2 text-xl text-red-500 font-bold"
//                       onClick={() => removeStock(stock.symbol)}
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//               {results.length > 0 && (
//                 <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                   <SearchList
//                     results={results}
//                     query={input}
//                     onSelectItem={handleSelectItem}
//                     onClear={handleClearSearch}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Selected stock cards */}
//         <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//           {selectedStocks.map((stock) => (
//             <div
//               key={stock.symbol}
//               ref={(el) => (stockRefs.current[stock.symbol] = el)}
//               className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                 selectedStocks.length === 1 ? "w-full" : "w-auto"
//               }`}
//             >
//               <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                 <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mt-2">
//                 <strong>Basic Industry:</strong> {stock.basicIndustry}
//               </p>
//               <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;

// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import { FaPlayCircle } from "react-icons/fa";
// import SearchTutorial from './SearchTutorial';
// import { useNavigate } from "react-router-dom";

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [searchDone, setSearchDone] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);

//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//       setSearchDone(true);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setSearchDone(false);
//     setShowVideo(false);
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setSearchDone(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100);
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//       <div className="w-full flex justify-center mt-24">
//   <button
//     className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
//     onClick={() => navigate("/mysearch")}
//   >
//     My Search
//   </button>
// </div>
//         <div className="flex flex-row px-4 md:px-10">
       
//           <div className="w-full max-w-7xl">


//             {/* Flex layout for quote/search and video side by side */}
//             <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-20 md:mt-32 px-4">
//               {/* Left Column */}
//               <div className="w-full md:w-1/2">
//                 {/* Quote */}
//                 <div className="mb-6 text-left">
//                   <h3 className="text-xl md:text-2xl font-bold mb-4">
//                     <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                     <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//                     <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//                     mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//                   </h3>
//                 </div>

//                 {/* Search */}
//                 <div className="relative w-full max-w-lg">
//                   <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//                   <input
//                     type="text"
//                     className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Search for insights, data, or trends..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value);
//                     }}
//                   />
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {selectedStocks.map((stock) => (
//                       <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                         {stock.symbol}
//                         <button
//                           className="ml-2 text-xl text-red-500 font-bold"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                   {results.length > 0 && (
//                     <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                       <SearchList
//                         results={results}
//                         query={input}
//                         onSelectItem={handleSelectItem}
//                         onClear={handleClearSearch}
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Right Column: Tutorial */}
//               <div className="w-full md:w-1/2 flex justify-center items-center top-0">
//                 {!searchDone || showVideo ? (
//                   <div className="w-full max-w-md top-0">
//                     <SearchTutorial />
//                   </div>
//                 ) : (
//                   <div className="flex justify-center mt-6 w-full">
//                     <button
//                       className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-800 transition"
//                       onClick={() => setShowVideo(true)}
//                     >
//                       <FaPlayCircle size={20} />
//                       Watch Tutorial
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Selected stock cards */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-4 mt-10`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${selectedStocks.length === 1 ? "w-full" : "w-auto"}`}
//                 >
//                   <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2>
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;




// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Myserach';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";

//   // Authentication logic extracted from AvgBoxPlots.jsx
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       return;
//     }
//     try {
//       // Debug localStorage contents
//       console.log("localStorage keys:", Object.keys(localStorage));
//       const token = getAuthToken();
//       console.log("Auth Token for search:", token || "No token found");

//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       return;
//     }

//     try {
//       // Debug localStorage contents
//       console.log("localStorage keys:", Object.keys(localStorage));
//       const token = getAuthToken();
//       console.log("Auth Token for select:", token || "No token found");

//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <div className="flex flex-row px-4 md:px-10">
//           <div className="w-full max-w-7xl">
//             <div className="mt-20 md:mt-32 text-center px-4">
//               <h3 className="text-xl md:text-2xl font-bold mb-4">
//                 <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                 <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//                 <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//                 mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//               </h3>
//             </div>

//             <div className="flex justify-center mt-5">
//               <div className="relative w-full md:w-1/2 max-w-lg m-5">
//                 <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
                
//                 {error && (
//                   <div className="text-center text-red-500 mb-4">
//                     {error}
//                   </div>
//                 )}

//                 <input
//                   type="text"
//                   className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Search for insights, data, or trends..."
//                   value={input}
//                   onChange={(e) => {
//                     setInput(e.target.value);
//                     fetchData(e.target.value, false);
//                   }}
//                 />
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {selectedStocks.map((stock) => (
//                     <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                       {stock.symbol} - {stock.companyName}
//                       <button
//                         className="ml-2 text-xl text-red-500 font-bold"
//                         onClick={() => removeStock(stock.symbol)}
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//                 {results.length > 0 && (
//                   <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                     <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="w-full mt-6 flex justify-center px-4">
//             <div className="w-full max-w-4xl">
//               <SearchTutorial />
//             </div>
//           </div>
//         </div>

//         <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//           {selectedStocks.map((stock) => (
//             <div
//               key={stock.symbol}
//               ref={(el) => (stockRefs.current[stock.symbol] = el)}
//               className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                 selectedStocks.length === 1 ? "w-full" : "w-auto"
//               }`}
//             >
//               <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                 <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mt-2">
//                 <strong>Basic Industry:</strong> {stock.basicIndustry}
//               </p>
//               <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//             </div>
//           ))}
//         </div>
    
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;












// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import { FaPlayCircle } from "react-icons/fa";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Myserach';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [searchDone, setSearchDone] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'

//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//       setSearchDone(true);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setSearchDone(false);
//     setShowVideo(false);
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setSearchDone(true);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100);
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {/* Conditional tab content */}
//         {activeTab === "hub" ? (
//           <div className="flex flex-row px-4 mt-0 md:px-10">
//             <div className="w-full max-w-7xl">
//               {/* Layout */}
//               <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-0 md:mt-12 px-4">
//                 {/* Left Column */}
//                 <div className="w-full md:w-1/2">
//                   <div className="mb-6 text-left">
//                     <h3 className="text-xl md:text-2xl font-bold mb-4">
//                       <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                       <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//                       <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//                       mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//                     </h3>
//                   </div>

//                   <div className="relative w-full max-w-lg">
//                     <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//                     <input
//                       type="text"
//                       className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Search for insights, data, or trends..."
//                       value={input}
//                       onChange={(e) => {
//                         setInput(e.target.value);
//                         fetchData(e.target.value);
//                       }}
//                     />
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {selectedStocks.map((stock) => (
//                         <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                           {stock.symbol}
//                           <button
//                             className="ml-2 text-xl text-red-500 font-bold"
//                             onClick={() => removeStock(stock.symbol)}
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                     {results.length > 0 && (
//                       <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                         <SearchList
//                           results={results}
//                           query={input}
//                           onSelectItem={handleSelectItem}
//                           onClear={handleClearSearch}
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column: Tutorial */}
//                 <div className="w-full md:w-1/2 flex justify-center items-center top-0">
//                   {!searchDone || showVideo ? (
//                     <div className="w-full p-0 top-0 mt-0">
//                       <SearchTutorial />
//                     </div>
//                   ) : (
//                     <div className="flex justify-center mt-6 w-full">
//                       <button
//                         className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-800 transition"
//                         onClick={() => setShowVideo(true)}
//                       >
//                         <FaPlayCircle size={20} />
//                         Watch Tutorial
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Selected stock cards */}
//               <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-4 mt-10`}>
//                 {selectedStocks.map((stock) => (
//                   <div
//                     key={stock.symbol}
//                     ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                     className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${selectedStocks.length === 1 ? "w-full" : "w-auto"}`}
//                   >
//                     <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                       <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                     </h2>
//                     <p className="text-gray-700 dark:text-gray-300 mt-2">
//                       <strong>Basic Industry:</strong> {stock.basicIndustry}
//                     </p>
//                     <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                     <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <Mysearch />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import OpenCloseCards from "./OpenCloseCards";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';

// // const API_URL = process.env.REACT_APP_API_URL || "${VITE_URL}";


// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const stockRefs = useRef({}); // Store refs for each stock div
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]); // Clear results
//     initialQuery(""); // Clear query
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);

//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     if (!symbol) return;
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];

//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100); // Ensure the div is rendered first
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         <div className='flex flex-row px-4 md:px-10"'>
//         <div  className="w-full max-w-7xl">
//           <div className="mt-20 md:mt-32 text-center px-4">
//             <h3 className="text-xl md:text-2xl font-bold mb-4">
//               <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//               <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are 
//               <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism, 
//               mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//             </h3>
//           </div>

//           <div className="flex justify-center mt-5">
//             <div className="relative w-full md:w-1/2 max-w-lg m-5">
//               <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
             
//               <input
//                 type="text"
//                 className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Search for insights, data, or trends..."
//                 value={input}
//                 onChange={(e) => {
//                   setInput(e.target.value);
//                   fetchData(e.target.value);
//                 }}
//               />
// 	        <div className="flex flex-wrap gap-2 mt-2">
//                {selectedStocks.map((stock) => (
//                 <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                   {stock.symbol}
//                   <button
//                     className="ml-2 text-xl text-red-500 font-bold"
//                     onClick={() => removeStock(stock.symbol)}
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//               {results.length > 0 && (
//                 <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white" >
//                   <SearchList results={results} query={input} onSelectItem={handleSelectItem}  onClear={handleClearSearch}/>
//                 </div>
//               )}
//             </div>
//           </div>
//           </div>

//           <div className="w-full mt-6 flex justify-center px-4">
//   <div className="w-full max-w-4xl">
//     <SearchTutorial />
//   </div>

// </div>
//         </div>

//         <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//           {selectedStocks.map((stock) => (
//             <div
//               key={stock.symbol}
//               ref={(el) => (stockRefs.current[stock.symbol] = el)}
//               className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                 selectedStocks.length === 1 ? "w-full" : "w-auto"
//               }`}
//             >
//               <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                 <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//               </h2>
//               <p className="text-gray-700 dark:text-gray-300 mt-2">
//                 <strong>Basic Industry:</strong> {stock.basicIndustry}
//               </p>
//               <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//               <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
             
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;








// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Myserach';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'

//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";

//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       return;
//     }
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Quote Section */}
//             <div className="flex flex-row px-4 md:px-10">
//               <div className="w-full max-w-7xl">
//                 <div className="mt-20 md:mt-32 text-center px-4">
//                   <h3 className="text-xl md:text-2xl font-bold mb-4">
//                     <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//                     <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//                     <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//                     mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//                   </h3>
//                 </div>

//                 {/* Search Input */}
//                 <div className="flex justify-center mt-5">
//                   <div className="relative w-full md:w-1/2 max-w-lg m-5">
//                     <h3 className="my-10 text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>

//                     {error && (
//                       <div className="text-center text-red-500 mb-4">{error}</div>
//                     )}

//                     <input
//                       type="text"
//                       className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Search for insights, data, or trends..."
//                       value={input}
//                       onChange={(e) => {
//                         setInput(e.target.value);
//                         fetchData(e.target.value, false);
//                       }}
//                     />

//                     {/* Selected Tags */}
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {selectedStocks.map((stock) => (
//                         <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                           {stock.symbol} - {stock.companyName}
//                           <button
//                             className="ml-2 text-xl text-red-500 font-bold"
//                             onClick={() => removeStock(stock.symbol)}
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>

//                     {/* Search Result Dropdown */}
//                     {results.length > 0 && (
//                       <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                         <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Right-side Tutorial */}
//               <div className="w-full mt-6 flex justify-center px-4">
//                 <div className="w-full max-w-4xl">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             </div>

//             {/* Graph Section */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                     selectedStocks.length === 1 ? "w-full" : "w-auto"
//                   }`}
//                 >
//                   <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2>
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <Mysearch />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import { FaPlayCircle } from "react-icons/fa";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Myserach';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [searchDone, setSearchDone] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [activeTab, setActiveTab] = useState("hub");

//   const stockRefs = useRef({});
//   const searchRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Run search from URL param
//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//       setSearchDone(true);
//       scrollToSearch();
//     }
//   }, [initialQuery]);

//   // Debounced input search
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (input.trim()) {
//         fetchData(input);
//       } else {
//         setResults([]);
//       }
//     }, 300);
//     return () => clearTimeout(delayDebounce);
//   }, [input]);

//   const fetchData = async (value) => {
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${value}`);
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setSearchDone(true);
//       scrollToSearch();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setSearchDone(false);
//     setShowVideo(false);
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (!selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       fetchStockDetails(item.symbol);
//     }
//   };

//   const fetchStockDetails = async (symbol) => {
//     try {
//       const response = await axios.get(`${API_BASE}/api/stocks/search?query=${symbol}`);
//       const newStock = response.data[0];
//       setSelectedStocks((prevStocks) => {
//         const updatedStocks = [...prevStocks, newStock];
//         setTimeout(() => scrollToStock(newStock.symbol), 100);
//         return updatedStocks;
//       });
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const scrollToSearch = () => {
//     if (searchRef.current) {
//       searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {/* Conditional tab content */}
//         {/* // (Only showing the updated portion inside `activeTab === "hub"` tab) */}

// {activeTab === "hub" ? (
//   <div className="flex flex-col px-4 md:px-10">
//     <div ref={searchRef} className="mt-10 md:mt-12 flex flex-col md:flex-row gap-8">
//       {/* Left Side: Quote + Search */}
//       <div className="md:w-1/2">
//         {!searchDone && (
//           <div className="mb-6 text-left">
//             <h3 className="text-xl md:text-2xl font-bold mb-4">
//               <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//               <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//               <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//               mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//             </h3>
//           </div>
//         )}

//         {/* Search Input */}
//         <div className="relative w-full">
//           <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//           <input
//             type="text"
//             className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Search for insights, data, or trends..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <div className="flex flex-wrap gap-2 mt-2">
//             {selectedStocks.map((stock) => (
//               <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                 {stock.symbol}
//                 <button
//                   className="ml-2 text-xl text-red-500 font-bold"
//                   onClick={() => removeStock(stock.symbol)}
//                 >
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//           {results.length > 0 && (
//             <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//               <SearchList
//                 results={results}
//                 query={input}
//                 onSelectItem={handleSelectItem}
//                 onClear={handleClearSearch}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Side: Video or Button */}
//       <div className="md:w-1/2 flex justify-center items-start mt-4 md:mt-0">
//         {(!searchDone || showVideo) ? (
//           <div className="w-full">
//             <SearchTutorial />
//           </div>
//         ) : (
//           <button
//             className="flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-800 transition"
//             onClick={() => setShowVideo(true)}
//           >
//             <FaPlayCircle size={20} />
//             Watch Tutorial
//           </button>
//         )}
//       </div>
//     </div>

//     {/* Stock Cards */}
//     <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-4 mt-10`}>
//       {selectedStocks.map((stock) => (
//         <div
//           key={stock.symbol}
//           ref={(el) => (stockRefs.current[stock.symbol] = el)}
//           className="dark:bg-slate-800 p-6 dark:border-gray-600"
//         >
//           <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//             <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//           </h2>
//           <p className="text-gray-700 dark:text-gray-300 mt-2">
//             <strong>Basic Industry:</strong> {stock.basicIndustry}
//           </p>
//           <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//           <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//         </div>
//       ))}
//     </div>
//   </div>
// ) : (
//   <My />
// )}

//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]); // Only for EquityHub search
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'
   
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";


//   const [hasSearched, setHasSearched] = useState(false);
// const [showVideo, setShowVideo] = useState(false);


//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//         setHasSearched(false);
//       return;
//     }
//      setHasSearched(true); 
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Quote Section */}

//        <div
//   className={`w-full px-4 md:px-10 transition-all duration-500 ${
//     hasSearched
//       ? 'fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-300 dark:border-slate-700 py-4 shadow-md'
//       : 'mt-5 md:mt-5'
//   }`}
// >


//   <div className="w-full max-w-7xl mx-auto">
//     {/* Quote */}
//     <div className="text-center mb-4">
//       <h3 className="text-sm md:text-lg font-semibold leading-snug">
//         <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={30} />
//         <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//         <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//         mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//       </h3>
//     </div>

//     {/* Search Input */}
//     <div className="relative w-full md:w-1/2 max-w-lg mx-auto">
//       {!hasSearched && (
//         <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//       )}

//       {error && <div className="text-center text-red-500 mb-2">{error}</div>}

//       <input
//         type="text"
//         className="dark:bg-slate-800 dark:text-white w-full px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Search for insights, data, or trends..."
//         value={input}
//         onChange={(e) => {
//           setInput(e.target.value);
//           fetchData(e.target.value, false);
//         }}
//       />

//       {/* Tags */}
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedStocks.map((stock) => (
//           <span key={stock.symbol} className="flex items-center bg-gray-600 text-white text-sm px-3 py-1 rounded-full">
//             {stock.symbol} - {stock.companyName}
//             <button
//               className="ml-2 text-red-400 hover:text-red-600 font-bold"
//               onClick={() => removeStock(stock.symbol)}
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>

//       {/* Result Dropdown */}
//       {results.length > 0 && (
//         <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white bg-white border border-gray-300 rounded-md shadow-lg">
//           <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//         </div>
//       )}
//     </div>
//   </div>
// </div>


//               {/* Right-side Tutorial */}
//         {/* Video or Play Icon */}
// <div className="w-full mt-6 flex justify-center px-4">
//   <div className="w-full max-w-4xl text-center">
//     {!hasSearched ? (
//       <SearchTutorial />
//     ) : (
//       <>
//         {!showVideo ? (
//           <button
//             onClick={() => setShowVideo(true)}
//             className="text-cyan-700 text-2xl underline hover:text-cyan-500"
//           >
//             ▶️ Watch Tutorial
//           </button>
//         ) : (
//           <SearchTutorial />
//         )}
//       </>
//     )}
//   </div>
// </div>

           

//             {/* Graph Section */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                     selectedStocks.length === 1 ? "w-full" : "w-auto"
//                   }`}
//                 >
//                   <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2>
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} /> 
                 
//                   <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>

//           </>
//         ) : (
//           <Mysearch
//             API_BASE={API_BASE}
//             getAuthToken={getAuthToken}
//           />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]); // Only for EquityHub search
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'
   
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";


//   const [hasSearched, setHasSearched] = useState(false);
// const [showVideo, setShowVideo] = useState(false);


//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//         setHasSearched(false);
//       return;
//     }
//      setHasSearched(true); 
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Quote Section */}

//    <div className="w-full px-4 md:px-10 mt-5 md:mt-5">


//   <div className="w-full max-w-7xl mx-auto">
//     {/* Quote */}
//     <div className="text-center mb-4">
//       <h3 className="text-sm md:text-lg font-semibold leading-snug">
//         <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={30} />
//         <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//         <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//         mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//       </h3>
//     </div>

//     {/* Search Input */}
//     <div className="relative w-full md:w-1/2 max-w-lg mx-auto">
//       {!hasSearched && (
//         <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//       )}

//       {error && <div className="text-center text-red-500 mb-2">{error}</div>}

//       <input
//         type="text"
//         className="dark:bg-slate-800 dark:text-white w-full px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Search for insights, data, or trends..."
//         value={input}
//         onChange={(e) => {
//           setInput(e.target.value);
//           fetchData(e.target.value, false);
//         }}
//       />

//       {/* Tags */}
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedStocks.map((stock) => (
//           <span key={stock.symbol} className="flex items-center bg-gray-600 text-white text-sm px-3 py-1 rounded-full">
//             {stock.symbol} - {stock.companyName}
//             <button
//               className="ml-2 text-red-400 hover:text-red-600 font-bold"
//               onClick={() => removeStock(stock.symbol)}
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>

//       {/* Result Dropdown */}
//       {results.length > 0 && (
//         <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white bg-white border border-gray-300 rounded-md shadow-lg">
//           <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//         </div>
//       )}
//     </div>
//   </div>
// </div>



//               {/* Right-side Tutorial */}
//         {/* Video or Play Icon */}
// <div className="w-full mt-6 flex justify-center px-4">
//   <div className="w-full max-w-4xl text-center">
//     {!hasSearched ? (
//       <SearchTutorial />
//     ) : (
//       <>
//         {!showVideo ? (
//           <button
//             onClick={() => setShowVideo(true)}
//             className="text-cyan-700 text-2xl underline hover:text-cyan-500"
//           >
//             ▶️ Watch Tutorial
//           </button>
//         ) : (
//           <SearchTutorial />
//         )}
//       </>
//     )}
//   </div>
// </div>

           

           

//             {/* Graph Section */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                     selectedStocks.length === 1 ? "w-full" : "w-auto"
//                   }`}
//                 >
//                   <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2>
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} /> 
                 
//                   <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>

//           </>
//         ) : (
//           <Mysearch
//             API_BASE={API_BASE}
//             getAuthToken={getAuthToken}
//           />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;






// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import { FaPlayCircle } from "react-icons/fa";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';


// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]); // Only for EquityHub search
//   const [error, setError] = useState(null);
//   const [searchDone, setSearchDone] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'

//   const stockRefs = useRef({});
//    const searchRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";

//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//       setSearchDone(true);
//          scrollToSearch();
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//      setSearchDone(false);
//     setShowVideo(false);
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setSearchDone(true);
//       scrollToSearch();
//       return;
//     }
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };
//   const scrollToSearch = () => {
//     if (searchRef.current) {
//       searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };
//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Quote Section */}
//              <div className="flex flex-col px-4 md:px-10">
//     <div ref={searchRef} className="mt-10 md:mt-12 flex flex-col md:flex-row gap-8">
//       {/* Left Side: Quote + Search */}
//       <div className="md:w-1/2">
//         {!searchDone && (
//           <div className="mb-6 text-left">
//             <h3 className="text-xl md:text-2xl font-bold mb-4">
//               <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={40} />
//               <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//               <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//               mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//             </h3>
//           </div>
//         )}

//                 {/* Search Input */}
//                <div className="relative w-full">
//           <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
        
//                     {error && (
//                       <div className="text-center text-red-500 mb-4">{error}</div>
//                     )}

//                     <input
//                       type="text"
//                       className="dark:bg-slate-800 dark:text-white w-full mb-2 px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Search for insights, data, or trends..."
//                       value={input}
//                       onChange={(e) => {
//                         setInput(e.target.value);
//                         fetchData(e.target.value, false);
//                       }}
//                     />

//                     {/* Selected Tags */}
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {selectedStocks.map((stock) => (
//                         <span key={stock.symbol} className="flex items-center m-1 bg-gray-600 text-xl text-white p-1 rounded-lg">
//                           {stock.symbol} - {stock.companyName}
//                           <button
//                             className="ml-2 text-xl text-red-500 font-bold"
//                             onClick={() => removeStock(stock.symbol)}
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>

//                     {/* Search Result Dropdown */}
//                     {results.length > 0 && (
//                       <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white">
//                         <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                       </div>
//                     )}
                  
//                 </div>
//               </div>

//               {/* Right-side Tutorial */}
//               <div className="md:w-1/2 flex justify-center items-start mt-4 md:mt-0">
//         {(!searchDone || showVideo) ? (
//           <div className="w-full">
//             <SearchTutorial />
//           </div>
//         ) : (
//           <button
//             className="tutorial-watch-button flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-full hover:bg-cyan-800 transition"
//             onClick={() => setShowVideo(true)}
//           >
//             <FaPlayCircle size={20} />
//             Watch Tutorial
//           </button>
//         )}
//       </div>

//             </div>

//             {/* Graph Section */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 px-10`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                     selectedStocks.length === 1 ? "w-full" : "w-auto"
//                   }`}
//                 >
//                   <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2>
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} /> 
                 
//                   <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>
//             </div>
//           </>
//         ) : (
//           <Mysearch
//             API_BASE={API_BASE}
//             getAuthToken={getAuthToken}
//           />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;






//------------------------------------------myworkingcode----------------------------------


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';



// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";
//   const [hasSearched, setHasSearched] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]); // Only for EquityHub search
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub"); // 'hub' or 'search'
   
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;





//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//         setHasSearched(false);
//       return;
//     }
//      setHasSearched(true); 
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to search for stocks. No auth token found in localStorage.");
//       }

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);

//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         throw new Error("Please log in to select and save stocks. No auth token found in localStorage.");
//       }

//       const shouldSave = window.confirm(
//         `Would you like to save the stock ${item.symbol} - ${item.companyName} to your database?`
//       );

//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: item.symbol, shouldSave: shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prevStocks) => {
//           const updatedStocks = [...prevStocks, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updatedStocks;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", error);
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   return (
//     <div>
//       <Navbar />
//       <main>
//         {/* Tabs */}
//         <div className="w-full flex justify-center mt-24">
//           <div className="flex space-x-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-full">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "hub"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("hub")}
//             >
//               Equity Hub
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold shadow-md transition ${
//                 activeTab === "search"
//                   ? "bg-cyan-600 text-white"
//                   : "bg-white dark:bg-slate-900 text-black hover:bg-gray-100 dark:hover:bg-slate-800"
//               }`}
//               onClick={() => setActiveTab("search")}
//             >
//               My Search
//             </button>
//           </div>
//         </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Quote Section */}

//    <div className="w-full px-4 md:px-10 mt-5 md:mt-5">


//   <div className="w-full max-w-7xl mx-auto">
//     {/* Quote */}
//     <div className="text-center mb-4">
//       <h3 className="text-sm md:text-lg font-semibold leading-snug">
//         <BsQuote className="inline-block text-gray-500 dark:text-gray-400 mr-2" size={30} />
//         <span className="text-cyan-700">Franklin Templeton</span> - "Bulls are
//         <span className="text-cyan-700"> born</span> out of pessimism, grow on skepticism,
//         mature on optimism and <span className="text-cyan-700"> die</span> in euphoria."
//       </h3>
//     </div>

//     {/* Search Input */}
//     <div className="relative w-full md:w-1/2 max-w-lg mx-auto">
//       {!hasSearched && (
//         <h3 className="text-lg md:text-2xl font-bold mb-4">Search and Compare NSE Stocks</h3>
//       )}

//       {error && <div className="text-center text-red-500 mb-2">{error}</div>}

//       <input
//         type="text"
//         className="dark:bg-slate-800 dark:text-white w-full px-6 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Search for insights, data, or trends..."
//         value={input}
//         onChange={(e) => {
//           setInput(e.target.value);
//           fetchData(e.target.value, false);
//         }}
//       />

//       {/* Tags */}
//       <div className="flex flex-wrap gap-2 mt-2">
//         {selectedStocks.map((stock) => (
//           <span key={stock.symbol} className="flex items-center bg-gray-600 text-white text-sm px-3 py-1 rounded-full">
//             {stock.symbol} - {stock.companyName}
//             <button
//               className="ml-2 text-red-400 hover:text-red-600 font-bold"
//               onClick={() => removeStock(stock.symbol)}
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>

//       {/* Result Dropdown */}
//       {results.length > 0 && (
//         <div className="absolute mt-2 w-full z-50 dark:bg-slate-800 dark:text-white bg-white border border-gray-300 rounded-md shadow-lg">
//           <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//         </div>
//       )}
//     </div>
//   </div>
// </div>



//               {/* Right-side Tutorial */}
//         {/* Video or Play Icon */}
// <div className="w-full mt-6 flex justify-center px-4">
//   <div className="w-full max-w-4xl text-center">
//     {!hasSearched ? (
//       <SearchTutorial />
//     ) : (
//       <>
//         {!showVideo ? (
//           <button
//             onClick={() => setShowVideo(true)}
//             className="text-cyan-700 text-2xl underline hover:text-cyan-500"
//           >
//             ▶️ Watch Tutorial
//           </button>
//         ) : (
//           <SearchTutorial />
//         )}
//       </>
//     )}
//   </div>
// </div>

           

           

//             {/* Graph Section */}
//             <div className={`grid w-full ${selectedStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
//               {selectedStocks.map((stock) => (
//                 <div
//                   key={stock.symbol}
//                   ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                   className={`dark:bg-slate-800 p-6 dark:border-gray-600 ${
//                     selectedStocks.length === 1 ? "w-full" : "w-auto"
//                   }`}
//                 >
//                   {/* <h2 className="text-lg md:text-2xl font-bold text-cyan-700">
//                     <span className="text-black">{stock.symbol}</span> - {stock.companyName}
//                   </h2> */}
//                   <p className="text-gray-700 dark:text-gray-300 mt-2">
//                     <strong>Basic Industry:</strong> {stock.basicIndustry}
//                   </p>
//                   <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} /> 
                 
//                   <GraphSlider symbol={stock.symbol} companyName={stock.companyName} isFullWidth={selectedStocks.length === 1} />
//                 </div>
//               ))}
//             </div>

//           </>
//         ) : (
//           <Mysearch
//             API_BASE={API_BASE}
//             getAuthToken={getAuthToken}
//           />
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;


//--------------------------------------------------------------------------------------------



//---------------------------------shravani-------------------------------------------------------




// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote, BsPlayFill } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";

//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [pendingStock, setPendingStock] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);

//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const getAuthToken = () => localStorage.getItem("authToken");

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to search for stocks.");
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave},
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     setPendingStock(item);
//     setModalVisible(true);
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   };

//   const handleModalChoice = async (choice) => {
//     setModalVisible(false);
//     if (!pendingStock || choice === 'cancel') return;
//     const shouldSave = choice === 'yes';
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to select and save stocks.");
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: pendingStock.symbol, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     } finally {
//       setPendingStock(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         {/* Header: Tabs and Video Toggle */}
//        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//   <div className="flex flex-col items-center gap-4">
//     {/* Tabs */}
//     <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//       {[
//         { key: 'hub', label: 'Equity Hub' },
//         { key: 'search', label: 'My Search' },
//       ].map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => setActiveTab(tab.key)}
//           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
//             activeTab === tab.key
//               ? 'bg-cyan-600 text-white shadow-sm'
//               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>

//     {/* Centered Button */}
//     {hasSearched && (
//       <div className="flex justify-center">
//         <button
//           onClick={() => setShowVideo(!showVideo)}
//           className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
//         >
//           {showVideo ? 'Hide Tutorial' : 'Show Tutorial'}
//           {showVideo ? '✕' : <BsPlayFill size={16} />}
//         </button>
//       </div>
//     )}
//   </div>
// </div>

//         {activeTab === "hub" ? (
//           <>
//             {/* Search Section */}
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value, false);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4">
//                     {selectedStocks.map((stock) => (
//                       <span key={stock.symbol} className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full">
//                         {stock.symbol}
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//               <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                 <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                 <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                   “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” — <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                 </p>
//               </div>
//             </div>
//               </div>
//             </div>

//             {/* Video Tutorial Section */}
//             {hasSearched && showVideo && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}

//             {/* Quote Section */}
          

//             {/* Graphs Section */}
//             {selectedStocks.length > 0 && (
//               <div className=" mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//                 <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                   {selectedStocks.map((stock) => (
//                     <div
//                       key={stock.symbol}
//                       ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                       className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                     >
//                       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                         {stock.symbol} - {stock.companyName}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                         <strong>Industry:</strong> {stock.basicIndustry}
//                       </p>
//                       <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                       <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//      http://localhost:8080";

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const getAuthToken = () => localStorage.getItem("authToken");

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to search for stocks.");
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setError(null);
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//      if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }
//     setPendingStock(item);
//     setModalVisible(true);
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//   setCompareMode(false);
//   };

//   const handleModalChoice = async (choice) => {
//     setModalVisible(false);
//     if (!pendingStock || choice === 'cancel') return;
//     const shouldSave = choice === 'yes';
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to select and save stocks.");
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: pendingStock.symbol, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     } finally {
//       setPendingStock(null);
//     }
//   };
//     const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         {/* Header: Tabs and Video Toggle */}
//        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//   <div className="flex flex-col items-center gap-4">
//     {/* Tabs */}
//     <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//       {[
//         { key: 'hub', label: 'Equity Hub' },
//         { key: 'search', label: 'My Search' },
//       ].map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => setActiveTab(tab.key)}
//           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
//             activeTab === tab.key
//               ? 'bg-cyan-600 text-white shadow-sm'
//               : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>

//     {/* Centered Button */}
//     {hasSearched && (
//       <div className="flex justify-center">
//         <button
//           onClick={() => setShowVideo(!showVideo)}
//           className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
//         >
//           {showVideo ? 'Hide Tutorial' : 'Show Tutorial'}
//           {showVideo ? '✕' : <BsPlayFill size={16} />}
//         </button>
//       </div>
//     )}
//   </div>
// </div>

//         {activeTab === "hub" ? (
//           <>


//               <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value, false);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span key={stock.symbol} className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full">
//                         {stock.symbol} ({stock.basicIndustry})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” — <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Video Tutorial Section */}
//             {hasSearched && showVideo && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}

//             {/* Quote Section */}
//              {compareMode && selectedStocks.length === 2 && (
//               <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//                 <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                   </h2>
//                   <div className="flex items-center gap-4">
//                     <select
//                       value={graphMode}
//                       onChange={(e) => setGraphMode(e.target.value)}
//                       className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
//                     >
//                       <option value="side-by-side">Side by Side</option>
//                       <option value="overlay">Overlay</option>
//                     </select>
//                     <button
//                       onClick={() => setCompareMode(false)}
//                       className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-cyan-600 text-sm"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex-1 p- overflow-auto">
//                   {graphMode === "side-by-side" ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedStocks.map((stock) => (
//                         <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                       {selectedStocks.map((stock) => (
//                         <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                             overlay={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
          
//             {/* Graphs Section */}
//             {!compareMode && selectedStocks.length > 0 && (
//               <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//                 <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                   {selectedStocks.map((stock) => (
//                     <div
//                       key={stock.symbol}
//                       ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                       className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                     >
//                       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                         {stock.symbol} - {stock.companyName}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                         <strong>Industry:</strong> {stock.basicIndustry}
//                       </p>
//                       <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                       <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} timeRange={timeRange} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className=" px-4 sm:px-6 lg:px-8 mt-8">
//             <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//           </div>
//         )}

//         {/* Modal */}
//        {modalVisible && pendingStock && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-200 dark:border-slate-700">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
//                 Save <span className="text-cyan-600">{pendingStock.symbol}</span> to your database?
//               </h2>
//               <div className="flex justify-center gap-3">
//                 <button
//                   className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
//                   onClick={() => handleModalChoice('yes')}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
//                   onClick={() => handleModalChoice('no')}
//                 >
//                   No
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//                   onClick={() => handleModalChoice('cancel')}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote, BsPlayFill } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("query") || "";
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [pendingStock, setPendingStock] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [graphMode, setGraphMode] = useState("side-by-side");
//   const [timeRange, setTimeRange] = useState("1Y");
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const getAuthToken = () => localStorage.getItem("authToken");

//   const getCachedData = (key) => {
//     const cached = localStorage.getItem(key);
//     if (!cached) return null;
//     const { data, timestamp } = JSON.parse(cached);
//     if (Date.now() - timestamp > CACHE_TTL) {
//       localStorage.removeItem(key);
//       return null;
//     }
//     return data;
//   };

//   const setCachedData = (key, data) => {
//     localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults && !shouldSave) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to search for stocks.");
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: value, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setCachedData(cacheKey, filteredResults);
//       setError(null);
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }
//     setPendingStock(item);
//     setModalVisible(true);
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//     setCompareMode(false);
//   };

//   const handleModalChoice = async (choice) => {
//     setModalVisible(false);
//     if (!pendingStock || choice === 'cancel') return;
//     const shouldSave = choice === 'yes';
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to select and save stocks.");
//       const cacheKey = `stock_${pendingStock.symbol}`;
//       const cachedStock = getCachedData(cacheKey);
//       if (cachedStock && !shouldSave) {
//         setSelectedStocks((prev) => {
//           const updated = [...prev, cachedStock];
//           setTimeout(() => scrollToStock(cachedStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//         return;
//       }
//       const response = await axios.get(`${API_BASE}/api/stocks/search`, {
//         params: { query: pendingStock.symbol, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setCachedData(cacheKey, newStock);
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     } finally {
//       setPendingStock(null);
//     }
//   };

//   const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//           <div className="flex flex-col items-center gap-4">
//             <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//               {[{ key: 'hub', label: 'Equity Hub' }, { key: 'search', label: 'My Search' }].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
//                     activeTab === tab.key
//                       ? 'bg-cyan-600 text-white shadow-sm'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//             {hasSearched && (
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setShowVideo(!showVideo)}
//                   className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
//                 >
//                   {showVideo ? 'Hide Tutorial' : 'Show Tutorial'}
//                   {showVideo ? '✕' : <BsPlayFill size={16} />}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {activeTab === "hub" ? (
//           <>
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value, false);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span key={stock.symbol} className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full">
//                         {stock.symbol} ({stock.basicIndustry})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” — <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {hasSearched && showVideo && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}
//             {compareMode && selectedStocks.length === 2 && (
//               <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//                 <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                   </h2>
//                   <div className="flex items-center gap-4">
//                     <select
//                       value={graphMode}
//                       onChange={(e) => setGraphMode(e.target.value)}
//                       className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
//                     >
//                       <option value="side-by-side">Side by Side</option>
//                       <option value="overlay">Overlay</option>
//                     </select>
//                     <button
//                       onClick={() => setCompareMode(false)}
//                       className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-cyan-600 text-sm"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex-1 p-4 overflow-auto">
//                   {graphMode === "side-by-side" ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedStocks.map((stock) => (
//                         <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                       {selectedStocks.map((stock) => (
//                         <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                             overlay={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {!compareMode && selectedStocks.length > 0 && (
//               <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//                 <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                   {selectedStocks.map((stock) => (
//                     <div
//                       key={stock.symbol}
//                       ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                       className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                     >
//                       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                         {stock.symbol} - {stock.companyName}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                         <strong>Industry:</strong> {stock.basicIndustry}
//                       </p>
//                       <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                       <GraphSlider symbol={stock.symbol} isFullWidth={selectedStocks.length === 1} timeRange={timeRange} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="px-4 sm:px-6 lg:px-8 mt-8">
//             <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//           </div>
//         )}
//         {modalVisible && pendingStock && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-200 dark:border-slate-700">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
//                 Save <span className="text-cyan-600">{pendingStock.symbol}</span> to your database?
//               </h2>
//               <div className="flex justify-center gap-3">
//                 <button
//                   className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
//                   onClick={() => handleModalChoice('yes')}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
//                   onClick={() => handleModalChoice('no')}
//                 >
//                   No
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//                   onClick={() => handleModalChoice('cancel')}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;

// ===================================


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote, BsPlayFill } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';

// const EquityHub = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [pendingStock, setPendingStock] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [showVideo, setShowVideo] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [graphMode, setGraphMode] = useState("side-by-side");
//   const [timeRange, setTimeRange] = useState("1Y");
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery, false);
//     }
//   }, [initialQuery]);

//   const getAuthToken = () => localStorage.getItem("authToken");

//   const getCachedData = (key) => {
//     const cached = localStorage.getItem(key);
//     if (!cached) return null;
//     const { data, timestamp } = JSON.parse(cached);
//     if (Date.now() - timestamp > CACHE_TTL) {
//       localStorage.removeItem(key);
//       return null;
//     }
//     return data;
//   };

//   const setCachedData = (key, data) => {
//     localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//   };

//   const fetchData = async (value, shouldSave = false) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults && !shouldSave) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Oops! You need to log in before searching for stocks.");
//       const response = await axios.get(`${API_BASE}/stocks/search`, {
//         params: { query: value, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       setResults(filteredResults);
//       setCachedData(cacheKey, filteredResults);
//       setError(null);
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch search results.");
//       setResults([]);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//   };

//   const handleSelectItem = (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }
//     setPendingStock(item);
//     setModalVisible(true);
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//     setCompareMode(false);
//   };

//   const handleModalChoice = async (choice) => {
//     setModalVisible(false);
//     if (!pendingStock || choice === 'cancel') return;
//     const shouldSave = choice === 'yes';
//     try {
//       const token = getAuthToken();
//       if (!token) throw new Error("Please log in to select and save stocks.");
//       const cacheKey = `stock_${pendingStock.symbol}`;
//       const cachedStock = getCachedData(cacheKey);
//       if (cachedStock && !shouldSave) {
//         setSelectedStocks((prev) => {
//           const updated = [...prev, cachedStock];
//           setTimeout(() => scrollToStock(cachedStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//         return;
//       }
//       const response = await axios.get(`${API_BASE}/stocks/search`, {
//         params: { query: pendingStock.symbol, shouldSave },
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setCachedData(cacheKey, newStock);
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     } finally {
//       setPendingStock(null);
//     }
//   };

//   const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//           {/* <div className="flex flex-col items-center gap-4">
//             <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//               {[{ key: 'hub', label: 'Equity Hub' }, { key: 'search', label: 'My Search' }].map((tab) => (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
//                     activeTab === tab.key
//                       ? 'bg-cyan-600 text-white shadow-sm'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//             {hasSearched && (
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setShowVideo(!showVideo)}
//                   className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
//                 >
//                   {showVideo ? 'Hide Tutorial' : 'Show Tutorial'}
//                   {showVideo ? '✕' : <BsPlayFill size={16} />}
//                 </button>
//               </div>
//             )}
//           </div> */}

//              <div className="flex flex-col items-center gap-4">
//   <div className="flex justify-between items-center w-full max-w-2xl">
//     <div className="flex justify-center flex-1">
//       <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//         {[{ key: 'hub', label: 'Equity Hub' }, { key: 'search', label: 'My Search' }].map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none ${
//               activeTab === tab.key
//                 ? 'bg-cyan-600 text-white shadow-sm'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//     </div>
//     {hasSearched && (
//       <button
//         onClick={() => setShowVideo(!showVideo)}
//         className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition text-sm font-medium"
//       >
//         {showVideo ? 'Hide Tutorial' : 'Show Tutorial'}
//         {showVideo ? '✕' : <BsPlayFill size={16} />}
//       </button>
//     )}
//   </div>
// </div>
//         </div>
//         {activeTab === "hub" ? (
//           <>
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value, false);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span key={stock.symbol} className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full">
//                         {stock.symbol} ({stock.basicIndustry})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” — <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//             {hasSearched && showVideo && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//                 <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}
//             {compareMode && selectedStocks.length === 2 && (
//               <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//                 <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                   </h2>
//                   <div className="flex items-center gap-4">
//                     <select
//                       className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm"
//                       value={graphMode}
//                       onChange={(e) => setGraphMode(e.target.value)}
//                     >
//                       <option value="side-by-side">Side by Side</option>
//                       <option value="overlay">Overlay</option>
//                     </select>
//                     <button
//                       onClick={() => setCompareMode(false)}
//                       className="px-4 py-2 bg-sky-800 text-white rounded-lg hover:bg-cyan-600 text-sm"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex-1 p-4 overflow-auto">
//                   {graphMode === "side-by-side" ? (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {selectedStocks.map((stock) => (
//                         <div
//                           key={stock.symbol}
//                           className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                         >
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             tabContext="equityHub"
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                       {selectedStocks.map((stock) => (
//                         <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                           <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                             {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                           </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                             overlay={true}
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {!compareMode && selectedStocks.length > 0 && (
//               <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//                 <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                   {selectedStocks.map((stock) => (
//                     <div
//                       key={stock.symbol}
//                       ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                       className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                     >
//                       <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                         {stock.symbol} - {stock.companyName}
//                       </h2>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                         <strong>Industry:</strong> {stock.basicIndustry}
//                       </p>
//                       <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                       <GraphSlider
//                         symbol={stock.symbol}
//                         tabContext="equityHub"
//                         isFullWidth={selectedStocks.length === 1}
//                         timeRange={timeRange}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="px-4 sm:px-6 lg:px-8 mt-8">
//             <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//           </div>
//         )}
//         {modalVisible && pendingStock && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
//             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-200 dark:border-slate-700">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
//                 Save <span className='text-cyan-600'>{pendingStock.symbol}</span> to your database?
//               </h2>
//               <div className="flex justify-center gap-3">
//                 <button
//                   className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm"
//                   onClick={() => handleModalChoice('yes')}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
//                   onClick={() => handleModalChoice('no')}
//                 >
//                   No
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//                   onClick={() => handleModalChoice('cancel')}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;

// =======================================


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';
// import { useAuth } from '../AuthContext';
// import toast from 'react-hot-toast';
// import { FaRegEye } from 'react-icons/fa';
// import Login from '../Login';

// const EquityHub = () => {
//   const { getAuthToken } = useAuth();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   // const initialQuery = queryParams.get("query") || "";
//   const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [graphMode, setGraphMode] = useState("side-by-side");
//   const [timeRange, setTimeRange] = useState("1Y");
//   const [saveMessage, setSaveMessage] = useState(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // New state for login modal
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//     }
//   }, [initialQuery]);

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
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     } catch (err) {
//       setError("Failed to cache data.");
//     }
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("Company not found in our list. Please check the name and search again.");
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

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setError(null);
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }

//     try {
//       const cacheKey = `stock_${item.symbol}`;
//       const cachedStock = getCachedData(cacheKey);
//       if (cachedStock) {
//         setSelectedStocks((prev) => {
//           const updated = [...prev, cachedStock];
//           setTimeout(() => scrollToStock(cachedStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//         return;
//       }
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: item.symbol },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setCachedData(cacheKey, newStock);
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     } else {
//       setError("Failed to scroll to stock. Please try again.");
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//     setCompareMode(false);
//     setError(null);
//   };

//   const handleSave = async () => {
//     const token = getAuthToken();

//     if (!token) {
//       setIsLoginModalOpen(true); // Open login modal instead of alert
//       return;
//     }

//     if (selectedStocks.length === 0) {
//       setError("No stocks selected to save.");
//       return;
//     }

//     const invalidStocks = selectedStocks.filter(
//       (stock) => !stock.symbol || !stock.companyName
//     );
//     if (invalidStocks.length > 0) {
//       setError("One or more stocks have missing symbol or company name.");
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedStocks.map((stock) =>
//           axios.post(
//             `${API_BASE}/stocks/test/saveStock`,
//             {
//               symbol: stock.symbol,
//               companyName: stock.companyName,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           )
//         )
//       );
//       toast.success("Your data saved successfully");
//       setError(null);
//       setTimeout(() => setSaveMessage(null), 3000);
//       localStorage.removeItem(`saved_stocks_${token}`);
//     } catch (error) {
//       console.error("Save error:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       setError(
//         error.response?.data?.error ||
//           error.message ||
//           "Failed to save stocks. Please try again."
//       );
//     }
//   };
//     useEffect(() => {
//     const token = getAuthToken();
//     if (token && isLoginModalOpen) {
//       setIsLoginModalOpen(false); // Close modal if user is authenticated
//       if (selectedStocks.length > 0) {
//         handleSave(); // Proceed with saving stocks
//       }
//     }
//   }, [getAuthToken, isLoginModalOpen, selectedStocks]);

//   // const toggleCompareMode = () => {
//   //   if (selectedStocks.length !== 2) {
//   //     setError("Please select exactly two stocks to compare.");
//   //     return;
//   //   }
//   //   setCompareMode(true);
//   //   setError(null);
//   // };
//     const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//     setError(null);
//   };
//     const { isLoggedIn } = useAuth();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   //  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => handleCloseModal();


//   // Login Modal Component
//   const LoginModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//           Please Log In
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//           You need to be logged in to add stocks to your watchlist.
//         </p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => setIsLoginModalOpen(false)}
//             className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//           >
//             Cancel
//           </button>
//            <button
//               onClick={handleLoginClick}
//               className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//             >
//               Login
//             </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
//           <div className="flex flex-col items-center gap-4">
//             <div className="flex justify-center w-full">
//               <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
//                 {[{ key: 'hub', label: 'Equity' }, { key: 'search', label: 'Watchlist' }, { key: 'videos', label: 'Tutorial' }].map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none ${
//                       activeTab === tab.key
//                         ? 'bg-cyan-600 text-white font-bold shadow-sm'
//                         : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {activeTab === 'videos' && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}
//           </div>
//           {activeTab === "hub" && (
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 {saveMessage && (
//                   <div className="flex items-center bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm-1.293 13.293l-4-4 1.414-1.414L9 12.586l7.293-7.293 1.414 1.414-8 8z" />
//                     </svg>
//                     {saveMessage}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span
//                         key={stock.symbol}
//                         className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
//                       >
//                         {stock.symbol} ({stock.basicIndustry})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” —{' '}
//                     <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === "search" && (
//             <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
//               <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//             </div>
//           )}
//           {activeTab === "hub" && compareMode && selectedStocks.length === 2 && (
//             <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//               <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                 </h2>
//                 <div className="flex items-center gap-4">
//                   <select
//                     className="pxp-2 py-1 py-2 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-gray-800 text-sm"
//                     value={graphMode}
//                     onChange={(e) => setGraphMode(e.target.value)}
//                   >
//                     <option value="side-by-side">Side by Side</option>
//                     <option value="overlay">Overlay</option>
//                   </select>
//                   <button
//                     onClick={() => setCompareMode(false)}
//                     className="px-4 py-2 bg-sky-600 bg-gray-800 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-gray-700 text-sm">
                    
//                     Close
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-1 p-4 overflow-auto">
//                 {graphMode === "side-by-side" ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {selectedStocks.map((stock) => (
//                       <div
//                         key={stock.symbol}
//                         className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                       >
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                             </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             tabContext="equityHub"
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                           />
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border bg-gray-200 dark:bg-gray-700">
//                     {selectedStocks.map((stock) => (
//                       <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                         </h3>
//                         <GraphSlider
//                           symbol={stock.symbol}
//                           isFullWidth={true}
//                           timeRange={timeRange}
//                           normalize={true}
//                           overlay={true}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === "hub" && !compareMode && selectedStocks.length > 0 && (
//             <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//                  <div className="mt-6 flex justify-end">

//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-3 bg-cyan-600 flex gap-2 text-lg  text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                 >
//                   <FaRegEye className='mt-1'/>
//                   Add to Watchlist
//                 </button>
//               </div>
//               <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                 {selectedStocks.map((stock) => (
//                   <div
//                     key={stock.symbol}
//                     ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                     className="bg-white dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700"
//                   >
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                       {stock.symbol} - {stock.companyName}
//                     </h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                       <strong>Industry:</strong> {stock.basicIndustry}
//                     </p>
//                     <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                     <GraphSlider
//                       symbol={stock.symbol}
//                       tabContext="equityHub"
//                       isFullWidth={selectedStocks.length === 1}
//                       timeRange={timeRange}
//                     />
                  
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//            <Login
//         isOpen={showLoginModal}
//         onClose={handleCloseModal}
//         onSuccess={handleLoginSuccess}
//         showButtons={false}
//       />
//       {isLoginModalOpen && <LoginModal />} {/* Render login modal when open */}
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;





// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';
// import { useAuth } from '../AuthContext';
// import toast from 'react-hot-toast';
// import { FaRegEye } from 'react-icons/fa';
// import Login from '../Login';

// const EquityHub = () => {
//   const { getAuthToken } = useAuth();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   // const initialQuery = queryParams.get("query") || "";
//   const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [graphMode, setGraphMode] = useState("side-by-side");
//   const [timeRange, setTimeRange] = useState("1Y");
//   const [saveMessage, setSaveMessage] = useState(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // New state for login modal
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//     }
//   }, [initialQuery]);

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
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     } catch (err) {
//       setError("Failed to cache data.");
//     }
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);

//     const cacheKey = `search_${value.toLowerCase()}`;
//     const cachedResults = getCachedData(cacheKey);
//     if (cachedResults) {
//       setResults(cachedResults);
//       setError(null);
//       return;
//     }

//     try {
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: value },
//       });
//       const filteredResults = response.data.filter((symbol) =>
//         symbol?.symbol?.toLowerCase().includes(value.toLowerCase())
//       );
//       if (filteredResults.length === 0) {
//         setError("Company not found in our list. Please check the name and search again.");
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

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setError(null);
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }

//     try {
//       const cacheKey = `stock_${item.symbol}`;
//       const cachedStock = getCachedData(cacheKey);
//       if (cachedStock) {
//         setSelectedStocks((prev) => {
//           const updated = [...prev, cachedStock];
//           setTimeout(() => scrollToStock(cachedStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//         return;
//       }
//       const response = await axios.get(`${API_BASE}/stocks/test/search`, {
//         params: { query: item.symbol },
//       });
//       if (response.data.length > 0) {
//         const newStock = response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, newStock];
//           setTimeout(() => scrollToStock(newStock.symbol), 100);
//           return updated;
//         });
//         setCachedData(cacheKey, newStock);
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       setError(error.response?.data?.error || error.message || "Failed to fetch stock details.");
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     } else {
//       setError("Failed to scroll to stock. Please try again.");
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//     setCompareMode(false);
//     setError(null);
//   };

//   const handleSave = async () => {
//     const token = getAuthToken();

//     if (!token) {
//       setIsLoginModalOpen(true); // Open login modal instead of alert
//       return;
//     }

//     if (selectedStocks.length === 0) {
//       setError("No stocks selected to save.");
//       return;
//     }

//     const invalidStocks = selectedStocks.filter(
//       (stock) => !stock.symbol || !stock.companyName
//     );
//     if (invalidStocks.length > 0) {
//       setError("One or more stocks have missing symbol or company name.");
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedStocks.map((stock) =>
//           axios.post(
//             `${API_BASE}/stocks/test/saveStock`,
//             {
//               symbol: stock.symbol,
//               companyName: stock.companyName,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           )
//         )
//       );
//       toast.success("Your data saved successfully");
//       setError(null);
//       setTimeout(() => setSaveMessage(null), 3000);
//       localStorage.removeItem(`saved_stocks_${token}`);
//     } catch (error) {
//       console.error("Save error:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       setError(
//         error.response?.data?.error ||
//           error.message ||
//           "Failed to save stocks. Please try again."
//       );
//     }
//   };
//     useEffect(() => {
//     const token = getAuthToken();
//     if (token && isLoginModalOpen) {
//       setIsLoginModalOpen(false); // Close modal if user is authenticated
//       if (selectedStocks.length > 0) {
//         handleSave(); // Proceed with saving stocks
//       }
//     }
//   }, [getAuthToken, isLoginModalOpen, selectedStocks]);

//   // const toggleCompareMode = () => {
//   //   if (selectedStocks.length !== 2) {
//   //     setError("Please select exactly two stocks to compare.");
//   //     return;
//   //   }
//   //   setCompareMode(true);
//   //   setError(null);
//   // };
//     const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//     setError(null);
//   };
//     const { isLoggedIn } = useAuth();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   //  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => handleCloseModal();


//   // Login Modal Component
//   const LoginModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//           Please Log In
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//           You need to be logged in to add stocks to your watchlist.
//         </p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => setIsLoginModalOpen(false)}
//             className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//           >
//             Cancel
//           </button>
//            <button
//               onClick={handleLoginClick}
//               className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//             >
//               Login
//             </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
//           <div className="flex flex-col items-center gap-4">
//             <div className="flex justify-center w-full">
//               <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
//                 {[{ key: 'hub', label: 'Equity' }, { key: 'search', label: 'Watchlist' }, { key: 'videos', label: 'Tutorial' }].map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none ${
//                       activeTab === tab.key
//                         ? 'bg-cyan-600 text-white font-bold shadow-sm'
//                         : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {activeTab === 'videos' && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}
//           </div>
//           {activeTab === "hub" && (
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 {saveMessage && (
//                   <div className="flex items-center bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm-1.293 13.293l-4-4 1.414-1.414L9 12.586l7.293-7.293 1.414 1.414-8 8z" />
//                     </svg>
//                     {saveMessage}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span
//                         key={stock.symbol}
//                         className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
//                       >
//                         {stock.symbol} ({stock.basicIndustry})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” —{' '}
//                     <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === "search" && (
//             <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
//               <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//             </div>
//           )}
//           {activeTab === "hub" && compareMode && selectedStocks.length === 2 && (
//             <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//               <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                 </h2>
//                 <div className="flex items-center gap-4">
//                   <select
//                     className="pxp-2 py-1 py-2 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-gray-800 text-sm"
//                     value={graphMode}
//                     onChange={(e) => setGraphMode(e.target.value)}
//                   >
//                     <option value="side-by-side">Side by Side</option>
//                     <option value="overlay">Overlay</option>
//                   </select>
//                   <button
//                     onClick={() => setCompareMode(false)}
//                     className="px-4 py-2 bg-sky-600 bg-gray-800 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-gray-700 text-sm">
                    
//                     Close
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-1 p-4 overflow-auto">
//                 {graphMode === "side-by-side" ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {selectedStocks.map((stock) => (
//                       <div
//                         key={stock.symbol}
//                         className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                       >
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                             </h3>
//                           <GraphSlider
//                             symbol={stock.symbol}
//                             tabContext="equityHub"
//                             isFullWidth={true}
//                             timeRange={timeRange}
//                             normalize={true}
//                           />
//                         </div>
//                       ))}
//                   </div>
//                 ) : (
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border bg-gray-200 dark:bg-gray-700">
//                     {selectedStocks.map((stock) => (
//                       <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry})
//                         </h3>
//                         <GraphSlider
//                           symbol={stock.symbol}
//                           isFullWidth={true}
//                           timeRange={timeRange}
//                           normalize={true}
//                           overlay={true}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === "hub" && !compareMode && selectedStocks.length > 0 && (
//             <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//                  <div className="mt-6 flex justify-end">

//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-3 bg-cyan-600 flex gap-2 text-lg  text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                 >
//                   <FaRegEye className='mt-1'/>
//                   Add to Watchlist
//                 </button>
//               </div>
//               <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                 {selectedStocks.map((stock) => (
//                   <div
//                     key={stock.symbol}
//                     ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                     className="bg-white dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700"
//                   >
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                       {stock.symbol} - {stock.companyName}
//                     </h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                       <strong>Industry:</strong> {stock.basicIndustry}
//                     </p>
//                     <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                     <GraphSlider
//                       symbol={stock.symbol}
//                       tabContext="equityHub"
//                       isFullWidth={selectedStocks.length === 1}
//                       timeRange={timeRange}
//                     />
                  
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//            <Login
//         isOpen={showLoginModal}
//         onClose={handleCloseModal}
//         onSuccess={handleLoginSuccess}
//         showButtons={false}
//       />
//       {isLoginModalOpen && <LoginModal />} {/* Render login modal when open */}
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;


// import React, { useEffect, useState, useRef } from 'react';
// import Navbar from "../Navbar";
// import Footer from "../Footer";
// import SearchList from "./SearchList";
// import GraphSlider from "./GraphSlider";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { BsQuote } from "react-icons/bs";
// import SearchTutorial from './SearchTutorial';
// import Mysearch from './Mysearch';
// import OpenCloseCards from './OpenCloseCards';
// import { useAuth } from '../AuthContext';
// import toast from 'react-hot-toast';
// import { FaRegEye } from 'react-icons/fa';
// import Login from '../Login';

// const EquityHub = () => {
//   const { getAuthToken, isLoggedIn } = useAuth();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
//   const [input, setInput] = useState("");
//   const [results, setResults] = useState([]);
//   const [selectedStocks, setSelectedStocks] = useState([]);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("hub");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [compareMode, setCompareMode] = useState(false);
//   const [graphMode, setGraphMode] = useState("side-by-side");
//   const [timeRange, setTimeRange] = useState("1Y");
//   const [saveMessage, setSaveMessage] = useState(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const stockRefs = useRef({});
//   const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   useEffect(() => {
//     if (initialQuery) {
//       fetchData(initialQuery);
//     }
//   }, [initialQuery]);

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
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
//     } catch (err) {
//       setError("Failed to cache data.");
//     }
//   };

//   const fetchData = async (value) => {
//     if (!value) {
//       setResults([]);
//       setError(null);
//       setHasSearched(false);
//       return;
//     }
//     setHasSearched(true);

//     // const token = getAuthToken();
//     // if (!token) {
//     //   setError("Please log in to search for stocks.");
//     //   setResults([]);
//     //   return;
//     // }

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
//         // headers: { Authorization: `Bearer ${token}` },
//         timeout: 10000,
//       });

//       const filteredResults = response.data; // No need for client-side filtering
//       if (filteredResults.length === 0) {
//         setError("Company not found in our list. Please check the name and search again.");
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
//         error.response?.status === 401
//           ? "Unauthorized. Please log in again."
//           : error.response?.status === 404
//           ? "Endpoint not found. Check server configuration."
//           : error.response?.data?.error || error.message || "Failed to fetch search results."
//       );
//       setResults([]);
//     }
//   };

//   const handleClearSearch = () => {
//     setResults([]);
//     setInput("");
//     setError(null);
//   };

//   const handleSelectItem = async (item) => {
//     setInput("");
//     setResults([]);
//     if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
//       scrollToStock(item.symbol);
//       return;
//     }
//     if (selectedStocks.length >= 2) {
//       setError("Please remove a stock to add a new one for comparison.");
//       return;
//     }

//     const token = getAuthToken();
//     if (!token) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     try {
//       const cacheKey = `stock_${item.symbol}`;
//       const cachedStock = getCachedData(cacheKey);
//       if (cachedStock) {
//         setSelectedStocks((prev) => {
//           const updated = [...prev, cachedStock];
//           setTimeout(() => scrollToStock(cachedStock.symbol), 100);
//           return updated;
//         });
//         setError(null);
//         return;
//       }

//       const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
//         params: { prefix: item.companyName },
//         headers: { Authorization: `Bearer ${token}` },
//         timeout: 10000,
//       });

//       if (response.data.length > 0) {
//         const matchedStock = response.data.find(
//           (s) => s.symbol === item.symbol && s.companyName === item.companyName
//         ) || response.data[0];
//         setSelectedStocks((prev) => {
//           const updated = [...prev, matchedStock];
//           setTimeout(() => scrollToStock(matchedStock.symbol), 100);
//           return updated;
//         });
//         setCachedData(cacheKey, matchedStock);
//         setError(null);
//       } else {
//         setError("No stock details found for the selected symbol.");
//       }
//     } catch (error) {
//       console.error("Error fetching stock details:", {
//         message: error.message,
//         status: error.response?.status,
//         response: error.response?.data,
//       });
//       setError(
//         error.response?.status === 401
//           ? "Unauthorized. Please log in again."
//           : error.response?.data?.error || error.message || "Failed to fetch stock details."
//       );
//     }
//   };

//   const scrollToStock = (symbol) => {
//     const stockDiv = stockRefs.current[symbol];
//     if (stockDiv) {
//       stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     } else {
//       setError("Failed to scroll to stock. Please try again.");
//     }
//   };

//   const removeStock = (symbol) => {
//     setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
//     setCompareMode(false);
//     setError(null);
//   };

//   const handleSave = async () => {
//     const token = getAuthToken();

//     if (!token) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     if (selectedStocks.length === 0) {
//       setError("No stocks selected to save.");
//       return;
//     }

//     const invalidStocks = selectedStocks.filter(
//       (stock) => !stock.symbol || !stock.companyName
//     );
//     if (invalidStocks.length > 0) {
//       setError("One or more stocks have missing symbol or company name.");
//       return;
//     }

//     try {
//       await Promise.all(
//         selectedStocks.map((stock) =>
//           axios.post(
//             `${API_BASE}/stocks/test/saveStock`,
//             {
//               symbol: stock.symbol,
//               companyName: stock.companyName,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           )
//         )
//       );
//       toast.success("Your data saved successfully");
//       setError(null);
//       setTimeout(() => setSaveMessage(null), 3000);
//       localStorage.removeItem(`saved_stocks_${token}`);
//     } catch (error) {
//       console.error("Save error:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });
//       setError(
//         error.response?.data?.error ||
//           error.message ||
//           "Failed to save stocks. Please try again."
//       );
//     }
//   };

//   useEffect(() => {
//     const token = getAuthToken();
//     if (token && isLoginModalOpen) {
//       setIsLoginModalOpen(false);
//       if (selectedStocks.length > 0) {
//         handleSave();
//       }
//     }
//   }, [getAuthToken, isLoginModalOpen, selectedStocks]);

//   const toggleCompareMode = () => {
//     if (selectedStocks.length !== 2) {
//       setError("Please select exactly two stocks to compare.");
//       return;
//     }
//     setCompareMode(true);
//     setError(null);
//   };

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => handleCloseModal();

//   const LoginModal = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-md w-full">
//         <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//           Please Log In
//         </h2>
//         <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
//           You need to be logged in to add stocks to your watchlist.
//         </p>
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={() => setIsLoginModalOpen(false)}
//             className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleLoginClick}
//             className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
//       <Navbar />
//       <main className="flex-1 pt-16 pb-12">
//         <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
//           <div className="flex flex-col items-center gap-4">
//             <div className="flex justify-center w-full">
//               <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
//                 {[{ key: 'hub', label: 'Equity' }, { key: 'search', label: 'Watchlist' }, { key: 'videos', label: 'Tutorial' }].map((tab) => (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none ${
//                       activeTab === tab.key
//                         ? 'bg-cyan-600 text-white font-bold shadow-sm'
//                         : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {activeTab === 'videos' && (
//               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700">
//                   <SearchTutorial />
//                 </div>
//               </div>
//             )}
//           </div>
//           {activeTab === "hub" && (
//             <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//               <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
//                   Search NSE Stocks
//                 </h2>
//                 {error && (
//                   <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
//                     </svg>
//                     {error}
//                   </div>
//                 )}
//                 {saveMessage && (
//                   <div className="flex items-center bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded mb-4 text-sm">
//                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm-1.293 13.293l-4-4 1.414-1.414L9 12.586l7.293-7.293 1.414 1.414-8 8z" />
//                     </svg>
//                     {saveMessage}
//                   </div>
//                 )}
//                 <div className="relative">
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
//                     placeholder="Search for stocks, trends, or insights..."
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       fetchData(e.target.value);
//                     }}
//                   />
//                   {results.length > 0 && (
//                     <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                       <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
//                     </div>
//                   )}
//                 </div>
//                 {selectedStocks.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-4 items-center">
//                     {selectedStocks.map((stock) => (
//                       <span
//                         key={stock.symbol}
//                         className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
//                       >
//                         {stock.symbol} ({stock.basicIndustry || 'N/A'})
//                         <button
//                           className="ml-2 text-red-500 hover:text-red-700"
//                           onClick={() => removeStock(stock.symbol)}
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedStocks.length === 2 && (
//                       <button
//                         onClick={toggleCompareMode}
//                         className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                       >
//                         Compare Graphs
//                       </button>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
//                   <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
//                   <p className="text-sm text-gray-700 dark:text-gray-300 italic">
//                     “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” —{' '}
//                     <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === "search" && (
//             <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
//               <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
//             </div>
//           )}
//           {activeTab === "hub" && compareMode && selectedStocks.length === 2 && (
//             <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
//               <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
//                 </h2>
//                 <div className="flex items-center gap-4">
//                   <select
//                     className="px-2 py-1 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-gray-800 text-sm"
//                     value={graphMode}
//                     onChange={(e) => setGraphMode(e.target.value)}
//                   >
//                     <option value="side-by-side">Side by Side</option>
//                     <option value="overlay">Overlay</option>
//                   </select>
//                   <button
//                     onClick={() => setCompareMode(false)}
//                     className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-gray-700 text-sm"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//               <div className="flex-1 p-4 overflow-auto">
//                 {graphMode === "side-by-side" ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {selectedStocks.map((stock) => (
//                       <div
//                         key={stock.symbol}
//                         className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
//                       >
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
//                         </h3>
//                         <GraphSlider
//                           symbol={stock.symbol}
//                           tabContext="equityHub"
//                           isFullWidth={true}
//                           timeRange={timeRange}
//                           normalize={true}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                     {selectedStocks.map((stock) => (
//                       <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
//                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                           {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
//                         </h3>
//                         <GraphSlider
//                           symbol={stock.symbol}
//                           isFullWidth={true}
//                           timeRange={timeRange}
//                           normalize={true}
//                           overlay={true}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//           {activeTab === "hub" && !compareMode && selectedStocks.length > 0 && (
//             <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={handleSave}
//                   className="px-4 py-3 bg-cyan-600 flex gap-2 text-lg text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
//                 >
//                   <FaRegEye className='mt-1'/>
//                   Add to Watchlist
//                 </button>
//               </div>
//               <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
//                 {selectedStocks.map((stock) => (
//                   <div
//                     key={stock.symbol}
//                     ref={(el) => (stockRefs.current[stock.symbol] = el)}
//                     className="bg-white dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700"
//                   >
//                     <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
//                       {stock.symbol} - {stock.companyName}
//                     </h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                       <strong>Industry:</strong> {stock.basicIndustry || 'N/A'}
//                     </p>
//                     <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
//                     <GraphSlider
//                       symbol={stock.symbol}
//                       tabContext="equityHub"
//                       isFullWidth={selectedStocks.length === 1}
//                       timeRange={timeRange}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <Login
//         isOpen={showLoginModal}
//         onClose={handleCloseModal}
//         onSuccess={handleLoginSuccess}
//         showButtons={false}
//       />
//       {isLoginModalOpen && <LoginModal />}
//       <Footer />
//     </div>
//   );
// };

// export default EquityHub;



import React, { useEffect, useState, useRef } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import SearchList from "./SearchList";
import GraphSlider from "./GraphSlider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsQuote } from "react-icons/bs";
import SearchTutorial from './SearchTutorial';
import Mysearch from './Mysearch';
import OpenCloseCards from './OpenCloseCards';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';
import { FaRegEye } from 'react-icons/fa';
import Login from '../Login';

const EquityHub = () => {
  const { getAuthToken, isLoggedIn } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("hub");
  const [hasSearched, setHasSearched] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [graphMode, setGraphMode] = useState("side-by-side");
  const [timeRange, setTimeRange] = useState("1Y");
  const [saveMessage, setSaveMessage] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const stockRefs = useRef({});
  const API_BASE = import.meta.env.VITE_URL || "http://localhost:8080";
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    if (initialQuery) {
      fetchData(initialQuery);
    }
  }, [initialQuery]);

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
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      setError("Failed to cache data.");
    }
  };

  const fetchData = async (value) => {
    if (!value) {
      setResults([]);
      setError(null);
      setHasSearched(false);
      return;
    }
    setHasSearched(true);

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
        setError("Company not found in our list. Please check the name and search again.");
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

  const handleClearSearch = () => {
    setResults([]);
    setInput("");
    setError(null);
  };

  const handleSelectItem = async (item) => {
    setInput("");
    setResults([]);
    if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
      scrollToStock(item.symbol);
      return;
    }
    if (selectedStocks.length >= 2) {
      setError("Please remove a stock to add a new one for comparison.");
      return;
    }

    try {
      const cacheKey = `stock_${item.symbol}`;
      const cachedStock = getCachedData(cacheKey);
      if (cachedStock) {
        setSelectedStocks((prev) => {
          const updated = [...prev, cachedStock];
          setTimeout(() => scrollToStock(cachedStock.symbol), 100);
          return updated;
        });
        setError(null);
        const token = getAuthToken();
        if (token) handleSave([cachedStock]); // Save only if authenticated
        return;
      }

      const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
        params: { prefix: item.companyName },
        timeout: 10000,
      });

      if (response.data.length > 0) {
        const matchedStock = response.data.find(
          (s) => s.symbol === item.symbol && s.companyName === item.companyName
        ) || response.data[0];
        setSelectedStocks((prev) => {
          const updated = [...prev, matchedStock];
          setTimeout(() => scrollToStock(matchedStock.symbol), 100);
          return updated;
        });
        setCachedData(cacheKey, matchedStock);
        setError(null);
        const token = getAuthToken();
        if (token) handleSave([matchedStock]); // Save only if authenticated
      } else {
        setError("No stock details found for the selected symbol.");
      }
    } catch (error) {
      console.error("Error fetching stock details:", {
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      });
      setError(
        error.response?.status === 404
          ? "Endpoint not found. Check server configuration."
          : error.response?.data?.error || error.message || "Failed to fetch stock details."
      );
    }
  };

  const scrollToStock = (symbol) => {
    const stockDiv = stockRefs.current[symbol];
    if (stockDiv) {
      stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setError("Failed to scroll to stock. Please try again.");
    }
  };

  const removeStock = (symbol) => {
    setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
    setCompareMode(false);
    setError(null);
  };

  const handleSave = async (stocksToSave) => {
    const token = getAuthToken();

    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const stocks = stocksToSave || selectedStocks;
    if (stocks.length === 0) {
      setError("No stocks selected to save.");
      return;
    }

    const invalidStocks = stocks.filter(
      (stock) => !stock.symbol || !stock.companyName
    );
    if (invalidStocks.length > 0) {
      setError("One or more stocks have missing symbol or company name.");
      return;
    }

    try {
      await Promise.all(
        stocks.map((stock) =>
          axios.post(
            `${API_BASE}/stocks/test/saveStock`,
            {
              symbol: stock.symbol,
              companyName: stock.companyName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );
      toast.success("Your data saved successfully");
      setError(null);
      setTimeout(() => setSaveMessage(null), 3000);
      localStorage.removeItem(`saved_stocks_${token}`);
    } catch (error) {
      console.error("Save error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to save stocks. Please try again."
      );
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token && isLoginModalOpen) {
      setIsLoginModalOpen(false);
      if (selectedStocks.length > 0) {
        handleSave();
      }
    }
  }, [getAuthToken, isLoginModalOpen, selectedStocks]);

  const toggleCompareMode = () => {
    if (selectedStocks.length !== 2) {
      setError("Please select exactly two stocks to compare.");
      return;
    }
    setCompareMode(true);
    setError(null);
  };

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => handleCloseModal();

  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Please Log In
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to add stocks to your watchlist.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center w-full">
              <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
                {[{ key: 'hub', label: 'Equity' }, { key: 'search', label: 'Watchlist' }, { key: 'videos', label: 'Tutorial' }].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none ${
                      activeTab === tab.key
                        ? 'bg-cyan-600 text-white font-bold shadow-sm'
                        : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === 'videos' && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700">
                  <SearchTutorial />
                </div>
              </div>
            )}
          </div>
          {activeTab === "hub" && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Search NSE Stocks
                </h2>
                {error && (
                  <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                    </svg>
                    {error}
                  </div>
                )}
                {saveMessage && (
                  <div className="flex items-center bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded mb-4 text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm-1.293 13.293l-4-4 1.414-1.414L9 12.586l7.293-7.293 1.414 1.414-8 8z" />
                    </svg>
                    {saveMessage}
                  </div>
                )}
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    placeholder="Search for stocks, trends, or insights..."
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      fetchData(e.target.value);
                    }}
                  />
                  {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
                    </div>
                  )}
                </div>
                {selectedStocks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    {selectedStocks.map((stock) => (
                      <span
                        key={stock.symbol}
                        className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
                      >
                        {stock.symbol} ({stock.basicIndustry || 'N/A'})
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => removeStock(stock.symbol)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedStocks.length === 2 && (
                      <button
                        onClick={toggleCompareMode}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
                      >
                        Compare Graphs
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
                  <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” —{' '}
                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "search" && (
            <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
              <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
            </div>
          )}
          {activeTab === "hub" && compareMode && selectedStocks.length === 2 && (
            <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
              <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
                </h2>
                <div className="flex items-center gap-4">
                  <select
                    className="px-2 py-1 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-gray-800 text-sm"
                    value={graphMode}
                    onChange={(e) => setGraphMode(e.target.value)}
                  >
                    <option value="side-by-side">Side by Side</option>
                    <option value="overlay">Overlay</option>
                  </select>
                  <button
                    onClick={() => setCompareMode(false)}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-gray-700 text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                {graphMode === "side-by-side" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
                        </h3>
                        <GraphSlider
                          symbol={stock.symbol}
                          tabContext="equityHub"
                          isFullWidth={true}
                          timeRange={timeRange}
                          normalize={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    {selectedStocks.map((stock) => (
                      <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
                        </h3>
                        <GraphSlider
                          symbol={stock.symbol}
                          isFullWidth={true}
                          timeRange={timeRange}
                          normalize={true}
                          overlay={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "hub" && !compareMode && selectedStocks.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSave()}
                  className="px-4 py-3 bg-cyan-600 flex gap-2 text-lg text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
                >
                  <FaRegEye className='mt-1'/>
                  Add to Watchlist
                </button>
              </div>
              <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {selectedStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    ref={(el) => (stockRefs.current[stock.symbol] = el)}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {stock.symbol} - {stock.companyName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <strong>Industry:</strong> {stock.basicIndustry || 'N/A'}
                    </p>
                    <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
                    <GraphSlider
                      symbol={stock.symbol}
                      tabContext="equityHub"
                      isFullWidth={selectedStocks.length === 1}
                      timeRange={timeRange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Login
        isOpen={showLoginModal}
        onClose={handleCloseModal}
        onSuccess={handleLoginSuccess}
        showButtons={false}
      />
      {isLoginModalOpen && <LoginModal />}
      <Footer />
    </div>
  );
};

export default EquityHub;