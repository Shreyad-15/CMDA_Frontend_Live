// import React, { useState, useEffect } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null); // Store the plot data
//   const [isSpeaking, setIsSpeaking] = useState(false); // Handle speech synthesis state
//     const [utterance, setUtterance] = useState(null); // Store the utterance object
//     const [speechPosition, setSpeechPosition] = useState(0); 
//     const [showComment,setShowComment]=useState(false)
//     const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
   

//   useEffect(() => {
//       if (symbol) {
//         fetch(`${API_BASE}/api/stocks/candle_breach`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ symbol }),
//         })
//           .then((response) => response.json())
//           .then((data) => setPlotData(data)) // Access the figure key from the response
//           .catch((error) => console.error("Error fetching plot data:", error));
//       }
//     }, [symbol]);

 
//     const handlePlayVoice = () => {
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

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg"></span>;
//   }
  
//   const { figure, comment } = plotData; // Destructure correctly
  
//   return (
//     <div>
//       <h2 className="text-2xl text-center font-bold mb-3">Candle Breach Analysis</h2>
//       <Plot className='m-10'data={figure.data}
//         layout={{
//           // ...layout,
//            autosize: true,
//         responsive: true,

//         margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//          useResizeHandler={true}
//       style={{ width: '100%', height: '100%' }}
//       config={{ responsive: true }}
//         />
//       <div className="bg-slate-100 flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md  dark:bg-slate-800 dark:text-white">
//           <button
//             className="px-6 text-xl font-bold"
//             onClick={() => setShowComment(!showComment)}
//           >
//             {showComment ? 'Hide info' : <RiInformation2Fill />}
//           </button>
      
//           <button
//             className="text-xl font-bold"
//             onClick={handlePlayVoice}
//             disabled={isSpeaking && !speechSynthesis.speaking}
//           >
//             {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//           </button>
//         </div>
      
//         {/* Comments section */}
//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100  dark:bg-slate-800 dark:text-white">
//             <p className="text-l font-bold">{plotData.comment}</p>
//           </div>
//         )}
//     </div>
//   );
// }  

// export default CandleBreach;


// import React, { useState, useEffect } from "react";
// // import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// // import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//   const [comment, setComment] = useState("");
//   // const [isSpeaking, setIsSpeaking] = useState(false);
//   // const [utterance, setUtterance] = useState(null);
//   // const [speechPosition, setSpeechPosition] = useState(0);
//   const [showComment, setShowComment] = useState(false);

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (symbol) {
//       fetch(`${API_BASE}/api/stocks/candle_breach`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symbol }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPlotData(data.figure);
//           setComment(data.comment || "");
//         })
//         .catch((err) => console.error("Error fetching plot data:", err));
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

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg"></span>;
//   }

//   const layout = {
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   };
  
//   return (
//     <div className="space-y-6">
//       {/* <h2 className="text-2xl text-center font-bold">Candle Breach Analysis</h2> */}

//     <Plot
//   data={plotData.data}
//   layout={{
//     ...layout,
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   }}
//   useResizeHandler={true}
//   style={{ width: '100%', height: '100%' }}
//   // config={{
//   //   responsive: true,
//   //   ...(config || {})  // Merge backend config safely
//   // }}
// />


//       <div className="bg-gray-200 p-4  dark:bg-slate-500 dark:text-white">
//         {/* Button container with background */}
//         <div className="bg-white flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md  dark:bg-slate-800 dark:text-white">
//           <button
//             className="px-6 text-xl font-bold"
//             onClick={() => setShowComment(!showComment)}
//           >
//             {showComment ? 'Hide info' : <RiInformation2Fill />}
//           </button>
      
//           {/* <button
//             className="text-xl font-bold"
//             onClick={handlePlayVoice}
//             disabled={isSpeaking && !speechSynthesis.speaking}
//           >
//             {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//           </button> */}
//         </div>
      
//         {/* Comments section */}
//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100  dark:bg-slate-800 dark:text-white">
//             <p className="text-l font-bold">{plotData.comment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandleBreach;




