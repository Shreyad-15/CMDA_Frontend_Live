
// import { useState } from 'react';
// import { FaChartBar, FaBars, FaLayerGroup, FaBriefcase } from 'react-icons/fa';
// import { MdHome } from 'react-icons/md';
// import { motion, AnimatePresence } from 'framer-motion';
// import DraggableItem from './DraggableItem';
// import { useNavigate } from 'react-router-dom';

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
// import Top_TenScript from '/public/assets/top_ten.png';
// import Stock_DepAmtOverTime from '/public/assets/deploed_amount.png';
// import Combined_Box from '/public/assets/turnover_box.png';
// import Create_PNL from '/public/assets/market_value.png';
// import Swot_Plot from '/public/assets/swot_plot.png';
// import Ind_Sunburst from '/public/assets/industry_sunburst.png';
// // import User_SunburstDrop from '/public/assets/industry_insights.png';
// import ComBub_Chart from '/public/assets/industry_bubble.png';
// import Inv_AmtPlot from '/public/assets/invest_amount.png';
// import Best_TradePlot from '/public/assets/best_trades.png';
// import Classify_StockRisk from '/public/assets/stock_risk.png';
// import Eps_BvQuaterly from '/public/assets/earning_plus.png';
// import Short_NseTable from '/public/assets/short_nseTable.png';
// import Portfolio_Results from '/public/assets/portfolio_result.png';
// import Latest_Insights from '/public/assets/portfolio_insights.png';
// import Portf_Matrics from '/public/assets/portf_matrice.png';
// import technical_plot from '/public/assets/technical_plot.png';

// const SidebarRight = ({ collapsed, setCollapsed }) => {
//   const [activeTab, setActiveTab] = useState('equity');
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate('/');
//     setCollapsed(true);
//   };

//   const draggableItems = [
//     { id: 'candle-spread', label: 'Candle Spread', icon: candle_spread },
//     { id: 'last-traded', label: 'Last Traded', icon: Last_Traded },
//     { id: 'avg-box', label: 'Avg Box Plots', icon: AvgBox_Plots },
//     { id: 'worms-plot', label: 'Worms Plots', icon: Worms_Plots },
//     { id: 'macd-plot', label: 'MACD Plot', icon: Macd_Plot },
//     { id: 'openClose', label: 'OpenClose', icon: Candle_Breach },
//     { id: 'candleBreach', label: 'Candle Breach', icon: Candle_Breach },
//     { id: 'heat-map', label: 'Heatmap', icon: Heat_Map },
//     { id: 'del-rate', label: 'Delivary Rate', icon: Del_Rate },
//     { id: 'voltyPlot', label: 'Volatility Plot', icon: Volty_Plot },
//     { id: 'industryBubble', label: 'Industry Bubble', icon: Industry_Bubble },
//     { id: 'technicalPlot', label: 'Candle stick', icon: technical_plot },
//     { id: 'sensexVsStockCorr', label: 'sensexVsStockCorr', icon: Sensex_VsStockCorr },
//     { id: 'sensexStockCorrBar', label: 'sensexStockCorrBar', icon: Sensex_StockCorrBar },
//   ];

//   const portDraggableItems = [
//     { id: 'TopTenScript', label: 'TopTenScript', icon: Top_TenScript },
//     { id: 'ShortNseTable', label: 'ShortNseTable', icon: Short_NseTable },
//     { id: 'PortfolioResults', label: 'PortfolioResults', icon: Portfolio_Results },
//     { id: 'LatestInsights', label: 'LatestInsights', icon: Latest_Insights },
//     { id: 'PortfMatrics', label: 'PortfMatrics', icon: Portf_Matrics },
//     { id: 'StockDepAmtOverTime', label: 'StockDepAmtOverTime', icon: Stock_DepAmtOverTime },
//     { id: 'CombinedBox', label: 'CombinedBox', icon: Combined_Box },
//     { id: 'CreatePNL', label: 'CreatePNL', icon: Create_PNL },
//     { id: 'SwotPlot', label: 'SwotPlot', icon: Swot_Plot },
//     { id: 'IndSunburst', label: 'IndSunburst', icon: Ind_Sunburst },
//     // { id: 'UserSunburstDrop', label: 'UserSunburstDrop', icon: User_SunburstDrop },
//     { id: 'ComBubChart', label: 'ComBubChart', icon: ComBub_Chart },
//     { id: 'InvAmtPlot', label: 'InvAmtPlot', icon: Inv_AmtPlot },
//     { id: 'BestTradePlot', label: 'BestTradePlot', icon: Best_TradePlot },
//     { id: 'ClassifyStockRisk', label: 'ClassifyStockRisk', icon: Classify_StockRisk },
//     { id: 'EPSQuarterlyChart', label: 'EPSQuarterlyChart', icon: Eps_BvQuaterly },
//   ];

