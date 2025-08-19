// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [signupType, setSignupType] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

//   const signupModalRef = useRef(null); // Signup modal reference

//   // Listen for login/logout state changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('authToken'));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   // Handle Login Submission
//   const onSubmit = async (data) => {
//     try {
//       console.log("Request Data:", data);
//       const response = await axios.post(
//         'http://localhost:8080/api/auth/login',
//         { email: data.email, password: data.password },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       console.log("Response Data:", response.data);

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);

//         // Dispatch event to update state globally
//         window.dispatchEvent(new Event("storage"));

//         toast.success("Successfully Logged In!");
//         setIsModalOpen(false);
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error('Error during login:', err.response || err);
//       toast.error('Login failed. Please check your email and password.');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');

//     // Dispatch event to update state globally
//     window.dispatchEvent(new Event("storage"));

//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   // Function to close signup modal
//   const closeSignupModal = () => {
//     if (signupModalRef.current) {
//       signupModalRef.current.close();
//     }
//   };

//   return (
//     <div className='text-black'>
//       {/* Login Modal */}
//       {isModalOpen && (
//         <dialog open id="my_modal_3" className="modal">
//           <div className="modal-box dark:bg-slate-800 dark:text-white">
//             <form onSubmit={handleSubmit(onSubmit)} method="dialog">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl">Login</h3>
//               <div className="py-1">
//                 <label className="mt-2 text-left block">
//                   <span>User Name:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type="text"
//                       className="grow"
//                       placeholder="UserName"
//                       {...register('email', { required: true })}
//                     />
//                     {errors.email && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                 </label>
//                 <label className="mt-2 text-left block">
//                   <span>Password:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="grow"
//                       placeholder="Password"
//                       {...register('password', { required: true })}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="p-1 focus:outline-none"
//                     >
//                       {showPassword ? (
//                         <EyeOffIcon className="h-5 w-5 text-gray-500" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-500" />
//                       )}
//                     </button>
//                     {errors.password && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                 </label>

//                 <div className="p-2">
//                   <button type="submit" className="text-lg btn btn-block btn-warning">
//                     Login
//                   </button>
//                 </div>
//                 <div className="p-2">
//                   <button className="text-lg btn btn-block btn-warning">
//                     <img src="/Google_logo.png" alt="Google Logo" className="w-12 " />
//                     Sign in with Google
//                   </button>
//                 </div>
//                 <div className="flex justify-around">
//                   <div>
//                     Not registered?{' '}
//                     <button
//                       className="underline text-blue-500 cursor-pointer"
//                       onClick={() => signupModalRef.current.showModal()}
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}

//       {/* Signup Type Selection Modal */}
//       <dialog ref={signupModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Choose Signup Type</h3>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="individual"
//               onChange={() => setSignupType('individual')}
//             />
//             Individual Signup
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="corporate"
//               onChange={() => setSignupType('corporate')}
//             />
//             Corporate Signup
//           </label>
//           <div className="p-2">
//             <button
//               className="text-lg btn btn-block btn-warning"
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 closeSignupModal();
//               }}
//               disabled={!signupType}
//             >
//               Continue
//             </button>
//           </div>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={closeSignupModal}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       {/* Login / Logout Toggle Button */}
//       <div className="navbar-end px-1">
//         {isLoggedIn ? (
//           <button
//             className="btn btn-warning px-3 py-2 rounded-md hover:bg-yellow-600 duration-300 cursor-pointer"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className="bg-slate-800 dark:bg-slate-900 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [signupType, setSignupType] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

//   const signupModalRef = useRef(null); // Signup modal reference

//   // Listen for login/logout state changes
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('authToken'));
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   // Handle Login Submission
//   const onSubmit = async (data) => {
//     try {
//       console.log("Request Data:", data);
//       const response = await axios.post(
//         'http://localhost:8080/api/auth/login',
//         { email: data.email, password: data.password },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       console.log("Response Data:", response.data);

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);

//         // Dispatch event to update state globally
//         window.dispatchEvent(new Event("storage"));

//         toast.success("Successfully Logged In!");
//         setIsModalOpen(false);
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error("Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       console.error('Error during login:', err.response || err);
//       toast.error('Login failed. Please check your email and password.');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');

//     // Dispatch event to update state globally
//     window.dispatchEvent(new Event("storage"));

//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   // Function to close signup modal
//   const closeSignupModal = () => {
//     if (signupModalRef.current) {
//       signupModalRef.current.close();
//     }
//   };

//   return (
//     <div className='text-black'>
//       {/* Login Modal */}
//       {isModalOpen && (
//         <dialog open id="my_modal_3" className="modal">
//           <div className="modal-box dark:bg-slate-800 dark:text-white">
//             <form onSubmit={handleSubmit(onSubmit)} method="dialog">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(false)}
//                 className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//               >
//                 ✕
//               </button>

//               <h3 className="text-2xl">Login</h3>
//               <div className="py-1">
//                 <label className="mt-2 text-left block">
//                   <span>User Name:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type="text"
//                       className="grow"
//                       placeholder="UserName"
//                       {...register('email', { required: true })}
//                     />
//                     {errors.email && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                 </label>
//                 <label className="mt-2 text-left block">
//                   <span>Password:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="grow"
//                       placeholder="Password"
//                       {...register('password', { required: true })}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="p-1 focus:outline-none"
//                     >
//                       {showPassword ? (
//                         <EyeOffIcon className="h-5 w-5 text-gray-500" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-500" />
//                       )}
//                     </button>
//                     {errors.password && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                 </label>

//                 <div className="p-2">
//                   <button type="submit" className="text-lg btn btn-block btn-warning">
//                     Login
//                   </button>
//                 </div>
//                 <div className="p-2">
//                   <button className="text-lg btn btn-block btn-warning">
//                     <img src="/Google_logo.png" alt="Google Logo" className="w-12 " />
//                     Sign in with Google
//                   </button>
//                 </div>
//                 <div className="flex justify-around">
//                   <div>
//                     Not registered?{' '}
//                     <button
//                       className="underline text-blue-500 cursor-pointer"
//                       onClick={() => signupModalRef.current.showModal()}
//                     >
//                       Sign Up
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}

//       {/* Signup Type Selection Modal */}
//       <dialog ref={signupModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Choose Signup Type</h3>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="individual"
//               onChange={() => setSignupType('individual')}
//             />
//             Individual Signup
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="corporate"
//               onChange={() => setSignupType('corporate')}
//             />
//             Corporate Signup
//           </label>
//           <div className="p-2">
//             <button
//               className="text-lg btn btn-block btn-warning"
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 closeSignupModal();
//               }}
//               disabled={!signupType}
//             >
//               Continue
//             </button>
//           </div>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={closeSignupModal}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       {/* Login / Logout Toggle Button */}
//       <div className="navbar-end px-1">
//         {isLoggedIn ? (
//           <button
//             className="btn btn-warning px-3 py-2 rounded-md hover:bg-yellow-600 duration-300 cursor-pointer"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className="bg-slate-800 dark:bg-slate-900 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import emailLogo from '../../public/email.png'

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const signupModalRef = useRef(null);
//   console.log(import.meta.env.VITE_URL);
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   // OTP states
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const [signupType, setSignupType]= useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
 
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');


//     // Dispatch event to update state globally
//     window.dispatchEvent(new Event("storage"));


//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };
  
//   const closeSignupModal = () => {
//     if (signupModalRef.current) {
//       signupModalRef.current.close();
//     }
//   };

//   // User Type Modal 
//   const userTypeModalRef = useRef(null);

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/auth/login',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/login',
//         // 'http://192.168.1.250:8080/api/auth/login',
//         // `${VITE_URL}/api/auth/login`,
//         { email: data.email, password: data.password },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         toast.success('Successfully Logged In!');
//         setIsModalOpen(false);
//         navigate('/plan');
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your email and password.');
//     }
//   };

//   // Function to send OTP
//   const sendOtp = async () => {
//     if (!email) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }
    
//     try {
//       const response = await axios.post(
//         // 'http://localhost:8080/api/auth/send-otp',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/send-otp',
//         'http://192.168.1.250:8080/api/auth/send-otp',
//         // `${VITE_URL}/api/auth/send-otp`,
//         { email }
//       );
      
//       if (response.status === 200) {
//         toast.success('OTP sent successfully!');
//         setOtpSent(true);
//       }
//     } catch (err) {
//       toast.error('Failed to send OTP. Try again.');
//       console.error(err);
//     }
//   };

//   // Verify OTP and open user type modal
//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(
//         // 'http://localhost:8080/api/auth/verify-otp',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/verify-otp',
//         'http://192.168.1.250:8080/api/auth/verify-otp',
//         // `${VITE_URL}/api/auth/verify-otp`,
//         { email, otp }
//       );

//       if (response.status === 200) {
//         toast.success('OTP verified!');

//         localStorage.setItem('verifiedEmail', email);

//         // Open the User Type Modal
//         setTimeout(() => {
//           userTypeModalRef.current.showModal();
//         }, 500);
//       } else {
//         toast.error('Invalid OTP. Try again.');
//       }
//     } catch (err) {
//       toast.error('OTP verification failed.');
//       console.error(err);
//     }
//   };

//   // Handle User Type Selection
//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current.close(); // Close modal after selection
//   };

//   return (
//     <div className="text-black">
//       {/* Login Modal */}
//       <dialog id="my_modal_3" className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <button
//             type="button"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => document.getElementById('my_modal_3').close()}
//           >
//             ✕
//           </button>

//           <form onSubmit={handleSubmit(onSubmit)} method="dialog">
//             <h3 className="text-2xl">Login</h3>
//             <div className="py-1">
//               <label className="mt-2 text-left block">
//                 <span>User Name:</span>
//                 <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="UserName"
//                     {...register('email', { required: false })}
//                   />
//                   {errors.email && <span className="text-2xl text-red-500">*</span>}
//                 </div>
//               </label>
//               <label className="mt-2 text-left block">
//                 <span>Password:</span>
//                 <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type="password"
//                     className="grow"
//                     placeholder="Password"
//                     {...register('password', { required: false })}
//                   />
//                   {errors.password && <span className="text-2xl text-red-500">*</span>}
//                 </div>
//               </label>

//               {error && <p style={{ color: 'red' }}>{error}</p>}
//               <div className="p-2">
//                 <button type="submit" className="text-lg btn btn-block btn-warning">
//                   Login
//                 </button>
//               </div>
//               <div className='p-2'>
//                   Not registered?{' '} 
                  
//                 </div>
//               {/* Register with Email Option */}
//               <div className="flex justify-around mt-2">
//                <div className='p-2'>
//                <button className="text-lg btn btn-block btn-warning">
//                     <img src="/Google_logo.png" alt="Google Logo" className="w-12 " />
//                     Sign in with Google
//                   </button>
//                 </div>
//                  <div  className='p-2'>
                
//                     {/* <button
//                           type="button"  // <-- Prevents accidental form submission
//                           className="text-lg btn btn-block btn-warning"
//                           onClick={() => {
//                             document.getElementById('my_modal_3').close(); // Close login modal
//                             setTimeout(() => otpModalRef.current.showModal(), 300); // Open OTP modal after delay
//                           }}
//                         >
//                           <img src={emailLogo} alt="Email Logo" className="w-12" />
//                           Sign in with Email
//                     </button> */}

// <button
//   type="button"
//   className="text-lg btn btn-block btn-warning"
//   onClick={() => {
//     const loginModal = document.getElementById('my_modal_3');

//     if (loginModal) {
//       loginModal.close(); // Close login modal if it's a <dialog> element
//       loginModal.style.display = "none"; // Extra step in case it's using CSS display property
//     }

//     setTimeout(() => {
//       if (otpModalRef.current) {
//         otpModalRef.current.showModal(); // Open OTP modal
//       } else {
//         console.error("OTP Modal reference is null");
//       }
//     }, 300);
//   }}
// >
//   <img src={emailLogo} alt="Email Logo" className="w-12" />
//   Sign in with Email
// </button>


                         
  
//                  </div>
//                  <br />
                
//               </div>
//             </div>
//           </form>
//         </div>
//       </dialog>

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Register with Email</h3>
//           <label className="mt-2 text-left block">
//             <span>Email:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//               <input
//                 type="email"
//                 className="grow"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </label>
//           <button
//             className="btn btn-block btn-primary mt-2"
//             onClick={sendOtp}
//             disabled={otpSent}
//           >
//             {otpSent ? 'OTP Sent ✔' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <label className="mt-2 text-left block">
//                 <span>Enter OTP:</span>
//                 <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
//               </label>
//               <button className="btn btn-block btn-success mt-2" onClick={verifyOtp}>
//                 Verify OTP
//               </button>
//             </>
//           )}

//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => otpModalRef.current.close()}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       {/* User Type Selection Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Choose Signup Type</h3>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="individual"
//               onChange={() => setSignupType('individual')}
//             />
//             Individual Signup
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="corporate"
//               onChange={() => setSignupType('corporate')}
//             />
//             Corporate Signup
//           </label>
//           <div className="p-2">
//             <button
//               className="text-lg btn btn-block btn-warning"
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 closeSignupModal();
//               }}
//               disabled={!signupType}
//             >
//               Continue
//             </button>
//           </div>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={closeSignupModal}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>
//       <div className="navbar-end px-1">
//         {isLoggedIn ? (
//           <button
//             className="btn btn-warning px-3 py-2 rounded-md hover:bg-yellow-600 duration-300 cursor-pointer"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className="bg-slate-800 dark:bg-slate-900 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Login
//           </button>
//         )}
//       </div>


//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import emailLogo from '../../public/email.png'
// import { EyeIcon, EyeOffIcon } from "lucide-react";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
   
  


//   // OTP states
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const [signupType, setSignupType]= useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const signupModalRef = useRef(null); 
//   const userTypeModalRef = useRef(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
 
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     window.dispatchEvent(new Event("storage"));
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };


    
//   const closeSignupModal = () => {
//     if (signupModalRef.current) {
//       signupModalRef.current.close();
//     }
//   };



//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         // 'http://localhost:8080/api/auth/login',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/login',
//         // 'http://192.168.1.250:8080/api/auth/login',
//         `${API_BASE}/api/auth/login`,
//         { email: data.email, password: data.password },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
// 	      window.dispatchEvent(new Event("storage"));
//         toast.success('Successfully Logged In!');
//         setIsModalOpen(false);
// 	      setIsLoggedIn(true);
        
//         navigate('/');
//       } else {
//          toast.error('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//      toast.error('Login failed. Please check your email and password.');
//     }
//   };

//   // Function to send OTP
//   const sendOtp = async () => {
//     if (!email) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }
    
//     try {
//       const response = await axios.post(
//         // 'http://localhost:8080/api/auth/send-otp',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/send-otp',
//         // 'http://192.168.1.250:8080/api/auth/send-otp',
//         `${API_BASE}/api/auth/send-otp`,
//         { email }
//       );
      
//       if (response.status === 200) {
//         toast.success('OTP sent successfully!');
//         setOtpSent(true);
//       }
//     } catch (err) {
//       toast.error('Failed to send OTP. Try again.');
//       console.error(err);
//     }
//   };

//   // Verify OTP and open user type modal
//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(
//         // 'http://localhost:8080/api/auth/verify-otp',
//         // 'http://192.168.1.250:8080/CMDA-3.3.9/api/auth/verify-otp',
//         // 'http://192.168.1.250:8080/api/auth/verify-otp',
//         `${API_BASE}/api/auth/verify-otp`,
//         { email, otp }
//       );

//       if (response.status === 200) {
//         toast.success('OTP verified!');

//         localStorage.setItem('verifiedEmail', email);

//         // Open the User Type Modal
//         setTimeout(() => {
//           userTypeModalRef.current.showModal();
//         }, 500);
//       } else {
//         toast.error('Invalid OTP. Try again.');
//       }
//     } catch (err) {
//       toast.error('OTP verification failed.');
//       console.error(err);
//     }
//   };

//   // Handle User Type Selection
//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current.close(); // Close modal after selection
//   };

//   return (
//     <div className="text-black">
//       {isModalOpen && (
//       <dialog  open id="my_modal_3" className="modal bg-opacity-50 bg-gray-400">
//         <div className="modal-box dark:bg-slate-800 dark:text-white bg-gradient-to-r from-yellow-50 to-white">
//           <button
//             type="button"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => setIsModalOpen(false)}
//           >
//             ✕
//           </button>

//           <form onSubmit={handleSubmit(onSubmit)} method="dialog">
       
//             <h3 className="text-2xl">Login</h3>
//             <div className="py-1">
//               <label className="mt-2 text-left block">
//                 <span >User Name:</span>
//                 <div className="input input-bordered w-full flex items-center text-sm font-normal text-gray-700 gap-2 dark:bg-slate-900 dark:text-white">
//   <input
//     type="text"
//     className="grow h-full px-3"
//     placeholder="UserName"
//     {...register('email', { required: false })}
//   />
//   {errors.email && <span className="text-2xl text-red-500">*</span>}
// </div>
//               </label>
//               <label className="mt-2 text-left block">
//                 <span>Password:</span>
//                 <div className="input input-bordered w-full flex items-center gap-2 text-sm font-normal text-gray-700 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="grow"
//                     placeholder="Password"
//                     {...register('password', { required: false })}
//                   />
//  		 <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="p-1 focus:outline-none"
//                     >
//                       {showPassword ? (
//                         <EyeOffIcon className="h-5 w-5 text-gray-500" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-500" />
//                       )}
//                     </button>
//                   {errors.password && <span className="text-2xl text-red-500">*</span>}
//                 </div>
//               </label>

//               {error && <p style={{ color: 'red' }}>{error}</p>}
//               <div className="p-2 mt-5">
//                 <button type="submit"  className="text-lg btn btn-block bg-yellow-300">
//                   Login
//                 </button>
// 		<Link to="/ForgotPassword" className="text-sm text-blue-500 hover:underline">
//                     Forgot Password?
//                   </Link>
//               </div>
//               <div className='p-2'>
//                   Not registered?{' '} 
                  
//                 </div>
//               {/* Register with Email Option */}
//               <div className="flex justify-around mt-2">
//                <div className='p-2'>
//                <button className="text-lg btn btn-block ">
//                 <div className='flex justify-center'>
//                     <img src="/Google_logo.png" alt="Google Logo" className="w-12" />
//                    <p className='text-base font-normal mt-3'> Google</p>
//                    </div>
//                   </button>
                  
//                 </div>
//                  <div  className='p-2'>
                
                    
// <button
//   type="button"
//   className="text-lg btn btn-block "
//   onClick={() => {
//     const loginModal = document.getElementById('my_modal_3');

//     if (loginModal) {
//       loginModal.close(); // Close login modal if it's a <dialog> element
//       loginModal.style.display = "none"; // Extra step in case it's using CSS display property
//     }

//     setTimeout(() => {
//       if (otpModalRef.current) {
//         otpModalRef.current.showModal(); // Open OTP modal
//       } else {
//         console.error("OTP Modal reference is null");
//       }
//     }, 300);
//   }}
// >
// <div className='flex justify-center'>
//   <img src={emailLogo} alt="Email Logo" className="w-12" />
//   <p className='text-base font-normal mt-3'>Email</p>
//   </div>
// </button>


                         
  
//                  </div>
//                  <br />
                
//               </div>
//             </div>
//           </form>
//         </div>
//       </dialog>
// )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white h-[250px]">
//           <h3 className="text-2xl">Register with Email</h3>
//           <label className="mt-2 text-left block">
//             <span>Email:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//               <input
//                 type="email"
//                 className="grow"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </label>
//           <button
//             className="btn btn-block btn-primary mt-2"
//             onClick={sendOtp}
//             disabled={otpSent}
//           >
//             {otpSent ? 'OTP Sent ✔' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <label className="mt-2 text-left block">
//                 <span>Enter OTP:</span>
//                 <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
//               </label>
//               <button className="btn btn-block btn-success mt-2" onClick={verifyOtp}>
//                 Verify OTP
//               </button>
//             </>
//           )}

//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => otpModalRef.current.close()}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       {/* User Type Selection Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Choose Signup Type</h3>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="individual"
//               onChange={() => setSignupType('individual')}
//             />
//             Individual Signup
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="corporate"
//               onChange={() => setSignupType('corporate')}
//             />
//             Corporate Signup
//           </label>
//           <div className="p-2">
//             <button
//               className="text-lg btn btn-block btn-warning"
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 closeSignupModal();
//               }}
//               disabled={!signupType}
//             >
//               Continue
//             </button>
//           </div>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={closeSignupModal}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>
//       <div className="navbar-end px-1">
//         {isLoggedIn ? (
//           <button
//             className="text-white"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className=" dark:bg-slate-900 text-white rounded-md  duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Login...
//           </button>
//         )}
//       </div>


//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;


//++++++++++++++++++++++++++++++++++++++++++++++

// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const signupModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         setIsModalOpen(false);
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Navbar Login/Logout */}
//       {/* <div className="navbar-end px-2">
//         {isLoggedIn ? (
//           <button onClick={handleLogout} className="btn btn-sm btn-error">Logout</button>
//         ) : (
//           <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-primary">Login</button>
//         )}
//       </div> */}
//       <div className="navbar-end px-4">
//   {isLoggedIn ? (
//     <button
//   onClick={handleLogout}
//   className="flex items-center gap-2 text-black px-4 py-2  transition duration-300 "
// >
//   <HiOutlineLogout className="text-2xl" />
//   <span className="hidden sm:inline font-medium">Logout</span>
// </button>

//   ) : (
//     <button
//       onClick={() => setIsModalOpen(true)}
//       className="flex items-center gap-2 text-black bg-slate-50 hover:bg-slate-50 px-4 py-2 rounded-lg transition duration-300"
//     >
//       <CgLogIn className="text-xl" />
//       <span className="hidden sm:inline">Login</span>
//     </button>
//   )}
// </div>


//       {/* Login Modal */}
//       {isModalOpen && (
//         <dialog open id="login_modal" className="modal z-[1000] fixed">
//           <div className="modal-box dark:bg-gray-900  dark:text-black shadow-lg rounded-xl">
//             <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

//               <div>
//                 <label className="text-sm">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block btn-primary">Login</button>

//               <Link to="/ForgotPassword" className="block text-center text-sm text-blue-500 mt-2 hover:underline">
//                 Forgot Password?
//               </Link>

//               <div className="divider">OR</div>

//               <div className="flex gap-3 justify-center">
//                   <div className='p-2'>
//                   <GoogleLoginButton/>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn flex-1 btn-outline"
//                   onClick={() => {
//                     document.getElementById('login_modal')?.close();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2" /> Email
//                 </button> 
//               </div>
//             </form>
//           </div>
//         </dialog>
// )}

//    {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />

//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent ✔' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>

//       {/* <Toaster position="top-right" /> */}
//     </div>
//   );
// };

// export default Login;








// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const signupModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         setIsModalOpen(false);
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
    

//       {/* Login Modal */}
//       {isModalOpen && (
//         <dialog open id="my_modal_3" className="modal z-[1000] fixed">
//           <div className="modal-box dark:bg-gray-900  dark:text-black shadow-lg rounded-xl">
//             <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>

//               <div>
//                 <label className="text-sm">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block btn-primary">Login</button>

//               <Link to="/ForgotPassword" className="block text-center text-sm text-blue-500 mt-2 hover:underline">
//                 Forgot Password?
//               </Link>

//               <div className="divider">OR</div>

//               <div className="flex gap-3 justify-center">
//                   <div className='p-2'>
//                   <GoogleLoginButton/>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn flex-1 btn-outline"
//                   onClick={() => {
//                     document.getElementById('login_modal')?.close();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2" /> Email
//                 </button> 
//               </div>
//             </form>
//           </div>
//         </dialog>

//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">âœ•</button>
//           <h3 className="text-xl font-semibold">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />

//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent âœ”' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">âœ•</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>


//             <div className="navbar-end px-4">
//   {isLoggedIn ? (
//     <button
//   onClick={handleLogout}
//   className="flex items-center gap-2 text-white px-4 py-2 hover:text-black "
// >
//   <HiOutlineLogout className="text-2xl" />
//   <span className="hidden sm:inline font-medium">Logout</span>
// </button>

//   ) : (
//     <button
//       onClick={() => setIsModalOpen(true)}
//       className="flex items-center gap-2 text-black bg-slate-50  px-4 py-2 rounded-lg"
//     >
//       <CgLogIn className="text-xl" />
//       <span className="hidden sm:inline">Login</span>
//     </button>
//   )}
// </div>


//       {/* <Toaster position="top-right" /> */}
//     </div>
//   );
// };

// export default Login;
//////////////////////////////////////////////////////////


// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';
// const Login = ({  isOpen, onClose, onSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//          onClose();
        
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//     // onClose();
//   };
//   const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      onClose();
//     if (onSuccess) onSuccess();
//     navigate('/');
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Login Button */}
//       <div className="navbar-end px-4">
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white px-4 py-2 hover:text-black"
//           >
//             <HiOutlineLogout className="text-2xl" />
//             <span className="hidden sm:inline font-medium">Logout</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 text-black bg-slate-50 px-4 py-2 rounded-lg"
//           >
//             <CgLogIn className="text-xl" />
            
//             <span className="hidden sm:inline">Login</span>
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md mx-4 z-[101]">
//             <button 
//               onClick={onClose}
//               className="absolute right-3 top-3 btn btn-sm btn-circle"
//             >
//               ✕
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Welcome Back</h2>

//               <div>
//                 <label className="text-sm dark:text-white">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm dark:text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block bg-sky-800 text-white">Login</button>

//               <Link 
//                 to="/ForgotPassword" 
//                 className="block text-center text-sm text-blue-500 mt-2 hover:underline"
//                 onClick={handleCloseModal}
//               >
//                 Forgot Password?
//               </Link>

//               <div className="divider dark:text-gray-400">OR</div>

//               <div className="flex gap-3 justify-center">
//                 <div className=''>
//                   <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn flex-1 btn-outline dark:text-white"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2 dark:text-white" /> Email
//                 </button> 
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800">
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold dark:text-white">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />

//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>

//       {/*<Toaster position="top-right" /> */}
//     </div>
//   );
// };

// export default Login;

// __________________Working code _________________________

// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';
// const Login = ({  isOpen, onClose, onSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//     useEffect(() => {
//     const handleStorageChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('authToken'));
//     };

//     // Listen for custom login event
//     window.addEventListener('authChange', handleStorageChange);

//     // Listen for storage events (for cross-tab updates)
//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('authChange', handleStorageChange);
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);
//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//          onClose();
        
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//       window.dispatchEvent(new Event('authChange'));
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//     // onClose();
//   };
//   const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      window.dispatchEvent(new Event('authChange'));
//      onClose();
//     if (onSuccess) onSuccess();
//     // navigate('/');
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("authChange"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//         // navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Login Button */}
//       <div className="navbar-end px-4">
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white px-4 py-2 hover:text-black"
//           >
//             <HiOutlineLogout className="text-2xl" />
//             <span className="hidden sm:inline font-medium">Logout</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 text-black bg-slate-50 px-4 py-2 rounded-lg"
//           >
//             <CgLogIn className="text-xl" />
            
//             <span className="hidden sm:inline">Login</span>
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md mx-4 z-[101]">
//             <button 
//               onClick={onClose}
//               className="absolute right-3 top-3 btn btn-sm btn-circle"
//             >
//               ✕
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Welcome Back</h2>

//               <div>
//                 <label className="text-sm dark:text-white">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm dark:text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block bg-sky-800 text-white">Login</button>

//               <Link 
//                 to="/ForgotPassword" 
//                 className="block text-center text-sm text-blue-500 mt-2 hover:underline"
//                 onClick={handleCloseModal}
//               >
//                 Forgot Password?
//               </Link>

//               <div className="divider dark:text-gray-400">OR</div>

//               <div className="flex gap-3 justify-center">
//                 <div className=''>
//                   <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn flex-1 btn-outline dark:text-white"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2 dark:text-white" /> Email
//                 </button> 
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800">
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold dark:text-white">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />

//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>

//       {/*<Toaster position="top-right" /> */}
//     </div>
//   );
// };

// export default Login;

// ________________________________________________________________
// -----------------------------------23/

// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//     const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      window.dispatchEvent(new Event('authChange'));
//      onClose();
//     if (onSuccess) onSuccess();
//     // navigate('/');
//   };

//   const handleCloseModal = () => {
    
//     setIsModalOpen(false);
//     reset();
//     // onClose(); // Ensure parent component's onClose is called
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
        
//         if (onSuccess) onSuccess();
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Conditionally render Login/Logout buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
//             <button 
//               onClick={onClose}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link 
//                   to="/ForgotPassword" 
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or continue with
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className='p-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
//                    <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
//           <button 
//             onClick={() => otpModalRef.current?.close()} 
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Register with Email</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">We'll send you a verification code</p>

//             <div className="space-y-6">
//               <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                   disabled={otpSent}
//                 />
//               </div>

//               <button
//                 onClick={sendOtp}
//                 className={`w-full py-3 rounded-lg font-medium text-white transition-all ${otpSent ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'} shadow-md`}
//                 disabled={!email || otpSent}
//               >
//                 {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//               </button>

//               {otpSent && (
//                 <>
//                   <div>
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification Code</label>
//                     <input
//                       type="text"
//                       value={otp}
//                       placeholder="Enter 6-digit code"
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                       maxLength={6}
//                     />
//                   </div>
//                   <button
//                     onClick={verifyOtp}
//                     className="w-full py-3 rounded-lg font-medium bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
//                     disabled={!otp || otp.length < 6}
//                   >
//                     Verify OTP
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
//           <button 
//             onClick={() => userTypeModalRef.current?.close()} 
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>

//             <div className="space-y-4 mb-6">
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'individual' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("individual")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'individual' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For personal use and individual creators</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'corporate' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("corporate")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'corporate' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'corporate' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For companies and organizations</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${!signupType ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
//             >
//               Continue
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;




// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//  const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//  const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false); 
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//     const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      window.dispatchEvent(new Event('authChange'));
//      onClose();
//     if (onSuccess) onSuccess();
//     // navigate('/');
//   };

//   const handleCloseModal = () => {
    
//     setIsModalOpen(false);
//     reset();
//     // onClose(); // Ensure parent component's onClose is called
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
        
//         if (onSuccess) onSuccess();
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         setShowOtpSentMessage(true);
//         setTimeout(() => {
//           setShowOtpSentMessage(false);
//         }, 5000);
//       }
//     } catch (err) {
//       setShowOtpErrorMessage(true); // Show error message
//       setTimeout(() => {
//         setShowOtpErrorMessage(false); // Hide error message after 3 seconds
//       }, 7000);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Conditionally render Login/Logout buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
//             <button 
//               onClick={onClose}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link 
//                   to="/ForgotPassword" 
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or signup with
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className='p-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
//                    <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//    {/* OTP Modal */}
//   <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
//       <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
//         {/* Gradient Header Bar */}
//         <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>
        
//         {/* Close Button */}
//         <button
//           onClick={() => otpModalRef.current?.close()}
//           className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="p-8 sm:p-10">
//           <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">Email Verification</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Enter your email to receive a secure verification code</p>

//           {/* OTP Sent Message */}
//           {showOtpSentMessage && (
//             <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               OTP Sent to {email}
//             </div>
//           )}

//           {/* OTP Error Message */}
//       {showOtpErrorMessage && (
//   <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
//     <svg
//       className="w-5 h-5 mt-1 shrink-0"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//     <div>
//       <p className="font-semibold mb-1"> Oops!</p>
//       <p>
//         The email you entered is already registered. <br />
//         Please log in instead or use a different email to sign up. 
//       </p>
//     </div>
//   </div>
// )}


//           <div className="space-y-7">
//             {/* Email Input */}
//             <div className="group">
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 placeholder="Enter your email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
//                 disabled={otpSent}
//               />
//             </div>

//             {/* Send OTP Button */}
//             <button
//               onClick={sendOtp}
//               className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
//                 ${otpSent
//                   ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
//                   : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
//                 } disabled:opacity-50 disabled:cursor-not-allowed`}
//               disabled={!email || otpSent}
//             >
//               {otpSent ? (
//                 <span className="flex items-center justify-center gap-2">
//                   OTP Sent <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </span>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>

//             {/* OTP Input Section */}
//             {otpSent && (
//               <>
//                 <div className="group">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Verification Code</label>
//                   <input
//                     type="text"
//                     value={otp}
//                     placeholder="Enter 6-digit code"
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
//                     maxLength={6}
//                   />
//                 </div>

//                 {/* Verify OTP Button */}
//                 <button
//                   onClick={verifyOtp}
//                   className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!otp || otp.length < 6}
//                 >
//                   Verify OTP
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
//           <button 
//             onClick={() => userTypeModalRef.current?.close()} 
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>

//             <div className="space-y-4 mb-6">
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'individual' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("individual")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'individual' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For personal use and individual creators</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'corporate' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("corporate")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'corporate' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'corporate' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For companies and organizations</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${!signupType ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
//             >
//               Continue
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//  const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//  const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false); 
//  const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//     const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      window.dispatchEvent(new Event('authChange'));
//      onClose();
//     if (onSuccess) onSuccess();
//     navigate('/');
//   };

//   const handleCloseModal = () => {
    
//     setIsModalOpen(false);
//     reset();
//     // onClose(); // Ensure parent component's onClose is called
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
        
//         if (onSuccess) onSuccess();
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         setShowOtpSentMessage(true);
//         setTimeout(() => {
//           setShowOtpSentMessage(false);
//         }, 5000);
//       }
//     } catch (err) {
//       setShowOtpErrorMessage(true); // Show error message
//       setTimeout(() => {
//         setShowOtpErrorMessage(false); // Hide error message after 3 seconds
//       }, 7000);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//       //  toast.success("OTP verified!");
//       //  setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//  setIsOtpVerified(true);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Conditionally render Login/Logout buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            
//             <button 
//               onClick={onClose}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link 
//                   to="/ForgotPassword" 
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or signup with
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className='p-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'>
//                    <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//    {/* OTP Modal */}
//   <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
//       <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
//         {/* Gradient Header Bar */}
//         <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>
        
//         {/* Close Button */}
//         <button
//           onClick={() => otpModalRef.current?.close()}
//           className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         <div className="p-8 sm:p-10">
//           <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">Email Verification</h3>
//           <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Enter your email to receive a secure verification code</p>

//           {/* OTP Sent Message */}
//           {showOtpSentMessage && (
//             <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//               OTP Sent to {email}
//             </div>
//           )}

//           {/* OTP Error Message */}
//       {showOtpErrorMessage && (
//   <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
//     <svg
//       className="w-5 h-5 mt-1 shrink-0"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//     <div>
//       <p className="font-semibold mb-1"> Oops!</p>
//       <p>
//         The email you entered is already registered. <br />
//         Please log in instead or use a different email to sign up. 
//       </p>
//     </div>
//   </div>
// )}


//           <div className="space-y-7">
//             {/* Email Input */}
//             <div className="group">
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Email Address</label>
//               <input
//                 type="email"
//                 value={email}
//                 placeholder="Enter your email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
//                 disabled={otpSent}
//               />
//             </div>

//             {/* Send OTP Button */}
//             <button
//               onClick={sendOtp}
//               className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
//                 ${otpSent
//                   ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
//                   : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
//                 } disabled:opacity-50 disabled:cursor-not-allowed`}
//               disabled={!email || otpSent}
//             >
//               {otpSent ? (
//                 <span className="flex items-center justify-center gap-2">
//                   OTP Sent <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </span>
//               ) : (
//                 'Send OTP'
//               )}
//             </button>

//             {/* OTP Input Section */}
//             {otpSent && (
//               <>
//     {/* Success Message */}
//     {isOtpVerified && (
//       <div className="mb-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
//         OTP verified successfully!
//       </div>
//     )}
//                 <div className="group">
//                   <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Verification Code</label>
//                   <input
//                     type="text"
//                     value={otp}
//                     placeholder="Enter 6-digit code"
//                     onChange={(e) => setOtp(e.target.value)}
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
//                     maxLength={6}
//                   />
//                 </div>

//                 {/* Verify OTP Button */}
//                 <button
//                   onClick={verifyOtp}
//                   className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!otp || otp.length < 6 || isOtpVerified}
//                 >
//                   Verify OTP
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
//           <button 
//             onClick={() => userTypeModalRef.current?.close()} 
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>

//             <div className="space-y-4 mb-6">
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'individual' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("individual")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'individual' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For personal use and individual creators</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div 
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${signupType === 'corporate' ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'}`}
//                 onClick={() => setSignupType("corporate")}
//               >
//                 <div className="flex items-start">
//                   <div className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${signupType === 'corporate' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'}`}>
//                     {signupType === 'corporate' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">For companies and organizations</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={() => {
//                 if (signupType === 'individual') navigate('/individualSignUp');
//                 else if (signupType === 'corporate') navigate('/corporateSignUp');
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${!signupType ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}
//             >
//               Continue
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;



// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
//   const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false); // Added for loading state
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   // const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success('Logged out successfully!');
//     navigate('/');
//   };

//   const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     window.dispatchEvent(new Event('authChange'));
//     onClose();
//     if (onSuccess) onSuccess();
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         data,
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event('storage'));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error('Enter a valid email.');
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         setShowOtpSentMessage(true);
//         setTimeout(() => {
//           setShowOtpSentMessage(false);
//         }, 5000);
//       }
//     } catch (err) {
//       setShowOtpErrorMessage(true);
//       setTimeout(() => {
//         setShowOtpErrorMessage(false);
//       }, 7000);
//     }
//   };

//   const verifyOtp = async () => {
//     setIsVerifying(true);
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem('verifiedEmail', email);
//         setIsOtpVerified(true);
//         toast.success('OTP verified!');
//         setTimeout(() => {
//           if (otpModalRef.current && userTypeModalRef.current) {
//             otpModalRef.current.close();
//             userTypeModalRef.current.showModal();
//           } else {
//             console.error('Modal references are not available');
//             toast.error('An error occurred. Please try again.');
//           }
//         }, 500);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'OTP verification failed.');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div className="text-black">
//       <Toaster />
//       {/* Conditionally render Login/Logout buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>

//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register('email', { required: 'Email is required' })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>

//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     {...register('password', { required: 'Password is required' })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link
//                   to="/ForgotPassword"
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>

//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or signup with
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                   <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess} />
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
//           {/* Gradient Header Bar */}
//           <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>

//           {/* Close Button */}
//           <button
//             onClick={() => otpModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           <div className="p-8 sm:p-10">
//             <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
//               Email Verification
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
//               Enter your email to receive a secure verification code
//             </p>

//             {/* OTP Sent Message */}
//             {showOtpSentMessage && (
//               <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 OTP Sent to {email}
//               </div>
//             )}

//             {/* OTP Error Message */}
//             {showOtpErrorMessage && (
//               <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
//                 <svg
//                   className="w-5 h-5 mt-1 shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <div>
//                   <p className="font-semibold mb-1">Oops!</p>
//                   <p>
//                     The email you entered is already registered. <br />
//                     Please log in instead or use a different email to sign up.
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-7">
//               {/* Email Input */}
//               <div className="group">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
//                   disabled={otpSent}
//                 />
//               </div>

//               {/* Send OTP Button */}
//               <button
//                 onClick={sendOtp}
//                 className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
//                   ${
//                     otpSent
//                       ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
//                       : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
//                   } disabled:opacity-50 disabled:cursor-not-allowed`}
//                 disabled={!email || otpSent}
//               >
//                 {otpSent ? (
//                   <span className="flex items-center justify-center gap-2">
//                     OTP Sent{' '}
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </span>
//                 ) : (
//                   'Send OTP'
//                 )}
//               </button>

//               {/* OTP Input Section */}
//               {otpSent && (
//                 <>
//                   {/* Success Message */}
//                   {isOtpVerified && (
//                     <div className="mb-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
//                       OTP verified successfully!
//                     </div>
//                   )}
//                   <div className="group">
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                       Verification Code
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       placeholder="Enter 6-digit code"
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
//                       maxLength={6}
//                     />
//                   </div>

//                   {/* Verify OTP Button */}
//                   <button
//                     onClick={verifyOtp}
//                     className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!otp || otp.length < 6 || isOtpVerified || isVerifying}
//                   >
//                     {isVerifying ? (
//                       <span className="flex items-center justify-center gap-2">
//                         Verifying...{' '}
//                         <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                       </span>
//                     ) : (
//                       'Verify OTP'
//                     )}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

//           <button
//             onClick={() => userTypeModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>

//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>

//             <div className="space-y-4 mb-6">
//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'individual'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('individual')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'individual'
//                         ? 'border-blue-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For personal use and individual creators
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'corporate'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('corporate')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'corporate'
//                         ? 'border-blue-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'corporate' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For companies and organizations
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <button
//               onClick={() => {
//                 if (signupType === 'individual')
//                   navigate('/individualSignUp', { state: { email, signupType: 'individual' } });
//                 else if (signupType === 'corporate')
//                   navigate('/corporateSignUp', { state: { email, signupType: 'corporate' } });
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
//                 !signupType
//                   ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700 shadow-md'
//               }`}
//             >
//               Continue
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 ml-2 inline"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;





// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
//  import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const navigate = useNavigate();
//   const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' }); // State for error modal
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
//   const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const errorModalRef = useRef(null); // Ref for error modal
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   // Open error modal when errorModal state changes
//   useEffect(() => {
//     if (errorModal.isOpen && errorModalRef.current) {
//       errorModalRef.current.showModal();
//     }
//   }, [errorModal.isOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     setErrorModal({ isOpen: true, message: 'Logged out successfully!' });
//     navigate('/');
//   };

//   const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     window.dispatchEvent(new Event('authChange'));
//     onClose();
//     if (onSuccess) onSuccess();
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         data,
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event('storage'));
//         setErrorModal({ isOpen: true, message: 'Logged in successfully!' });
//         handleCloseModal();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//       } else {
//         setErrorModal({ isOpen: true, message: 'Invalid credentials' });
//       }
//     } catch (err) {
//       setErrorModal({ isOpen: true, message: 'Login failed. Check email and password.' });
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) {
//       setErrorModal({ isOpen: true, message: 'Enter a valid email.' });
//       return;
//     }
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         setShowOtpSentMessage(true);
//         setTimeout(() => {
//           setShowOtpSentMessage(false);
//         }, 5000);
//       }
//     } catch (err) {
//       setShowOtpErrorMessage(true);
//       setTimeout(() => {
//         setShowOtpErrorMessage(false);
//       }, 7000);
//     }
//   };

//   const verifyOtp = async () => {
//     setIsVerifying(true);
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem('verifiedEmail', email);
//         setIsOtpVerified(true);
//         setErrorModal({ isOpen: true, message: 'OTP verified!' });
//         setTimeout(() => {
//           if (otpModalRef.current && userTypeModalRef.current) {
//             otpModalRef.current.close();
//             userTypeModalRef.current.showModal();
//           } else {
//             console.error('Modal references are not available');
//             setErrorModal({ isOpen: true, message: 'An error occurred. Please try again.' });
//           }
//         }, 500);
//       }
//     } catch (err) {
//       setErrorModal({ isOpen: true, message: err.response?.data?.message || 'OTP verification failed.' });
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div className="text-black">
//       {/* Login/Logout Buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//             <button
//               onClick={onClose}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register('email', { required: 'Email is required' })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     {...register('password', { required: 'Password is required' })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300  dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link
//                   to="/ForgotPassword"
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or signup with
//                   </span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                   <GoogleLoginButton onClose={handleCloseModal} onSuccess={handleGoogleLoginSuccess} />
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
//           <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>
//           <button
//             onClick={() => otpModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <div className="p-8 sm:p-10">
//             <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
//               Email Verification
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
//               Enter your email to receive a secure verification code
//             </p>
//             {showOtpSentMessage && (
//               <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 OTP Sent to {email}
//               </div>
//             )}
//             {showOtpErrorMessage && (
//               <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
//                 <svg
//                   className="w-5 h-5 mt-1 shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <div>
//                   <p className="font-semibold mb-1">Oops!</p>
//                   <p>
//                     The email you entered is already registered. <br />
//                     Please log in instead or use a different email to sign up.
//                   </p>
//                 </div>
//               </div>
//             )}
//             <div className="space-y-7">
//               <div className="group">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl  dark:text-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
//                   disabled={otpSent}
//                 />
//               </div>
//               <button
//                 onClick={sendOtp}
//                 className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
//                   ${
//                     otpSent
//                       ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
//                       : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
//                   } disabled:opacity-50 disabled:cursor-not-allowed`}
//                 disabled={!email || otpSent}
//               >
//                 {otpSent ? (
//                   <span className="flex items-center justify-center gap-2">
//                     OTP Sent{' '}
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </span>
//                 ) : (
//                   'Send OTP'
//                 )}
//               </button>
//               {otpSent && (
//                 <>
//                   {isOtpVerified && (
//                     <div className="mb-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
//                       OTP verified successfully!
//                     </div>
//                   )}
//                   <div className="group">
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                       Verification Code
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       placeholder="Enter 6-digit code"
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
//                       maxLength={6}
//                     />
//                   </div>
//                   <button
//                     onClick={verifyOtp}
//                     className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!otp || otp.length < 6 || isOtpVerified || isVerifying}
//                   >
//                     {isVerifying ? (
//                       <span className="flex items-center justify-center gap-2">
//                         Verifying...{' '}
//                         <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                       </span>
//                     ) : (
//                       'Verify OTP'
//                     )}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </dialog>

//       {/* Error Modal */}
//       <dialog ref={errorModalRef} className="modal z-[101] backdrop:bg-black/10 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-red-500/20 transition-all duration-300">
//           <div className="relative h-2 bg-gradient-to-r from-red-700 via-red-500 to-red-700 animate-pulse"></div>
//           <button
//             onClick={() => {
//               errorModalRef.current?.close();
//               setErrorModal({ isOpen: false, message: '' });
//             }}
//             className="absolute right-4 top-4 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-all duration-200 transform hover:scale-110"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <div className="p-8 sm:p-10">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
//               {errorModal.message.includes('success') ? 'Success' : 'Error'}
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{errorModal.message}</p>
//             <button
//               onClick={() => {
//                 errorModalRef.current?.close();
//                 setErrorModal({ isOpen: false, message: '' });
//               }}
//               className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//           <button
//             onClick={() => userTypeModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>
//             <div className="space-y-4 mb-6">
//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'individual'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('individual')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'individual'
//                         ? 'border-blue-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For personal use and individual creators
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'corporate'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('corporate')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'corporate'
//                         ? 'border-blue-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'corporate' && (
//                       <svg className="h-3-bd w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For companies and organizations
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 if (signupType === 'individual')
//                   navigate('/individualSignUp', { state: { email, signupType: 'individual' } });
//                 else if (signupType === 'corporate')
//                   navigate('/corporateSignUp', { state: { email, signupType: 'corporate' } });
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
//                 !signupType
//                   ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
//                   : 'bg-sky-600 hover:bg-blue-700 shadow-md'
//               }`}
//             >
//               Continue
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 ml-2 inline"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;

// -working code---------------------------------------

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import emailLogo from '../../public/email.png';
import { HiOutlineLogout } from 'react-icons/hi';
import GoogleLoginButton from './GoogleLoginButton';
import { CgLogIn } from 'react-icons/cg';

const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: '', type: 'error' }); // Added type: 'error' or 'success'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
  const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpModalRef = useRef(null);
  const userTypeModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const [signupType, setSignupType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && event.target.classList.contains('modal-overlay')) {
        handleCloseModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Open error modal when errorModal state changes
  useEffect(() => {
    if (errorModal.isOpen && errorModalRef.current) {
      errorModalRef.current.showModal();
    }
  }, [errorModal.isOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setErrorModal({ isOpen: true, message: 'Logged out successfully!', type: 'success' });
    navigate('/');
  };

  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.dispatchEvent(new Event('authChange'));
    onClose();
    if (onSuccess) onSuccess();
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${API_BASE}/auth/login`,
        data,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const { token, userType, email } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('userEmail', email);
        window.dispatchEvent(new Event('storage'));
        setErrorModal({ isOpen: true, message: 'Logged in successfully!', type: 'success' });
        handleCloseModal();
        setIsLoggedIn(true);
        if (onSuccess) onSuccess();
      } else {
        setErrorModal({ isOpen: true, message: 'Invalid credentials', type: 'error' });
      }
    } catch (err) {
      setErrorModal({ isOpen: true, message: 'Login failed. Check email and password.', type: 'error' });
    }
  };

  const sendOtp = async () => {
    if (!email) {
      setErrorModal({ isOpen: true, message: 'Enter a valid email.', type: 'error' });
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
      if (res.status === 200) {
        setOtpSent(true);
        setShowOtpSentMessage(true);
        setTimeout(() => {
          setShowOtpSentMessage(false);
        }, 5000);
      }
    } catch (err) {
      setShowOtpErrorMessage(true);
      setTimeout(() => {
        setShowOtpErrorMessage(false);
      }, 7000);
    }
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    try {
      const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
      if (res.status === 200) {
        localStorage.setItem('verifiedEmail', email);
        setIsOtpVerified(true);
        setErrorModal({ isOpen: true, message: 'OTP verified!', type: 'success' });
        setTimeout(() => {
          if (otpModalRef.current && userTypeModalRef.current) {
            otpModalRef.current.close();
            userTypeModalRef.current.showModal();
          } else {
            console.error('Modal references are not available');
            setErrorModal({ isOpen: true, message: 'An error occurred. Please try again.', type: 'error' });
          }
        }, 500);
      }
    } catch (err) {
      setErrorModal({ isOpen: true, message: err.response?.data?.message || 'OTP verification failed.', type: 'error' });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="text-black">
      {/* Login/Logout Buttons */}
      {showButtons && (
        <div className="navbar-end px-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <HiOutlineLogout className="text-xl" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <CgLogIn className="text-xl" />
              <span className="hidden sm:inline font-medium">Login</span>
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password', { required: 'Password is required' })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
                <Link
                  to="/ForgotPassword"
                  className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                  onClick={handleCloseModal}
                >
                  Forgot Password?
                </Link>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Login
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or signup with
                  </span>
                </div>
              </div>
            <div className="grid grid-cols-2 gap-4">
  <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
    <div className="w-full px-2 py-3">
      <GoogleLoginButton
        onClose={handleCloseModal}
        onSuccess={handleGoogleLoginSuccess}
      /> 
    </div>
  </div>

  <button
    type="button"
    className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
    onClick={() => {
      handleCloseModal();
      setTimeout(() => otpModalRef.current?.showModal(), 300);
    }}
  >
    <img src={emailLogo} alt="Email" className="w-5" /> Email
  </button>
</div>

            </form>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
        <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
          <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>
          <button
            onClick={() => otpModalRef.current?.close()}
            className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-8 sm:p-10">
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
              Email Verification
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Enter your email to receive a secure verification code
            </p>
            {showOtpSentMessage && (
              <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                OTP Sent to {email}
              </div>
            )}
            {showOtpErrorMessage && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold mb-1">Oops!</p>
                  <p>
                    The email you entered is already registered. <br />
                    Please log in instead or use a different email to sign up.
                  </p>
                </div>
              </div>
            )}
            <div className="space-y-7">
              <div className="group">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl dark:text-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
                  disabled={otpSent}
                />
              </div>
              <button
                onClick={sendOtp}
                className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
                  ${
                    otpSent
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={!email || otpSent}
              >
                {otpSent ? (
                  <span className="flex items-center justify-center gap-2">
                    OTP Sent{' '}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : (
                  'Send OTP'
                )}
              </button>
              {otpSent && (
                <>
                  {isOtpVerified && (
                    <div className="mb-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
                      OTP verified successfully!
                    </div>
                  )}
                  <div className="group">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      placeholder="Enter 6-digit code"
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
                      maxLength={6}
                    />
                  </div>
                  <button
                    onClick={verifyOtp}
                    className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!otp || otp.length < 6 || isOtpVerified || isVerifying}
                  >
                    {isVerifying ? (
                      <span className="flex items-center justify-center gap-2">
                        Verifying...{' '}
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </dialog>

      {/* Error/Success Modal */}
      <dialog ref={errorModalRef} className="modal z-[101] backdrop:bg-black/10 backdrop-blur-sm">
        <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl transition-all duration-300">
          <div
            className={`relative h-2 animate-pulse ${
              errorModal.type === 'success'
                ? 'bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700'
                : 'bg-gradient-to-r from-red-700 via-red-500 to-red-700'
            }`}
          ></div>
          <div
            className={`ring-1 ${
              errorModal.type === 'success' ? 'ring-emerald-500/20' : 'ring-red-500/20'
            }`}
          >
            <button
              onClick={() => {
                errorModalRef.current?.close();
                setErrorModal({ isOpen: false, message: '', type: 'error' });
              }}
              className={`absolute right-4 top-4 text-gray-400 transition-all duration-200 transform hover:scale-110 ${
                errorModal.type === 'success'
                  ? 'hover:text-emerald-500 dark:hover:text-emerald-400'
                  : 'hover:text-red-500 dark:hover:text-red-400'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
                {errorModal.type === 'success' ? 'Success' : 'Error'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{errorModal.message}</p>
              <button
                onClick={() => {
                  errorModalRef.current?.close();
                  setErrorModal({ isOpen: false, message: '', type: 'error' });
                }}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                  errorModal.type === 'success'
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-red-500/20'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* Signup Type Modal */}
      <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
        <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <button
            onClick={() => userTypeModalRef.current?.close()}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
            <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>
            <div className="space-y-4 mb-6">
              <div
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  signupType === 'individual'
                    ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
                onClick={() => setSignupType('individual')}
              >
                <div className="flex items-start">
                  <div
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
                      signupType === 'individual'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}
                  >
                    {signupType === 'individual' && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      For personal use and individual creators
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  signupType === 'corporate'
                    ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
                onClick={() => setSignupType('corporate')}
              >
                <div className="flex items-start">
                  <div
                    className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
                      signupType === 'corporate'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}
                  >
                    {signupType === 'corporate' && (
                      <svg className="h-3-bd w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      For companies and organizations
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (signupType === 'individual')
                  navigate('/individualSignUp', { state: { email, signupType: 'individual' } });
                else if (signupType === 'corporate')
                  navigate('/corporateSignUp', { state: { email, signupType: 'corporate' } });
                userTypeModalRef.current?.close();
              }}
              disabled={!signupType}
              className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
                !signupType
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-blue-700 shadow-md'
              }`}
            >
              Continue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Login;


// ----------------------------------------


// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import GoogleLoginButton from './GoogleLoginButton';
// import { CgLogIn } from 'react-icons/cg';

// const Login = ({ isOpen, onClose, onSuccess, showButtons = true }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const navigate = useNavigate();
//   const [errorModal, setErrorModal] = useState({ isOpen: false, message: '', type: 'error' });
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [showOtpSentMessage, setShowOtpSentMessage] = useState(false);
//   const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [cooldown, setCooldown] = useState(0); // New state for cooldown timer
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const errorModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(isOpen);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Sync isModalOpen with isOpen prop
//   useEffect(() => {
//     setIsModalOpen(isOpen);
//   }, [isOpen]);

//   // Listen for storage or authChange events
//   useEffect(() => {
//     const handleAuthChange = () => {
//       setIsLoggedIn(!!localStorage.getItem('authToken'));
//     };

//     window.addEventListener('storage', handleAuthChange);
//     window.addEventListener('authChange', handleAuthChange);

//     return () => {
//       window.removeEventListener('storage', handleAuthChange);
//       window.removeEventListener('authChange', handleAuthChange);
//     };
//   }, []);

//   // Cooldown timer effect
//   useEffect(() => {
//     let timer;
//     if (cooldown > 0) {
//       timer = setInterval(() => {
//         setCooldown((prev) => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [cooldown]);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isModalOpen]);

//   // Open error modal when errorModal state changes
//   useEffect(() => {
//     if (errorModal.isOpen && errorModalRef.current) {
//       errorModalRef.current.showModal();
//     }
//   }, [errorModal.isOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     setErrorModal({ isOpen: true, message: 'Logged out successfully!', type: 'success' });
//     window.dispatchEvent(new Event('authChange'));
//     navigate('/');
//   };

//   const handleGoogleLoginSuccess = (response) => {
//     const { token, userType, email } = response || {};
//     if (token) {
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userType', userType || 'individual');
//       localStorage.setItem('userEmail', email || '');
//       setIsLoggedIn(true);
//       window.dispatchEvent(new Event('storage'));
//       window.dispatchEvent(new Event('authChange'));
//       setErrorModal({ isOpen: true, message: 'Logged in successfully with Google!', type: 'success' });
//       handleCloseModal();
//       onClose();
//       if (onSuccess) onSuccess();
//       navigate('/');
//     } else {
//       setErrorModal({ isOpen: true, message: 'Google login failed. Please try again.', type: 'error' });
//     }
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//     onClose();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/login`,
//         data,
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event('storage'));
//         window.dispatchEvent(new Event('authChange'));
//         setErrorModal({ isOpen: true, message: 'Logged in successfully!', type: 'success' });
//         handleCloseModal();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//       } else {
//         setErrorModal({ isOpen: true, message: 'Invalid credentials', type: 'error' });
//       }
//     } catch (err) {
//       setErrorModal({ isOpen: true, message: 'Login failed. Check email and password.', type: 'error' });
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) {
//       setErrorModal({ isOpen: true, message: 'Enter a valid email.', type: 'error' });
//       return;
//     }
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         setShowOtpSentMessage(true);
//         setCooldown(30); // Start 30-second cooldown
//         setTimeout(() => {
//           setShowOtpSentMessage(false);
//         }, 5000);
//       }
//     } catch (err) {
//       setShowOtpErrorMessage(true);
//       setTimeout(() => {
//         setShowOtpErrorMessage(false);
//       }, 7000);
//     }
//   };

//   const verifyOtp = async () => {
//     setIsVerifying(true);
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem('verifiedEmail', email);
//         setIsOtpVerified(true);
//         setErrorModal({ isOpen: true, message: 'OTP verified!', type: 'success' });
//         setTimeout(() => {
//           if (otpModalRef.current && userTypeModalRef.current) {
//             otpModalRef.current.close();
//             userTypeModalRef.current.showModal();
//           } else {
//             console.error('Modal references are not available');
//             setErrorModal({ isOpen: true, message: 'An error occurred. Please try again.', type: 'error' });
//           }
//         }, 500);
//       }
//     } catch (err) {
//       setErrorModal({ isOpen: true, message: err.response?.data?.message || 'OTP verification failed.', type: 'error' });
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <div className="text-black">
//       {/* Login/Logout Buttons */}
//       {showButtons && (
//         <div className="navbar-end px-4">
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <HiOutlineLogout className="text-xl" />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 border border-white text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
//             >
//               <CgLogIn className="text-xl" />
//               <span className="hidden sm:inline font-medium">Login</span>
//             </button>
//           )}
//         </div>
//       )}

//       {/* Login Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           <div className="fixed inset-0 bg-black bg-opacity-10 modal-overlay backdrop-blur-sm"></div>
//           <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 z-[101] overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//             <button
//               onClick={handleCloseModal}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//               <div className="text-center">
//                 <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Welcome Back</h2>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register('email', { required: 'Email is required' })}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     {...register('password', { required: 'Password is required' })}
//                     className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 <Link
//                   to="/ForgotPassword"
//                   className="text-sm text-blue-600 mr-0 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
//                   onClick={handleCloseModal}
//                 >
//                   Forgot Password?
//                 </Link>
//                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-sky-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all"
//               >
//                 Login
//               </button>
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                     Or signup with
//                   </span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
//                   <div className="w-full px-4 py-3">
//                     <GoogleLoginButton
//                       onSuccess={handleGoogleLoginSuccess}
//                       onClose={handleCloseModal}
//                     />
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal z-[100] backdrop:bg-black/10 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl ring-1 ring-sky-500/20 transition-all duration-300">
//           <div className="relative h-2 bg-gradient-to-r from-sky-700 via-cyan-500 to-sky-700 animate-pulse"></div>
//           <button
//             onClick={() => otpModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-400 hover:text-sky-500 dark:text-gray-300 dark:hover:text-cyan-400 transition-all duration-200 transform hover:scale-110"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <div className="p-8 sm:p-10">
//             <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
//               Email Verification
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
//               Enter your email to receive a secure verification code
//             </p>
//             {showOtpSentMessage && (
//               <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center gap-2 animate-fade-in">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 OTP Sent to {email}
//               </div>
//             )}
//             {showOtpErrorMessage && (
//               <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-yellow-800 dark:text-red-300 rounded-xl flex items-start gap-3 animate-fade-in">
//                 <svg
//                   className="w-5 h-5 mt-1 shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   aria-hidden="true"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <div>
//                   <p className="font-semibold mb-1">Oops!</p>
//                   <p>
//                     The email you entered is already registered. <br />
//                     Please log in instead or use a different email to sign up.
//                   </p>
//                 </div>
//               </div>
//             )}
//             <div className="space-y-7">
//               <div className="group">
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your email"
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl dark:text-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:border-sky-500/50"
//                   disabled={otpSent}
//                 />
//               </div>
//               <button
//                 onClick={sendOtp}
//                 className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5
//                   ${
//                     cooldown > 0
//                       ? 'bg-gray-400 cursor-not-allowed shadow-none'
//                       : otpSent
//                       ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
//                       : 'bg-gradient-to-r from-sky-700 to-cyan-500 hover:from-sky-800 hover:to-cyan-600 shadow-cyan-500/30'
//                   }`}
//                 disabled={!email || cooldown > 0}
//               >
//                 {cooldown > 0 ? (
//                   <span className="flex items-center justify-center gap-2">
//                     Resend in {cooldown}s
//                   </span>
//                 ) : otpSent ? (
//                   <span className="flex items-center justify-center gap-2">
//                     OTP Sent{' '}
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </span>
//                 ) : (
//                   'Send OTP'
//                 )}
//               </button>
//               {otpSent && (
//                 <>
//                   {isOtpVerified && (
//                     <div className="mb-4 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-center">
//                       OTP verified successfully!
//                     </div>
//                   )}
//                   <div className="group">
//                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
//                       Verification Code
//                     </label>
//                     <input
//                       type="text"
//                       value={otp}
//                       placeholder="Enter 6-digit code"
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 bg-gray-50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all duration-300 group-hover:border-sky-500/50"
//                       maxLength={6}
//                     />
//                   </div>
//                   <button
//                     onClick={verifyOtp}
//                     className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                     disabled={!otp || otp.length < 6 || isOtpVerified || isVerifying}
//                   >
//                     {isVerifying ? (
//                       <span className="flex items-center justify-center gap-2">
//                         Verifying...{' '}
//                         <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                       </span>
//                     ) : (
//                       'Verify OTP'
//                     )}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </dialog>

//       {/* Error/Success Modal */}
//       <dialog ref={errorModalRef} className="modal z-[101] backdrop:bg-black/10 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl transition-all duration-300">
//           <div
//             className={`relative h-2 animate-pulse ${
//               errorModal.type === 'success'
//                 ? 'bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-700'
//                 : 'bg-gradient-to-r from-red-700 via-red-500 to-red-700'
//             }`}
//           ></div>
//           <div
//             className={`ring-1 ${
//               errorModal.type === 'success' ? 'ring-emerald-500/20' : 'ring-red-500/20'
//             }`}
//           >
//             <button
//               onClick={() => {
//                 errorModalRef.current?.close();
//                 setErrorModal({ isOpen: false, message: '', type: 'error' });
//               }}
//               className={`absolute right-4 top-4 text-gray-400 transition-all duration-200 transform hover:scale-110 ${
//                 errorModal.type === 'success'
//                   ? 'hover:text-emerald-500 dark:hover:text-emerald-400'
//                   : 'hover:text-red-500 dark:hover:text-red-400'
//               }`}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             <div className="p-8 sm:p-10">
//               <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">
//                 {errorModal.type === 'success' ? 'Success' : 'Error'}
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">{errorModal.message}</p>
//               <button
//                 onClick={() => {
//                   errorModalRef.current?.close();
//                   setErrorModal({ isOpen: false, message: '', type: 'error' });
//                 }}
//                 className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
//                   errorModal.type === 'success'
//                     ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 shadow-emerald-500/20'
//                     : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-red-500/20'
//                 }`}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal backdrop:bg-black/50 backdrop-blur-sm">
//         <div className="modal-box p-0 max-w-md dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
//           <button
//             onClick={() => userTypeModalRef.current?.close()}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//           <div className="p-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Account</h3>
//             <p className="text-gray-500 dark:text-gray-300 mb-6">Select your account type</p>
//             <div className="space-y-4 mb-6">
//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'individual'
//                     ? 'border-blue-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('individual')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'individual'
//                         ? 'border-blue-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'individual' && (
//                       <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Individual Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For personal use and individual creators
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
//                   signupType === 'corporate'
//                     ? 'border-sky-500 bg-blue-50 dark:bg-gray-700 shadow-md'
//                     : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
//                 }`}
//                 onClick={() => setSignupType('corporate')}
//               >
//                 <div className="flex items-start">
//                   <div
//                     className={`flex items-center justify-center h-6 w-6 rounded-full border-2 mr-3 mt-1 ${
//                       signupType === 'corporate'
//                         ? 'border-sky-500 bg-blue-500'
//                         : 'border-gray-300 dark:border-gray-500'
//                     }`}
//                   >
//                     {signupType === 'corporate' && (
//                       <svg className="h-3-bd w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path
//                           fillRule="evenodd"
//                           d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-gray-800 dark:text-white">Business Account</h4>
//                     <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
//                       For companies and organizations
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 if (signupType === 'individual')
//                   navigate('/individualSignUp', { state: { email, signupType: 'individual' } });
//                 else if (signupType === 'corporate')
//                   navigate('/corporateSignUp', { state: { email, signupType: 'corporate' } });
//                 userTypeModalRef.current?.close();
//               }}
//               disabled={!signupType}
//               className={`w-full py-3 rounded-lg font-medium text-white transition-all ${
//                 !signupType
//                   ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
//                   : 'bg-sky-600 hover:bg-blue-700 shadow-md'
//               }`}
//             >
//               Continue
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 ml-2 inline"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';
// const Login = ({  isOpen, onClose, onSuccess }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isOpen && event.target.classList.contains('modal-overlay')) {
//         // handleCloseModal();
//          onClose();
        
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//     // onClose();
//   };
// const handleEmailLoginClick = () => {
//     handleCloseModal(); // Reset form and local state
//     if (otpModalRef.current) {
//       otpModalRef.current.showModal(); // Open OTP modal
//     } else {
//       console.error('OTP modal ref is null');
//     }
//     // Do not call onClose() to prevent unmounting the Login component
//   };
//   const handleGoogleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     // handleCloseModal();
//      onClose();
//     if (onSuccess) onSuccess();
//     navigate('/');
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         // handleCloseModal();
//         onClose();
//         setIsLoggedIn(true);
//         if (onSuccess) onSuccess();
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Login Button */}
//       <div className="navbar-end px-4">
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white px-4 py-2 hover:text-black"
//           >
//             <HiOutlineLogout className="text-2xl" />
//             <span className="hidden sm:inline font-medium">Logout</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 text-black bg-slate-50 px-4 py-2 rounded-lg"
//           >
//             <CgLogIn className="text-xl" />
            
//             <span className="hidden sm:inline">Login</span>
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           {/* Overlay */}
//           <div className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"></div>
          
//           {/* Modal Content */}
//           <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md mx-4 z-[101]">
//             <button 
//               onClick={onClose}
//               className="absolute right-3 top-3 btn btn-sm btn-circle"
//             >
//               ✕
//             </button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Welcome Back</h2>

//               <div>
//                 <label className="text-sm dark:text-white">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm dark:text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block bg-sky-800 text-white">Login</button>

//               <Link 
//                 to="/ForgotPassword" 
//                 className="block text-center text-sm text-blue-500 mt-2 hover:underline"
//                 onClick={onClose}
//               >
//                 Forgot Password?
//               </Link>

//               <div className="divider dark:text-gray-400">OR</div>

//               <div className="flex gap-3 justify-center">
//                 <div className=''>
//                   <GoogleLoginButton onClose={onClose} onSuccess={handleGoogleLoginSuccess}/>
//                 </div>
//            <button
//                   type="button"
//                   className="btn flex-1 btn-outline dark:text-white"
//                   onClick={handleEmailLoginClick}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2 dark:text-white" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800">
          
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold dark:text-white">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />

//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">
//                 Verify OTP
//               </button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>

//       {/*<Toaster position="top-right" /> */}
//     </div>
//   );
// };

// export default Login;


///////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import emailLogo from '../../public/email.png';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import GoogleLoginButton from './GoogleLoginButton';

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   // Close modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal')) {
//         setIsModalOpen(false);
//         reset();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isModalOpen, reset]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userName');
//     window.dispatchEvent(new Event('storage'));
//     setIsLoggedIn(false);
//     toast.success('Logged out successfully!');
//     navigate('/');
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     reset();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/api/auth/login`,
//         { email: data.email, password: data.password },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event('storage'));
//         toast.success('Successfully Logged In!');
//         closeModal();
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials. Please try again.');
//       }
//     } catch (err) {
//       toast.error('Login failed. Please check your email and password.');
//       console.error(err);
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) {
//       toast.error('Please enter a valid email address.');
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_BASE}/api/auth/send-otp`, { email });
//       if (response.status === 200) {
//         toast.success('OTP sent successfully!');
//         setOtpSent(true);
//       }
//     } catch (err) {
//       toast.error('Failed to send OTP. Try again.');
//       console.error(err);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(`${API_BASE}/api/auth/verify-otp`, { email, otp });
//       if (response.status === 200) {
//         toast.success('OTP verified!');
//         localStorage.setItem('verifiedEmail', email);
//         otpModalRef.current.close();
//         setTimeout(() => userTypeModalRef.current?.showModal(), 300);
//       } else {
//         toast.error('Invalid OTP. Try again.');
//       }
//     } catch (err) {
//       toast.error('OTP verification failed.');
//       console.error(err);
//     }
//   };

//   const handleUserTypeSelection = (type) => {
//     navigate('/register', { state: { email, signupType: type } });
//     userTypeModalRef.current?.close();
//   };

//   return (
//     <div className="text-black">
//       {/* Login Button */}
//       <div className="navbar-end px-1">
//         {isLoggedIn ? (
//           <button
//             className="btn bg-cyan-600 text-white text-xl mt-2"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         ) : (
//           <button
//             className="bg-slate-800 dark:bg-slate-900 text-xl text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
//             onClick={() => setIsModalOpen(true)}
//           >
//             Login...
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       {isModalOpen && (
//         <dialog id="my_modal_3" className="modal" open>
//           <div className="modal-box dark:bg-slate-800 dark:text-white">
//             <button
//               type="button"
//               className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//               onClick={closeModal}
//             >
//               ✕
//             </button>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <h3 className="text-2xl">Login</h3>
//               <div className="py-1">
//                 <label className="mt-2 text-left block">
//                   <span>User Name:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type="email"
//                       className="grow"
//                       placeholder="user@example.com"
//                       {...register('email', {
//                         required: 'Email is required',
//                         pattern: {
//                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                           message: 'Invalid email address',
//                         },
//                       })}
//                     />
//                     {errors.email && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                   {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                 </label>
//                 <label className="mt-2 text-left block">
//                   <span>Password:</span>
//                   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       className="grow"
//                       placeholder="••••••••"
//                       {...register('password', { required: 'Password is required' })}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="p-1 focus:outline-none"
//                     >
//                       {showPassword ? (
//                         <EyeOffIcon className="h-5 w-5 text-gray-500" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-500" />
//                       )}
//                     </button>
//                     {errors.password && <span className="text-2xl text-red-500">*</span>}
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-sm">{errors.password.message}</p>
//                   )}
//                 </label>
//                 {error && <p className="text-red-500">{error}</p>}
//                 <div className="p-2">
//                   <button type="submit" className="text-lg btn btn-block btn-warning">
//                     Login
//                   </button>
//                   <Link
//                     to="/ForgotPassword"
//                     className="text-sm text-blue-500 hover:underline block mt-2"
//                     onClick={closeModal}
//                   >
//                     Forgot Password?
//                   </Link>
//                 </div>
//                 <div className="p-2 text-center">
//                   Not registered?{' '}
//                   <Link
//                     to="/register"
//                     className="text-sm text-blue-500 hover:underline"
//                     onClick={closeModal}
//                   >
//                     Sign up here
//                   </Link>
//                 </div>
//                 <div className="flex justify-around mt-2">
//                   <div className="p-2">
//                     <GoogleLoginButton onClose={closeModal} />
//                   </div>
//                   <div className="p-2">
//                     <button
//                       type="button"
//                       className="text-lg btn btn-block btn-warning"
//                       onClick={() => {
//                         setIsModalOpen(false);
//                         setTimeout(() => otpModalRef.current?.showModal(), 300);
//                       }}
//                     >
//                       <img src={emailLogo} alt="Email Logo" className="w-12" />
//                       Sign in with Email
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </dialog>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Register with Email</h3>
//           <label className="mt-2 text-left block">
//             <span>Email:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//               <input
//                 type="email"
//                 className="grow"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </label>
//           <button
//             className="btn btn-block btn-primary mt-2"
//             onClick={sendOtp}
//             disabled={otpSent}
//           >
//             {otpSent ? 'OTP Sent ✔' : 'Send OTP'}
//           </button>
//           {otpSent && (
//             <>
//               <label className="mt-2 text-left block">
//                 <span>Enter OTP:</span>
//                 <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                   <input
//                     type="text"
//                     className="grow"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                   />
//                 </div>
//               </label>
//               <button className="btn btn-block btn-success mt-2" onClick={verifyOtp}>
//                 Verify OTP
//               </button>
//             </>
//           )}
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => otpModalRef.current?.close()}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       {/* User Type Selection Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800 dark:text-white">
//           <h3 className="text-2xl">Choose Signup Type</h3>
//           <label className="flex items-center gap-2 mt-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="individual"
//               onChange={() => setSignupType('individual')}
//             />
//             Individual Signup
//           </label>
//           <label className="flex items-center gap-2 mt-2">
//             <input
//               type="radio"
//               name="signupType"
//               value="corporate"
//               onChange={() => setSignupType('corporate')}
//             />
//             Corporate Signup
//           </label>
//           <div className="p-2">
//             <button
//               className="text-lg btn btn-block btn-warning"
//               onClick={() => handleUserTypeSelection(signupType)}
//               disabled={!signupType}
//             >
//               Continue
//             </button>
//           </div>
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={() => userTypeModalRef.current?.close()}
//           >
//             ✕
//           </button>
//         </div>
//       </dialog>

//       <Toaster position="top-right" />
//     </div>
//   );
// };

// export default Login;
/////////////////////////////////////////////

// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { EyeIcon, EyeOffIcon } from 'lucide-react';
// import emailLogo from '../../public/email.png';
// import { HiOutlineLogout } from 'react-icons/hi';
// import { CgLogIn } from 'react-icons/cg';
// import GoogleLoginButton from './GoogleLoginButton';

// const Login = () => {
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [signupType, setSignupType] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
//   const otpModalRef = useRef(null);
//   const userTypeModalRef = useRef(null);

//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isModalOpen && event.target.classList.contains('modal-overlay')) {
//         handleCloseModal();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isModalOpen]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     toast.success("Logged out successfully!");
//     navigate('/');
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     reset();
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${API_BASE}/auth/login`, data, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.status === 200) {
//         const { token, userType, email } = response.data;
//         localStorage.setItem('authToken', token);
//         localStorage.setItem('userType', userType);
//         localStorage.setItem('userEmail', email);
//         window.dispatchEvent(new Event("storage"));
//         toast.success('Logged in successfully!');
//         handleCloseModal();
//         setIsLoggedIn(true);
//         navigate('/');
//       } else {
//         toast.error('Invalid credentials');
//       }
//     } catch (err) {
//       toast.error('Login failed. Check email and password.');
//     }
//   };

//   const sendOtp = async () => {
//     if (!email) return toast.error("Enter a valid email.");
//     try {
//       const res = await axios.post(`${API_BASE}/auth/send-otp`, { email });
//       if (res.status === 200) {
//         setOtpSent(true);
//         toast.success("OTP sent successfully.");
//       }
//     } catch (err) {
//       toast.error("Failed to send OTP.");
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
//       if (res.status === 200) {
//         localStorage.setItem("verifiedEmail", email);
//         toast.success("OTP verified!");
//         setTimeout(() => userTypeModalRef.current?.showModal(), 500);
//       }
//     } catch (err) {
//       toast.error("OTP verification failed.");
//     }
//   };

//   return (
//     <div className="text-black">
//       {/* Login Button */}
//       <div className="navbar-end px-4">
//         {isLoggedIn ? (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 text-white px-4 py-2 hover:text-black"
//           >
//             <HiOutlineLogout className="text-2xl" />
//             <span className="hidden sm:inline font-medium">Logout</span>
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 text-black bg-slate-50 px-4 py-2 rounded-lg"
//           >
//             <CgLogIn className="text-xl" />
//             <span className="hidden sm:inline">Login</span>
//           </button>
//         )}
//       </div>

//       {/* Login Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center">
//           <div className="fixed inset-0 bg-black bg-opacity-50 modal-overlay"></div>

//           <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md mx-4 z-[101]">
//             <button onClick={handleCloseModal} className="absolute right-3 top-3 btn btn-sm btn-circle">✕</button>

//             <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
//               <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">Welcome Back</h2>

//               <div>
//                 <label className="text-sm dark:text-white">Email</label>
//                 <input
//                   type="email"
//                   placeholder="user@example.com"
//                   {...register("email", { required: "Email is required" })}
//                   className="input input-bordered w-full mt-1 dark:bg-slate-800"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="text-sm dark:text-white">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     {...register("password", { required: "Password is required" })}
//                     className="input input-bordered w-full mt-1 pr-10 dark:bg-slate-800"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-2"
//                   >
//                     {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//               </div>

//               <button type="submit" className="btn btn-block bg-sky-800 text-white">Login</button>

//               <Link to="/ForgotPassword" onClick={handleCloseModal}
//                 className="block text-center text-sm text-blue-500 mt-2 hover:underline">
//                 Forgot Password?
//               </Link>

//               <div className="divider dark:text-gray-400">OR</div>

//               <div className="flex gap-3 justify-center">
//                 <GoogleLoginButton closeModal={handleCloseModal} onSuccess={() => {
//                   setIsLoggedIn(true);
//                   //if (onSuccess) onSuccess();
//                 }} />
//                 <button
//                   type="button"
//                   className="btn flex-1 btn-outline dark:text-white"
//                   onClick={() => {
//                     handleCloseModal();
//                     setTimeout(() => otpModalRef.current?.showModal(), 300);
//                   }}
//                 >
//                   <img src={emailLogo} alt="Email" className="w-5 mr-2 dark:text-white" /> Email
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* OTP Modal */}
//       <dialog ref={otpModalRef} className="modal">
//         <div className="modal-box dark:bg-slate-800">
//           <button onClick={() => otpModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold dark:text-white">Register with Email</h3>

//           <input
//             type="email"
//             value={email}
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="input input-bordered w-full mt-3"
//           />
//           <button onClick={sendOtp} className="btn btn-primary btn-block mt-3" disabled={otpSent}>
//             {otpSent ? 'OTP Sent ✓' : 'Send OTP'}
//           </button>

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 value={otp}
//                 placeholder="Enter OTP"
//                 onChange={(e) => setOtp(e.target.value)}
//                 className="input input-bordered w-full mt-3"
//               />
//               <button onClick={verifyOtp} className="btn btn-success btn-block mt-3">Verify OTP</button>
//             </>
//           )}
//         </div>
//       </dialog>

//       {/* Signup Type Modal */}
//       <dialog ref={userTypeModalRef} className="modal">
//         <div className="modal-box">
//           <button onClick={() => userTypeModalRef.current?.close()} className="btn btn-sm btn-circle absolute right-3 top-3">✕</button>
//           <h3 className="text-xl font-semibold mb-3">Select Signup Type</h3>
//           <div className="space-y-2">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("individual")} /> Individual
//             </label>
//             <label className="flex items-center gap-2">
//               <input type="radio" name="signupType" onChange={() => setSignupType("corporate")} /> Corporate
//             </label>
//           </div>
//           <button
//             onClick={() => {
//               if (signupType === 'individual') navigate('/individualSignUp');
//               else if (signupType === 'corporate') navigate('/corporateSignUp');
//               userTypeModalRef.current?.close();
//             }}
//             disabled={!signupType}
//             className="btn btn-warning btn-block mt-4"
//           >
//             Continue
//           </button>
//         </div>
//       </dialog>
//     </div>
//   );
// };

// export default Login;
