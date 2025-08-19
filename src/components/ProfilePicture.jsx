// import React, { useState, useEffect } from "react";
// import { uploadProfilePicture, getProfilePicture } from "../services/api";
// import toast from "react-hot-toast";

// const ProfilePicture = () => {
//   const [profileImage, setProfileImage] = useState(null);

//   useEffect(() => {
//     fetchProfilePicture();
//   }, []);

//   const fetchProfilePicture = async () => {
//     const imageUrl = await getProfilePicture();
//     if (imageUrl) {
//       setProfileImage(imageUrl);
//     }
//   };

//   const handleFileChange = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   const imageUrl = await uploadProfilePicture(file);
//   if (imageUrl) {
//     setProfileImage(imageUrl); // Update the state
//     localStorage.setItem("profileImage", imageUrl); // Store in localStorage
//     window.dispatchEvent(new Event("storage")); // Notify other components
//     toast.success("Profile picture updated successfully!");
//   } else {
//     toast.error("Failed to upload profile picture.");
//   }
// };

//   return (
//     <div  className="w-full h-full rounded-full cursor-pointer border-2 border-gray-300 hover:opacity-80">
//      {profileImage ? (
//     <img src={profileImage}
//      alt="Profile" />
//   ) : (
//     <div>
//       <span className="m-5 flex justify-center items-center">Upload Profile </span>
//     </div>
//   )}
//       <input
//         type="file"
//         id="profile-upload"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default ProfilePicture;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ProfilePicture = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//   const userType = localStorage.getItem("userType"); // Get user type (corporate or individual)
//   const token = localStorage.getItem("authToken");

//   const API_URL = userType === "corporate" ? `${API_BASE}/api/corporateProfile` : `${API_BASE}/api/Userprofile`;

//   // ✅ Fetch Profile Picture
//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       if (!token) {
//         console.warn("User is not authenticated.");
//         return;
//       }

//       try {
//         const response = await axios.get(`${API_URL}/profile-picture`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (response.data) {
//           setProfileImage(response.data);
//           localStorage.setItem("profileImage", response.data);
//           window.dispatchEvent(new Event("storage"));
//         }
//       } catch (error) {
//         console.error("Error fetching profile picture:", error.response?.data || error.message);
//       }
//     };

//     fetchProfilePicture();
//   }, [API_URL, token]); // Depend on API_URL and token

