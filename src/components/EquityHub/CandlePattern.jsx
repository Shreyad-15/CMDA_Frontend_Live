// import React, { useState, useEffect } from "react";
// import Plot from "react-plotly.js";

// const CandlePattern = ({ symbol }) => {
//   const [plotData, setPlotData] = useState(null);
//   const [comment, setComment] = useState("");
//   const [config, setConfig] = useState({});
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const CACHE_TTL = 60 * 60 * 1000; // 1 hour

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
//     if (!symbol) return;

//     const cacheKey = `candle_pattern_${symbol}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       setPlotData(cachedData.figure);
//       setComment(cachedData.comment || "");
//       setConfig(cachedData.config || {});
//       return;
//     }

//     fetch(`${API_BASE}/candle-patterns`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${localStorage.getItem("authToken")}`, // if needed
//       },
//       body: JSON.stringify({ symbol }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setPlotData(data);
//         setComment(data.comment || "");
//         setConfig(data.config || {});
//         setCachedData(cacheKey, { figure: data, comment: data.comment, config: data.config });
//       })
//       .catch((err) => console.error("Error fetching candle pattern data:", err));
//   }, [symbol]);

//   if (!plotData) {
//     return <span className="loading loading-bars loading-lg" />;
//   }

//   const layout = {
//     ...plotData.layout,
//     autosize: true,
//     responsive: true,
//     margin: { t: 60, l: 50, r: 200, b: 50 },
//   };

//   return (
//     <div className="space-y-6">
//       <Plot
//         data={plotData.data}
//         layout={layout}
//         config={config}
//         useResizeHandler={true}
//         style={{ width: "100%", height: "100%" }}
//       />
//       {comment && <div className="text-gray-700 mt-2">{comment}</div>}
//     </div>
//   );
// };

// export default CandlePattern;

// --------------wc--------------------

// import React, { useState, useEffect, useMemo } from 'react';
// import Plot from 'react-plotly.js';
// import { FaChartLine, FaFilter, FaInfoCircle, FaCaretUp, FaCaretDown, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// // Pattern symbols mapping
// const PATTERN_SYMBOLS = {
//   'Hammer': 'circle',
//   'Engulfing': 'square',
//   'Doji': 'diamond',
//   'Harami': 'cross',
//   'Shooting Star': 'x',
//   'Morning Star': 'triangle-up',
//   'Evening Star': 'triangle-down',
//   'Piercing': 'pentagon',
//   'Dark Cloud': 'hexagon',
//   'Three White Soldiers': 'star',
//   'Three Black Crows': 'hexagram',
//   'Hanging Man': 'bowtie',
//   'Inverted Hammer': 'hourglass'
// };

// export default function CandlePatternPlot({ symbol }) {
//   const [raw, setRaw] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPatterns, setSelectedPatterns] = useState([]);
//   const [activePattern, setActivePattern] = useState(null);
//   const [isPatternPanelOpen, setIsPatternPanelOpen] = useState(true);
//   const [dateRange, setDateRange] = useState('1Y');
//   const [hoverInfo, setHoverInfo] = useState(null);
//   const [visibleRange, setVisibleRange] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     fetch(`${API_BASE}/candle-patterns`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//       body: JSON.stringify({ symbol }),
//     })
//       .then(res => res.json())
//       .then(json => {
//         console.log('API Response:', json);
//         if (json.error) {
//           console.error('Data error:', json.error);
//           setError(json.error);
//           setLoading(false);
//           return;
//         }
//         if (!json.candlestick || !Array.isArray(json.candlestick.x)) {
//           setError('Invalid data format: candlestick data missing or invalid');
//           setLoading(false);
//           return;
//         }
//         setRaw(json);
//         const patterns = [...new Set(json.pattern_markers?.map(trace => trace.name) || [])];
//         setSelectedPatterns(patterns);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Fetch error:', err);
//         setError('Failed to fetch data from the server');
//         setLoading(false);
//       });
//   }, []);

//   const dateRanges = useMemo(() => {
//     if (!raw || !raw.candlestick || !Array.isArray(raw.candlestick.x)) return {};
//     const allDates = raw.candlestick.x.map(d => new Date(d));
//     const maxDate = new Date(Math.max(...allDates));
//     return {
//       '1M': maxDate.setMonth(maxDate.getMonth() - 1),
//       '6M': maxDate.setMonth(maxDate.getMonth() - 6),
//       '1Y': maxDate.setFullYear(maxDate.getFullYear() - 1),
//       'All': new Date(Math.min(...allDates))
//     };
//   }, [raw]);

//   // Note: filteredData is set to raw as per original code (commented-out section preserved)
//   const filteredData = raw;

//   if (loading || !raw) {
//     return (
//       <div style={{
//         width: '95vw',
//         maxWidth: '1600px',
//         padding: '20px',
//         boxSizing: 'border-box',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         borderRadius: '16px',
//         margin: '24px auto'
//       }}>
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(255, 255, 255, 0.9)',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 100,
//           borderRadius: '16px'
//         }}>
//           <div style={{
//             width: '50px',
//             height: '50px',
//             border: '4px solid rgba(67, 97, 238, 0.2)',
//             borderTop: '4px solid #4361ee',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite',
//             marginBottom: '1.5rem'
//           }}></div>
//           <div style={{
//             fontSize: '1.1rem',
//             fontWeight: 500,
//             color: '#495057'
//           }}>Analyzing candle patterns...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={{
//         width: '95vw',
//         maxWidth: '1600px',
//         padding: '20px',
//         boxSizing: 'border-box',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         borderRadius: '16px',
//         margin: '24px auto'
//       }}>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '3rem',
//           textAlign: 'center'
//         }}>
//           <FaInfoCircle style={{ fontSize: '3rem', color: '#ced4da', marginBottom: '1.5rem' }} />
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#343a40' }}>Data Unavailable</h3>
//           <p style={{ color: '#6c757d', maxWidth: '500px' }}>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!raw.candlestick || !Array.isArray(raw.candlestick.x) || !raw.candlestick.x.length) {
//     return (
//       <div style={{
//         width: '95vw',
//         maxWidth: '1600px',
//         padding: '20px',
//         boxSizing: 'border-box',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         borderRadius: '16px',
//         margin: '24px auto'
//       }}>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '3rem',
//           textAlign: 'center'
//         }}>
//           <FaInfoCircle style={{ fontSize: '3rem', color: '#ced4da', marginBottom: '1.5rem' }} />
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#343a40' }}>No Data Available</h3>
//           <p style={{ color: '#6c757d', maxWidth: '500px' }}>No valid candlestick data available</p>
//         </div>
//       </div>
//     );
//   }

//   const data = filteredData || raw;

//   const currentPrice = data.candlestick.close[data.candlestick.close.length - 1] || 0;
//   const initialPrice = data.candlestick.close[0] || 1;
//   const priceChangePct = initialPrice !== 0 ? ((currentPrice - initialPrice) / initialPrice) * 100 : 0;
//   const totalPatterns = data.pattern_markers.reduce((sum, trace) => sum + (trace.x?.length || 0), 0);
//   const priceChangeColor = priceChangePct >= 0 ? '#10B981' : '#EF4444';
//   const priceChangeIcon = priceChangePct >= 0 ? <FaCaretUp /> : <FaCaretDown />;

//   const patternsByDate = {};
//   data.pattern_markers.forEach(patternTrace => {
//     patternTrace.x.forEach((date, i) => {
//       if (!patternsByDate[date]) patternsByDate[date] = [];
//       patternsByDate[date].push({
//         name: patternTrace.name,
//         color: patternTrace.marker.color,
//         hovertext: patternTrace.hovertext[i]
//       });
//     });
//   });

//   const strengthData = data.pattern_strength && data.pattern_strength.x?.length
//     ? data.pattern_strength.x.map((date, i) => ({
//         x: date,
//         y: Number(data.pattern_strength.y[i]),
//         hovertext: data.pattern_strength.hovertext[i],
//         color: data.pattern_strength.marker.color[i],
//       })).filter(d => d.x && !isNaN(d.y))
//     : [];
//   const strengthByDate = {};
//   strengthData.forEach(strength => strengthByDate[strength.x] = strength);

//   const candleData = data.candlestick.x
//     .map((date, i) => ({
//       x: date,
//       open: Number(data.candlestick.open[i]),
//       high: Number(data.candlestick.high[i]),
//       low: Number(data.candlestick.low[i]),
//       close: Number(data.candlestick.close[i]),
//       volume: Number(data.volume.y[i]),
//       patterns: patternsByDate[date] || [],
//     }))
//     .filter(d =>
//       d.x &&
//       !isNaN(d.open) && !isNaN(d.high) &&
//       !isNaN(d.low) && !isNaN(d.close) &&
//       !isNaN(d.volume)
//     );

//   if (!candleData.length) {
//     return (
//       <div style={{
//         width: '95vw',
//         maxWidth: '1600px',
//         padding: '20px',
//         boxSizing: 'border-box',
//         fontFamily: "'Inter', 'Segoe UI', sans-serif",
//         borderRadius: '16px',
//         margin: '24px auto'
//       }}>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '3rem',
//           textAlign: 'center'
//         }}>
//           <FaInfoCircle style={{ fontSize: '3rem', color: '#ced4da', marginBottom: '1.5rem' }} />
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#343a40' }}>Invalid Data</h3>
//           <p style={{ color: '#6c757d', maxWidth: '500px' }}>Candlestick data contains invalid values for {symbol}.</p>
//         </div>
//       </div>
//     );
//   }

//   const patternTraces = data.pattern_markers
//     .filter(pattern => selectedPatterns.includes(pattern.name))
//     .map(pattern => {
//       const patternPoints = pattern.x.map((date, i) => {
//         const candleIndex = candleData.findIndex(d => d.x === date);
//         if (candleIndex === -1) return null;
//         const candle = candleData[candleIndex];
//         return {
//           x: date,
//           y: candle.high * 1.02,
//           pattern: pattern.name,
//           color: pattern.marker.color,
//           hovertext: pattern.hovertext?.[i] || `Pattern: ${pattern.name}`
//         };
//       }).filter(Boolean);
//       return {
//         type: 'scatter',
//         mode: 'markers',
//         name: pattern.name,
//         x: patternPoints.map(p => p.x),
//         y: patternPoints.map(p => p.y),
//         hoverinfo: 'text',
//         text: patternPoints.map(p => p.hovertext),
//         marker: {
//           symbol: PATTERN_SYMBOLS[pattern.name] || 'circle',
//           color: pattern.marker.color,
//           size: 12,
//           line: { width: 1, color: pattern.marker.color }
//         },
//         showlegend: true
//       };
//     });

//   const volumeData = candleData.map(d => ({
//     x: d.x,
//     y: d.volume,
//     hovertext: `Volume: ${d.volume.toLocaleString('en-IN')}`,
//     color: d.close >= d.open ? '#10B981' : '#EF4444',
//   }));

//   const minPrice = Math.min(...candleData.map(d => d.low)) * 0.98;
//   const maxPrice = Math.max(...candleData.map(d => d.high)) * 1.02;

//   const plotlyData = [
//     {
//       type: 'candlestick',
//       name: symbol,
//       x: candleData.map(d => d.x),
//       open: candleData.map(d => d.open),
//       high: candleData.map(d => d.high),
//       low: candleData.map(d => d.low),
//       close: candleData.map(d => d.close),
//       increasing: { line: { color: '#10B981' }, fillcolor: 'rgba(16, 185, 129, 0.3)' },
//       decreasing: { line: { color: '#EF4444' }, fillcolor: 'rgba(239, 68, 68, 0.3)' },
//       hoverinfo: 'none'
//     },
//     ...patternTraces,
//     {
//       type: 'bar',
//       name: 'Volume',
//       x: volumeData.map(d => d.x),
//       y: volumeData.map(d => d.y),
//       marker: { color: volumeData.map(d => d.color), opacity: 0.6 },
//       yaxis: 'y2',
//       hoverinfo: 'text',
//       text: volumeData.map(d => d.hovertext),
//     },
//     ...(strengthData.length > 0 ? [{
//       type: 'scatter',
//       mode: 'markers',
//       name: 'Pattern Strength',
//       x: strengthData.map(d => d.x),
//       y: strengthData.map(d => d.y),
//       yaxis: 'y',
//       marker: { color: strengthData.map(d => d.color), size: 8, line: { width: 1, color: '#000' } },
//       hoverinfo: 'text',
//       text: strengthData.map(d => d.hovertext),
//     }] : [])
//   ];

//   const plotlyLayout = {
//     dragmode: 'pan',
//     title: { text: `${symbol} Candlestick Chart`, font: { size: 18, color: '#1e293b', family: 'Inter, sans-serif' }, x: 0.05, y: 0.98 },
//     xaxis: {
//       type: 'date',
//       autorange: false,
//       range: [
//         new Date(dateRanges[dateRange]).toISOString(),
//         new Date(Math.max(...raw.candlestick.x.map(d => new Date(d)))).toISOString()
//       ],
//       tickformat: '%b %d',
//       tickformatstops: [
//         { dtickrange: [null, 86400000], value: '%b %d' },
//         { dtickrange: [86400000, 2592000000], value: '%b %d' },
//         { dtickrange: [2592000000, null], value: '%b %Y' }
//       ],
//       nticks: Math.ceil(candleData.length / 5),
//       rangeslider: { visible: false, thickness: 0.05, bgcolor: 'rgba(240, 244, 254, 0.5)', bordercolor: '#e2e8f0', borderwidth: 1 },
//       gridcolor: '#f1f5f9',
//       linecolor: '#cbd5e1',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#64748b' },
//       title: { text: 'Date', font: { size: 12, color: '#64748b' } },
//       tickmode: 'auto',
//       showspikes: true,
//       spikecolor: '#94a3b8',
//       spikethickness: 1,
//       spikedash: 'dot'
//     },
//     yaxis: {
//       title: { text: 'Price (₹)', font: { size: 12, color: '#64748b' } },
//       range: [minPrice, maxPrice],
//       gridcolor: '#f1f5f9',
//       linecolor: '#cbd5e1',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#64748b' },
//       tickformat: '₹.2f',
//       showspikes: true,
//       spikecolor: '#94a3b8',
//       spikethickness: 1,
//       spikedash: 'dot',
//       domain: [0.3, 1]
//     },
//     yaxis2: {
//       title: { text: 'Volume', font: { size: 12, color: '#64748b' } },
//       gridcolor: '#f1f5f9',
//       showgrid: false,
//       showticklabels: true,
//       tickfont: { size: 9, color: '#64748b' },
//       domain: [0, 0.2]
//     },
//     margin: { l: 60, r: 30, t: 60, b: 60 },
//     showlegend: true,
//     legend: {
//       orientation: 'h',
//       x: 0.5,
//       xanchor: 'center',
//       y: 0,
//       bgcolor: 'rgba(255,255,255,0.7)',
//       bordercolor: '#e2e8f0',
//       borderwidth: 1,
//       font: { size: 12, color: '#334155' }
//     },
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(255,255,255,0.8)',
//     hovermode: 'x',
//     uirevision: 'true'
//   };

