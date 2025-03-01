import secureLocalStorage from "react-secure-storage";

export const storeAccessToken = (accessToken) => {
  try {
    if (!accessToken?.access_token) {
      throw new Error("Invalid access token: access_token is missing");
    }

    const storagePrefix = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
    if (!storagePrefix) {
      throw new Error("Storage prefix is not defined in environment variables");
    }

    secureLocalStorage.setItem(
      `${storagePrefix}access_token`,
      accessToken.access_token
    );
    console.log("Access token stored successfully");
  } catch (error) {
    console.error("Error storing access token:", error.message);
  }
};

export const getAccessToken = () => {
  try {
    const storagePrefix = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
    if (!storagePrefix) {
      throw new Error("Storage prefix is not defined in environment variables");
    }

    const token = secureLocalStorage.getItem(`${storagePrefix}access_token`);
    if (!token) {
      console.warn("No access token found in storage");
    }
    return token;
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    return null;
  }
};

export const removeAccessToken = () => {
  try {
    const storagePrefix = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
    if (!storagePrefix) {
      throw new Error("Storage prefix is not defined in environment variables");
    }

    secureLocalStorage.removeItem(`${storagePrefix}access_token`);
    console.log("Access token removed successfully");
  } catch (error) {
    console.error("Error removing access token:", error.message);
  }
};

export const hasAccessToken = () => {
  const storagePrefix = import.meta.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
  const token = secureLocalStorage.getItem(`${storagePrefix}access_token`);
  return !!token; // Returns true if token exists, false otherwise
};
