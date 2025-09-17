


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../Navbar";
// import { RiInformationFill } from "react-icons/ri";
// import { MdNoteAlt } from "react-icons/md";

// const BuildOwnPort = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [portfolio, setPortfolio] = useState([]);
//   const [savedPortfolio, setSavedPortfolio] = useState([]);
//   const [portfolioData, setPortfolioData] = useState([]);
//   const [modal, setModal] = useState({ isOpen: false, type: "", message: "" });
//   const [activeTab, setActiveTab] = useState("portfolio");
//    const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Fetch portfolio data on component mount
//   useEffect(() => {
//     const fetchPortfolioData = async () => {
//       try {
//         const response = await axios.post(`${API_BASE}/file/build_Portfolio`);
//         setPortfolioData(response.data.portfolio_data);
//       } catch (error) {
//         console.error("Failed to fetch portfolio data:", error);
//         toast.error("Failed to load stock data. Please try again later.");
//       }
//     };
//     fetchPortfolioData();
//   }, []);

//   // Handle search input changes
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toUpperCase();
//     setSearchQuery(query);
    
//     if (!query || !portfolioData.length) {
//       setSearchResults([]);
//       return;
//     }
    
//     const filtered = portfolioData.filter((stock) =>
//       stock.Symbol.toUpperCase().includes(query)
//     );
//     setSearchResults(filtered);
//   };

//   // Place a buy/sell order
// const getPreviousWorkingDay = () => {
//   const date = new Date();
//   date.setDate(date.getDate() - 1);

//   if (date.getDay() === 6) {
//     date.setDate(date.getDate() - 1);
//   } else if (date.getDay() === 0) {
//     date.setDate(date.getDate() - 2);
//   }

//   return date.toISOString().split("T")[0];
// };

// const placeOrder = (symbol) => {
//   const qtyInput = document.getElementById(`qty_${symbol}`);
//   const orderTypeSelect = document.getElementById(`orderType_${symbol}`);
//   const qty = parseInt(qtyInput?.value);
//   const orderType = orderTypeSelect?.value;

//   if (isNaN(qty) || qty <= 0) {
//     setModal({ isOpen: true, type: "error", message: "Please enter a valid quantity!" });
//     return;
//   }

//   const stock = portfolioData.find((s) => s.Symbol === symbol);
//   if (!stock) {
//     setModal({ isOpen: true, type: "error", message: "Stock data not found!" });
//     return;
//   }

//   const buyPrice = parseFloat(stock.Close || 0);
//   const workingDate = getPreviousWorkingDay();
//   const time = new Date().toLocaleTimeString("en-GB", {
//     hour12: false,
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });

//     // Validate sell orders
//     if (orderType === "S") {
//       const combined = [...savedPortfolio, ...portfolio];
//       const totalHeld = combined
//         .filter((p) => p.Symbol === symbol)
//         .reduce(
//           (sum, row) => sum + (row.OrderType === "B" ? row.Qty : -row.Qty),
//           0
//         );

//       if (qty > totalHeld) {
//         setModal({
//           isOpen: true,
//           type: "error",
//           message: `⚠️ Cannot sell ${qty} unit${qty > 1 ? "s" : ""} of ${symbol}. You only hold ${totalHeld} unit${totalHeld !== 1 ? "s" : ""}.`,
//         });
//         return;
//       }

//       const confirmed = window.confirm(
//         `Are you sure you want to SELL ${qty} unit${qty > 1 ? "s" : ""} of ${symbol}?`
//       );
//       if (!confirmed) return;
//     }

//     // Create new transaction
//     const newEntry = {
//       Symbol: stock.Symbol,
//       Date: workingDate,
//       Time: time,
//       OrderType: orderType,
//       Qty: qty,
//       Price: buyPrice,
//       MarketValue: (qty * buyPrice).toFixed(2),
//       PE: isNaN(stock.pe) ? "N/A" : parseFloat(stock.pe).toFixed(2),
//       EPS: isNaN(stock.eps) ? "N/A" : parseFloat(stock.eps).toFixed(2),
//       BookValue: isNaN(stock.bv) ? "N/A" : parseFloat(stock.bv).toFixed(2),
//     };

//     // Update portfolio
//     setPortfolio((prev) => [...prev, newEntry]);
//     qtyInput.value = "";

