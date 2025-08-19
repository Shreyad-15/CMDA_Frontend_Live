//-------------------------working--------------------------

// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const CorporateResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token"); // Get token from URL
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`; // Correct way in Vite

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       setError("Please enter both fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE}/corporate/corp/resetpassword`,
//         { token, newPassword, confirmPassword },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setMessage(response.data);
//       setError("");

//       // Open the Login Modal immediately after success
//       setShowLoginModal(true);
      
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Corporate Reset Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">New Password</label>
//             <input 
//               type="password" 
//               value={newPassword} 
//               onChange={(e) => setNewPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input 
//               type="password" 
//               value={confirmPassword} 
//               onChange={(e) => setConfirmPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button 
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>

            

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
//             <h2 className="text-xl font-semibold text-gray-800 text-center">
//               Password Reset Successful! 🎉
//             </h2>
//             <p className="text-gray-600 text-center mt-2">
//               You can now log in with your new password.
//             </p>

//             <div className="flex justify-center space-x-4 mt-4">
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                 onClick={() => window.location.href = "/"} // Redirect to login page
//               >
//                 Go to home
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
//                 onClick={() => setShowLoginModal(false)} // Close modal
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorporateResetPassword;

//----------------------------working-------------------


// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useForm } from "react-hook-form"; // Import react-hook-form
// import axios from "axios";
// import { FaLock } from "react-icons/fa"; // Import FaLock for icons

// const CorporateResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token"); // Get token from URL
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`; // Correct way in Vite

//   // Initialize react-hook-form
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const password = watch("password"); // Watch password field for confirm password validation

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/corporate/corp/resetpassword`,
//         { token, newPassword: data.password, confirmPassword: data.confirmpassword },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setMessage(response.data);
//       setError("");
//       setShowLoginModal(true);
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Corporate Reset Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> New Password
//             </label>
//             <div className="relative">
//               <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="password"
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                 placeholder="Enter password"
//                 onPaste={(e) => e.preventDefault()}
//                 onCopy={(e) => e.preventDefault()}
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message:
//                       "Must start with a capital, include a number & special character, min 9 chars",
//                   },
//                 })}
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </span>
//               )}
//             </div>
//             {/* Password Requirements */}
//             <div className="text-sm text-gray-600 dark:text-gray-400">
//               <p className="font-medium">Password must:</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>Be at least 9 characters</li>
//                 <li>Start with an uppercase letter (A-Z)</li>
//                 <li>Include at least one lowercase letter (a-z)</li>
//                 <li>Include at least one number (0-9)</li>
//                 <li>Include at least one special character (!@#$%&*?)</li>
//               </ul>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Confirm Password
//             </label>
//             <div className="relative">
//               <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="password"
//                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                 placeholder="Confirm password"
//                 onPaste={(e) => e.preventDefault()}
//                 onCopy={(e) => e.preventDefault()}
//                 {...register("confirmpassword", {
//                   required: "Confirm password is required",
//                   validate: (value) => value === password || "Passwords do not match",
//                 })}
//               />
//               {errors.confirmpassword && (
//                 <span className="text-red-500 text-sm mt-1">
//                   {errors.confirmpassword.message}
//                 </span>
//               )}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
//             <h2 className="text-xl font-semibold text-gray-800 text-center">
//               Password Reset Successful! 🎉
//             </h2>
//             <p className="text-gray-600 text-center mt-2">
//               You can now log in with your new password.
//             </p>

//             <div className="flex justify-center space-x-4 mt-4">
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                 onClick={() => window.location.href = "/"} // Redirect to login page
//               >
//                 Go to home
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
//                 onClick={() => setShowLoginModal(false)} // Close modal
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorporateResetPassword;



// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const CorporateResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token"); // Get token from URL
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`; // Correct way in Vite

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       setError("Please enter both fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE}/corporate/corp/resetpassword`,
//         { token, newPassword, confirmPassword },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setMessage(response.data);
//       setError("");

//       // Open the Login Modal immediately after success
//       setShowLoginModal(true);
      
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Corporate Reset Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">New Password</label>
//             <input 
//               type="password" 
//               value={newPassword} 
//               onChange={(e) => setNewPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input 
//               type="password" 
//               value={confirmPassword} 
//               onChange={(e) => setConfirmPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button 
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
//             <h2 className="text-xl font-semibold text-gray-800 text-center">
//               Password Reset Successful! 🎉
//             </h2>
//             <p className="text-gray-600 text-center mt-2">
//               You can now log in with your new password.
//             </p>

//             <div className="flex justify-center space-x-4 mt-4">
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                 onClick={() => window.location.href = "/"} // Redirect to login page
//               >
//                 Go to home
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
//                 onClick={() => setShowLoginModal(false)} // Close modal
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorporateResetPassword;




import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const CorporateResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Please enter both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/corporate/corp/resetpassword`,
        { token, newPassword, confirmPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data);
      setError("");
      setShowLoginModal(true);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Corporate Reset Password
        </h2>

        {message && <p className="text-green-600 text-center mb-3">{message}</p>}
        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">New Password</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showNewPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <p className="font-medium">Password must:</p>
                <ul className="list-disc pl-5 space-y-1">
                <li> Must be at least 9 characters long </li>
                <li> Starts with an uppercase letter (A–Z) </li>
                <li> Includes at least one lowercase letter (a–z) </li>
                <li> Includes at least one number (0–9) </li>
                <li> Includes at least one special character (e.g., !@#$%) </li>
              </ul>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 text-center">
               Password Reset Successful! 🎉
            </h2>
            <p className="text-gray-600 text-center mt-2">
             Your password has been updated successfully.
             
             
            </p>
             <p className="text-blue-600 text-center mt-2"> Tip: Make sure to keep your password safe and secure.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={() => window.location.href = "/"}
              >
                Go to home
              </button>
              {/* <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateResetPassword;









// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

// const CorporateResetPassword = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token"); // Get token from URL
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`; // Correct way in Vite

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newPassword || !confirmPassword) {
//       setError("Please enter both fields.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE}/corporate/corp/resetpassword`,
//         { token, newPassword, confirmPassword },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       setMessage(response.data);
//       setError("");

//       // Open the Login Modal immediately after success
//       setShowLoginModal(true);
      
//     } catch (err) {
//       setError("Failed to reset password. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Corporate Reset Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">New Password</label>
//             <input 
//               type="password" 
//               value={newPassword} 
//               onChange={(e) => setNewPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium">Confirm Password</label>
//             <input 
//               type="password" 
//               value={confirmPassword} 
//               onChange={(e) => setConfirmPassword(e.target.value)} 
//               required 
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button 
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
//             <h2 className="text-xl font-semibold text-gray-800 text-center">
//               Password Reset Successful! 🎉
//             </h2>
//             <p className="text-gray-600 text-center mt-2">
//               You can now log in with your new password.
//             </p>

//             <div className="flex justify-center space-x-4 mt-4">
//               <button
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//                 onClick={() => window.location.href = "/"} // Redirect to login page
//               >
//                 Go to home
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
//                 onClick={() => setShowLoginModal(false)} // Close modal
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CorporateResetPassword;

