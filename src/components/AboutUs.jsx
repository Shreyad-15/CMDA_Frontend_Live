// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { motion } from "framer-motion";
// import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";


// // const teamMembers = [
// //   { name: "Shreya Despande", description: "DevOps Team Lead" },
// //   { name: "Gayatri Mahajan", description: "Associate Full Stack Developer (Java Specialist)" },
// //   { name: "Swati Raskonda", description: "Associate Full Stack Developer (React Specialist)" },
// //   { name: "Shravani Pawar", description: "Junior Full Stack Developer (React UI Focus)" },
// //   { name: "Digambar Chalakpure", description: "Java Developer" },
// // ];

// const AboutUs = () => {
//   return (
//     <div className="bg-white text-gray-800 dark:bg-black dark:text-white">
//       <Navbar />

//       <section className="mt-12 px-4 sm:px-8 lg:px-20 py-12">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-5xl font-bold text-gray-900 dark:text-white">About Us</h2>
//           <div className="w-24 h-1 bg-sky-800 mx-auto mt-4 rounded-full"></div>
//         </motion.div>

//         {/* Mission & Values */}
//        {/* Mission and Values Cards */}
// <div className="grid md:grid-cols-2 gap-8 mb-20">
//   {/* Our Mission Card */}
//   <motion.div
//     className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//     viewport={{ once: true }}
//   >
//     <h3 className="text-2xl font-bold mb-4 text-black">Our Mission</h3>
//     <p className="text-gray-700 leading-relaxed">
//       <span className="text-3xl font-bold text-gray-900">
//         CMD<span className="text-cyan-700">Analytics</span>
//       </span>{" "}
//       is a business analytics consulting organization with deep expertise in
//       implementing BI and AI solutions across industries—from Manufacturing to
//       Healthcare—empowering data-driven decision-making and growth.
//     </p>
//   </motion.div>

//   {/* Our Values Card */}
//   <motion.div
//     className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.2 }}
//     viewport={{ once: true }}
//   >
//     <h3 className="text-2xl font-bold mb-4 text-yblack">Our Values</h3>
//     <ul className="list-disc list-inside text-gray-700 space-y-3">
//       <li>
//         <strong>CMD<span className="text-cyan-700">Analytics</span></strong> is a
//         trusted name for providing BI & AI solutions.
//       </li>
//       <li><strong>Excellence:</strong> Delivering top-notch, impactful experiences.</li>
//       <li><strong>Accessibility:</strong> Ensuring inclusive access for all.</li>
//       <li><strong>Innovation:</strong> Embracing cutting-edge technologies.</li>
//       <li><strong>Collaboration:</strong> Building strong partnerships with clients & educators.</li>
//     </ul>
//   </motion.div>
// </div>


//         {/* Team Section */}
//         {/* <div className="my-20 text-center">
//           <h3 className="text-4xl font-bold mb-12">Meet Our Development Team</h3>
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-gray-800 transition duration-300"
//                 whileHover={{ scale: 1.03 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 viewport={{ once: true }}
//               >
//                 <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
//                 <p className="text-gray-600">{member.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div> */}

//         {/* Contact Section */}
//     {/* Contact Section */}
// <motion.div
//   className="mt-24 bg-gradient-to-br from-sky-50 to-white px-6 py-12 rounded-2xl shadow-inner"
//   initial={{ opacity: 0, scale: 0.95 }}
//   whileInView={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 0.6 }}
//   viewport={{ once: true }}
// >
//   <div className="grid md:grid-cols-2 items-center gap-12">
//     {/* Left: Text Content */}
//     <div>
//       <h3 className="text-4xl font-bold text-gray-900 mb-4">
//         Get in <span className="text-cyan-700">Touch</span>
//       </h3>
//       <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//         We're here to help! Feel free to reach out for any business inquiries, project collaborations, or support. Our team is always ready to connect.
//       </p>

//       <div className="space-y-4">
//         <div className="flex items-center gap-3 text-gray-700 text-lg">
//           <FaEnvelope className="text-sky-500 text-xl" />
//           <a href="mailto:cmda@gmail.com" className="hover:underline">
//             cmda@gmail.com
//           </a>
//         </div>
//         <div className="flex items-center gap-3 text-gray-700 text-lg">
//           <FaPhoneAlt className="text-sky-500 text-xl" />
//           <a href="tel:+1234567890" className="hover:underline">
//             9860998411

//           </a>
//         </div>
//       </div>
//     </div>

//     {/* Right: Image */}
//     <div className="w-full flex justify-center">
//       <img
//         src="/about.jpg" // Ensure this is in your /public folder and used as `/about.jpg`
//         alt="Contact Illustration"
//         className="rounded-2xl  w-full max-w-md object-cover"
//       />
//     </div>
//   </div>
// <div className="mt-6 flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 gap-x-1">
//   <span>Powered by</span>
//   <img src="/ayclogo2.png" alt="ayclogo" className="w-44 h-28 object-contain" />
// </div>

// </motion.div>

//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;





// import React from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { motion } from "framer-motion";
// import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";



// const AboutUs = () => {
//   return (
//     <div className="bg-white text-gray-800 dark:bg-slate-900 dark:text-white">
//       <Navbar />

//       <section className="mt-12 px-4 sm:px-8 lg:px-20 py-12 dark:text-white dark:bg-slate-900">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-16 dark:text-white dark:bg-slate-900"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-5xl font-bold text-gray-900 dark:text-white">About Us</h2>
//           <div className="w-24 h-1 bg-sky-800 mx-auto mt-4 rounded-full"></div>
//         </motion.div>

//         {/* Mission & Values */}
//        {/* Mission and Values Cards */}
// <div className="grid md:grid-cols-2 gap-8 mb-20 dark:text-white dark:bg-slate-900">
//   {/* Our Mission Card */}
//   <motion.div
//     className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300 dark:text-white dark:bg-slate-900"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//     viewport={{ once: true }}
//   >
//     <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Mission</h3>
//     <p className="text-gray-700 leading-relaxed dark:text-white">
//       <span className="text-3xl font-bold text-gray-900 dark:text-white">
//         CMD<span className="text-cyan-700 dark:text-white">A</span>
//       </span>{" "}
//       is a business analytics consulting organization with deep expertise in
//       implementing BI and AI solutions across industries—from Manufacturing to
//       Healthcare—empowering data-driven decision-making and growth.
//     </p>
//   </motion.div>

//   {/* Our Values Card */}
//   <motion.div
//     className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300 dark:text-white dark:bg-slate-900"
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.2 }}
//     viewport={{ once: true }}
//   >
//     <h3 className="text-2xl font-bold mb-4 text-black dark:text-white dark:bg-slate-900">Our Values</h3>
//     <ul className="list-disc list-inside text-gray-700 space-y-3 dark:text-white ddark:bg-slate-900">
//       <li>
//         <strong>CMD<span className="text-cyan-700">A</span></strong> is a
//         trusted name for providing BI & AI solutions.
//       </li>
//       <li><strong>Excellence:</strong> Delivering top-notch, impactful experiences.</li>
//       <li><strong>Accessibility:</strong> Ensuring inclusive access for all.</li>
//       <li><strong>Innovation:</strong> Embracing cutting-edge technologies.</li>
//       <li><strong>Collaboration:</strong> Building strong partnerships with clients & educators.</li>
//     </ul>
//   </motion.div>
// </div>

// <motion.div
//   className="mt-24 dark:border dark:border-white border border-gray-400 px-6 py-12 rounded-2xl shadow-inner dark:text-white dark:bg-slate-900"
//   initial={{ opacity: 0, scale: 0.95 }}
//   whileInView={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 0.6 }}
//   viewport={{ once: true }}
// >
//   <div className="grid md:grid-cols-2 items-center gap-12 dark:text-white dark:bg-slate-900">
//     {/* Left: Text Content */}
//     <div className="dark:text-white dark:bg-slate-900">
//       <h3 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
//         Get in <span className="text-cyan-700">Touch</span>
//       </h3>
//       <p className="text-gray-700 text-lg mb-6 leading-relaxed dark:text-white">
//         We're here to help! Feel free to reach out for any business inquiries, project collaborations, or support. Our team is always ready to connect.
//       </p>

//       <div className="space-y-4 dark:text-white dark:bg-slate-900">
//         <div className="flex items-center gap-3 text-gray-700 text-lg">
//           <FaEnvelope className="text-sky-500 text-xl dark:text-white" />
//           <a href="mailto:admin@aycanalytics.com" className="hover:underline hover:text-blue-500 dark:text-white">
//            admin@aycanalytics.com
//           </a>
//         </div>
//         <div className="flex items-center gap-3 text-gray-700 text-lg">
//           <FaPhoneAlt className="text-sky-500 text-xl dark:text-white" />
//           <a href="tel: +91  9860998411" className="hover:underline hover:text-blue-500  dark:text-white">
//             +91  9860998411
//           </a>
//         </div>
//       </div>
//     </div>