//   const handleHover = (data) => {
//     if (data.points && data.points[0]) {
//       const point = data.points[0];
//       const hoveredDate = point.x;
//       const candle = candleData.find(d => d.x === hoveredDate);
//       if (candle) {
//         const strength = strengthByDate[hoveredDate];
//         setHoverInfo({ ...candle, strength });
//       }
//     }
//   };

//   const handleUnhover = () => setHoverInfo(null);

//   const getCandleColor = (hover) => {
//     if (!hover) return '';
//     return hover.close > hover.open ? '#16a34a' : '#dc2626';
//   };

//   const handleRelayout = (event) => {
//     if (event['xaxis.range[0]'] && event['xaxis.range[1]']) {
//       setVisibleRange({ start: new Date(event['xaxis.range[0]']), end: new Date(event['xaxis.range[1]']) });
//     } else if (event['xaxis.range'] && event['xaxis.range'].length === 2) {
//       setVisibleRange({ start: new Date(event['xaxis.range'][0]), end: new Date(event['xaxis.range'][1]) });
//     }
//   };

//   return (
//     <div style={{
//       width: '95vw',
//       maxWidth: '1600px',
//       padding: '20px',
//       boxSizing: 'border-box',
//       fontFamily: "'Inter', 'Segoe UI', sans-serif",
//       borderRadius: '16px',
//       margin: '24px auto'
//     }}>
//       <div style={{
//         position: 'relative',
//         background: 'rgba(255, 255, 255, 0.85)',
//         borderRadius: '16px',
//         boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.03)',
//         overflow: 'hidden',
//         border: '1px solid rgba(241, 245, 249, 0.6)',
//         backdropFilter: 'blur(10px)'
//       }}>
//         <div style={{
//           position: 'relative',
//           padding: '16px 24px 12px',
//           background: 'linear-gradient(120deg, rgba(249, 250, 251, 0.7) 0%, rgba(240, 244, 248, 0.7) 100%)',
//           borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-start',
//           flexWrap: 'wrap'
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '1rem',
//             marginBottom: '1rem'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               width: '48px',
//               height: '48px',
//               background: 'linear-gradient(135deg, #4361ee 0%, #2a44c4 100%)',
//               borderRadius: '12px',
//               color: 'white',
//               fontSize: '1.5rem',
//               boxShadow: '0 4px 6px rgba(67, 97, 238, 0.2)'
//             }}>
//               <FaChartLine />
//             </div>
//             <div>
//               <h2 style={{
//                 fontSize: '1.6rem',
//                 fontWeight: 700,
//                 color: '#212529',
//                 marginBottom: '6px',
//                 letterSpacing: '-0.5px'
//               }}>Professional Candlestick Analysis</h2>
//               <p style={{
//                 fontSize: '1rem',
//                 color: '#6c757d',
//                 fontWeight: 500,
//                 margin: 0
//               }}>Advanced pattern detection for {symbol}</p>
//             </div>
//           </div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               background: 'white',
//               border: '1px solid #e2e8f0',
//               borderRadius: '8px',
//               padding: '0.4rem',
//               marginRight: '1rem'
//             }}>
//               <FaCalendarAlt style={{ color: '#adb5bd', marginRight: '0.5rem' }} />
//               {['1M', '6M', '1Y', 'All'].map(range => (
//                 <button
//                   key={range}
//                   style={{
//                     padding: '0.4rem 0.8rem',
//                     background: dateRange === range ? '#4361ee' : 'transparent',
//                     border: 'none',
//                     borderRadius: '6px',
//                     color: dateRange === range ? 'white' : '#6c757d',
//                     fontWeight: 500,
//                     fontSize: '0.85rem',
//                     cursor: 'pointer'
//                   }}
//                   onClick={() => setDateRange(range)}
//                 >
//                   {range}
//                 </button>
//               ))}
//             </div>
//             <button
//               style={{
//                 padding: '0.6rem 1rem',
//                 background: isPatternPanelOpen ? '#4361ee' : 'white',
//                 border: `1px solid ${isPatternPanelOpen ? '#4361ee' : '#e2e8f0'}`,
//                 borderRadius: '8px',
//                 color: isPatternPanelOpen ? 'white' : '#6c757d',
//                 fontWeight: 600,
//                 fontSize: '0.9rem',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '0.75rem',
//                 boxShadow: isPatternPanelOpen ? '0 2px 4px rgba(67, 97, 238, 0.2)' : 'none'
//               }}
//               onClick={() => setIsPatternPanelOpen(!isPatternPanelOpen)}
//             >
//               <FaFilter /> {isPatternPanelOpen ? 'Hide Patterns' : 'Show Patterns'}
//             </button>
//           </div>
//         </div>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gap: '1rem',
//           margin: '1rem 24px'
//         }}>
//           <div style={{
//             background: 'white',
//             borderRadius: '8px',
//             padding: '1rem',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
//             border: '1px solid #edf2f7',
//             display: 'flex',
//             flexDirection: 'row',
//             gap: '1.3em',
//             alignItems: 'center'
//           }}>
//             <div>
//               <div style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '0.25rem', fontWeight: 500 }}>Price</div>
//               <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#212529', marginBottom: '0.25rem' }}>
//                 ₹{currentPrice.toFixed(2)}
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.95rem', color: priceChangeColor }}>
//                 {priceChangeIcon} {priceChangePct.toFixed(2)}%
//               </div>
//             </div>
//           </div>
//           <div style={{
//             background: 'white',
//             borderRadius: '8px',
//             padding: '1rem',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
//             border: '1px solid #edf2f7',
//             display: 'flex',
//             flexDirection: 'row',
//             gap: '1.3em',
//             alignItems: 'center'
//           }}>
//             <div>
//               <div style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '0.25rem', fontWeight: 500 }}>Patterns Detected</div>
//               <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#212529', marginBottom: '0.25rem' }}>{totalPatterns}</div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.95rem', color: '#6c757d' }}>
//                 {data.pattern_markers.length} types
//               </div>
//             </div>
//           </div>
//           <div style={{
//             background: 'white',
//             borderRadius: '8px',
//             padding: '1rem',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
//             border: '1px solid #edf2f7',
//             display: 'flex',
//             flexDirection: 'row',
//             gap: '1.3em',
//             alignItems: 'center'
//           }}>
//             <div>
//               <div style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '0.25rem', fontWeight: 500 }}>Timeframe</div>
//               <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#212529', marginBottom: '0.25rem' }}>{candleData.length} days</div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, fontSize: '0.95rem', color: '#6c757d' }}>
//                 {new Date(data.candlestick.x[0]).toLocaleDateString('en-IN')} - {new Date(data.candlestick.x[data.candlestick.x.length - 1]).toLocaleDateString('en-IN')}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={{
//           display: 'flex',
//           gap: '1.5rem',
//           padding: '0 32px 20px'
//         }}>
//           <div style={{
//             flex: 1,
//             background: 'white',
//             borderRadius: '12px',
//             boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
//             overflow: 'hidden'
//           }}>
//             <div style={{
//               background: 'rgba(255, 255, 255, 0.98)',
//               border: '1px solid #e2e8f0',
//               borderRadius: '6px',
//               padding: '10px 12px',
//               margin: '0 32px 10px',
//               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
//               height: '150px',
//               overflowY: 'auto',
//               scrollbarWidth: 'thin'
//             }}>
//               {hoverInfo ? (
//                 <div>
//                   <div style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: '50px',
//                     marginBottom: '8px',
//                     paddingBottom: '6px',
//                     borderBottom: '1px solid #f1f5f9'
//                   }}>
//                     <span style={{ fontSize: '1.2rem', color: '#64748b', fontWeight: 500 }}>
//                       {new Date(hoverInfo.x).toLocaleDateString('en-IN')}
//                     </span>
//                     <span style={{
//                       fontSize: '1.2rem',
//                       fontWeight: 600,
//                       color: hoverInfo.close >= hoverInfo.open ? '#16a34a' : '#dc2626'
//                     }}>
//                       ₹{hoverInfo.close.toFixed(2)}
//                     </span>
//                     <span style={{
//                       fontSize: '1.0rem',
//                       padding: '2px 6px',
//                       borderRadius: '4px',
//                       fontWeight: 500,
//                       background: hoverInfo.close > hoverInfo.open ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)',
//                       color: hoverInfo.close > hoverInfo.open ? '#16a34a' : '#dc2626'
//                     }}>
//                       {hoverInfo.close > hoverInfo.open ? (
//                         <FaArrowUp style={{ marginRight: '4px', verticalAlign: 'middle' }} />
//                       ) : (
//                         <FaArrowDown style={{ marginRight: '4px', verticalAlign: 'middle' }} />
//                       )}
//                       {Math.abs(((hoverInfo.close - hoverInfo.open) / hoverInfo.open) * 100).toFixed(2)}%
//                     </span>
//                   </div>
//                   <div style={{
//                     display: 'grid',
//                     gridTemplateColumns: 'repeat(5, 1fr)',
//                     gap: '6px',
//                     marginBottom: '8px'
//                   }}>
//                     <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
//                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b697c', marginBottom: '4px', display: 'block' }}>Open:</span>
//                       <span style={{ fontSize: '1.0rem', fontWeight: 600, color: '#1e293b' }}>{hoverInfo.open.toFixed(2)}</span>
//                     </div>
//                     <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
//                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b697c', marginBottom: '4px', display: 'block' }}>Close:</span>
//                       <span style={{ fontSize: '1.0rem', fontWeight: 700, color: getCandleColor(hoverInfo) }}>{hoverInfo.close.toFixed(2)}</span>
//                     </div>
//                     <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
//                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b697c', marginBottom: '4px', display: 'block' }}>High:</span>
//                       <span style={{ fontSize: '1.0rem', fontWeight: 600, color: '#1e293b' }}>{hoverInfo.high.toFixed(2)}</span>
//                     </div>
//                     <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
//                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b697c', marginBottom: '4px', display: 'block' }}>Low:</span>
//                       <span style={{ fontSize: '1.0rem', fontWeight: 600, color: '#1e293b' }}>{hoverInfo.low.toFixed(2)}</span>
//                     </div>
//                     <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '8px', textAlign: 'center' }}>
//                       <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#5b697c', marginBottom: '4px', display: 'block' }}>Volume:</span>
//                       <span style={{ fontSize: '1.0rem', fontWeight: 600, color: '#1e293b' }}>{(hoverInfo.volume / 1000).toFixed(1)}K</span>
//                     </div>
//                   </div>
//                   {hoverInfo.patterns.length > 0 && (
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '8px' }}>
//                       {hoverInfo.patterns.map(p => (
//                         <span
//                           key={p.name}
//                           style={{
//                             fontSize: '0.8rem',
//                             fontWeight: 600,
//                             padding: '4px 8px',
//                             borderRadius: '6px',
//                             background: 'rgba(99, 102, 241, 0.1)',
//                             border: `1px solid ${p.color}`,
//                             display: 'flex',
//                             gap: '4px'
//                           }}
//                         >
//                           <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Candle Pattern:</span>
//                           <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1e293b' }}>{p.name}</span>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div style={{
//                   fontSize: '1.5rem',
//                   color: '#94a3b8',
//                   textAlign: 'center',
//                   padding: '4px 0',
//                   minHeight: '50px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}>
//                   Hover over candle for details
//                 </div>
//               )}
//             </div>
//             <div style={{
//               height: '500px',
//               position: 'relative',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               border: '1px solid #e2e8f0',
//               boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
//               cursor: 'crosshair'
//             }}>
//               <Plot
//                 data={plotlyData}
//                 layout={plotlyLayout}
//                 style={{ width: '100%', height: '100%' }}
//                 config={{
//                   responsive: true,
//                   displayModeBar: true,
//                   modeBarButtonsToRemove: ['lasso2d', 'select2d'],
//                   displaylogo: false,
//                   scrollZoom: true
//                 }}
//                 onHover={handleHover}
//                 onUnhover={handleUnhover}
//                 onRelayout={handleRelayout}
//               />
//             </div>
//           </div>

//           {isPatternPanelOpen && (
//             <div style={{
//               width: '230px',
//               background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 244, 246, 0.85))',
//               borderRadius: '12px',
//               boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(241, 245, 249, 0.6)',
//               backdropFilter: 'blur(12px)',
//               overflow: 'hidden',
//               display: 'flex',
//               flexDirection: 'column',
//               minHeight: 'auto'

//             }}>
//               <div style={{
//                 padding: '12px 20px',
//                 background: 'linear-gradient(120deg, #4361ee 0%, #3a56e4 100%)',
//                 borderBottom: '1px solid rgba(226, 232, 240, 0.5)',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 color: 'white'
//               }}>
//                 <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>Detected Patterns</h3>
//                 <div style={{
//                   background: '#f0f4fe',
//                   color: '#2a44c4',
//                   padding: '6px 12px',
//                   borderRadius: '20px',
//                   fontSize: '0.9rem',
//                   fontWeight: 600,
//                   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
//                 }}>
//                   {selectedPatterns.length} of {data.pattern_markers.length} selected
//                 </div>
//               </div>
//               <div style={{
//                 padding: '10px 20px',
//                 display: 'flex',
//                 gap: '1rem',
//                 background: 'rgba(249, 250, 251, 0.9)',
//                 borderBottom: '1px solid rgba(226, 232, 240, 0.5)'
//               }}>
//                 <button
//                   style={{
//                     flex: 1,
//                     padding: '8px 12px',
//                     background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
//                     border: '1px solid #dee2e6',
//                     borderRadius: '8px',
//                     color: '#495057',
//                     fontWeight: 600,
//                     fontSize: '0.85rem',
//                     cursor: 'pointer',
//                     boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
//                   }}
//                   onClick={() => setSelectedPatterns(data.pattern_markers.map(trace => trace.name))}
//                 >
//                   Select All
//                 </button>
//                 <button
//                   style={{
//                     flex: 1,
//                     padding: '8px 12px',
//                     background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
//                     border: '1px solid #dee2e6',
//                     borderRadius: '8px',
//                     color: '#495057',
//                     fontWeight: 600,
//                     fontSize: '0.85rem',
//                     cursor: 'pointer',
//                     boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
//                   }}
//                   onClick={() => setSelectedPatterns([])}
//                 >
//                   Clear All
//                 </button>
//               </div>
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
//                 gap: '12px',
//                 padding: '12px',
//                 overflowY: 'auto',
//                 // height: '300px',
//                 background: 'rgba(255, 255, 255, 0.5)',
//                 scrollbarWidth: 'thin',
//                 minHeight: 'auto'

//               }}>
//                 {data.pattern_markers.map((pattern, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       borderRadius: '8px',
//                       padding: '12px',
//                       fontSize: '0.8rem',
//                       cursor: 'pointer',
//                       position: 'relative',
//                       overflow: 'hidden',
//                       minHeight: 'auto',
//                       background: selectedPatterns.includes(pattern.name) ? `${pattern.marker.color}26` : '#f9fafb',
//                       border: `solid ${selectedPatterns.includes(pattern.name) ? '2px' : '1px'} ${pattern.marker.color}`,
//                       boxShadow: selectedPatterns.includes(pattern.name) ?
//                         '0 4px 10px rgba(0, 0, 0, 0.12), 0 0 0 3px rgba(67, 97, 238, 0.2)' :
//                         '0 1px 2px rgba(0,0,0,0.04)',
//                       animation: selectedPatterns.includes(pattern.name) ? 'selectPulse 0.5s ease-out' :
//                         activePattern === pattern.name ? 'hoverPulse 0.3s ease-out' : 'none',
//                       transform: activePattern === pattern.name ? 'scale(1.02)' : 'none'
//                     }}
//                     onClick={() => {
//                       setActivePattern(activePattern === pattern.name ? null : pattern.name);
//                       setSelectedPatterns(prev =>
//                         prev.includes(pattern.name)
//                           ? prev.filter(p => p !== pattern.name)
//                           : [...prev, pattern.name]
//                       );
//                     }}
//                     onMouseEnter={() => setActivePattern(pattern.name)}
//                     onMouseLeave={() => setActivePattern(null)}
//                   >
//                     <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
//                       <div style={{
//                         width: '28px',
//                         height: '28px',
//                         borderRadius: '6px',
//                         backgroundSize: '70%',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'center',
//                         border: '1px solid rgba(0, 0, 0, 0.15)',
//                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                         backgroundColor: pattern.marker.color,
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${getSymbolPath(PATTERN_SYMBOLS[pattern.name] || 'circle')}' fill='white'/%3E%3C/svg%3E")`
//                       }}></div>
//                     </div>
//                     <div style={{
//                       fontSize: '0.85rem',
//                       fontWeight: 700,
//                       color: '#212529',
//                       marginBottom: '4px',
//                       textAlign: 'center',
//                       wordWrap: 'break-word',
//                       whiteSpace: 'normal',
//                       overflow: 'visible',
//                       display: 'block',
//                       lineHeight: 1.3,
//                       minHeight: '2.6em'
//                     }}>
//                       {pattern.name}
//                     </div>

//                     <div style={{
//                       fontSize: '0.8rem',
//                       color: '#495057',
//                       background: '#f8f9fa',
//                       padding: '3px 8px',
//                       borderRadius: '12px',
//                       display: 'inline-block',
//                       fontWeight: 600,
//                       textAlign: 'center',
//                       width: '100%',
//                       boxSizing: 'border-box'
//                     }}>{pattern.x.length}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//             @keyframes selectPulse {
//               0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4); }
//               70% { box-shadow: 0 0 0 8px rgba(67, 97, 238, 0); }
//               100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
//             }
//             @keyframes hoverPulse {
//               0% { transform: scale(1); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); }
//               50% { transform: scale(1.03); box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15); }
//               100% { transform: scale(1.02); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); }
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// }

// function getSymbolPath(symbol) {
//   const paths = {
//     'circle': 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z',
//     'square': 'M20,20 L80,20 L80,80 L20,80 Z',
//     'diamond': 'M50,20 L80,50 L50,80 L20,50 Z',
//     'cross': 'M30,30 L70,70 M70,30 L30,70',
//     'x': 'M30,30 L70,70 M70,30 L30,70',
//     'triangle-up': 'M50,20 L80,80 L20,80 Z',
//     'triangle-down': 'M50,80 L20,20 L80,20 Z',
//     'pentagon': 'M50,10 L80,40 L65,80 L35,80 L20,40 Z',
//     'hexagon': 'M30,50 L50,20 L70,50 L70,80 L50,110 L30,80 Z',
//     'star': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z',
//     'hexagram': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z M50,90 L39,60 L5,60 L32,40 L21,10 L50,30 L79,10 L68,40 L95,60 L61,60 Z',
//     'bowtie': 'M30,30 L70,30 L30,70 L70,70 Z',
//     'hourglass': 'M30,30 L70,30 L50,50 L70,70 L30,70 L50,50 Z'
//   };
//   return paths[symbol] || paths['circle'];
// }



// import React, { useState, useEffect, useMemo } from 'react';
// import Plot from 'react-plotly.js';
// import { FaChartLine, FaFilter, FaInfoCircle, FaCaretUp, FaCaretDown, FaCalendarAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// // Pattern symbols mapping
// const PATTERN_SYMBOLS = {
//   'Hammer': 'circle',
//   'Engulfing': 'square',
//   'Doji': 'diamond',
//   'Harami': 'cross',
//   'Shooting Star': 'x',
//   'Morning Star': 'triangle-up',
//   'Evening Star': 'triangle-down',
//   'Piercing': 'pentagon',
//   'Dark Cloud': 'hexagon',
//   'Three White Soldiers': 'star',
//   'Three Black Crows': 'hexagram',
//   'Hanging Man': 'bowtie',
//   'Inverted Hammer': 'hourglass'
// };

// export default function CandlePatternPlot({ symbol }) {
//   const [raw, setRaw] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPatterns, setSelectedPatterns] = useState([]);
//   const [activePattern, setActivePattern] = useState(null);
//   const [isPatternPanelOpen, setIsPatternPanelOpen] = useState(true);
//   const [dateRange, setDateRange] = useState('1Y');
//   const [hoverInfo, setHoverInfo] = useState(null);
//   const [visibleRange, setVisibleRange] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     fetch(`${API_BASE}/candle-patterns`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ symbol }),
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json.error) {
//           setError(json.error);
//           setLoading(false);
//           return;
//         }
//         if (!json.candlestick || !Array.isArray(json.candlestick.x)) {
//           setError('Invalid data format: candlestick data missing or invalid');
//           setLoading(false);
//           return;
//         }
//         setRaw(json);
//         const patterns = [...new Set(json.pattern_markers?.map(trace => trace.name) || [])];
//         setSelectedPatterns(patterns);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch data from the server');
//         setLoading(false);
//       });
//   }, [symbol]);

//   const dateRanges = useMemo(() => {
//     if (!raw || !raw.candlestick || !Array.isArray(raw.candlestick.x)) return {};
//     const allDates = raw.candlestick.x.map(d => new Date(d));
//     const maxDate = new Date(Math.max(...allDates));
//     return {
//       '1M': maxDate.setMonth(maxDate.getMonth() - 1),
//       '6M': maxDate.setMonth(maxDate.getMonth() - 6),
//       '1Y': maxDate.setFullYear(maxDate.getFullYear() - 1),
//       'All': new Date(Math.min(...allDates))
//     };
//   }, [raw]);

//   const filteredData = raw;

//   if (loading || !raw) {
//     return (
//       <div className="w-[95vw] max-w-[1400px] mx-auto p-4 font-inter bg-white rounded-xl shadow-sm">
//         <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
//           <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4"></div>
//           <span className="text-gray-600 text-sm font-medium">Loading candlestick patterns...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-[95vw] max-w-[1400px] mx-auto p-4 font-inter bg-white rounded-xl shadow-sm">
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <FaInfoCircle className="text-4xl text-gray-300 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Unavailable</h3>
//           <p className="text-gray-500 text-sm max-w-md">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!raw.candlestick || !Array.isArray(raw.candlestick.x) || !raw.candlestick.x.length) {
//     return (
//       <div className="w-[95vw] max-w-[1400px] mx-auto p-4 font-inter bg-white rounded-xl shadow-sm">
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <FaInfoCircle className="text-4xl text-gray-300 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">No Data Available</h3>
//           <p className="text-gray-500 text-sm max-w-md">No valid candlestick data available</p>
//         </div>
//       </div>
//     );
//   }

//   const data = filteredData || raw;
//   const currentPrice = data.candlestick.close[data.candlestick.close.length - 1] || 0;
//   const initialPrice = data.candlestick.close[0] || 1;
//   const priceChangePct = initialPrice !== 0 ? ((currentPrice - initialPrice) / initialPrice) * 100 : 0;
//   const totalPatterns = data.pattern_markers.reduce((sum, trace) => sum + (trace.x?.length || 0), 0);
//   const priceChangeColor = priceChangePct >= 0 ? '#22c55e' : '#ef4444';

//   const patternsByDate = {};
//   data.pattern_markers.forEach(patternTrace => {
//     patternTrace.x.forEach((date, i) => {
//       if (!patternsByDate[date]) patternsByDate[date] = [];
//       patternsByDate[date].push({
//         name: patternTrace.name,
//         color: patternTrace.marker.color,
//         hovertext: patternTrace.hovertext[i]
//       });
//     });
//   });

//   const strengthData = data.pattern_strength && data.pattern_strength.x?.length
//     ? data.pattern_strength.x.map((date, i) => ({
//         x: date,
//         y: Number(data.pattern_strength.y[i]),
//         hovertext: data.pattern_strength.hovertext[i],
//         color: data.pattern_strength.marker.color[i],
//       })).filter(d => d.x && !isNaN(d.y))
//     : [];
//   const strengthByDate = {};
//   strengthData.forEach(strength => strengthByDate[strength.x] = strength);

//   const candleData = data.candlestick.x
//     .map((date, i) => ({
//       x: date,
//       open: Number(data.candlestick.open[i]),
//       high: Number(data.candlestick.high[i]),
//       low: Number(data.candlestick.low[i]),
//       close: Number(data.candlestick.close[i]),
//       volume: Number(data.volume.y[i]),
//       patterns: patternsByDate[date] || [],
//     }))
//     .filter(d =>
//       d.x &&
//       !isNaN(d.open) && !isNaN(d.high) &&
//       !isNaN(d.low) && !isNaN(d.close) &&
//       !isNaN(d.volume)
//     );

//   if (!candleData.length) {
//     return (
//       <div className="w-[95vw] max-w-[1400px] mx-auto p-4 font-inter bg-white rounded-xl shadow-sm">
//         <div className="flex flex-col items-center justify-center p-8 text-center">
//           <FaInfoCircle className="text-4xl text-gray-300 mb-4" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Invalid Data</h3>
//           <p className="text-gray-500 text-sm max-w-md">Candlestick data contains invalid values for {symbol}.</p>
//         </div>
//       </div>
//     );
//   }

//   const patternTraces = data.pattern_markers
//     .filter(pattern => selectedPatterns.includes(pattern.name))
//     .map(pattern => {
//       const patternPoints = pattern.x.map((date, i) => {
//         const candleIndex = candleData.findIndex(d => d.x === date);
//         if (candleIndex === -1) return null;
//         const candle = candleData[candleIndex];
//         return {
//           x: date,
//           y: candle.high * 1.02,
//           pattern: pattern.name,
//           color: pattern.marker.color,
//           hovertext: pattern.hovertext?.[i] || `Pattern: ${pattern.name}`
//         };
//       }).filter(Boolean);
//       return {
//         type: 'scatter',
//         mode: 'markers',
//         name: pattern.name,
//         x: patternPoints.map(p => p.x),
//         y: patternPoints.map(p => p.y),
//         hoverinfo: 'text',
//         text: patternPoints.map(p => p.hovertext),
//         marker: {
//           symbol: PATTERN_SYMBOLS[pattern.name] || 'circle',
//           color: pattern.marker.color,
//           size: 10,
//           line: { width: 1, color: pattern.marker.color }
//         },
//         showlegend: true
//       };
//     });

//   const volumeData = candleData.map(d => ({
//     x: d.x,
//     y: d.volume,
//     hovertext: `Volume: ${d.volume.toLocaleString('en-IN')}`,
//     color: d.close >= d.open ? '#22c55e' : '#ef4444',
//   }));

//   const minPrice = Math.min(...candleData.map(d => d.low)) * 0.98;
//   const maxPrice = Math.max(...candleData.map(d => d.high)) * 1.02;

//   const plotlyData = [
//     {
//       type: 'candlestick',
//       name: symbol,
//       x: candleData.map(d => d.x),
//       open: candleData.map(d => d.open),
//       high: candleData.map(d => d.high),
//       low: candleData.map(d => d.low),
//       close: candleData.map(d => d.close),
//       increasing: { line: { color: '#22c55e' }, fillcolor: 'rgba(34, 197, 94, 0.2)' },
//       decreasing: { line: { color: '#ef4444' }, fillcolor: 'rgba(239, 68, 68, 0.2)' },
//       hoverinfo: 'none'
//     },
//     ...patternTraces,
//     {
//       type: 'bar',
//       name: 'Volume',
//       x: volumeData.map(d => d.x),
//       y: volumeData.map(d => d.y),
//       marker: { color: volumeData.map(d => d.color), opacity: 0.5 },
//       yaxis: 'y2',
//       hoverinfo: 'text',
//       text: volumeData.map(d => d.hovertext),
//     },
//     ...(strengthData.length > 0 ? [{
//       type: 'scatter',
//       mode: 'markers',
//       name: 'Pattern Strength',
//       x: strengthData.map(d => d.x),
//       y: strengthData.map(d => d.y),
//       yaxis: 'y',
//       marker: { color: strengthData.map(d => d.color), size: 8, line: { width: 1, color: '#000' } },
//       hoverinfo: 'text',
//       text: strengthData.map(d => d.hovertext),
//     }] : [])
//   ];

//   const plotlyLayout = {
//     dragmode: 'pan',
//     title: { text: `${symbol} Candlestick Analysis`, font: { size: 16, color: '#1e293b', family: 'Inter, sans-serif' }, x: 0.05, y: 0.98 },
//     xaxis: {
//       type: 'date',
//       autorange: false,
//       range: [
//         new Date(dateRanges[dateRange]).toISOString(),
//         new Date(Math.max(...raw.candlestick.x.map(d => new Date(d)))).toISOString()
//       ],
//       tickformat: '%b %d',
//       tickformatstops: [
//         { dtickrange: [null, 86400000], value: '%b %d' },
//         { dtickrange: [86400000, 2592000000], value: '%b %d' },
//         { dtickrange: [2592000000, null], value: '%b %Y' }
//       ],
//       nticks: Math.ceil(candleData.length / 5),
//       rangeslider: { visible: false, thickness: 0.05, bgcolor: '#f8fafc', bordercolor: '#e5e7eb', borderwidth: 1 },
//       gridcolor: '#f3f4f6',
//       linecolor: '#d1d5db',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#6b7280' },
//       title: { text: 'Date', font: { size: 11, color: '#6b7280' } },
//       tickmode: 'auto',
//       showspikes: true,
//       spikecolor: '#9ca3af',
//       spikethickness: 1,
//       spikedash: 'dot'
//     },
//     yaxis: {
//       title: { text: 'Price (₹)', font: { size: 11, color: '#6b7280' } },
//       range: [minPrice, maxPrice],
//       gridcolor: '#f3f4f6',
//       linecolor: '#d1d5db',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#6b7280' },
//       tickformat: '₹.2f',
//       showspikes: true,
//       spikecolor: '#9ca3af',
//       spikethickness: 1,
//       spikedash: 'dot',
//       domain: [0.25, 1]
//     },
//     yaxis2: {
//       title: { text: 'Volume', font: { size: 11, color: '#6b7280' } },
//       gridcolor: '#f3f4f6',
//       showgrid: false,
//       showticklabels: true,
//       tickfont: { size: 9, color: '#6b7280' },
//       domain: [0, 0.2]
//     },
//     margin: { l: 50, r: 20, t: 50, b: 50 },
//     showlegend: true,
//     legend: {
//       orientation: 'h',
//       x: 0.5,
//       xanchor: 'center',
//       y: 0,
//       bgcolor: 'rgba(255,255,255,0.9)',
//       bordercolor: '#e5e7eb',
//       borderwidth: 1,
//       font: { size: 11, color: '#374151' }
//     },
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(255,255,255,0.95)',
//     hovermode: 'x',
//     uirevision: 'true'
//   };

//   const handleHover = (data) => {
//     if (data.points && data.points[0]) {
//       const point = data.points[0];
//       const hoveredDate = point.x;
//       const candle = candleData.find(d => d.x === hoveredDate);
//       if (candle) {
//         const strength = strengthByDate[hoveredDate];
//         setHoverInfo({ ...candle, strength });
//       }
//     }
//   };

//   const handleUnhover = () => setHoverInfo(null);

//   const getCandleColor = (hover) => {
//     if (!hover) return '';
//     return hover.close > hover.open ? '#22c55e' : '#ef4444';
//   };

//   const handleRelayout = (event) => {
//     if (event['xaxis.range[0]'] && event['xaxis.range[1]']) {
//       setVisibleRange({ start: new Date(event['xaxis.range[0]']), end: new Date(event['xaxis.range[1]']) });
//     } else if (event['xaxis.range'] && event['xaxis.range'].length === 2) {
//       setVisibleRange({ start: new Date(event['xaxis.range'][0]), end: new Date(event['xaxis.range'][1]) });
//     }
//   };

//   return (
//     <div className="w-[95vw] max-w-[1400px] mx-auto p-4 font-inter">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//         <div className="p-4 border-b border-gray-100 bg-gray-50">
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
//                 <FaChartLine className="text-lg" />
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">Candlestick Analysis</h2>
//                 <p className="text-xs text-gray-500 font-medium">Pattern detection for {symbol}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
//                 <FaCalendarAlt className="text-gray-400 mr-2" />
//                 {['1M', '6M', '1Y', 'All'].map(range => (
//                   <button
//                     key={range}
//                     className={`px-3 py-1 text-xs font-medium rounded-md ${dateRange === range ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
//                     onClick={() => setDateRange(range)}
//                   >
//                     {range}
//                   </button>
//                 ))}
//               </div>
//               <button
//                 className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2 ${isPatternPanelOpen ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200'} border hover:shadow-sm`}
//                 onClick={() => setIsPatternPanelOpen(!isPatternPanelOpen)}
//               >
//                 <FaFilter /> {isPatternPanelOpen ? 'Hide Patterns' : 'Show Patterns'}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3 p-4">
//           <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-4">
//             <div>
//               <div className="text-sm text-gray-500 font-medium">Price</div>
//               <div className="text-lg font-semibold text-gray-800">₹{currentPrice.toFixed(2)}</div>
//               <div className={`flex items-center gap-1 text-xs font-semibold`} style={{ color: priceChangeColor }}>
//                 {priceChangePct >= 0 ? <FaCaretUp /> : <FaCaretDown />}
//                 {priceChangePct.toFixed(2)}%
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-4">
//             <div>
//               <div className="text-sm text-gray-500 font-medium">Patterns Detected</div>
//               <div className="text-lg font-semibold text-gray-800">{totalPatterns}</div>
//               <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
//                 {data.pattern_markers.length} types
//               </div>
//             </div>
//           </div>
//           <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex items-center gap-4">
//             <div>
//               <div className="text-sm text-gray-500 font-medium">Timeframe</div>
//               <div className="text-lg font-semibold text-gray-800">{candleData.length} days</div>
//               <div className="text-xs text-gray-500 font-medium">
//                 {new Date(data.candlestick.x[0]).toLocaleDateString('en-IN')} - {new Date(data.candlestick.x[data.candlestick.x.length - 1]).toLocaleDateString('en-IN')}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-4 p-4">
//           <div className="flex-1 bg-white rounded-lg border border-gray-100 shadow-sm">
//             <div className="bg-gray-50 border border-gray-200 rounded-md p-3 m-4 h-32">
//               {hoverInfo ? (
//                 <div>
//                   <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
//                     <span className="text-sm font-medium text-gray-600">{new Date(hoverInfo.x).toLocaleDateString('en-IN')}</span>
//                     <span className={`text-sm font-semibold`} style={{ color: getCandleColor(hoverInfo) }}>
//                       ₹{hoverInfo.close.toFixed(2)}
//                     </span>
//                     <span className={`text-xs font-medium px-2 py-1 rounded ${hoverInfo.close > hoverInfo.open ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
//                       {hoverInfo.close > hoverInfo.open ? <FaArrowUp className="inline mr-1" /> : <FaArrowDown className="inline mr-1" />}
//                       {Math.abs(((hoverInfo.close - hoverInfo.open) / hoverInfo.open) * 100).toFixed(2)}%
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-5 gap-2 mb-2">
//                     {['Open', 'Close', 'High', 'Low', 'Volume'].map((label, i) => (
//                       <div key={label} className="bg-gray-50 rounded-md p-2 text-center">
//                         <span className="text-xs font-medium text-gray-500 block">{label}:</span>
//                         <span className={`text-sm font-semibold ${label === 'Close' ? getCandleColor(hoverInfo) : 'text-gray-800'}`}>
//                           {label === 'Volume' ? (hoverInfo.volume / 1000).toFixed(1) + 'K' : hoverInfo[label.toLowerCase()].toFixed(2)}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   {hoverInfo.patterns.length > 0 && (
//                     <div className="flex flex-wrap gap-2">
//                       {hoverInfo.patterns.map(p => (
//                         <span
//                           key={p.name}
//                           className="text-xs font-medium px-2 py-1 rounded bg-indigo-50 border"
//                           style={{ borderColor: p.color }}
//                         >
//                           <span className="text-gray-600">Pattern:</span> <span className="text-gray-800">{p.name}</span>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-sm text-gray-400 text-center h-full flex items-center justify-center">
//                   Hover over candle for details
//                 </div>
//               )}
//             </div>
//             <div className="h-[450px] border border-gray-100 rounded-md overflow-hidden m-4">
//               <Plot
//                 data={plotlyData}
//                 layout={plotlyLayout}
//                 className="w-full h-full"
//                 config={{
//                   responsive: true,
//                   displayModeBar: true,
//                   modeBarButtonsToRemove: ['lasso2d', 'select2d'],
//                   displaylogo: false,
//                   scrollZoom: true
//                 }}
//                 onHover={handleHover}
//                 onUnhover={handleUnhover}
//                 onRelayout={handleRelayout}
//               />
//             </div>
//           </div>

//           {isPatternPanelOpen && (
//             <div className="w-56 bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-b border-gray-200 flex justify-between items-center">
//                 <h3 className="text-sm font-semibold">Detected Patterns</h3>
//                 <span className="text-xs font-medium bg-white text-blue-600 px-2 py-1 rounded-full">
//                   {selectedPatterns.length} of {data.pattern_markers.length}
//                 </span>
//               </div>
//               <div className="p-3 bg-gray-50 border-b border-gray-100 flex gap-2">
//                 <button
//                   className="flex-1 px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-100"
//                   onClick={() => setSelectedPatterns(data.pattern_markers.map(trace => trace.name))}
//                 >
//                   Select All
//                 </button>
//                 <button
//                   className="flex-1 px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-100"
//                   onClick={() => setSelectedPatterns([])}
//                 >
//                   Clear All
//                 </button>
//               </div>
//               <div className="p-3 grid grid-cols-2 gap-2 overflow-y-auto scrollbar-thin max-h-[400px]">
//                 {data.pattern_markers.map((pattern, index) => (
//                   <div
//                     key={index}
//                     className={`p-2 rounded-md cursor-pointer border transition-all duration-200 ${selectedPatterns.includes(pattern.name) ? 'shadow-md' : 'border-gray-200'}`}
//                     style={{
//                       background: selectedPatterns.includes(pattern.name) ? `${pattern.marker.color}20` : '#f9fafb',
//                       borderColor: pattern.marker.color,
//                       borderWidth: selectedPatterns.includes(pattern.name) ? 2 : 1,
//                       transform: activePattern === pattern.name ? 'scale(1.02)' : 'none'
//                     }}
//                     onClick={() => {
//                       setActivePattern(activePattern === pattern.name ? null : pattern.name);
//                       setSelectedPatterns(prev =>
//                         prev.includes(pattern.name)
//                           ? prev.filter(p => p !== pattern.name)
//                           : [...prev, pattern.name]
//                       );
//                     }}
//                     onMouseEnter={() => setActivePattern(pattern.name)}
//                     onMouseLeave={() => setActivePattern(null)}
//                   >
//                     <div className="flex justify-center mb-2">
//                       <div
//                         className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center"
//                         style={{
//                           backgroundColor: pattern.marker.color,
//                           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${getSymbolPath(PATTERN_SYMBOLS[pattern.name] || 'circle')}' fill='white'/%3E%3C/svg%3E")`,
//                           backgroundSize: '60%',
//                           backgroundRepeat: 'no-repeat',
//                           backgroundPosition: 'center'
//                         }}
//                       ></div>
//                     </div>
//                     <div className="text-xs font-semibold text-gray-800 text-center truncate">{pattern.name}</div>
//                     <div className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-2 py-1 mt-1 text-center">{pattern.x.length}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//             .scrollbar-thin::-webkit-scrollbar {
//               width: 6px;
//             }
//             .scrollbar-thin::-webkit-scrollbar-track {
//               background: #f3f4f6;
//               border-radius: 3px;
//             }
//             .scrollbar-thin::-webkit-scrollbar-thumb {
//               background: #d1d5db;
//               border-radius: 3px;
//             }
//             .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//               background: #9ca3af;
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// }

// function getSymbolPath(symbol) {
//   const paths = {
//     'circle': 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z',
//     'square': 'M20,20 L80,20 L80,80 L20,80 Z',
//     'diamond': 'M50,20 L80,50 L50,80 L20,50 Z',
//     'cross': 'M30,30 L70,70 M70,30 L30,70',
//     'x': 'M30,30 L70,70 M70,30 L30,70',
//     'triangle-up': 'M50,20 L80,80 L20,80 Z',
//     'triangle-down': 'M50,80 L20,20 L80,20 Z',
//     'pentagon': 'M50,10 L80,40 L65,80 L35,80 L20,40 Z',
//     'hexagon': 'M30,50 L50,20 L70,50 L70,80 L50,110 L30,80 Z',
//     'star': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z',
//     'hexagram': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z M50,90 L39,60 L5,60 L32,40 L21,10 L50,30 L79,10 L68,40 L95,60 L61,60 Z',
//     'bowtie': 'M30,30 L70,30 L30,70 L70,70 Z',
//     'hourglass': 'M30,30 L70,30 L50,50 L70,70 L30,70 L50,50 Z'
//   };
//   return paths[symbol] || paths['circle'];
// }


/// Amaan Code 


// import React, { useState, useEffect, useMemo } from 'react';
// import Plot from 'react-plotly.js';
// import { FaChartLine, FaFilter, FaInfoCircle, FaCaretUp, FaCaretDown, FaCalendarAlt, FaArrowUp, FaArrowDown, FaChevronDown, FaChevronRight } from 'react-icons/fa';

// // Pattern symbols mapping
// const PATTERN_SYMBOLS = {
//   'Hammer': 'circle',
//   'Engulfing': 'square',
//   'Doji': 'diamond',
//   'Harami': 'cross',
//   'Shooting Star': 'x',
//   'Morning Star': 'triangle-up',
//   'Evening Star': 'triangle-down',
//   'Piercing': 'pentagon',
//   'Dark Cloud': 'hexagon',
//   'Three White Soldiers': 'star',
//   'Three Black Crows': 'hexagram',
//   'Hanging Man': 'bowtie',
//   'Inverted Hammer': 'hourglass'
// };

// export default function CandlePatternPlot({ symbol }) {
//   const [raw, setRaw] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPatterns, setSelectedPatterns] = useState([]);
//   const [activePattern, setActivePattern] = useState(null);
//   const [isPatternPanelOpen, setIsPatternPanelOpen] = useState(false);
//   const [dateRange, setDateRange] = useState('3M');
//   const [hoverInfo, setHoverInfo] = useState(null);
//   const [visibleRange, setVisibleRange] = useState(null);
//   const [showStats, setShowStats] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     fetch(`${API_BASE}/candle-patterns`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ symbol }),
//     })
//       .then(res => res.json())
//       .then(json => {
//         if (json.error) {
//           setError(json.error);
//           setLoading(false);
//           return;
//         }
//         if (!json.candlestick || !Array.isArray(json.candlestick.x)) {
//           setError('Invalid data format: candlestick data missing or invalid');
//           setLoading(false);
//           return;
//         }
//         setRaw(json);
//         const patterns = [...new Set(json.pattern_markers?.map(trace => trace.name) || [])];
//         setSelectedPatterns(patterns);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch data from the server');
//         setLoading(false);
//       });
//   }, [symbol]);

//   const today = new Date(); // Changed from new Date('2025-07-29')
//   const dateRanges = useMemo(() => {
//     if (!raw || !raw.candlestick || !Array.isArray(raw.candlestick.x)) return {};
//     const allDates = raw.candlestick.x.map(d => new Date(d));
//     const minDate = new Date(Math.min(...allDates));
//     return {
//       '1M': new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
//       '3M': new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
//       '6M': new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
//       '1Y': new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
//       'All': minDate
//     };
//   }, [raw]);

//   const filteredData = raw;

//   if (loading || !raw) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <div className="loading-text">Analyzing candle patterns...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <FaInfoCircle className="error-icon" />
//         <h3>Data Unavailable</h3>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   if (!raw.candlestick || !Array.isArray(raw.candlestick.x) || !raw.candlestick.x.length) {
//     return (
//       <div className="error-container">
//         <FaInfoCircle className="error-icon" />
//         <h3>No Data Available</h3>
//         <p>No valid candlestick data available</p>
//       </div>
//     );
//   }

//   const data = filteredData || raw;
//   const currentPrice = data.candlestick.close[data.candlestick.close.length - 1] || 0;
//   const initialPrice = data.candlestick.close[0] || 1;
//   const priceChangePct = initialPrice !== 0 ? ((currentPrice - initialPrice) / initialPrice) * 100 : 0;
//   const totalPatterns = data.pattern_markers.reduce((sum, trace) => sum + (trace.x?.length || 0), 0);
//   const priceChangeColor = priceChangePct >= 0 ? '#10B981' : '#EF4444';
//   const priceChangeIcon = priceChangePct >= 0 ? <FaCaretUp /> : <FaCaretDown />;

//   const patternsByDate = {};
//   data.pattern_markers.forEach(patternTrace => {
//     patternTrace.x.forEach((date, i) => {
//       if (!patternsByDate[date]) patternsByDate[date] = [];
//       patternsByDate[date].push({
//         name: patternTrace.name,
//         color: patternTrace.marker.color,
//         hovertext: patternTrace.hovertext[i]
//       });
//     });
//   });

//   const candleData = data.candlestick.x
//     .map((date, i) => ({
//       x: date,
//       open: Number(data.candlestick.open[i]),
//       high: Number(data.candlestick.high[i]),
//       low: Number(data.candlestick.low[i]),
//       close: Number(data.candlestick.close[i]),
//       volume: Number(data.volume.y[i]),
//       patterns: patternsByDate[date] || [],
//     }))
//     .filter(d =>
//       d.x &&
//       !isNaN(d.open) && !isNaN(d.high) &&
//       !isNaN(d.low) && !isNaN(d.close) &&
//       !isNaN(d.volume)
//     );

//   if (!candleData.length) {
//     return (
//       <div className="error-container">
//         <FaInfoCircle className="error-icon" />
//         <h3>Invalid Data</h3>
//         <p>Candlestick data contains invalid values for {symbol}.</p>
//       </div>
//     );
//   }

//   const patternTraces = data.pattern_markers
//     .filter(pattern => selectedPatterns.includes(pattern.name))
//     .map(pattern => {
//       const patternPoints = pattern.x.map((date, i) => {
//         const candleIndex = candleData.findIndex(d => d.x === date);
//         if (candleIndex === -1) return null;
//         const candle = candleData[candleIndex];
//         return {
//           x: date,
//           y: candle.high * 1.02,
//           pattern: pattern.name,
//           color: pattern.marker.color,
//           hovertext: pattern.hovertext?.[i] || `Pattern: ${pattern.name}`
//         };
//       }).filter(Boolean);
//       return {
//         type: 'scatter',
//         mode: 'markers',
//         name: pattern.name,
//         x: patternPoints.map(p => p.x),
//         y: patternPoints.map(p => p.y),
//         hoverinfo: 'text',
//         text: patternPoints.map(p => p.hovertext),
//         marker: {
//           symbol: PATTERN_SYMBOLS[pattern.name] || 'circle',
//           color: pattern.marker.color,
//           size: 12,
//           line: { width: 1, color: pattern.marker.color }
//         },
//         showlegend: true
//       };
//     });

//   const volumeData = candleData.map(d => ({
//     x: d.x,
//     y: d.volume,
//     hovertext: `Volume: ${d.volume.toLocaleString('en-IN')}`,
//     color: d.close >= d.open ? '#10B981' : '#EF4444',
//   }));

//   const minPrice = Math.min(...candleData.map(d => d.low)) * 0.95; // Increase padding below
//   const maxPrice = Math.max(...candleData.map(d => d.high)) * 1.05; // Increase padding above
//   const minDate = new Date(Math.min(...raw.candlestick.x.map(d => new Date(d))));
//   const maxDate = new Date(Math.max(...raw.candlestick.x.map(d => new Date(d))));

//   const plotlyData = [
//     {
//       type: 'candlestick',
//       name: symbol,
//       x: candleData.map(d => d.x),
//       open: candleData.map(d => d.open),
//       high: candleData.map(d => d.high),
//       low: candleData.map(d => d.low),
//       close: candleData.map(d => d.close),
//       increasing: { line: { color: '#10B981' }, fillcolor: 'rgba(16, 185, 129, 0.3)' },
//       decreasing: { line: { color: '#EF4444' }, fillcolor: 'rgba(239, 68, 68, 0.3)' },
//       hoverinfo: 'none'
//     },
//     ...patternTraces,
//     {
//       type: 'bar',
//       name: 'Volume',
//       x: volumeData.map(d => d.x),
//       y: volumeData.map(d => d.y),
//       marker: { color: volumeData.map(d => d.color), opacity: 0.6 },
//       yaxis: 'y2',
//       hoverinfo: 'text',
//       text: volumeData.map(d => d.hovertext),
//     }
//   ];

//   const plotlyLayout = {
//     dragmode: 'pan',
//     title: { text: `${symbol} Candlestick Chart`, font: { size: 16, color: '#1e293b', family: 'Inter, sans-serif' }, x: 0.05, y: 0.98 },
//     xaxis: {
//       type: 'date',
//       autorange: false,
//       range: [
//         new Date(dateRanges[dateRange]).toISOString(),
//         today.toISOString()
//       ],
//       rangebreaks: [
//         { bounds: [null, minDate.toISOString()], pattern: 'day' },
//         { bounds: [maxDate.toISOString(), null], pattern: 'day' },
//         { bounds: ["sat", "mon"], pattern: 'day' } // Skip weekends
//       ],
//       min: minDate.toISOString(),
//       max: maxDate.toISOString(),
//       tickformat: '%b %d',
//       tickformatstops: [
//         { dtickrange: [null, 86400000], value: '%b %d' },
//         { dtickrange: [86400000, 2592000000], value: '%b %d' },
//         { dtickrange: [2592000000, null], value: '%b %Y' }
//       ],
//       nticks: Math.ceil(candleData.length / 5),
//       rangeslider: { visible: false },
//       gridcolor: '#f1f5f9',
//       linecolor: '#cbd5e1',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#64748b' },
//       title: { text: 'Date', font: { size: 12, color: '#64748b' } },
//       tickmode: 'auto',
//       showspikes: true,
//       spikecolor: '#94a3b8',
//       spikethickness: 1,
//       spikedash: 'dot'
//     },
//     yaxis: {
//       title: { text: 'Price (₹)', font: { size: 12, color: '#64748b' } },
//       range: [minPrice, maxPrice],
//       gridcolor: '#f1f5f9',
//       linecolor: '#cbd5e1',
//       showline: true,
//       zeroline: false,
//       showgrid: true,
//       tickfont: { size: 10, color: '#64748b' },
//       tickformat: '₹.2f',
//       showspikes: true,
//       spikecolor: '#94a3b8',
//       spikethickness: 1,
//       spikedash: 'dot',
//       domain: [0.25, 1],
//       nticks: 5 // Add this line to reduce tick density
//     },
//     yaxis2: {
//       title: { text: 'Volume', font: { size: 12, color: '#64748b' } },
//       gridcolor: '#f1f5f9',
//       showgrid: false,
//       showticklabels: true,
//       tickfont: { size: 9, color: '#64748b' },
//       domain: [0, 0.15]
//     },
//     margin: { l: 50, r: 30, t: 40, b: 40 },
//     showlegend: true,
//     legend: {
//       orientation: 'h',
//       x: 0.5,
//       xanchor: 'center',
//       y: 0,
//       bgcolor: 'rgba(255,255,255,0.7)',
//       bordercolor: '#e2e8f0',
//       borderwidth: 1,
//       font: { size: 12, color: '#334155' }
//     },
//     paper_bgcolor: 'rgba(0,0,0,0)',
//     plot_bgcolor: 'rgba(255,255,255,0.8)',
//     hovermode: 'x unified',
//     uirevision: 'true'
//   };

//   const handleHover = (data) => {
//     if (data.points && data.points[0]) {
//       const point = data.points[0];
//       const hoveredDate = point.x;
//       const candle = candleData.find(d => d.x === hoveredDate);
//       if (candle) {
//         setHoverInfo(candle);
//       }
//     }
//   };

//   const handleUnhover = () => setHoverInfo(null);

//   const getCandleColor = (hover) => {
//     if (!hover) return '';
//     return hover.close > hover.open ? '#16a34a' : '#dc2626';
//   };

//   const handleRelayout = (event) => {
//     if (event['xaxis.range[0]'] && event['xaxis.range[1]']) {
//       const start = new Date(event['xaxis.range[0]']);
//       const end = new Date(event['xaxis.range[1]']);
//       setVisibleRange({
//         start: start < minDate ? minDate : start,
//         end: end > maxDate ? maxDate : end
//       });
//     } else if (event['xaxis.range'] && event['xaxis.range'].length === 2) {
//       const start = new Date(event['xaxis.range'][0]);
//       const end = new Date(event['xaxis.range'][1]);
//       setVisibleRange({
//         start: start < minDate ? minDate : start,
//         end: end > maxDate ? maxDate : end
//       });
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-header">
//         <div className="header-left">
//           <div className="header-icon">
//             <FaChartLine />
//           </div>
//           <div>
//             <h2>Professional Candlestick Analysis</h2>
//             <p>Advanced pattern detection for {symbol}</p>
//           </div>
//         </div>
//         <div className="header-controls">
//           <div className="date-range-selector">
//             <FaCalendarAlt />
//             {['1M', '3M', '6M', '1Y', 'All'].map(range => (
//               <button
//                 key={range}
//                 className={dateRange === range ? 'active' : ''}
//                 onClick={() => setDateRange(range)}
//               >
//                 {range}
//               </button>
//             ))}
//           </div>
//           <button
//             className={`pattern-toggle ${isPatternPanelOpen ? 'active' : ''}`}
//             onClick={() => setIsPatternPanelOpen(!isPatternPanelOpen)}
//           >
//             <FaFilter /> {isPatternPanelOpen ? 'Hide Patterns' : 'Show Patterns'}
//           </button>
//         </div>
//       </div>

//       <div className="stats-row">
//         <div className="stats-toggle" onClick={() => setShowStats(!showStats)}>
//           {showStats ? <FaChevronDown /> : <FaChevronRight />} Market Summary
//         </div>
//         {showStats && (
//           <div className="stats-container">
//             <div className="stat-card">
//               <div className="stat-label">Price</div>
//               <div className="stat-value">₹{currentPrice.toFixed(2)}</div>
//               <div className="stat-change" style={{ color: priceChangeColor }}>
//                 {priceChangeIcon} {priceChangePct.toFixed(2)}%
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-label">Patterns Detected</div>
//               <div className="stat-value">{totalPatterns}</div>
//               <div className="stat-change">
//                 {data.pattern_markers.length} types
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-label">Timeframe</div>
//               <div className="stat-value">{candleData.length} days</div>
//               <div className="stat-change">
//                 {new Date(data.candlestick.x[0]).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})} - {new Date(data.candlestick.x[data.candlestick.x.length - 1]).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="main-content">
//         <div className="chart-container">
//           <div className="plot-container">
//             <Plot
//               data={plotlyData}
//               layout={plotlyLayout}
//               style={{ width: '100%', height: '100%' }}
//               config={{
//                 responsive: true,
//                 displayModeBar: false,
//                 displaylogo: false,
//                 scrollZoom: true
//               }}
//               onHover={handleHover}
//               onUnhover={handleUnhover}
//               onRelayout={handleRelayout}
//             />
//           </div>
//           <div className="hover-details">
//             {hoverInfo ? (
//               <div className="hover-details-content">
//                 <div className="hover-header">
//                   <span className="hover-date">
//                     {new Date(hoverInfo.x).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}
//                   </span>
//                   <span className="hover-price" style={{ color: hoverInfo.close >= hoverInfo.open ? '#16a34a' : '#dc2626' }}>
//                     ₹{hoverInfo.close.toFixed(2)}
//                   </span>
//                   <span className="hover-change" style={{ 
//                     background: hoverInfo.close > hoverInfo.open ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)',
//                     color: hoverInfo.close > hoverInfo.open ? '#16a34a' : '#dc2626'
//                   }}>
//                     {hoverInfo.close > hoverInfo.open ? (
//                       <FaArrowUp />
//                     ) : (
//                       <FaArrowDown />
//                     )}
//                     {Math.abs(((hoverInfo.close - hoverInfo.open) / hoverInfo.open) * 100).toFixed(2)}%
//                   </span>
//                 </div>
//                 <div className="hover-grid">
//                   <div className="hover-grid-item">
//                     <span>Open:</span>
//                     <span>{hoverInfo.open.toFixed(2)}</span>
//                   </div>
//                   <div className="hover-grid-item">
//                     <span>Close:</span>
//                     <span style={{ color: getCandleColor(hoverInfo) }}>{hoverInfo.close.toFixed(2)}</span>
//                   </div>
//                   <div className="hover-grid-item">
//                     <span>High:</span>
//                     <span>{hoverInfo.high.toFixed(2)}</span>
//                   </div>
//                   <div className="hover-grid-item">
//                     <span>Low:</span>
//                     <span>{hoverInfo.low.toFixed(2)}</span>
//                   </div>
//                   <div className="hover-grid-item">
//                     <span>Volume:</span>
//                     <span>{(hoverInfo.volume / 1000).toFixed(1)}K</span>
//                   </div>
//                 </div>
//                 {hoverInfo.patterns.length > 0 && (
//                   <div className="hover-patterns">
//                     {hoverInfo.patterns.map(p => (
//                       <span
//                         key={p.name}
//                         className="pattern-tag"
//                         style={{ borderColor: p.color }}
//                       >
//                         {p.name}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="hover-details-content">
//                 <div className="hover-header skeleton">
//                   <span className="hover-date skeleton-item"></span>
//                   <span className="hover-price skeleton-item"></span>
//                   <span className="hover-change skeleton-item"></span>
//                 </div>
//                 <div className="hover-grid">
//                   {['Open', 'Close', 'High', 'Low', 'Volume'].map((label, index) => (
//                     <div key={index} className="hover-grid-item skeleton">
//                       <span className="skeleton-item"></span>
//                       <span className="skeleton-item"></span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         {isPatternPanelOpen && (
//           <div className="pattern-panel">
//             <div className="pattern-panel-header">
//               <h3>Detected Patterns</h3>
//               <div className="pattern-count">
//                 {selectedPatterns.length} of {data.pattern_markers.length} selected
//               </div>
//             </div>
//             <div className="pattern-controls">
//               <button onClick={() => setSelectedPatterns(data.pattern_markers.map(trace => trace.name))}>
//                 Select All
//               </button>
//               <button onClick={() => setSelectedPatterns([])}>
//                 Clear All
//               </button>
//             </div>
//             <div className="pattern-grid">
//               {data.pattern_markers.map((pattern, index) => (
//                 <div
//                   key={index}
//                   className={`pattern-card ${selectedPatterns.includes(pattern.name) ? 'selected' : ''} ${activePattern === pattern.name ? 'active' : ''}`}
//                   style={{
//                     borderColor: pattern.marker.color,
//                     backgroundColor: selectedPatterns.includes(pattern.name) ? `${pattern.marker.color}26` : '#f9fafb'
//                   }}
//                   onClick={() => {
//                     setActivePattern(activePattern === pattern.name ? null : pattern.name);
//                     setSelectedPatterns(prev =>
//                       prev.includes(pattern.name)
//                         ? prev.filter(p => p !== pattern.name)
//                         : [...prev, pattern.name]
//                     );
//                   }}
//                   onMouseEnter={() => setActivePattern(pattern.name)}
//                   onMouseLeave={() => setActivePattern(null)}
//                 >
//                   <div 
//                     className="pattern-icon"
//                     style={{ 
//                       backgroundColor: pattern.marker.color,
//                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${getSymbolPath(PATTERN_SYMBOLS[pattern.name] || 'circle')}' fill='white'/%3E%3C/svg%3E")`
//                     }}
//                   ></div>
//                   <div className="pattern-name">{pattern.name}</div>
//                   <div className="pattern-count">{pattern.x.length}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//       .dashboard-container {
//           max-width: 100%;
//           width: 100%;
//           height: 100vh;
//           padding: 8px;
//           box-sizing: border-box;
//           font-family: 'Inter', 'Segoe UI', sans-serif;
//           background: rgba(255, 255, 255, 0.9);
//           display: flex;
//           flex-direction: column;
//           overflow: hidden;
//         }

//         .dashboard-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 6px 8px;
//           margin-bottom: 4px;
//           flex-shrink: 0;
//         }

//         .header-left {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .header-icon {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           width: 32px;
//           height: 32px;
//           background: linear-gradient(135deg, #4361ee 0%, #2a44c4 100%);
//           border-radius: 6px;
//           color: white;
//           font-size: 1rem;
//         }

//         .dashboard-header h2 {
//           font-size: 1rem;
//           font-weight: 700;
//           color: #212529;
//           margin: 0;
//         }

//         .dashboard-header p {
//           font-size: 0.75rem;
//           color: #6c757d;
//           margin: 0;
//         }

//         .header-controls {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//         }

//         .date-range-selector {
//           display: flex;
//           align-items: center;
//           background: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 4px;
//           padding: 3px;
//           margin-right: 6px;
//         }

//         .date-range-selector svg {
//           color: #adb5bd;
//           margin-right: 4px;
//           font-size: 0.8rem;
//         }

//         .date-range-selector button {
//           padding: 3px 6px;
//           border: none;
//           border-radius: 3px;
//           color: #6c757d;
//           font-weight: 500;
//           font-size: 0.7rem;
//           cursor: pointer;
//           background: transparent;
//         }

//         .date-range-selector button.active {
//           background: #4361ee;
//           color: white;
//         }

//         .pattern-toggle {
//           padding: 4px 8px;
//           background: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 4px;
//           color: #6c757d;
//           font-weight: 600;
//           font-size: 0.75rem;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .pattern-toggle.active {
//           background: #4361ee;
//           color: white;
//           border-color: #4361ee;
//         }

//         .stats-row {
//           margin: 0 8px 4px;
//           flex-shrink: 0;
//         }

//         .stats-toggle {
//           font-size: 0.8rem;
//           font-weight: 600;
//           color: #64748b;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           padding: 3px 0;
//         }

//         .stats-container {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 6px;
//           margin-top: 3px;
//         }

//         .stat-card {
//           background: white;
//           border-radius: 4px;
//           padding: 6px;
//           box-shadow: 0 1px 2px rgba(0,0,0,0.05);
//           border: 1px solid #edf2f7;
//           display: flex;
//           flex-direction: row;
//         }

//         .stat-label {
//           font-size: 0.7rem;
//           color: #6c757d;
//           margin-bottom: 3px;
//           font-weight: 500;
//           padding: 4px;
//           margin-right: 8px;
//         }

//         .stat-value {
//           font-size: 1rem;
//           font-weight: 700;
//           color: #212529;
//           margin-bottom: 3px;
//         }

//         .stat-change {
//           font-size: 0.7rem;
//           font-weight: 600;
//           display: flex;
//           align-items: center;
//           gap: 2px;
//           padding-left: 80px;
//         }

//         .main-content {
//           display: flex;
//           flex: 1;
//           overflow: hidden;
//           position: relative;
//         }

//       .chart-container {
//           flex: 1;
//           display: flex;
//           position: relative;
//           overflow: hidden;
//         }

//       .plot-container {
//           flex: 1;
//           border-radius: 4px;
//           overflow: hidden;
//           border: 1px solid #e2e8f0;
//         }

//       .hover-details {
//           width: 120px;
//           background: white;
//           border: 1px solid #e2e8f0;
//           border-radius: 4px;
//           padding: 6px;
//           position: absolute;
//           right: 0;
//           top: 0;
//           bottom: 0;
//           display: flex;
//           flex-direction: column;
//           z-index: 10;
//         }

//         .hover-details-content {
//           height: 100%;
//           display: flex;
//           flex-direction: column;
//         }

//         .hover-header {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-bottom: 4px;
//           padding-bottom: 4px;
//           border-bottom: 1px solid #f1f5f9;
//         }

//         .hover-header.skeleton .skeleton-item {
//           background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
//           background-size: 200% 100%;
//           animation: skeleton-loading 1.5s infinite;
//           border-radius: 3px;
//         }

//         .hover-header.skeleton .skeleton-item:first-child {
//           width: 80px;
//           height: 12px;
//           margin-bottom: 4px;
//         }

//         .hover-header.skeleton .skeleton-item:nth-child(2) {
//           width: 60px;
//           height: 12px;
//           margin-bottom: 4px;
//         }

//         .hover-header.skeleton .skeleton-item:last-child {
//           width: 50px;
//           height: 10px;
//         }

//         .hover-date {
//           font-size: 0.8rem;
//           color: #64748b;
//           font-weight: 500;
//         }

//         .hover-price {
//           font-size: 0.8rem;
//           font-weight: 600;
//         }

//         .hover-change {
//           font-size: 0.7rem;
//           padding: 2px 4px;
//           border-radius: 3px;
//           font-weight: 500;
//           display: flex;
//           align-items: center;
//           gap: 3px;
//         }

//         .hover-grid {
//           display: flex;
//           flex-direction: column;
//           gap: 3px;
//           margin-bottom: 4px;
//           flex: 1;
//         }

//         .hover-grid-item {
//           background: #f1f5f9;
//           border-radius: 3px;
//           padding: 4px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//         }

//         .hover-grid-item.skeleton span {
//           background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
//           background-size: 200% 100%;
//           animation: skeleton-loading 1.5s infinite;
//           border-radius: 3px;
//         }

//         .hover-grid-item.skeleton span:first-child {
//           width: 50px;
//           height: 10px;
//           margin-bottom: 2px;
//         }

//         .hover-grid-item.skeleton span:last-child {
//           width: 40px;
//           height: 10px;
//         }

//         .hover-grid-item span:first-child {
//           font-size: 0.6rem;
//           font-weight: 600;
//           color: #5b697c;
//           margin-bottom: 2px;
//         }

//         .hover-grid-item span:last-child {
//           font-size: 0.7rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         .hover-patterns {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 3px;
//           margin-top: auto;
//         }

//         .pattern-tag {
//           font-size: 0.6rem;
//           font-weight: 600;
//           padding: 2px 4px;
//           border-radius: 3px;
//           background: rgba(99, 102, 241, 0.1);
//           display: flex;
//           gap: 3px;
//         }

//         .pattern-panel {
//             width: 180px;
//             background: white;
//             border-radius: 6px;
//             box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//             border: 1px solid #e2e8f0;
//             display: flex;
//             flex-direction: column;
//             overflow: hidden;
//             position: absolute;
//             right: 160px;
//             top: 0;
//             bottom: 0;
//             z-index: 5;
//           }

//         .pattern-panel-header {
//           padding: 6px 8px;
//           background: linear-gradient(120deg, #4361ee 0%, #3a56e4 100%);
//           border-bottom: 1px solid rgba(226, 232, 240, 0.5);
//           color: white;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .pattern-panel-header h3 {
//           font-size: 0.9rem;
//           font-weight: 700;
//           margin: 0;
//         }

//         .pattern-count {
//           background: #f0f4fe;
//           color: #2a44c4;
//           padding: 3px 6px;
//           border-radius: 10px;
//           font-size: 0.7rem;
//           font-weight: 600;
//         }

//         .pattern-controls {
//           padding: 4px 8px;
//           display: flex;
//           gap: 4px;
//           background: #f9fafb;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .pattern-controls button {
//           flex: 1;
//           padding: 4px;
//           background: white;
//           border: 1px solid #dee2e6;
//           border-radius: 3px;
//           color: #495057;
//           font-weight: 600;
//           font-size: 0.7rem;
//           cursor: pointer;
//         }

//         .pattern-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 6px;
//           padding: 6px;
//           overflow-y: auto;
//           flex: 1;
//         }

//         .pattern-card {
//           border-radius: 4px;
//           padding: 6px;
//           font-size: 0.6rem;
//           cursor: pointer;
//           position: relative;
//           overflow: hidden;
//           border: 1px solid;
//           transition: all 0.2s;
//         }

//         .pattern-card.selected {
//           box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
//         }

//         .pattern-card.active {
//           transform: scale(1.02);
//         }

//         .pattern-icon {
//           width: 20px;
//           height: 20px;
//           border-radius: 3px;
//           background-size: 60%;
//           background-repeat: no-repeat;
//           background-position: center;
//           margin: 0 auto 4px;
//           border: 1px solid rgba(0, 0, 0, 0.1);
//         }

//         .pattern-name {
//           font-weight: 700;
//           color: #212529;
//           text-align: center;
//           margin-bottom: 3px;
//           line-height: 1.2;
//           font-size: 0.6rem;
//         }

//         .pattern-count {
//           font-size: 0.6rem;
//           color: #495057;
//           background: #f8f9fa;
//           padding: 2px 4px;
//           border-radius: 6px;
//           text-align: center;
//         }

//         .loading-container {
//           width: 100%;
//           height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           font-family: 'Inter', sans-serif;
//         }

//         .loading-spinner {
//           width: 32px;
//           height: 32px;
//           border: 3px solid rgba(67, 97, 238, 0.2);
//           border-top: 3px solid #4361ee;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 0.8rem;
//         }

//         .loading-text {
//           font-size: 0.9rem;
//           font-weight: 500;
//           color: #495057;
//         }

//         .error-container {
//           width: 100%;
//           height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           font-family: 'Inter', sans-serif;
//           padding: 16px;
//         }

//         .error-icon {
//           font-size: 2rem;
//           color: #ced4da;
//           margin-bottom: 0.8rem;
//         }

//         .error-container h3 {
//           font-size: 1.1rem;
//           margin-bottom: 0.4rem;
//           color: #343a40;
//         }

//         .error-container p {
//           color: #6c757d;
//           max-width: 400px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @keyframes skeleton-loading {
//           0% { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }
//       `}</style>
//     </div>
//   );
// }

// function getSymbolPath(symbol) {
//   const paths = {
//     'circle': 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z',
//     'square': 'M20,20 L80,20 L80,80 L20,80 Z',
//     'diamond': 'M50,20 L80,50 L50,80 L20,50 Z',
//     'cross': 'M30,30 L70,70 M70,30 L30,70',
//     'x': 'M30,30 L70,70 M70,30 L30,70',
//     'triangle-up': 'M50,20 L80,80 L20,80 Z',
//     'triangle-down': 'M50,80 L20,20 L80,20 Z',
//     'pentagon': 'M50,10 L80,40 L65,80 L35,80 L20,40 Z',
//     'hexagon': 'M30,50 L50,20 L70,50 L70,80 L50,110 L30,80 Z',
//     'star': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z',
//     'hexagram': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z M50,90 L39,60 L5,60 L32,40 L21,10 L50,30 L79,10 L68,40 L95,60 L61,60 Z',
//     'bowtie': 'M30,30 L70,30 L30,70 L70,70 Z',
//     'hourglass': 'M30,30 L70,30 L50,50 L70,70 L30,70 L50,50 Z'
//   };
//   return paths[symbol] || paths['circle'];
// }


import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { FaChartLine, FaFilter, FaInfoCircle, FaCaretUp, FaCaretDown, FaCalendarAlt, FaArrowUp, FaArrowDown, FaChevronDown, FaChevronRight, FaExpand } from 'react-icons/fa';

// Pattern symbols mapping
const PATTERN_SYMBOLS = {
  'Hammer': 'circle',
  'Engulfing': 'square',
  'Doji': 'diamond',
  'Harami': 'cross',
  'Shooting Star': 'x',
  'Morning Star': 'triangle-up',
  'Evening Star': 'triangle-down',
  'Piercing': 'pentagon',
  'Dark Cloud': 'hexagon',
  'Three White Soldiers': 'star',
  'Three Black Crows': 'hexagram',
  'Hanging Man': 'bowtie',
  'Inverted Hammer': 'hourglass'
};

export default function CandlePatternPlot({ symbol }) {
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [activePattern, setActivePattern] = useState(null);
  const [isPatternPanelOpen, setIsPatternPanelOpen] = useState(false);
  const [isPatternPanelExpanded, setIsPatternPanelExpanded] = useState(false);
  const [dateRange, setDateRange] = useState('3M');
  const [hoverInfo, setHoverInfo] = useState(null);
  const [visibleRange, setVisibleRange] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isHoveringPlot, setIsHoveringPlot] = useState(false);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/candle-patterns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setError(json.error);
          setLoading(false);
          return;
        }
        if (!json.candlestick || !Array.isArray(json.candlestick.x)) {
          setError('Invalid data format: candlestick data missing or invalid');
          setLoading(false);
          return;
        }
        setRaw(json);
        const patterns = [...new Set(json.pattern_markers?.map(trace => trace.name) || [])];
        setSelectedPatterns(patterns);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data from the server');
        setLoading(false);
      });
  }, [symbol]);

  const today = new Date();
  const dateRanges = useMemo(() => {
    if (!raw || !raw.candlestick || !Array.isArray(raw.candlestick.x)) return {};
    const allDates = raw.candlestick.x.map(d => new Date(d));
    const minDate = new Date(Math.min(...allDates));
    return {
      '1M': new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
      '3M': new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()),
      '6M': new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()),
      '1Y': new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
      'All': minDate
    };
  }, [raw]);

  const filteredData = raw;

  if (loading || !raw) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Analyzing candle patterns...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaInfoCircle className="error-icon" />
        <h3>Data Unavailable</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!raw.candlestick || !Array.isArray(raw.candlestick.x) || !raw.candlestick.x.length) {
    return (
      <div className="error-container">
        <FaInfoCircle className="error-icon" />
        <h3>No Data Available</h3>
        <p>No valid candlestick data available</p>
      </div>
    );
  }

  const data = filteredData || raw;
  const currentPrice = data.candlestick.close[data.candlestick.close.length - 1] || 0;
  const initialPrice = data.candlestick.close[0] || 1;
  const priceChangePct = initialPrice !== 0 ? ((currentPrice - initialPrice) / initialPrice) * 100 : 0;
  const totalPatterns = data.pattern_markers.reduce((sum, trace) => sum + (trace.x?.length || 0), 0);
  const priceChangeColor = priceChangePct >= 0 ? '#10B981' : '#EF4444';
  const priceChangeIcon = priceChangePct >= 0 ? <FaCaretUp /> : <FaCaretDown />;

  const patternsByDate = {};
  data.pattern_markers.forEach(patternTrace => {
    patternTrace.x.forEach((date, i) => {
      if (!patternsByDate[date]) patternsByDate[date] = [];
      patternsByDate[date].push({
        name: patternTrace.name,
        color: patternTrace.marker.color,
        hovertext: patternTrace.hovertext[i]
      });
    });
  });

  const candleData = data.candlestick.x
    .map((date, i) => ({
      x: date,
      open: Number(data.candlestick.open[i]),
      high: Number(data.candlestick.high[i]),
      low: Number(data.candlestick.low[i]),
      close: Number(data.candlestick.close[i]),
      volume: Number(data.volume.y[i]),
      patterns: patternsByDate[date] || [],
    }))
    .filter(d =>
      d.x &&
      !isNaN(d.open) && !isNaN(d.high) &&
      !isNaN(d.low) && !isNaN(d.close) &&
      !isNaN(d.volume)
    );

  if (!candleData.length) {
    return (
      <div className="error-container">
        <FaInfoCircle className="error-icon" />
        <h3>Invalid Data</h3>
        <p>Candlestick data contains invalid values for {symbol}.</p>
      </div>
    );
  }

  const patternTraces = data.pattern_markers
    .filter(pattern => selectedPatterns.includes(pattern.name))
    .map(pattern => {
      const patternPoints = pattern.x.map((date, i) => {
        const candleIndex = candleData.findIndex(d => d.x === date);
        if (candleIndex === -1) return null;
        const candle = candleData[candleIndex];
        return {
          x: date,
          y: candle.high * 1.02,
          pattern: pattern.name,
          color: pattern.marker.color,
          hovertext: pattern.hovertext?.[i] || `Pattern: ${pattern.name}`
        };
      }).filter(Boolean);
      return {
        type: 'scatter',
        mode: 'markers',
        name: pattern.name,
        x: patternPoints.map(p => p.x),
        y: patternPoints.map(p => p.y),
        hoverinfo: 'text',
        text: patternPoints.map(p => p.hovertext),
        marker: {
          symbol: PATTERN_SYMBOLS[pattern.name] || 'circle',
          color: pattern.marker.color,
          size: 12,
          line: { width: 1, color: pattern.marker.color }
        },
        showlegend: true
      };
    });

  const volumeData = candleData.map(d => ({
    x: d.x,
    y: d.volume,
    hovertext: `Volume: ${d.volume.toLocaleString('en-IN')}`,
    color: d.close >= d.open ? '#10B981' : '#EF4444',
  }));

  const minPrice = Math.min(...candleData.map(d => d.low)) * 0.95;
  const maxPrice = Math.max(...candleData.map(d => d.high)) * 1.05;
  const minDate = new Date(Math.min(...raw.candlestick.x.map(d => new Date(d))));
  const maxDate = new Date(Math.max(...raw.candlestick.x.map(d => new Date(d))));

  const plotlyData = [
    {
      type: 'candlestick',
      name: symbol,
      x: candleData.map(d => d.x),
      open: candleData.map(d => d.open),
      high: candleData.map(d => d.high),
      low: candleData.map(d => d.low),
      close: candleData.map(d => d.close),
      increasing: { line: { color: '#10B981' }, fillcolor: 'rgba(16, 185, 129, 0.3)' },
      decreasing: { line: { color: '#EF4444' }, fillcolor: 'rgba(239, 68, 68, 0.3)' },
      hoverinfo: 'none'
    },
    ...patternTraces,
    {
      type: 'bar',
      name: 'Volume',
      x: volumeData.map(d => d.x),
      y: volumeData.map(d => d.y),
      marker: { color: volumeData.map(d => d.color), opacity: 0.6 },
      yaxis: 'y2',
      hoverinfo: 'text',
      text: volumeData.map(d => d.hovertext),
    }
  ];

  const plotlyLayout = {
    dragmode: 'pan',
    title: { text: `${symbol} Candlestick Chart`, font: { size: 16, color: '#1e293b', family: 'Inter, sans-serif' }, x: 0.05, y: 0.98 },
    xaxis: {
      type: 'date',
      autorange: false,
      range: [
        new Date(dateRanges[dateRange]).toISOString(),
        today.toISOString()
      ],
      rangebreaks: [
        { bounds: [null, minDate.toISOString()], pattern: 'day' },
        { bounds: [maxDate.toISOString(), null], pattern: 'day' },
        { bounds: ["sat", "mon"], pattern: 'day' }
      ],
      min: minDate.toISOString(),
      max: maxDate.toISOString(),
      tickformat: '%b %d',
      tickformatstops: [
        { dtickrange: [null, 86400000], value: '%b %d' },
        { dtickrange: [86400000, 2592000000], value: '%b %d' },
        { dtickrange: [2592000000, null], value: '%b %Y' }
      ],
      nticks: Math.ceil(candleData.length / 5),
      rangeslider: { visible: false },
      gridcolor: '#f1f5f9',
      linecolor: '#cbd5e1',
      showline: true,
      zeroline: false,
      showgrid: true,
      tickfont: { size: 10, color: '#64748b' },
      title: { text: 'Date', font: { size: 12, color: '#64748b' } },
      tickmode: 'auto',
      showspikes: true,
      spikecolor: '#94a3b8',
      spikethickness: 1,
      spikedash: 'dot'
    },
    yaxis: {
      title: { text: 'Price (₹)', font: { size: 12, color: '#64748b' } },
      range: [minPrice, maxPrice],
      gridcolor: '#f1f5f9',
      linecolor: '#cbd5e1',
      showline: true,
      zeroline: false,
      showgrid: true,
      tickfont: { size: 10, color: '#64748b' },
      tickformat: '₹.2f',
      showspikes: true,
      spikecolor: '#94a3b8',
      spikethickness: 1,
      spikedash: 'dot',
      domain: [0.25, 1],
      nticks: 5
    },
    yaxis2: {
      title: { text: 'Volume', font: { size: 12, color: '#64748b' } },
      gridcolor: '#f1f5f9',
      showgrid: false,
      showticklabels: true,
      tickfont: { size: 9, color: '#64748b' },
      domain: [0, 0.15]
    },
    margin: { l: 50, r: isHoveringPlot ? 150 : 30, t: 40, b: 40 },
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: 0,
      bgcolor: 'rgba(255,255,255,0.7)',
      bordercolor: '#e2e8f0',
      borderwidth: 1,
      font: { size: 12, color: '#334155' }
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(255,255,255,0.8)',
    hovermode: 'x unified',
    uirevision: 'true'
  };

  const handleHover = (data) => {
    setIsHoveringPlot(true);
    if (data.points && data.points[0]) {
      const point = data.points[0];
      const hoveredDate = point.x;
      const candle = candleData.find(d => d.x === hoveredDate);
      if (candle) {
        setHoverInfo(candle);
      }
    }
  };

  const handleUnhover = () => {
    setIsHoveringPlot(false);
    setHoverInfo(null);
  };

  const getCandleColor = (hover) => {
    if (!hover) return '';
    return hover.close > hover.open ? '#16a34a' : '#dc2626';
  };

  const handleRelayout = (event) => {
    if (event['xaxis.range[0]'] && event['xaxis.range[1]']) {
      const start = new Date(event['xaxis.range[0]']);
      const end = new Date(event['xaxis.range[1]']);
      setVisibleRange({
        start: start < minDate ? minDate : start,
        end: end > maxDate ? maxDate : end
      });
    } else if (event['xaxis.range'] && event['xaxis.range'].length === 2) {
      const start = new Date(event['xaxis.range'][0]);
      const end = new Date(event['xaxis.range'][1]);
      setVisibleRange({
        start: start < minDate ? minDate : start,
        end: end > maxDate ? maxDate : end
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <div className="header-icon">
            <FaChartLine />
          </div>
          <div>
            <h2>Professional Candlestick Analysis</h2>
            <p>Advanced pattern detection for {symbol}</p>
          </div>
        </div>
        <div className="header-controls">
          <div className="date-range-selector">
            <FaCalendarAlt />
            {['1M', '3M', '6M', '1Y', 'All'].map(range => (
              <button
                key={range}
                className={dateRange === range ? 'active' : ''}
                onClick={() => setDateRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            className={`pattern-toggle ${isPatternPanelOpen ? 'active' : ''}`}
            onClick={() => setIsPatternPanelOpen(!isPatternPanelOpen)}
          >
            <FaFilter /> {isPatternPanelOpen ? 'Hide Patterns' : 'Show Patterns'}
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stats-toggle" onClick={() => setShowStats(!showStats)}>
          {showStats ? <FaChevronDown /> : <FaChevronRight />} Market Summary
        </div>
        {showStats && (
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Price</div>
              <div className="stat-value">₹{currentPrice.toFixed(2)}</div>
              <div className="stat-change" style={{ color: priceChangeColor }}>
                {priceChangeIcon} {priceChangePct.toFixed(2)}%
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Patterns Detected</div>
              <div className="stat-value">{totalPatterns}</div>
              <div className="stat-change">
                {data.pattern_markers.length} types
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Timeframe</div>
              <div className="stat-value">{candleData.length} days</div>
              <div className="stat-change">
                {new Date(data.candlestick.x[0]).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(data.candlestick.x[data.candlestick.x.length - 1]).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="chart-container">
          <div className="plot-container" onMouseEnter={() => setIsHoveringPlot(true)} onMouseLeave={() => setIsHoveringPlot(false)}>
            <Plot
              data={plotlyData}
              layout={plotlyLayout}
              style={{ width: '100%', height: '100%' }}
              config={{
                responsive: true,
                displayModeBar: false,
                displaylogo: false,
                scrollZoom: true
              }}
              onHover={handleHover}
              onUnhover={handleUnhover}
              onRelayout={handleRelayout}
            />
            {isHoveringPlot && (
              <div className="hover-details">
                {hoverInfo ? (
                  <div className="hover-details-content">
                    <div className="hover-header">
                      <span className="hover-date">
                        {new Date(hoverInfo.x).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span className="hover-price" style={{ color: hoverInfo.close >= hoverInfo.open ? '#16a34a' : '#dc2626' }}>
                        ₹{hoverInfo.close.toFixed(2)}
                      </span>
                      <span className="hover-change" style={{
                        background: hoverInfo.close > hoverInfo.open ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)',
                        color: hoverInfo.close > hoverInfo.open ? '#16a34a' : '#dc2626'
                      }}>
                        {hoverInfo.close > hoverInfo.open ? (
                          <FaArrowUp />
                        ) : (
                          <FaArrowDown />
                        )}
                        {Math.abs(((hoverInfo.close - hoverInfo.open) / hoverInfo.open) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="hover-grid">
                      <div className="hover-grid-item">
                        <span>Open:</span>
                        <span>{hoverInfo.open.toFixed(2)}</span>
                      </div>
                      <div className="hover-grid-item">
                        <span>Close:</span>
                        <span style={{ color: getCandleColor(hoverInfo) }}>{hoverInfo.close.toFixed(2)}</span>
                      </div>
                      <div className="hover-grid-item">
                        <span>High:</span>
                        <span>{hoverInfo.high.toFixed(2)}</span>
                      </div>
                      <div className="hover-grid-item">
                        <span>Low:</span>
                        <span>{hoverInfo.low.toFixed(2)}</span>
                      </div>
                      <div className="hover-grid-item">
                        <span>Volume:</span>
                        <span>{(hoverInfo.volume / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                    {hoverInfo.patterns.length > 0 && (
                      <div className="hover-patterns">
                        {hoverInfo.patterns.map(p => (
                          <span
                            key={p.name}
                            className="pattern-tag"
                            style={{ borderColor: p.color }}
                          >
                            {p.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="hover-details-content">
                    <div className="hover-header skeleton">
                      <span className="hover-date skeleton-item"></span>
                      <span className="hover-price skeleton-item"></span>
                      <span className="hover-change skeleton-item"></span>
                    </div>
                    <div className="hover-grid">
                      {['Open', 'Close', 'High', 'Low', 'Volume'].map((label, index) => (
                        <div key={index} className="hover-grid-item skeleton">
                          <span className="skeleton-item"></span>
                          <span className="skeleton-item"></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {isPatternPanelOpen && (
          <div className={`pattern-panel ${isPatternPanelExpanded ? 'expanded' : ''}`}>
            <div className="pattern-panel-header">
              <h3>Detected Patterns</h3>
              <div className="pattern-panel-controls">
                <div className="pattern-count">
                  {selectedPatterns.length} of {data.pattern_markers.length} selected
                </div>
                <button
                  className="expand-button"
                  onClick={() => setIsPatternPanelExpanded(!isPatternPanelExpanded)}
                  title={isPatternPanelExpanded ? 'Collapse' : 'Expand'}
                >
                  <FaExpand />
                </button>
              </div>
            </div>
            <div className="pattern-controls">
              <button onClick={() => setSelectedPatterns(data.pattern_markers.map(trace => trace.name))}>
                Select All
              </button>
              <button onClick={() => setSelectedPatterns([])}>
                Clear All
              </button>
            </div>
            <div className="pattern-grid">
              {data.pattern_markers.map((pattern, index) => (
                <div
                  key={index}
                  className={`pattern-card ${selectedPatterns.includes(pattern.name) ? 'selected' : ''} ${activePattern === pattern.name ? 'active' : ''}`}
                  style={{
                    borderColor: pattern.marker.color,
                    backgroundColor: selectedPatterns.includes(pattern.name) ? `${pattern.marker.color}26` : '#f9fafb'
                  }}
                  onClick={() => {
                    setActivePattern(activePattern === pattern.name ? null : pattern.name);
                    setSelectedPatterns(prev =>
                      prev.includes(pattern.name)
                        ? prev.filter(p => p !== pattern.name)
                        : [...prev, pattern.name]
                    );
                  }}
                  onMouseEnter={() => setActivePattern(pattern.name)}
                  onMouseLeave={() => setActivePattern(null)}
                >
                  <div
                    className="pattern-icon"
                    style={{
                      backgroundColor: pattern.marker.color,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='${getSymbolPath(PATTERN_SYMBOLS[pattern.name] || 'circle')}' fill='white'/%3E%3C/svg%3E")`
                    }}
                  ></div>
                  <div className="pattern-name">{pattern.name}</div>
                  <div className="pattern-count">{pattern.x.length}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 100%;
          width: 100%;
          height: 100vh;
          padding: 8px;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 8px;
          margin-bottom: 4px;
          flex-shrink: 0;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .header-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #4361ee 0%, #2a44c4 100%);
          border-radius: 6px;
          color: white;
          font-size: 1rem;
        }

        .dashboard-header h2 {
          font-size: 1rem;
          font-weight: 700;
          color: #212529;
          margin: 0;
        }

        .dashboard-header p {
          font-size: 0.75rem;
          color: #6c757d;
          margin: 0;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .date-range-selector {
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 3px;
          margin-right: 6px;
        }

        .date-range-selector svg {
          color: #adb5bd;
          margin-right: 4px;
          font-size: 0.8rem;
        }

        .date-range-selector button {
          padding: 3px 6px;
          border: none;
          border-radius: 3px;
          color: #6c757d;
          font-weight: 500;
          font-size: 0.7rem;
          cursor: pointer;
          background: transparent;
        }

        .date-range-selector button.active {
          background: #4361ee;
          color: white;
        }

        .pattern-toggle {
          padding: 4px 8px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          color: #6c757d;
          font-weight: 600;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pattern-toggle.active {
          background: #4361ee;
          color: white;
          border-color: #4361ee;
        }

        .stats-row {
          margin: 0 8px 4px;
          flex-shrink: 0;
        }

        .stats-toggle {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 3px 0;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 3px;
        }

        .stat-card {
          background: white;
          border-radius: 4px;
          padding: 6px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
          display: flex;
          flex-direction: row;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #6c757d;
          margin-bottom: 3px;
          font-weight: 500;
          padding: 4px;
          margin-right: 8px;
        }

        .stat-value {
          font-size: 1rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 3px;
        }

        .stat-change {
          font-size: 0.7rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 2px;
          padding-left: 80px;
        }

        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        .chart-container {
          flex: 1;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .plot-container {
          flex: 1;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          position: relative;
        }

        .hover-details {
          width: 120px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          padding: 6px;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 10;
          transition: opacity 0.3s ease;
          opacity: 1;
        }

        .hover-details-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .hover-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 4px;
          padding-bottom: 4px;
          border-bottom: 1px solid #f1f5f9;
        }

        .hover-header.skeleton .skeleton-item {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 3px;
        }

        .hover-header.skeleton .skeleton-item:first-child {
          width: 80px;
          height: 12px;
          margin-bottom: 4px;
        }

        .hover-header.skeleton .skeleton-item:nth-child(2) {
          width: 60px;
          height: 12px;
          margin-bottom: 4px;
        }

        .hover-header.skeleton .skeleton-item:last-child {
          width: 50px;
          height: 10px;
        }

        .hover-date {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 500;
        }

        .hover-price {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .hover-change {
          font-size: 0.7rem;
          padding: 2px 4px;
          border-radius: 3px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .hover-grid {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 4px;
          flex: 1;
        }

        .hover-grid-item {
          background: #f1f5f9;
          border-radius: 3px;
          padding: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hover-grid-item.skeleton span {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 3px;
        }

        .hover-grid-item.skeleton span:first-child {
          width: 50px;
          height: 10px;
          margin-bottom: 2px;
        }

        .hover-grid-item.skeleton span:last-child {
          width: 40px;
          height: 10px;
        }

        .hover-grid-item span:first-child {
          font-size: 0.6rem;
          font-weight: 600;
          color: #5b697c;
          margin-bottom: 2px;
        }

        .hover-grid-item span:last-child {
          font-size: 0.7rem;
          font-weight: 600;
          color: #1e293b;
        }

        .hover-patterns {
          display: flex;
          flex-wrap: wrap;
          gap: 3px;
          margin-top: auto;
        }

        .pattern-tag {
          font-size: 0.6rem;
          font-weight: 600;
          padding: 2px 4px;
          border-radius: 3px;
          background: rgba(99, 102, 241, 0.1);
          display: flex;
          gap: 3px;
        }

        .pattern-panel {
          width: 180px;
          background: white;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: absolute;
          right: 160px;
          top: 0;
          bottom: 0;
          z-index: 5;
          transition: width 0.3s ease;
        }

        .pattern-panel.expanded {
          width: 300px;
        }

        .pattern-panel-header {
          padding: 6px 8px;
          background: linear-gradient(120deg, #4361ee 0%, #3a56e4 100%);
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pattern-panel-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .expand-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .expand-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .pattern-panel-header h3 {
          font-size: 0.9rem;
          font-weight: 700;
          margin: 0;
        }

        .pattern-count {
          background: #f0f4fe;
          color: #2a44c4;
          padding: 3px 6px;
          border-radius: 10px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .pattern-controls {
          padding: 4px 8px;
          display: flex;
          gap: 4px;
          background: #f9fafb;
          border-bottom: 1px solid #e2e8f0;
        }

        .pattern-controls button {
          flex: 1;
          padding: 4px;
          background: white;
          border: 1px solid #dee2e6;
          border-radius: 3px;
          color: #495057;
          font-weight: 600;
          font-size: 0.7rem;
          cursor: pointer;
        }

        .pattern-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 6px;
          padding: 6px;
          overflow-y: auto;
          flex: 1;
        }

        .pattern-panel.expanded .pattern-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        .pattern-card {
          border-radius: 4px;
          padding: 6px;
          font-size: 0.6rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid;
          transition: all 0.2s;
        }

        .pattern-card.selected {
          box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.2);
        }

        .pattern-card.active {
          transform: scale(1.02);
        }

        .pattern-icon {
          width: 20px;
          height: 20px;
          border-radius: 3px;
          background-size: 60%;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0 auto 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .pattern-name {
          font-weight: 700;
          color: #212529;
          text-align: center;
          margin-bottom: 3px;
          line-height: 1.2;
          font-size: 0.6rem;
        }

        .pattern-count {
          font-size: 0.6rem;
          color: #495057;
          background: #f8f9fa;
          padding: 2px 4px;
          border-radius: 6px;
          text-align: center;
        }

        .loading-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(67, 97, 238, 0.2);
          border-top: 3px solid #4361ee;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 0.8rem;
        }

        .loading-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: #495057;
        }

        .error-container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-family: 'Inter', sans-serif;
          padding: 16px;
        }

        .error-icon {
          font-size: 2rem;
          color: #ced4da;
          margin-bottom: 0.8rem;
        }

        .error-container h3 {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
          color: #343a40;
        }

        .error-container p {
          color: #6c757d;
          max-width: 400px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

function getSymbolPath(symbol) {
  const paths = {
    'circle': 'M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10 Z',
    'square': 'M20,20 L80,20 L80,80 L20,80 Z',
    'diamond': 'M50,20 L80,50 L50,80 L20,50 Z',
    'cross': 'M30,30 L70,70 M70,30 L30,70',
    'x': 'M30,30 L70,70 M70,30 L30,70',
    'triangle-up': 'M50,20 L80,80 L20,80 Z',
    'triangle-down': 'M50,80 L20,20 L80,20 Z',
    'pentagon': 'M50,10 L80,40 L65,80 L35,80 L20,40 Z',
    'hexagon': 'M30,50 L50,20 L70,50 L70,80 L50,110 L30,80 Z',
    'star': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z',
    'hexagram': 'M50,10 L61,40 L95,40 L68,60 L79,90 L50,70 L21,90 L32,60 L5,40 L39,40 Z M50,90 L39,60 L5,60 L32,40 L21,10 L50,30 L79,10 L68,40 L95,60 L61,60 Z',
    'bowtie': 'M30,30 L70,30 L30,70 L70,70 Z',
    'hourglass': 'M30,30 L70,30 L50,50 L70,70 L30,70 L50,50 Z'
  };
  return paths[symbol] || paths['circle'];
}