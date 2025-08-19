// import React, { useState } from "react";
// import axios from "axios";
// import HomeNavbar from "./HomeNavbar";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     console.log("Form submitted"); // Check if the form submission is triggering

//     if (!email) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");
      
//       // Logging the email to confirm the correct value
//       console.log("Submitting email:", email);

//       // Send the POST request to the backend API
//       const response = await axios.post(`${API_BASE}/api/users/forgetpass`, { email });
//       console.log("Response status:", response.status); // Log the response status

//       // Handle success response
//       if (response.status === 200) {
//         setMessage("Password reset link has been sent to your email.");
//       }
//     } catch (error) {
//       setMessage("");
      
//       // Handle error response
//       console.log("Error:", error);
//       if (error.response && error.response.data) {
//         setError(error.response.data);
//       } else {
//         setError("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div>
//       <HomeNavbar/>
//       <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white ">
      
//       <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10 space-y-6 dark:bg-slate-800 dark:text-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:bg-slate-800 dark:text-white">Forgot Password</h2>
//         <div>
//           <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2 dark:bg-slate-800 dark:text-white">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Enter your email"
//             required
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-slate-800 dark:text-white"
//           />
//         </div>
//         <button type="submit" className="w-full bg-yellow-600 text-black py-3 rounded-lg 0">
//           Send Reset Link
//         </button>
//         {message && <p className="text-green-600 text-center font-medium">{message}</p>}
//         {error && <p className="text-red-600 text-center font-medium">{error}</p>}
//       </form>
//     </div>
//       </div>
//   );
// };

// export default ForgotPassword;




//-----------------------------------------working------------------------------------------------//

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");
//       setLoading(true);

//       // Step 1: Fetch userType from backend
//       const userTypeResponse = await axios.post(
//         `${API_BASE}/auth/check-user-type`,
//         { email }
//       );
//       const userType = userTypeResponse.data.userType;

//       if (!userType) {
//         throw new Error("User type could not be determined.");
//       }

//       // Step 2: Choose the correct API based on userType
//       const apiUrl =
//         userType === "corporate"
//           ? `${API_BASE}/corporate/forgetpass`
//           : `${API_BASE}/users/forgetpass`;

//       // Step 3: Send password reset request
//       const response = await axios.post(apiUrl, { email });

//       if (response.status === 200) {
//         const token = response.data.token;

//         if (!token) {
//           // If backend sends reset email without token, show success message
//           setMessage("Password reset link has been sent to your email.");
//           toast.success("Reset link sent!");
//           return;
//         }

//         // Redirect user to reset password page with token
//         navigate(`/reset-password?type=${userType}&token=${token}`);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError(
//         err.response?.data?.message || "Something went wrong. Please try again later."
//       );
//       toast.error("Failed to send reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Forgot Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg text-white transition duration-300 ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Verifying..." : "Send Reset Link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

///////////---------------------working-----------------------------------------


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       setError("");
//       setMessage("");
//       setLoading(true);

//       // Step 1: Fetch userType from backend
//       const userTypeResponse = await axios.post(
//         `${API_BASE}/auth/check-user-type`,
//         { email }
//       );
//       const userType = userTypeResponse.data.userType;

//       if (!userType) {
//         throw new Error("User type could not be determined.");
//       }

//       // Step 2: Choose the correct API based on userType
//       const apiUrl =
//         userType === "corporate"
//           ? `${API_BASE}/corporate/forgetpass`
//           : `${API_BASE}/users/forgetpass`;

//       // Step 3: Send password reset request
//       const response = await axios.post(apiUrl, { email });

//       if (response.status === 200) {
//         const token = response.data.token;

//         if (!token) {
//           // If backend sends reset email without token, show success message and redirect
//           setMessage("Password reset link has been sent to your email.");
//           toast.success("Reset link sent!");
//           // Redirect to home after a short delay to show toast
//           setTimeout(() => {
//             navigate("/");
//           }, 2000); // 2-second delay
//           return;
//         }

//         // Redirect user to reset password page with token
//         navigate(`/reset-password?type=${userType}&token=${token}`);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError(
//         err.response?.data?.message || "Something went wrong. Please try again later."
//       );
//       toast.error("Failed to send reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//           Forgot Password
//         </h2>

//         {message && <p className="text-green-600 text-center mb-3">{message}</p>}
//         {error && <p className="text-red-600 text-center mb-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-lg text-white transition duration-300 ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Verifying..." : "Send Reset Link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);

      // Step 1: Fetch userType from backend
      const userTypeResponse = await axios.post(
        `${API_BASE}/auth/check-user-type`,
        { email }
      );
      const userType = userTypeResponse.data.userType;

      if (!userType) {
        throw new Error("User type could not be determined.");
      }

      // Step 2: Choose the correct API based on userType
      const apiUrl =
        userType === "corporate"
          ? `${API_BASE}/corporate/forgetpass`
          : `${API_BASE}/users/forgetpass`;

      // Step 3: Send password reset request
      const response = await axios.post(apiUrl, { email });

      if (response.status === 200) {
        const token = response.data.token;

        if (!token) {
          // If backend sends reset email without token, show success message and redirect
          setMessage("Password reset link has been sent to your email.");
          toast.success("Reset link sent!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        }

        // Redirect user to reset password page with token
        navigate(`/reset-password?type=${userType}&token=${token}`);
      }
    } catch (err) {
      console.error("Error:", err);

      if (
        err.response?.status === 404 ||
        err.response?.data?.message === "User not found"
      ) {
        setError("not-found");
      } else {
        setError(
          err.response?.data?.message || "Something went wrong. Please try again later."
        );
        toast.error("Failed to send reset link.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Forgot Password
        </h2>

        {/* ✅ Friendly Not Registered Message */}
        {error === "not-found" ? (
          <div className="text-center bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-4">
        
            <p className="font-semibold">We couldn’t find your account.</p>
            <p className="text-sm">It looks like you haven’t registered yet.</p>
            <p className="mt-2">
               Please{" "}
              <a href="/signup" className="text-blue-600 underline">
                sign up
              </a>{" "}
              first.
            </p>
          </div>
        ) : error ? (
          <p className="text-red-600 text-center mb-3">{error}</p>
        ) : null}

        {message && (
          <p className="text-green-600 text-center mb-3">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Verifying..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