//   const filteredItems = (activeTab === 'equity' ? draggableItems : portDraggableItems).filter(item =>
//     item.label.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderItems = (items) => (
//     <div className={`grid gap-2 transition-all grid-cols-1 xs:grid-cols-2 ${collapsed ? 'place-items-center' : 'sm:grid-cols-2'}`}>
//       {items.map((item) => (
//         <div key={item.id} className="relative group w-full flex justify-center">
//           <div
//             className="rounded-lg bg-white/10 border border-gray-600 p-3 cursor-grab 
//               hover:bg-white/20 hover:shadow-md transition-all duration-200 w-full max-w-[140px] xs:max-w-[160px]"
//             title={collapsed ? item.label : ''}
//           >
//             <DraggableItem id={item.id} label={item.label} icon={item.icon} collapsed={collapsed} />
//           </div>
//           {collapsed && (
//             <span
//               className="absolute top-full left-2/2 translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 max-w-[120px] text-center"
//             >
//               {item.label}
//             </span>
//           )}
//         </div>       
//       ))}
//     </div>
//   );

//   return (
//     <>
//       {/* Backdrop for Mobile */}
//       <AnimatePresence>
//         {!collapsed && (
//           <motion.div
//             key="sidebar-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="sm:hidden fixed inset-0 bg-black z-45"
//             onClick={() => setCollapsed(true)}
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <AnimatePresence>
//         <motion.aside
//           initial={{ x: '100%' }}
//           animate={{ x: collapsed ? '100%' : 0 }}
//           exit={{ x: '100%' }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className={`fixed top-0 right-0 h-full z-50 bg-gray-800 text-white flex flex-col 
//             shadow-lg max-w-full overflow-hidden ${collapsed ? 'w-0' : 'w-56 xs:w-64 sm:w-64'}`}
//         >
//           {/* Header */}
//           <header className="flex justify-between items-center p-4 border-b border-gray-700">
//           <h2 className="text-lg font-semibold">Drag & Drop</h2>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleHome}
//               className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
//               title="Go Home"
//               aria-label="Go to Home"
//             >
//               <MdHome size={20} />
//             </button>
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
//               title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
//               aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
//             >
//               <FaBars size={18} />
//             </button>
//           </div>
//         </header>

//           {/* Toggle Tabs */}
//           {!collapsed && (
//             <nav className="px-3 py-2">
//               <div className="flex bg-gray-900 rounded-full p-1 text-xs select-none">
//                 <button
//                   onClick={() => setActiveTab('equity')}
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 font-medium rounded-full
//                     ${activeTab === 'equity' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   <FaLayerGroup size={14} />
//                   <span className="xs:inline">EquityHub</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('portfolio')}
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 font-medium rounded-full
//                     ${activeTab === 'portfolio' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   <FaBriefcase size={14} />
//                   <span className="xs:inline">Portfolio</span>
//                 </button>
//               </div>
//             </nav>
//           )}

//           {/* Search */}
//           {!collapsed && (
//             <div className="px-3 pb-2">
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search components..."
//                 className="w-full px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs sm:text-sm placeholder-gray-400 
//                   border border-gray-600 focus:outline-none focus:ring-1 focus:ring-white"
//               />
//             </div>
//           )}

//           {/* Content */}
//           {!collapsed && (
//             <main className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//               <h3 className="uppercase font-medium mb-2 text-xs sm:text-[11px] text-gray-400 hidden xs:block">
//                 {activeTab === 'equity' ? 'EquityHub Analytics' : 'Portfolio Analytics'}
//               </h3>
//               {renderItems(filteredItems)}
//             </main>
//           )}

//           {/* Footer */}
//           {!collapsed && (
//             <footer className="px-3 py-2 text-xs text-gray-400 border-t border-gray-700 text-center hidden xs:block">
//               © 2025 – All rights reserved by <span className="font-semibold">CMDA</span>
//             </footer>
//           )}
//         </motion.aside>
//       </AnimatePresence>
//     </>
//   );
// };

// export default SidebarRight;


// ------------working code 3sept ----------------------

// import { useState } from 'react';
// import { FaChartBar, FaBars, FaLayerGroup, FaBriefcase } from 'react-icons/fa';
// import { MdHome } from 'react-icons/md';
// import { motion, AnimatePresence } from 'framer-motion';
// import DraggableItem from './DraggableItem';
// import { useNavigate } from 'react-router-dom';

// import candle_spread from '/public/assets/gaph1.png';
// import Industry_Bubble from '/public/assets/graph13.png';
// import Sensex_Calculator from '/public/assets/graph7.png';
// // import Volty_Plot from '/public/assets/graph12.png';
// import Candle_Breach from '/public/assets/graph9.png';
// import Del_Rate from '/public/assets/graph3.png';
// import Heat_Map from '/public/assets/graph8.png';
// import Sensex_VsStockCorr from '/public/assets/graph5.png';
// import Sensex_StockCorrBar from '/public/assets/graph6.png';
// import Macd_Plot from '/public/assets/graph11.png';
// import Worms_Plots from '/public/assets/graph4.png';
// import AvgBox_Plots from '/public/assets/graph10.png';
// import Last_Traded from '/public/assets/graph2.png';
// import Top_TenScript from '/public/assets/top_ten.png';
// import Stock_DepAmtOverTime from '/public/assets/deploed_amount.png';
// import Combined_Box from '/public/assets/turnover_box.png';
// import Create_PNL from '/public/assets/market_value.png';
// import Swot_Plot from '/public/assets/swot_plot.png';
// // import Ind_Sunburst from '/public/assets/industry_sunburst.png';
// // import User_SunburstDrop from '/public/assets/industry_insights.png';
// import ComBub_Chart from '/public/assets/industry_bubble.png';
// import Inv_AmtPlot from '/public/assets/invest_amount.png';
// import Best_TradePlot from '/public/assets/best_trades.png';
// import Classify_StockRisk from '/public/assets/stock_risk.png';
// import Eps_BvQuaterly from '/public/assets/earning_plus.png';
// import Short_NseTable from '/public/assets/short_nseTable.png';
// import Portfolio_Results from '/public/assets/portfolio_result.png';
// import Latest_Insights from '/public/assets/portfolio_insights.png';
// import Portf_Matrics from '/public/assets/portf_matrice.png';
// import technical_plot from '/public/assets/technical_plot.png';
//  import Share from '/public/assets/share.png'
//  import Price from '/public/assets/price.png'

