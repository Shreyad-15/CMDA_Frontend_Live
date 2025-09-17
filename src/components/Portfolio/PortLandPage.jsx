// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { RiBankLine, RiBarChartLine, RiErrorWarningLine, RiFileDownloadLine, RiFileTextLine, RiFolderUploadLine, RiUploadCloudLine } from "react-icons/ri";
// import GraphSlider from "./GraphSlider";
// import { YearFilterProvider } from "./context/YearFilterContext";
// import { GraphDataProvider } from "./GraphDataContext"; // Import the provider
// import JwtUtil from "../../services/JwtUtil";
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { IoClose } from "react-icons/io5";
// import { HashLoader } from "react-spinners";
// import Navbar from "../Navbar";

// const PortLandPage = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [platform, setPlatform] = useState("Axis Bank");
//     const [showGraphSlider, setShowGraphSlider] = useState(false);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [loadingText, setLoadingText] = useState("Uploading...");
//     const [uploadId, setUploadId] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [portfolioName, setPortfolioName] = useState("");
//     const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//     const [showMappingModal, setShowMappingModal] = useState(false);
//     const [fileHeaders, setFileHeaders] = useState([]);
//     const [showUploadForm, setShowUploadForm] = useState(true);
//     const [columnMapping, setColumnMapping] = useState({
//         "Trd Dt": "",
//         "Exch": "",
//         "Scrip Name": "",
//         "Buy/Sell": "",
//         "Qty": "",
//         "Mkt Price": "",
//         "Brok Amt": "",
//     });


//     useEffect(() => {
//         if (showGraphSlider) {
//             setShowUploadForm(false); // Collapse form when graph is displayed
//         }
//     }, [showGraphSlider]);
//     useEffect(() => {
//         const id = localStorage.getItem("uploadId");
//         if (id) setUploadId(id);
//     }, []);

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//         setShowGraphSlider(false);
//         setError("");
//     };

//     //   useEffect(() => {
//     //   const extractHeaders = async () => {
//     //     if (selectedFile && platform === "Other") {
//     //       try {
//     //         const formData = new FormData();
//     //         formData.append("file", selectedFile);
//     //         const response = await fetch(`${API_BASE}/file/extract_headers`, {
//     //           method: "POST",
//     //           body: formData,
//     //         });
//     //         const data = await response.json();
//     //         if (data.headers) {
//     //           setFileHeaders(data.headers);
//     //           setShowMappingModal(true);
//     //         } else {
//     //           setError(data.error || "Failed to extract headers from file.");
//     //         }
//     //       } catch (err) {
//     //         setError("Error extracting file headers.");
//     //         console.error("Header Extraction Error:", err);
//     //       }
//     //     }
//     //   };

//     //   extractHeaders();
//     // }, [selectedFile, platform]);

//     useEffect(() => {
//         const extractHeaders = async () => {
//             if (selectedFile && platform === "Other") {
//                 try {
//                     const token = localStorage.getItem("authToken");
//                     if (!token || token === "null") {
//                         setError("You're not logged in. Please log in to proceed.");
//                         return;
//                     }

//                     const formData = new FormData();
//                     formData.append("file", selectedFile);

//                     const response = await fetch(`${API_BASE}/file/extract_headers`, {
//                         method: "POST",
//                         headers: {
//                             Authorization: `Bearer ${token}`, // Add JWT token
//                         },
//                         body: formData,
//                     });

//                     const data = await response.json();
//                     if (data.headers) {
//                         setFileHeaders(data.headers);
//                         setShowMappingModal(true);
//                     } else {
//                         setError(data.error || "Failed to get data.");
//                     }
//                 } catch (err) {
//                     console.error("Header Extraction Error:", err);
//                     setError("Failed to get data.: " + err.message);
//                 }
//             }
//         };

//         extractHeaders();
//     }, [selectedFile, platform]);

//     const token = localStorage.getItem("authToken");
//     const email = JwtUtil.extractEmail(token);
//     // console.log("Extracted email from token:", email);

//     const handleUploadClick = () => {
//         if (!selectedFile) {
//             setError("Please select a file first.");
//             return;
//         }
//         if (platform === "Other" && !isColumnMappingComplete()) {
//             setError("Please complete the mandatory column mappings for the 'Other' platform.");
//             return;
//         }
//         setShowModal(true);
//     };
//     const isColumnMappingComplete = () => {
//         const mandatoryFields = [
//             "Trd Dt",
//             "Exch",
//             "Scrip Name",
//             "Buy/Sell",
//             "Qty",
//             "Mkt Price",

//         ];
//         return mandatoryFields.every((key) => columnMapping[key] !== "");
//     };


//     // const onDragEnd = (result) => {
//     //   const { source, destination, draggableId } = result;

//     //   // If there's no destination (dropped outside a droppable area), do nothing
//     //   if (!destination) {
//     //     console.log("No destination for drag-and-drop.");
//     //     return;
//     //   }

//     //   // Log the drag-and-drop event for debugging
//     //   console.log("Drag Event:", {
//     //     draggableId,
//     //     source: source.droppableId,
//     //     destination: destination.droppableId,
//     //   });

//     //   // If dropped into the same droppable (file headers), do nothing
//     //   if (source.droppableId === "fileHeaders" && destination.droppableId === "fileHeaders") {
//     //     console.log("Dropped back into fileHeaders, no action needed.");
//     //     return;
//     //   }

//     //   // If dragging from fileHeaders to a predefined field
//     //   if (source.droppableId === "fileHeaders" && destination.droppableId.startsWith("predefined-")) {
//     //     const predefinedField = destination.droppableId.replace("predefined-", "");
//     //     // Use draggableId directly instead of fileHeaders[source.index]
//     //     const header = draggableId;

//     //     console.log(`Mapping ${header} to ${predefinedField}`);
//     //     setColumnMapping((prev) => ({ ...prev, [predefinedField]: header }));
//     //     return;
//     //   }

//     //   // If moving from one predefined field to another
//     //   if (
//     //     source.droppableId.startsWith("predefined-") &&
//     //     destination.droppableId.startsWith("predefined-")
//     //   ) {
//     //     const sourceField = source.droppableId.replace("predefined-", "");
//     //     const destField = destination.droppableId.replace("predefined-", "");
//     //     const sourceHeader = columnMapping[sourceField];

//     //     console.log(`Swapping ${sourceHeader} from ${sourceField} to ${destField}`);
//     //     setColumnMapping((prev) => ({
//     //       ...prev,
//     //       [sourceField]: columnMapping[destField] || "",
//     //       [destField]: sourceHeader,
//     //     }));
//     //     return;
//     //   }

//     //   // If moving from a predefined field back to fileHeaders
//     //   if (source.droppableId.startsWith("predefined-") && destination.droppableId === "fileHeaders") {
//     //     const sourceField = source.droppableId.replace("predefined-", "");
//     //     console.log(`Removing mapping for ${sourceField}`);
//     //     setColumnMapping((prev) => ({ ...prev, [sourceField]: "" }));
//     //     return;
//     //   }
//     // };

//     const onDragEnd = (result) => {
//         const { source, destination, draggableId } = result;

//         if (!destination) {
//             console.log("No destination for drag-and-drop.");
//             return;
//         }

//         console.log("Drag Event:", {
//             draggableId,
//             source: source.droppableId,
//             destination: destination.droppableId,
//         });

//         if (source.droppableId === "fileHeaders" && destination.droppableId === "fileHeaders") {
//             console.log("Dropped back into fileHeaders, no action needed.");
//             return;
//         }

//         if (source.droppableId === "fileHeaders" && destination.droppableId.startsWith("predefined-")) {
//             const predefinedField = destination.droppableId.replace("predefined-", "");
//             const header = draggableId;

//             console.log(`Mapping ${header} to ${predefinedField}`);
//             setColumnMapping((prev) => ({ ...prev, [predefinedField]: header }));
//             return;
//         }

//         if (
//             source.droppableId.startsWith("predefined-") &&
//             destination.droppableId.startsWith("predefined-")
//         ) {
//             const sourceField = source.droppableId.replace("predefined-", "");
//             const destField = destination.droppableId.replace("predefined-", "");
//             const sourceHeader = columnMapping[sourceField];

//             console.log(`Swapping ${sourceHeader} from ${sourceField} to ${destField}`);
//             setColumnMapping((prev) => ({
//                 ...prev,
//                 [sourceField]: columnMapping[destField] || "",
//                 [destField]: sourceHeader,
//             }));
//             return;
//         }

//         if (source.droppableId.startsWith("predefined-") && destination.droppableId === "fileHeaders") {
//             const sourceField = source.droppableId.replace("predefined-", "")
//             console.log(`Removing mapping for ${sourceField}`);
//             setColumnMapping((prev) => ({ ...prev, [sourceField]: "" }));
//             return;
//         }
//     };
//     const handleCancelMapping = () => {
//         setShowMappingModal(false);
//         setSelectedFile(null);
//         setFileHeaders([]);
//         setColumnMapping({
//             "Trd Dt": "",
//             "Exch": "",
//             "Scrip Name": "",
//             "Buy/Sell": "",
//             "Qty": "",
//             "Mkt Price": "",
//             "Brok Amt": "",

//         });
//     };

//     const uploadFileWithSaveFlag = async (save) => {
//         setShowModal(false);
//         if (!token || token === "null") {
//             setError("You're not logged in. Please log in to proceed.");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         const formData = new FormData();
//         formData.append("file", selectedFile);
//         formData.append("platform", platform);
//         formData.append("save", save);
//         formData.append("portfolioname", portfolioName);
//         if (platform === "Other") {
//             const filteredMapping = Object.fromEntries(
//                 Object.entries(columnMapping).filter(([_, value]) => value !== "")
//             );
//             console.log("Sending customMappingStr:", filteredMapping); // Debug log
//             formData.append("customMappingStr", JSON.stringify(filteredMapping));
//         }

//         try {
//             const response = await fetch(`${API_BASE}/file/upload`, {
//                 method: "POST",
//                 headers: { Authorization: `Bearer ${token}` },
//                 body: formData,
//             });

//             const data = await response.json();
//             if (response.ok && data.uploadId) {
//                 setUploadId(data.uploadId);
//                 localStorage.setItem("uploadId", data.uploadId);
//                 setShowGraphSlider(true);

//                 if (response.data.customMapping) {
//                     setColumnMapping((prev) => ({
//                         ...prev,
//                         ...response.data.customMapping,
//                     }));
//                     console.log("Received customMapping:", response.data.customMapping);
//                 }
//             } else {
//                 setError(data.error || "Upload failed. Please check your column mappings.");
//             }
//         } catch (err) {
//             console.error("Upload Error:", err);
//             // setError("File processing failed.: " + err.message);
//             alert("File is already uploaded,Please check the file in Saved Portfolio.")

//         } finally {
//             setLoading(false);
//         }
//     };

//     const predefinedFieldColors = {
//         "Trd Dt": "bg-lime-400",
//         "Exch": "bg-purple-500",
//         "Scrip Name": "bg-red-500",
//         "Buy/Sell": "bg-cyan-500",
//         "Qty": "bg-yellow-400",
//         "Mkt Price": "bg-blue-500",
//         "Brok Amt": "bg-blue-500",
//     };

