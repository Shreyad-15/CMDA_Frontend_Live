  
// import React, { useEffect, useState } from "react";
// import Plot from "react-plotly.js";

// const IndustryBubble = ({ symbol }) => {
//     const [plotData, setPlotData] = useState([]);
//     const [layout, setLayout] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//     useEffect(() => {
//         if (!symbol) return;

//         setLoading(true);
//         setError(null);

//         fetch(`${API_BASE}/api/stocks/industry_bubble`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ symbol }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log("Fetched Plot Data:", data);

//                 if (data && Array.isArray(data.scatter_data) && data.scatter_data.length > 0) {
//                     const cleanedData = data.scatter_data.map((item) => ({
//                         ...item,
//                         x: typeof item.x === "string" ? item.x.replace(/[\[\]]/g, "").split(",").map(Number) : item.x, // Convert to array of numbers
//                         y: typeof item.y === "string" ? item.y.replace(/[\[\]]/g, "").split(",").map(Number) : item.y,
//                         marker: {
//                             ...item.marker,
//                             size: typeof item.marker.size === "string" ? item.marker.size.replace(/[\[\]]/g, "").split(",").map(Number) : item.marker.size,
//                         },
//                     }));

//                     setPlotData(cleanedData);
//                     setLayout({
//                         autosize: true,
//                         title: data.layout?.title?.text || "Industry Bubble Chart",
//                         xaxis: data.layout?.xaxis || { title: "X Axis" },
//                         yaxis: data.layout?.yaxis || { title: "Y Axis" },
//                     });
//                 } else {
//                     setError("No valid data received.");
//                 }

//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching plot data:", error);
//                 setError("Failed to load plot.");
//                 setLoading(false);
//             });
//     }, [symbol]);

    

//     if (loading) return <span className="loading loading-bars loading-lg"></span>;;
//     if (error) return <p>{error}</p>;

//     return (
//         <Plot
//             data={plotData}
//             layout={layout}
//             style={{ width: "100%", height: "500px" }}
//             useResizeHandler={true}
//         />
//     );
// };

// export default IndustryBubble;

  
// import React, { useEffect, useState } from "react";
// import Plot from "react-plotly.js";

// const IndustryBubble = ({ symbol }) => {
//   const [plotData, setPlotData] = useState([]);    // array of traces
//   const [layout, setLayout] = useState({});       // layout object
//   const [config, setConfig] = useState({});       // <-- NEW: hold backend’s config
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (!symbol) return;

//     setLoading(true);
//     setError(null);

//     fetch(`${API_BASE}/api/stocks/industry_bubble`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched Plot Data:", data);

//         // 1) Pull out data.scatter_data, data.layout, and data.config
//         if (data && Array.isArray(data.scatter_data) && data.scatter_data.length > 0) {
//           // Convert x/y/marker.size from string to array of numbers if needed:
//           const cleanedData = data.scatter_data.map((item) => ({
//             ...item,
//             x:
//               typeof item.x === "string"
//                 ? item.x.replace(/[\[\]]/g, "").split(",").map(Number)
//                 : item.x,
//             y:
//               typeof item.y === "string"
//                 ? item.y.replace(/[\[\]]/g, "").split(",").map(Number)
//                 : item.y,
//             marker: {
//               ...item.marker,
//               size:
//                 typeof item.marker.size === "string"
//                   ? item.marker.size.replace(/[\[\]]/g, "").split(",").map(Number)
//                   : item.marker.size,
//             },
//           }));

//           // 2) Store the cleaned traces in plotData
//           setPlotData(cleanedData);

//           // 3) Build your layout object (you already did this)
//           setLayout({
//             autosize: true,
//             title: data.layout?.title?.text || "Industry Bubble Chart",
//             xaxis: data.layout?.xaxis || { title: "X Axis" },
//             yaxis: data.layout?.yaxis || { title: "Y Axis" },
//           });

//           // 4) Store the backend’s “config” into its own state
//           setConfig(data.config || {});  
//         } else {
//           setError("No valid data received.");
//         }

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching plot data:", error);
//         setError("Failed to load plot.");
//         setLoading(false);
//       });
//   }, [symbol]);

//   if (loading) return <span className="loading loading-bars loading-lg" />;
//   if (error) return <p>{error}</p>;

//   // 5) Pass `config` directly into <Plot>
//   return (
//     <Plot
//       data={plotData}
//       layout={layout}
//       config={config}           // ← “just the config” from state
//       useResizeHandler={true}
//       style={{ width: "100%", height: "500px" }}
//     />
//   );
// };

// export default IndustryBubble;


import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { HashLoader } from "react-spinners";

const IndustryBubble = ({ symbol }) => {
  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
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
    if (!symbol) return;

    const cacheKey = `industry_bubble_${symbol}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      console.log("Using cached data:", cachedData); // Debug cached data
      if (
        Array.isArray(cachedData.scatter_data) &&
        cachedData.scatter_data.length > 0
      ) {
        const cleanedData = cachedData.scatter_data.map((item) => ({
          ...item,
          x:
            typeof item.x === "string"
              ? item.x.replace(/[\[\]]/g, "").split(",").map(Number)
              : item.x,
          y:
            typeof item.y === "string"
              ? item.y.replace(/[\[\]]/g, "").split(",").map(Number)
              : item.y,
          marker: {
            ...item.marker,
            size:
              typeof item.marker.size === "string"
                ? item.marker.size.replace(/[\[\]]/g, "").split(",").map(Number)
                : item.marker.size,
          },
        }));
        setPlotData(cleanedData);
        setLayout({
          autosize: true,
          title: cachedData.layout?.title?.text || "Industry Bubble Chart",
          xaxis: cachedData.layout?.xaxis || { title: "X Axis" },
          yaxis: cachedData.layout?.yaxis || { title: "Y Axis" },
        });
        setConfig(cachedData.config || {});
        setLoading(false);
        setError(null);
      } else {
        setError("Invalid cached data structure.");
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/stocks/test/pe_eps_book_value`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      },
      body: JSON.stringify({ symbol }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Plot Data:", data); // Debug API response
        if (
          data &&
          Array.isArray(data.scatter_data) &&
          data.scatter_data.length > 0
        ) {
          const cleanedData = data.scatter_data.map((item) => ({
            ...item,
            x:
              typeof item.x === "string"
                ? item.x.replace(/[\[\]]/g, "").split(",").map(Number)
                : item.x,
            y:
              typeof item.y === "string"
                ? item.y.replace(/[\[\]]/g, "").split(",").map(Number)
                : item.y,
            marker: {
              ...item.marker,
              size:
                typeof item.marker.size === "string"
                  ? item.marker.size.replace(/[\[\]]/g, "").split(",").map(Number)
                : item.marker.size,
            },
          }));

          setPlotData(cleanedData);
          setLayout({
            autosize: true,
            title: data.layout?.title?.text || "Industry Bubble Chart",
            xaxis: data.layout?.xaxis || { title: "X Axis" },
            yaxis: data.layout?.yaxis || { title: "Y Axis" },
          });
          setConfig(data.config || {});
          setCachedData(cacheKey, data);
          setLoading(false);
          setError(null);
        } else {
          setError("No valid data received from API.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching plot data:", error);
        setError(`Failed to load plot: ${error.message}`);
        setLoading(false);
      });
  }, [symbol]);

  if (loading) return  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <HashLoader color="#0369a1" size={60} />
      <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
        CMDA...
      </p>
    </div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Plot
      data={plotData}
      layout={layout}
      config={config}
      useResizeHandler={true}
      style={{ width: "100%", height: "500px" }}
    />
  );
};

export default IndustryBubble;