//     // Show success message for buy orders
//     if (orderType === "B") {
//       setModal({
//         isOpen: true,
//         type: "success",
//         message: `Added ${qty} unit${qty > 1 ? "s" : ""} of ${symbol} to your simulated portfolio.`,
//       });
//     }
//   };

//   // Close modal dialog
//   const closeModal = () => {
//     setModal({ isOpen: false, type: "", message: "" });
//   };

//   // Remove a transaction record
//   const removeRecord = (index, type) => {
//     if (type === "savedPortfolio") {
//       setSavedPortfolio((prev) => prev.filter((_, i) => i !== index));
//     } else {
//       setPortfolio((prev) => prev.filter((_, i) => i !== index));
//     }
//   };

//   // Download portfolio as CSV
//   const downloadCSV = () => {
//     const allRows = [...savedPortfolio, ...portfolio];
//     if (allRows.length === 0) {
//       setModal({
//         isOpen: true,
//         type: "error",
//         message: "No data to download.",
//       });
//       return;
//     }

//     const headers = Object.keys(allRows[0]);
//     const csvRows = [
//       headers.join(","),
//       ...allRows.map((row) => headers.map((h) => row[h]).join(",")),
//     ];

//     const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "portfolio.csv";
//     a.click();
//   };

//   // Save portfolio to server
//   const handleSave = () => {
//     const token = localStorage.getItem("authToken");
//     if (!token || token === "null") {
//       toast.error("🚫 Please login to save your portfolio.");
//       return;
//     }
//     toast.success("Your portfolio was saved successfully!");
//   };

//   // Calculate portfolio summary
//   const calculateSummary = () => {
//     const allHoldings = [...savedPortfolio, ...portfolio];
//     const summary = {};
    
//     allHoldings.forEach(holding => {
//       if (!summary[holding.Symbol]) {
//         summary[holding.Symbol] = {
//           totalQty: 0,
//           totalValue: 0,
//           avgPrice: 0
//         };
//       }
      
//       if (holding.OrderType === "B") {
//         summary[holding.Symbol].totalQty += holding.Qty;
//         summary[holding.Symbol].totalValue += holding.Qty * holding.Price;
//       } else {
//         summary[holding.Symbol].totalQty -= holding.Qty;
//         summary[holding.Symbol].totalValue -= holding.Qty * holding.Price;
//       }
      
//       if (summary[holding.Symbol].totalQty > 0) {
//         summary[holding.Symbol].avgPrice = summary[holding.Symbol].totalValue / summary[holding.Symbol].totalQty;
//       }
//     });
    
//     return Object.entries(summary)
//       .filter(([_, data]) => data.totalQty > 0)
//       .map(([symbol, data]) => ({
//         symbol,
//         totalQty: data.totalQty,
//         avgPrice: data.avgPrice.toFixed(2),
//         currentPrice: portfolioData.find(s => s.Symbol === symbol)?.Close || 0,
//         marketValue: (data.totalQty * (portfolioData.find(s => s.Symbol === symbol)?.Close || 0)).toFixed(2),
//         profitLoss: (data.totalQty * ((portfolioData.find(s => s.Symbol === symbol)?.Close || 0) - data.avgPrice)).toFixed(2),
//         profitLossPct: ((((portfolioData.find(s => s.Symbol === symbol)?.Close || 0) - data.avgPrice) / data.avgPrice) * 100).toFixed(2)
//       }));
//   };

//   const portfolioSummary = calculateSummary();
//   const totalInvested = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.avgPrice) * item.totalQty, 0);
//   const totalValue = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.marketValue), 0);
//   const totalPL = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.profitLoss), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gray-50 dark:from-slate-900 dark:to-slate-800 font-sans text-gray-800 dark:text-gray-200">
//       <Navbar />
      
//       <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header Section */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl md:text-5xl font-bold text-sky-700 dark:text-sky-400 mb-4">
//             <span className="inline-block mr-3">📈</span>
//             Portfolio Simulator
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
//             Practice your investment strategies with real market data without risking real money
//           </p>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Search and Instructions */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Search Card */}
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
//               <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 Search Stocks
//               </h2>
//               <div className="relative">
//                 <input
//                   type="text"
//                   aria-label="Search stock by symbol"
//                   className="w-full py-3 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-700 border border-sky-200 dark:border-slate-600 shadow-sm placeholder-sky-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
//                   placeholder="Search stock by symbol..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                 />
//                 <svg
//                   className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400 dark:text-slate-400 pointer-events-none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle cx="11" cy="11" r="7" />
//                   <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                 </svg>
//               </div>