//     return (
//         <div className="min-h-screen bg-white p-6 dark:bg-slate-800 dark:text-white">
//             <Navbar />
//             <div className="max-w-xl mx-auto bg-white rounded-xl mt-16 border border-t-sky-700 p-6 space-y-4 dark:bg-slate-900 dark:border dark:border-gray-700 dark:text-white transition-all duration-300 hover:shadow-xl">
//                 {/* Toggle Button */}
//                 {!showUploadForm && (
//                     <motion.button
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         onClick={() => setShowUploadForm(true)}
//                         className="w-auto mx-auto py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600  text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
//                     >
//                         <RiUploadCloudLine className="text-xl" />
//                         <span className="text-base text-center">Upload Data</span>
//                     </motion.button>
//                 )}

//                 {/* Collapsible Upload Form */}
//                 <AnimatePresence>
//                     {showUploadForm && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: "auto", opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             transition={{ duration: 0.3, ease: "easeInOut" }}
//                             className="space-y-4 overflow-hidden"
//                         >
//                             <div className="text-center">
//                                 <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
//                                     📊 Portfolio Analysis
//                                 </h1>
//                                 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                                     Insights from your investment data
//                                 </p>
//                             </div>

//                             <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
//                                 <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
//                                     <RiBankLine className="text-cyan-500 text-lg" />
//                                     Platform
//                                 </label>
//                                 <select
//                                     value={platform}
//                                     onChange={(e) => {
//                                         setPlatform(e.target.value);
//                                         if (e.target.value !== "Other") {
//                                             setFileHeaders([]);
//                                             setColumnMapping({
//                                                 "Trd Dt": "",
//                                                 "Exch": "",
//                                                 "Scrip Name": "",
//                                                 "Buy/Sell": "",
//                                                 "Qty": "",
//                                                 "Mkt Price": "",
//                                                 "Brok Amt": "",
//                                             });
//                                             setShowMappingModal(false);
//                                         }
//                                     }}
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
//                                 >
//                                     <option value="Axis Bank">Axis Bank</option>
//                                     <option value="Zerodha">Zerodha</option>
//                                     <option value="HDFC">HDFC</option>
//                                     <option value="ICICI">ICICI</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>

//                             {selectedFile && (
//                                 <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
//                                     <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
//                                         <RiFileTextLine className="text-cyan-500 text-lg" />
//                                         Portfolio Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={portfolioName}
//                                         onChange={(e) => setPortfolioName(e.target.value)}
//                                         placeholder="e.g. Long Term Holdings"
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
//                                     />
//                                 </div>
//                             )}

//                             <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
//                                 <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
//                                     <RiFolderUploadLine className="text-cyan-500 text-lg" />
//                                     Upload File
//                                 </label>
//                                 <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-800">
//                                     <input
//                                         type="file"
//                                         accept=".csv,.xls,.xlsx"
//                                         onChange={handleFileChange}
//                                         className="hidden"
//                                         id="fileUpload"
//                                     />
//                                     <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
//                                         <div className="p-3 bg-cyan-100 dark:bg-slate-700 rounded-full mb-2">
//                                             <RiUploadCloudLine className="text-3xl text-cyan-500 dark:text-cyan-300" />
//                                         </div>
//                                         <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
//                                             {selectedFile ? (
//                                                 <>
//                                                     <span className="font-medium text-cyan-600 dark:text-cyan-300">
//                                                         {selectedFile.name}</span>
//                                                     <br />
//                                                     <span className="text-xs">Click to change</span>
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     {/* <span className="font-medium">Drop file here</span> */}
//                                                     <br />
//                                                     <span className="text-xs">Click to browse</span>
//                                                 </>
//                                             )}
//                                         </p>

//                                     </label>
//                                 </div>
//                             </div>

//                             {error && (
//                                 <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg flex items-center gap-2">
//                                     <RiErrorWarningLine className="text-red-500 text-lg" />
//                                     <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
//                                 </div>
//                             )}

//                             {loading && (
//                                 <div className="flex flex-col items-center justify-center  dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
//                                     <HashLoader color="#0369a1" size={60} />
//                                     <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
//                                         {loadingText}
//                                     </p>
//                                 </div>
//                             )}

//                             <div className="flex flex-col gap-2">
//                                 <button
//                                     onClick={handleUploadClick}
//                                     disabled={loading}
//                                     className={`w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
//                                 >
//                                     <RiBarChartLine className="text-lg" />
//                                     Upload & Analyze
//                                 </button>
//                                 <p>Not sure how it works? Try with a sample portfolio file—no upload needed!</p>
//                                 <div className="relative my-3">
//                                     <div className="absolute inset-0 flex items-center">
//                                         <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                                     </div>
//                                     <div className="relative flex justify-center">
//                                         <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 text-xs">
//                                             OR
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={async () => {
//                                         try {
//                                             setLoading(true);
//                                             setLoadingText("Loading sample analysis...");
//                                             const response = await axios.get(`${API_BASE}/file/sample`);
//                                             const data = response.data;
//                                             if (typeof data === "string") {
//                                                 setUploadId(data);
//                                                 localStorage.setItem("uploadId", data);
//                                                 setShowGraphSlider(true);
//                                             } else if (data.uploadId) {
//                                                 setUploadId(data.uploadId);
//                                                 localStorage.setItem("uploadId", data.uploadId);
//                                                 setShowGraphSlider(true);
//                                             } else {
//                                                 setError("Sample data unavailable.");
//                                             }
//                                         } catch (err) {
//                                             console.error("Error fetching sample uploadId:", err);
//                                             setError("Failed to fetch sample.");
//                                         } finally {
//                                             setLoading(false);
//                                         }
//                                     }}
//                                     disabled={loading}
//                                     className={`w-full py-2 px-4 border border-cyan-500 text-cyan-600 dark:text-cyan-300 rounded-lg font-medium hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-1 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
//                                 >
//                                     <RiFileDownloadLine className="text-lg" />
//                                     Use Sample File
//                                 </button>
//                                 <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
//                                     Explore demo data
//                                 </p>
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//             {uploadId && showGraphSlider && (
//                 <div className="mt-10">
//                     <YearFilterProvider>
//                         <GraphDataProvider>
//                             <GraphSlider uploadId={uploadId} />
//                         </GraphDataProvider>
//                     </YearFilterProvider>
//                 </div>
//             )}

//             {showModal && (
//                 <div className="fixed m-10 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
//                     <div className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4 dark:bg-slate-800 dark:text-white">
//                         <h2 className="text-xl font-semibold text-gray-800  dark:text-white">Save Portfolio?</h2>
//                         <p className="text-sm text-gray-600  dark:text-white">Would you like to save this portfolio for future reference?</p>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:text-white dark:border dark:border-white"
//                                 onClick={() => setShowModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//                                 onClick={() => uploadFileWithSaveFlag(false)}
//                             >
//                                 No
//                             </button>
//                             <button
//                                 className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
//                                 onClick={() => uploadFileWithSaveFlag(true)}
//                             >
//                                 Yes
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Drag-and-Drop Column Mapping Modal for 'Other' Platform */}
//             {showMappingModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//                     <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4 h-[90vh] sm:h-[85vh] max-h-[90vh] overflow-y-auto">
//                         {/* Modal Header */}
//                         <div className="flex justify-between items-center mb-4 sm:mb-6">
//                             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Map Your Columns</h2>
//                             <button
//                                 className="text-gray-500 hover:text-gray-700 transition-colors"
//                                 onClick={handleCancelMapping}
//                                 aria-label="Close mapping modal"
//                             >
//                                 <IoClose className="text-2xl sm:text-3xl" />
//                             </button>
//                         </div>

//                         <DragDropContext onDragEnd={onDragEnd}>
//                             <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
//                                 {/* Predefined Names Section */}
//                                 <div className="w-full md:w-2/5">
//                                     <div className="mb-2 sm:mb-4">
//                                         <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2">Required Fields</h3>
//                                         <p className="text-sm text-gray-500">Map your file columns to these required fields</p>
//                                     </div>
//                                     <div className="space-y-2 sm:space-y-3">
//                                         {Object.keys(columnMapping).map((key) => (
//                                             <Droppable droppableId={`predefined-${key}`} key={key}>
//                                                 {(provided) => (
//                                                     <div
//                                                         className={`p-2 sm:p-4 rounded-lg border-2 border-dashed transition-all ${columnMapping[key]
//                                                                 ? "border-green-100 bg-green-50"
//                                                                 : "border-gray-200 hover:border-gray-300"
//                                                             }`}
//                                                         {...provided.droppableProps}
//                                                         ref={provided.innerRef}
//                                                     >
//                                                         <div className="flex items-center justify-between mb-1">
//                                                             <span className="font-medium text-gray-700 text-sm sm:text-base">
//                                                                 {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
//                                                             </span>
//                                                             {key === "brokerage amount" && (
//                                                                 <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded">Optional</span>
//                                                             )}
//                                                         </div>

//                                                         {columnMapping[key] ? (
//                                                             <Draggable draggableId={`mapped-${key}`} index={0}>
//                                                                 {(provided) => (
//                                                                     <div
//                                                                         className="bg-green-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm flex justify-between items-center shadow-sm"
//                                                                         ref={provided.innerRef}
//                                                                         {...provided.draggableProps}
//                                                                         {...provided.dragHandleProps}
//                                                                     >
//                                                                         {columnMapping[key]}
//                                                                         <button
//                                                                             onClick={(e) => {
//                                                                                 e.stopPropagation();
//                                                                                 setColumnMapping((prev) => ({ ...prev, [key]: "" }));
//                                                                             }}
//                                                                             className="text-white/80 hover:text-white ml-1"
//                                                                         >
//                                                                             <IoClose size={14} sm:size={16} />
//                                                                         </button>
//                                                                     </div>
//                                                                 )}
//                                                             </Draggable>
//                                                         ) : (
//                                                             <div className="text-sm text-gray-400 italic py-1 sm:py-2">
//                                                                 Drop column here
//                                                             </div>
//                                                         )}
//                                                         {provided.placeholder}
//                                                     </div>
//                                                 )}
//                                             </Droppable>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Your Columns Section */}
//                                 <div className="w-full md:w-3/5">
//                                     <div className="mb-2 sm:mb-4">
//                                         <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-1 sm:mb-2">Your File Columns</h3>
//                                         <p className="text-sm text-gray-500">
//                                             Drag and drop these columns to the required fields on the left
//                                         </p>
//                                     </div>
//                                     <Droppable droppableId="fileHeaders" direction="horizontal">
//                                         {(provided) => (
//                                             <div
//                                                 className="p-2 sm:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 min-h-[150px] sm:min-h-[200px]"
//                                                 {...provided.droppableProps}
//                                                 ref={provided.innerRef}
//                                             >
//                                                 <div className="flex flex-wrap gap-2 sm:gap-3">
//                                                     {fileHeaders
//                                                         .filter((header) => !Object.values(columnMapping).includes(header))
//                                                         .map((header, index) => (
//                                                             <Draggable key={header} draggableId={header} index={index}>
//                                                                 {(provided) => (
//                                                                     <div
//                                                                         className="bg-white border border-gray-300 text-gray-700 px-2 sm:px-3 py-1 sm:py-2 rounded-md text-sm shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
//                                                                         ref={provided.innerRef}
//                                                                         {...provided.draggableProps}
//                                                                         {...provided.dragHandleProps}
//                                                                     >
//                                                                         {header}
//                                                                     </div>
//                                                                 )}
//                                                             </Draggable>
//                                                         ))}
//                                                     {provided.placeholder}
//                                                 </div>
//                                                 {fileHeaders.filter((header) => !Object.values(columnMapping).includes(header))
//                                                     .length === 0 && (
//                                                         <div className="text-center text-gray-400 italic py-4 sm:py-8">
//                                                             All columns have been mapped
//                                                         </div>
//                                                     )}
//                                             </div>
//                                         )}
//                                     </Droppable>
//                                 </div>
//                             </div>
//                         </DragDropContext>

//                         {/* Footer with status and actions */}
//                         <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
//                             <div className="text-sm text-gray-500">
//                                 {Object.values(columnMapping).filter(Boolean).length} of{" "}
//                                 {Object.keys(columnMapping).length} fields mapped
//                             </div>
//                             <div className="flex space-x-2 sm:space-x-3">
//                                 <button
//                                     className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
//                                     onClick={handleCancelMapping}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-white transition-colors w-full sm:w-auto ${isColumnMappingComplete()
//                                             ? "bg-green-600 hover:bg-green-700"
//                                             : "bg-gray-400 cursor-not-allowed"
//                                         }`}
//                                     onClick={() => {
//                                         if (isColumnMappingComplete()) {
//                                             setShowMappingModal(false);
//                                         } else {
//                                             setError("Please map all mandatory columns before proceeding.");
//                                         }
//                                     }}
//                                     disabled={!isColumnMappingComplete()}
//                                 >
//                                     Confirm Mapping
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Error message */}
//                         {error && (
//                             <div className="mt-4 p-2 sm:p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
//                                 {error}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}


