// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/api/stocks/generate_values`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/api/stocks/generate_prediction`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   if (!marketData || !predictionData) {
//     return (
//       <center>
//         <span className="font-bold">The Data is loading, please wait...</span>
//         <br />
//         <span className="loading loading-bars loading-lg"></span>
//       </center>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="mt-10">
//       <div className="text-xl font-bold">
//         Market Summary for{" "}
//         <span className="text-xl text-slate-600 dark:text-white">
//           {User_Selection.stock_name} ({User_Selection.stock_symbol})
//         </span>
//         <br />
//         <span className="text-lg">{MarketSummary.date_string}, {MarketSummary.week_day}</span>
//       </div>

//       <div className="flex flex-col md:flex-row mt-2 gap-4 p-4">
//         {MarketSummary.change_from_prev_close >= 0 ? (
//           <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl">
//             <FaArrowTrendUp className="text-2xl" />
//             {MarketSummary.Close} INR
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
//             <FaArrowTrendDown className="text-2xl" />
//             {MarketSummary.Close} INR
//           </div>
//         )}

//         <div
//           className={`font-semibold p-2 rounded-lg ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </div>

//       {/* Grouped Cards for Market Data */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <GroupedCard
//           title="Price Summary"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Quantity", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           data={[
//             { label: "Delivery Percentage", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Stock Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>

//       {/* Prediction Data */}
//       <div className="m-5 p-1 text-center">
//         <div className="text-xl font-bold text-gray-800 dark:text-white">
//           On <span className="">{prediction1.date}</span>, the price may open around{" "}
//           <span className="text-cyan-600 mx-2">{prediction1.predicted_open}</span> to{" "}
//           <span className="text-cyan-600 mx-2">{prediction2.predicted_open}</span>.
//         </div>
//       </div>
//     </div>
//   );
// };

// // Grouped Card Component for Market Data
// const GroupedCard = ({ title, data }) => (
//   <div className="p-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 transition duration-200 hover:scale-105">
//     <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">{title}</div>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {data.map((item, index) => (
//         <div key={index} className="flex flex-col items-center">
//           <span className="font-bold text-gray-500 dark:text-gray-400">{item.label}</span>
//           <span className="text-lg font-bold text-black-600 dark:text-cyan-400">{item.value}</span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default OpenCloseCards;

// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Function to get auth token (same as in EquityHub and Mysearch)
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error("Please log in to fetch stock data.");
//         }

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/api/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`, // Add Authorization header
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/api/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`, // Add Authorization header
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   if (!marketData || !predictionData) {
//     return (
//       <center>
//         <span className="font-bold">The Data is loading, please wait...</span>
//         <br />
//         <span className="loading loading-bars loading-lg"></span>
//       </center>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="mt-10">
//       <div className="text-xl font-bold">
//         Market Summary for{" "}
//         <span className="text-xl text-slate-600 dark:text-white">
//           {User_Selection.stock_name} ({User_Selection.stock_symbol})
//         </span>
//         <br />
//         <span className="text-lg">{MarketSummary.date_string}, {MarketSummary.week_day}</span>
//       </div>

//       <div className="flex flex-col md:flex-row mt-2 gap-4 p-4">
//         {MarketSummary.change_from_prev_close >= 0 ? (
//           <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xl">
//             <FaArrowTrendUp className="text-2xl" />
//             {MarketSummary.Close} INR
//           </div>
//         ) : (
//           <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
//             <FaArrowTrendDown className="text-2xl" />
//             {MarketSummary.Close} INR
//           </div>
//         )}

//         <div
//           className={`font-semibold p-2 rounded-lg ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </div>

//       {/* Grouped Cards for Market Data */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <GroupedCard
//           title="Price Summary"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Quantity", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           data={[
//             { label: "Delivery Percentage", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Stock Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>

//       {/* Prediction Data */}
//       {/* <div className="m-5 p-1 text-center">
//         <div className="text-xl font-bold text-gray-800 dark:text-white">
//           On <span className="">{prediction1.date}</span>, the price may open around{" "}
//           <span className="text-cyan-600 mx-2">{prediction1.predicted_open}</span> to{" "}
//           <span className="text-cyan-600 mx-2">{prediction2.predicted_open}</span>.
//         </div>
//       </div> */}
//     </div>
//   );
// };

// // Grouped Card Component for Market Data
// const GroupedCard = ({ title, data }) => (
//   <div className="p-5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 transition duration-200 hover:scale-105">
//     <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">{title}</div>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {data.map((item, index) => (
//         <div key={index} className="flex flex-col items-center">
//           <span className="font-bold text-gray-500 dark:text-gray-400">{item.label}</span>
//           <span className="text-lg font-bold text-black-600 dark:text-cyan-400">{item.value}</span>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// export default OpenCloseCards;




// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";


// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Function to get auth token (same as in EquityHub and Mysearch)
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error("Please log in to fetch stock data.");
//         }

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/api/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`, // Add Authorization header
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/api/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`, // Add Authorization header
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div
//         className="text-center mt-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <span className="font-bold text-lg text-gray-700 dark:text-gray-300">
//           The Data is loading, please wait...
//         </span>
//         <br />
//         <span className="loading loading-bars loading-lg mt-3"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;


//   return (

//     <div className="mt-10 px-4 md:px-8">
//        <motion.div
//         className="text-3xl font-extrabold text-gray-800 dark:text-white"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Market Summary for{" "}
//         <span className="text-cyan-600 dark:text-cyan-300">
//           {User_Selection.stock_name} ({User_Selection.stock_symbol})
//         </span>
//         <br />
//        <div className="text-md text-gray-500 dark:text-gray-300 mt-1">
//         {MarketSummary.date_string}, {MarketSummary.week_day}   
//           </div>
//        </motion.div>

//  <motion.div
//         className="flex flex-col md:flex-row items-center gap-4 mt-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//    <div
//           className={`flex items-center gap-2 font-bold text-2xl ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-3xl" />
//           ) : (
//             <FaArrowTrendDown className="text-3xl" />
//           )}
//           {MarketSummary.Close} INR
//         </div>
//         <div
//           className={`text-sm md:text-base font-semibold px-4 py-1.5 rounded-full shadow transition duration-300 ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       {/* Grouped Cards for Market Data */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-8 w-full">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-blue-500"
//           colorTo="to-purple-500"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` ,color: "text-gray-800" },
//             { label: "Open", value: `${MarketSummary.Open} INR` ,  color: "text-gray-800 font-bold" },
//             { label: "Close", value: `${MarketSummary.Close} INR`,color: "text-gray-800" },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//            colorFrom="from-orange-500"
//           colorTo="to-pink-500"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           colorFrom="from-teal-500"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Quantity", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//            colorFrom="from-cyan-600"
//           colorTo="to-violet-600"
//           data={[
//             { label: "Delivery Percentage", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Stock Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>

//       {/* Prediction Data */}
//       {/* <div className="m-5 p-1 text-center">
//         <div className="text-xl font-bold text-gray-800 dark:text-white">
//           On <span className="">{prediction1.date}</span>, the price may open around{" "}
//           <span className="text-cyan-600 mx-2">{prediction1.predicted_open}</span> to{" "}
//           <span className="text-cyan-600 mx-2">{prediction2.predicted_open}</span>.
//         </div>
//       </div> */}
//     </div>
//   );
// };

// // Grouped Card Component for Market Data
// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative p-5 rounded-2xl w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 overflow-hidden"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//   >
//     {/* Gradient Top Bar */}
//     <div
//       className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo} animate-pulse`}
//     ></div>
//     {/* Title */}
//     <div className="text-lg font-bold text-gray-700 dark:text-white mt-2 mb-4 text-center">
//       {title}
//     </div>
//     {/* Data Grid */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
//       {data.map((item, index) => (
//         <div key={index} className="flex flex-col items-center text-center w-full">
//           <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//             {item.label}
//           </span>
//           <span
//             className={`text-sm font-normal ${
//               item.color || "text-gray-800 dark:text-cyan-400"
//             }`}
//           >
//             {item.value}
//           </span>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;

// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/api/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/api/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div className="text-center mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//         <span className="font-semibold text-lg text-gray-700 dark:text-gray-300">
//           Data is loading, please wait...
//         </span>
//         <br />
//         <span className="loading loading-bars loading-lg mt-3"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;

//   return (
//     <div className="px-4 md:px-8 py-6">
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
//           Market Summary for{" "}
//           <span className="text-cyan-600 dark:text-cyan-400">
//             {User_Selection.stock_name} ({User_Selection.stock_symbol})
//           </span>
//         </h2>
//         <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string}, {MarketSummary.week_day}
//         </p>
//       </motion.div>

//       <motion.div
//         className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-2 font-semibold text-xl ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-2xl" />
//           ) : (
//             <FaArrowTrendDown className="text-2xl" />
//           )}
//           {MarketSummary.Close} INR
//         </div>
//         <div
//           className={`text-sm px-4 py-1.5 rounded-full shadow-md ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-200 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-blue-500"
//           colorTo="to-purple-500"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           colorFrom="from-orange-500"
//           colorTo="to-pink-500"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           colorFrom="from-teal-500"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Quantity", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           colorFrom="from-cyan-600"
//           colorTo="to-violet-600"
//           data={[
//             { label: "Delivery Percentage", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Stock Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02]"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//   >
//    {/* Gradient Top Bar */}
//      <div
//        className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo} animate-pulse`}
//      ></div>
//     <h3 className="text-center text-lg font-bold text-gray-800 dark:text-white mt-2 mb-4">
//       {title}
//     </h3>
//     <div className="grid grid-cols-1 gap-3">
//       {data.map((item, index) => (
//         <div key={index} className="text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className={`text-base font-semibold text-gray-800 dark:text-cyan-400`}>
//             {item.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;


// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) return <p className="text-center mt-8 text-red-500 font-medium">{error}</p>;

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
//           Fetching data, please wait...
//         </p>
//         <span className="loading loading-bars loading-lg text-cyan-500"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;

//   return (
//     <div className="w-full px-4 md:px-10 py-6">
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1">
//           Market Summary:{" "}
//           <span className="text-cyan-700 dark:text-cyan-400">
//             {User_Selection.stock_name} ({User_Selection.stock_symbol})
//           </span>
//         </h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string} ({MarketSummary.week_day})
//         </p>
//       </motion.div>

//       <motion.div
//         className="flex flex-wrap justify-center items-center gap-3 mt-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-2 text-xl font-semibold ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-2xl" />
//           ) : (
//             <FaArrowTrendDown className="text-2xl" />
//           )}
//           {MarketSummary.Close} INR
//         </div>

//         <div
//           className={`text-sm px-4 py-1 rounded-full shadow-md font-medium ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       {/* Info Cards */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-sky-500"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           colorFrom="from-orange-400"
//           colorTo="to-pink-500"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           colorFrom="from-teal-400"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Qty", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           colorFrom="from-violet-500"
//           colorTo="to-purple-600"
//           data={[
//             { label: "Delivery %", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//   >
//     <div
//       className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}
//     ></div>
//     <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white mt-3 mb-4">
//       {title}
//     </h3>
//     <div className="space-y-3">
//       {data.map((item, index) => (
//         <div key={index} className="text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className="text-base font-medium text-gray-800 dark:text-cyan-400">
//             {item.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;



// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => localStorage.getItem("authToken");

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/api/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/api/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         setMarketData(await marketResponse.json());
//         setPredictionData(await predictionResponse.json());
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) return <p className="text-center mt-8 text-red-500 font-medium">{error}</p>;

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
//           Fetching data, please wait...
//         </p>
//         <span className="loading loading-bars loading-lg text-cyan-500"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="w-full px-4 md:px-10 py-6">
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1">
//           Market Summary:{" "}
//           <span className="text-cyan-700 dark:text-cyan-400">
//             {User_Selection.stock_name} ({User_Selection.stock_symbol})
//           </span>
//         </h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string} ({MarketSummary.week_day})
//         </p>
//       </motion.div>

//       <motion.div
//         className="flex flex-wrap justify-center items-center gap-3 mt-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-2 text-xl font-semibold ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-2xl" />
//           ) : (
//             <FaArrowTrendDown className="text-2xl" />
//           )}
//           {MarketSummary.Close} INR
//         </div>

//         <div
//           className={`text-sm px-4 py-1 rounded-full shadow-md font-medium ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       {/* Info Cards */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-sky-500"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           colorFrom="from-orange-400"
//           colorTo="to-pink-500"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           colorFrom="from-teal-400"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Qty", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           colorFrom="from-violet-500"
//           colorTo="to-purple-600"
//           data={[
//             { label: "Delivery %", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>
//       {/* Prediction Data */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 m-5 border border-gray-200 dark:border-gray-700">
//   <div className="text-center">
//     <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
//       Price Prediction for {prediction1.date}
//     </h3>
//     <div className="flex items-center justify-center space-x-2">
//       <p className="text-2xl font-bold text-gray-800 dark:text-white">
//         Expected opening range:
//       </p>
//       <div className="flex items-center bg-cyan-50 dark:bg-cyan-900/30 px-4 py-2 rounded-lg">
//         <span className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl">
//           {prediction1.predicted_open}
//         </span>
//         <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
//         <span className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl">
//           {prediction2.predicted_open}
//         </span>
//       </div>
//     </div>
//     <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
//       Based on current market trends and historical data
//     </p>
//   </div>
// </div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//   >
//     <div
//       className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}
//     ></div>
//     <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white mt-3 mb-4">
//       {title}
//     </h3>
//     <div className="space-y-3">
//       {data.map((item, index) => (
//         <div key={index} className="text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className="text-base font-medium text-gray-800 dark:text-cyan-400">
//             {item.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;

