// import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import MacdPlot from './CreateMacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// // import './Graph.css';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { ArrowsUpFromLine } from 'lucide-react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';

// const GraphSlider = ({ symbol }) => {
//   const [activeTab, setActiveTab] = useState('graphs'); 
//   const [plotData, setPlotData] = useState(JSON.parse(localStorage.getItem("plotData")) || null);
//   const [graphsLoaded, setGraphsLoaded] = useState(false); // Track if the graphs have been loaded
//   const sliderRef=useRef(null)

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (graphsLoaded) return; // Only fetch if graphs are not loaded yet

//       try {
//         const response = await fetch("http://localhost:8080/api/stocks/process", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ symbol }),
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch plot data");
//         }

//         const data = await response.json();
//         setPlotData(data);
//         localStorage.setItem("plotData", JSON.stringify(data));
//         setGraphsLoaded(true); // Mark as loaded
//       } catch (error) {
//         console.error("Error fetching plot data:", error);
//         toast.error("Error fetching plot data");
//       }
//     };

//     if (symbol) {
//       fetchPlotData();
//     }
//   }, [symbol, graphsLoaded]);


//   const CustomPrevArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//       <FaChevronLeft
//         className={className}
//         style={{
//           ...style,
//           display: "block",
//           color: "black",
//           fontSize: "24px",
//           left: "-40px",
//           zIndex: 1000,
//         }}
//         onClick={onClick}
//       />
//     );
//   };

//   const CustomNextArrow = (props) => {
//     const { className, style, onClick } = props;
//     return (
//       <FaChevronRight
//         className={className}
//         style={{
//           ...style,
//           display: "block",
//           color: "black",
//           fontSize: "24px",
//           right: "-40px",
//           zIndex: 1000,
//         }}
//         onClick={onClick}
//       />
//     );
//   };

//   const settings = {
//     // dots: true,
//     fade: true,
//     infinite: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     arrows:true,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//   };

//   const renderGraphTabContent = () => {
//     return (
//       <div className="mt-10 mb-10 mr-10 ml-10">

//         <Slider ref={sliderRef} {...settings}>
//           {/* Graph Sections with symbol prop */}

//           <section className="w-full shadow-xl flex justify-center items-center    ">
//           <h2 className="text-2xl text-center font-bold mb-3">Candle Chronicles: Spread Patterns Over Time (TTM)</h2>
//             <CandleSpread className="m-20" symbol={symbol} />

//           </section>

//           <section className="w-full shadow-xl flex justify-center items-center    ">
//           <h2 className="text-2xl text-center font-bold mb-3">Boxing Prices: TTM Box Plot for Trade Prices</h2>
//             <LastTraded symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)</h2>
//             <AvgBoxPlots symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends</h2>
//             <WormsPlots symbol={symbol} />
//            </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">MACD Analysis for TTM</h2>
//             <MacdPlot symbol={symbol} />
//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-xl text-center font-bold m-3">Monthly Percentage Insights: Sensex (Nifty 50) and Stock Fluctuations (TTM)</h2>
//             <SensexStockCorrBar symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)</h2>
//             <SensexVsStockCorr symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">{`Performance Heatmap : Nifty50 vs BSE vs ${symbol}`}</h2>
//             <HeatMap symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Market Mood: Delivery Trends & Trading Sentiment</h2>
//             <DelRate symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Breach Busters: Analyzing High and Low Breaches</h2>
//             <CandleBreach symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">{`Volatility for ${symbol}`} </h2>
//             <VoltyPlot symbol={symbol} />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3"> Sensex Calulator</h2>
//             <SensexCalculator />

//           </section>

//           <section className="w-full     shadow-xl flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">PE vs EPS vs Book Value: Gladiators in the Industry Arena</h2>
//             <IndustryBubble symbol={symbol} />

//           </section>
//         </Slider>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className='m-10'>
//         <section className="w-full     shadow-xl flex justify-center items-center">
//         {/* <h2 className="text-2xl text-center font-bold mb-3"></h2> */}
//         <TechnicalPlot symbol={symbol} />
//       </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         {/* Tab Navigation */}
//         <div className="tabs tabs-lifted m-20">
//   {/* Graphs Tab */}
//   <button
//     role="tab"
//     className={`tab text-xl font-bold px-6 transition-all duration-300 ${
//       activeTab === 'graphs'
//         ? 'tab-active bg-yellow-500 text-black border-b-4 border-yellow-700 shadow-md' // Active tab
//         : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black' // Inactive tab
//     }`}
//     onClick={() => {
//       setActiveTab('graphs');
//       if (!graphsLoaded) setGraphsLoaded(false);
//     }}
//   >
//     Data Analysis
//   </button>

//   {/* Technical Tab */}
//   <button
//     role="tab"
//     className={`tab text-xl font-bold px-6 transition-all duration-300 ${
//       activeTab === 'technical'
//         ? 'tab-active bg-blue-500 text-black border-b-4 border-blue-700 shadow-md' // Active tab
//         : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black' // Inactive tab
//     }`}
//     onClick={() => setActiveTab('technical')}
//   >
//     Technical Plot
//   </button>
// </div>

// {/* Render content based on selected tab */}
// <div className=" rounded-lg p-6 mt-4 shadow-lg">
//   {activeTab === 'graphs' ? renderGraphTabContent() : renderTechnicalTabContent()}
// </div>




//       </center>
//     </div>
//   );
// };

// export default GraphSlider;

// import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import CandleSpread from './CandleSpreadDistribution';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// // import './Graph.css';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { ArrowsUpFromLine } from 'lucide-react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';


// const GraphSlider = ({ symbol, isFullWidth }) => {
//   const [activeTab, setActiveTab] = useState('graphs'); 
//   const [plotData, setPlotData] = useState(JSON.parse(localStorage.getItem("plotData")) || null);
//   const [graphsLoaded, setGraphsLoaded] = useState(false); // Track if the graphs have been loaded
//   const sliderRef=useRef(null)
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;


//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) return; // Don't fetch if already present

//       try {
//         // const response = await fetch("http://192.168.1.250:8080/CMDA-3.3.9/api/stocks/process", {
//           const response = await fetch(`${API_BASE}/api/stocks/process`, {

//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error("Failed to fetch plot data");

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data }; // Store per stock
//         setPlotData(updatedData);
//         localStorage.setItem("plotData", JSON.stringify(updatedData));
//       } catch (error) {
//         console.error("Error fetching plot data:", error);
//         toast.error("Error fetching plot data");
//       }
//     };

//     if (symbol && !plotData?.[symbol]) fetchPlotData();
//   }, [symbol]); // ✅ Depend only on `symbol`, not `activeTab`



//   const CustomPrevArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronLeft
//           className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//       onClick={onClick}
//       />
//     );
//   };

//   const CustomNextArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronRight
//       className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//       onClick={onClick}
//       />
//     );
//   };

//   const settings = {
//     // dots: true,
//     fade: true,
//     infinite: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     arrows:true,
//     prevArrow: <CustomPrevArrow/>,
//     nextArrow: <CustomNextArrow/>,
//   };

//   const renderGraphTabContent = () => {
//     return (
//       <div className={`${isFullWidth ? "w-full" : "w-auto"} transition-all duration-300`}>

//        <Slider ref={sliderRef} key="graph-slider" {...settings}>
//           {/* Graph Sections with symbol prop */}

//           <section className="w-full flex justify-center items-center    ">
//           <h2 className="text-2xl text-center font-bold mb-3">Candle Chronicles: Spread Patterns Over Time (TTM)</h2>
//             <CandleSpread className="m-20" symbol={symbol} />

//           </section>

//           <section className="w-full  flex justify-center items-center    ">
//           <h2 className="text-2xl text-center font-bold mb-3">Boxing Prices: TTM Box Plot for Trade Prices</h2>
//             <LastTraded symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)</h2>
//             <AvgBoxPlots symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends</h2>
//             <WormsPlots symbol={symbol} />
//            </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">MACD Analysis for TTM</h2>
//             <MacdPlot symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-xl text-center font-bold m-3">Monthly Percentage Insights: Sensex (Nifty 50) and Stock Fluctuations (TTM)</h2>
//             <SensexStockCorrBar symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)</h2>
//             <SensexVsStockCorr symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">{`Performance Heatmap : Nifty50 vs BSE vs ${symbol}`}</h2>
//             <HeatMap symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Market Mood: Delivery Trends & Trading Sentiment</h2>
//             <DelRate symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">Breach Busters: Analyzing High and Low Breaches</h2>
//             <CandleBreach symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">{`Volatility for ${symbol}`} </h2>
//             <VoltyPlot symbol={symbol} />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3"> Sensex Calulator</h2>
//             <SensexCalculator />

//           </section>

//           <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3">PE vs EPS vs Book Value: Gladiators in the Industry Arena</h2>
//             <IndustryBubble symbol={symbol} /> 

//           </section>
//         </Slider>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className='m-10'>
//         <section className="w-full flex justify-center items-center">
//         <h2 className="text-2xl text-center font-bold mb-3"></h2>
//         <TechnicalPlot symbol={symbol} />
//       </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         {/* Tab Navigation */}
//         <div className="tabs tabs-lifted m-20">

// <button
//   role="tab"
//   className={`tab  text-2xl font-bold px-6 py-5 transition-all duration-200 ${
//     activeTab === 'graphs'
//       ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//       : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//   }`}
//   onClick={() => setActiveTab('graphs')} // No `graphsLoaded` reset
// >
//   <span className='dark:text-cyan-400'>Data Analysis</span>
// </button>

// <button
//   role="tab"
//   className={`tab text-2xl font-bold px-6  py-5 transition-all duration-200 ${
//     activeTab === 'technical'
//       ? 'tab-active  py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//       : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//   }`}
//   onClick={() => setActiveTab('technical')} // Just switch tab, no reload
// >
//   <span className='dark:text-cyan-400'>Candle Stick</span>
// </button>

// </div>

// {/* Render content based on selected tab */}
// {/* <div className=" rounded-lg p-6 mt-4 shadow-lg">
//   {activeTab === 'graphs' ? renderGraphTabContent() : renderTechnicalTabContent()}
// </div> */}

// <div className="rounded-lg p-6 mt-8 shadow-lg dark:bg-slate-800 dark:text-white">
//   <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>
//     {renderGraphTabContent()}
//   </div>
//   <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>
//     {renderTechnicalTabContent()}
//   </div>
// </div>


//       </center>
//     </div>
//   );
// };

// export default GraphSlider;

// ------------taking time ------------------

// import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import CandleSpread from './CandleSpreadDistribution';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';

// const GraphSlider = ({ symbol, isFullWidth }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//   const [plotData, setPlotData] = useState(JSON.parse(localStorage.getItem("plotData")) || null);
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const sliderRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Function to get auth token
//   const getAuthToken = () => {
//     return localStorage.getItem("authToken");
//   };

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) return; // Don't fetch if already present

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error("Please log in to fetch plot data.");
//         }

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, // Add Authorization header
//           },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error("Failed to fetch plot data");

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data };
//         setPlotData(updatedData);
//         localStorage.setItem("plotData", JSON.stringify(updatedData));
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error("Error fetching plot data:", error);
//         toast.error(error.message || "Error fetching plot data");
//       }
//     };

//     if (symbol && !plotData?.[symbol]) fetchPlotData();
//   }, [symbol, plotData]);

//   const CustomPrevArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronLeft
//         className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//         onClick={onClick}
//       />
//     );
//   };

//   const CustomNextArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronRight
//         className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//         onClick={onClick}
//       />
//     );
//   };

//   const settings = {
//     fade: true,
//     infinite: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     arrows: true,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//   };

//   const renderGraphTabContent = () => {
//     return (
//       <div className={`${isFullWidth ? "w-full" : "w-auto"} transition-all duration-300`}>
//         <Slider ref={sliderRef} key="graph-slider" {...settings}>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Candle Chronicles: Spread Patterns Over Time (TTM)</h2>
//             <CandleSpread className="m-20" symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Boxing Prices: TTM Box Plot for Trade Prices</h2>
//             <LastTraded symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)</h2>
//             <AvgBoxPlots symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends</h2>
//             <WormsPlots symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">MACD Analysis for TTM</h2>
//             <MacdPlot symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-xl text-center font-bold m-3">Monthly Percentage Insights: Sensex (Nifty 50) and Stock Fluctuations (TTM)</h2>
//             <SensexStockCorrBar symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)</h2>
//             <SensexVsStockCorr symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">{`Performance Heatmap : Nifty50 vs BSE vs ${symbol}`}</h2>
//             <HeatMap symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Market Mood: Delivery Trends & Trading Sentiment</h2>
//             <DelRate symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Breach Busters: Analyzing High and Low Breaches</h2>
//             <CandleBreach symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">{`Volatility for ${symbol}`}</h2>
//             <VoltyPlot symbol={symbol} />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Sensex Calculator</h2>
//             <SensexCalculator />
//           </section>

