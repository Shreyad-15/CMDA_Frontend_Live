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


// import React from "react";
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdEmail } from "react-icons/md";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { useAuth } from "./AuthContext"; // Import your AuthContext

// const Footer = () => {
//   const { isLoggedIn } = useAuth(); // Use isLoggedIn from AuthContext

//   const logActivity = async (message) => {
//     console.log(`Activity logged: ${message}`);
//     return Promise.resolve();
//   };

//   const handleNavClick = async (label) => {
//     await logActivity(`${label} tab clicked`);
//   };

//   const handleDashboardClick = (e) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       toast.error("Please login to access the Dashboard");
//     } else {
//       handleNavClick("Dashboard");
//     }
//   };

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
//                 ["Equity Insights", "/equityhub"],
//                 ["Research Panel", "/dashboard"],
//                 ["About Us", "/about"],
//               ].map(([label, to]) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     onClick={label === "Dashboard" ? handleDashboardClick : () => handleNavClick(label)}
//                     className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
//                   >
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
//                 ["Terms & Conditions", "/terms"],
//               ].map(([label, to]) => (
//                 <li key={label}>
//                   <Link
//                     to={to}
//                     onClick={() => handleNavClick(label)}
//                     className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center"
//                   >
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
//                 <FaLocationDot className="text-white mt-1 mr-3 flex-shrink-0" />
//                 <p className="text-gray-300">
//                   Ground,3rd floor, Plot no 41 & 42, Tejaswini Housing Society, Baner, Pune, Maharashtra 411045
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
//                 <span className="text-gray-300">+91 9860998411</span>
//               </div>
//             </div>
//           </div>

//           {/* Subscribe */}
//           {/* <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md text-black dark:text-white">
//             <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
//               Subscribe to our #CMD<span className="text-cyan-400">A</span>
//             </h3>
//             <p className="text-sm text-black dark:text-white mb-4">
//               Stay updated with the latest news, insights, and strategies.
//             </p>
//             <form className="space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-black placeholder-gray-400"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-cyan-700 to-sky-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-300 shadow-lg"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div> */}
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






// -------------new---------------

import React from "react";
import { FaPhoneAlt, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Footer = () => {
  const { isLoggedIn } = useAuth();

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

  const handleSocialClick = (platform) => {
    logActivity(`Clicked on ${platform}`);
    // Add actual social media links here
    const socialLinks = {
      Youtube: "https://www.youtube.com/@aYc_Analytics_Pvt_Ltd",
      instagram: "https://www.instagram.com/aycanalytics_/ ",
      linkedin: "https://in.linkedin.com/company/ayc-analytics-business-intelligence"
    };
    window.open(socialLinks[platform], "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-400 opacity-10 blur-xl"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Quote */}
          <div className="flex flex-col items-start">
            <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              #CMD<span className="text-cyan-400">A</span>
            </h2>
            <p className="text-sm text-gray-300 mb-4 font-light">
              Better Strategy With Quality Business
            </p>
            <p className="italic text-gray-400 mb-6 border-l-4 border-cyan-400 pl-3 py-1">
              "Transforming ideas into impactful realities."
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleSocialClick('Youtube')}
                className="p-3 rounded-full bg-slate-700 hover:bg-cyan-500 transition-all duration-300 transform hover:-translate-y-1 group"
                aria-label="Youtube"
              >
                <FaYoutube className="text-xl text-white group-hover:text-white" />
              </button>
              <button
                onClick={() => handleSocialClick('instagram')}
                className="p-3 rounded-full bg-slate-700 hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:-translate-y-1 group"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl text-white group-hover:text-white" />
              </button>
              <button
                onClick={() => handleSocialClick('linkedin')}
                className="p-3 rounded-full bg-slate-700 hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1 group"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl text-white group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-cyan-400 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                ["Portfolio", "/portfolio"],
                ["Equity Insights", "/equityhub"],
                ["Research Panel", "/dashboard"],
                ["About Us", "/about"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={label === "Dashboard" ? handleDashboardClick : () => handleNavClick(label)}
                    className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-cyan-400 after:rounded-full">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                ["FAQ", "/faq"],
                ["Support", "/support"],
                ["Terms & Conditions", "/terms"],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => handleNavClick(label)}
                    className="text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 text-white relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-10 after:bg-cyan-400 after:rounded-full">
              Contact Info
            </h3>
            <div className="space-y-5">
              <div className="flex items-start group">
                <div className="p-2 bg-slate-700 rounded-lg mr-4 group-hover:bg-cyan-500 transition-colors duration-300">
                  <FaLocationDot className="text-white text-lg" />
                </div>
                <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  Ground,3rd floor, Plot no 41 & 42, Tejaswini Housing Society, Baner, Pune, Maharashtra 411045
                </p>
              </div>
              <div className="flex items-center group">
                <div className="p-2 bg-slate-700 rounded-lg mr-4 group-hover:bg-cyan-500 transition-colors duration-300">
                  <MdEmail className="text-white text-lg" />
                </div>
                <a
                  href="mailto:admin@aycanalytics.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                >
                  admin@aycanalytics.com
                </a>
              </div>
              <div className="flex items-center group">
                <div className="p-2 bg-slate-700 rounded-lg mr-4 group-hover:bg-cyan-500 transition-colors duration-300">
                  <FaPhoneAlt className="text-white text-lg" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">+91 9860998411</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} - All rights reserved by <span className="font-semibold">#CMD<span className="text-cyan-400">A</span></span>
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-cyan-400 transition-colors duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;