//---------------------Shreya code--------------------------------

// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

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

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//     const cacheKey = `openclose_${symbol}_${companyName}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       setMarketData(cachedData.marketData);
//       setPredictionData(cachedData.predictionData);
//       setError(null);
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketResponse, predictionResponse] = await Promise.all([
//           fetch(`${API_BASE}/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketResponse.ok) throw new Error("Failed to fetch market data");
//         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction data");

//         const marketData = await marketResponse.json();
//         const predictionData = await predictionResponse.json();
//         setMarketData(marketData);
//         setPredictionData(predictionData);
//         setCachedData(cacheKey, { marketData, predictionData });
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error) return <p className="text-center mt-8 text-red-500 font-medium">{error}</p>;

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center py-12"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
//           Fetching data, please wait...
//         </p>
//         <span className="loading loading-bars loading-lg text-cyan-500"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="w-full px-4 md:px-10 py-6">
//       <motion.div
//         className="text-center"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1">
//           Market Summary:{" "}
//           <span className="text-cyan-700 dark:text-cyan-400">
//             {User_Selection.stock_name} ({User_Selection.stock_symbol})
//           </span>
//         </h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string} ({MarketSummary.week_day})
//         </p>
//       </motion.div>
//       <motion.div
//         className="flex flex-wrap justify-center items-center gap-3 mt-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-2 text-xl font-semibold ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-2xl" />
//           ) : (
//             <FaArrowTrendDown className="text-2xl" />
//           )}
//           {MarketSummary.Close} INR
//         </div>
//         <div
//           className={`text-sm px-4 py-1 rounded-full shadow-md font-medium ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-white"
//               : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-white"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-sky-500"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Previous Close", value: `${MarketSummary.PrevClose} INR` },
//             { label: "Open", value: `${MarketSummary.Open} INR` },
//             { label: "Close", value: `${MarketSummary.Close} INR` },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           colorFrom="from-orange-400"
//           colorTo="to-pink-500"
//           data={[
//             { label: "High", value: `${MarketSummary.High} INR` },
//             { label: "Low", value: `${MarketSummary.Low} INR` },
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//           ]}
//         />
//         <GroupedCard
//           title="Volume & Value"
//           colorFrom="from-teal-400"
//           colorTo="to-cyan-500"
//           data={[
//             { label: "Total Traded Value", value: `${MarketSummary.TotalTradedValue} INR` },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Qty", value: MarketSummary.DeliverableQty },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           colorFrom="from-violet-500"
//           colorTo="to-purple-600"
//           data={[
//             { label: "Delivery %", value: `${MarketSummary.DeliveryPercentage}%` },
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 m-5 border border-gray-200 dark:border-gray-700">
//         <div className="text-center">
//           <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
//             Price Prediction for {prediction1.date}
//           </h3>
//           <div className="flex items-center justify-center space-x-2">
//             <p className="text-2xl font-bold text-gray-800 dark:text-white">
//               Expected opening range:
//             </p>
//             <div className="flex items-center bg-cyan-50 dark:bg-cyan-900/30 px-4 py-2 rounded-lg">
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl">
//                 {prediction1.predicted_open}
//               </span>
//               <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-2xl">
//                 {prediction2.predicted_open}
//               </span>
//             </div>
//           </div>
//           <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
//             Based on current market trends and historical data
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//   >
//     <div
//       className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}
//     ></div>
//     <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white mt-3 mb-4">
//       {title}
//     </h3>
//     <div className="space-y-3">
//       {data.map((item, index) => (
//         <div key={index} className="text-center">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className="text-base font-medium text-gray-800 dark:text-cyan-400">
//             {item.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;













//------------------------swati code working code ----------------


// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { HashLoader } from "react-spinners";

// const formatINR = (value) => {
//   if (!value || isNaN(value)) return "₹0.00";
//   const num = Number(value);
//   if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
//   if (num >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
//   if (num >= 1e3) return `₹${(num / 1e3).toFixed(2)} K`;
//   return `₹${num.toFixed(2)}`;
// };

// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds


//   const getAuthToken = () => localStorage.getItem("authToken");

//    const getCachedData = (key) => {
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
//   localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
// };

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//       const cacheKey = `openclose_${symbol}_${companyName}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       setMarketData(cachedData.marketData);
//       setPredictionData(cachedData.predictionData);
//       setError(null);
//       return;
//      }

//     const fetchData = async () => {
//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketRes, predictionRes] = await Promise.all([
//           fetch(`${API_BASE}/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketRes.ok) throw new Error("Failed to fetch market data");
//         if (!predictionRes.ok) throw new Error("Failed to fetch prediction data");

//         const market = await marketRes.json();
//         const prediction = await predictionRes.json();

//         setMarketData(market);
//         setPredictionData(prediction);
//         setCachedData(cacheKey, { marketData: market, predictionData: prediction });
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error)
//     return (
//       <motion.div
//         className="text-center mt-12 text-red-500 font-medium text-lg"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {error}
//       </motion.div>
//     );

//   if (!marketData || !predictionData) {
//     return (
//        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
//       <HashLoader color="#0369a1" size={60} />
//       <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
//         CMDA...
//       </p>
//     </div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <motion.div
//         className="text-center mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//           {User_Selection.stock_name} 
//           <span className="text-cyan-600 dark:text-cyan-400"> ({User_Selection.stock_symbol})</span>
//         </h1>
//         <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string} ({MarketSummary.week_day})
//         </p>
//       </motion.div>

//       <motion.div
//         className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-3 text-2xl sm:text-xl font-bold ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-xl sm:text-4xl" />
//           ) : (
//             <FaArrowTrendDown className="text-xl sm:text-4xl" />
//           )}
//           {(MarketSummary.Close)}
//         </div>
//         <div
//           className={`text-sm sm:text-base px-4 py-2 rounded-full font-semibold shadow-sm ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
//               : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-cyan-500"
//           colorTo="to-blue-600"
//           data={[
//             { label: "Previous Close", value: (MarketSummary.PrevClose) },
//             { label: "Open", value: (MarketSummary.Open) },
//             { label: "Close", value: (MarketSummary.Close) },
//             { label: "High", value:(MarketSummary.High) },
//             { label: "Low", value: (MarketSummary.Low) },
//           ]}
//         />
//         <GroupedCard
//           title="Trading Summary"
//           colorFrom="from-orange-400"
//           colorTo="to-red-500"
//           data={[
//             { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//             { label: "Traded Value", value: (MarketSummary.TotalTradedValue) },
//             { label: "Total Trades", value: MarketSummary.TotalTrades },
//             { label: "Deliverable Qty", value: MarketSummary.DeliverableQty},
//             { label: "Delivery %", value: `${MarketSummary.DeliveryPercentage}%` },
//           ]}
//         />
//         <GroupedCard
//           title="Stock Details"
//           colorFrom="from-purple-500"
//           colorTo="to-indigo-600"
//           data={[
//             { label: "Face Value", value: User_Selection.face_value },
//             { label: "Dividend Yield", value:`${User_Selection.dividend_yield}` },
//             { label: "Market Cap", value:(User_Selection.market_cap) },
//             { label: "Symbol", value: User_Selection.stock_symbol },
//           ]}
//         />
//       </div>