//         </div>
//     );
// };

// export default PortLandPage;



// import { motion ,AnimatePresence} from "framer-motion";
// import axios from "axios";
// import { RiBankLine, RiBarChartLine, RiErrorWarningLine, RiFileDownloadLine, RiFileTextLine, RiFolderUploadLine, RiUploadCloudLine } from "react-icons/ri";
// import GraphSlider from "./GraphSlider";
// import { YearFilterProvider } from "./context/YearFilterContext";
// import { GraphDataProvider } from "./GraphDataContext"; // Import the provider
// import JwtUtil from "../../services/JwtUtil";
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { IoClose } from "react-icons/io5";
// import { HashLoader } from "react-spinners";

// const PortLandPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [platform, setPlatform] = useState("Axis Bank");
//   const [showGraphSlider, setShowGraphSlider] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingText, setLoadingText] = useState("Uploading...");
//   const [uploadId, setUploadId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [portfolioName, setPortfolioName] = useState("");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const [showMappingModal, setShowMappingModal] = useState(false);
//   const [fileHeaders, setFileHeaders] = useState([]);
//   const [showUploadForm, setShowUploadForm] = useState(true);
//   const [columnMapping, setColumnMapping] = useState({
//     "Trade_Date": "",
//     "Exchange": "",
//     "Scrip_Name": "",
//     "Order_Type": "",
//     "Qty": "",
//     "Mkt_Price": "",
//     "Brok_Amt": "",
//     "Aggregated_Taxes":""
//   });


// useEffect(() => {
//     if (showGraphSlider) {
//       setShowUploadForm(false); // Collapse form when graph is displayed
//     }
//   }, [showGraphSlider]);
//   useEffect(() => {
//     const id = localStorage.getItem("uploadId");
//     if (id) setUploadId(id);
//   }, []);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     setShowGraphSlider(false);
//     setError("");
//   };


//   useEffect(() => {
//   const extractHeaders = async () => {
//     if (selectedFile && platform === "Other") {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (!token || token === "null") {
//           setError("You're not logged in. Please log in to proceed.");
//           return;
//         }

//         const formData = new FormData();
//         formData.append("file", selectedFile);

//         const response = await fetch(`${API_BASE}/file/extract_headers`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`, // Add JWT token
//           },
//           body: formData,
//         });

//         const data = await response.json();
//         if (data.headers) {
//           setFileHeaders(data.headers);
//           setShowMappingModal(true);
//         } else {
//           setError(data.error || "Failed to get data.");
//         }
//       } catch (err) {
//         console.error("Header Extraction Error:", err);
//         setError("Failed to get data.: " + err.message);
//       }
//     }
//   };

//   extractHeaders();
// }, [selectedFile, platform]);

//   const token = localStorage.getItem("authToken");
//   const email = JwtUtil.extractEmail(token);
//   // console.log("Extracted email from token:", email);

// const handleUploadClick = () => {
//     if (!selectedFile) {
//       setError("Please select a file first.");
//       return;
//     }
//     if (platform === "Other" && !isColumnMappingComplete()) {
//       setError("Please complete the mandatory column mappings for the 'Other' platform.");
//       return;
//     }
//     setShowModal(true);
//   };
// const isColumnMappingComplete = () => {
//     const mandatoryFields = [
//       "Trade_Date", 
//       "Exchange", 
//       "Scrip_Name", 
//       "Order_Type", 
//       "Qty", 
//       "Mkt_Price",


//     ];
//     return mandatoryFields.every((key) => columnMapping[key] !== "");
//   };


//   const onDragEnd = (result) => {
//   const { source, destination, draggableId } = result;

//   if (!destination) {
//     console.log("No destination for drag-and-drop.");
//     return;
//   }

//   console.log("Drag Event:", {
//     draggableId,
//     source: source.droppableId,
//     destination: destination.droppableId,
//   });

//   if (source.droppableId === "fileHeaders" && destination.droppableId === "fileHeaders") {
//     console.log("Dropped back into fileHeaders, no action needed.");
//     return;
//   }

//   if (source.droppableId === "fileHeaders" && destination.droppableId.startsWith("predefined-")) {
//     const predefinedField = destination.droppableId.replace("predefined-", "");
//     const header = draggableId;

//     console.log(`Mapping ${header} to ${predefinedField}`);
//     setColumnMapping((prev) => ({ ...prev, [predefinedField]: header }));
//     return;
//   }

//   if (
//     source.droppableId.startsWith("predefined-") &&
//     destination.droppableId.startsWith("predefined-")
//   ) {
//     const sourceField = source.droppableId.replace("predefined-", "");
//     const destField = destination.droppableId.replace("predefined-", "");
//     const sourceHeader = columnMapping[sourceField];

//     console.log(`Swapping ${sourceHeader} from ${sourceField} to ${destField}`);
//     setColumnMapping((prev) => ({
//       ...prev,
//       [sourceField]: columnMapping[destField] || "",
//       [destField]: sourceHeader,
//     }));
//     return;
//   }

//   if (source.droppableId.startsWith("predefined-") && destination.droppableId === "fileHeaders") {
//     const sourceField = source.droppableId.replace("predefined-", "")
//     console.log(`Removing mapping for ${sourceField}`);
//     setColumnMapping((prev) => ({ ...prev, [sourceField]: "" }));
//     return;
//   }
// };
//   const handleCancelMapping = () => {
//     setShowMappingModal(false);
//     setSelectedFile(null);
//     setFileHeaders([]);
//    setColumnMapping({
//       "Trade_Date": "",
//       "Exchange": "",
//       "Scrip_Name": "",
//       "Order_Type": "",
//       "Qty": "",
//       "Mkt_Price": "",
//       "Brok_Amt": "",
//      "Aggregated_Taxes":""

//     });
//   };

//  const uploadFileWithSaveFlag = async (save) => {
//   setShowModal(false);
//   if (!token || token === "null") {
//     setError("You're not logged in. Please log in to proceed.");
//     return;
//   }

//   setLoading(true);
//   setError("");

//   const formData = new FormData();
//   formData.append("file", selectedFile);
//   formData.append("platform", platform);
//   formData.append("save", save);
//   formData.append("portfolioname", portfolioName);
//   // if (platform === "Other") {
//   //   const filteredMapping = Object.fromEntries(
//   //     Object.entries(columnMapping).filter(([_, value]) => value !== "")
//   //   );
//   //   console.log("Sending customMappingStr:", filteredMapping); // Debug log
//   //   formData.append("customMappingStr", JSON.stringify(filteredMapping));
//   // }

//   if (platform === "Other") {
//   const filteredMapping = Object.fromEntries(
//     Object.entries(columnMapping).filter(([_, value]) => value !== "")
//   );

//   const reversedMapping = Object.fromEntries(
//     Object.entries(filteredMapping).map(([expectedField, fileHeader]) => [fileHeader, expectedField])
//   );

//   console.log("Sending customMappingStr:", reversedMapping); // Debug log
//   formData.append("customMappingStr", JSON.stringify(reversedMapping));
// }

//   try {
//     const response = await fetch(`${API_BASE}/file/upload`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: formData,
//     });

//     const data = await response.json();
//     if (response.ok && data.uploadId) {
//       setUploadId(data.uploadId);
//       localStorage.setItem("uploadId", data.uploadId);
//       setShowGraphSlider(true);

//         if (data.customMapping) {
//           setColumnMapping((prev) => ({
//             ...prev,
//             ...data.customMapping,
//           }));
//           console.log("Received customMapping:", data.customMapping);
//         }
//     } else {
//       setError(data.error || "Upload failed. Please check your column mappings.");
//     }
//   } catch (err) {
//     console.error("Upload Error:", err);
//     setError("File processing failed.: " + err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//     const predefinedFieldColors = {
//      "Trade_Date": "bg-lime-400",
//     "Exchange": "bg-sky-500",
//     "Scrip_Name": "bg-red-500",
//     "Order_Type": "bg-cyan-500",
//     "Qty": "bg-yellow-400",
//     "Mkt_Price": "bg-blue-500",
//     "Brok_Amt": "bg-blue-500",
//     "Aggregated_Taxes":"bg-blue-600"
//   };

//   return (
// //    <div className="min-h-screen bg-white p-6 dark:bg-slate-800 dark:text-white">
// //   <div className="max-w-xl mx-auto bg-white rounded-xl  p-6 space-y-4 dark:bg-slate-900 dark:border dark:border-gray-700 dark:text-white transition-all duration-300 hover:shadow-xl">
// //   {/* Toggle Button */}
// //   {!showUploadForm && (
// //     <motion.button
// //       initial={{ opacity: 0, y: -10 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       exit={{ opacity: 0 }}
// //       onClick={() => setShowUploadForm(true)}
// //       className="w-auto mx-auto py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600  text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
// //     >
// //       <RiUploadCloudLine className="text-xl" />
// //       <span className="text-base text-center">Upload Data</span>
// //     </motion.button>
// //   )}

// //   {/* Collapsible Upload Form */}
// //   <AnimatePresence>
// //     {showUploadForm && (
// //       <motion.div
// //         initial={{ height: 0, opacity: 0 }}
// //         animate={{ height: "auto", opacity: 1 }}
// //         exit={{ height: 0, opacity: 0 }}
// //         transition={{ duration: 0.3, ease: "easeInOut" }}
// //         className="space-y-4 overflow-hidden"
// //       >
// //         <div className="text-center">
// //           <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
// //             📊 Portfolio Analysis
// //           </h1>
// //           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
// //             Insights from your investment data
// //           </p>
// //         </div>

// //         <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
// //           <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
// //             <RiBankLine className="text-cyan-500 text-lg" />
// //             Platform
// //           </label>
// //           <select
// //             value={platform}
// //             onChange={(e) => {
// //               setPlatform(e.target.value);
// //               if (e.target.value !== "Other") {
// //                 setFileHeaders([]);
// //                setColumnMapping({
// //                         "Trade_Date": "",
// //                         "Exchange": "",
// //                         "Scrip_Name": "",
// //                         "Order_Type": "",
// //                         "Qty": "",
// //                         "Mkt_Price": "",
// //                         "Brok_Amt": "",
// //                         "Aggregated_Taxes":""
// //                       });
// //                 setShowMappingModal(false);
// //               }
// //             }}
// //             className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
// //           >
// //             <option value="Axis Bank">Axis Bank</option>
// //             <option value="Zerodha">Zerodha</option>
// //             <option value="HDFC">HDFC</option>
// //             <option value="ICICI">ICICI</option>
// //             <option value="Other">Other</option>
// //           </select>
// //         </div>

// //         {selectedFile && (
// //           <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
// //             <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
// //               <RiFileTextLine className="text-cyan-500 text-lg" />
// //               Portfolio Name
// //             </label>
// //             <input
// //               type="text"
// //               value={portfolioName}
// //               onChange={(e) => setPortfolioName(e.target.value)}
// //               placeholder="e.g. Long Term Holdings"
// //               className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
// //             />
// //           </div>
// //         )}

// //         <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
// //           <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
// //             <RiFolderUploadLine className="text-cyan-500 text-lg" />
// //             Upload File
// //           </label>
// //           <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-800">
// //             <input
// //               type="file"
// //               accept=".csv,.xls,.xlsx"
// //               onChange={handleFileChange}
// //               className="hidden"
// //               id="fileUpload"
// //             />
// //             <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
// //               <div className="p-3 bg-cyan-100 dark:bg-slate-700 rounded-full mb-2">
// //                 <RiUploadCloudLine className="text-3xl text-cyan-500 dark:text-cyan-300" />
// //               </div>
// //               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
// //                 {selectedFile ? (
// //                   <>
// //                     <span className="font-medium text-cyan-600 dark:text-cyan-300">
// // 		    {selectedFile.name}</span>
// //                     <br />
// //                     <span className="text-xs">Click to change</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <span className="font-medium">Drop file here</span>
// //                     <br />
// //                     <span className="text-xs">or click to browse</span>
// //                   </>
// //                 )}
// //               </p>
// //               <p className="text-xs text-gray-400 mt-1">Supports: .CSV, .XLS, .XLSX</p>
// //             </label>
// //           </div>
// //         </div>

// //         {error && (
// //           <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg flex items-center gap-2">
// //             <RiErrorWarningLine className="text-red-500 text-lg" />
// //             <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
// //           </div>
// //         )}

// //         {loading && (
// //             <div className="flex flex-col items-center justify-center  dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
// //       <HashLoader color="#0369a1" size={60} />
// //       <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
// //       {loadingText}
// //       </p>
// //     </div>
// //         )}

// //         <div className="flex flex-col gap-2">
// //           <button
// //             onClick={handleUploadClick}
// //             disabled={loading}
// //             className={`w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
// //           >
// //             <RiBarChartLine className="text-lg" />
// //              Upload & Analyze
// //           </button>
// //      <p>Not sure how it works? Try with a sample portfolio file—no upload needed!</p>
// //           <div className="relative my-3">
// //             <div className="absolute inset-0 flex items-center">
// //               <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
// //             </div>
// //             <div className="relative flex justify-center">
// //               <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 text-xs">
// //                 OR
// //               </span>
// //             </div>
// //           </div>

// //           <button
// //             onClick={async () => {
// //               try {
// //                 setLoading(true);
// //                 setLoadingText("Loading sample analysis...");
// //                 const response = await axios.get(`${API_BASE}/file/sample`);
// //                 const data = response.data;
// //                 if (typeof data === "string") {
// //                   setUploadId(data);
// //                   localStorage.setItem("uploadId", data);
// //                   setShowGraphSlider(true);
// //                 } else if (data.uploadId) {
// //                   setUploadId(data.uploadId);
// //                   localStorage.setItem("uploadId", data.uploadId);
// //                   setShowGraphSlider(true);
// //                 } else {
// //                   setError("Sample data unavailable.");
// //                 }
// //               } catch (err) {
// //                 console.error("Error fetching sample uploadId:", err);
// //                 setError("Failed to fetch sample.");
// //               } finally {
// //                 setLoading(false);
// //               }
// //             }}
// //             disabled={loading}
// //             className={`w-full py-2 px-4 border border-cyan-500 text-cyan-600 dark:text-cyan-300 rounded-lg font-medium hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-1 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
// //           >
// //             <RiFileDownloadLine className="text-lg" />
// //              Use Sample File
// //           </button>
// //           <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
// //             Explore demo data
// //           </p>
// //         </div>
// //       </motion.div>
// //     )}
// //   </AnimatePresence>
// // </div>
// //       {uploadId && showGraphSlider && (
// //         <div className="mt-10">
// //           <YearFilterProvider>
// //             <GraphDataProvider>
// //               <GraphSlider uploadId={uploadId} />
// //             </GraphDataProvider>
// //           </YearFilterProvider>
// //         </div>
// //       )}

// //       {showModal && (
// //         <div className="fixed m-10 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
// //           <div className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4 dark:bg-slate-800 dark:text-white">
// //             <h2 className="text-xl font-semibold text-gray-800  dark:text-white">Save Portfolio?</h2>
// //             <p className="text-sm text-gray-600  dark:text-white">Would you like to save this portfolio for future reference?</p>
// //             <div className="flex justify-end gap-3">
// //               <button
// //                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:text-white dark:border dark:border-white"
// //                 onClick={() => setShowModal(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
// //                 onClick={() => uploadFileWithSaveFlag(false)}
// //               >
// //                 No
// //               </button>
// //               <button
// //                 className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
// //                 onClick={() => uploadFileWithSaveFlag(true)}
// //               >
// //                 Yes
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //            {/* Drag-and-Drop Column Mapping Modal for 'Other' Platform */}


// // {showMappingModal && (
// //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
// //     {/* Compact Card */}
// //     <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl flex flex-col max-h-[85vh] border border-gray-200 overflow-hidden">
// //       {/* Header */}
// //       <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
// //         <div>
// //           <h2 className="text-xl font-bold text-gray-800">Column Mapping</h2>
// //           <p className="text-xs text-gray-500 mt-1">
// //             Match your file columns (6 required, 2 optional)
// //           </p>
// //         </div>
// //         <button
// //           onClick={handleCancelMapping}
// //           className="text-gray-500 hover:text-gray-700 transition-all p-1 rounded-full hover:bg-gray-100"
// //         >
// //           <IoClose className="text-xl" />
// //         </button>
// //       </div>

// //       <DragDropContext onDragEnd={onDragEnd}>
// //         <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

