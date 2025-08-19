export const getUserData = async () => {
    try {
      const response = await fetch("/user", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent if using sessions
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const user = await response.json();
      return user;
    } catch (error) {
    //   console.error("Error fetching user data:");
      return null;
    }
  };
  