//       <motion.div
//         className="bg-white dark:bg-gray-800  p-6 sm:p-8  dark:border-gray-700"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="text-center">
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
//             Price Prediction for {prediction1.date}
//           </h3>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
//             <span className="text-lg font-semibold text-gray-800 dark:text-white">
//               Opening Range:
//             </span>
//             <div className="flex items-center bg-cyan-50 dark:bg-cyan-900/50 px-4 py-2 rounded-lg">
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">
//                 {formatINR(prediction1.predicted_open)}
//               </span>
//               <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">
//                 {formatINR(prediction2.predicted_open)}
//               </span>
//             </div>
//           </div>
//           <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//             Based on current market trends and historical data
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//   >
//     <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}></div>
//     <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-white mt-4 mb-5">{title}</h3>
//     <div className="space-y-4">
//       {data.map((item, index) => (
//         <div key={index} className="flex justify-between items-center px-2">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className="text-base font-medium text-gray-800 dark:text-cyan-400">{item.value}</p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );
// export default OpenCloseCards;



//++++++++++++++++++++++++++++++++++++++++++++++



// import React, { useEffect, useState } from "react";
// import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
// import { motion } from "framer-motion";

// const formatINR = (value) => {
//   if (!value || isNaN(value)) return "₹0.00";
//   const num = Number(value);
//   if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
//   if (num >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
//   if (num >= 1e3) return `₹${(num / 1e3).toFixed(2)} K`;
//   return `₹${num.toFixed(2)}`;
// };


// const OpenCloseCards = ({ symbol, companyName }) => {
//   const [marketData, setMarketData] = useState(null);
//   const [predictionData, setPredictionData] = useState(null);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds


//   // const getAuthToken = () => localStorage.getItem("authToken");

//    const getCachedData = (key) => {
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
//   localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
// };

//   useEffect(() => {
//     if (!symbol || !companyName) return;

//       const cacheKey = `openclose_${symbol}_${companyName}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       setMarketData(cachedData.marketData);
//       setPredictionData(cachedData.predictionData);
//       setError(null);
//       return;
//      }

//     const fetchData = async () => {
//       try {
//         // const token = getAuthToken();
//         // if (!token) throw new Error("Please log in to fetch stock data.");

//         const [marketRes, predictionRes] = await Promise.all([
//           fetch(`${API_BASE}/stocks/generate_values`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               // Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol, companyName }),
//           }),
//           fetch(`${API_BASE}/stocks/generate_prediction`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               // Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ symbol: symbol.trim(), companyName: companyName.trim() }),
//           }),
//         ]);

//         if (!marketRes.ok) throw new Error("Failed to fetch market data");
//         if (!predictionRes.ok) throw new Error("Failed to fetch prediction data");

//         const market = await marketRes.json();
//         const prediction = await predictionRes.json();

//         setMarketData(market);
//         setPredictionData(prediction);
//         setCachedData(cacheKey, { marketData: market, predictionData: prediction });
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, [symbol, companyName]);

//   if (error)
//     return (
//       <motion.div
//         className="text-center mt-12 text-red-500 font-medium text-lg"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {error}
//       </motion.div>
//     );

//   if (!marketData || !predictionData) {
//     return (
//       <motion.div
//         className="flex flex-col items-center justify-center min-h-[50vh]"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
//           Fetching data, please wait...
//         </p>
//         <span className="loading loading-spinner loading-lg text-cyan-500"></span>
//       </motion.div>
//     );
//   }

//   const { MarketSummary, User_Selection } = marketData;
//   const { prediction1, prediction2 } = predictionData;

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <motion.div
//         className="text-center mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
//           {User_Selection.stock_name} 
//           <span className="text-cyan-600 dark:text-cyan-400"> ({User_Selection.stock_symbol})</span>
//         </h1>
//         <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
//           {MarketSummary.date_string} ({MarketSummary.week_day})
//         </p>
//       </motion.div>