//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">PE vs EPS vs Book Value: Gladiators in the Industry Arena</h2>
//             <IndustryBubble symbol={symbol} />
//           </section>
//         </Slider>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className='m-10'>
//         <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3"></h2>
//           <TechnicalPlot symbol={symbol} />
//         </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${
//               activeTab === 'graphs'
//                 ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className='dark:text-cyan-400'>Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${
//               activeTab === 'technical'
//                 ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className='dark:text-cyan-400'>Candle Stick</span>
//           </button>
//         </div>

//         <div className="rounded-lg p-6 mt-8 shadow-lg dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>
//             {renderGraphTabContent()}
//           </div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>
//             {renderTechnicalTabContent()}
//           </div>
//         </div>
//       </center>
//     </div>
//   );
// };

// export default GraphSlider;



// import React, { useEffect, useRef, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import {  FaExpand, FaTimes } from 'react-icons/fa';


// const GraphSlider = ({ symbol, isFullWidth }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//    const [fullscreenGraph, setFullscreenGraph] = useState(null);
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const sliderRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => {
//     return localStorage.getItem('authToken');
//   };

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) {
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error('Please log in to fetch plot data.');
//         }

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data };
//         setPlotData(updatedData);
//         localStorage.setItem('plotData', JSON.stringify(updatedData));
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbol && !plotData?.[symbol]) fetchPlotData();
//   }, [symbol, plotData]);

//   const CustomPrevArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronLeft
//         className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//         onClick={onClick}
//       />
//     );
//   };

//   const CustomNextArrow = (props) => {
//     const { className, onClick } = props;
//     return (
//       <FaChevronRight
//         className={`${className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//         onClick={onClick}
//       />
//     );
//   };

//   const settings = {
//     fade: true,
//     infinite: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     arrows: true,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//   };
//     const graphSections = [
//     { title: "Candle Chronicles: Spread Patterns Over Time (TTM)", component: <CandleSpread symbol={symbol} />, key: "CandleSpread" },
//     { title: "Boxing Prices: TTM Box Plot for Trade Prices", component: <LastTraded symbol={symbol} />, key: "LastTraded" },
//     { title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", component: <AvgBoxPlots symbol={symbol} />, key: "AvgBoxPlots" },
//     { title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", component: <WormsPlots symbol={symbol} />, key: "WormsPlots" },
//     { title: "MACD Analysis for TTM", component: <MacdPlot symbol={symbol} />, key: "MacdPlot" },
//     { title: "Monthly Percentage Insights: Sensex (Nifty 50) and Stock Fluctuations (TTM)", component: <SensexStockCorrBar symbol={symbol} />, key: "SensexStockCorrBar" },
//     { title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", component: <SensexVsStockCorr symbol={symbol} />, key: "SensexVsStockCorr" },
//     { title: `Performance Heatmap : Nifty50 vs BSE vs ${symbol}`, component: <HeatMap symbol={symbol} />, key: "HeatMap" },
//     { title: "Market Mood: Delivery Trends & Trading Sentiment", component: <DelRate symbol={symbol} />, key: "DelRate" },
//     { title: "Breach Busters: Analyzing High and Low Breaches", component: <CandleBreach symbol={symbol} />, key: "CandleBreach" },
//     { title: `Volatility for ${symbol}`, component: <VoltyPlot symbol={symbol} />, key: "VoltyPlot" },
//     { title: "Sensex Calculator", component: <SensexCalculator />, key: "SensexCalculator" },
//     { title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", component: <IndustryBubble symbol={symbol} />, key: "IndustryBubble" },
//   ];

//   const renderGraphTabContent = () => {
//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300`}>
//         {/* <Slider ref={sliderRef} key="graph-slider" {...settings}>
//           <section className="w-full flex justify-center items-center">
//             <div className="absolute top-3 right-6 z-20">
//               <button
//                 onClick={() => setFullscreenGraph({   })}
//                 className="text-gray-600 dark:text-white hover:text-cyan-500 text-xl"
//                 title="Expand"
//               >
//                 <FaExpand />
//               </button>
//             </div>
//             <h2 className="text-2xl text-center font-bold mb-3">Candle Chronicles: Spread Patterns Over Time (TTM)</h2>
//             <CandleSpread className="m-20" symbol={symbol} cachedData={plotData[symbol]?.candleSpread} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Boxing Prices: TTM Box Plot for Trade Prices</h2>
//             <LastTraded symbol={symbol} cachedData={plotData[symbol]?.lastTraded} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)</h2>
//             <AvgBoxPlots symbol={symbol} cachedData={plotData[symbol]?.avgBoxPlots} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends</h2>
//             <WormsPlots symbol={symbol} cachedData={plotData[symbol]?.wormsPlots} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">MACD Analysis for TTM</h2>
//             <MacdPlot symbol={symbol} cachedData={plotData[symbol]?.macdPlot} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-xl text-center font-bold m-3">Monthly Percentage Insights: Sensex (Nifty 50) and Stock Fluctuations (TTM)</h2>
//             <SensexStockCorrBar symbol={symbol} cachedData={plotData[symbol]?.sensexStockCorrBar} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)</h2>
//             <SensexVsStockCorr symbol={symbol} cachedData={plotData[symbol]?.sensexVsStockCorr} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">{`Performance Heatmap : Nifty50 vs BSE vs ${symbol}`}</h2>
//             <HeatMap symbol={symbol} cachedData={plotData[symbol]?.heatMap} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Market Mood: Delivery Trends & Trading Sentiment</h2>
//             <DelRate symbol={symbol} cachedData={plotData[symbol]?.delRate} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Breach Busters: Analyzing High and Low Breaches</h2>
//             <CandleBreach symbol={symbol} cachedData={plotData[symbol]?.candleBreach} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">{`Volatility for ${symbol}`}</h2>
//             <VoltyPlot symbol={symbol} cachedData={plotData[symbol]?.voltyPlot} />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">Sensex Calculator</h2>
//             <SensexCalculator />
//           </section>
//           <section className="w-full flex justify-center items-center">
//             <h2 className="text-2xl text-center font-bold mb-3">PE vs EPS vs Book Value: Gladiators in the Industry Arena</h2>
//             <IndustryBubble symbol={symbol} cachedData={plotData[symbol]?.industryBubble} />
//           </section>
//         </Slider> */}

//          <Slider ref={sliderRef} key="graph-slider" {...settings}>
//         {graphSections.map(({ title, component, key }) => (
//           <section key={key} className="relative w-full flex justify-center items-center">
//             <div className="absolute top-3 right-6 z-20">
//               <button
//                 onClick={() => setFullscreenGraph({ title, component })}
//                 className="text-gray-600 dark:text-white hover:text-cyan-500 text-xl"
//                 title="Expand"
//               >
//                 <FaExpand />
//               </button>
//             </div>
//             <div className="w-full text-center">
//               <h2 className="text-2xl font-bold mb-3">{title}</h2>
//               {component}
//             </div>
//           </section>
//         ))}
//       </Slider>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className="m-10">
//         <section className="w-full flex justify-center items-center">
//           <h2 className="text-2xl text-center font-bold mb-3"></h2>
//           <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//         </section>
//       </div>
//     );
//   };

//     const renderFullscreenOverlay = () => (
//     fullscreenGraph && (
//       <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-95 z-[9999] flex flex-col items-center justify-center p-6 overflow-auto">
//         <div className="w-full flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">{fullscreenGraph.title}</h2>
//           <button
//             onClick={() => setFullscreenGraph(null)}
//             className="text-gray-800 dark:text-white text-2xl hover:text-red-500"
//             title="Close"
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div className="w-full">{fullscreenGraph.component}</div>
//       </div>
//     )
//   );

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${
//               activeTab === 'graphs'
//                 ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className="dark:text-cyan-400">Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${
//               activeTab === 'technical'
//                 ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className="dark:text-cyan-400">Candle Stick</span>
//           </button>
//         </div>
//         <div className="rounded-lg p-6 mt-8 shadow-lg dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>
//             {renderGraphTabContent()}
//           </div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>
//             {renderTechnicalTabContent()}
//           </div>
//         </div>
//       </center>
//         {renderFullscreenOverlay()}
//     </div>
//   );
// };

// export default GraphSlider;





// import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import {  FaExpand, FaTimes } from 'react-icons/fa';


// const GraphSlider = ({ symbol, isFullWidth }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//   const [fullscreenGraph, setFullscreenGraph] = useState(null);
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const sliderRef = useRef(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => localStorage.getItem('authToken');

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) {
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) throw new Error('Please log in to fetch plot data.');

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data };
//         setPlotData(updatedData);
//         localStorage.setItem('plotData', JSON.stringify(updatedData));
//         setGraphsLoaded(true);
//       } catch (error) {
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbol && !plotData?.[symbol]) fetchPlotData();
//   }, [symbol]);

//   const CustomPrevArrow = useCallback((props) => (
//     <FaChevronLeft
//       className={`${props.className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//       onClick={props.onClick}
//     />
//   ), []);

//   const CustomNextArrow = useCallback((props) => (
//     <FaChevronRight
//       className={`${props.className} !text-black dark:!text-white text-8xl absolute right-[-20px] z-[1000] cursor-pointer`}
//       onClick={props.onClick}
//     />
//   ), []);

//   const settings = useMemo(() => ({
//     fade: true,
//     infinite: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     swipeToSlide: true,
//     arrows: true,
//     prevArrow: <CustomPrevArrow />,
//     nextArrow: <CustomNextArrow />,
//   }), [CustomPrevArrow, CustomNextArrow]);

//   const graphSections = useMemo(() => [
//     { title: "Candle Chronicles", component: <CandleSpread symbol={symbol} />, key: "CandleSpread" },
//     { title: "Boxing Prices", component: <LastTraded symbol={symbol} />, key: "LastTraded" },
//     { title: "Monthly Ranges and Averages", component: <AvgBoxPlots symbol={symbol} />, key: "AvgBoxPlots" },
//     { title: "Trend Tapestry", component: <WormsPlots symbol={symbol} />, key: "WormsPlots" },
//     { title: "MACD Analysis", component: <MacdPlot symbol={symbol} />, key: "MacdPlot" },
//     { title: "Sensex & Stock Fluctuations", component: <SensexStockCorrBar symbol={symbol} />, key: "SensexStockCorrBar" },
//     { title: "Sensex Symphony", component: <SensexVsStockCorr symbol={symbol} />, key: "SensexVsStockCorr" },
//     { title: `Heatmap: ${symbol}`, component: <HeatMap symbol={symbol} />, key: "HeatMap" },
//     { title: "Delivery Trends", component: <DelRate symbol={symbol} />, key: "DelRate" },
//     { title: "Breach Busters", component: <CandleBreach symbol={symbol} />, key: "CandleBreach" },
//     { title: `Volatility: ${symbol}`, component: <VoltyPlot symbol={symbol} />, key: "VoltyPlot" },
//     { title: "Sensex Calculator", component: <SensexCalculator />, key: "SensexCalculator" },
//     { title: "Industry Arena", component: <IndustryBubble symbol={symbol} />, key: "IndustryBubble" },
//   ], [symbol]);

//   const renderGraphTabContent = useCallback(() => (
//     <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300`}>
//       <Slider ref={sliderRef} key="graph-slider" {...settings}>
//         {graphSections.map(({ title, component, key }) => (
//           <section key={key} className="relative w-full flex justify-center items-center">
//             <div className="absolute top-3 right-6 z-20">
//               <button
//                 onClick={() => setFullscreenGraph({ title, component })}
//                 className="text-gray-600 dark:text-white hover:text-cyan-500 text-xl"
//                 title="Expand"
//               >
//                 <FaExpand />
//               </button>
//             </div>
//             <div className="w-full text-center">
//               <h2 className="text-2xl font-bold mb-3">{title}</h2>
//               {component}
//             </div>
//           </section>
//         ))}
//       </Slider>
//     </div>
//   ), [graphSections, settings]);