// //           {/* Left: Destination Fields */}
// //           <div className="w-full md:w-2/5 p-4 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
// //             <div className="mb-4">
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
// //                   Destination Fields
// //                 </h3>
// //                 <div className="flex gap-1">
// //                   <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
// //                     {Object.values(columnMapping).filter(Boolean).length} mapped
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               {Object.keys(columnMapping).map((key) => {
// //                 const isOptional = ["brokerage amount", "aggregated tax"].includes(key);
// //                 return (
// //                   <Droppable droppableId={`predefined-${key}`} key={key}>
// //                     {(provided) => (
// //                       <div
// //                         className={`p-2 rounded-lg transition-all ${
// //                           columnMapping[key]
// //                             ? "bg-green-50 border border-green-200"
// //                             : "bg-white border border-dashed border-gray-300 hover:border-blue-300"
// //                         } ${isOptional ? "border-blue-200" : ""}`}
// //                         {...provided.droppableProps}
// //                         ref={provided.innerRef}
// //                       >
// //                         <div className="flex items-center justify-between mb-1">
// //                           <span className="text-xs font-medium text-gray-700">
// //                             {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
// //                           </span>
// //                           {isOptional ? (
// //                             <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
// //                               Optional
// //                             </span>
// //                           ) : (
// //                             <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
// //                               Required
// //                             </span>
// //                           )}
// //                         </div>

// //                         {columnMapping[key] ? (
// //                           <Draggable draggableId={`mapped-${key}`} index={0}>
// //                             {(provided) => (
// //                               <div
// //                                 className={`px-2 py-1 rounded text-xs flex justify-between items-center cursor-move ${
// //                                   isOptional
// //                                     ? "bg-blue-100 text-blue-800"
// //                                     : "bg-green-100 text-green-800"
// //                                 }`}
// //                                 ref={provided.innerRef}
// //                                 {...provided.draggableProps}
// //                                 {...provided.dragHandleProps}
// //                               >
// //                                 <span className="truncate max-w-[120px]">{columnMapping[key]}</span>
// //                                 <button
// //                                   onClick={(e) => {
// //                                     e.stopPropagation();
// //                                     setColumnMapping((prev) => ({ ...prev, [key]: "" }));
// //                                   }}
// //                                   className="text-gray-500 hover:text-gray-700 ml-1"
// //                                 >
// //                                   <IoClose size={12} />
// //                                 </button>
// //                               </div>
// //                             )}
// //                           </Draggable>
// //                         ) : (
// //                           <div className={`text-xs italic py-1 text-center ${
// //                             isOptional ? "text-blue-500/70" : "text-gray-400"
// //                           }`}>
// //                             {isOptional ? "(Optional)" : "Drop here"}
// //                           </div>
// //                         )}
// //                         {provided.placeholder}
// //                       </div>
// //                     )}
// //                   </Droppable>
// //                 );
// //               })}
// //             </div>
// //           </div>

// //           {/* Right: Your Columns */}
// //           <div className="w-full md:w-3/5 p-4 overflow-y-auto bg-gray-50">
// //             <div className="mb-3">
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
// //                   Your File Columns
// //                 </h3>
// //                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
// //                   {fileHeaders.length - Object.values(columnMapping).filter(Boolean).length} left
// //                 </span>
// //               </div>
// //             </div>

// //             <Droppable droppableId="fileHeaders" direction="horizontal">
// //               {(provided) => (
// //                 <div
// //                   className="p-3 rounded-lg bg-white border border-dashed border-gray-300 min-h-[120px]"
// //                   {...provided.droppableProps}
// //                   ref={provided.innerRef}
// //                 >
// //                   <div className="flex flex-wrap gap-2">
// //                     {fileHeaders
// //                       .filter((header) => !Object.values(columnMapping).includes(header))
// //                       .map((header, index) => (
// //                         <Draggable key={header} draggableId={header} index={index}>
// //                           {(provided) => (
// //                             <div
// //                               className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded text-xs shadow-xs hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
// //                               ref={provided.innerRef}
// //                               {...provided.draggableProps}
// //                               {...provided.dragHandleProps}
// //                             >
// //                               {header}
// //                             </div>
// //                           )}
// //                         </Draggable>
// //                       ))}
// //                     {provided.placeholder}
// //                   </div>
// //                   {fileHeaders.filter((header) => !Object.values(columnMapping).includes(header))
// //                     .length === 0 && (
// //                     <div className="text-center text-gray-400 text-xs italic py-6 flex flex-col items-center">
// //                       <span className="text-2xl mb-1">🎉</span>
// //                       <span>All mapped!</span>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </Droppable>
// //           </div>
// //         </div>
// //       </DragDropContext>

// //       {/* Footer */}
// //       <div className="p-3 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-2">
// //         <div className="flex items-center gap-2">
// //           {isColumnMappingComplete() ? (
// //             <>
// //               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //               <span className="text-xs text-green-600">Ready to proceed</span>
// //             </>
// //           ) : (
// //             <>
// //               <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
// //               <span className="text-xs text-yellow-600">
// //                 {6 - Object.values(columnMapping).filter(Boolean).length} required fields needed
// //               </span>
// //             </>
// //           )}
// //         </div>
// //         <div className="flex gap-2 w-full sm:w-auto">
// //           <button
// //             onClick={handleCancelMapping}
// //             className="px-3 py-1.5 rounded text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all w-full sm:w-auto"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={() => {
// //               if (isColumnMappingComplete()) {
// //                 setShowMappingModal(false);
// //               } else {
// //                 setError("Please map all 6 required fields");
// //               }
// //             }}
// //             className={`px-3 py-1.5 rounded text-xs font-medium transition-all w-full sm:w-auto ${
// //               isColumnMappingComplete()
// //                 ? "bg-blue-600 hover:bg-blue-700 text-white"
// //                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
// //             }`}
// //             disabled={!isColumnMappingComplete()}
// //           >
// //             Confirm
// //           </button>
// //         </div>
// //       </div>

// //       {/* Error Message */}
// //       {error && (
// //         <div className="mx-3 mb-3 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100 flex items-center gap-1">
// //           <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
// //           {error}
// //         </div>
// //       )}
// //     </div>
// //   </div>
// // )}


// //     </div>

//  <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
//       {/* Main Card Container */}
//       <div className="max-w-3xl mx-auto">
//         {/* Floating Action Button */}
//         {!showUploadForm && (
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             transition={{ type: "spring", stiffness: 300 }}
//             onClick={() => setShowUploadForm(true)}
//             className="fixed bottom-8 right-8 z-10 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
//           >
//             <RiUploadCloudLine className="text-2xl" />
//             <span className="sr-only">Upload Data</span>
//           </motion.button>
//         )}

//         {/* Main Content */}
//         <div className="space-y-8">
//           {/* Header Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400 mb-2">
//               Portfolio Insights
//             </h1>
//             <p className="text-lg text-gray-600 dark:text-gray-300">
//               Transform your trade data into actionable intelligence
//             </p>
//           </motion.div>

//           {/* Upload Form */}
//           <AnimatePresence>
//             {showUploadForm && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
//               >
//                 <div className="p-6 md:p-8 space-y-6">
//                   {/* Platform Selection */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                       <RiBankLine className="text-cyan-500" />
//                       Data Source
//                     </label>
//                     <select
//                       value={platform}
//                       onChange={(e) => {
//                         setPlatform(e.target.value);
//                         if (e.target.value !== "Other") {
//                           setFileHeaders([]);
//                           setColumnMapping({
//                             "Trade_Date": "",
//                             "Exchange": "",
//                             "Scrip_Name": "",
//                             "Order_Type": "",
//                             "Qty": "",
//                             "Mkt_Price": "",
//                             "Brok_Amt": "",
//                             "Aggregated_Taxes": ""
//                           });
//                           setShowMappingModal(false);
//                         }
//                       }}
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-900 dark:text-white transition-all"
//                     >
//                       <option value="Axis Bank">Axis Bank</option>
//                       <option value="Zerodha">Zerodha</option>
//                       <option value="HDFC">HDFC</option>
//                       <option value="ICICI">ICICI</option>
//                       <option value="Other">Other Platform</option>
//                     </select>
//                   </div>

//                   {/* Portfolio Name */}
//                   {selectedFile && (
//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                         <RiFileTextLine className="text-cyan-500" />
//                         Portfolio Name
//                       </label>
//                       <input
//                         type="text"
//                         value={portfolioName}
//                         onChange={(e) => setPortfolioName(e.target.value)}
//                         placeholder="e.g. Long Term Holdings"
//                         className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-900 dark:text-white transition-all"
//                       />
//                     </div>
//                   )}

//                   {/* File Upload */}
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                       <RiFolderUploadLine className="text-cyan-500" />
//                       Upload File
//                     </label>
//                     <div className="border-2 border-dashed border-cyan-400 rounded-xl p-8 text-center bg-cyan-50/50 dark:bg-slate-900/50 transition-all hover:bg-cyan-100/50 dark:hover:bg-slate-800/50">
//                       <input
//                         type="file"
//                         accept=".csv,.xls,.xlsx"
//                         onChange={handleFileChange}
//                         className="hidden"
//                         id="fileUpload"
//                       />
//                       <label
//                         htmlFor="fileUpload"
//                         className="cursor-pointer flex flex-col items-center justify-center space-y-3"
//                       >
//                         <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-full">
//                           <RiUploadCloudLine className="text-4xl text-cyan-500 dark:text-cyan-400" />
//                         </div>
//                         {selectedFile ? (
//                           <>
//                             <p className="font-medium text-gray-800 dark:text-white">
//                               {selectedFile.name}
//                             </p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               Click to change file
//                             </p>
//                           </>
//                         ) : (
//                           <>
//                             <p className="font-medium text-gray-800 dark:text-white">
//                               Drag & drop your file here
//                             </p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">
//                               or click to browse files
//                             </p>
//                           </>
//                         )}
//                         <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
//                           Supported formats: CSV, XLS, XLSX
//                         </p>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Error Message */}
//                   {error && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-2"
//                     >
//                       <RiErrorWarningLine className="text-red-500 text-lg flex-shrink-0" />
//                       <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
//                     </motion.div>
//                   )}

//                   {/* Loading Indicator */}
//                   {loading && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="flex flex-col items-center justify-center py-8"
//                     >
//                       <HashLoader color="#06b6d4" size={60} />
//                       <p className="mt-4 text-cyan-600 dark:text-cyan-400 font-medium animate-pulse">
//                         {loadingText}
//                       </p>
//                     </motion.div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="space-y-4">
//                     <button
//                       onClick={handleUploadClick}
//                       disabled={loading}
//                       className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
//                         loading ? "opacity-70 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       <RiBarChartLine className="text-lg" />
//                       Analyze Portfolio
//                     </button>

//                     <div className="relative my-4">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
//                       </div>
//                       <div className="relative flex justify-center">
//                         <span className="px-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-sm">
//                           OR
//                         </span>
//                       </div>
//                     </div>

//                     <button
//                       onClick={async () => {
//                         try {
//                           setLoading(true);
//                           setLoadingText("Loading sample analysis...");
//                           const response = await axios.get(`${API_BASE}/file/sample`);
//                           const data = response.data;
//                           if (typeof data === "string") {
//                             setUploadId(data);
//                             localStorage.setItem("uploadId", data);
//                             setShowGraphSlider(true);
//                           } else if (data.uploadId) {
//                             setUploadId(data.uploadId);
//                             localStorage.setItem("uploadId", data.uploadId);
//                             setShowGraphSlider(true);
//                           } else {
//                             setError("Sample data unavailable.");
//                           }
//                         } catch (err) {
//                           console.error("Error fetching sample uploadId:", err);
//                           setError("Failed to fetch sample.");
//                         } finally {
//                           setLoading(false);
//                         }
//                       }}
//                       disabled={loading}
//                       className={`w-full py-3 px-4 rounded-lg font-medium border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-2 ${
//                         loading ? "opacity-70 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       <RiFileDownloadLine className="text-lg" />
//                       Try Sample Data
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Graph Display */}
//           {uploadId && showGraphSlider && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
//             >
//               <YearFilterProvider>
//                 <GraphDataProvider>
//                   <GraphSlider uploadId={uploadId} />
//                 </GraphDataProvider>
//               </YearFilterProvider>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       {/* Save Portfolio Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                 Save Portfolio?
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 <IoClose className="text-xl" />
//               </button>
//             </div>
//             <p className="text-gray-600 dark:text-gray-300 mb-6">
//               Would you like to save this portfolio for future reference? You can access it later from your dashboard.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => uploadFileWithSaveFlag(false)}
//                 className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
//               >
//                 No, Just Analyze
//               </button>
//               <button
//                 onClick={() => uploadFileWithSaveFlag(true)}
//                 className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md"
//               >
//                 Yes, Save It
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}

//       {/* Column Mapping Modal */}
//       {showMappingModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 dark:text-white">
//                   Map Your Columns
//                 </h3>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   Match your file columns to our expected fields
//                 </p>
//               </div>
//               <button
//                 onClick={handleCancelMapping}
//                 className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
//               >
//                 <IoClose className="text-xl" />
//               </button>
//             </div>

//             <DragDropContext onDragEnd={onDragEnd}>
//               <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
//                 {/* Destination Fields */}
//                 <div className="w-full md:w-2/5 p-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 overflow-y-auto">
//                   <div className="mb-4 flex justify-between items-center">
//                     <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                       Required Fields
//                     </h4>
//                     <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
//                       {Object.values(columnMapping).filter(Boolean).length} mapped
//                     </span>
//                   </div>

//                   <div className="space-y-3">
//                     {Object.entries(columnMapping).map(([key, value]) => {
//                       const isOptional = ["Brok_Amt", "Aggregated_Taxes"].includes(key);
//                       return (
//                         <Droppable droppableId={`predefined-${key}`} key={key}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.droppableProps}
//                               className={`p-3 rounded-lg transition-all ${
//                                 value
//                                   ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
//                                   : "bg-white dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500"
//                               } ${isOptional ? "border-blue-200 dark:border-blue-800" : ""}`}
//                             >
//                               <div className="flex justify-between items-center mb-2">
//                                 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                                   {key.replace(/_/g, " ")}
//                                 </span>
//                                 {isOptional ? (
//                                   <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
//                                     Optional
//                                   </span>
//                                 ) : (
//                                   <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full">
//                                     Required
//                                   </span>
//                                 )}
//                               </div>

//                               {value ? (
//                                 <Draggable draggableId={`mapped-${key}`} index={0}>
//                                   {(provided) => (
//                                     <div
//                                       ref={provided.innerRef}
//                                       {...provided.draggableProps}
//                                       {...provided.dragHandleProps}
//                                       className={`px-3 py-2 rounded-md text-sm flex justify-between items-center cursor-move ${
//                                         isOptional
//                                           ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
//                                           : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
//                                       }`}
//                                     >
//                                       <span className="truncate">{value}</span>
//                                       <button
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           setColumnMapping((prev) => ({ ...prev, [key]: "" }));
//                                         }}
//                                         className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2"
//                                       >
//                                         <IoClose size={14} />
//                                       </button>
//                                     </div>
//                                   )}
//                                 </Draggable>
//                               ) : (
//                                 <div
//                                   className={`text-xs italic py-2 text-center ${
//                                     isOptional
//                                       ? "text-blue-500/70 dark:text-blue-400/70"
//                                       : "text-gray-400 dark:text-gray-500"
//                                   }`}
//                                 >
//                                   {isOptional ? "(Optional - Drop here)" : "Drop here"}
//                                 </div>
//                               )}
//                               {provided.placeholder}
//                             </div>
//                           )}
//                         </Droppable>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* File Headers */}
//                 <div className="w-full md:w-3/5 p-5 overflow-y-auto">
//                   <div className="mb-4 flex justify-between items-center">
//                     <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
//                       Your File Columns
//                     </h4>
//                     <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
//                       {fileHeaders.length - Object.values(columnMapping).filter(Boolean).length} remaining
//                     </span>
//                   </div>

//                   <Droppable droppableId="fileHeaders" direction="horizontal">
//                     {(provided) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         className="p-4 rounded-xl bg-gray-100 dark:bg-slate-900/50 border border-dashed border-gray-300 dark:border-slate-700 min-h-[200px]"
//                       >
//                         <div className="flex flex-wrap gap-2">
//                           {fileHeaders
//                             .filter((header) => !Object.values(columnMapping).includes(header))
//                             .map((header, index) => (
//                               <Draggable key={header} draggableId={header} index={index}>
//                                 {(provided) => (
//                                   <div
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     {...provided.dragHandleProps}
//                                     className="px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all"
//                                   >
//                                     {header}
//                                   </div>
//                                 )}
//                               </Draggable>
//                             ))}
//                           {provided.placeholder}
//                         </div>
//                         {fileHeaders.filter((header) => !Object.values(columnMapping).includes(header))
//                           .length === 0 && (
//                           <div className="text-center py-8 text-gray-400 dark:text-gray-500 flex flex-col items-center">
//                             <span className="text-3xl mb-2">🎉</span>
//                             <p className="text-sm">All columns mapped!</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </Droppable>
//                 </div>
//               </div>
//             </DragDropContext>

//             {/* Footer */}
//             <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-center gap-3">
//               <div className="flex items-center gap-2">
//                 {isColumnMappingComplete() ? (
//                   <>
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <span className="text-sm text-green-600 dark:text-green-400">
//                       Ready to proceed
//                     </span>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                     <span className="text-sm text-yellow-600 dark:text-yellow-400">
//                       {6 - Object.values(columnMapping).filter(Boolean).length} required fields needed
//                     </span>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2 w-full sm:w-auto">
//                 <button
//                   onClick={handleCancelMapping}
//                   className="px-4 py-2 rounded-lg text-sm border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (isColumnMappingComplete()) {
//                       setShowMappingModal(false);
//                     } else {
//                       setError("Please map all required fields to proceed");
//                     }
//                   }}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto ${
//                     isColumnMappingComplete()
//                       ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md"
//                       : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//                   }`}
//                   disabled={!isColumnMappingComplete()}
//                 >
//                   Confirm Mapping
//                 </button>
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mx-4 mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm flex items-center gap-2 border border-red-200 dark:border-red-800"
//               >
//                 <RiErrorWarningLine className="flex-shrink-0" />
//                 {error}
//               </motion.div>
//             )}
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PortLandPage;

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RiBankLine, RiBarChartLine, RiErrorWarningLine, RiFileDownloadLine, RiFileTextLine, RiFolderUploadLine, RiUploadCloudLine } from "react-icons/ri";
import GraphSlider from "./GraphSlider";
import { YearFilterProvider } from "./context/YearFilterContext";
import { GraphDataProvider } from "./GraphDataContext"; // Import the provider
import JwtUtil from "../../services/JwtUtil";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoClose } from "react-icons/io5";
import { HashLoader } from "react-spinners";
import Navbar from "../Navbar";

const PortLandPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [platform, setPlatform] = useState("Axis Bank");
  const [showGraphSlider, setShowGraphSlider] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing...");
  const [uploadId, setUploadId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(true);
  const [columnMapping, setColumnMapping] = useState({
    "Trade_Date": "",
    "Exchange": "",
    "Scrip_Name": "",
    "Order_Type": "",
    "Qty": "",
    "Mkt_Price": "",
    "Brok_Amt": "",
    "Aggregated_Taxes": ""
  });


  useEffect(() => {
    if (showGraphSlider) {
      setShowUploadForm(false); // Collapse form when graph is displayed
    }
  }, [showGraphSlider]);
  useEffect(() => {
    const id = localStorage.getItem("uploadId");
    if (id) setUploadId(id);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setShowGraphSlider(false);
    setError("");
  };


  useEffect(() => {
    const extractHeaders = async () => {
      if (selectedFile && platform === "Other") {
        try {
          const token = localStorage.getItem("authToken");
          if (!token || token === "null") {
            setError("You're not logged in. Please log in to proceed.");
            return;
          }

          const formData = new FormData();
          formData.append("file", selectedFile);

          const response = await fetch(`${API_BASE}/file/extract_headers`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // Add JWT token
            },
            body: formData,
          });

          const data = await response.json();
          if (data.headers) {
            setFileHeaders(data.headers);
            setShowMappingModal(true);
          } else {
            setError(data.error || "Failed to get data.");
          }
        } catch (err) {
          console.error("Header Extraction Error:", err);
          setError("Failed to get data.: " + err.message);
        }
      }
    };

    extractHeaders();
  }, [selectedFile, platform]);

  const token = localStorage.getItem("authToken");
  const email = JwtUtil.extractEmail(token);
  // console.log("Extracted email from token:", email);

  const handleUploadClick = () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }
    if (platform === "Other" && !isColumnMappingComplete()) {
      setError("Please complete the mandatory column mappings for the 'Other' platform.");
      return;
    }
    setShowModal(true);
  };
  const isColumnMappingComplete = () => {
    const mandatoryFields = [
      "Trade_Date",
      "Exchange",
      "Scrip_Name",
      "Order_Type",
      "Qty",
      "Mkt_Price",


    ];
    return mandatoryFields.every((key) => columnMapping[key] !== "");
  };


  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      console.log("No destination for drag-and-drop.");
      return;
    }

    console.log("Drag Event:", {
      draggableId,
      source: source.droppableId,
      destination: destination.droppableId,
    });

    if (source.droppableId === "fileHeaders" && destination.droppableId === "fileHeaders") {
      console.log("Dropped back into fileHeaders, no action needed.");
      return;
    }

    if (source.droppableId === "fileHeaders" && destination.droppableId.startsWith("predefined-")) {
      const predefinedField = destination.droppableId.replace("predefined-", "");
      const header = draggableId;

      console.log(`Mapping ${header} to ${predefinedField}`);
      setColumnMapping((prev) => ({ ...prev, [predefinedField]: header }));
      return;
    }

    if (
      source.droppableId.startsWith("predefined-") &&
      destination.droppableId.startsWith("predefined-")
    ) {
      const sourceField = source.droppableId.replace("predefined-", "");
      const destField = destination.droppableId.replace("predefined-", "");
      const sourceHeader = columnMapping[sourceField];

      console.log(`Swapping ${sourceHeader} from ${sourceField} to ${destField}`);
      setColumnMapping((prev) => ({
        ...prev,
        [sourceField]: columnMapping[destField] || "",
        [destField]: sourceHeader,
      }));
      return;
    }

    if (source.droppableId.startsWith("predefined-") && destination.droppableId === "fileHeaders") {
      const sourceField = source.droppableId.replace("predefined-", "")
      console.log(`Removing mapping for ${sourceField}`);
      setColumnMapping((prev) => ({ ...prev, [sourceField]: "" }));
      return;
    }
  };
  const handleCancelMapping = () => {
    setShowMappingModal(false);
    setSelectedFile(null);
    setFileHeaders([]);
    setColumnMapping({
      "Trade_Date": "",
      "Exchange": "",
      "Scrip_Name": "",
      "Order_Type": "",
      "Qty": "",
      "Mkt_Price": "",
      "Brok_Amt": "",
      "Aggregated_Taxes": ""

    });
  };

  const uploadFileWithSaveFlag = async (save) => {
    setShowModal(false);
    if (!token || token === "null") {
      setError("You're not logged in. Please log in to proceed.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("platform", platform);
    formData.append("save", save);
    formData.append("portfolioname", portfolioName);
    // if (platform === "Other") {
    //   const filteredMapping = Object.fromEntries(
    //     Object.entries(columnMapping).filter(([_, value]) => value !== "")
    //   );
    //   console.log("Sending customMappingStr:", filteredMapping); // Debug log
    //   formData.append("customMappingStr", JSON.stringify(filteredMapping));
    // }

    if (platform === "Other") {
      const filteredMapping = Object.fromEntries(
        Object.entries(columnMapping).filter(([_, value]) => value !== "")
      );

      const reversedMapping = Object.fromEntries(
        Object.entries(filteredMapping).map(([expectedField, fileHeader]) => [fileHeader, expectedField])
      );

      console.log("Sending customMappingStr:", reversedMapping); // Debug log
      formData.append("customMappingStr", JSON.stringify(reversedMapping));
    }

    try {
      const response = await fetch(`${API_BASE}/file/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok && data.uploadId) {
        setUploadId(data.uploadId);
        localStorage.setItem("uploadId", data.uploadId);
        setShowGraphSlider(true);

        if (data.customMapping) {
          setColumnMapping((prev) => ({
            ...prev,
            ...data.customMapping,
          }));
          console.log("Received customMapping:", data.customMapping);
        }
      } else {
        setError(data.error || "Upload failed. Please check your column mappings.");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      setError("📁 This file is already analyzed! and saved in portfolio.You can check Saved Portfolio tab .📝 Please upload a different file.")

    } finally {
      setLoading(false);
    }
  };

  const predefinedFieldColors = {
    "Trade_Date": "bg-lime-400",
    "Exchange": "bg-sky-500",
    "Scrip_Name": "bg-red-500",
    "Order_Type": "bg-cyan-500",
    "Qty": "bg-yellow-400",
    "Mkt_Price": "bg-blue-500",
    "Brok_Amt": "bg-blue-500",
    "Aggregated_Taxes": "bg-blue-600"
  };

  return (
    //    <div className="min-h-screen bg-white p-6 dark:bg-slate-800 dark:text-white">
    //   <div className="max-w-xl mx-auto bg-white rounded-xl  p-6 space-y-4 dark:bg-slate-900 dark:border dark:border-gray-700 dark:text-white transition-all duration-300 hover:shadow-xl">
    //   {/* Toggle Button */}
    //   {!showUploadForm && (
    //     <motion.button
    //       initial={{ opacity: 0, y: -10 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       exit={{ opacity: 0 }}
    //       onClick={() => setShowUploadForm(true)}
    //       className="w-auto mx-auto py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600  text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
    //     >
    //       <RiUploadCloudLine className="text-xl" />
    //       <span className="text-base text-center">Upload Data</span>
    //     </motion.button>
    //   )}

    //   {/* Collapsible Upload Form */}
    //   <AnimatePresence>
    //     {showUploadForm && (
    //       <motion.div
    //         initial={{ height: 0, opacity: 0 }}
    //         animate={{ height: "auto", opacity: 1 }}
    //         exit={{ height: 0, opacity: 0 }}
    //         transition={{ duration: 0.3, ease: "easeInOut" }}
    //         className="space-y-4 overflow-hidden"
    //       >
    //         <div className="text-center">
    //           <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400">
    //             📊 Portfolio Analysis
    //           </h1>
    //           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
    //             Insights from your investment data
    //           </p>
    //         </div>

    //         <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
    //           <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
    //             <RiBankLine className="text-cyan-500 text-lg" />
    //             Platform
    //           </label>
    //           <select
    //             value={platform}
    //             onChange={(e) => {
    //               setPlatform(e.target.value);
    //               if (e.target.value !== "Other") {
    //                 setFileHeaders([]);
    //                setColumnMapping({
    //                         "Trade_Date": "",
    //                         "Exchange": "",
    //                         "Scrip_Name": "",
    //                         "Order_Type": "",
    //                         "Qty": "",
    //                         "Mkt_Price": "",
    //                         "Brok_Amt": "",
    //                         "Aggregated_Taxes":""
    //                       });
    //                 setShowMappingModal(false);
    //               }
    //             }}
    //             className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
    //           >
    //             <option value="Axis Bank">Axis Bank</option>
    //             <option value="Zerodha">Zerodha</option>
    //             <option value="HDFC">HDFC</option>
    //             <option value="ICICI">ICICI</option>
    //             <option value="Other">Other</option>
    //           </select>
    //         </div>

    //         {selectedFile && (
    //           <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
    //             <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
    //               <RiFileTextLine className="text-cyan-500 text-lg" />
    //               Portfolio Name
    //             </label>
    //             <input
    //               type="text"
    //               value={portfolioName}
    //               onChange={(e) => setPortfolioName(e.target.value)}
    //               placeholder="e.g. Long Term Holdings"
    //               className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 outline-none transition-all dark:bg-slate-900 dark:text-gray-200 dark:border-gray-600"
    //             />
    //           </div>
    //         )}

    //         <div className="bg-cyan-50 dark:bg-slate-800 p-4 rounded-lg">
    //           <label className="block font-medium text-gray-700 mb-1 dark:text-gray-200 flex items-center gap-1">
    //             <RiFolderUploadLine className="text-cyan-500 text-lg" />
    //             Upload File
    //           </label>
    //           <div className="border-2 border-dashed border-cyan-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-all hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-800">
    //             <input
    //               type="file"
    //               accept=".csv,.xls,.xlsx"
    //               onChange={handleFileChange}
    //               className="hidden"
    //               id="fileUpload"
    //             />
    //             <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
    //               <div className="p-3 bg-cyan-100 dark:bg-slate-700 rounded-full mb-2">
    //                 <RiUploadCloudLine className="text-3xl text-cyan-500 dark:text-cyan-300" />
    //               </div>
    //               <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
    //                 {selectedFile ? (
    //                   <>
    //                     <span className="font-medium text-cyan-600 dark:text-cyan-300">
    // 		    {selectedFile.name}</span>
    //                     <br />
    //                     <span className="text-xs">Click to change</span>
    //                   </>
    //                 ) : (
    //                   <>
    //                     <span className="font-medium">Drop file here</span>
    //                     <br />
    //                     <span className="text-xs">or click to browse</span>
    //                   </>
    //                 )}
    //               </p>
    //               <p className="text-xs text-gray-400 mt-1">Supports: .CSV, .XLS, .XLSX</p>
    //             </label>
    //           </div>
    //         </div>

    //         {error && (
    //           <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg flex items-center gap-2">
    //             <RiErrorWarningLine className="text-red-500 text-lg" />
    //             <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
    //           </div>
    //         )}

    //         {loading && (
    //             <div className="flex flex-col items-center justify-center  dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
    //       <HashLoader color="#0369a1" size={60} />
    //       <p className="mt-4 text-sky-700 dark:text-white font-semibold text-lg animate-pulse">
    //       {loadingText}
    //       </p>
    //     </div>
    //         )}

    //         <div className="flex flex-col gap-2">
    //           <button
    //             onClick={handleUploadClick}
    //             disabled={loading}
    //             className={`w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-1 shadow-sm hover:shadow-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    //           >
    //             <RiBarChartLine className="text-lg" />
    //              Upload & Analyze
    //           </button>
    //      <p>Not sure how it works? Try with a sample portfolio file—no upload needed!</p>
    //           <div className="relative my-3">
    //             <div className="absolute inset-0 flex items-center">
    //               <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
    //             </div>
    //             <div className="relative flex justify-center">
    //               <span className="px-2 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400 text-xs">
    //                 OR
    //               </span>
    //             </div>
    //           </div>

    //           <button
    //             onClick={async () => {
    //               try {
    //                 setLoading(true);
    //                 setLoadingText("Loading sample analysis...");
    //                 const response = await axios.get(`${API_BASE}/file/sample`);
    //                 const data = response.data;
    //                 if (typeof data === "string") {
    //                   setUploadId(data);
    //                   localStorage.setItem("uploadId", data);
    //                   setShowGraphSlider(true);
    //                 } else if (data.uploadId) {
    //                   setUploadId(data.uploadId);
    //                   localStorage.setItem("uploadId", data.uploadId);
    //                   setShowGraphSlider(true);
    //                 } else {
    //                   setError("Sample data unavailable.");
    //                 }
    //               } catch (err) {
    //                 console.error("Error fetching sample uploadId:", err);
    //                 setError("Failed to fetch sample.");
    //               } finally {
    //                 setLoading(false);
    //               }
    //             }}
    //             disabled={loading}
    //             className={`w-full py-2 px-4 border border-cyan-500 text-cyan-600 dark:text-cyan-300 rounded-lg font-medium hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-1 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
    //           >
    //             <RiFileDownloadLine className="text-lg" />
    //              Use Sample File
    //           </button>
    //           <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
    //             Explore demo data
    //           </p>
    //         </div>
    //       </motion.div>
    //     )}
    //   </AnimatePresence>
    // </div>
    //       {uploadId && showGraphSlider && (
    //         <div className="mt-10">
    //           <YearFilterProvider>
    //             <GraphDataProvider>
    //               <GraphSlider uploadId={uploadId} />
    //             </GraphDataProvider>
    //           </YearFilterProvider>
    //         </div>
    //       )}

    //       {showModal && (
    //         <div className="fixed m-10 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
    //           <div className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4 dark:bg-slate-800 dark:text-white">
    //             <h2 className="text-xl font-semibold text-gray-800  dark:text-white">Save Portfolio?</h2>
    //             <p className="text-sm text-gray-600  dark:text-white">Would you like to save this portfolio for future reference?</p>
    //             <div className="flex justify-end gap-3">
    //               <button
    //                 className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:text-white dark:border dark:border-white"
    //                 onClick={() => setShowModal(false)}
    //               >
    //                 Cancel
    //               </button>
    //               <button
    //                 className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
    //                 onClick={() => uploadFileWithSaveFlag(false)}
    //               >
    //                 No
    //               </button>
    //               <button
    //                 className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
    //                 onClick={() => uploadFileWithSaveFlag(true)}
    //               >
    //                 Yes
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       )}

    //            {/* Drag-and-Drop Column Mapping Modal for 'Other' Platform */}


    // {showMappingModal && (
    //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
    //     {/* Compact Card */}
    //     <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl flex flex-col max-h-[85vh] border border-gray-200 overflow-hidden">
    //       {/* Header */}
    //       <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
    //         <div>
    //           <h2 className="text-xl font-bold text-gray-800">Column Mapping</h2>
    //           <p className="text-xs text-gray-500 mt-1">
    //             Match your file columns (6 required, 2 optional)
    //           </p>
    //         </div>
    //         <button
    //           onClick={handleCancelMapping}
    //           className="text-gray-500 hover:text-gray-700 transition-all p-1 rounded-full hover:bg-gray-100"
    //         >
    //           <IoClose className="text-xl" />
    //         </button>
    //       </div>

    //       <DragDropContext onDragEnd={onDragEnd}>
    //         <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

    //           {/* Left: Destination Fields */}
    //           <div className="w-full md:w-2/5 p-4 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
    //             <div className="mb-4">
    //               <div className="flex items-center justify-between">
    //                 <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
    //                   Destination Fields
    //                 </h3>
    //                 <div className="flex gap-1">
    //                   <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
    //                     {Object.values(columnMapping).filter(Boolean).length} mapped
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="space-y-2">
    //               {Object.keys(columnMapping).map((key) => {
    //                 const isOptional = ["brokerage amount", "aggregated tax"].includes(key);
    //                 return (
    //                   <Droppable droppableId={`predefined-${key}`} key={key}>
    //                     {(provided) => (
    //                       <div
    //                         className={`p-2 rounded-lg transition-all ${
    //                           columnMapping[key]
    //                             ? "bg-green-50 border border-green-200"
    //                             : "bg-white border border-dashed border-gray-300 hover:border-blue-300"
    //                         } ${isOptional ? "border-blue-200" : ""}`}
    //                         {...provided.droppableProps}
    //                         ref={provided.innerRef}
    //                       >
    //                         <div className="flex items-center justify-between mb-1">
    //                           <span className="text-xs font-medium text-gray-700">
    //                             {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    //                           </span>
    //                           {isOptional ? (
    //                             <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
    //                               Optional
    //                             </span>
    //                           ) : (
    //                             <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
    //                               Required
    //                             </span>
    //                           )}
    //                         </div>

    //                         {columnMapping[key] ? (
    //                           <Draggable draggableId={`mapped-${key}`} index={0}>
    //                             {(provided) => (
    //                               <div
    //                                 className={`px-2 py-1 rounded text-xs flex justify-between items-center cursor-move ${
    //                                   isOptional
    //                                     ? "bg-blue-100 text-blue-800"
    //                                     : "bg-green-100 text-green-800"
    //                                 }`}
    //                                 ref={provided.innerRef}
    //                                 {...provided.draggableProps}
    //                                 {...provided.dragHandleProps}
    //                               >
    //                                 <span className="truncate max-w-[120px]">{columnMapping[key]}</span>
    //                                 <button
    //                                   onClick={(e) => {
    //                                     e.stopPropagation();
    //                                     setColumnMapping((prev) => ({ ...prev, [key]: "" }));
    //                                   }}
    //                                   className="text-gray-500 hover:text-gray-700 ml-1"
    //                                 >
    //                                   <IoClose size={12} />
    //                                 </button>
    //                               </div>
    //                             )}
    //                           </Draggable>
    //                         ) : (
    //                           <div className={`text-xs italic py-1 text-center ${
    //                             isOptional ? "text-blue-500/70" : "text-gray-400"
    //                           }`}>
    //                             {isOptional ? "(Optional)" : "Drop here"}
    //                           </div>
    //                         )}
    //                         {provided.placeholder}
    //                       </div>
    //                     )}
    //                   </Droppable>
    //                 );
    //               })}
    //             </div>
    //           </div>

    //           {/* Right: Your Columns */}
    //           <div className="w-full md:w-3/5 p-4 overflow-y-auto bg-gray-50">
    //             <div className="mb-3">
    //               <div className="flex items-center justify-between">
    //                 <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
    //                   Your File Columns
    //                 </h3>
    //                 <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
    //                   {fileHeaders.length - Object.values(columnMapping).filter(Boolean).length} left
    //                 </span>
    //               </div>
    //             </div>

    //             <Droppable droppableId="fileHeaders" direction="horizontal">
    //               {(provided) => (
    //                 <div
    //                   className="p-3 rounded-lg bg-white border border-dashed border-gray-300 min-h-[120px]"
    //                   {...provided.droppableProps}
    //                   ref={provided.innerRef}
    //                 >
    //                   <div className="flex flex-wrap gap-2">
    //                     {fileHeaders
    //                       .filter((header) => !Object.values(columnMapping).includes(header))
    //                       .map((header, index) => (
    //                         <Draggable key={header} draggableId={header} index={index}>
    //                           {(provided) => (
    //                             <div
    //                               className="bg-white border border-gray-300 text-gray-700 px-2 py-1 rounded text-xs shadow-xs hover:shadow-sm transition-all cursor-grab active:cursor-grabbing"
    //                               ref={provided.innerRef}
    //                               {...provided.draggableProps}
    //                               {...provided.dragHandleProps}
    //                             >
    //                               {header}
    //                             </div>
    //                           )}
    //                         </Draggable>
    //                       ))}
    //                     {provided.placeholder}
    //                   </div>
    //                   {fileHeaders.filter((header) => !Object.values(columnMapping).includes(header))
    //                     .length === 0 && (
    //                     <div className="text-center text-gray-400 text-xs italic py-6 flex flex-col items-center">
    //                       <span className="text-2xl mb-1">🎉</span>
    //                       <span>All mapped!</span>
    //                     </div>
    //                   )}
    //                 </div>
    //               )}
    //             </Droppable>
    //           </div>
    //         </div>
    //       </DragDropContext>

    //       {/* Footer */}
    //       <div className="p-3 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-2">
    //         <div className="flex items-center gap-2">
    //           {isColumnMappingComplete() ? (
    //             <>
    //               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    //               <span className="text-xs text-green-600">Ready to proceed</span>
    //             </>
    //           ) : (
    //             <>
    //               <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
    //               <span className="text-xs text-yellow-600">
    //                 {6 - Object.values(columnMapping).filter(Boolean).length} required fields needed
    //               </span>
    //             </>
    //           )}
    //         </div>
    //         <div className="flex gap-2 w-full sm:w-auto">
    //           <button
    //             onClick={handleCancelMapping}
    //             className="px-3 py-1.5 rounded text-xs border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all w-full sm:w-auto"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             onClick={() => {
    //               if (isColumnMappingComplete()) {
    //                 setShowMappingModal(false);
    //               } else {
    //                 setError("Please map all 6 required fields");
    //               }
    //             }}
    //             className={`px-3 py-1.5 rounded text-xs font-medium transition-all w-full sm:w-auto ${
    //               isColumnMappingComplete()
    //                 ? "bg-blue-600 hover:bg-blue-700 text-white"
    //                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
    //             }`}
    //             disabled={!isColumnMappingComplete()}
    //           >
    //             Confirm
    //           </button>
    //         </div>
    //       </div>

    //       {/* Error Message */}
    //       {error && (
    //         <div className="mx-3 mb-3 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100 flex items-center gap-1">
    //           <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
    //           {error}
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // )}


    //     </div>

    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <Navbar />
      {/* Main Card Container */}
      <div className="mt-16 max-w-3xl mx-auto">
        {/* Floating Action Button */}
        {!showUploadForm && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setShowUploadForm(true)}
            className="fixed bottom-8 left-8 z-10 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
          >
            <RiUploadCloudLine className="text-2xl" />
            <span className="sr-only">Upload Data</span>
          </motion.button>
        )}

        {/* Main Content */}
        <div className="space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-blue-400 mb-2">
              Portfolio Insights
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your trade data into actionable intelligence
            </p>
          </motion.div>

          {/* Upload Form */}
          <AnimatePresence>
            {showUploadForm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="p-6 md:p-8 space-y-6">
                  {/* Platform Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <RiBankLine className="text-cyan-500" />
                      Transaction Registry
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => {
                        setPlatform(e.target.value);
                        if (e.target.value !== "Other") {
                          setFileHeaders([]);
                          setColumnMapping({
                            "Trade_Date": "",
                            "Exchange": "",
                            "Scrip_Name": "",
                            "Order_Type": "",
                            "Qty": "",
                            "Mkt_Price": "",
                            "Brok_Amt": "",
                            "Aggregated_Taxes": ""
                          });
                          setShowMappingModal(false);
                        }
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-900 dark:text-white transition-all"
                    >
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Zerodha">Zerodha</option>
                      <option value="Own">Your Created CMDA Portfolio</option>
                      <option value="Other">Other Platform</option>
                    </select>
                  </div>

                  {/* Portfolio Name */}
                  {selectedFile && (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <RiFileTextLine className="text-cyan-500" />
                        Portfolio Name
                      </label>
                      <input
                        type="text"
                        value={portfolioName}
                        onChange={(e) => setPortfolioName(e.target.value)}
                        placeholder="e.g. Long Term Holdings"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-900 dark:text-white transition-all"
                      />
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <RiFolderUploadLine className="text-cyan-500" />
                      Upload File
                    </label>
                    <div className="border-2 border-dashed border-cyan-400 rounded-xl p-8 text-center bg-cyan-50/50 dark:bg-slate-900/50 transition-all hover:bg-cyan-100/50 dark:hover:bg-slate-800/50">
                      <input
                        type="file"
                        accept=".csv,.xls,.xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileUpload"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                      >
                        <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-full">
                          <RiUploadCloudLine className="text-4xl text-cyan-500 dark:text-cyan-400" />
                        </div>
                        {selectedFile ? (
                          <>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Click to change file
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-gray-800 dark:text-white">
                              Drag & drop your file here
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              or click to browse files
                            </p>
                          </>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          Supported formats: CSV, XLS, XLSX
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-2"
                    >
                      <RiErrorWarningLine className="text-blue-500 text-lg flex-shrink-0" />
                      <p className="text-sm text-blue-600 dark:text-blue-300">{error}</p>
                    </motion.div>
                  )}

                  {/* Loading Indicator */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-8"
                    >
                      <HashLoader color="#06b6d4" size={60} />
                      <p className="mt-4 text-cyan-600 dark:text-cyan-400 font-medium animate-pulse">
                        {loadingText}
                      </p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button
                      onClick={handleUploadClick}
                      disabled={loading}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      <RiBarChartLine className="text-lg" />
                      Analyze Portfolio
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-slate-700"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-sm">
                          OR
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        try {
                          setLoading(true);
                          setLoadingText("Loading sample analysis...");
                          const response = await axios.get(`${API_BASE}/file/sample`);
                          const data = response.data;
                          if (typeof data === "string") {
                            setUploadId(data);
                            localStorage.setItem("uploadId", data);
                            setShowGraphSlider(true);
                          } else if (data.uploadId) {
                            setUploadId(data.uploadId);
                            localStorage.setItem("uploadId", data.uploadId);
                            setShowGraphSlider(true);
                          } else {
                            setError("Sample data unavailable.");
                          }
                        } catch (err) {
                          console.error("Error fetching sample uploadId:", err);
                          setError("Failed to fetch sample.");
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                      className={`w-full py-3 px-4 rounded-lg font-medium border border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-slate-700/50 transition-all duration-300 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                      <RiFileDownloadLine className="text-lg" />
                      Try Sample Data
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </div>

      {/* Graph Display */}
      {uploadId && showGraphSlider && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <YearFilterProvider>
            <GraphDataProvider>
              <GraphSlider uploadId={uploadId} />
            </GraphDataProvider>
          </YearFilterProvider>
        </motion.div>
      )}

      {/* Save Portfolio Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Save Portfolio?
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <IoClose className="text-xl" />
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Would you like to save this portfolio for future reference? You can access it later from your dashboard.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => uploadFileWithSaveFlag(false)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              >
                No, Just Analyze
              </button>
              <button
                onClick={() => uploadFileWithSaveFlag(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md"
              >
                Yes, Save It
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Column Mapping Modal */}
      {showMappingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Map Your Columns
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Match your file columns to our expected fields
                </p>
              </div>
              <button
                onClick={handleCancelMapping}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* Destination Fields */}
                <div className="w-full md:w-2/5 p-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 overflow-y-auto">
                  <div className="mb-4 flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Required Fields
                    </h4>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      {Object.values(columnMapping).filter(Boolean).length} mapped
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(columnMapping).map(([key, value]) => {
                      const isOptional = ["Brok_Amt", "Aggregated_Taxes"].includes(key);
                      return (
                        <Droppable droppableId={`predefined-${key}`} key={key}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`p-3 rounded-lg transition-all ${value
                                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                : "bg-white dark:bg-slate-800 border border-dashed border-gray-300 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500"
                                } ${isOptional ? "border-blue-200 dark:border-blue-800" : ""}`}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {key.replace(/_/g, " ")}
                                </span>
                                {isOptional ? (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                    Optional
                                  </span>
                                ) : (
                                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">
                                    Required
                                  </span>
                                )}
                              </div>

                              {value ? (
                                <Draggable draggableId={`mapped-${key}`} index={0}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`px-3 py-2 rounded-md text-sm flex justify-between items-center cursor-move ${isOptional
                                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                                        : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                                        }`}
                                    >
                                      <span className="truncate">{value}</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setColumnMapping((prev) => ({ ...prev, [key]: "" }));
                                        }}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2"
                                      >
                                        <IoClose size={14} />
                                      </button>
                                    </div>
                                  )}
                                </Draggable>
                              ) : (
                                <div
                                  className={`text-xs italic py-2 text-center ${isOptional
                                    ? "text-blue-500/70 dark:text-blue-400/70"
                                    : "text-gray-400 dark:text-gray-500"
                                    }`}
                                >
                                  {isOptional ? "(Optional - Drop here)" : "Drop here"}
                                </div>
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      );
                    })}
                  </div>
                </div>

                {/* File Headers */}
                <div className="w-full md:w-3/5 p-5 overflow-y-auto">
                  <div className="mb-4 flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Your File Columns
                    </h4>
                    <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
                      {fileHeaders.length - Object.values(columnMapping).filter(Boolean).length} remaining
                    </span>
                  </div>

                  <Droppable droppableId="fileHeaders" direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="p-4 rounded-xl bg-gray-100 dark:bg-slate-900/50 border border-dashed border-gray-300 dark:border-slate-700 min-h-[200px]"
                      >
                        <div className="flex flex-wrap gap-2">
                          {fileHeaders
                            .filter((header) => !Object.values(columnMapping).includes(header))
                            .map((header, index) => (
                              <Draggable key={header} draggableId={header} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="px-3 py-2 rounded-md bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all"
                                  >
                                    {header}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                        {fileHeaders.filter((header) => !Object.values(columnMapping).includes(header))
                          .length === 0 && (
                            <div className="text-center py-8 text-gray-400 dark:text-gray-500 flex flex-col items-center">
                              <span className="text-3xl mb-2">🎉</span>
                              <p className="text-sm">All columns mapped!</p>
                            </div>
                          )}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </DragDropContext>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                {isColumnMappingComplete() ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      Ready to proceed
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      {6 - Object.values(columnMapping).filter(Boolean).length} required fields needed
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCancelMapping}
                  className="px-4 py-2 rounded-lg text-sm border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (isColumnMappingComplete()) {
                      setShowMappingModal(false);
                    } else {
                      setError("Please map all required fields to proceed");
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto ${isColumnMappingComplete()
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-md"
                    : "bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                  disabled={!isColumnMappingComplete()}
                >
                  Confirm Mapping
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-4 mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-blue-600 dark:text-blue-300 text-sm flex items-center gap-2 border border-red-200 dark:border-red-800"
              >
                <RiErrorWarningLine className="flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PortLandPage;