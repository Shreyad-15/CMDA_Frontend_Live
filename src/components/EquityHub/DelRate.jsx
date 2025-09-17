// import React, { useEffect, useState } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const DelRate = ({ symbol }) => {
//   const [gaugeData, setGaugeData] = useState(null);

//   const [loading, setLoading] = useState(true);
//    const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//     const [showComment,setShowComment]=useState(false)
//      const [isSpeaking, setIsSpeaking] = useState(false);
//      const [utterance, setUtterance] = useState(null);

//   // useEffect(() => {
//   //   if (symbol) {
//   //     fetch("http://localhost:8080/api/stocks/delivrey_rate_gauge", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ symbol }),
//   //     })
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error(`HTTP error! status: ${response.status}`);
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((result) => {
//   //         console.log("Gauge Data:", result); // Debugging: Check fetched data
//   //         setGaugeData(result || null);
//   //         setComment(result.comment || "");
//   //       })
//   //       .catch((error) => console.error("Error fetching gauge data:", error))
//   //       .finally(() => setLoading(false));
//   //   }
//   // }, [symbol]); // Fetch data when symbol changes

//   const handlePlayVoice = () => {
//     if (isSpeaking) {
//       // If speaking, stop the speech and store the position
//       speechSynthesis.cancel();
//       setIsSpeaking(false);
//     } else if (plotData && plotData.comment) {
//       // If not speaking, start the speech from the last position or from the start
//       const newUtterance = new SpeechSynthesisUtterance(plotData.comment);
//       newUtterance.onstart = () => setIsSpeaking(true);
//       newUtterance.onend = () => setIsSpeaking(false);
//       newUtterance.onboundary = (event) => {
//         if (event.name === "word") {
//           // Store the position in words
//           setSpeechPosition(event.charIndex);
//         }
//       };

//       // If we already have a speech position, start from there
//       if (speechPosition > 0) {
//         newUtterance.text = plotData.comment.substring(speechPosition);
//       }

//       speechSynthesis.speak(newUtterance);
//       setUtterance(newUtterance); // Store the utterance for future control
//     }
//   };
//   useEffect(() => {
//     if (symbol) {
//       fetch(`${API_BASE}/api/stocks/delivrey_rate_gauge`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ symbol }),
//       })
//         .then((response) => response.json())
//         .then((result) => {
//           console.log("Full Gauge Data:", result); // Debugging: Check full JSON response
//           console.log("Annotations:", result.layout.annotations); // Check if annotations exist
//           setGaugeData(result || null);
//           setComment(result.comment || "");
//         })
//         .catch((error) => console.error("Error fetching gauge data:", error))
//         .finally(() => setLoading(false));
//     }
//   }, [symbol]);



//   if (!gaugeData) return <span className="loading loading-bars loading-lg"></span>;

//   const { avg_delivery_rate_1Y, avg_delivery_rate_Xperiod } = gaugeData;

//   return (
//     <div>
//       <h3>Market Mood: Delivery Trends & Trading Sentiment</h3>
//       <Plot
//         data={[
//           {
//             type: "indicator",
//             mode: "gauge+number",
//             value: avg_delivery_rate_Xperiod,
//             title: { text: "Delivery Rate", font: { size: 24 } },
//             gauge: {
//               axis: { range: [0, 100], tickwidth: 1, tickcolor: "darkblue" },
//               bar: { color: avg_delivery_rate_Xperiod > avg_delivery_rate_1Y ? "green" : "red" },
//               steps: [
//                 { range: [0, 50], color: "lightgray" },
//                 { range: [50, 100], color: "gray" },
//               ],
//               threshold: {
//                 line: { color: "black", width: 4 },
//                 thickness: 0.75,
//                 value: avg_delivery_rate_1Y,
//               },
//             },
//           },
//         ]}
//         layout={{
//           // ...layout,
//            autosize: true,
//         responsive: true,
//         margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//          useResizeHandler={true}
//       style={{ width: '100%', height: '100%' }}
//       config={{ responsive: true }}
//       />
//       <div className="bg-gray-200 p-4 dark:bg-slate-500 dark:text-white">
//              {/* Button container with background */}
//              <div className="bg-white flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md dark:bg-slate-800 dark:text-white">
//                <button
//                  className="px-6 text-xl font-bold"
//                  onClick={() => setShowComment(!showComment)}
//                >
//                  {showComment ? 'Hide info' : <RiInformation2Fill />}
//                </button>

//                <button
//                  className="text-xl font-bold"
//                  onClick={handlePlayVoice}
//                  disabled={isSpeaking && !speechSynthesis.speaking}
//                >
//                  {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//                </button>
//              </div>

//              {/* Comments section */}
//              {showComment && (
//                <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
//                  <p className="text-l font-bold">{plotData.comment}</p>
//                </div>
//              )}
//            </div>
//     </div>
//   );
// };

// export default DelRate;



// import React, { useEffect, useState } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const DelRate = ({ symbol }) => {
//   const [gaugeData, setGaugeData] = useState(null);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showComment, setShowComment] = useState(false);
//   // const [isSpeaking, setIsSpeaking] = useState(false);
//   // const [utterance, setUtterance] = useState(null);
//   // const [speechPosition, setSpeechPosition] = useState(0);

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (symbol) {
//       fetch(`${API_BASE}/api/stocks/delivrey_rate_gauge`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symbol }),
//       })
//         .then((res) => res.json())
//         .then((result) => {
//           setGaugeData(result || null);
//           setComment(result.comment || "");
//         })
//         .catch((err) => console.error("Error fetching gauge data:", err))
//         .finally(() => setLoading(false));
//     }
//   }, [symbol]);

//   // const handlePlayVoice = () => {
//   //   if (isSpeaking) {
//   //     speechSynthesis.cancel();
//   //     setIsSpeaking(false);
//   //   } else if (comment) {
//   //     const newUtterance = new SpeechSynthesisUtterance(comment.substring(speechPosition));
//   //     newUtterance.onstart = () => setIsSpeaking(true);
//   //     newUtterance.onend = () => {
//   //       setIsSpeaking(false);
//   //       setSpeechPosition(0);
//   //     };
//   //     newUtterance.onboundary = (event) => {
//   //       if (event.name === "word") {
//   //         setSpeechPosition(event.charIndex);
//   //       }
//   //     };
//   //     speechSynthesis.speak(newUtterance);
//   //     setUtterance(newUtterance);
//   //   }
//   // };

//   if (loading) return <span className="loading loading-bars loading-lg"></span>;
//   if (!gaugeData) return <p>No gauge data available.</p>;

//   const { avg_delivery_rate_1Y, avg_delivery_rate_Xperiod,config } = gaugeData;

//   const layout = {
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   };

//   return (
//     <div className="space-y-6">
//       <h3 className="text-lg font-semibold">Market Mood: Delivery Trends & Trading Sentiment</h3>

//       <Plot
//         data={[
//           {
//             type: "indicator",
//             mode: "gauge+number",
//             value: avg_delivery_rate_Xperiod,
//             title: { text: "Delivery Rate", font: { size: 24 } },
//             gauge: {
//               axis: { range: [0, 100], tickwidth: 1, tickcolor: "darkblue" },
//               bar: {
//                 color: avg_delivery_rate_Xperiod > avg_delivery_rate_1Y ? "green" : "red",
//               },
//               steps: [
//                 { range: [0, 50], color: "lightgray" },
//                 { range: [50, 100], color: "gray" },
//               ],
//               threshold: {
//                 line: { color: "black", width: 4 },
//                 thickness: 0.75,
//                 value: avg_delivery_rate_1Y,
//               },
//             },
//           },
//         ]}
//         layout={layout}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//         config={{
//     responsive: true,
//     ...(config || {})  // Merge backend config safely
//   }}
//       />

//       <div className="bg-gray-200 p-4 dark:bg-slate-500 dark:text-white">
//         <div className="bg-white dark:bg-slate-800 flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md">
//           <button className="px-6 text-xl font-bold" onClick={() => setShowComment(!showComment)}>
//             {showComment ? "Hide info" : <RiInformation2Fill />}
//           </button>
//           {/* <button
//             className="text-xl font-bold"
//             onClick={handlePlayVoice}
//             disabled={isSpeaking && !speechSynthesis.speaking}
//           >
//             {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//           </button> */}
//         </div>

//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
//             <p className="text-l font-bold">{comment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DelRate;


import React, { useEffect, useState } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
import Plot from "react-plotly.js";
import { HashLoader } from "react-spinners";

const DelRate = ({ symbol }) => {
  const [gaugeData, setGaugeData] = useState(null);

  
  const [loading, setLoading] = useState(true);
  
  
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

    const cacheKey = `delivrey_rate_${symbol}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setGaugeData(cachedData);
      
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/stocks/test/market_mood`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ symbol }),
    })
      .then((res) => res.json())
      .then((result) => {
        setGaugeData(result || null);
        
        setCachedData(cacheKey, result);
      })
      .catch((err) => console.error("Error fetching gauge data:", err))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) return <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
    <HashLoader color="#0369a1" size={60} />
    <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
      CMDA...
    </p>
  </div>;
  if (!gaugeData) return <p>No gauge data available.</p>;

  const { avg_delivery_rate_1Y, avg_delivery_rate_Xperiod, config } = gaugeData;

  const layout = {
    autosize: true,
    responsive: true,
    margin: { t: 50, l: 50, r: 30, b: 50 },
  };

  return (
    <div className="space-y-6">
      {/* <h3 className="text-lg font-semibold">Market Mood: Delivery Trends & Trading Sentiment</h3> */}
      <Plot
        data={[
          {
            type: "indicator",
            mode: "gauge+number",
            value: avg_delivery_rate_Xperiod,
            title: { text: "Delivery Rate", font: { size: 24 } },
            gauge: {
              axis: { range: [0, 100], tickwidth: 1, tickcolor: "darkblue" },
              bar: {
                color: avg_delivery_rate_Xperiod > avg_delivery_rate_1Y ? "green" : "red",
              },
              steps: [
                { range: [0, 50], color: "lightgray" },
                { range: [50, 100], color: "gray" },
              ],
              threshold: {
                line: { color: "black", width: 4 },
                thickness: 0.75,
                value: avg_delivery_rate_1Y,
              },
            },
          },
        ]}
        layout={layout}
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

export default DelRate;