//               {/* Search Results */}
//               {searchResults.length > 0 && (
//                 <div className="mt-4 max-h-96 overflow-y-auto">
//                   <div className="space-y-2">
//                     {searchResults.map(({ Symbol, Close }, idx) => (
//                       <div key={`${Symbol}_${idx}`} className="bg-sky-50 dark:bg-slate-700 p-3 rounded-lg">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <span className="font-bold text-sky-700 dark:text-sky-400">{Symbol}</span>
//                             <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">₹{parseFloat(Close).toFixed(2)}</span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <input
//                               id={`qty_${Symbol}`}
//                               type="number"
//                               min="1"
//                               className="w-16 px-2 py-1 bg-white dark:bg-slate-600 rounded-md border border-sky-200 dark:border-slate-500 focus:ring-1 focus:ring-sky-400 focus:outline-none"
//                               placeholder="Qty"
//                             />
//                             <select
//                               id={`orderType_${Symbol}`}
//                               className="rounded-md border border-sky-200 dark:border-slate-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white dark:bg-slate-600 text-sm"
//                               defaultValue="B"
//                             >
//                               <option value="B" className="text-green-700 dark:text-green-400 font-semibold">
//                                 +
//                               </option>
//                               <option value="S" className="text-red-700 dark:text-red-400 font-semibold">
//                                 -
//                               </option>
//                             </select>
//                             <button
//                               onClick={() => placeOrder(Symbol)}
//                               className="rounded-md bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 text-sm font-medium shadow-sm transition"
//                             >
//                               Add
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Instructions Card */}
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
//               <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4 flex items-center">
//                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 How to Use
//               </h2>
//               <ol className="space-y-3 text-sm">
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
//                   <span>Search for stocks by symbol in the search bar</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
//                   <span>Select quantity and choose Buy/Sell</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
//                   <span>Click "Add" to add to your portfolio</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
//                   <span>Track your portfolio performance</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">5</span>
//                   <span>Download your portfolio and upload this file on uplaod portfolio</span>
//                 </li>

                
//               </ol>

//               <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-md">
//                 <p className="text-sm text-yellow-700 dark:text-yellow-300">
//                   <span className="font-semibold">⚠️ Disclaimer:</span> This simulator is for educational purposes only. No real trades are executed.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Portfolio */}
//           <div className="lg:col-span-2">
//             {/* Portfolio Summary Card */}
//             {portfolioSummary.length > 0 && (
//               <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 border border-sky-100 dark:border-slate-700">
//                 <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4">Portfolio Summary</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                   <div className="bg-sky-50 dark:bg-slate-700 p-4 rounded-lg">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Total Invested</p>
//                     <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">₹{totalInvested.toFixed(2)}</p>
//                   </div>
//                   <div className="bg-sky-50 dark:bg-slate-700 p-4 rounded-lg">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
//                     <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">₹{totalValue.toFixed(2)}</p>
//                   </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
//                     <thead className="bg-sky-50 dark:bg-slate-700">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Symbol</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Qty</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Avg Price</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Current</th>
//                         <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Market Value</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
//                       {portfolioSummary.map((item, index) => (
//                         <tr key={index} className="hover:bg-sky-50 dark:hover:bg-slate-700">
//                           <td className="px-4 py-3 whitespace-nowrap font-medium">{item.symbol}</td>
//                           <td className="px-4 py-3 whitespace-nowrap">{item.totalQty}</td>
//                           <td className="px-4 py-3 whitespace-nowrap">₹{item.avgPrice}</td>
//                           <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(item.currentPrice).toFixed(2)}</td>
//                           <td className="px-4 py-3 whitespace-nowrap">₹{item.marketValue}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {/* Transactions Card */}
//             <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400">Transactions</h2>
//                 <div className="flex items-center space-x-2">
//                  <div className="flex items-start bg-blue-100 px-3 py-3 rounded-md space-x-2">
//      <MdNoteAlt className="text-yellow-600" size={20} title="Note" />
//       <span className="text-sm text-gray-700 dark:text-gray-700">
//         Download your portfolio and upload this file on upload portfolio.
//       </span>
//     </div>
//                   <button
//                     onClick={downloadCSV}
//                     className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-md shadow-sm transition"
//                   >
//                     Download CSV
//                   </button>
//                 </div>
//               </div>