//   // ✅ Upload Profile Picture
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!token) {
//       toast.error("You need to log in to upload a profile picture.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.put(`${API_URL}/upload-profile-picture`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (response.data) {
//         setProfileImage(response.data);
//         localStorage.setItem("profileImage", response.data);
//         window.dispatchEvent(new Event("storage"));
//         toast.success(userType === "corporate" ? "Corporate Profile Picture Updated!" : "Profile Picture Updated!");
//       }
//     } catch (error) {
//       toast.error("Failed to upload profile picture.");
//       console.error("Error uploading profile picture:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <label htmlFor="profile-upload" className="cursor-pointer">
//         {profileImage ? (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-2 border-gray-300 hover:opacity-80 transition-all duration-300"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
//             <span className="text-gray-500">Upload Profile</span>
//           </div>
//         )}
//       </label>
//       <input
//         type="file"
//         id="profile-upload"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//       />
//       <p className="mt-2 text-sm text-gray-500">
//         {userType === "corporate" ? "Corporate Profile Picture" : "Individual Profile Picture"}
//       </p>
//     </div>
//   );
// };

// export default ProfilePicture;


// import React, { useState, useEffect } from "react";
// import { uploadProfilePicture, getProfilePicture } from "../services/api";
// import toast from "react-hot-toast";

// const ProfilePicture = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const userType = localStorage.getItem("userType");

//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       const imageUrl = await getProfilePicture();
//       if (imageUrl) {
//         setProfileImage(imageUrl);
//         localStorage.setItem("profileImage", imageUrl);
//         window.dispatchEvent(new Event("storage"));
//       }
//     };

//     fetchProfilePicture();
//   }, []);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const imageUrl = await uploadProfilePicture(file);
//     if (imageUrl) {
//       setProfileImage(imageUrl);
//       localStorage.setItem("profileImage", imageUrl);
//       window.dispatchEvent(new Event("storage"));
//       toast.success("Profile picture updated!");
//     } else {
//       toast.error("Failed to upload profile picture.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <label htmlFor="profile-upload" className="cursor-pointer">
//         {profileImage ? (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-2 border-gray-300 hover:opacity-80 transition-all duration-300"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-500">Upload Profile</span>
//           </div>
//         )}
//       </label>
//       <input
//         type="file"
//         id="profile-upload"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//       />
//       <p className="mt-2 text-sm text-gray-500">
//         {userType === "corporate" ? "Corporate Profile Picture" : "Individual Profile Picture"}
//       </p>
//     </div>
//   );
// };

// export default ProfilePicture;


import React, { useState, useEffect } from "react";
import { uploadProfilePicture, getProfilePicture } from "../services/api";
import toast from "react-hot-toast";

const ProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profilePicture") || null);
  const userType = localStorage.getItem("userType");
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
  useEffect(() => {
    const fetchProfilePicture = async () => {
      const imageUrl = await getProfilePicture();
      if (imageUrl) {
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
        window.dispatchEvent(new Event("storage"));
      }
    };

    fetchProfilePicture();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = await uploadProfilePicture(file);
    if (imageUrl) {
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
      window.dispatchEvent(new Event("storage"));
      toast.success("Profile picture updated!");
    } else {
      toast.error("Failed to upload profile picture.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="profile-upload" className="cursor-pointer">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 hover:opacity-80 transition-all duration-300"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Upload Profile</span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="profile-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="mt-2 text-sm text-gray-500">
        {userType === "corporate" ? "Corporate Profile Picture" : "Individual Profile Picture"}
      </p>
    </div>
  );
};

export default ProfilePicture;


// import React, { useState, useEffect } from "react";
// import { uploadProfilePicture, getProfilePicture } from "../services/api";
// import toast from "react-hot-toast";

// const ProfilePicture = () => {
//   const [profileImage, setProfileImage] = useState(localStorage.getItem("profilePicture") || null);
//   const [userType, setUserType] = useState(localStorage.getItem("userType") || "individual");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       if (!localStorage.getItem("authToken")) {
//         setProfileImage(null);
//         setUserType("individual");
//         setIsLoggedIn(false);
//         return;
//       }

//       try {
//         const imageUrl = await getProfilePicture();
//         if (imageUrl) {
//           setProfileImage(imageUrl);
//           localStorage.setItem("profilePicture", imageUrl);
//           window.dispatchEvent(new Event("storage"));
//           window.dispatchEvent(new Event("authChange"));
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile picture:", error);
//         toast.error("Failed to load profile picture.");
//       }
//     };

//     fetchProfilePicture();

//     // Listen for authChange and storage events
//     const handleAuthChange = () => {
//       const token = localStorage.getItem("authToken");
//       const storedUserType = localStorage.getItem("userType") || "individual";
//       const storedProfilePicture = localStorage.getItem("profilePicture");
//       setIsLoggedIn(!!token);
//       setUserType(storedUserType);
//       setProfileImage(storedProfilePicture || null);
//       if (token) {
//         fetchProfilePicture();
//       }
//     };

//     window.addEventListener("authChange", handleAuthChange);
//     window.addEventListener("storage", handleAuthChange);

//     return () => {
//       window.removeEventListener("authChange", handleAuthChange);
//       window.removeEventListener("storage", handleAuthChange);
//     };
//   }, []);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (!localStorage.getItem("authToken")) {
//       toast.error("You must be logged in to upload a profile picture.");
//       return;
//     }

//     try {
//       const imageUrl = await uploadProfilePicture(file);
//       if (imageUrl) {
//         setProfileImage(imageUrl);
//         localStorage.setItem("profilePicture", imageUrl);
//         window.dispatchEvent(new Event("storage"));
//         window.dispatchEvent(new Event("authChange")); // Notify other components
//         toast.success("Profile picture updated!");
//       } else {
//         toast.error("Failed to upload profile picture.");
//       }
//     } catch (error) {
//       console.error("Profile picture upload failed:", error);
//       toast.error("Failed to upload profile picture. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <label htmlFor="profile-upload" className="cursor-pointer">
//         {profileImage && isLoggedIn ? (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-2 border-gray-300 hover:opacity-80 transition-all duration-300"
//           />
//         ) : (
//           <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
//             <span className="text-gray-500">Upload Profile</span>
//           </div>
//         )}
//       </label>
//       <input
//         type="file"
//         id="profile-upload"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//         disabled={!isLoggedIn} // Disable input if not logged in
//       />
//       {isLoggedIn && (
//         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//           {userType === "corporate" ? "Corporate Profile Picture" : "Individual Profile Picture"}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProfilePicture;