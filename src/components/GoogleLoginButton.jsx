// import React from 'react';

// const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
// const GoogleLoginButton = () => {
//   const handleGoogleLogin = () => {
//      window.location.href = 'https://cmda.aycanalytics.com/oauth2/authorization/google';
//     //window.location.href = `${API_BASE}/oauth2/authorization/google`;
// console.log(window.location.href);

//   };

//   return (
//     <div className="p-2">
//       <button
//         onClick={handleGoogleLogin}
//         className="btn btn-block btn-warning flex items-center justify-center gap-2"
//       >
//         <img src="/Google_logo.png" alt="Google" className="w-6 h-6" />
//         Sign in with Google
//       </button>
//     </div>
//   );
// };

// export default GoogleLoginButton;

//working code-------------------------------------------------
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// //import googleLogo from '../../public/google-logo.png'; // Add a Google logo image to your public folder

// const GoogleLoginButton = ({ onClose }) => {
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;


//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/google`,
//         { credential: credentialResponse.credential },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const { token, email, name, userType, picture } = response.data;
//       localStorage.setItem('authToken', token);
//       // localStorage.setItem('userEmail', email);
//       localStorage.setItem('userType', userType || 'individual'); // Default to 'individual' if not provided
//       localStorage.setItem('userName', name);
//       localStorage.setItem('profilePicture', picture);
//       window.dispatchEvent(new Event('storage')); // Trigger storage event for state sync
//       toast.success('Logged in with Google successfully!');
//        if (onClose) onClose();  // Close the login modal
//       navigate('/'); // Redirect to home
//     } catch (error) {
//       console.error('Google Sign-In Failed:', error);
//       toast.error('Failed to sign in with Google. Please try again.');
//     }
//   };

//   const handleError = () => {
//     console.error('Google Sign-In Error');
//     toast.error('An error occurred during Google Sign-In.');
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <div className="">
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//           // auto_select
//           render={(renderProps) => (
//             <button
//               type="button"
//               className="btn flex-1 btn-outline"
//               onClick={
//                 renderProps.onClick}
//               disabled={renderProps.disabled}
//             >
//               <img src="/Google_logo.png" alt="Google" className="w-5 mr-2" />
//               Google
//             </button>
//           )}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;
//-----------------------------------------------------------

// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "./AuthContext";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GoogleLoginButton = ({ onClose }) => {
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const WWW_API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const { login } = useAuth();

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/google`,
//         { credential: credentialResponse.credential },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const { token, email, name, userType, picture } = response.data;
//       login(token);
//       localStorage.setItem('userType', userType || 'individual');
//       localStorage.setItem('userName', name);
//       localStorage.setItem('profilePicture', picture);
//       window.dispatchEvent(new Event('storage'));
//       window.dispatchEvent(new Event('authChange'));
//       toast.success('Logged in with Google successfully!');
//       if (onClose) onClose();
//       navigate('/');
//     } catch (error) {
//       console.error('Google Sign-In Failed:', error);
//       toast.error('Failed to sign in with Google. Please try again.');
//     }
//   };

//   const handleError = () => {
//     console.error('Google Sign-In Error');
//     toast.error('An error occurred during Google Sign-In.');
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <div className="w-full">
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//           render={(renderProps) => (
//             <button
//               type="button"
//               className="flex items-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm text-gray-800 dark:text-white overflow-hidden"
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//             >
//               <img src="/Google_logo.png" alt="Google" className="w-5 h-5 mr-2" />
//               <span className="truncate"> Google</span>
//             </button>
//           )}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;

///new code added Digambar

// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "./AuthContext";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const GoogleLoginButton = ({ onClose }) => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   // Determine the current domain and set appropriate configurations
//   const currentDomain = window.location.hostname;
//   const isWWW = currentDomain.startsWith('www.');

//   // Select the correct API base URL and endpoint
//   const API_BASE = isWWW 
//     ? import.meta.env.WWW_VITE_URL || 'https://www.cmdahub.com/api'
//     : import.meta.env.VITE_URL || 'https://cmdahub.com/api';

//   const AUTH_ENDPOINT = isWWW ? '/auth/google/google-www' : '/auth/google';

//   // Select the correct Google Client ID
//   const clientId = isWWW
//     ? import.meta.env.VITE_GOOGLE_CLIENT_WWW_ID
//     : import.meta.env.VITE_GOOGLE_CLIENT_ID;

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}${AUTH_ENDPOINT}`,
//         { 
//           credential: credentialResponse.credential
//           //clientId: clientId // Send the client ID to backend for verification
//         },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const { token, email, name, userType, picture } = response.data;
//       login(token);
//       localStorage.setItem('userType', userType || 'individual');
//       localStorage.setItem('userName', name);
//       localStorage.setItem('profilePicture', picture);
//       window.dispatchEvent(new Event('storage'));
//       window.dispatchEvent(new Event('authChange'));
//       toast.success('Logged in with Google successfully!');
//       if (onClose) onClose();
//       navigate('/');
//     } catch (error) {
//       console.error('Google Sign-In Failed:', error);
//       toast.error('Failed to sign in with Google. Please try again.');
//     }
//   };

//   const handleError = () => {
//     console.error('Google Sign-In Error');
//     toast.error('An error occurred during Google Sign-In.');
//   };