// const SidebarRight = ({ collapsed, setCollapsed, onItemClick }) => {
//   const [activeTab, setActiveTab] = useState('equity');
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   const handleHome = () => {
//     navigate('/');
//     setCollapsed(true);
//   };

//   const draggableItems = [
//     { id: 'candle-spread', label: 'Candle Spread', icon: candle_spread },
//     { id: 'last-traded', label: 'Last Traded', icon: Last_Traded },
//     { id: 'avg-box', label: 'Avg Box Plots', icon: AvgBox_Plots },
//     { id: 'worms-plot', label: 'Worms Plots', icon: Worms_Plots },
//     { id: 'macd-plot', label: 'MACD Plot', icon: Macd_Plot },
//     // { id: 'openClose', label: 'OpenClose', icon: Candle_Breach },
//     { id: 'candleBreach', label: 'Candle Breach', icon: Candle_Breach },
//     { id: 'heat-map', label: 'Heatmap', icon: Heat_Map },
//     { id: 'del-rate', label: 'Delivary Rate', icon: Del_Rate },
//     // { id: 'voltyPlot', label: 'Volatility Plot', icon: Volty_Plot },
//     { id: 'industryBubble', label: 'Industry Bubble', icon: Industry_Bubble },
//     // { id: 'technicalPlot', label: 'Candle stick', icon: technical_plot },
//     { id: 'SensexVsStockCorr', label: 'SensexVsStockCorr', icon: Sensex_VsStockCorr },
//     { id: 'SensexStockCorrBar', label: 'SensexStockCorrBar', icon: Sensex_StockCorrBar },
//     { id: 'CandlePattern', label: 'CandlePattern', icon: technical_plot },
//   ];

//   const portDraggableItems = [
//     { id: 'TopTenScript', label: 'TopTenScript', icon: Top_TenScript },
//         { id: 'ShareholdingPlot', label: 'ShareholdingPlot', icon: Share},
//         {id:'PriceAcquisitionPlot',label:'PriceAcquisitionPlot',icon:Price},

//     { id: 'ShortNseTable', label: 'ShortNseTable', icon: Short_NseTable },
//     { id: 'PortfolioResults', label: 'PortfolioResults', icon: Portfolio_Results },
//     { id: 'LatestInsights', label: 'LatestInsights', icon: Latest_Insights },
//     { id: 'PortfMatrics', label: 'PortfMatrics', icon: Portf_Matrics },
//     { id: 'StockDepAmtOverTime', label: 'StockDepAmtOverTime', icon: Stock_DepAmtOverTime },
//     { id: 'CombinedBox', label: 'CombinedBox', icon: Combined_Box },
//     { id: 'CreatePNL', label: 'CreatePNL', icon: Create_PNL },
//     { id: 'SwotPlot', label: 'SwotPlot', icon: Swot_Plot },
//     // { id: 'IndSunburst', label: 'IndSunburst', icon: Ind_Sunburst },
//     { id: 'ComBubChart', label: 'ComBubChart', icon: ComBub_Chart },
//     { id: 'InvAmtPlot', label: 'InvAmtPlot', icon: Inv_AmtPlot },
//     { id: 'BestTradePlot', label: 'BestTradePlot', icon: Best_TradePlot },
//     { id: 'ClassifyStockRisk', label: 'ClassifyStockRisk', icon: Classify_StockRisk },
//     { id: 'EPSQuarterlyChart', label: 'EPSQuarterlyChart', icon: Eps_BvQuaterly },
//   ];

//   const filteredItems = (activeTab === 'equity' ? draggableItems : portDraggableItems).filter(item =>
//     item.label.toLowerCase().includes(search.toLowerCase())
//   );

//   const renderItems = (items) => (
//     <div className={`grid gap-2 transition-all grid-cols-1 xs:grid-cols-2 ${collapsed ? 'place-items-center' : 'sm:grid-cols-2'}`}>
//       {items.map((item) => (
//         <div key={item.id} className="relative group w-full flex justify-center">
//           <div
//             className="rounded-lg bg-white/10 border border-gray-600 p-3 cursor-grab 
//               hover:bg-white/20 hover:shadow-md transition-all duration-200 w-full max-w-[140px] xs:max-w-[160px]"
//             title={collapsed ? item.label : ''}
//             onClick={() => onItemClick(item)}
//           >
//             <DraggableItem id={item.id} label={item.label} icon={item.icon} collapsed={collapsed} />
//           </div>
//           {collapsed && (
//             <span
//               className="absolute top-full left-2/2 translate-x-1/2 mt-2 px-2 py-1 rounded bg-black text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 max-w-[120px] text-center"
//             >
//               {item.label}
//             </span>
//           )}
//         </div>       
//       ))}
//     </div>
//   );

//   return (
//     <>
//       <AnimatePresence>
//         {!collapsed && (
//           <motion.div
//             key="sidebar-backdrop"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="sm:hidden fixed inset-0 bg-black z-45"
//             onClick={() => setCollapsed(true)}
//             aria-hidden="true"
//           />
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         <motion.aside
//           initial={{ x: '100%' }}
//           animate={{ x: collapsed ? '100%' : 0 }}
//           exit={{ x: '100%' }}
//           transition={{ duration: 0.3, ease: 'easeInOut' }}
//           className={`fixed top-0 right-0 h-full z-50 bg-gray-800 text-white flex flex-col 
//             shadow-lg max-w-full overflow-hidden ${collapsed ? 'w-0' : 'w-56 xs:w-64 sm:w-64'}`}
//         >
//           <header className="flex justify-between items-center p-4 border-b border-gray-700">
//             <h2 className="text-lg font-semibold">Drag & Drop</h2>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={handleHome}
//                 className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
//                 title="Go Home"
//                 aria-label="Go to Home"
//               >
//                 <MdHome size={20} />
//               </button>
//               <button
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
//                 title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
//                 aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
//               >
//                 <FaBars size={18} />
//               </button>
//             </div>
//           </header>

//           {!collapsed && (
//             <nav className="px-3 py-2">
//               <div className="flex bg-gray-900 rounded-full p-1 text-xs select-none">
//                 <button
//                   onClick={() => setActiveTab('equity')}
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 font-medium rounded-full
//                     ${activeTab === 'equity' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   <FaLayerGroup size={14} />
//                   <span className="xs:inline">EquityHub</span>
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('portfolio')}
//                   className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 font-medium rounded-full
//                     ${activeTab === 'portfolio' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
//                 >
//                   <FaBriefcase size={14} />
//                   <span className="xs:inline">Portfolio</span>
//                 </button>
//               </div>
//             </nav>
//           )}

