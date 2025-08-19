// // api.js
// export const logActivity = async (activity) => {
//   const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
//     try {
//       await fetch(`${API_BASE}/api/activity`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ activity }),
//       });
//     } catch (error) {
//       console.error("Error logging activity:", error);
//     }
//   };


import axios from "axios";
// import JwtUtil from "./JwtUtil"; // Import JwtUtil for token validation
import JwtUtil from "./JwtUtil";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
const USER_API_URL = `${API_BASE}/Userprofile`;// Individual API
const CORPORATE_API_URL = `${API_BASE}/corporate`; // Corporate API
const ACTIVITY_API_URL = `${API_BASE}/activity`;

/**
 * Retrieves a valid authentication token from localStorage.
 */
const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token || JwtUtil.isTokenExpired(token)) {
    // console.warn("Token is missing or expired. Logging out.");
    localStorage.removeItem("authToken");
    window.dispatchEvent(new Event("storage"));
    return null;
  }
  return token;
};

/**
 * Fetches the user's profile picture based on their type (corporate or individual).
 */
// export const getProfilePicture = async () => {
//   const token = getAuthToken();
 

//   const userType = localStorage.getItem("userType"); // Get user type from localStorage
//   const API_URL = userType === "corporate" ? CORPORATE_API_URL : USER_API_URL;

//   try {
//     const response = await axios.get(`${API_URL}/profile-picture`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response ? error.response.data : error.message;
//     console.error("Error fetching profile picture:", errorMessage);
//     // toast.error("Failed to fetch profile picture.");
//     return null;
//   }
// };

export const getProfilePicture = async () => {
  const token = getAuthToken();
  const userType = localStorage.getItem("userType");
  const API_URL = userType === "corporate" ? CORPORATE_API_URL : USER_API_URL;

  try {
    const response = await axios.get(`${API_URL}/profile-picture`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Should return https://cmda.aycanalytics.com/uploads/<filename>
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error fetching profile picture:", errorMessage);
    return null;
  }
};

/**
 * Uploads the user's profile picture based on their type.
 */
export const uploadProfilePicture = async (file) => {
  const token = getAuthToken();
  if (!token) {
    toast.error("Please log in to upload a profile picture.");
    return null;
  }

  if (!file) {
    toast.error("No file selected. Please choose an image.");
    return null;
  }

  const userType = localStorage.getItem("userType"); // Check user type
  const API_URL = userType === "corporate" ? CORPORATE_API_URL : USER_API_URL;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.put(`${API_URL}/upload-profile-picture`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success("Profile picture updated successfully!");
    return response.data;
  } catch (error) {
    const errorMessage = error.response ? error.response.data : error.message;
    console.error("Error uploading profile picture:", errorMessage);
    toast.error("Failed to upload profile picture.");
    return null;
  }
};

/**
 * Logs user activity to the backend.
 */
export const logActivity = async (activity) => {
  try {
    await fetch(`${ACTIVITY_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity }),
    });
  } catch (error) {
    console.error("Error logging activity:", error);
    // toast.error("Failed to log activity.");
  }
};