//     {/* Right: Image */}
//     <div className="w-full flex justify-center dark:text-white">
//       <img
//         src="/about.jpg" // Ensure this is in your /public folder and used as `/about.jpg`
//         alt="Contact Illustration"
//         className="rounded-2xl  w-full max-w-md object-cover dark:text-white"
//       />
//     </div>
//   </div>
// <div className="mt-6 flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 gap-x-1 dark:text-white dark:bg-slate-900">
//   <span className="dark:text-white">Powered by</span>
//   <img src="/ayclogo2.png" alt="ayclogo" className="w-44 h-28 object-contain dark:text-white" />
// </div>

// </motion.div>

//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import accord from '/accord_fintech_logo.png'




const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 dark:bg-black dark:text-white">
      <Navbar />

      <section className="mt-12 px-4 sm:px-8 lg:px-20 py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">About Us</h2>
          <div className="w-24 h-1 bg-sky-800 mx-auto mt-4 rounded-full"></div>
        </motion.div>

        {/* Mission & Values */}
        {/* Mission and Values Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Our Mission Card */}
          <motion.div
            className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-black">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              <span className="text-3xl font-bold text-gray-900">
                CMD<span className="text-cyan-700">Analytics</span>
              </span>{" "}
              is a business analytics consulting organization with deep expertise in
              implementing BI and AI solutions across industries—from Manufacturing to
              Healthcare—empowering data-driven decision-making and growth.
            </p>
          </motion.div>

          {/* Our Values Card */}
          <motion.div
            className="bg-white border border-sky-400 rounded-xl p-6 shadow-lg hover:shadow-gray-400 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-yblack">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                <strong>CMD<span className="text-cyan-700">Analytics</span></strong> is a
                trusted name for providing BI & AI solutions.
              </li>
              <li><strong>Excellence:</strong> Delivering top-notch, impactful experiences.</li>
              <li><strong>Accessibility:</strong> Ensuring inclusive access for all.</li>
              <li><strong>Innovation:</strong> Embracing cutting-edge technologies.</li>
              <li><strong>Collaboration:</strong> Building strong partnerships with clients & educators.</li>
            </ul>
          </motion.div>
        </div>


        {/* Team Section */}
        {/* <div className="my-20 text-center">
          <h3 className="text-4xl font-bold mb-12">Meet Our Development Team</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-gray-800 transition duration-300"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Contact Section */}
        {/* Contact Section */}
        <motion.div
          className="mt-24 bg-gradient-to-br from-sky-50 to-white px-6 py-12 rounded-2xl shadow-inner"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 items-center gap-12">
            {/* Left: Text Content */}
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Get in <span className="text-cyan-700">Touch</span>
              </h3>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We're here to help! Feel free to reach out for any business inquiries, project collaborations, or support. Our team is always ready to connect.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700 text-lg">
                  <FaEnvelope className="text-sky-500 text-xl" />
                  <a href="mailto:admin@aycanalytics.com" className="hover:underline">
                    admin@aycanalytics.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-lg">
                  <FaPhoneAlt className="text-sky-500 text-xl" />
                  <a href="tel:+1234567890" className="hover:underline">
                    9860998411
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="w-full flex justify-center">
              <img
                src="/about.jpg" // Ensure this is in your /public folder and used as `/about.jpg`
                alt="Contact Illustration"
                className="rounded-2xl  w-full max-w-md object-cover"
              />
            </div>

          </div>
          {/* <div className="mt-6 flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 gap-x-1">
  <span>Powered by</span>
  <img src="/ayclogo2.png" alt="ayclogo" className="w-44 h-28 object-contain" />
</div> */}

          <div className="mt-12 flex flex-col items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mb-4">Powered by</span>

            {/* Logos Row */}
            <div className="flex items-center justify-center gap-x-10 mb-4">
              {/* AYC Logo */}
              <img
                src="/ayclogo2.png"
                alt="AYC Logo"
                className="w-40 h-30 object-contain"
              />

              {/* Accord Fintech Logo */}
              <img
                src={accord}
                alt="Accord Fintech Logo"
                className="w-40 h-30 object-contain"
              />
            </div>

            {/* Brief */}
            <p className="text-center text-gray-600 dark:text-gray-400 text-xs max-w-xl leading-relaxed">
              <span className="font-semibold">Accord Fintech</span> is our trusted
              <span className="font-semibold"> database provider</span>, powering our analytics
              with reliable and comprehensive financial market data.
            </p>
          </div>


        </motion.div>

      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;