//           {!collapsed && (
//             <div className="px-3 pb-2">
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search components..."
//                 className="w-full px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs sm:text-sm placeholder-gray-400 
//                   border border-gray-600 focus:outline-none focus:ring-1 focus:ring-white"
//               />
//             </div>
//           )}

//           {!collapsed && (
//             <main className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
//               <h3 className="uppercase font-medium mb-2 text-xs sm:text-[11px] text-gray-400 hidden xs:block">
//                 {activeTab === 'equity' ? 'EquityHub Analytics' : 'Portfolio Analytics'}
//               </h3>
//               {renderItems(filteredItems)}
//             </main>
//           )}

//           {!collapsed && (
//             <footer className="px-3 py-2 text-xs text-gray-400 border-t border-gray-700 text-center hidden xs:block">
//               © 2025 – All rights reserved by <span className="font-semibold">CMDA</span>
//             </footer>
//           )}
//         </motion.aside>
//       </AnimatePresence>
//     </>
//   );
// };

// export default SidebarRight;



import { useState, useEffect } from 'react';
import { FaChartBar, FaBars, FaLayerGroup, FaBriefcase, FaSearch, FaTimes } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableItem from './DraggableItem';
import { useNavigate } from 'react-router-dom';

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
import Top_TenScript from '/public/assets/top_ten.png';
import Stock_DepAmtOverTime from '/public/assets/deploed_amount.png';
import Combined_Box from '/public/assets/turnover_box.png';
import Create_PNL from '/public/assets/market_value.png';
import Swot_Plot from '/public/assets/swot_plot.png';
import Share from '/public/assets/share.png'
import ComBub_Chart from '/public/assets/industry_bubble.png';
import Inv_AmtPlot from '/public/assets/invest_amount.png';
import Best_TradePlot from '/public/assets/best_trades.png';
import Classify_StockRisk from '/public/assets/stock_risk.png';
import Eps_BvQuaterly from '/public/assets/earning_plus.png';
import Short_NseTable from '/public/assets/short_nseTable.png';
import Portfolio_Results from '/public/assets/portfolio_result.png';
import Latest_Insights from '/public/assets/portfolio_insights.png';
import Portf_Matrics from '/public/assets/portf_matrice.png';

