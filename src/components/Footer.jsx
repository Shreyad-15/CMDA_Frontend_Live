// -----------------------workinf code--------------------


// import React from "react";
// import {  FaPhoneAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white pt-12 pb-6">
//       <div className="container mx-auto px-4">
//         <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Brand & Quote */}
//           <div className="flex flex-col items-start">
//             <h2 className="text-4xl font-bold mb-2">
//               #CMD<span className="text-cyan-400">A</span>
//             </h2>
//             <p className="text-sm text-gray-300 mb-3">
//               Better Strategy With Quality Business
//             </p>
//             <p className="italic text-gray-400">
//               "Transforming ideas into impactful realities."
//             </p>

//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
//             <ul className="space-y-3">
//               {[
//                 ["Portfolio", "/portfolio"],
//                 ["Equity", "/equityhub"],
//                 ["Dashboard", "/dashboard"],
//                 ["About Us", "/about"],
//               ].map(([label, to]) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
//                   >
//                     {/* <span className="w-2 h-2 bg-white rounded-full mr-2"></span> */}
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
//             <ul className="space-y-3">
//               {[
//                 ["FAQ", "/faq"],
//                 ["Support", "/support"],
//                 // ["Learning", "/learning"],
//                 ["Terms & Conditions", "/terms"],
//               ].map(([label, to]) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
//                   >
//                     {/* <span className="w-2 h-2 bg-white rounded-full mr-2"></span> */}
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-xl font-semibold mb-4 text-white">Contact Info</h3>
//             <div className="space-y-4">
//               <div className="flex items-start">
//                 {/* <FaLocationDot className="text-cyan-400 mt-1 mr-3 flex-shrink-0" /> */}
//                 <FaLocationDot className="text-white mt-1 mr-3 flex-shrink-0" />
//                 <p className="text-gray-300">
//                   Ground, 2nd & 3rd floor, Plot no 41 & 42, Tejaswini Housing Society, Baner, Pune, Maharashtra 411045
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <MdEmail className="text-white mr-3 flex-shrink-0" />
//                 <a
//                   href="mailto:admin@aycanalytics.com"
//                   className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
//                 >
//                   admin@aycanalytics.com
//                 </a>
//               </div>
//               <div className="flex items-center">
//                 <FaPhoneAlt className="text-white mr-3 flex-shrink-0" />
//                 <span className="text-gray-300">+91 9860998411</span>
//               </div>
//             </div>
//           </div>

//           {/* Subscribe */}
//           <div className=" ">
//             <h3 className="text-xl font-semibold mb-2 text-white">
//               Subscribe to our #CMD<span className="text-cyan-400">A</span>
//             </h3>
//             <p className="text-sm text-gray-300 mb-4">
//               Stay updated with the latest news, insights, and strategies.
//             </p>
//             <form className="space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-cyan-700 to-sky-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 shadow-lg"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>
//         </footer>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-700 mt-12 pt-6 text-center">
//           <p className="text-gray-400 text-sm">
//             © {new Date().getFullYear()} - All rights reserved by #CMD<span className="text-cyan-400">A</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logActivity = async (message) => {
    console.log(`Activity logged: ${message}`);
    return Promise.resolve();
  };

  const handleNavClick = async (label) => {
    await logActivity(`${label} tab clicked`);
  };

  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("Please login to access the Dashboard");
    } else {
      handleNavClick("Dashboard");
    }
  };
  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Quote */}
          <div className="flex flex-col items-start">
            <h2 className="text-4xl font-bold mb-2">
              #CMD<span className="text-cyan-400">A</span>
            </h2>
            <p className="text-sm text-gray-300 mb-3">
              Better Strategy With Quality Business
            </p>
            <p className="italic text-gray-400">
              "Transforming ideas into impactful realities."
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                ["Portfolio", "/portfolio"],
                ["Equity", "/equityhub"],
                ["Dashboard", "/dashboard"],
                ["About Us", "/about"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={label === "Dashboard" ? handleDashboardClick : () => handleNavClick(label)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
                  >
                    {/* <span className="w-2 h-2 bg-white rounded-full mr-2"></span> */}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {[
                ["FAQ", "/faq"],
                ["Support", "/support"],
                // ["Learning", "/learning"],
                ["Terms & Conditions", "/terms"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => handleNavClick(label)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
                  >
                    {/* <span className="w-2 h-2 bg-white rounded-full mr-2"></span> */}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                {/* <FaLocationDot className="text-cyan-400 mt-1 mr-3 flex-shrink-0" /> */}
                <FaLocationDot className="text-white mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-300">
                  Ground, 2nd & 3rd floor, Plot no 41 & 42, Tejaswini Housing Society, Baner, Pune, Maharashtra 411045
                </p>
              </div>
              <div className="flex items-center">
                <MdEmail className="text-white mr-3 flex-shrink-0" />
                <a
                  href="mailto:admin@aycanalytics.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  admin@aycanalytics.com
                </a>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-white mr-3 flex-shrink-0" />
                <span className="text-gray-300">+91 9860998411</span>
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div className=" bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md text-black dark:text-white">
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              Subscribe to our #CMD<span className="text-cyan-400">A</span>
            </h3>
            <p className="text-sm text-black dark:text-white mb-4">
              Stay updated with the latest news, insights, and strategies.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-700 to-sky-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </footer>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} - All rights reserved by #CMD<span className="text-cyan-400">A</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;