//       <motion.div
//         className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div
//           className={`flex items-center gap-3 text-2xl sm:text-xl font-bold ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "text-green-600 dark:text-green-400"
//               : "text-red-600 dark:text-red-400"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close >= 0 ? (
//             <FaArrowTrendUp className="text-xl sm:text-4xl" />
//           ) : (
//             <FaArrowTrendDown className="text-xl sm:text-4xl" />
//           )}
//           {(MarketSummary.Close)}
//         </div>
//         <div
//           className={`text-sm sm:text-base px-4 py-2 rounded-full font-semibold shadow-sm ${
//             MarketSummary.change_from_prev_close >= 0
//               ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
//               : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
//           }`}
//         >
//           {MarketSummary.change_from_prev_close} ({MarketSummary.percent_change}%)
//         </div>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//         <GroupedCard
//           title="Price Summary"
//           colorFrom="from-cyan-500"
//           colorTo="to-blue-600"
//           data={[
//             { label: "Previous Close", value: (MarketSummary.PrevClose) },
//             { label: "Open", value: (MarketSummary.Open) },
//             { label: "Close", value: (MarketSummary.Close) },
//             { label: "High", value: (MarketSummary.High) },
//             { label: "Low", value: (MarketSummary.Low) },
//           ]}
//         />
//       <GroupedCard
//   title="Trading Summary"
//   colorFrom="from-orange-400"
//   colorTo="to-red-500"
//   data={[
//     { label: "Total Traded Qty", value: MarketSummary.TotalTradedQty },
//     {
//       label: "Traded Value",
//       value: (MarketSummary.TotalTradedValue)
//     },
//     { label: "Total Trades", value: MarketSummary.TotalTrades },
//     { label: "Deliverable Qty", value: MarketSummary.DeliverableQty },
//     { label: "Delivery %", value: `${MarketSummary.DeliveryPercentage}%` },
//   ]}
// />


// <GroupedCard
//   title="Stock Details"
//   colorFrom="from-purple-500"
//   colorTo="to-indigo-600"
//   data={[
//     { label: "Face Value", value: User_Selection.face_value },
//     { label: "Dividend Yield", value: `${User_Selection.dividend_yield}` },
//     { label: "Market Cap", value: (User_Selection.market_cap) },
//     { label: "Symbol", value: User_Selection.stock_symbol },
//   ]}
// />
//       </div>

//        <motion.div
//         className="bg-white dark:bg-gray-800  p-6 sm:p-8  dark:border-gray-700"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="text-center">
//           <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
//             Price Prediction for {prediction1.date}
//           </h3>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
//             <span className="text-lg font-semibold text-gray-800 dark:text-white">
//               Opening Range:
//             </span>
//             <div className="flex items-center bg-cyan-50 dark:bg-cyan-900/50 px-4 py-2 rounded-lg">
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">
//                 {formatINR(prediction1.predicted_open)}
//               </span>
//               <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
//               <span className="text-cyan-600 dark:text-cyan-400 font-bold text-lg">
//                 {formatINR(prediction2.predicted_open)}
//               </span>
//             </div>
//           </div>
//           <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//             Based on current market trends and historical data
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
//   <motion.div
//     className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5 }}
//   >
//     <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}></div>
//     <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-white mt-4 mb-5">{title}</h3>
//     <div className="space-y-4">
//       {data.map((item, index) => (
//         <div key={index} className="flex justify-between items-center px-2">
//           <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
//           <p className="text-base font-medium text-gray-800 dark:text-cyan-400">{item.value}</p>
//         </div>
//       ))}
//     </div>
//   </motion.div>
// );

// export default OpenCloseCards;