//               <div className="mb-4 border-b border-gray-200 dark:border-slate-700">
//                 <nav className="-mb-px flex space-x-8">
//                   <button
//                     onClick={() => setActiveTab("portfolio")}
//                     className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "portfolio" ? 'border-sky-500 text-sky-600 dark:text-sky-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
//                   >
//                     Current Transactions
//                   </button>
//                 </nav>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
//                   <thead className="bg-sky-50 dark:bg-slate-700">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Symbol</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Date/Time</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Type</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Qty</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Price</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Market Value</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
//                     {(activeTab === "portfolio" ? portfolio : savedPortfolio).map((row, idx) => (
//                       <tr key={idx} className="hover:bg-sky-50 dark:hover:bg-slate-700">
//                         <td className="px-4 py-3 whitespace-nowrap font-medium">{row.Symbol}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm">
//                           <div>{row.Date}</div>
//                           <div className="text-gray-500 dark:text-gray-400">{row.Time}</div>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.OrderType === "B" ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
//                             {row.OrderType === "B" ? 'Buy' : 'Sell'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap">{row.Qty}</td>
//                         <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(row.Price).toFixed(2)}</td>
//                         <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(row.MarketValue).toFixed(2)}</td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <button
//                             onClick={() => removeRecord(idx, activeTab)}
//                             className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
//                             title="Remove"
//                           >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {(activeTab === "portfolio" && portfolio.length === 0) || (activeTab === "savedPortfolio" && savedPortfolio.length === 0) ? (
//                 <div className="text-center py-10 text-gray-500 dark:text-gray-400">
//                   <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                   <h3 className="mt-2 text-sm font-medium">No transactions found</h3>
//                   <p className="mt-1 text-sm">Add some transactions to see them here</p>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal Dialog */}
//       {modal.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
//           <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full mx-4 border-2 border-sky-400 dark:border-sky-600">
//             <div className="p-6">
//               <div className="flex items-start">
//                 <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${modal.type === "error" ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
//                   {modal.type === "error" ? (
//                     <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                     </svg>
//                   ) : (
//                     <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   )}
//                 </div>
//                 <div className="ml-4">
//                   <h3 className={`text-lg font-medium ${modal.type === "error" ? 'text-red-800 dark:text-red-400' : 'text-green-800 dark:text-green-400'}`}>
//                     {modal.type === "error" ? "Error" : "Success"}
//                   </h3>
//                   <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                     <p>{modal.message}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuildOwnPort;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import { RiInformationFill } from "react-icons/ri";
import { MdNoteAlt } from "react-icons/md";

