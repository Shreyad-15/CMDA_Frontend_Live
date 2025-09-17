
// import React, { useEffect, useState, useMemo } from "react";
// import Plot from "react-plotly.js";
// import { HashLoader } from "react-spinners";

// const CandleSpread = ({ symbol }) => {
//   const [payload, setPayload] = useState(null);
//   const [error, setError] = useState(null);
//   const [mode, setMode] = useState("OC"); 
 

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Fetch plot data
//   useEffect(() => {
//     if (!symbol ) return;
//     fetch(`${API_BASE}/stocks/test/candle_chronicle`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         symbol: symbol.toLowerCase(), // Ensure lowercase for consistency
//         companyName:symbol,
//         fig_type: mode, // Use mode as fig_type
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(HTTP `${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (data.status !== "success") throw new Error(data.message || "Failed to fetch plot");
//         setPayload(data.data); // Store data.figure directly
//         setError(null);
//       })
//       .catch((err) => {
//         console.error("Error fetching plot data:", err);
//         setError(err.message);
//       });
//   }, [symbol,mode, API_BASE]);

 

//   // Get the figure and decode base64 data if needed
//   const selectedFig = useMemo(() => {
//     if (!payload?.figure) return null;
//     const figure = { ...payload.figure };

//     // Decode base64 data if present
//     figure.data = figure.data.map((trace) => {
//       if (trace.x?.bdata) {
//         try {
//           const decoded = atob(trace.x.bdata); // Decode base64
//           const array = new Float64Array(
//             new Uint8Array(decoded.split("").map((c) => c.charCodeAt(0))).buffer
//           );
//           return { ...trace, x: Array.from(array) }; // Convert to array
//         } catch (e) {
//           console.error("Error decoding base64 data:", e);
//           return trace;
//         }
//       }
//       return trace;
//     });

//     return figure;
//   }, [payload]);

 

//   if (error) {
//     return <div className="text-red-500 text-center">Error: {error}</div>;
//   }
//   if (!payload || !selectedFig) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
//         <HashLoader color="#0369a1" size={60} />
//         <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
//           CMDA...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="relative mb-3">
      
//       <div className="flex space-x-4 mb-4">
//         <select
//           value={mode}
//           onChange={(e) => {
//             setMode(e.target.value);
         
//           }}
//           className="p-2 border rounded"
//         >
//           <option value="OC">Open-Close (OC)</option>
//           <option value="HL">High-Low (HL)</option>
//         </select>

        
//       </div>

//       {/* Plotly component */}
//       <Plot
//         data={selectedFig.data}
//         layout={{ ...selectedFig.layout, autosize: true }}
//         // config={payload.config || {}}
//          config={{
//           displaylogo: false, // Remove Plotly logo
//           responsive: true, // Ensure chart adapts to container
//           displayModeBar: false, // Optional: Show toolbar
//         }}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//       />

      
//     </div>
//   );
// };

// export default CandleSpread;


import React, { useEffect, useState, useMemo } from "react";
import Plot from "react-plotly.js";
// import { RiInformation2Fill } from "react-icons/ri";
import { HashLoader } from "react-spinners";

const CandleSpread = ({ symbol }) => {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("OC"); 


  const API_BASE = import.meta.env.VITE_URL;

  // Fetch plot data
  useEffect(() => {
    if (!symbol ) return;
    fetch(`${API_BASE}/stocks/test/candle_chronicle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symbol: symbol.toLowerCase(), // Ensure lowercase for consistency
        companyName:symbol,
        fig_type: mode, // Use mode as fig_type
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status !== "success") throw new Error(data.message || "Failed to fetch plot");
        setPayload(data.data); // Store data.figure directly
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching plot data:", err);
        setError(err.message);
      });
  }, [symbol,mode, API_BASE]);

  const selectedFig = useMemo(() => {
    if (!payload?.figure) return null;
    const figure = { ...payload.figure };

    // Decode base64 data if present
    figure.data = figure.data.map((trace) => {
      if (trace.x?.bdata) {
        try {
          const decoded = atob(trace.x.bdata); // Decode base64
          const array = new Float64Array(
            new Uint8Array(decoded.split("").map((c) => c.charCodeAt(0))).buffer
          );
          return { ...trace, x: Array.from(array) }; // Convert to array
        } catch (e) {
          console.error("Error decoding base64 data:", e);
          return trace;
        }
      }
      return trace;
    });

    return figure;
  }, [payload]);

  
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }
  if (!payload || !selectedFig) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
        <HashLoader color="#0369a1" size={60} />
        <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
          CMDA...
        </p>
      </div>
    );
  }

  return (
    <div className="relative mb-3">
      {/* Controls: Mode & Period selectors */}
      <div className="flex space-x-4 mb-4">
        <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            
          }}
          className="p-2 border rounded"
        >
          <option value="OC">Open-Close (OC)</option>
          <option value="HL">High-Low (HL)</option>
        </select>

      
      </div>

      {/* Plotly component 
      <Plot
        data={selectedFig.data}
        layout={{ ...selectedFig.layout, autosize: true }}
        config={payload.config || {}}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
*/}

          <Plot
            data={selectedFig.data}
            layout={{
              ...selectedFig.layout,
              autosize: true,
              margin: { t: 20, l: 20, r: 20, b: 20 }, // optional, improve responsiveness
            }}
            config={{
              displaylogo: false,
              responsive: true,
              ...payload.config,
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />

     
    </div>
  );
};

export default CandleSpread;