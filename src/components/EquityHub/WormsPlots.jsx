import React, { useState, useEffect } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
import Plot from "react-plotly.js";
import { HashLoader } from "react-spinners";

const WormsPlots = ({ symbol }) => {
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

    const cacheKey = `worm_plot_${symbol}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setPlotData(cachedData);
      return;
    }

    fetch(`${API_BASE}/stocks/test/trend_tapestry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ symbol }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlotData(data);
        setCachedData(cacheKey, data);
      })
      .catch((error) => console.error("Error fetching plot data:", error));
  }, [symbol]);

  if (!plotData) {
    return  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <HashLoader color="#0369a1" size={60} />
      <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
        SMDA...
      </p>
    </div>;
  }

  const { scatter_data, layout, config } = plotData;

  return (
    <div>
      <Plot
        data={scatter_data}
        layout={{
          ...layout,
          autosize: true,
          responsive: true,
          margin: { t: 50, l: 50, r: 30, b: 50 },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
        config={{
          responsive: true,
          ...(config || {})
        }}
      />
     
    </div>
  );
};

export default WormsPlots;