import React, { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { HashLoader } from "react-spinners";

const formatINR = (value) => {
  if (!value || (typeof value !== "string" && isNaN(value))) return "₹0.00";
  const num = typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);
  if (isNaN(num)) return "₹0.00";
  if (num >= 1e7) return `₹${(num / 1e7).toFixed(2)} Cr`;
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(2)} L`;
  if (num >= 1e3) return `₹${(num / 1e3).toFixed(2)} K`;
  return `₹${num.toFixed(2)}`;
};

const formatNumber = (value) => {
  if (!value || (typeof value !== "string" && isNaN(value))) return "0";
  const num = typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);
  return isNaN(num) ? "0" : num.toLocaleString("en-IN");
};

const OpenCloseCards = ({ symbol, companyName }) => {
  const [marketData, setMarketData] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  };

  const setCachedData = (key, data) => {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  };

  useEffect(() => {
    if (!symbol || !companyName) return;

    const cacheKey = `openclose_${symbol}_${companyName}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setMarketData(cachedData);
      setError(null);
      return;
    }

    const fetchData = async () => {
      try {
        const marketRes = await fetch(`${API_BASE}/stocks/test/generate_values`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symbol: symbol.toUpperCase(), companyName }), // Ensure uppercase symbol
        });

        if (!marketRes.ok) throw new Error(`HTTP ${marketRes.status}: Failed to fetch market data`);

        const market = await marketRes.json();
        if (!market.raw?.mkt_summary) throw new Error("Invalid market data structure");
        setMarketData(market);
        setCachedData(cacheKey, market);
        setError(null);
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError(err.message);
      }
    };

    fetchData();
  }, [symbol, companyName, API_BASE]);

  if (error) {
    return (
      <motion.div
        className="text-center mt-12 text-red-500 font-medium text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!marketData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
        <HashLoader color="#0369a1" size={60} />
        <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
          CMDA...
        </p>
      </div>
    );
  }

  const { raw } = marketData;
  const { mkt_summary } = raw;

  // Compute change and percent change if not provided
  const prevClose = Number(mkt_summary.PrevClose?.replace(/,/g, "") || 0);
  const close = Number(mkt_summary.Close?.replace(/,/g, "") || 0);
  const change_from_prev_close = (close - prevClose).toFixed(2);
  const percent_change = prevClose ? ((change_from_prev_close / prevClose) * 100).toFixed(2) : "0.00";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          {companyName}
          <span className="text-cyan-600 dark:text-cyan-400"> ({symbol})</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {mkt_summary.date_string || "Date not available"} ({mkt_summary.week_day || "N/A"})
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={`flex items-center gap-3 text-2xl sm:text-xl font-bold ${Number(change_from_prev_close) >= 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
            }`}
        >
          {Number(change_from_prev_close) >= 0 ? (
            <FaArrowTrendUp className="text-xl sm:text-4xl" />
          ) : (
            <FaArrowTrendDown className="text-xl sm:text-4xl" />
          )}
          {formatINR(mkt_summary.Close)}
        </div>
        <div
          className={`text-sm sm:text-base px-4 py-2 rounded-full font-semibold shadow-sm ${Number(change_from_prev_close) >= 0
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
            }`}
        >
          {formatINR(change_from_prev_close)} ({percent_change}%)
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <GroupedCard
          title="Price Summary"
          colorFrom="from-cyan-500"
          colorTo="to-blue-600"
          data={[
            { label: "Previous Close", value: formatINR(mkt_summary.PrevClose) },
            { label: "Open", value: formatINR(mkt_summary.Open) },
            { label: "Close", value: formatINR(mkt_summary.Close) },
            { label: "High", value: formatINR(mkt_summary.High) },
            { label: "Low", value: formatINR(mkt_summary.Low) },
          ]}
        />
        <GroupedCard
          title="Trading Summary"
          colorFrom="from-orange-400"
          colorTo="to-red-500"
          data={[
            { label: "Total Traded Qty", value: formatNumber(mkt_summary.TotalTradedQty) },
            { label: "Traded Value", value: formatINR(mkt_summary.TurnoverInRs) },
            { label: "Total Trades", value: formatNumber(mkt_summary.TotalTrades) },
            { label: "Deliverable Qty", value: formatNumber(mkt_summary.DeliverableQty || "N/A") },
            { label: "Delivery %", value: mkt_summary.DeliveryPct ? `${mkt_summary.DeliveryPct}%` : "N/A" },
          ]}
        />
        <GroupedCard
          title="Stock Details"
          colorFrom="from-purple-500"
          colorTo="to-indigo-600"
          data={[
            { label: "Face Value", value: formatINR(raw.company_eq?.FV || "N/A") },
            { label: "Dividend Yield", value: raw.company_eq?.YIELD ? `${raw.company_eq.YIELD}%` : "N/A" },
            { label: "Market Cap", value: formatINR(raw.company_eq?.MCAP || "N/A") },
            { label: "Symbol", value: mkt_summary.symbol || symbol },
          ]}
        />
      </div>
    </div>
  );
};

const GroupedCard = ({ title, data, colorFrom, colorTo }) => (
  <motion.div
    className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className={`absolute top-0 left-0 w-full h-1.5 rounded-t-2xl bg-gradient-to-r ${colorFrom} ${colorTo}`}></div>
    <h3 className="text-center text-xl font-semibold text-gray-800 dark:text-white mt-4 mb-5">{title}</h3>
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center px-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
          <p className="text-base font-medium text-gray-800 dark:text-cyan-400">{item.value}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default OpenCloseCards;