//   const renderTechnicalTabContent = useCallback(() => (
//     <div className="m-10">
//       <section className="w-full flex justify-center items-center">
//         <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//       </section>
//     </div>
//   ), [symbol, plotData]);

//   const renderFullscreenOverlay = useCallback(() => (
//     fullscreenGraph && (
//       <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-95 z-[9999] flex flex-col items-center justify-center p-6 overflow-auto">
//         <div className="w-full flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold">{fullscreenGraph.title}</h2>
//           <button
//             onClick={() => setFullscreenGraph(null)}
//             className="text-gray-800 dark:text-white text-2xl hover:text-red-500"
//             title="Close"
//           >
//             <FaTimes />
//           </button>
//         </div>
//         <div className="w-full">{fullscreenGraph.component}</div>
//       </div>
//     )
//   ), [fullscreenGraph]);

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${activeTab === 'graphs' ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white' : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'}`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className="dark:text-cyan-400">Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold px-6 py-5 transition-all duration-200 ${activeTab === 'technical' ? 'tab-active py-5 text-cyan-600 text-3xl shadow-md dark:bg-slate-800 dark:text-white' : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'}`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className="dark:text-cyan-400">Candle Stick</span>
//           </button>
//         </div>
//         <div className="rounded-lg p-6 mt-8 shadow-lg dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>
//             {renderGraphTabContent()}
//           </div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>
//             {renderTechnicalTabContent()}
//           </div>
//         </div>
//       </center>
//       {renderFullscreenOverlay()}
//     </div>
//   );
// };

// export default GraphSlider;


// import React, { useEffect, useState } from 'react';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { FaTimes } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';


// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//   // const [fullscreenGraph, setFullscreenGraph] = useState(null);
//     const [selectedGraphs, setSelectedGraphs] = useState([]);
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => {
//     return localStorage.getItem('authToken');
//   };
//  useEffect(() => {

//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) {
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error('Please log in to fetch plot data.');
//         }

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data };
//         setPlotData(updatedData);
//         localStorage.setItem('plotData', JSON.stringify(updatedData));
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbols && (!plotData?.[symbol])?.[timeRange]?.[normalize ? 'normalized' : 'raw'] )fetchPlotData();
//   }, [symbol,symbols,timeRange, normalize, plotData]);

//   const graphSections = [
//     { 
//       title: "Candle Chronicles: Spread Patterns Over Time (TTM)", 
//       description: "Visualizes the distribution of candlestick spread patterns over the past year.", 
//       component: <CandleSpread symbol={symbol} />, 
//       key: "CandleSpread" ,
//       image:"/assets/Screenshot 2025-06-04 102920.png"
//     },
//     { 
//       title: "Boxing Prices: TTM Box Plot for Trade Prices", 
//       description: "Shows a box plot of trade prices over the last year with key levels.", 
//       component: <LastTraded symbol={symbol} />, 
//       key: "LastTraded",
//      image:"/assets/Screenshot 2025-06-04 102934.png"
//    },
//     { 
//       title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", 
//       description: "Displays monthly price ranges and averages over the past year.", 
//       component: <AvgBoxPlots symbol={symbol} />, 
//       key: "AvgBoxPlots" ,
//  image:"/assets/Screenshot 2025-06-04 102946.png"
//     },
//     { 
//       title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", 
//       description: "Analyzes weekly trade delivery patterns during market trends.", 
//       component: <WormsPlots symbol={symbol} />, 
//       key: "WormsPlots" ,
//  image:"/assets/Screenshot 2025-06-04 103000.png"   
//  },
//     { 
//       title: "MACD Analysis for TTM", 
//       description: "Plots the MACD indicator to identify momentum over the last year.", 
//       component: <MacdPlot symbol={symbol} />, 
//       key: "MacdPlot" ,
//  image:"/assets/Screenshot 2025-06-04 103019.png"
//     },
//     { 
//       title: "Sensex & Stock Fluctuations", 
//       description: "Compares monthly percentage changes between Sensex and the stock.", 
//       component: <SensexStockCorrBar symbol={symbol} />, 
//       key: "SensexStockCorrBar" ,
//  image:"/assets/sensex.png"  
//  },
//     { 
//       title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", 
//       description: "Visualizes correlation trends between Sensex and the stock.", 
//       component: <SensexVsStockCorr symbol={symbol} />, 
//       key: "SensexVsStockCorr",
//  image:"/assets/Screenshot 2025-06-04 103050.png"  
//  },
//     { 
//       title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`, 
//       description: "A heatmap comparing performance across Nifty50, BSE, and the stock.", 
//       component: <HeatMap symbol={symbol} />, 
//       key: "HeatMap" ,
//  image:"/assets/Screenshot 2025-06-04 103102.png"  
//   },
//     { 
//       title: "Market Mood: Delivery Trends & Trading Sentiment", 
//       description: "Analyzes delivery trends and trading sentiment over time.", 
//       component: <DelRate symbol={symbol} />, 
//       key: "DelRate" ,
//  image:"/assets/Screenshot 2025-06-04 103114.png"    
// },
//     { 
//       title: "Breach Busters: Analyzing High and Low Breaches", 
//       description: "Examines instances of high and low price breaches.", 
//       component: <CandleBreach symbol={symbol} />, 
//       key: "CandleBreach" ,
//  image:"/assets/Screenshot 2025-06-04 103128.png"    
// },
//     { 
//       title: `Volatility for ${symbol}`, 
//       description: "Plots the volatility trends for the stock over the past year.", 
//       component: <VoltyPlot symbol={symbol} />, 
//       key: "VoltyPlot" ,
//  image:"/assets/Screenshot 2025-06-04 103142.png"   
//  },
//     { 
//       title: "Sensex Calculator", 
//       description: "A tool to calculate Sensex-related metrics for analysis.", 
//       component: <SensexCalculator />, 
//       key: "SensexCalculator" ,
//  image:"/assets/Screenshot 2025-06-04 103203.png"    
// },
//     { 
//       title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", 
//       description: "Compares PE, EPS, and Book Value within the industry context.", 
//       component: <IndustryBubble symbol={symbol} />, 
//       key: "IndustryBubble" ,
//  image:"/assets/sensex2.png"
//     },
//   ];

//   const handleGraphSelect = (graph) => {
//     setSelectedGraphs((prev) => {
//       // In comparison mode (side-by-side), allow one graph per GraphSlider
//       if (symbols && symbols.length > 1 && !overlay) {
//         return [graph]; // Select only the clicked graph
//       }
//       // In single-symbol or overlay mode, toggle selection (up to 2 graphs)
//       if (prev.some((g) => g.key === graph.key)) {
//         return prev.filter((g) => g.key !== graph.key);
//       }
//       if (prev.length < 2) {
//         return [...prev, graph];
//       }
//       return [prev[1], graph];
//     });
//   };

//   // Clear selected graphs
//   const handleClearSelection = () => {
//     setSelectedGraphs([]);
//   };

//   // Render graph tab content
//   const renderGraphTabContent = () => {
//     // If graphs are selected, display them instead of the grid
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           {/* Button to clear selection and return to grid */}
//           <div className="flex justify-center  mb-4">
//             <button
//               onClick={handleClearSelection}
//                className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white
//                 px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"

//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={` grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, component, key }) => (
//               <div
//                 key={key}
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black  p-4 flex flex-col items-center w-full"
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>
//                 <div className="w-full h-[600px] overflow-auto">{component}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     // Display grid of graph previews if no graphs are selected
//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, component, key, image }) => (
//             <div
//               key={key}
//               className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${
//                 selectedGraphs.some((g) => g.key === key) ? 'border-2 border-cyan-600' : ''
//               }`}
//               onClick={() => handleGraphSelect({ title, component, key })}
//             >
//                <h2 className="text-xl font-semibold mb-2 text-center sm:text-sm">{title}</h2>
//               <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />

//               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Render candlestick chart
//     const renderTechnicalTabContent = () => {
//     return (
//       <div className="">
//         <section className="w-full ">
//           <h2 className="text-2xl text-center  font-bold mb-3">Candlestick Analysis</h2>
//           <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//         </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20 mx-auto w-max">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'graphs'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className="dark:text-cyan-400 mt-0">Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'technical'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className="dark:text-cyan-400">Candle Stick</span>
//           </button>
//         </div>

//         <div className="p-6 mt-8 dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>{renderGraphTabContent()}</div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>{renderTechnicalTabContent()}</div>
//         </div>
//       </center>
//     </div>
//   );
// };

// export default GraphSlider;



// import React, { useEffect, useState } from 'react';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import { FaTimes } from 'react-icons/fa';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import candle_spread from '/public/assets/gaph1.png'
// import Industry_Bubble from '/public/assets/graph13.png'
// import Sensex_Calculator from '/public/assets/graph7.png'  
// import Volty_Plot from '/public/assets/graph12.png'   
// import Candle_Breach from '/public/assets/graph9.png'   
// import Del_Rate from '/public/assets/graph3.png'   
//   import Heat_Map from '/public/assets/graph8.png'     
//   import Sensex_VsStockCorr from '/public/assets/graph5.png'  
//  import Sensex_StockCorrBar from '/public/assets/graph6.png' 
//   import Macd_Plot  from '/public/assets/graph11.png'
//  import Worms_Plots from '/public/assets/graph4.png'
//  import AvgBox_Plots from '/public/assets/graph10.png'
// import Last_Traded from '/public/assets/graph2.png' 


// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//   // const [fullscreenGraph, setFullscreenGraph] = useState(null);
//     const [selectedGraphs, setSelectedGraphs] = useState([]);
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const getAuthToken = () => {
//     return localStorage.getItem('authToken');
//   };
//  useEffect(() => {

//     const fetchPlotData = async () => {
//       if (plotData?.[symbol]) {
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error('Please log in to fetch plot data.');
//         }

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         const updatedData = { ...plotData, [symbol]: data };
//         setPlotData(updatedData);
//         localStorage.setItem('plotData', JSON.stringify(updatedData));
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbols && (!plotData?.[symbol])?.[timeRange]?.[normalize ? 'normalized' : 'raw'] )fetchPlotData();
//   }, [symbol,symbols,timeRange, normalize, plotData]);

//   const graphSections = [
//     { 
//       title: "Candle Chronicles: Spread Patterns Over Time (TTM)", 
//       description: "Visualizes the distribution of candlestick spread patterns over the past year.", 
//       component: <CandleSpread symbol={symbol} />, 
//       key: "CandleSpread" ,
//       image:candle_spread
//     },
//     { 
//       title: "Boxing Prices: TTM Box Plot for Trade Prices", 
//       description: "Shows a box plot of trade prices over the last year with key levels.", 
//       component: <LastTraded symbol={symbol} />, 
//       key: "LastTraded",
//      image:Last_Traded
//    },
//     { 
//       title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", 
//       description: "Displays monthly price ranges and averages over the past year.", 
//       component: <AvgBoxPlots symbol={symbol} />, 
//       key: "AvgBoxPlots" ,
//  image:AvgBox_Plots

//     },
//     { 
//       title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", 
//       description: "Analyzes weekly trade delivery patterns during market trends.", 
//       component: <WormsPlots symbol={symbol} />, 
//       key: "WormsPlots" ,
//  image:Worms_Plots


//  },
//     { 
//       title: "MACD Analysis for TTM", 
//       description: "Plots the MACD indicator to identify momentum over the last year.", 
//       component: <MacdPlot symbol={symbol} />, 
//       key: "MacdPlot" ,
//  image:Macd_Plot

//     },
//     { 
//       title: "Sensex & Stock Fluctuations", 
//       description: "Compares monthly percentage changes between Sensex and the stock.", 
//       component: <SensexStockCorrBar symbol={symbol} />, 
//       key: "SensexStockCorrBar" ,
//  image:Sensex_StockCorrBar

//  },
//     { 
//       title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", 
//       description: "Visualizes correlation trends between Sensex and the stock.", 
//       component: <SensexVsStockCorr symbol={symbol} />, 
//       key: "SensexVsStockCorr",
//  image:Sensex_VsStockCorr 

//  },
//     { 
//       title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`, 
//       description: "A heatmap comparing performance across Nifty50, BSE, and the stock.", 
//       component: <HeatMap symbol={symbol} />, 
//       key: "HeatMap" ,
//  image:Heat_Map
//   },
//     { 
//       title: "Market Mood: Delivery Trends & Trading Sentiment", 
//       description: "Analyzes delivery trends and trading sentiment over time.", 
//       component: <DelRate symbol={symbol} />, 
//       key: "DelRate" ,
//  image:Del_Rate    