const SidebarRight = ({ collapsed, setCollapsed }) => {
  const [activeTab, setActiveTab] = useState('equity');
  const [search, setSearch] = useState('');
  // const [recentItems, setRecentItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('dashboardFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleHome = () => {
    navigate('/');
    setCollapsed(true);
  };

  // const handleAddToRecent = (item) => {
  //   const newRecent = recentItems.filter(i => i.id !== item.id);
  //   newRecent.unshift(item);
  //   if (newRecent.length > 5) newRecent.pop();
  //   setRecentItems(newRecent);
  // };

  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      setFavorites(favorites.filter(fav => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const draggableItems = [
    { id: 'candle-spread', label: 'Candle Spread', icon: candle_spread },
    { id: 'last-traded', label: 'Last Traded', icon: Last_Traded },
    { id: 'avg-box', label: 'Avg Box Plots', icon: AvgBox_Plots },
    { id: 'worms-plot', label: 'Worms Plots', icon: Worms_Plots },
    { id: 'macd-plot', label: 'MACD Plot', icon: Macd_Plot },
    { id: 'openClose', label: 'OpenClose', icon: Candle_Breach },
    { id: 'candleBreach', label: 'Candle Breach', icon: Candle_Breach },
    { id: 'heat-map', label: 'Heatmap', icon: Heat_Map },
    { id: 'del-rate', label: 'Delivary Rate', icon: Del_Rate },
    { id: 'voltyPlot', label: 'Volatility Plot', icon: Volty_Plot },
    { id: 'industryBubble', label: 'Industry Bubble', icon: Industry_Bubble },
    // { id: 'technicalPlot', label: 'Technical Plot', icon: candle_spread },
    { id: 'sensexVsStockCorr', label: 'Sensex Vs Stock Correlation', icon: Sensex_VsStockCorr },
    { id: 'sensexStockCorrBar', label: 'Sensex Stock Correlation Bar', icon: Sensex_StockCorrBar },
    { id: 'CandlePattern', label: 'CandlePattern', icon: candle_spread },
  ];

  const portDraggableItems = [
    { id: 'TopTenScript', label: 'TopTenScript', icon: Top_TenScript },
    { id: 'ShareHoldingPlot', label: 'ShareHolding', icon: Share },
    { id: 'ShortNseTable', label: 'ShortNseTable', icon: Short_NseTable },
    { id: 'PortfolioResults', label: 'PortfolioResults', icon: Portfolio_Results },
    { id: 'LatestInsights', label: 'LatestInsights', icon: Latest_Insights },
    { id: 'PortfMatrics', label: 'PortfMatrics', icon: Portf_Matrics },
    { id: 'StockDepAmtOverTime', label: 'StockDepAmtOverTime', icon: Stock_DepAmtOverTime },
    { id: 'CombinedBox', label: 'CombinedBox', icon: Combined_Box },
    { id: 'CreatePNL', label: 'CreatePNL', icon: Create_PNL },
    { id: 'SwotPlot', label: 'SwotPlot', icon: Swot_Plot },

    { id: 'ComBubChart', label: 'ComBubChart', icon: ComBub_Chart },
    { id: 'InvAmtPlot', label: 'InvAmtPlot', icon: Inv_AmtPlot },
    { id: 'BestTradePlot', label: 'BestTradePlot', icon: Best_TradePlot },
    { id: 'ClassifyStockRisk', label: 'ClassifyStockRisk', icon: Classify_StockRisk },
    { id: 'EPSQuarterlyChart', label: 'EPSQuarterlyChart', icon: Eps_BvQuaterly },
  ];

  const allItems = [...draggableItems, ...portDraggableItems];

  const filteredItems = (activeTab === 'equity' ? draggableItems : portDraggableItems).filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const renderItems = (items) => (
    <div className={`grid gap-3 transition-all grid-cols-1 ${collapsed ? 'place-items-center' : 'sm:grid-cols-2'}`}>
      {items.map((item) => {
        const isFavorite = favorites.some(fav => fav.id === item.id);
        return (
          <div key={item.id} className="relative group w-full flex justify-center">
            <div
              className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 cursor-grab hover:bg-blue-500/20 transition-colors"
              title={collapsed ? item.label : ''}
              onClick={() => handleAddToRecent(item)}
            >
              <div className="absolute top-1 right-1 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                  className="rounded-full bg-gray-800/80 hover:bg-blue-500/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 ${isFavorite ? 'text-blue-400 fill-blue-400' : 'text-gray-400'}`}
                    viewBox="0 0 20 20"
                    fill={isFavorite ? "currentColor" : "none"}
                    stroke="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </div>
              <DraggableItem id={item.id} label={item.label} icon={item.icon} collapsed={collapsed} />
            </div>
            {collapsed && (
              <span
                className="absolute top-full left-2/2 translate-x-1/2 mt-2 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 max-w-[120px] text-center shadow-lg"
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden fixed inset-0 bg-black z-45"
            onClick={() => setCollapsed(true)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Collapsed Sidebar Handle */}
      {collapsed && (
        <motion.div
          className="fixed top-1/2 -translate-y-1/2 left-0 z-40 bg-blue-600 hover:bg-blue-700 p-2 rounded-l-lg shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(false)}
        >
          <FaBars className="text-white" size={16} />
        </motion.div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: collapsed ? '100%' : 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={`fixed top-0 right-0 h-full z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col 
            shadow-2xl max-w-full overflow-hidden ${collapsed ? 'w-0' : 'w-72 xs:w-80'}`}
        >
          {/* Header */}
          <header className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/50">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Analytics Panel
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleHome}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors hover:scale-105"
                title="Go Home"
                aria-label="Go to Home"
              >
                <MdHome size={20} />
              </button>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors hover:scale-105"
                title="Collapse Sidebar"
                aria-label="Collapse Sidebar"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </header>

          {/* Toggle Tabs */}
          <nav className="px-4 py-3 bg-gray-800/30">
            <div className="flex bg-gray-800 rounded-xl p-1 text-sm select-none shadow-inner">
              <button
                onClick={() => setActiveTab('equity')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 font-medium rounded-xl transition-all
                  ${activeTab === 'equity'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
              >
                <FaLayerGroup size={16} />
                <span>Equity insignts</span>
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 font-medium rounded-xl transition-all
                  ${activeTab === 'portfolio'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
              >
                <FaBriefcase size={16} />
                <span>Portfolio</span>
              </button>
            </div>
          </nav>

          {/* Search */}
          <div className="px-4 py-3 relative">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-800 text-white text-sm placeholder-gray-400 
                  border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="px-4 py-2">
              <h3 className="text-xs uppercase font-semibold text-gray-400 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Favorites
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {favorites.map(item => (
                  <div key={item.id} className="relative group">
                    <div
                      className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 cursor-grab hover:bg-blue-500/20 transition-colors"
                      onClick={() => handleAddToRecent(item)}
                    >
                      <img src={item.icon} alt={item.label} className="w-full h-auto rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recently Used Section
          {recentItems.length > 0 && (
            <div className="px-4 py-2">
              <h3 className="text-xs uppercase font-semibold text-gray-400 mb-2">Recently Used</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {recentItems.map(item => (
                  <div key={item.id} className="relative group">
                    <div
                      className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-2 cursor-grab hover:bg-blue-500/20 transition-colors"
                      onClick={() => handleAddToRecent(item)}
                    >
                      <img src={item.icon} alt={item.label} className="w-full h-auto rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 */}
          {/* Content */}
          <main className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <h3 className="uppercase font-semibold mb-3 text-xs text-gray-400 flex items-center">
              {activeTab === 'equity' ? (
                <>
                  <FaLayerGroup className="mr-2" size={12} />
                  Equity Analytics
                </>
              ) : (
                <>
                  <FaBriefcase className="mr-2" size={12} />
                  Portfolio Analytics
                </>
              )}
            </h3>
            {filteredItems.length > 0 ? (
              renderItems(filteredItems)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaSearch size={24} className="mx-auto mb-2" />
                <p>No components found</p>
                <p className="text-xs">Try a different search term</p>
              </div>
            )}
          </main>

          {/* Footer */}
          <footer className="px-4 py-3 text-xs text-gray-400 border-t border-gray-700/50 bg-gray-900/30 flex justify-between items-center">
            <span>© 2025 – <span className="font-semibold">CMDA</span></span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></div>
              System Online
            </span>
          </footer>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default SidebarRight;