// import React, { useState, useEffect } from "react";
// import { RiInformation2Fill } from "react-icons/ri";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//   const [comment, setComment] = useState("");
//   const [config, setConfig] = useState({});       // ← 1) New state for config
//   const [showComment, setShowComment] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (!symbol) return;

//     fetch(`${API_BASE}/api/stocks/candle_breach`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // data.figure is your Plotly JSON (with .data and .layout inside)
//         // data.comment is the text you want to show
//         // data.config is the Plotly config object from the backend

//         setPlotData(data.figure);
//         setComment(data.comment || "");

//         // ← 2) Pull out the config that backend returned
//         setConfig(data.config || {});
//       })
//       .catch((err) => console.error("Error fetching plot data:", err));
//   }, [symbol]);

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg" />;
//   }

//   const layout = {
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   };

//   return (
//     <div className="space-y-6">
//       <Plot
//         data={plotData.data}
//         layout={{
//           ...layout,
//           autosize: true,
//           responsive: true,
//           margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//         config={config}    
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
//             <p className="text-l font-bold">{comment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandleBreach;


// import React, { useState, useEffect } from "react";
// import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null); // Store the plot data
//   const [isSpeaking, setIsSpeaking] = useState(false); // Handle speech synthesis state
//     const [utterance, setUtterance] = useState(null); // Store the utterance object
//     const [speechPosition, setSpeechPosition] = useState(0); 
//     const [showComment,setShowComment]=useState(false)
//     const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
   

//   useEffect(() => {
//       if (symbol) {
//         fetch(`${API_BASE}/api/stocks/candle_breach`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ symbol }),
//         })
//           .then((response) => response.json())
//           .then((data) => setPlotData(data)) // Access the figure key from the response
//           .catch((error) => console.error("Error fetching plot data:", error));
//       }
//     }, [symbol]);

 
//     const handlePlayVoice = () => {
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

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg"></span>;
//   }
  
//   const { figure, comment } = plotData; // Destructure correctly
  
//   return (
//     <div>
//       <h2 className="text-2xl text-center font-bold mb-3">Candle Breach Analysis</h2>
//       <Plot className='m-10'data={figure.data}
//         layout={{
//           // ...layout,
//            autosize: true,
//         responsive: true,

//         margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//          useResizeHandler={true}
//       style={{ width: '100%', height: '100%' }}
//       config={{ responsive: true }}
//         />
//       <div className="bg-slate-100 flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md  dark:bg-slate-800 dark:text-white">
//           <button
//             className="px-6 text-xl font-bold"
//             onClick={() => setShowComment(!showComment)}
//           >
//             {showComment ? 'Hide info' : <RiInformation2Fill />}
//           </button>
      
//           <button
//             className="text-xl font-bold"
//             onClick={handlePlayVoice}
//             disabled={isSpeaking && !speechSynthesis.speaking}
//           >
//             {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//           </button>
//         </div>
      
//         {/* Comments section */}
//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100  dark:bg-slate-800 dark:text-white">
//             <p className="text-l font-bold">{plotData.comment}</p>
//           </div>
//         )}
//     </div>
//   );
// }  

// export default CandleBreach;


// import React, { useState, useEffect } from "react";
// // import { IoIosPlay } from "react-icons/io";
// import { RiInformation2Fill } from "react-icons/ri";
// // import { TbPlayerPauseFilled } from "react-icons/tb";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//   const [comment, setComment] = useState("");
//   // const [isSpeaking, setIsSpeaking] = useState(false);
//   // const [utterance, setUtterance] = useState(null);
//   // const [speechPosition, setSpeechPosition] = useState(0);
//   const [showComment, setShowComment] = useState(false);

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (symbol) {
//       fetch(`${API_BASE}/api/stocks/candle_breach`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symbol }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPlotData(data.figure);
//           setComment(data.comment || "");
//         })
//         .catch((err) => console.error("Error fetching plot data:", err));
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

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg"></span>;
//   }

//   const layout = {
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   };
  
//   return (
//     <div className="space-y-6">
//       {/* <h2 className="text-2xl text-center font-bold">Candle Breach Analysis</h2> */}

//     <Plot
//   data={plotData.data}
//   layout={{
//     ...layout,
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   }}
//   useResizeHandler={true}
//   style={{ width: '100%', height: '100%' }}
//   // config={{
//   //   responsive: true,
//   //   ...(config || {})  // Merge backend config safely
//   // }}
// />


//       <div className="bg-gray-200 p-4  dark:bg-slate-500 dark:text-white">
//         {/* Button container with background */}
//         <div className="bg-white flex justify-center items-center space-x-4 p-3 rounded-lg shadow-md  dark:bg-slate-800 dark:text-white">
//           <button
//             className="px-6 text-xl font-bold"
//             onClick={() => setShowComment(!showComment)}
//           >
//             {showComment ? 'Hide info' : <RiInformation2Fill />}
//           </button>
      
//           {/* <button
//             className="text-xl font-bold"
//             onClick={handlePlayVoice}
//             disabled={isSpeaking && !speechSynthesis.speaking}
//           >
//             {isSpeaking ? <TbPlayerPauseFilled /> : <IoIosPlay />}
//           </button> */}
//         </div>
      
//         {/* Comments section */}
//         {showComment && (
//           <div className="flex justify-center items-center mt-4 p-4 border rounded bg-gray-100  dark:bg-slate-800 dark:text-white">
//             <p className="text-l font-bold">{plotData.comment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandleBreach;




// import React, { useState, useEffect } from "react";
// import { RiInformation2Fill } from "react-icons/ri";
// import Plot from "react-plotly.js";

// const CandleBreach = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//   const [comment, setComment] = useState("");
//   const [config, setConfig] = useState({});       // ← 1) New state for config
//   const [showComment, setShowComment] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     if (!symbol) return;

//     fetch(`${API_BASE}/api/stocks/candle_breach`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ symbol }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // data.figure is your Plotly JSON (with .data and .layout inside)
//         // data.comment is the text you want to show
//         // data.config is the Plotly config object from the backend

//         setPlotData(data.figure);
//         setComment(data.comment || "");

//         // ← 2) Pull out the config that backend returned
//         setConfig(data.config || {});
//       })
//       .catch((err) => console.error("Error fetching plot data:", err));
//   }, [symbol]);

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg" />;
//   }

//   const layout = {
//     autosize: true,
//     responsive: true,
//     margin: { t: 50, l: 50, r: 30, b: 50 },
//   };

//   return (
//     <div className="space-y-6">
//       <Plot
//         data={plotData.data}
//         layout={{
//           ...layout,
//           autosize: true,
//           responsive: true,
//           margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//         config={config}    
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
//             <p className="text-l font-bold">{comment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandleBreach;


import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const CandleBreach = ({ symbol }) => {
  const [plotData, setPlotData] = useState(null);
  const [comment, setComment] = useState("");
  const [config, setConfig] = useState({});
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

    const cacheKey = `candle_breach_${symbol}`;
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      setPlotData(cachedData.figure);
      setComment(cachedData.comment || "");
      setConfig(cachedData.config || {});
      return;
    }

    fetch(`${API_BASE}/stocks/test/breach_busters`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ symbol }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPlotData(data.figure);
        setComment(data.comment || "");
        setConfig(data.config || {});
        setCachedData(cacheKey, data);
      })
      .catch((err) => console.error("Error fetching plot data:", err));
  }, [symbol]);

  if (!plotData) {
    return <span className="loading loading-bars loading-lg" />;
  }

  const layout = {
    autosize: true,
    responsive: true,
    margin: { t: 50, l: 50, r: 30, b: 50 },
  };

//   return (
//     <div className="space-y-6">
//       <Plot
//         data={plotData.data}
//         layout={{
//           ...layout,
//           autosize: true,
//           responsive: true,
//           margin: { t: 50, l: 50, r: 30, b: 50 },
//         }}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//         config={config}
//       />
    
//     </div>
//   );
// };

   return (
        <div className="space-y-6">
        <Plot
            data={plotData.data}
            layout={{
            ...(plotData.layout || {}),
            autosize: true,
            responsive: true,
            margin: { t: 100, l: 50, r: 30, b: 50 },
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{
            responsive: true,
            ...(config || {}),
            }}
        />

        </div>
    );
};

export default CandleBreach;