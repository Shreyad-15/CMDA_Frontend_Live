// import React, { useState, useEffect } from "react";
// import { RiInformation2Fill } from "react-icons/ri";
// import Plot from "react-plotly.js";

// const LastTraded = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//    const [showComment, setShowComment] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;


//   useEffect(() => {
//   if (!symbol) return;

//   fetch(`${API_BASE}/api/stocks/last_traded_price`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ symbol }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Received plotData:", data);
//       setPlotData(data);
//     })
//     .catch((error) => {
//       console.error("Error fetching plot data:", error);
//     });
// }, [symbol]);


//   if (!plotData || !plotData.figure || !plotData.figure.data) {
//   return <span className="loading loading-bars loading-lg"></span>;
// }

//   return (
//     <div className="relative mb-3">
//       <Plot
//         data={plotData.figure.data}
//         layout={{
//   ...plotData.figure.layout,
//   autosize: true,
//   responsive: true,
//   margin: { t: 50, l: 50, r: 30, b: 50 },
//   font: { family: "Arial", size: 12, color: "black" },
//   xaxis: {
//     ...plotData.figure.layout?.xaxis,
//     title: { text: "", font: { size: 14 } },
//     tickfont: { size: 17 },
//   },
//   yaxis: {
//     ...plotData.figure.layout?.yaxis,
//     title: { text: "Traded Price", font: { size: 14 } },
//     tickfont: { size: 17 },
//   },
//   showlegend: true,
// }}

//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//         config={plotData.config}
//       />

//       <div className="bg-gray-200 p-4 dark:bg-slate-500 dark:text-white">
//         <div className="bg-white flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md dark:bg-slate-800 dark:text-white">
//           <button
//             className="px-6 text-xl font-bold"
//             onClick={() => setShowComment(!showComment)}
//           >
//             {showComment ? "Hide info" : <RiInformation2Fill />}
//           </button>

          
//         </div>

//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
//             <p
//               className="text-l font-bold"
//               dangerouslySetInnerHTML={{ __html: plotData.comment }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LastTraded;


import React, { useState, useEffect } from "react";
// import { RiInformation2Fill } from "react-icons/ri";
import Plot from "react-plotly.js";
import { HashLoader } from "react-spinners";

const LastTraded = ({ symbol }) => {
  const [plotData, setPlotData] = useState(null);
  // const [showComment, setShowComment] = useState(false);
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
    if (!symbol) return;

    const cacheKey = `last_traded_${symbol}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setPlotData(cachedData);
      return;
    }

    fetch(`${API_BASE}/stocks/test/box_plot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ symbol }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received plotData:", data);
        setPlotData(data);
        setCachedData(cacheKey, data);
      })
      .catch((error) => {
        console.error("Error fetching plot data:", error);
      });
  }, [symbol]);

  if (!plotData || !plotData.figure || !plotData.figure.data) {
    return  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <HashLoader color="#0369a1" size={60} />
      <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
        CMDA...
      </p>
    </div>;
  }

  return (
    <div className="relative mb-3">
      <Plot
        data={plotData.figure.data}
        layout={{
          ...plotData.figure.layout,
          autosize: true,
          responsive: true,
          margin: { t: 50, l: 50, r: 30, b: 50 },
          font: { family: "Arial", size: 12, color: "black" },
          xaxis: {
            ...plotData.figure.layout?.xaxis,
            title: { text: "", font: { size: 14 } },
            tickfont: { size: 17 },
          },
          yaxis: {
            ...plotData.figure.layout?.yaxis,
            title: { text: "Traded Price", font: { size: 14 } },
            tickfont: { size: 17 },
          },
          showlegend: true,
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={plotData.config}
      />
     
    </div>
  );
};

export default LastTraded;