// },
//     { 
//       title: "Breach Busters: Analyzing High and Low Breaches", 
//       description: "Examines instances of high and low price breaches.", 
//       component: <CandleBreach symbol={symbol} />, 
//       key: "CandleBreach" ,
//  image:Candle_Breach  

// },
//     { 
//       title: `Volatility for ${symbol}`, 
//       description: "Plots the volatility trends for the stock over the past year.", 
//       component: <VoltyPlot symbol={symbol} />, 
//       key: "VoltyPlot" ,
//  image:Volty_Plot  

//  },
//     { 
//       title: "Sensex Calculator", 
//       description: "A tool to calculate Sensex-related metrics for analysis.", 
//       component: <SensexCalculator />, 
//       key: "SensexCalculator" ,
//  image:Sensex_Calculator  

// },
//     { 
//       title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", 
//       description: "Compares PE, EPS, and Book Value within the industry context.", 
//       component: <IndustryBubble symbol={symbol} />, 
//       key: "IndustryBubble" ,
//  image:Industry_Bubble

//     },
//   ];

//   const handleGraphSelect = (graph) => {
//     setSelectedGraphs((prev) => {
//       // In comparison mode (side-by-side), allow one graph per GraphSlider
//       if (symbols && symbols.length > 1 && !overlay) {
//         return [graph]; // Select only the clicked graph
//       }
//       // In single-symbol or overlay mode, toggle selection (up to 2 graphs)
//       if (prev.some((g) => g.key === graph.key)) {
//         return prev.filter((g) => g.key !== graph.key);
//       }
//       if (prev.length < 2) {
//         return [...prev, graph];
//       }
//       return [prev[1], graph];
//     });
//   };

//   // Clear selected graphs
//   const handleClearSelection = () => {
//     setSelectedGraphs([]);
//   };

//   // Render graph tab content
//   const renderGraphTabContent = () => {
//     // If graphs are selected, display them instead of the grid
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           {/* Button to clear selection and return to grid */}
//           <div className="flex justify-center  mb-4">
//             <button
//               onClick={handleClearSelection}
//                className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white
//                 px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"

//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={` grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, component, key }) => (
//               <div
//                 key={key}
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black  p-4 flex flex-col items-center w-full"
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>
//                 <div className="w-full h-[600px] overflow-auto">{component}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     // Display grid of graph previews if no graphs are selected
//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, component, key, image }) => (
//             <div
//               key={key}
//               className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${
//                 selectedGraphs.some((g) => g.key === key) ? 'border-2 border-cyan-600' : ''
//               }`}
//               onClick={() => handleGraphSelect({ title, component, key })}
//             >
//                <h2 className="text-xl font-semibold mb-2 text-center sm:text-sm">{title}</h2>
//               <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />

//               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Render candlestick chart
//     const renderTechnicalTabContent = () => {
//     return (
//       <div className="">
//         <section className="w-full ">
//           <h2 className="text-2xl text-center  font-bold mb-3">Candlestick Analysis</h2>
//           <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//         </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20 mx-auto w-max">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'graphs'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className="dark:text-cyan-400 mt-0">Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'technical'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className="dark:text-cyan-400">Candle Stick</span>
//           </button>
//         </div>

//         <div className="p-6 mt-8 dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>{renderGraphTabContent()}</div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>{renderTechnicalTabContent()}</div>
//         </div>
//       </center>
//     </div>
//   );
// };

// export default GraphSlider;


// import React, { useEffect, useState } from 'react';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';

// import candle_spread from '/public/assets/gaph1.png'
// import Industry_Bubble from '/public/assets/graph13.png'
// import Sensex_Calculator from '/public/assets/graph7.png'  
// import Volty_Plot from '/public/assets/graph12.png'   
// import Candle_Breach from '/public/assets/graph9.png'   
// import Del_Rate from '/public/assets/graph3.png'   
// import Heat_Map from '/public/assets/graph8.png'     
// import Sensex_VsStockCorr from '/public/assets/graph5.png'  
// import Sensex_StockCorrBar from '/public/assets/graph6.png' 
// import Macd_Plot  from '/public/assets/graph11.png'
// import Worms_Plots from '/public/assets/graph4.png'
// import AvgBox_Plots from '/public/assets/graph10.png'
// import Last_Traded from '/public/assets/graph2.png' 

// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false }) => {
//   const [activeTab, setActiveTab] = useState('graphs');
//   const [selectedGraphs, setSelectedGraphs] = useState([]);
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   const getAuthToken = () => localStorage.getItem('authToken');

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
//     const fetchPlotData = async () => {
//       const cacheKey = `plot_${symbol}_${timeRange}_${normalize}`;
//       const cachedData = getCachedData(cacheKey);
//       if (cachedData) {
//         setPlotData((prev) => ({ ...prev, [symbol]: cachedData }));
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error('Please log in to fetch plot data.');
//         }

//         const response = await fetch(`${API_BASE}/api/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol, timeRange, normalize }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         setPlotData((prev) => {
//           const updated = { ...prev, [symbol]: data };
//           setCachedData(cacheKey, data);
//           return updated;
//         });
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbol && !plotData?.[symbol]?.[timeRange]?.[normalize ? 'normalized' : 'raw']) {
//       fetchPlotData();
//     } else {
//       setGraphsLoaded(true);
//     }
//   }, [symbol, timeRange, normalize, plotData]);

//   const graphSections = [
//     {
//       title: "Candle Chronicles: Spread Patterns Over Time (TTM)",
//       description: "Visualizes the distribution of candlestick spread patterns over the past year.",
//       component: <CandleSpread symbol={symbol} />,
//       key: "CandleSpread",
//       image:candle_spread
//     },
//     {
//       title: "Boxing Prices: TTM Box Plot for Trade Prices",
//       description: "Shows a box plot of trade prices over the last year with key levels.",
//       component: <LastTraded symbol={symbol} />,
//       key: "LastTraded",
//       image:Last_Traded
//     },
//     {
//       title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)",
//       description: "Displays monthly price ranges and averages over the past year.",
//       component: <AvgBoxPlots symbol={symbol} />,
//       key: "AvgBoxPlots",
//       image:AvgBox_Plots
//     },
//     {
//       title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends",
//       description: "Analyzes weekly trade delivery patterns during market trends.",
//       component: <WormsPlots symbol={symbol} />,
//       key: "WormsPlots",
//       image:Worms_Plots
//     },
//     {
//       title: "MACD Analysis for TTM",
//       description: "Plots the MACD indicator to identify momentum over the last year.",
//       component: <MacdPlot symbol={symbol} />,
//       key: "MacdPlot",
//       image:Macd_Plot
//     },
//     {
//       title: "Sensex & Stock Fluctuations",
//       description: "Compares monthly percentage changes between Sensex and the stock.",
//       component: <SensexStockCorrBar symbol={symbol} />,
//       key: "SensexStockCorrBar",
//       image:Sensex_StockCorrBar
//     },
//     {
//       title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)",
//       description: "Visualizes correlation trends between Sensex and the stock.",
//       component: <SensexVsStockCorr symbol={symbol} />,
//       key: "SensexVsStockCorr",
//       image:Sensex_VsStockCorr
//     },
//     {
//       title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`,
//       description: "A heatmap comparing performance across Nifty50, BSE, and the stock.",
//       component: <HeatMap symbol={symbol} />,
//       key: "HeatMap",
//       image:Heat_Map
//     },
//     {
//       title: "Market Mood: Delivery Trends & Trading Sentiment",
//       description: "Analyzes delivery trends and trading sentiment over time.",
//       component: <DelRate symbol={symbol} />,
//       key: "DelRate",
//       image:Del_Rate
//     },
//     {
//       title: "Breach Busters: Analyzing High and Low Breaches",
//       description: "Examines instances of high and low price breaches.",
//       component: <CandleBreach symbol={symbol} />,
//       key: "CandleBreach",
//       image:Candle_Breach
//     },
//     {
//       title: `Volatility for ${symbol}`,
//       description: "Plots the volatility trends for the stock over the past year.",
//       component: <VoltyPlot symbol={symbol} />,
//       key: "VoltyPlot",
//       image:Volty_Plot
//     },
//     {
//       title: "Sensex Calculator",
//       description: "A tool to calculate Sensex-related metrics for analysis.",
//       component: <SensexCalculator />,
//       key: "SensexCalculator",
//       image:Sensex_Calculator
//     },
//     {
//       title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena",
//       description: "Compares PE, EPS, and Book Value within the industry context.",
//       component: <IndustryBubble symbol={symbol} />,
//       key: "IndustryBubble",
//       image:Industry_Bubble
//     },
//   ];

//   const handleGraphSelect = (graph) => {
//     setSelectedGraphs((prev) => {
//       if (symbols && symbols.length > 1 && !overlay) {
//         return [graph];
//       }
//       if (prev.some((g) => g.key === graph.key)) {
//         return prev.filter((g) => g.key !== graph.key);
//       }
//       if (prev.length < 2) {
//         return [...prev, graph];
//       }
//       return [prev[1], graph];
//     });
//   };

//   const handleClearSelection = () => {
//     setSelectedGraphs([]);
//   };

//   const renderGraphTabContent = () => {
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={handleClearSelection}
//               className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={`grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, component, key }) => (
//               <div
//                 key={key}
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center w-full"
//               >
//                 <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>
//                 <div className="w-full h-[600px] overflow-auto">{component}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, component, key }) => (
//             <div
//               key={key}
//               className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${
//                 selectedGraphs.some((g) => g.key === key) ? 'border-2 border-cyan-600' : ''
//               }`}
//               onClick={() => handleGraphSelect({ title, component, key })}
//             >
//               <h2 className="text-xl font-semibold mb-2 text-center sm:text-sm">{title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className="">
//         <section className="w-full">
//           <h2 className="text-2xl text-center font-bold mb-3">Candlestick Analysis</h2>
//           <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//         </section>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <center>
//         <div className="tabs tabs-lifted m-20 mx-auto w-max">
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'graphs'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('graphs')}
//           >
//             <span className="dark:text-cyan-400 mt-0">Data Analysis</span>
//           </button>
//           <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'technical'
//                 ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//             }`}
//             onClick={() => setActiveTab('technical')}
//           >
//             <span className="dark:text-cyan-400">Candle Stick</span>
//           </button>
//         </div>
//         <div className="p-6 mt-8 dark:bg-slate-800 dark:text-white">
//           <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>{renderGraphTabContent()}</div>
//           <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>{renderTechnicalTabContent()}</div>
//         </div>
//       </center>
//     </div>
//   );
// };

// export default GraphSlider;


// ++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useEffect, useState } from 'react';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';

// import candle_spread from '/public/assets/gaph1.png';
// import Industry_Bubble from '/public/assets/graph13.png';
// import Sensex_Calculator from '/public/assets/graph7.png';
// import Volty_Plot from '/public/assets/graph12.png';
// import Candle_Breach from '/public/assets/graph9.png';
// import Del_Rate from '/public/assets/graph3.png';
// import Heat_Map from '/public/assets/graph8.png';
// import Sensex_VsStockCorr from '/public/assets/graph5.png';
// import Sensex_StockCorrBar from '/public/assets/graph6.png';
// import Macd_Plot from '/public/assets/graph11.png';
// import Worms_Plots from '/public/assets/graph4.png';
// import AvgBox_Plots from '/public/assets/graph10.png';
// import Last_Traded from '/public/assets/graph2.png';
// import { motion } from "framer-motion"

// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false, tabContext = 'equityHub' }) => {
//   const [activeTab, setActiveTab] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).activeTab || 'graphs' : 'graphs';
//   });
//   const [selectedGraphs, setSelectedGraphs] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).selectedGraphs || [] : [];
//   });
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

//   const getAuthToken = () => localStorage.getItem('authToken');

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
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     // Store only serializable data
//     const serializableSelectedGraphs = selectedGraphs.map(({ key, title }) => ({ key, title }));
//     localStorage.setItem(storageKey, JSON.stringify({ activeTab, selectedGraphs: serializableSelectedGraphs }));
//   }, [activeTab, selectedGraphs, symbol, tabContext]);

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       const cacheKey = `plot_${symbol}_${timeRange}_${normalize}`;
//       const cachedData = getCachedData(cacheKey);
//       if (cachedData) {
//         setPlotData((prev) => ({ ...prev, [symbol]: cachedData }));
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const token = getAuthToken();
//         if (!token) {
//           throw new Error('Please log in to fetch plot data.');
//         }