const BuildOwnPort = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [savedPortfolio, setSavedPortfolio] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: "", message: "" });
  const [activeTab, setActiveTab] = useState("portfolio");
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  // Fetch portfolio data on component mount
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.post(`${API_BASE}/file/build_Portfolio`);
        setPortfolioData(response.data.portfolio_data);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        toast.error("Failed to load stock data. Please try again later.");
      }
    };
    fetchPortfolioData();
  }, []);

  // Fetch saved portfolio data on component mount
  useEffect(() => {
    const fetchSavedPortfolio = async () => {
      const token = localStorage.getItem("authToken");
      if (!token || token === "null") {
        return; // Don't fetch if not logged in
      }
      try {
        const response = await axios.get(`${API_BASE}/file/paper-trade/fetch`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.length > 0 && response.data[0].data) {
          setSavedPortfolio(response.data[0].data);
        } else {
          setSavedPortfolio([]);
        }
      } catch (error) {
        console.error("Failed to fetch saved portfolio:", error);
        if (error.response?.status === 401) {
          toast.error("🚫 Please login to view your saved portfolio.");
        } else {
          toast.error("Failed to load saved portfolio. Please try again later.");
        }
      }
    };
    fetchSavedPortfolio();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value.toUpperCase();
    setSearchQuery(query);
    
    if (!query || !portfolioData.length) {
      setSearchResults([]);
      return;
    }
    
    const filtered = portfolioData.filter((stock) =>
      stock.Symbol.toUpperCase().includes(query)
    );
    setSearchResults(filtered);
  };

  // Place a buy/sell order
  const getPreviousWorkingDay = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    if (date.getDay() === 6) {
      date.setDate(date.getDate() - 1);
    } else if (date.getDay() === 0) {
      date.setDate(date.getDate() - 2);
    }

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const placeOrder = (symbol) => {
    const qtyInput = document.getElementById(`qty_${symbol}`);
    const orderTypeSelect = document.getElementById(`orderType_${symbol}`);
    const qty = parseInt(qtyInput?.value);
    const orderType = orderTypeSelect?.value;

    if (isNaN(qty) || qty <= 0) {
      setModal({ isOpen: true, type: "error", message: "Please enter a valid quantity!" });
      return;
    }

    const stock = portfolioData.find((s) => s.Symbol === symbol);
    if (!stock) {
      setModal({ isOpen: true, type: "error", message: "Stock data not found!" });
      return;
    }

    const buyPrice = parseFloat(stock.Close || 0);
    const workingDate = getPreviousWorkingDay();
    const time = new Date().toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Validate sell orders
    if (orderType === "S") {
      const combined = [...savedPortfolio, ...portfolio];
      const totalHeld = combined
        .filter((p) => p.Symbol === symbol)
        .reduce(
          (sum, row) => sum + (row.OrderType === "B" ? row.Qty : -row.Qty),
          0
        );

      if (qty > totalHeld) {
        setModal({
          isOpen: true,
          type: "error",
          message: `⚠️ Cannot sell ${qty} unit${qty > 1 ? "s" : ""} of ${symbol}. You only hold ${totalHeld} unit${totalHeld !== 1 ? "s" : ""}.`,
        });
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to SELL ${qty} unit${qty > 1 ? "s" : ""} of ${symbol}?`
      );
      if (!confirmed) return;
    }

    // Create new transaction
    const newEntry = {
      Symbol: stock.Symbol,
      Date: workingDate,
      Time: time,
      OrderType: orderType,
      Qty: qty,
      Price: buyPrice,
      MarketValue: (qty * buyPrice).toFixed(2),
      PE: isNaN(stock.pe) ? "N/A" : parseFloat(stock.pe).toFixed(2),
      EPS: isNaN(stock.eps) ? "N/A" : parseFloat(stock.eps).toFixed(2),
      BookValue: isNaN(stock.bv) ? "N/A" : parseFloat(stock.bv).toFixed(2),
    };

    // Update portfolio
    setPortfolio((prev) => [...prev, newEntry]);
    qtyInput.value = "";

    // Show success message for buy orders
    if (orderType === "B") {
      setModal({
        isOpen: true,
        type: "success",
        message: `Added ${qty} unit${qty > 1 ? "s" : ""} of ${symbol} to your simulated portfolio.`,
      });
    }
  };

  // Close modal dialog
  const closeModal = () => {
    setModal({ isOpen: false, type: "", message: "" });
  };

  // Remove a transaction record
  const removeRecord = (index, type) => {
    if (type === "savedPortfolio") {
      setSavedPortfolio((prev) => prev.filter((_, i) => i !== index));
    } else {
      setPortfolio((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Save portfolio to server
  const handleSavePortfolio = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "null") {
      toast.error("🚫 Please login to save your portfolio.");
      return;
    }

    if (portfolio.length === 0) {
      toast.error("No transactions to save.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/file/paper-trade/save?portfolioname=MyPortfolio`,
        portfolio,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.status === "Paper trade data saved successfully") {
        toast.success("Your portfolio was saved successfully!");
        setPortfolio([]); // Clear local portfolio
        // Fetch updated saved portfolio
        const savedResponse = await axios.get(`${API_BASE}/file/paper-trade/saved`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (savedResponse.data.length > 0 && savedResponse.data[0].data) {
          setSavedPortfolio(savedResponse.data[0].data);
        } else {
          setSavedPortfolio([]);
        }
      } else {
        toast.error(`Failed to save portfolio: ${response.data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to save portfolio:", error);
      if (error.response?.status === 401) {
        toast.error("🚫 Please login to save your portfolio.");
      } else {
        toast.error(`Failed to save portfolio: ${error.response?.data?.error || "Server error"}`);
      }
    }
  };

  // Delete portfolio from server
  const handleDeletePortfolio = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "null") {
      toast.error("🚫 Please login to delete your portfolio.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete your saved portfolio? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`${API_BASE}/file/paper-trade/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === "Paper trade data deleted successfully") {
        toast.success("Your portfolio was deleted successfully!");
        setSavedPortfolio([]); // Clear saved portfolio
      } else if (response.data.status === "Table does not exist") {
        toast.info("No saved portfolio found to delete.");
        setSavedPortfolio([]);
      } else {
        toast.error(`Failed to delete portfolio: ${response.data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      if (error.response?.status === 401) {
        toast.error("🚫 Please login to delete your portfolio.");
      } else {
        toast.error(`Failed to delete portfolio: ${error.response?.data?.error || "Server error"}`);
      }
    }
  };

  // Download portfolio as CSV
  const downloadCSV = () => {
    const allRows = [...savedPortfolio, ...portfolio];
    if (allRows.length === 0) {
      setModal({
        isOpen: true,
        type: "error",
        message: "No data to download.",
      });
      return;
    }

    const headers = Object.keys(allRows[0]);
    const csvRows = [
      headers.join(","),
      ...allRows.map((row) => headers.map((h) => row[h]).join(",")),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "portfolio.csv";
    a.click();
  };

  // Calculate portfolio summary
  const calculateSummary = () => {
    const allHoldings = [...savedPortfolio, ...portfolio];
    const summary = {};
    
    allHoldings.forEach(holding => {
      if (!summary[holding.Symbol]) {
        summary[holding.Symbol] = {
          totalQty: 0,
          totalValue: 0,
          avgPrice: 0
        };
      }
      
      if (holding.OrderType === "B") {
        summary[holding.Symbol].totalQty += holding.Qty;
        summary[holding.Symbol].totalValue += holding.Qty * holding.Price;
      } else {
        summary[holding.Symbol].totalQty -= holding.Qty;
        summary[holding.Symbol].totalValue -= holding.Qty * holding.Price;
      }
      
      if (summary[holding.Symbol].totalQty > 0) {
        summary[holding.Symbol].avgPrice = summary[holding.Symbol].totalValue / summary[holding.Symbol].totalQty;
      }
    });
    
    return Object.entries(summary)
      .filter(([_, data]) => data.totalQty > 0)
      .map(([symbol, data]) => ({
        symbol,
        totalQty: data.totalQty,
        avgPrice: data.avgPrice.toFixed(2),
        currentPrice: portfolioData.find(s => s.Symbol === symbol)?.Close || 0,
        marketValue: (data.totalQty * (portfolioData.find(s => s.Symbol === symbol)?.Close || 0)).toFixed(2),
        profitLoss: (data.totalQty * ((portfolioData.find(s => s.Symbol === symbol)?.Close || 0) - data.avgPrice)).toFixed(2),
        profitLossPct: ((((portfolioData.find(s => s.Symbol === symbol)?.Close || 0) - data.avgPrice) / data.avgPrice) * 100).toFixed(2)
      }));
  };

  const portfolioSummary = calculateSummary();
  const totalInvested = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.avgPrice) * item.totalQty, 0);
  const totalValue = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.marketValue), 0);
  const totalPL = portfolioSummary.reduce((sum, item) => sum + parseFloat(item.profitLoss), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-gray-50 dark:from-slate-900 dark:to-slate-800 font-sans text-gray-800 dark:text-gray-200">
      <Navbar />
      
      <div className="max-w-7xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-700 dark:text-sky-400 mb-4">
            <span className="inline-block mr-3">📈</span>
            Portfolio Simulator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Practice your investment strategies with real market data without risking real money
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and Instructions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Stocks
              </h2>
              <div className="relative">
                <input
                  type="text"
                  aria-label="Search stock by symbol"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-white dark:bg-slate-700 border border-sky-200 dark:border-slate-600 shadow-sm placeholder-sky-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                  placeholder="Search stock by symbol..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-sky-400 dark:text-slate-400 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {searchResults.map(({ Symbol, Close }, idx) => (
                      <div key={`${Symbol}_${idx}`} className="bg-sky-50 dark:bg-slate-700 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-sky-700 dark:text-sky-400">{Symbol}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">₹{parseFloat(Close).toFixed(2)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              id={`qty_${Symbol}`}
                              type="number"
                              min="1"
                              className="w-16 px-2 py-1 bg-white dark:bg-slate-600 rounded-md border border-sky-200 dark:border-slate-500 focus:ring-1 focus:ring-sky-400 focus:outline-none"
                              placeholder="Qty"
                            />
                            <select
                              id={`orderType_${Symbol}`}
                              className="rounded-md border border-sky-200 dark:border-slate-500 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-400 bg-white dark:bg-slate-600 text-sm"
                              defaultValue="B"
                            >
                              <option value="B" className="text-green-700 dark:text-green-400 font-semibold">
                                +
                              </option>
                              <option value="S" className="text-red-700 dark:text-red-400 font-semibold">
                                -
                              </option>
                            </select>
                            <button
                              onClick={() => placeOrder(Symbol)}
                              className="rounded-md bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 text-sm font-medium shadow-sm transition"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
              <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How to Use
              </h2>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
                  <span>Search for stocks by symbol in the search bar</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
                  <span>Select quantity and choose Buy/Sell</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
                  <span>Click "Add" to add to your portfolio</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">4</span>
                  <span>Track your portfolio performance</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 bg-sky-100 dark:bg-slate-700 text-sky-700 dark:text-sky-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">5</span>
                  <span>Download your portfolio and upload this file on upload portfolio</span>
                </li>
              </ol>

              <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-md">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  <span className="font-semibold">⚠️ Disclaimer:</span> This simulator is for educational purposes only. No real trades are executed.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Portfolio */}
          <div className="lg:col-span-2">
            {/* Portfolio Summary Card */}
            {portfolioSummary.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 border border-sky-100 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400 mb-4">Portfolio Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-sky-50 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Invested</p>
                    <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">₹{totalInvested.toFixed(2)}</p>
                  </div>
                  <div className="bg-sky-50 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
                    <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">₹{totalValue.toFixed(2)}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                    <thead className="bg-sky-50 dark:bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Symbol</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Avg Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Current</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Market Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                      {portfolioSummary.map((item, index) => (
                        <tr key={index} className="hover:bg-sky-50 dark:hover:bg-slate-700">
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{item.symbol}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.totalQty}</td>
                          <td className="px-4 py-3 whitespace-nowrap">₹{item.avgPrice}</td>
                          <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(item.currentPrice).toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">₹{item.marketValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Transactions Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-sky-100 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-sky-700 dark:text-sky-400">Transactions</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-start bg-blue-100 px-3 py-3 rounded-md space-x-2">
                    <MdNoteAlt className="text-yellow-600" size={20} title="Note" />
                    <span className="text-sm text-gray-700 dark:text-gray-700">
                      Download your portfolio and upload this file on upload portfolio.
                    </span>
                  </div>
                  <button
                    onClick={handleSavePortfolio}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                  >
                    Save Portfolio
                  </button>
                  <button
                    onClick={handleDeletePortfolio}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                  >
                    Delete Portfolio
                  </button>
                  <button
                    onClick={downloadCSV}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-md shadow-sm transition"
                  >
                    Download CSV
                  </button>
                </div>
              </div>

              <div className="mb-4 border-b border-gray-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("portfolio")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === "portfolio" ? 'border-sky-500 text-sky-600 dark:text-sky-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}`}
                  >
                    Current Transactions
                  </button>
                </nav>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                  <thead className="bg-sky-50 dark:bg-slate-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Date/Time</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Market Value</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                    {(activeTab === "portfolio" ? [...savedPortfolio, ...portfolio] : savedPortfolio).map((row, idx) => (
                      <tr key={idx} className="hover:bg-sky-50 dark:hover:bg-slate-700">
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{row.Symbol}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div>{row.Date}</div>
                          <div className="text-gray-500 dark:text-gray-400">{row.Time}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.OrderType === "B" ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                            {row.OrderType === "B" ? 'Buy' : 'Sell'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{row.Qty}</td>
                        <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(row.Price).toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">₹{parseFloat(row.MarketValue).toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button
                            onClick={() => removeRecord(idx, activeTab)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Remove"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {(activeTab === "portfolio" && portfolio.length === 0 && savedPortfolio.length === 0) || (activeTab === "savedPortfolio" && savedPortfolio.length === 0) ? (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium">No transactions found</h3>
                  <p className="mt-1 text-sm">Add some transactions to see them here</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full mx-4 border-2 border-sky-400 dark:border-sky-600">
            <div className="p-6">
              <div className="flex items-start">
                <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${modal.type === "error" ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                  {modal.type === "error" ? (
                    <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-medium ${modal.type === "error" ? 'text-red-800 dark:text-red-400' : 'text-green-800 dark:text-green-400'}`}>
                    {modal.type === "error" ? "Error" : "Success"}
                  </h3>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>{modal.message}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildOwnPort;


