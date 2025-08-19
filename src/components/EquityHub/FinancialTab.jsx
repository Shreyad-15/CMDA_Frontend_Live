// import React, { useState } from "react";
// import FinanceOverview from "./FinanceOverview";
// import IncomeState from "./IncomeState";
// import BalanceSheet from "./BalanceSheet";
// import CashFlowState from "./CashFlowState";
// import FinancialRatios from "./FinancialRatios";

// const subTabs = [
//   { key: "overview", label: "Overview" },
//   { key: "income", label: "Income Statement" },
//   { key: "balance", label: "Balance Sheet" },
//   { key: "cashflow", label: "Cash Flow" },
//   { key: "ratios", label: "Financial Ratios" },
// ];

// const mainTabs = [
//   { key: "standalone", label: "Standalone" },
//   { key: "consolidated", label: "Consolidated" },
// ];

// const FinancialTabs = ({ symbol }) => {
//   const [mainTab, setMainTab] = useState("standalone");
//   const [activeSubTab, setActiveSubTab] = useState("overview");

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const renderTabContent = () => {
//     const commonProps = { symbol, API_BASE, mainTab };

//     switch (activeSubTab) {
//       case "overview":
//         return <FinanceOverview {...commonProps} />;
//       case "income":
//         return <IncomeState {...commonProps} />;
//       case "balance":
//         return <BalanceSheet {...commonProps} />;
//       case "cashflow":
//         return <CashFlowState {...commonProps} />;
//       case "ratios":
//         return <FinancialRatios {...commonProps} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Financial Data</h2>

//       {/* Main Tabs */}
//       <div style={styles.mainTabContainer}>
//         {mainTabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => {
//               setMainTab(tab.key);
//               setActiveSubTab("overview"); // Reset sub-tab when switching
//             }}
//             style={{
//               ...styles.mainTabButton,
//               ...(mainTab === tab.key ? styles.activeMainTab : {}),
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Sub Tabs */}
//       <div style={styles.tabContainer}>
//         {subTabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveSubTab(tab.key)}
//             style={{
//               ...styles.tabButton,
//               ...(activeSubTab === tab.key ? styles.activeTab : {}),
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div style={{ marginTop: "30px" }}>
//         {renderTabContent()}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   mainTabContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     marginBottom: "20px",
//   },
//   mainTabButton: {
//     padding: "10px 25px",
//     fontSize: "15px",
//     border: "1px solid #ccc",
//     backgroundColor: "#f8f8f8",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   activeMainTab: {
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontWeight: "bold",
//     borderColor: "#007bff",
//   },
//   tabContainer: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "10px",
//     borderBottom: "2px solid #ddd",
//     paddingBottom: "10px",
//   },
//   tabButton: {
//     padding: "8px 20px",
//     fontSize: "14px",
//     border: "none",
//     backgroundColor: "transparent",
//     borderBottom: "2px solid transparent",
//     cursor: "pointer",
//   },
//   activeTab: {
//     borderBottom: "2px solid #007bff",
//     fontWeight: "bold",
//     color: "#007bff",
//   },
// };

// export default FinancialTabs;



import React, { useState, useMemo } from "react";
import FinanceOverview from "./FinanceOverview";
import IncomeState from "./IncomeState";
import BalanceSheet from "./BalanceSheet";
import CashFlowState from "./CashFlowState";
import FinancialRatios from "./FinancialRatios";

const subTabs = [
  { key: "overview", label: "Overview" },
  { key: "income", label: "Income Statement" },
  { key: "balance", label: "Balance Sheet" },
  { key: "cashflow", label: "Cash Flow" },
  { key: "ratios", label: "Financial Ratios" },
];

const mainTabs = [
  { key: "standalone", label: "Standalone" },
  { key: "consolidated", label: "Consolidated" },
];

const FinancialTab = ({ symbol }) => {
  const [mainTab, setMainTab] = useState("standalone");
  const [activeSubTab, setActiveSubTab] = useState("overview");

  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  const renderTabContent = useMemo(() => {
    const commonProps = { symbol, API_BASE, mainTab };

    switch (activeSubTab) {
      case "overview":
        return <FinanceOverview {...commonProps} />;
      case "income":
        return <IncomeState {...commonProps} />;
      case "balance":
        return <BalanceSheet {...commonProps} />;
      case "cashflow":
        return <CashFlowState {...commonProps} />;
      case "ratios":
        return <FinancialRatios {...commonProps} />;
      default:
        return null;
    }
  }, [activeSubTab, symbol, API_BASE, mainTab]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Main Tabs */}
      <div
        className="flex justify-center gap-4 mb-6 flex-wrap"
        role="tablist"
        aria-label="Financial Data Tabs"
      >
        {mainTabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={mainTab === tab.key}
            onClick={() => {
              setMainTab(tab.key);
              setActiveSubTab("overview");
            }}
            className={`px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 shadow-sm
              ${
                mainTab === tab.key
                  ? "bg-gradient-to-r from-sky-700 to-cyan-800 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div
        className="flex justify-center gap-3 mb-8 border-b border-gray-200 dark:border-slate-700 flex-wrap overflow-x-auto"
        role="tablist"
        aria-label="Financial Sub Tabs"
      >
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeSubTab === tab.key}
            onClick={() => setActiveSubTab(tab.key)}
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300
              ${
                activeSubTab === tab.key
                  ? "text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-600 dark:border-cyan-400"
                  : "text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400"
              }`}
          >
            {tab.label}
            {activeSubTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-slide-in"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className="p-6 rounded-xl shadow-md bg-white dark:bg-slate-800 transition-all duration-300 animate-fade-in"
        role="tabpanel"
      >
        {renderTabContent}
      </div>
    </div>
  );
};

export default FinancialTab;