//         const response = await fetch(`${API_BASE}/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//           body: JSON.stringify({ symbol, timeRange, normalize }),
//         });

//         if (!response.ok) throw new Error('Failed to fetch plot data');

//         const data = await response.json();
//         setPlotData((prev) => {
//           const updated = { ...prev, [symbol]: data };
//           setCachedData(cacheKey, data);
//           return updated;
//         });
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     if (symbol && !plotData?.[symbol]?.[timeRange]?.[normalize ? 'normalized' : 'raw']) {
//       fetchPlotData();
//     } else {
//       setGraphsLoaded(true);
//     }
//   }, [symbol, timeRange, normalize, plotData]);

//   const graphSections = [
//     {
//       title: "Candle Chronicles: Spread Patterns Over Time (TTM)",
//       description: "Visualizes the distribution of candlestick spread patterns over the past year.",
//       component: <CandleSpread symbol={symbol} />,
//       key: "CandleSpread",
//       image: candle_spread,
//     },
//     {
//       title: "Boxing Prices: TTM Box Plot for Trade Prices",
//       description: "Shows a box plot of trade prices over the last year with key levels.",
//       component: <LastTraded symbol={symbol} />,
//       key: "LastTraded",
//       image: Last_Traded,
//     },
//     {
//       title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)",
//       description: "Displays monthly price ranges and averages over the past year.",
//       component: <AvgBoxPlots symbol={symbol} />,
//       key: "AvgBoxPlots",
//       image: AvgBox_Plots,
//     },
//     {
//       title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends",
//       description: "Analyzes weekly trade delivery patterns during market trends.",
//       component: <WormsPlots symbol={symbol} />,
//       key: "WormsPlots",
//       image: Worms_Plots,
//     },
//     {
//       title: "MACD Analysis for TTM",
//       description: "Plots the MACD indicator to identify momentum over the last year.",
//       component: <MacdPlot symbol={symbol} />,
//       key: "MacdPlot",
//       image: Macd_Plot,
//     },
//     {
//       title: "Sensex & Stock Fluctuations",
//       description: "Compares monthly percentage changes between Sensex and the stock.",
//       component: <SensexStockCorrBar symbol={symbol} />,
//       key: "SensexStockCorrBar",
//       image: Sensex_StockCorrBar,
//     },
//     {
//       title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)",
//       description: "Visualizes correlation trends between Sensex and the stock.",
//       component: <SensexVsStockCorr symbol={symbol} />,
//       key: "SensexVsStockCorr",
//       image: Sensex_VsStockCorr,
//     },
//     {
//       title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`,
//       description: "A heatmap comparing performance across Nifty50, BSE, and the stock.",
//       component: <HeatMap symbol={symbol} />,
//       key: "HeatMap",
//       image: Heat_Map,
//     },
//     {
//       title: "Market Mood: Delivery Trends & Trading Sentiment",
//       description: "Analyzes delivery trends and trading sentiment over time.",
//       component: <DelRate symbol={symbol} />,
//       key: "DelRate",
//       image: Del_Rate,
//     },
//     {
//       title: "Breach Busters: Analyzing High and Low Breaches",
//       description: "Examines instances of high and low price breaches.",
//       component: <CandleBreach symbol={symbol} />,
//       key: "CandleBreach",
//       image: Candle_Breach,
//     },
//     {
//       title: "Sensex Calculator",
//       description: "A tool to calculate Sensex-related metrics for analysis.",
//       component: <SensexCalculator />,
//       key: "SensexCalculator",
//       image: Sensex_Calculator,
//     },
//     {
//       title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena",
//       description: "Compares PE, EPS, and Book Value within the industry context.",
//       component: <IndustryBubble symbol={symbol} />,
//       key: "IndustryBubble",
//       image: Industry_Bubble,
//     },
//   ];

//   const handleGraphSelect = (graph) => {
//     setSelectedGraphs((prev) => {
//       if (symbols && symbols.length > 1 && !overlay) {
//         return [{ key: graph.key, title: graph.title }]; // Store only serializable data
//       }
//       if (prev.some((g) => g.key === graph.key)) {
//         return prev.filter((g) => g.key !== graph.key);
//       }
//       if (prev.length < 2) {
//         return [...prev, { key: graph.key, title: graph.title }];
//       }
//       return [prev[1], { key: graph.key, title: graph.title }];
//     });
//   };

//   const handleClearSelection = () => {
//     setSelectedGraphs([]);
//   };

//   const renderGraphTabContent = () => {
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={handleClearSelection}
//               className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all "
//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={`grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, key }) => {
//               const graph = graphSections.find((g) => g.key === key);
//               return (
//                 <div
//                   key={key}
//                   className="relative bg-white dark:bg-gray-800 rounded-lg  p-4 flex flex-col items-center w-full"
//                 >
//                   <h2 className="text-xl font-semibold mb-3 text-center">{title}</h2>
//                   <div className="w-full h-[600px] overflow-auto">{graph.component}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, key, image }) => (
//             <div
//               key={key}
//               className={`relative bg-white dark:bg-gray-800  p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${
//                 selectedGraphs.some((g) => g.key === key) ? '' : ''
//               }`}
//               onClick={() => handleGraphSelect({ title, key })}
//             >
//               <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
//               <h2 className="text-xl font-semibold mb-2 text-center sm:text-sm">{title}</h2>
//               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => {
//     return (
//       <div className="">
//         <section className="w-full">
//           <h2 className="text-2xl text-center font-bold mb-3">Candlestick Analysis</h2>
//           <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.technicalPlot} />
//         </section>
//       </div>
//     );
//   };

//       return (
//    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//   {/* Tab Navigation */}
//   <motion.div 
//     className="flex justify-center mb-8"
//     initial={{ opacity: 0, y: -20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3 }}
//   >
//     <div className="relative bg-gray-100 dark:bg-slate-700 p-1 inline-flex">
//       <div 
//         className="absolute h-[calc(100%-8px)] top-1 bg-white dark:bg-slate-800  transition-all duration-300 ease-in-out"
//         style={{
//           width: `${activeTab === 'graphs' ? '50%' : '50%'}`,
//           left: `${activeTab === 'graphs' ? '4px' : 'calc(50% - 4px)'}`,
//         }}
//       />

//       <button
//         onClick={() => setActiveTab('graphs')}
//         className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
//           activeTab === 'graphs'
//             ? 'text-cyan-600 dark:text-cyan-400'
//             : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
//         }`}
//       >
//         <span className="flex items-center">
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//           </svg>
//           Data Analysis
//         </span>
//       </button>

//       <button
//         onClick={() => setActiveTab('technical')}
//         className={`relative z-10 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
//           activeTab === 'technical'
//             ? 'text-cyan-600 dark:text-cyan-400'
//             : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100'
//         }`}
//       >
//         <span className="flex justify-center items-center">
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
//           </svg>
//           Candle Stick
//         </span>
//       </button>
//     </div>
//   </motion.div>

//   {/* Tab Content */}
//   <motion.div
//     className="bg-white dark:bg-slate-800  overflow-hidden"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ delay: 0.1 }}
//   >
//     <div className="p-6">
//       <div className={activeTab === 'graphs' ? 'block' : 'hidden'}>
//         {renderGraphTabContent()}
//       </div>
//       <div className={activeTab === 'technical' ? 'block' : 'hidden'}>
//         {renderTechnicalTabContent()}
//       </div>
//     </div>
//   </motion.div>
// </div>
//   );


//   // return (
//   //   <div>
//   //     <center>
//   //       <div className="tabs tabs-lifted m-20 mx-auto w-max">
//   //         <button
//   //           role="tab"
//   //           className={`tab text-2xl font-bold transition-all duration-200 ${
//   //             activeTab === 'graphs'
//   //               ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//   //               : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//   //           }`}
//   //           onClick={() => setActiveTab('graphs')}
//   //         >
//   //           <span className="dark:text-cyan-400 mt-0">Data Analysis</span>
//   //         </button>
//   //         <button
//   //           role="tab"
//   //           className={`tab text-2xl font-bold transition-all duration-200 ${
//   //             activeTab === 'technical'
//   //               ? 'tab-active text-cyan-600 text-3xl dark:bg-slate-800 dark:text-white'
//   //               : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-white'
//   //           }`}
//   //           onClick={() => setActiveTab('technical')}
//   //         >
//   //           <span className="dark:text-cyan-400">Candle Stick</span>
//   //         </button>
//   //       </div>
//   //       <div className="p-6 mt-8 dark:bg-slate-800 dark:text-white">
//   //         <div style={{ display: activeTab === 'graphs' ? 'block' : 'none' }}>{renderGraphTabContent()}</div>
//   //         <div style={{ display: activeTab === 'technical' ? 'block' : 'none' }}>{renderTechnicalTabContent()}</div>
//   //       </div>
//   //     </center>
//   //   </div>
//   // );
// };

// export default GraphSlider;

// +++++++++++++++++++++++++++++++++++

// import React, { useEffect, useState } from 'react';
// // import { useAuth } from './AuthContext';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import Login from '../Login';

// import candle_spread from '/public/assets/gaph1.png';
// import Industry_Bubble from '/public/assets/graph13.png';
// import Sensex_Calculator from '/public/assets/graph7.png';
// import Volty_Plot from '/public/assets/graph12.png';
// import Candle_Breach from '/public/assets/graph9.png';
// import Del_Rate from '/public/assets/graph3.png';
// import Heat_Map from '/public/assets/graph8.png';
// import Sensex_VsStockCorr from '/public/assets/graph5.png';
// import Sensex_StockCorrBar from '/public/assets/graph6.png';
// import Macd_Plot from '/public/assets/graph11.png';
// import Worms_Plots from '/public/assets/graph4.png';
// import AvgBox_Plots from '/public/assets/graph10.png';
// import Last_Traded from '/public/assets/graph2.png';
// import { CgLogIn } from 'react-icons/cg';
// import { useAuth } from '../AuthContext';
// import CandlePattern from './CandlePattern';
// import Shareholding from './Shareholding';

// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false, tabContext = 'equityHub', getAuthToken }) => {
//   const { isLoggedIn } = useAuth();
//   const [activeTab, setActiveTab] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).activeTab || 'graphs' : 'graphs';
//   });
//   const [selectedGraphs, setSelectedGraphs] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).selectedGraphs || [] : [];
//   });
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || 'http://localhost:8080';
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const MAX_VISIBLE_GRAPHS = 5;

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => handleCloseModal();

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
//       console.error(`Failed to parse cached data for ${key}:`, err);
//       localStorage.removeItem(key);
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       const serializedData = JSON.stringify({ data, timestamp: Date.now() });
//       if (serializedData.length > 1024 * 1024) {
//         console.warn(`Data for ${key} exceeds 1MB, skipping cache.`);
//         return;
//       }
//       localStorage.setItem(key, serializedData);
//     } catch (err) {
//       if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
//         console.error(`Quota exceeded for key ${key}. Clearing oldest items and retrying.`);
//         const now = Date.now();
//         for (let i = 0; i < localStorage.length; i++) {
//           const key = localStorage.key(i);
//           const cached = localStorage.getItem(key);
//           try {
//             const { timestamp } = JSON.parse(cached);
//             if (now - timestamp > 24 * 60 * 60 * 1000) {
//               localStorage.removeItem(key);
//               i--;
//             }
//           } catch (e) {
//             localStorage.removeItem(key);
//             i--;
//           }
//         }
//         try {
//           localStorage.setItem(key, serializedData);
//         } catch (retryErr) {
//           console.error(`Retry failed for ${key}. Switching to no-cache mode.`, retryErr);
//           setError("Storage quota exceeded. Data will be fetched live.");
//         }
//       } else {
//         console.error(`Failed to cache data for ${key}:`, err);
//         setError("Failed to cache data due to an unexpected error.");
//       }
//     }
//   };

//   useEffect(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const serializableSelectedGraphs = selectedGraphs.map(({ key, title }) => ({ key, title }));
//     localStorage.setItem(storageKey, JSON.stringify({ activeTab, selectedGraphs: serializableSelectedGraphs }));
//   }, [activeTab, selectedGraphs, symbol, tabContext]);

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (!symbol) {
//         setGraphsLoaded(true);
//         return;
//       }
//       const cacheKey = `plot_${symbol}_${timeRange}_${normalize}`;
//       const cachedData = getCachedData(cacheKey);
//       if (cachedData) {
//         setPlotData((prev) => ({ ...prev, [symbol]: cachedData }));
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const response = await fetch(`${API_BASE}/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             ...(getAuthToken && { Authorization: `Bearer ${getAuthToken()}` }),
//           },
//           body: JSON.stringify({ symbol, timeRange, normalize }),
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setPlotData((prev) => {
//           const updated = { ...prev, [symbol]: { ...prev[symbol], [timeRange]: { [normalize ? 'normalized' : 'raw']: data } } };
//           setCachedData(cacheKey, data);
//           return updated;
//         });
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     fetchPlotData();
//   }, [symbol, timeRange, normalize, API_BASE, getAuthToken]);

//   const graphSections = [
//     { title: "Candle Chronicles: Spread Patterns Over Time (TTM)", description: "Visualizes the distribution of candlestick spread patterns over the past year.", component: <CandleSpread symbol={symbol} />, key: "CandleSpread", image: candle_spread },
//     { title: "Boxing Prices: TTM Box Plot for Trade Prices", description: "Shows a box plot of trade prices over the last year with key levels.", component: <LastTraded symbol={symbol} />, key: "LastTraded", image: Last_Traded },
//     { title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", description: "Displays monthly price ranges and averages over the past year.", component: <AvgBoxPlots symbol={symbol} />, key: "AvgBoxPlots", image: AvgBox_Plots },
//     { title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", description: "Analyzes weekly trade delivery patterns during market trends.", component: <WormsPlots symbol={symbol} />, key: "WormsPlots", image: Worms_Plots },
//     { title: "MACD Analysis for TTM", description: "Plots the MACD indicator to identify momentum over the last year.", component: <MacdPlot symbol={symbol} />, key: "MacdPlot", image: Macd_Plot },
//     { title: "Sensex & Stock Fluctuations", description: "Compares monthly percentage changes between Sensex and the stock.", component: <SensexStockCorrBar symbol={symbol} />, key: "SensexStockCorrBar", image: Sensex_StockCorrBar },
//     { title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", description: "Visualizes correlation trends between Sensex and the stock.", component: <SensexVsStockCorr symbol={symbol} />, key: "SensexVsStockCorr", image: Sensex_VsStockCorr },
//     { title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`, description: "A heatmap comparing performance across Nifty50, BSE, and the stock.", component: <HeatMap symbol={symbol} />, key: "HeatMap", image: Heat_Map },
//     { title: "Market Mood: Delivery Trends & Trading Sentiment", description: "Analyzes delivery trends and trading sentiment over time.", component: <DelRate symbol={symbol} />, key: "DelRate", image: Del_Rate },
//     { title: "Breach Busters: Analyzing High and Low Breaches", description: "Examines instances of high and low price breaches.", component: <CandleBreach symbol={symbol} />, key: "CandleBreach", image: Candle_Breach },
//     { title: "Sensex Calculator", description: "A tool to calculate Sensex-related metrics for analysis.", component: <SensexCalculator />, key: "SensexCalculator", image: Sensex_Calculator },
//     { title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", description: "Compares PE, EPS, and Book Value within the industry context.", component: <IndustryBubble symbol={symbol} />, key: "IndustryBubble", image: Industry_Bubble },
//   ];

//   const handleGraphSelect = (graph) => {
//     if (!isLoggedIn && !graphSections.slice(0, MAX_VISIBLE_GRAPHS).some((g) => g.key === graph.key)) {
//       setShowLoginModal(true);
//       return;
//     }
//     setSelectedGraphs((prev) => {
//       if (symbols && symbols.length > 1 && !overlay) return [{ key: graph.key, title: graph.title }];
//       if (prev.some((g) => g.key === graph.key)) return prev.filter((g) => g.key !== graph.key);
//       if (prev.length < 2) return [...prev, { key: graph.key, title: graph.title }];
//       return [prev[1], { key: graph.key, title: graph.title }];
//     });
//   };

//   const handleClearSelection = () => setSelectedGraphs([]);

//   const renderGraphTabContent = () => {
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={handleClearSelection}
//               className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all hover:shadow-xl"
//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={`grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, key }) => {
//               const graph = graphSections.find((g) => g.key === key);
//               return graph ? (
//                 <div key={key} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-gray-300 p-4 flex flex-col items-center w-full h-full">
//                   <h2 className="text-xl font-semibold text-black mb-3 text-center">{title}</h2>
//                   <div className="w-full h-[600px] overflow-auto">{graph.component}</div>
//                 </div>
//               ) : null;
//             })}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, key, image }, index) => {
//             const isVisible = isLoggedIn || index < MAX_VISIBLE_GRAPHS;
//             return (
//               <div
//                 key={key}
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center w-full h-full min-h-[300px] cursor-pointer"
//                 onClick={() => (isVisible ? handleGraphSelect({ title, key }) : handleLoginClick())}
//                 role="button"
//                 tabIndex={0}
//               >
//                 <div className="relative w-full h-full flex flex-col items-center">
//                   <div className="absolute inset-0 flex flex-col items-center" style={{ filter: !isVisible ? 'blur(5px)' : 'none' }}>
//                     <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
//                     <h2 className="text-xl font-semibold text-black mb-2 text-center sm:text-sm">{title}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//                   </div>
//                   {!isVisible && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-lg z-10">
//                       <CgLogIn className="w-12 h-12 text-white mb-2" />
//                       <span className="text-white text-xl font-semibold text-center">Please Login to Unlock</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => (
//     <div className="w-full">
//       <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2>
//       <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.[timeRange]?.[normalize ? 'normalized' : 'raw']} />
//     </div>
//   );

//   const renderCandlePatternTabContent = () => (
//     <div className="w-full">
//       <h2 className="text-2xl text-center text-black font-bold mb-3"></h2>
//       <CandlePattern symbol={symbol} />
//     </div>
//   );

//       const renderShareHoldingTabContent = () => (
//     <div className="w-full">
//       {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2> */}
//       <Shareholding symbol={symbol} />
//     </div>
//   );

//   return (
//     <div className="text-center">
//       <div className="tabs tabs-lifted m-20 mx-auto w-max">
//         <button
//           role="tab"
//           className={`tab text-2xl font-bold transition-all duration-200 ${
//             activeTab === 'graphs'
//               ? 'tab-active text-cyan-600 text-3xl dark:text-cyan-400'
//               : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-gray-300'
//           }`}
//           onClick={() => setActiveTab('graphs')}
//         >
//           Data Analysis
//         </button>
//         <button
//           role="tab"
//           className={`tab text-2xl font-bold transition-all duration-200 ${
//             activeTab === 'technical'
//               ? 'tab-active text-cyan-600 text-3xl dark:text-cyan-400'
//               : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-gray-300'
//           }`}
//           onClick={() => setActiveTab('technical')}
//         >
//           Candle Stick
//         </button>
//         <button
//           role="tab"
//           className={`tab text-2xl font-bold transition-all duration-200 ${
//             activeTab === 'finance'
//               ? 'tab-active text-cyan-600 text-3xl dark:text-cyan-400'
//               : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-gray-300'
//           }`}
//           onClick={() => setActiveTab('candle_pattern')}
//         >
//           Candle Pattern
//         </button>
//         <button
//             role="tab"
//             className={`tab text-2xl font-bold transition-all duration-200 ${
//               activeTab === 'finance'
//                 ? 'tab-active text-cyan-600 text-3xl dark:text-cyan-400'
//                 : 'bg-base-200 text-gray-600 hover:bg-gray-300 hover:text-black dark:bg-slate-800 dark:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('Shareholding')}
//           >
//             ShareHolding
//       </button>

//       </div>
//       <div className="p-6 mt-8 dark:bg-slate-800 dark:text-white">
//         {activeTab === 'graphs' && renderGraphTabContent()}
//         {activeTab === 'technical' && renderTechnicalTabContent()}
//         {activeTab === 'candle_pattern' && renderCandlePatternTabContent()}
//         {activeTab === 'Shareholding' && renderShareHoldingTabContent()}
//       </div>

//       <Login isOpen={showLoginModal} onClose={handleCloseModal} onSuccess={handleLoginSuccess} showButtons={false} />
//     </div>
//   );
// };

// export default GraphSlider;

// -----------------------woco---------------------

// import React, { useEffect, useState } from 'react';
// // import { useAuth } from './AuthContext';
// import CandleBreach from './CandleBreach';
// import LastTraded from './LastTraded';
// import AvgBoxPlots from './AvgBoxPlots';
// import WormsPlots from './WormsPlots';
// import SensexStockCorrBar from './SensexVsStockCorrBar';
// import SensexVsStockCorr from './SensexVsStockCorr';
// import HeatMap from './HeatMap';
// import DelRate from './DelRate';
// import VoltyPlot from './VoltyPlot';
// import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
// import toast from 'react-hot-toast';
// import SensexCalculator from './SensexCalculator';
// import MacdPlot from './MacdPlot';
// import CandleSpread from './CandleSpreadDistribution';
// import Login from '../Login';

// import candle_spread from '/public/assets/gaph1.png';
// import Industry_Bubble from '/public/assets/graph13.png';
// import Sensex_Calculator from '/public/assets/graph7.png';
// import Volty_Plot from '/public/assets/graph12.png';
// import Candle_Breach from '/public/assets/graph9.png';
// import Del_Rate from '/public/assets/graph3.png';
// import Heat_Map from '/public/assets/graph8.png';
// import Sensex_VsStockCorr from '/public/assets/graph5.png';
// import Sensex_StockCorrBar from '/public/assets/graph6.png';
// import Macd_Plot from '/public/assets/graph11.png';
// import Worms_Plots from '/public/assets/graph4.png';
// import AvgBox_Plots from '/public/assets/graph10.png';
// import Last_Traded from '/public/assets/graph2.png';
// // import { CgLogIn } from 'react-icons/cg';
// import { useAuth } from '../AuthContext';
// import CandlePattern from './CandlePattern';
// import Shareholding from './Shareholding';
// // import FinancialTab from './FinanicialTab';
// import { FaUserLock } from 'react-icons/fa';
// import FinancialTab from './FinancialTab';

// const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false, tabContext = 'equityHub', getAuthToken }) => {
//   const { isLoggedIn } = useAuth();
//   const [activeTab, setActiveTab] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).activeTab || 'graphs' : 'graphs';
//   });
//   const [selectedGraphs, setSelectedGraphs] = useState(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const saved = localStorage.getItem(storageKey);
//     return saved ? JSON.parse(saved).selectedGraphs || [] : [];
//   });
//   const [plotData, setPlotData] = useState(() => {
//     const saved = localStorage.getItem('plotData');
//     return saved ? JSON.parse(saved) : {};
//   });
//   const [graphsLoaded, setGraphsLoaded] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || 'http://localhost:8080';
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
//   const MAX_VISIBLE_GRAPHS = 5;

//   const handleLoginClick = () => setShowLoginModal(true);
//   const handleCloseModal = () => setShowLoginModal(false);
//   const handleLoginSuccess = () => handleCloseModal();

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
//       console.error(`Failed to parse cached data for ${key}:`, err);
//       localStorage.removeItem(key);
//       return null;
//     }
//   };

//   const setCachedData = (key, data) => {
//     try {
//       const serializedData = JSON.stringify({ data, timestamp: Date.now() });
//       if (serializedData.length > 1024 * 1024) {
//         console.warn(`Data for ${key} exceeds 1MB, skipping cache.`);
//         return;
//       }
//       localStorage.setItem(key, serializedData);
//     } catch (err) {
//       if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
//         console.error(`Quota exceeded for key ${key}. Clearing oldest items and retrying.`);
//         const now = Date.now();
//         for (let i = 0; i < localStorage.length; i++) {
//           const key = localStorage.key(i);
//           const cached = localStorage.getItem(key);
//           try {
//             const { timestamp } = JSON.parse(cached);
//             if (now - timestamp > 24 * 60 * 60 * 1000) {
//               localStorage.removeItem(key);
//               i--;
//             }
//           } catch (e) {
//             localStorage.removeItem(key);
//             i--;
//           }
//         }
//         try {
//           localStorage.setItem(key, serializedData);
//         } catch (retryErr) {
//           console.error(`Retry failed for ${key}. Switching to no-cache mode.`, retryErr);
//           setError("Storage quota exceeded. Data will be fetched live.");
//         }
//       } else {
//         console.error(`Failed to cache data for ${key}:`, err);
//         setError("Failed to cache data due to an unexpected error.");
//       }
//     }
//   };

//   useEffect(() => {
//     const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
//     const serializableSelectedGraphs = selectedGraphs.map(({ key, title }) => ({ key, title }));
//     localStorage.setItem(storageKey, JSON.stringify({ activeTab, selectedGraphs: serializableSelectedGraphs }));
//   }, [activeTab, selectedGraphs, symbol, tabContext]);

//   useEffect(() => {
//     const fetchPlotData = async () => {
//       if (!symbol) {
//         setGraphsLoaded(true);
//         return;
//       }
//       const cacheKey = `plot_${symbol}_${timeRange}_${normalize}`;
//       const cachedData = getCachedData(cacheKey);
//       if (cachedData) {
//         setPlotData((prev) => ({ ...prev, [symbol]: cachedData }));
//         setGraphsLoaded(true);
//         return;
//       }

//       try {
//         const response = await fetch(`${API_BASE}/stocks/process`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             ...(getAuthToken && { Authorization: `Bearer ${getAuthToken()}` }),
//           },
//           body: JSON.stringify({ symbol, timeRange, normalize }),
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setPlotData((prev) => {
//           const updated = { ...prev, [symbol]: { ...prev[symbol], [timeRange]: { [normalize ? 'normalized' : 'raw']: data } } };
//           setCachedData(cacheKey, data);
//           return updated;
//         });
//         setGraphsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching plot data:', error);
//         toast.error(error.message || 'Error fetching plot data');
//       }
//     };

//     fetchPlotData();
//   }, [symbol, timeRange, normalize, API_BASE, getAuthToken]);

//   const graphSections = [
//     { title: "Candle Chronicles: Spread Patterns Over Time (TTM)", description: "Visualizes the distribution of candlestick spread patterns over the past year.", component: <CandleSpread symbol={symbol} />, key: "CandleSpread", image: candle_spread },
//     { title: "Boxing Prices: TTM Box Plot for Trade Prices", description: "Shows a box plot of trade prices over the last year with key levels.", component: <LastTraded symbol={symbol} />, key: "LastTraded", image: Last_Traded },
//     { title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", description: "Displays monthly price ranges and averages over the past year.", component: <AvgBoxPlots symbol={symbol} />, key: "AvgBoxPlots", image: AvgBox_Plots },
//     { title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", description: "Analyzes weekly trade delivery patterns during market trends.", component: <WormsPlots symbol={symbol} />, key: "WormsPlots", image: Worms_Plots },
//     { title: "MACD Analysis for TTM", description: "Plots the MACD indicator to identify momentum over the last year.", component: <MacdPlot symbol={symbol} />, key: "MacdPlot", image: Macd_Plot },
//     { title: "Sensex & Stock Fluctuations", description: "Compares monthly percentage changes between Sensex and the stock.", component: <SensexStockCorrBar symbol={symbol} />, key: "SensexStockCorrBar", image: Sensex_StockCorrBar },
//     { title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", description: "Visualizes correlation trends between Sensex and the stock.", component: <SensexVsStockCorr symbol={symbol} />, key: "SensexVsStockCorr", image: Sensex_VsStockCorr },
//     { title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`, description: "A heatmap comparing performance across Nifty50, BSE, and the stock.", component: <HeatMap symbol={symbol} />, key: "HeatMap", image: Heat_Map },
//     { title: "Market Mood: Delivery Trends & Trading Sentiment", description: "Analyzes delivery trends and trading sentiment over time.", component: <DelRate symbol={symbol} />, key: "DelRate", image: Del_Rate },
//     { title: "Breach Busters: Analyzing High and Low Breaches", description: "Examines instances of high and low price breaches.", component: <CandleBreach symbol={symbol} />, key: "CandleBreach", image: Candle_Breach },
//     { title: "Sensex Calculator", description: "A tool to calculate Sensex-related metrics for analysis.", component: <SensexCalculator />, key: "SensexCalculator", image: Sensex_Calculator },
//     { title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", description: "Compares PE, EPS, and Book Value within the industry context.", component: <IndustryBubble symbol={symbol} />, key: "IndustryBubble", image: Industry_Bubble },
//   ];

//   const handleGraphSelect = (graph) => {
//     if (!isLoggedIn && !graphSections.slice(0, MAX_VISIBLE_GRAPHS).some((g) => g.key === graph.key)) {
//       setShowLoginModal(true);
//       return;
//     }
//     setSelectedGraphs((prev) => {
//       if (symbols && symbols.length > 1 && !overlay) return [{ key: graph.key, title: graph.title }];
//       if (prev.some((g) => g.key === graph.key)) return prev.filter((g) => g.key !== graph.key);
//       if (prev.length < 2) return [...prev, { key: graph.key, title: graph.title }];
//       return [prev[1], { key: graph.key, title: graph.title }];
//     });
//   };

//   const handleClearSelection = () => setSelectedGraphs([]);

//   const renderGraphTabContent = () => {
//     if (selectedGraphs.length > 0) {
//       return (
//         <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//           <div className="flex justify-center mb-4">
//             <button
//               onClick={handleClearSelection}
//               className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all hover:shadow-xl"
//             >
//               Back to Graph Selection
//             </button>
//           </div>
//           <div className={`grid ${selectedGraphs.length === 2 && !overlay ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
//             {selectedGraphs.map(({ title, key }) => {
//               const graph = graphSections.find((g) => g.key === key);
//               return graph ? (
//                 <div key={key} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-gray-300 p-4 flex flex-col items-center w-full h-full">
//                   <h2 className="text-xl font-semibold text-black mb-3 text-center">{title}</h2>
//                   <div className="w-full h-[600px] overflow-auto">{graph.component}</div>
//                 </div>
//               ) : null;
//             })}
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {graphSections.map(({ title, description, key, image }, index) => {
//             const isVisible = isLoggedIn || index < MAX_VISIBLE_GRAPHS;
//             return (
//               <div
//                 key={key}
//                 className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg shadow-black p-4 flex flex-col items-center w-full h-full min-h-[300px] cursor-pointer"
//                 onClick={() => (isVisible ? handleGraphSelect({ title, key }) : handleLoginClick())}
//                 role="button"
//                 tabIndex={0}
//               >
//                 <div className="relative w-full h-full flex flex-col items-center">
//                   <div className="absolute inset-0 flex flex-col items-center" style={{ filter: !isVisible ? 'blur(5px)' : 'none' }}>
//                     <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
//                     <h2 className="text-xl font-semibold text-black mb-2 text-center sm:text-sm">{title}</h2>
//                     <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{description}</p>
//                   </div>
//                   {!isVisible && (
//                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-lg z-10">
//                       {/* <CgLogIn className="w-12 h-12 text-white mb-2" /> */}
//                          <FaUserLock className='text-2xl text-black'/>
//                       <span className="text-black text-sm font-semibold text-center">Please Login to Unlock</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderTechnicalTabContent = () => (
//     <div className="w-full">
//       <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2>
//       <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.[timeRange]?.[normalize ? 'normalized' : 'raw']} />
//     </div>
//   );

//   const renderCandlePatternTabContent = () => (
//     <div className="w-full">
//       <h2 className="text-2xl text-center text-black font-bold mb-3"></h2>
//       <CandlePattern symbol={symbol} />
//     </div>
//   );

//     const renderFinanceTabContent = () => (
//     <div className="w-full">
//       {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Financial Analysis</h2> */}
//       {/* Add your financial tab content here */}

//           <FinancialTab symbol={symbol} />            
//     </div>
//   );


//       const renderShareHoldingTabContent = () => (
//     <div className="w-full">
//       {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2> */}
//       <Shareholding symbol={symbol} />
//     </div>
//   );

//   return (
//    <div className="text-center">
//  <div className="tabs mx-auto max-w-6xl flex justify-center m-8">
//   <div className="flex gap-2 flex-wrap justify-center">
//     {[
//       { id: 'graphs', label: 'Data Analysis' },
//       { id: 'technical', label: 'Candle Stick' },
//       { id: 'candle_pattern', label: 'Candle Pattern' },
//       { id: 'finance', label: 'Financials' },
//       { id: 'Shareholding', label: 'Shareholding' },
//     ].map((tab) => (
//       <button
//         key={tab.id}
//         role="tab"
//         aria-selected={activeTab === tab.id}
//         aria-controls={`${tab.id}-tabpanel`}
//         id={`${tab.id}-tab`}
//         onClick={() => setActiveTab(tab.id)}
//         className={`px-5 py-2 rounded text-xl font-medium transition-all duration-300 shadow-sm
//           ${
//             activeTab === tab.id
//               ? 'bg-gradient-to-r from-sky-700 to-cyan-700 text-white shadow-lg scale-105 '
//               : 'bg-gray-100  text-gray-800 hover:bg-gray-200 hover:shadow-md dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
//           }`}
//       >
//         {tab.label}
//       </button>
//     ))}
//   </div>
// </div>


//   <div 
//     id={`${activeTab}-tabpanel`}
//     aria-labelledby={`${activeTab}-tab`}
//     role="tabpanel"
//     className="p-6 mt-2 rounded-lg bg-white shadow-sm dark:bg-slate-800 dark:text-white"
//   >
//     {activeTab === 'graphs' && renderGraphTabContent()}
//     {activeTab === 'technical' && renderTechnicalTabContent()}
//     {activeTab === 'candle_pattern' && renderCandlePatternTabContent()}
//     {activeTab === 'finance' && renderFinanceTabContent()}
//     {activeTab === 'Shareholding' && renderShareHoldingTabContent()}
//   </div>

//   <Login isOpen={showLoginModal} onClose={handleCloseModal} onSuccess={handleLoginSuccess} showButtons={false} />
// </div>
//   );
// };

// export default GraphSlider;


import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
// import { useAuth } from './AuthContext';
import CandleBreach from './CandleBreach';
import LastTraded from './LastTraded';
import AvgBoxPlots from './AvgBoxPlots';
import WormsPlots from './WormsPlots';
import SensexStockCorrBar from './SensexVsStockCorrBar';
import SensexVsStockCorr from './SensexVsStockCorr';
import HeatMap from './HeatMap';
import DelRate from './DelRate';
import VoltyPlot from './VoltyPlot';
import IndustryBubble from './IndustryBubble';
// import TechnicalPlot from './TechnicalPlot';
import toast from 'react-hot-toast';
import SensexCalculator from './SensexCalculator';
import MacdPlot from './MacdPlot';
import CandleSpread from './CandleSpreadDistribution';
import Login from '../Login';
import PublicTradingActivityPlot from './PublicTradingActivityPlot';

import { FaArrowLeft, FaArrowRight, FaChartLine, FaUserLock, FaUserTie } from 'react-icons/fa';
import candle_spread from '/public/assets/gaph1.png';
import Industry_Bubble from '/public/assets/graph13.png';
import Sensex_Calculator from '/public/assets/graph7.png';
import Volty_Plot from '/public/assets/graph12.png';
import Candle_Breach from '/public/assets/graph9.png';
import Del_Rate from '/public/assets/graph3.png';
import Heat_Map from '/public/assets/graph8.png';
import Sensex_VsStockCorr from '/public/assets/graph5.png';
import Sensex_StockCorrBar from '/public/assets/graph6.png';
import Macd_Plot from '/public/assets/graph11.png';
import Worms_Plots from '/public/assets/graph4.png';
import AvgBox_Plots from '/public/assets/graph10.png';
import Last_Traded from '/public/assets/graph2.png';
// import { CgLogIn } from 'react-icons/cg';
import { useAuth } from '../AuthContext';
import CandlePattern from './CandlePattern';
import Shareholding from './Shareholding';
// import FinancialTabs from './FinancialTabs';
import FinancialTab from './FinancialTab';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdAnalytics, MdAttachMoney, MdSwapHoriz } from 'react-icons/md';


const GraphSlider = ({ symbol, symbols, isFullWidth, timeRange = '1Y', normalize = false, overlay = false, tabContext = 'equityHub', getAuthToken }) => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).activeTab || 'graphs' : 'graphs';
  });
  const [selectedGraphs, setSelectedGraphs] = useState(() => {
    const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved).selectedGraphs || [] : [];
  });
  const [plotData, setPlotData] = useState(() => {
    const saved = localStorage.getItem('plotData');
    return saved ? JSON.parse(saved) : {};
  });
  const [graphsLoaded, setGraphsLoaded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds
  const MAX_VISIBLE_GRAPHS = 5;

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => handleCloseModal();

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
      console.error(`Failed to parse cached data for ${key}:`, err);
      localStorage.removeItem(key);
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      const serializedData = JSON.stringify({ data, timestamp: Date.now() });
      if (serializedData.length > 1024 * 1024) {
        console.warn(`Data for ${key} exceeds 1MB, skipping cache.`);
        return;
      }
      localStorage.setItem(key, serializedData);
    } catch (err) {
      if (err.name === 'QuotaExceededError' || err.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        console.error(`Quota exceeded for key ${key}. Clearing oldest items and retrying.`);
        const now = Date.now();
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const cached = localStorage.getItem(key);
          try {
            const { timestamp } = JSON.parse(cached);
            if (now - timestamp > 24 * 60 * 60 * 1000) {
              localStorage.removeItem(key);
              i--;
            }
          } catch (e) {
            localStorage.removeItem(key);
            i--;
          }
        }
        try {
          localStorage.setItem(key, serializedData);
        } catch (retryErr) {
          console.error(`Retry failed for ${key}. Switching to no-cache mode.`, retryErr);
          setError("Storage quota exceeded. Data will be fetched live.");
        }
      } else {
        console.error(`Failed to cache data for ${key}:`, err);
        setError("Failed to cache data due to an unexpected error.");
      }
    }
  };

  useEffect(() => {
    const storageKey = tabContext === 'equityHub' ? 'equityHubLastGraph' : `mySearchLastGraph_${symbol}`;
    const serializableSelectedGraphs = selectedGraphs.map(({ key, title }) => ({ key, title }));
    localStorage.setItem(storageKey, JSON.stringify({ activeTab, selectedGraphs: serializableSelectedGraphs }));
  }, [activeTab, selectedGraphs, symbol, tabContext]);

  useEffect(() => {
    const fetchPlotData = async () => {
      if (!symbol) {
        setGraphsLoaded(true);
        return;
      }
      const cacheKey = `plot_${symbol}_${timeRange}_${normalize}`;
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        setPlotData((prev) => ({ ...prev, [symbol]: cachedData }));
        setGraphsLoaded(true);
        return;
      }

      try {
        // const response = await fetch(`${API_BASE}/stocks/process`, {
        const response = await fetch(`${API_BASE}/stocks/test/candle_chronicle`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(getAuthToken && { Authorization: `Bearer ${getAuthToken()}` }),
          },
          body: JSON.stringify({ symbol, timeRange, normalize }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPlotData((prev) => {
          const updated = { ...prev, [symbol]: { ...prev[symbol], [timeRange]: { [normalize ? 'normalized' : 'raw']: data } } };
          setCachedData(cacheKey, data);
          return updated;
        });
        setGraphsLoaded(true);
      } catch (error) {
        // console.error('Error fetching plot data:', error);
        // toast.error(error.message || 'Error fetching plot data');
      }
    };

    fetchPlotData();
  }, [symbol, timeRange, normalize, API_BASE, getAuthToken]);

  const graphSections = [
    { title: "Candle Chronicles: Spread Patterns Over Time (TTM)", description: "Visualizes the distribution of candlestick spread patterns over the past year.", component: <CandleSpread symbol={symbol} />, key: "CandleSpread", image: candle_spread },
    { title: "Boxing Prices: TTM Box Plot for Trade Prices", description: "Shows a box plot of trade prices over the last year with key levels.", component: <LastTraded symbol={symbol} />, key: "LastTraded", image: Last_Traded },
    { title: "Price Trends in a Box: Monthly Ranges and Averages Explored (TTM)", description: "Displays monthly price ranges and averages over the past year.", component: <AvgBoxPlots symbol={symbol} />, key: "AvgBoxPlots", image: AvgBox_Plots },
    { title: "Trend Tapestry: Weekly Trade Delivery in Uptrends & Downtrends", description: "Analyzes weekly trade delivery patterns during market trends.", component: <WormsPlots symbol={symbol} />, key: "WormsPlots", image: Worms_Plots },
    { title: "MACD Analysis for TTM", description: "Plots the MACD indicator to identify momentum over the last year.", component: <MacdPlot symbol={symbol} />, key: "MacdPlot", image: Macd_Plot },
    { title: "Sensex & Stock Fluctuations", description: "Compares monthly percentage changes between Sensex and the stock.", component: <SensexStockCorrBar symbol={symbol} />, key: "SensexStockCorrBar", image: Sensex_StockCorrBar },
    { title: "Sensex Symphony: Harmonizing Stock Correlation Trends (TTM)", description: "Visualizes correlation trends between Sensex and the stock.", component: <SensexVsStockCorr symbol={symbol} />, key: "SensexVsStockCorr", image: Sensex_VsStockCorr },
    { title: `Performance Heatmap: Nifty50 vs BSE vs ${symbol}`, description: "A heatmap comparing performance across Nifty50, BSE, and the stock.", component: <HeatMap symbol={symbol} />, key: "HeatMap", image: Heat_Map },
    { title: "Market Mood: Delivery Trends & Trading Sentiment", description: "Analyzes delivery trends and trading sentiment over time.", component: <DelRate symbol={symbol} />, key: "DelRate", image: Del_Rate },
    { title: "Breach Busters: Analyzing High and Low Breaches", description: "Examines instances of high and low price breaches.", component: <CandleBreach symbol={symbol} />, key: "CandleBreach", image: Candle_Breach },
    { title: "Sensex Calculator", description: "A tool to calculate Sensex-related metrics for analysis.", component: <SensexCalculator symbol={symbol} />, key: "SensexCalculator", image: Sensex_Calculator },
    { title: "PE vs EPS vs Book Value: Gladiators in the Industry Arena", description: "Compares PE, EPS, and Book Value within the industry context.", component: <IndustryBubble symbol={symbol} />, key: "IndustryBubble", image: Industry_Bubble },
  ];

  const handleGraphSelect = (graph, index) => {
    if (!isLoggedIn && !graphSections.slice(0, MAX_VISIBLE_GRAPHS).some((g) => g.key === graph.key)) {
      setShowLoginModal(true);
      return;
    }
    setSelectedGraphs((prev,) => {
      if (symbols && symbols.length > 1 && !overlay) return [{ key: graph.key, title: graph.title }];
      if (prev.some((g) => g.key === graph.key)) return prev.filter((g) => g.key !== graph.key);
      if (prev.length < 2) return [...prev, { key: graph.key, title: graph.title }];
      return [prev[1], { key: graph.key, title: graph.title }];


    });

    const allGraphs = isLoggedIn ? graphSections : graphSections.slice(0, MAX_VISIBLE_GRAPHS);
    setSelectedGraphs(allGraphs.map(({ key, title }) => ({ key, title })));
    setCurrentSlide(index);
  };

  const handleClearSelection = () => setSelectedGraphs([]);
  // Custom Previous Arrow
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-700 to-sky-800 text-white p-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all hover:shadow-xl z-10"
      aria-label="Previous Graph"
    >
      <FaArrowLeft className="w-5 h-5" />
    </button>
  );
  // Custom Next Arrow
  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sky-700 to-sky-800 text-white p-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all hover:shadow-xl z-10"
      aria-label="Next Graph"
    >
      <FaArrowRight className="w-5 h-5" />
    </button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: (index) => setCurrentSlide(index),
    initialSlide: currentSlide,
  };

  const renderGraphTabContent = () => {
    if (selectedGraphs.length > 0) {
      return (
        <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
          <div className="flex justify-center mb-4">
            <button
              onClick={handleClearSelection}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-700 to-sky-800 text-white px-6 py-3 rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all hover:shadow-xl"
            >
              Back to Graph Selection
            </button>
          </div>
          <Slider {...sliderSettings} ref={sliderRef}>
            {selectedGraphs.map(({ title, key }, index) => {
              const graph = graphSections.find((g) => g.key === key);
              return graph ? (
                <div key={key} className="relative bg-white dark:bg-gray-800 rounded-lg shadow-sm shadow-gray-300 p-4 flex flex-col items-center w-full h-full">
                  <h2 className="text-xl font-semibold text-black mb-3 text-center dark:text-white">{title}</h2>
                  <div className="w-full h-[600px] overflow-auto dark:text-white">{graph.component}</div>
                </div>
              ) : null;
            })}
          </Slider>
        </div>
      );
    }

    return (
      <div className={`${isFullWidth ? 'w-full' : 'w-auto'} transition-all duration-300 p-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {graphSections.map(({ title, description, key, image }, index) => {
            const isVisible = isLoggedIn || index < MAX_VISIBLE_GRAPHS;
            return (
              <div
                key={key}
                className="relative bg-white dark:bg-gray-800 rounded-lg border p-4 flex flex-col items-center w-full h-full min-h-[300px] cursor-pointer"
                onClick={() => (isVisible ? handleGraphSelect({ title, key }, index) : handleLoginClick())}
                role="button"
                tabIndex={0}
              >
                <div className="relative w-full h-full flex flex-col items-center">
                  <div className="absolute inset-0 flex flex-col items-center" style={{ filter: !isVisible ? 'blur(5px)' : 'none' }}>
                    <img src={image} alt={title} className="w-full h-32 object-cover rounded mb-2" />
                    <h2 className="text-xl font-semibold text-black mb-2 text-center sm:text-sm dark:text-white">{title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center dark:text-white">{description}</p>
                  </div>
                  {!isVisible && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 rounded-lg z-10">
                      {/* <CgLogIn className="w-12 h-12 text-white mb-2" /> */}
                      <FaUserLock className='text-2xl text-black' />
                      <span className="text-white text-sm font-semibold text-center dark:text-white">Please Login to Unlock</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // const renderTechnicalTabContent = () => (
  //   <div className="w-full">
  //     <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2>
  //     <TechnicalPlot symbol={symbol} cachedData={plotData[symbol]?.[timeRange]?.[normalize ? 'normalized' : 'raw']} />
  //   </div>
  // );

  const renderCandlePatternTabContent = () => (
    <div className="w-full">
      <h2 className="text-2xl text-center text-black font-bold mb-3"></h2>
      <CandlePattern symbol={symbol} />
    </div>
  );

  const renderFinanceTabContent = () => (
    <div className="w-full">
      {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Financial Analysis</h2> */}
      {/* Add your financial tab content here */}
      <FinancialTab symbol={symbol} />

    </div>
  );


  const renderShareHoldingTabContent = () => (
    <div className="w-full">
      {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2> */}
      <Shareholding symbol={symbol} />
    </div>
  );

  const PublicTradingActivityTabContent = () => (
    <div className="w-full">
      {/* <h2 className="text-2xl text-center text-black font-bold mb-3">Candlestick Analysis</h2> */}
      <PublicTradingActivityPlot symbol={symbol} />
    </div>
  );

  return (
    <div className="text-center font-sans">
      <div className="tabs mx-auto max-w-6xl flex justify-center my-12">
        <div className="flex gap-2 flex-wrap justify-center dark:from-slate-900/90 dark:to-slate-800/80 p-2 backdrop-blur-md  dark:border-slate-700/50 shadow-xl">
          {[
            { id: 'graphs', label: 'Data Analysis', icon: <MdAnalytics /> },
            // { id: 'technical', label: 'Candle Stick' },
            { id: 'candle_pattern', label: 'Candle Pattern', icon: <FaChartLine /> },
            { id: 'finance', label: 'Financials', icon: <MdAttachMoney /> },
            { id: 'Shareholding', label: 'Shareholding', icon: <FaUserTie /> },
            { id: 'PublicTradingActivityPlot', label: 'Public Trading Activity', icon: <MdSwapHoriz /> }
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-tabpanel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-3 rounded-md text-base font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-500/30'
                  : 'text-gray-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-blue-400 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/80'
                } flex items-center gap-2`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-6 h-1.5 bg-sky-400 rounded-sm animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>


      <div
        id={`${activeTab}-tabpanel`}
        aria-labelledby={`${activeTab}-tab`}
        role="tabpanel"
        className="p-10 mt-6  bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200/50 dark:border-slate-700/50  transition-all duration-500 ease-in-out transform"
      >

        <div className="animate-fade-in">
          {activeTab === 'graphs' && renderGraphTabContent()}

          {activeTab === 'candle_pattern' && renderCandlePatternTabContent()}
          {activeTab === 'finance' && renderFinanceTabContent()}
          {activeTab === 'Shareholding' && renderShareHoldingTabContent()}
          {activeTab === 'PublicTradingActivityPlot' && PublicTradingActivityTabContent()}
        </div>
      </div>

      <Login isOpen={showLoginModal} onClose={handleCloseModal} onSuccess={handleLoginSuccess} showButtons={false} />
    </div>
  );
};

export default GraphSlider;