//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div className="w-full">
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//           render={(renderProps) => (
//             <button
//               type="button"
//               className="flex items-center w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm text-gray-800 dark:text-white overflow-hidden"
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//             >
//               <img src="/Google_logo.png" alt="Google" className="w-5 h-5 mr-2" />
//               <span className="truncate"> Google</span>
//             </button>
//           )}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;

// -----------------redesign by swati----------------
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from "./AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const GoogleLoginButton = ({ onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const currentDomain = window.location.hostname;
  const isWWW = currentDomain.startsWith('www.');

  const API_BASE = isWWW
    ? import.meta.env.WWW_VITE_URL || 'https://www.cmdahub.com/api'
    : import.meta.env.VITE_URL || 'https://cmdahub.com/api';

  const AUTH_ENDPOINT = isWWW ? '/auth/google/google-www' : '/auth/google';

  const clientId = isWWW
    ? import.meta.env.VITE_GOOGLE_CLIENT_WWW_ID
    : import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${API_BASE}${AUTH_ENDPOINT}`,
        {
          credential: credentialResponse.credential
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const { token, email, name, userType, picture } = response.data;
      login(token);
      localStorage.setItem('userType', userType || 'individual');
      localStorage.setItem('userName', name);
      localStorage.setItem('profilePicture', picture);
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('authChange'));
      toast.success('Logged in with Google successfully!');
      if (onClose) onClose();
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Failed:', error);
      toast.error('Failed to sign in with Google. Please try again.');
      if (onClose) onClose();
    }
  };

  const handleError = () => {
    console.error('Google Sign-In Error');
    toast.error('An error occurred during Google Sign-In.');
    if (onClose) onClose();
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="w-full max-w-md mx-auto">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          render={(renderProps) => (
            <button
              type="button"
              className={`
                flex items-center justify-center w-full px-4 py-3 
                rounded-lg bg-white dark:bg-gray-800 
                shadow-md hover:shadow-lg 
                transition-all duration-200 ease-in-out
                text-gray-800 dark:text-white
                text-base sm:text-lg font-medium
                border border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img
                src="/Google_logo.png"
                alt="Google logo"
                className="w-6 h-6 sm:w-7 sm:h-7 mr-3"
              />
              <span className="truncate">Sign in with Google</span>
            </button>
          )}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;



// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { useAuth } from "./AuthContext";
// import axios from 'axios';
// import { useEffect } from 'react';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// //import googleLogo from '../../public/google-logo.png'; // Add a Google logo image to your public folder

// const GoogleLoginButton = ({ onClose }) => {
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//  const { login } = useAuth();

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE}/auth/google`,
//         { credential: credentialResponse.credential },
//         {
//           withCredentials: true,
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       const { token, email, name, userType, picture } = response.data;
//       // localStorage.setItem('authToken', token);
//       login(token);
//       // localStorage.setItem('userEmail', email);
//       localStorage.setItem('userType', userType || 'individual'); // Default to 'individual' if not provided
//       localStorage.setItem('userName', name);
//       localStorage.setItem('profilePicture', picture);
//       window.dispatchEvent(new Event('storage')); // Trigger storage event for state sync
//        window.dispatchEvent(new Event('authChange'));
//       toast.success('Logged in with Google successfully!');
//        if (onClose) onClose();  // Close the login modal
//       navigate('/'); // Redirect to home
//     } catch (error) {
//       console.error('Google Sign-In Failed:', error);
//       toast.error('Failed to sign in with Google. Please try again.');
//     }
//   };

//   const handleError = () => {
//     console.error('Google Sign-In Error');
//     toast.error('An error occurred during Google Sign-In.');
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <div className="">
//         <GoogleLogin
//           onSuccess={handleSuccess}
//           onError={handleError}
//           useOneTap
//           // auto_select
//           render={(renderProps) => (
//             <button
//               type="button"
//               className="btn flex-1 "
//               onClick={
//                 renderProps.onClick}
//               disabled={renderProps.disabled}
//             >
//               <img src="/Google_logo.png" alt="Google" className="w-5 mr-2" />
//               Google
//             </button>
//           )}
//         />
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;

// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const GoogleLoginButton = ({ closeModal , onSuccess }) => {
//   const navigate = useNavigate();
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

//   const handleSuccess = async (credentialResponse) => {
//     try {
//       const res = await axios.post(`${API_BASE}/auth/google`, {
//         credential: credentialResponse.credential,
//       }, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const { token, email, name, userType, picture } = res.data;
//       localStorage.setItem('authToken', token);
//       localStorage.setItem('userEmail', email);
//       localStorage.setItem('userType', userType || 'individual');
//       localStorage.setItem('userName', name);
//       localStorage.setItem('profilePicture', picture);

//       window.dispatchEvent(new Event('storage'));
//       toast.success('Logged in with Google successfully!');
//       if (onSuccess) onSuccess();
//       if (closeModal) closeModal();
//       navigate('/');
//     } catch (error) {
//       console.error('Google Sign-In Failed:', error);
//       toast.error('Failed to sign in with Google.');
//     }
//   };

//   const handleError = () => {
//     toast.error('An error occurred during Google Sign-In.');
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={handleError}
//         useOneTap
//       />
//     </GoogleOAuthProvider>
//   );
// };

// export default GoogleLoginButton;
