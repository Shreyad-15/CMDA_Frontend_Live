
// import React from "react";

// const SearchList = ({ results, query, onSelectItem }) => {
//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const regex = new RegExp(`(${query})`, "gi");
//     return text.split(regex).map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="text-yellow-500 font-bold">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div>
//       {results.length > 0 && (
//         <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
//           <ul>
//             {results.slice(0, 5).map((result, index) => (
//               <li
//                 key={index}
//                 className="px-6 py-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => onSelectItem(result)}
//               >
//                 {highlightText(result.symbol, query)}
//                 <br />
//                 <span>{result.companyName}</span>
//                 <br />
//                 <span>{result.basicIndustry}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchList;

// import React from "react";

// const SearchList = ({ results, query, onSelectItem }) => {
//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const regex = new RegExp(`(${query})`, "gi");
//     return text.split(regex).map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="text-cyan-500 font-bold">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div>
//       {results.length > 0 && (
//         <div className="dark:bg-slate-800 dark:text-white absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50">
//           <ul>
//             {results.slice(0, 5).map((result, index) => (
//               <li
//                 key={index}
//                 className="px-6 py-2 hover:bg-gray-200 cursor-pointer dark:bg-slate-800 dark:text-white"
//                 onClick={() => onSelectItem(result)}
//               >
//                 {highlightText(result.symbol, query)}
//                 <br />
//                 <span>{result.companyName}</span>
//                 <br />
//                 <span>{result.basicIndustry}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchList;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React from "react";
// import { X } from "lucide-react"; // Importing an X icon for better UX

// const SearchList = ({ results, query, onSelectItem, onClear }) => {
//   const highlightText = (text, query) => {
//     if (!query) return text;
//     const regex = new RegExp(`(${query})`, "gi");
//     return text.split(regex).map((part, index) =>
//       part.toLowerCase() === query.toLowerCase() ? (
//         <span key={index} className="text-cyan-500 font-bold">
//           {part}
//         </span>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <div className="bg-white border">
//       {results.length > 0 && (
//         <div className="dark:bg-slate-800 dark:text-white absolute mt-2 w-full  border-gray-300 rounded-md shadow-lg z-50 relative">
//           {/* Close Button */}
//           <button
//             onClick={onClear}
//             className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           >
//             <X size={20} />
//           </button>

//           <ul className="pt-6"> {/* Added padding to avoid overlap with the X button */}
//             {results.slice(0, 5).map((result, index) => (
//               <li
//                 key={index}
//                 className="px-6 py-2 text-black hover:bg-gray-200 cursor-pointer dark:bg-slate-800 dark:text-white"
//                 onClick={() => onSelectItem(result)}
//               >
//                 {highlightText(result.symbol, query)}
//                 <br />
//                 <span>{result.companyName}</span>
//                 <br />
//                 <span>{result.basicIndustry}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchList;



import React from "react";
import { X } from "lucide-react";

const SearchList = ({ results, query, onSelectItem, onClear }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="text-cyan-500 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleClearClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent bubbling to parent
    if (onClear) onClear();
  };

  const handleItemClick = (item, e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent bubbling to clear button
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <div className="bg-white border">
      {results.length > 0 && (
        <div className="dark:bg-slate-800 dark:text-white relative w-full border-gray-300 rounded-md shadow-lg z-50">
          {/* Close Button */}
          <button
            onClick={handleClearClick}
            className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            style={{ zIndex: 60 }} // Ensure it’s above list items
          >
            <X size={20} />
          </button>

          <ul className="pt-8 pb-2"> {/* Increased padding to avoid overlap */}
            {results.slice(0, 5).map((result, index) => (
              <li
                key={index}
                onClick={(e) => handleItemClick(result, e)}
                className="px-6 py-2 text-black hover:bg-gray-200 cursor-pointer dark:bg-slate-800 dark:text-white relative"
                style={{ pointerEvents: 'auto', zIndex: 51 }} // Ensure clickable
              >
                {highlightText(result.symbol, query)}
                <br />
                <span>{result.companyName}</span>
                <br />
                <span>{result.basicIndustry}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchList;