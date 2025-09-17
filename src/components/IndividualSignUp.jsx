// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { IoFlagSharp, IoHomeOutline, IoHomeSharp } from 'react-icons/io5';
// import Login from './Login';
// import { data } from 'autoprefixer';
// import { FaIdCard } from 'react-icons/fa';
// import HomeNavbar from './HomeNavbar';

// const IndividualSignUp = () => {
//   const [showMoreDetails, setShowMoreDetails] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState('');
//   const navigate = useNavigate();
//   const { register, handleSubmit,setValue, watch, formState: { errors } } = useForm({ mode: "onChange" });
//   const password = watch("password");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//    useEffect(() => {
//       const storedEmail = localStorage.getItem("verifiedEmail");
//       if (storedEmail) {
//         setVerifiedEmail(storedEmail);
//         setValue("email", storedEmail); // Pre-fill the email field
//       }
//     }, [setValue]);

//   const onSubmit = async (data) => {
//     const payload = {
//       fullname: data.fullname,
//       email: verifiedEmail || data.email,
//       password: data.password,
//       countryCode: data.countryCode,
//       mobileNum: data.mobileNum,
//       ...(showMoreDetails && {
//         gender: data.gender,
//         adharcard: data.adharcard,
//         pancard: data.pancard,
//         address: data.address,
//         dateofbirth: data.dateofbirth,
//         terms: false,
//       }),
//     };

//     try {
//       const response = await fetch(`${API_BASE}/api/auth/individual/register`, {
//         // const response = await fetch("http://192.168.1.250:8080/CMDA-3.3.9/api/auth/individual/register", {
//           // const response = await fetch("http://192.168.1.250:8080/api/auth/individual/register", {

//           // const response = await fetch(`${VITE_URL}/api/auth/individual/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert("Individual Signup Successful");
//         localStorage.removeItem("verifiedEmail"); // Clear stored email
//         navigate("/");
//       } else {
//         throw new Error(await response.text());
//       }
//     } catch (error) {
//       toast.error("Failed to Signup. Please try again.");
//     }
//   };

//   return (
//     <>
//           <HomeNavbar/>
          
            
//     <div className="min-h-screen flex items-center justify-center dark:bg-slate-800 dark:text-white ">

      
//       {/* <Link to="/" className="absolute top-4 left-4 text-black-500 hover:text-black-700">
//                 <IoHomeOutline className="ml-10 mt-10  text-2xl" />
//               </Link> */}
//          {/* <div className="modal-box dark:bg-slate-800 dark:text-white"> */}
//          {/* <h1 className="text-3xl font-semibold mb-4">
//           Signup
//           <span className=" dark:bg-slate-600 dark:text-white inline-flex items-center rounded-md bg-sky-100 px-2 py-1 text-xs font-large text-black-700 ring-1 ring-inset ring-red-600/10">
//             New User
//           </span>
//         </h1> */}
//       <div className="form-container aligns-center border border-black-5 p-10 max-h-[80vh] overflow-y-auto w-full sm:w-[400px] rounded-md bg-white dark:bg-slate-900 shadow-md">

//       <form onSubmit={handleSubmit(onSubmit)} className=''>
//       <>
//       <h1 className="text-3xl mt-0 font-semibold mb-4 text-center">
//           Signup
//           <span className="text-center dark:bg-slate-600 dark:text-white inline-flex items-center rounded-md bg-sky-100 px-2 py-1 text-xs font-large text-black-700 ring-1 ring-inset ring-red-600/10">
//             New User
//           </span>
//         </h1>
      
//              <h3 className="text-2xl flex justify-center">Create Individual Account</h3>

//                  <label className="block mt-5">
//                  <span className='text-l text-red-500'>*</span><span>Full Name:</span>
//               <div className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
//                   <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//                 </svg>
//                 <input type="text" className="grow " placeholder="Full Name" {...register("fullname", { required: true })} />
                
//                 {errors.fullname && <span className='text-l text-red-500'>required</span>}
//               </div>
//             </label>


//             {/* <label className="block">
//             <span className='text-l text-red-500'>*</span><span>Email:</span>
//               <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//                   <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                   <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                 </svg>
//                 <input type="email" className="grow" placeholder="Your Email" {...register("email", { required: true })} />
//                 <div className="input-group-append">
//                   <span className="input-group-text">@example.com</span>
//                 </div>
//                 {errors.email && <span className='text-l text-red-500'>required</span>}
               
//               </div>
//             </label> */}

            
//             <label className="block mt-5">
//               <span className='text-l text-red-500'>*</span><span>Email:</span>
//               <div className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//                   <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                   <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//                 </svg>
//                 <input 
//                   type="email"
//                   className="grow" placeholder="Corp Email"
//                   {...register("email", { required: true })}
//                   value={verifiedEmail || ''} // Auto-fill the email
//                   readOnly={!!verifiedEmail} // Make read-only if email is verified
//                 />
//               </div>
//               {errors.email && <span className='text-l text-red-500'>required</span>}
//             </label>


// {/* 
//             <label className="block">
//             <span className='text-l text-red-500'>*</span><span>Password:</span>
//               <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
//                   <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
//                 </svg>
//                 <input type="password" className="grow" placeholder="Password" {...register("password", { required: true })} />
                
//                 {errors.pass && <span className='text-l text-red-500'>required</span>}
//               </div>
//             </label>

//             <label className="block">
//             <span className='text-l text-red-500'>*</span><span>Confirm Password:</span>
//               <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
//                   <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
//                 </svg>
//                 <input type="password" className="grow" placeholder="Confirm Password" {...register("confirmpassword", { required: true })} />
               
//                 {errors.confirmpassword && <span className='text-l text-red-500'>required</span>}
//               </div>
//             </label> */}
//  <label className="block mt-5">
//         <span className="text-l text-red-500">*</span>
//         <span>Password:</span>
//         <div className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//             <path
//               fillRule="evenodd"
//               d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             type="password"
//             className="grow"
//             placeholder="Password"
//             onPaste={(e) => e.preventDefault()}  // Prevent pasting
//             onCopy={(e) => e.preventDefault()}  // Prevent copying
//             {...register("password", {
//               required: "Password is required",
//               pattern: {
//                 value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
//                 message: "Must start with a capital, include a number & special character, min 8 chars"
//               }
//             })}
//           />
//         </div>
//         {errors.password && <span className="text-l text-red-500">{errors.password.message}</span>}
//       </label>

//       {/* Confirm Password Field */}
//       <label className="block mt-5">
//         <span className="text-l text-red-500">*</span>
//         <span>Confirm Password:</span>
//         <div className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//             <path
//               fillRule="evenodd"
//               d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <input
//             type="password"
//             className="grow"
//             placeholder="Confirm Password"
//             onPaste={(e) => e.preventDefault()}  // Prevent pasting
//             onCopy={(e) => e.preventDefault()}  // Prevent copying
//             {...register("confirmpassword", {
//               required: "Confirm password is required",
//               validate: (value) => value === password || "Passwords do not match"
//             })}
//           />
//         </div>
//         {errors.confirmpassword && <span className="text-l text-red-500">{errors.confirmpassword.message}</span>}
//       </label>


//             <label className="block mt-5">
//             <span className='text-l text-red-500'>*</span><span>Country Name:</span>
//               <div 
//               className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white"
//               >
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
              
//               <IoFlagSharp /> 
//                 </svg>
//                 <select 
//                  {...register("countryCode", { required: true })}
//                  className=" w-full py-2 bg-white dark:bg-gray-900 dark:text-white  "
//                  >
//                   <option  disabled selected>Country Name</option>
                  
//                     <option>+91 <span>India</span></option>
//                     <option>+93 <span>Afghanistan</span></option>
//                     <option>+358 <span>Aland Islands</span></option>
//                     <option>+82 <span>Korea</span></option>
//                   </select>
                
//                 {errors.countryCode && <span className='text-l text-red-500'>required</span>}
//               </div>
//             </label>

//             <label className="block mt-5">
//   <span className='text-l text-red-500'>*</span><span>Contact Number:</span>
//   <div className="input input-bordered mt-2 flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//     </svg>
//     <input 
//       type="text" 
//       className="grow" 
//       placeholder="Contact Number" 
//       {...register("mobileNum", { 
//         required: "Contact number is required",
//         pattern: {
//           value: /^[0-9]{10}$/,  // Regex for exactly 10 digits
//           message: "Contact number must be exactly 10 digits"
//         }
//       })} 
//       maxLength={10} // Ensures user can't enter more than 10 digits
//     />
//   </div>
//   {errors.mobileNum && <span className='text-l text-red-500'>{errors.mobileNum.message}</span>}
// </label>

//             <div className="mt-2 text-sm font-bold ">
//           <p>Note:</p>
//           <ul className="list-disc pl-5">
//             <li>Maximum 8 characters.</li>
//             <li>Staring with uppercase letter (A-Z).
//             </li>
//             <li>At least one lowercase letter (a-z).</li>
//             <li>At least one number (0-9).</li>
//             <li>At least one special character (!@#$%&*?).</li>
//           </ul>
//         </div>

//               {/* Add More Details button */}
//               <div className="flex justify-center  font-bold items-center my-4">
//                   <button type="button" onClick={() => setShowMoreDetails(prev => !prev)}>
//                     {showMoreDetails ? "Hide More Details" : "Add More Details"}
//                   </button>
//                 </div>

//                 {/* Additional Fields (only show if showMoreDetails is true) */}
//                 {showMoreDetails && (
//                    <>
//                    <label className="block">
//          <span>gender:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
//                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//               </svg>
//               <input type="text" className="grow" placeholder="gender" {...register("gender", { required: false })} />
             
//               {errors.gender && <span className='text-l text-red-500'>required</span>}
//             </div>
//           </label>

//           <label className="block">
//           <span>adharcard:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//            <FaIdCard/>
//               <input type="text" className="grow" placeholder="adharcard" {...register("adharcard", { required: false })} />
             
//               {errors.adharcard && <span className='text-l text-red-500'>required</span>}
//             </div>
//           </label>

//           <label className="block">
//           <span>pancard:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//             <FaIdCard/>
//               <input type="text" className="grow" placeholder="pancard" {...register("pancard", { required: false })} />
             
//               {errors.pancard && <span className='text-l text-red-500'>required</span>}
//             </div>
//           </label>

//           <label className="block">
//           <span>address:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//                 <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
//                 <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
//               </svg>
//               <input type="text" className="grow" placeholder="address" {...register("address", { required: false })} />
             
//               {errors.address && <span className='text-l text-red-500'>required</span>}
//             </div>
//           </label>

//           <label className="block">
//          <span>dateofbirth:</span>
//             <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70 ">
//                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//               </svg>
//               <input type="date" className="grow" placeholder="dateofbirth" {...register("dateofbirth", { required: false })} />
             
//               {errors.dateofbirth && <span className='text-l text-red-500'>required</span>}
//             </div>
//           </label>

//           <br></br>
//           <div>
//             <label className="cursor-pointer flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="terms"
//                 checked={data.terms}
              
//                 className="checkbox checkbox-warning"
//               />
//               <span>I agree to the Terms and Conditions</span>
//             </label>
//           </div>

                 
                  
                 
//                 </>
//                 )}
          

//             <div className="p-3">
//             <button className="text-lg btn btn-block btn-warning">Sign Up</button>
//             </div>
            

//             <div className="p-2">
//               <button onClick={() => toast.error("Sign in with Google functionality coming soon!")} className="text-lg btn btn-block btn-warning">
//                 <img src="/Google_logo.png" alt="Google Logo" className="w-12 h-12" />
//                 Sign in with Google
//               </button>
//             </div>

//             <div>
//               Already have an account? 
//               <button className="text-lg font-bold underline text-sky-500 ml-4 cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>
//                 <Login/>
//               </button>
            
//                    </div>
//               </>
//       </form>
//     </div>
//          </div>
    
    
//     </>
//   );
// };

// export default IndividualSignUp;











// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
// import { IoFlagSharp } from 'react-icons/io5';
// import Login from './Login';
// import HomeNavbar from './HomeNavbar';

// const IndividualSignUp = () => {
//   const [showMoreDetails, setShowMoreDetails] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState('');
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ mode: "onChange" });
//   const password = watch("password");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("verifiedEmail");
//     if (storedEmail) {
//       setVerifiedEmail(storedEmail);
//       setValue("email", storedEmail);
//     }
//   }, [setValue]);

//   const onSubmit = async (data) => {
//     const payload = {
//       fullname: data.fullname,
//       email: verifiedEmail || data.email,
//       password: data.password,
//       countryCode: data.countryCode,
//       mobileNum: data.mobileNum,
//       userType: data.userType,
//       ...(showMoreDetails && {
//         gender: data.gender,
//         adharcard: data.adharcard,
//         pancard: data.pancard,
//         address: data.address,
//         dateofbirth: data.dateofbirth,
//         terms: data.terms,
//       }),
//     };

//     try {
//       const response = await fetch(`${API_BASE}/auth/individual/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success("Individual Signup Successful");
//         localStorage.removeItem("verifiedEmail");
//         navigate("/");
//       } else {
//         throw new Error(await response.text());
//       }
//     } catch (error) {
//       toast.error("Failed to Signup. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
//       <HomeNavbar />
//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
//           <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
//             Individual Sign Up
//             <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
//               New User
//             </span>
//           </h1>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Full Name
//                 </label>
//                 <div className="relative">
//                   <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     placeholder="Enter full name"
//                     {...register("fullname", { required: "Full name is required" })}
//                   />
//                   {errors.fullname && (
//                     <span className="text-red-500 text-sm mt-1">{errors.fullname.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Email
//                 </label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     placeholder="Enter email"
//                     {...register("email", { required: "Email is required" })}
//                     value={verifiedEmail || ''}
//                     readOnly={!!verifiedEmail}
//                   />
//                   {errors.email && (
//                     <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Password
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     placeholder="Enter password"
//                     onPaste={(e) => e.preventDefault()}
//                     onCopy={(e) => e.preventDefault()}
//                     {...register("password", {
//                       required: "Password is required",
//                       pattern: {
//                         pattern: {
//                                     value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                                     message: "Must start with a capital, include a number & special character, min 9 chars"
//                                   }

//                       }
//                     })}
//                   />
//                   {errors.password && (
//                     <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Confirm Password
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     placeholder="Confirm password"
//                     onPaste={(e) => e.preventDefault()}
//                     onCopy={(e) => e.preventDefault()}
//                     {...register("confirmpassword", {
//                       required: "Confirm password is required",
//                       validate: (value) => value === password || "Passwords do not match"
//                     })}
//                   />
//                   {errors.confirmpassword && (
//                     <span className="text-red-500 text-sm mt-1">{errors.confirmpassword.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Country Code */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Country
//                 </label>
//                 <div className="relative">
//                   <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <select
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     {...register("countryCode", { required: "Country is required" })}
//                   >
//                     <option value="" disabled selected>Select Country</option>
//                     <option value="+91">India (+91)</option>
//                     <option value="+93">Afghanistan (+93)</option>
//                     <option value="+358">Aland Islands (+358)</option>
//                     <option value="+82">Korea (+82)</option>
//                   </select>
//                   {errors.countryCode && (
//                     <span className="text-red-500 text-sm mt-1">{errors.countryCode.message}</span>
//                   )}
//                 </div>
//               </div>

//               <label className="block">
//   <span className='text-l text-red-500'>*</span><span>User Type:</span>
//   <div className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//       <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
//     </svg>
//     <select
//       {...register("userType", { required: "User type is required" })}
//       className="w-full py-2 bg-white dark:bg-gray-900 dark:text-white"
//     >
//       <option value="" disabled selected>Select User Type</option>
//       <option value="Salaried">Salaried</option>
//       <option value="Housewife">Housewife</option>
//     </select>
//   </div>
//   {errors.userType && <span className='text-l text-red-500'>{errors.userType.message}</span>}
// </label>

//               {/* Contact Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Contact Number
//                 </label>
//                 <div className="relative">
//                   <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                     placeholder="Enter 10-digit number"
//                     maxLength={10}
//                     {...register("mobileNum", {
//                       required: "Contact number is required",
//                       pattern: {
//                         value: /^[0-9]{10}$/,
//                         message: "Contact number must be exactly 10 digits"
//                       }
//                     })}
//                   />
//                   {errors.mobileNum && (
//                     <span className="text-red-500 text-sm mt-1">{errors.mobileNum.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Password Requirements */}
//               <div className="text-sm text-gray-600 dark:text-gray-400">
//                 <p className="font-medium">Password must:</p>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>Be at least 9 characters</li>
//                   <li>Start with an uppercase letter (A-Z)</li>
//                   <li>Include at least one lowercase letter (a-z)</li>
//                   <li>Include at least one number (0-9)</li>
//                   <li>Include at least one special character (!@#$%&*?)</li>
//                 </ul>
//               </div>
//             </div>

//             {/* Additional Details Button */}
//             <div className="flex justify-center">
//               <button
//                 type="button"
//                 onClick={() => setShowMoreDetails(prev => !prev)}
//                 className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
//               >
//                 {showMoreDetails ? "Hide Additional Details" : "Add More Details"}
//               </button>
//             </div>

//             {/* Additional Fields */}
//             {showMoreDetails && (
//               <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Gender
//                   </label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                       placeholder="Enter gender"
//                       {...register("gender")}
//                     />
//                   </div>
//                 </div>

//                 {/* Aadhar Card */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Aadhar Card
//                   </label>
//                   <div className="relative">
//                     <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                       placeholder="Enter Aadhar card number"
//                       {...register("adharcard")}
//                     />
//                   </div>
//                 </div>

//                 {/* PAN Card */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     PAN Card
//                   </label>
//                   <div className="relative">
//                     <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                       placeholder="Enter PAN card number"
//                       {...register("pancard")}
//                     />
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Address
//                   </label>
//                   <div className="relative">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                       placeholder="Enter address"
//                       {...register("address")}
//                     />
//                   </div>
//                 </div>

//                 {/* Date of Birth */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Date of Birth
//                   </label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                       {...register("dateofbirth")}
//                     />
//                   </div>
//                 </div>

//                 {/* Terms and Conditions */}
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
//                     {...register("terms", { required: showMoreDetails ? "You must agree to the terms" : false })}
//                   />
//                   <label className="text-sm text-gray-700 dark:text-gray-300">
//                     I agree to the Terms and Conditions
//                   </label>
//                   {errors.terms && (
//                     <span className="text-red-500 text-sm">{errors.terms.message}</span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition-colors duration-200 font-medium"
//               >
//                 Sign Up
//               </button>
//             </div>

//             {/* Google Sign-In */}
//             <div className="pt-2">
//               <button
//                 type="button"
//                 onClick={() => toast.error("Sign in with Google functionality coming soon!")}
//                 className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
//               >
//                 <img src="/Google_logo.png" alt="Google Logo" className="w-6 h-6" />
//                 <span>Sign in with Google</span>
//               </button>
//             </div>

//             {/* Login Link */}
//             <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{' '}
//               <button
//                 type="button"
//                 className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium"
//                 onClick={() => document.getElementById("my_modal_3").showModal()}
//               >
//                 Login
//               </button>
//               <Login />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndividualSignUp;





// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaMapMarkerAlt, FaArrowRight, FaChevronDown, FaUserTie, FaCheckCircle, FaMinusCircle, FaPlusCircle, FaVenusMars, FaCalendarAlt } from 'react-icons/fa';
// import { IoFlagSharp } from 'react-icons/io5';
// import Login from './Login';
// import HomeNavbar from './HomeNavbar';

// const IndividualSignUp = () => {
//   const [showMoreDetails, setShowMoreDetails] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState('');
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ mode: "onChange" });
//   const password = watch("password");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("verifiedEmail");
//     if (storedEmail) {
//       setVerifiedEmail(storedEmail);
//       setValue("email", storedEmail);
//     }
//   }, [setValue]);

//   const onSubmit = async (data) => {
//     const payload = {
//       fullname: data.fullname,
//       email: verifiedEmail || data.email,
//       password: data.password,
//       countryCode: data.countryCode,
//       mobileNum: data.mobileNum,
//       userType: data.userType,
//       ...(showMoreDetails && {
//         gender: data.gender,
//         adharcard: data.adharcard,
//         pancard: data.pancard,
//         address: data.address,
//         dateofbirth: data.dateofbirth,
//         terms: data.terms,
//       }),
//     };

//     try {
//       const response = await fetch(`${API_BASE}/auth/individual/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         toast.success("Individual Signup Successful");
//         localStorage.removeItem("verifiedEmail");
//         navigate("/");
//       } else {
//         throw new Error(await response.text());
//       }
//     } catch (error) {
//       toast.error("Failed to Signup. Please try again.");
//     }
//   };

//   return (
//    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
//   <HomeNavbar />
//   <div className="flex-grow flex items-center justify-center p-4">
//     <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
//       <div className="text-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 relative inline-block">
//           <span className="relative z-10">Individual Sign Up</span>
//           <span className="absolute -bottom-1 left-0 w-full h-1 bg-sky-200 dark:bg-sky-700 rounded-full z-0"></span>
//         </h1>
//         <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium animate-pulse">
//           New User
//         </span>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Full Name
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaUser className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                 placeholder="Enter full name"
//                 {...register("fullname", { required: "Full name is required" })}
//               />
//               {errors.fullname && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.fullname.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Email
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaEnvelope className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <input
//                 type="email"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 bg-gray-50 dark:bg-gray-600"
//                 placeholder="Enter email"
//                 {...register("email", { required: "Email is required" })}
//                 value={verifiedEmail || ''}
//                 readOnly={!!verifiedEmail}
//               />
//               {verifiedEmail && (
//                 <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                   <FaCheckCircle className="text-green-500" />
//                 </div>
//               )}
//               {errors.email && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.email.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Password
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <input
//                 type="password"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                 placeholder="Enter password"
//                 onPaste={(e) => e.preventDefault()}
//                 onCopy={(e) => e.preventDefault()}
//                 {...register("password", {
//                   required: "Password is required",
//                   pattern: {
//                     value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     message: "Must start with a capital, include a number & special character, min 9 chars"
//                   }
//                 })}
//               />
//               {errors.password && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.password.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Confirm Password
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <input
//                 type="password"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                 placeholder="Confirm password"
//                 onPaste={(e) => e.preventDefault()}
//                 onCopy={(e) => e.preventDefault()}
//                 {...register("confirmpassword", {
//                   required: "Confirm password is required",
//                   validate: (value) => value === password || "Passwords do not match"
//                 })}
//               />
//               {errors.confirmpassword && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.confirmpassword.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Country Code */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Country
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaGlobe className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <select
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
//                 {...register("countryCode", { required: "Country is required" })}
//               >
//                 <option value="" disabled selected>Select Country</option>
//                 <option value="+91">India (+91)</option>
//                 <option value="+93">Afghanistan (+93)</option>
//                 <option value="+358">Aland Islands (+358)</option>
//                 <option value="+82">Korea (+82)</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <FaChevronDown className="text-gray-400 text-xs" />
//               </div>
//               {errors.countryCode && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.countryCode.message}</span>
//               )}
//             </div>
//           </div>

//           {/* User Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> User Type
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaUserTie className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <select
//                 {...register("userType", { required: "User type is required" })}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
//               >
//                 <option value="" disabled selected>Select User Type</option>
//                 <option value="Salaried">Salaried</option>
//                 <option value="Housewife">Housewife</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <FaChevronDown className="text-gray-400 text-xs" />
//               </div>
//               {errors.userType && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.userType.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Contact Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               <span className="text-red-500">*</span> Contact Number
//             </label>
//             <div className="relative group">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaPhone className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                 placeholder="Enter 10-digit number"
//                 maxLength={10}
//                 {...register("mobileNum", {
//                   required: "Contact number is required",
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: "Contact number must be exactly 10 digits"
//                   }
//                 })}
//               />
//               {errors.mobileNum && (
//                 <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.mobileNum.message}</span>
//               )}
//             </div>
//           </div>

//           {/* Password Requirements */}
//           <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-100 dark:border-sky-800/50">
//             <p className="font-medium text-sky-700 dark:text-sky-300 mb-2">Password must:</p>
//             <ul className="grid grid-cols-2 gap-1 text-sm text-sky-600 dark:text-sky-400">
//               <li className="flex items-center">
//                 <FaCheckCircle className="mr-1 text-xs" /> At least 9 characters
//               </li>
//               <li className="flex items-center">
//                 <FaCheckCircle className="mr-1 text-xs" /> Start with uppercase
//               </li>
//               <li className="flex items-center">
//                 <FaCheckCircle className="mr-1 text-xs" /> Include lowercase
//               </li>
//               <li className="flex items-center">
//                 <FaCheckCircle className="mr-1 text-xs" /> Include number
//               </li>
//               <li className="flex items-center col-span-2">
//                 <FaCheckCircle className="mr-1 text-xs" /> Include special character (!@#$%&*?)
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Additional Details Button */}
//         <div className="flex justify-center">
//           <button
//             type="button"
//             onClick={() => setShowMoreDetails(prev => !prev)}
//             className="flex items-center text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors"
//           >
//             {showMoreDetails ? (
//               <>
//                 <FaMinusCircle className="mr-2" /> Hide Additional Details
//               </>
//             ) : (
//               <>
//                 <FaPlusCircle className="mr-2" /> Add More Details
//               </>
//             )}
//           </button>
//         </div>

//         {/* Additional Fields */}
//         {showMoreDetails && (
//           <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
//             {/* Gender */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Gender
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaVenusMars className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                   placeholder="Enter gender"
//                   {...register("gender")}
//                 />
//               </div>
//             </div>

//             {/* Aadhar Card */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Aadhar Card
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                   placeholder="Enter Aadhar card number"
//                   {...register("adharcard")}
//                 />
//               </div>
//             </div>

//             {/* PAN Card */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 PAN Card
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                   placeholder="Enter PAN card number"
//                   {...register("pancard")}
//                 />
//               </div>
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Address
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaMapMarkerAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                 </div>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                   placeholder="Enter address"
//                   {...register("address")}
//                 />
//               </div>
//             </div>

//             {/* Date of Birth */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Date of Birth
//               </label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                   <FaCalendarAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                 </div>
//                 <input
//                   type="date"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                   {...register("dateofbirth")}
//                 />
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-start space-x-3 pt-2">
//               <div className="flex items-center h-5">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded transition-colors"
//                   {...register("terms", { required: showMoreDetails ? "You must agree to the terms" : false })}
//                 />
//               </div>
//               <label className="text-sm text-gray-700 dark:text-gray-300">
//                 I agree to the <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Terms and Conditions</a>
//               </label>
//               {errors.terms && (
//                 <span className="text-red-500 text-xs block animate-fadeIn">{errors.terms.message}</span>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-3 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
//           >
//             <span>Sign Up</span>
//             <FaArrowRight className="ml-2" />
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//           </div>
//           <div className="relative flex justify-center">
//             <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 text-sm">or continue with</span>
//           </div>
//         </div>

//         {/* Google Sign-In */}
//         <div>
//           <button
//             type="button"
//             onClick={() => toast.error("Sign in with Google functionality coming soon!")}
//             className="w-full bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
//           >
//             <img src="/Google_logo.png" alt="Google Logo" className="w-5 h-5" />
//             <span>Sign in with Google</span>
//           </button>
//         </div>

//         {/* Login Link */}
//         <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//           Already have an account?{' '}
//           <button
//             type="button"
//             className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium hover:underline"
//             onClick={() => document.getElementById("my_modal_3").showModal()}
//           >
//             Login
//           </button>
//           <Login />
//         </div>
//       </form>
//     </div>
//   </div>
// </div>
//   );
// };

// export default IndividualSignUp;



//MAIN CODE BEFORE PROMOCODE

// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaMapMarkerAlt, FaArrowRight, FaChevronDown, FaUserTie, FaCheckCircle, FaMinusCircle, FaPlusCircle, FaVenusMars, FaCalendarAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { IoFlagSharp } from 'react-icons/io5';
// import Login from './Login';
// import Navbar from './Navbar';

// const IndividualSignUp = () => {
//   const [showMoreDetails, setShowMoreDetails] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState('');
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ mode: "onChange" });
//   const password = watch("password");
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   useEffect(() => {
//     // Load verified email from localStorage
//     const storedEmail = localStorage.getItem("verifiedEmail");
//     if (storedEmail) {
//       setVerifiedEmail(storedEmail);
//       setValue("email", storedEmail);
//     }

//     // Load saved form data from localStorage
//     const savedData = JSON.parse(localStorage.getItem("individualSignUpData"));
//     if (savedData) {
//       Object.keys(savedData).forEach((key) => {
//         setValue(key, savedData[key]);
//       });
//       if (savedData.gender || savedData.adharcard || savedData.pancard || savedData.address || savedData.dateofbirth) {
//         setShowMoreDetails(true);
//       }
//     }
//   }, [setValue]);

//   const onSubmit = async (data) => {
//     const payload = {
//       fullname: data.fullname,
//       email: verifiedEmail || data.email,
//       password: data.password,
//       countryCode: data.countryCode,
//       mobileNum: data.mobileNum,
//       userType: data.userType,
//       ...(showMoreDetails && {
//         gender: data.gender,
//         adharcard: data.adharcard,
//         pancard: data.pancard,
//         address: data.address,
//         dateofbirth: data.dateofbirth,
//         terms: data.terms,
//       }),
//     };

//     try {
//       const response = await fetch(`${API_BASE}/auth/individual/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         // Save form data to localStorage
//         localStorage.setItem("individualSignUpData", JSON.stringify(payload));
//         toast.success("Individual Signup Successful");
//         localStorage.removeItem("verifiedEmail");
//         navigate("/");
//       } else {
//         throw new Error(await response.text());
//       }
//     } catch (error) {
//       toast.error("Failed to Signup. Please try again.");
//     }
//   };

//   // Get current date for max attribute in date input
//   const today = new Date().toISOString().split("T")[0];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 relative inline-block">
//               <span className="relative z-10">Individual Sign Up</span>
//               <span className="absolute -bottom-1 left-0 w-full h-1 bg-sky-200 dark:bg-sky-700 rounded-full z-0"></span>
//             </h1>
//             <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium animate-pulse">
//               New User
//             </span>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Full Name
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaUser className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                     placeholder="Enter Full Name"
//                     {...register("fullname", { required: "Full name is required" })}
//                   />
//                   {errors.fullname && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.fullname.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Email
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaEnvelope className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <input
//                     type="email"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 bg-gray-50 dark:bg-gray-600"
//                     placeholder="Enter Email"
//                     {...register("email", { required: "Email is required" })}
//                     value={verifiedEmail || ''}
//                     readOnly={!!verifiedEmail}
//                   />
//                   {verifiedEmail && (
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//                       <FaCheckCircle className="text-green-500" />
//                     </div>
//                   )}
//                   {errors.email && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.email.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                     placeholder="Enter Password"
//                     onPaste={(e) => e.preventDefault()}
//                     onCopy={(e) => e.preventDefault()}
//                     {...register("password", {
//                       required: "Password is required",
//                       pattern: {
//                         value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                         message: "Must start with a capital, include a number & special character, min 9 chars"
//                       }
//                     })}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                   {errors.password && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.password.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Confirm Password
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                     placeholder="Confirm Password"
//                     onPaste={(e) => e.preventDefault()}
//                     onCopy={(e) => e.preventDefault()}
//                     {...register("confirmpassword", {
//                       required: "Confirm password is required",
//                       validate: (value) => value === password || "Passwords must match"
//                     })}
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                   {errors.confirmpassword && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.confirmpassword.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Country Code */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Country
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaGlobe className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <select
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
//                     {...register("countryCode", { required: "Country is required" })}
//                   >
//                     <option value="" disabled selected>Select Country</option>
//                     <option value="+91">India (+91)</option>
//                     <option value="+93">Afghanistan (+93)</option>
//                     <option value="+358">Aland Islands (+358)</option>
//                     <option value="+82">Korea (+82)</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <FaChevronDown className="text-gray-400 text-xs" />
//                   </div>
//                   {errors.countryCode && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.countryCode.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* User Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> User Type
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaUserTie className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <select
//                     {...register("userType", { required: "User type is required" })}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
//                   >
//                     <option value="" disabled selected>Select User Type</option>
//                     <option value="Salaried">Salaried</option>
//                     <option value="Housewife">Housewife</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                     <FaChevronDown className="text-gray-400 text-xs" />
//                   </div>
//                   {errors.userType && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.userType.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Contact Number */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   <span className="text-red-500">*</span> Contact Number
//                 </label>
//                 <div className="relative group">
//                   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                     <FaPhone className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                   </div>
//                   <input
//                     type="text"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                     placeholder="Enter 10-digit Number"
//                     maxLength={10}
//                     {...register("mobileNum", {
//                       required: "Contact number is required",
//                       pattern: {
//                         value: /^[0-9]{10}$/,
//                         message: "Contact number must be exactly 10 digits"
//                       }
//                     })}
//                   />
//                   {errors.mobileNum && (
//                     <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.mobileNum.message}</span>
//                   )}
//                 </div>
//               </div>

//               {/* Password Requirements */}
//               <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-100 dark:border-sky-800/50">
//                 <p className="font-medium text-sky-700 dark:text-sky-300 mb-2">Password must:</p>
//                 <ul className="grid grid-cols-2 gap-1 text-sm text-sky-600 dark:text-sky-400">
//                   <li className="flex items-center">
//                     <FaCheckCircle className="mr-1 text-xs" /> At least 9 characters
//                   </li>
//                   <li className="flex items-center">
//                     <FaCheckCircle className="mr-1 text-xs" /> Start with uppercase
//                   </li>
//                   <li className="flex items-center">
//                     <FaCheckCircle className="mr-1 text-xs" /> Include lowercase
//                   </li>
//                   <li className="flex items-center">
//                     <FaCheckCircle className="mr-1 text-xs" /> Include number
//                   </li>
//                   <li className="flex items-center col-span-2">
//                     <FaCheckCircle className="mr-1 text-xs" /> Include special character
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Additional Details Button */}
//             <div className="flex justify-center">
//               <button
//                 type="button"
//                 onClick={() => setShowMoreDetails(prev => !prev)}
//                 className="flex items-center text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors"
//               >
//                 {showMoreDetails ? (
//                   <>
//                     <FaMinusCircle className="mr-2" /> Hide Additional Details
//                   </>
//                 ) : (
//                   <>
//                     <FaPlusCircle className="mr-2" /> Add More Details
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Additional Fields */}
//             {showMoreDetails && (
//               <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
//                 {/* Gender */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Gender
//                   </label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <FaVenusMars className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                       placeholder="Enter Gender"
//                       {...register("gender")}
//                     />
//                   </div>
//                 </div>

//                 {/* Aadhar Card */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Aadhar Card
//                   </label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                       placeholder="Enter Aadhar Card Number"
//                       {...register("adharcard")}
//                     />
//                   </div>
//                 </div>

//                 {/* PAN Card */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     PAN Card
//                   </label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                       placeholder="Enter PAN Card Number"
//                       {...register("pancard")}
//                     />
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Address
//                   </label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <FaMapMarkerAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                       placeholder="Enter Address"
//                       {...register("address")}
//                     />
//                   </div>
//                 </div>

//                 {/* Date of Birth */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                     Date of Birth
//                   </label>
//                   <div className="relative group">
//                     <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                       <FaCalendarAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
//                     </div>
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
//                       max={today}
//                       {...register("dateofbirth", {
//                         required: showMoreDetails ? "Date of birth is required" : false,
//                         validate: (value) => {
//                           if (!value && showMoreDetails) return "Date of birth is required";
//                           const selectedDate = new Date(value);
//                           const currentDate = new Date();
//                           return selectedDate <= currentDate || "Date of birth cannot be in the future";
//                         }
//                       })}
//                     />
//                     {errors.dateofbirth && (
//                       <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.dateofbirth.message}</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Terms and Conditions */}
//                 <div className="flex items-start space-x-3 pt-2">
//                   <div className="flex items-center h-5">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded transition-colors"
//                       {...register("terms", { required: showMoreDetails ? "You must agree to the terms" : false })}
//                     />
//                   </div>
//                   <label className="text-sm text-gray-700 dark:text-gray-300">
//                     I agree to the <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Terms and Conditions</a>
//                   </label>
//                   {errors.terms && (
//                     <span className="text-red-500 text-xs block animate-fadeIn">{errors.terms.message}</span>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-3 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
//               >
//                 <span>Sign Up</span>
//                 <FaArrowRight className="ml-2" />
//               </button>
//             </div>

//             {/* Divider
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
//               </div>
//               <div className="relative flex justify-center">
//                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 text-sm">or continue with</span>
//               </div>
//             </div>

//             {/* Google Sign-In */}
//             <div>
//               <button
//                 type="button"
//                 onClick={() => toast.error("Sign in with Google functionality coming soon!")}
//                 className="w-full bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
//               >
//                 <img src="/Google_logo.png" alt="Google Logo" className="w-5 h-5" />
//                 <span>Sign in with Google</span>
//               </button>
//             </div>

//             {/* Login Link 
//             <div className="text-center text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{' '}
//               <button
//                 type="button"
//                 className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium hover:underline"
//                 onClick={() => document.getElementById("my_modal_3").showModal()}
//               >
//                 Login
//               </button>
//               <Login />
//             </div> */}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IndividualSignUp;

//MAIN CODE BEFORE PROMOCODE

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaIdCard, FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe, FaMapMarkerAlt, FaArrowRight, FaChevronDown, FaUserTie, FaCheckCircle, FaMinusCircle, FaPlusCircle, FaVenusMars, FaCalendarAlt, FaEye, FaEyeSlash, FaGift } from 'react-icons/fa';
import { IoFlagSharp } from 'react-icons/io5';
import Login from './Login';
import Navbar from './Navbar';

const IndividualSignUp = () => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ mode: "onChange" });
  const password = watch("password");
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifiedEmail");
    if (storedEmail) {
      setVerifiedEmail(storedEmail);
      setValue("email", storedEmail);
    }

    const savedData = JSON.parse(localStorage.getItem("individualSignUpData"));
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key, savedData[key]);
      });
      if (savedData.gender || savedData.adharcard || savedData.pancard || savedData.address || savedData.dateofbirth) {
        setShowMoreDetails(true);
      }
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    const payload = {
      fullname: data.fullname,
      email: verifiedEmail || data.email,
      password: data.password,
      countryCode: data.countryCode,
      mobileNum: data.mobileNum,
      userType: data.userType,
      promoCode: data.promoCode || null, // <-- Optional promo code added here
      ...(showMoreDetails && {
        gender: data.gender,
        adharcard: data.adharcard,
        pancard: data.pancard,
        address: data.address,
        dateofbirth: data.dateofbirth,
        terms: data.terms,
      }),
    };

    try {
      const response = await fetch(`${API_BASE}/auth/individual/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        localStorage.setItem("individualSignUpData", JSON.stringify(payload));
        toast.success("Individual Signup Successful");
        localStorage.removeItem("verifiedEmail");
        navigate("/");
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      toast.error("Failed to Signup. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 relative inline-block">
              <span className="relative z-10">Individual Sign Up</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-sky-200 dark:bg-sky-700 rounded-full z-0"></span>
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-medium animate-pulse">
              New User
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                    placeholder="Enter Full Name"
                    {...register("fullname", { required: "Full name is required" })}
                  />
                  {errors.fullname && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.fullname.message}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 bg-gray-50 dark:bg-gray-600"
                    placeholder="Enter Email"
                    {...register("email", { required: "Email is required" })}
                    value={verifiedEmail || ''}
                    readOnly={!!verifiedEmail}
                  />
                  {verifiedEmail && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                  )}
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.email.message}</span>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                    placeholder="Enter Password"
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Must start with a capital, include a number & special character, min 9 chars"
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.password.message}</span>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                    placeholder="Confirm Password"
                    onPaste={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                    {...register("confirmpassword", {
                      required: "Confirm password is required",
                      validate: (value) => value === password || "Passwords must match"
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.confirmpassword && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.confirmpassword.message}</span>
                  )}
                </div>
              </div>

              {/* Country Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Country
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGlobe className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
                    {...register("countryCode", { required: "Country is required" })}
                  >
                    <option value="" disabled selected>Select Country</option>
                    <option value="+91">India (+91)</option>
                    <option value="+93">Afghanistan (+93)</option>
                    <option value="+358">Aland Islands (+358)</option>
                    <option value="+82">Korea (+82)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                  {errors.countryCode && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.countryCode.message}</span>
                  )}
                </div>
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> User Type
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUserTie className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <select
                    {...register("userType", { required: "User type is required" })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400 appearance-none"
                  >
                    <option value="" disabled selected>Select User Type</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Housewife">Housewife</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                  {errors.userType && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.userType.message}</span>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="text-red-500">*</span> Contact Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaPhone className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                    placeholder="Enter 10-digit Number"
                    maxLength={10}
                    {...register("mobileNum", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Contact number must be exactly 10 digits"
                      }
                    })}
                  />
                  {errors.mobileNum && (
                    <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.mobileNum.message}</span>
                  )}
                </div>
              </div>

              {/* NEW: Promo Code (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Promo Code (Optional)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGift className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                    placeholder="Enter Promo Code (if any)"
                    {...register("promoCode")}
                  />
                </div>
              </div>

                    {/* Password Requirements */}
              <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg border border-sky-100 dark:border-sky-800/50">
                <p className="font-medium text-sky-700 dark:text-sky-300 mb-2">Password must:</p>
                <ul className="grid grid-cols-2 gap-1 text-sm text-sky-600 dark:text-sky-400">
                  <li className="flex items-center">
                    <FaCheckCircle className="mr-1 text-xs" /> At least 9 characters
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="mr-1 text-xs" /> Start with uppercase
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="mr-1 text-xs" /> Include lowercase
                  </li>
                  <li className="flex items-center">
                    <FaCheckCircle className="mr-1 text-xs" /> Include number
                  </li>
                  <li className="flex items-center col-span-2">
                    <FaCheckCircle className="mr-1 text-xs" /> Include special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Details Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowMoreDetails(prev => !prev)}
                className="flex items-center text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors"
              >
                {showMoreDetails ? (
                  <>
                    <FaMinusCircle className="mr-2" /> Hide Additional Details
                  </>
                ) : (
                  <>
                    <FaPlusCircle className="mr-2" /> Add More Details
                  </>
                )}
              </button>
            </div>

            {/* Additional Fields */}
            {showMoreDetails && (
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fadeIn">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaVenusMars className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                      placeholder="Enter Gender"
                      {...register("gender")}
                    />
                  </div>
                </div>

                {/* Aadhar Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Aadhar Card
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                      placeholder="Enter Aadhar Card Number"
                      {...register("adharcard")}
                    />
                  </div>
                </div>

                {/* PAN Card */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    PAN Card
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaIdCard className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                      placeholder="Enter PAN Card Number"
                      {...register("pancard")}
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                      placeholder="Enter Address"
                      {...register("address")}
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCalendarAlt className="text-gray-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-white transition-all duration-200 group-hover:border-sky-400"
                      max={today}
                      {...register("dateofbirth", {
                        required: showMoreDetails ? "Date of birth is required" : false,
                        validate: (value) => {
                          if (!value && showMoreDetails) return "Date of birth is required";
                          const selectedDate = new Date(value);
                          const currentDate = new Date();
                          return selectedDate <= currentDate || "Date of birth cannot be in the future";
                        }
                      })}
                    />
                    {errors.dateofbirth && (
                      <span className="text-red-500 text-xs mt-1 block animate-fadeIn">{errors.dateofbirth.message}</span>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3 pt-2">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded transition-colors"
                      {...register("terms", { required: showMoreDetails ? "You must agree to the terms" : false })}
                    />
                  </div>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the <a href="#" className="text-sky-600 dark:text-sky-400 hover:underline">Terms and Conditions</a>
                  </label>
                  {errors.terms && (
                    <span className="text-red-500 text-xs block animate-fadeIn">{errors.terms.message}</span>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-3 rounded-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <span>Sign Up</span>
                <FaArrowRight className="ml-2" />
              </button>
            </div>

            {/* Divider
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 text-sm">or continue with</span>
              </div>
            </div>

            {/* Google Sign-In */}
            <div>
              <button
                type="button"
                onClick={() => toast.error("Sign in with Google functionality coming soon!")}
                className="w-full bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <img src="/Google_logo.png" alt="Google Logo" className="w-5 h-5" />
                <span>Sign in with Google</span>
              </button>
            </div>

            {/* Login Link 
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium hover:underline"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
              <Login />
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualSignUp;
