import axios from "axios";
import Cookies from "js-cookie";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/v1/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAccessToken = async () => {
  let accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  // If access token is present, return it
  if (accessToken) {
    return accessToken;
  }

  // If no access token but refresh token is available, refresh it
  if (refreshToken) {
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/refresh-access-token", {
        method: "POST",
        credentials: "include",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      })

      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;

      // Store new tokens in cookies
      Cookies.set("accessToken", newAccessToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refreshToken", newRefreshToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error.message);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return null;
    }
  }

  return null;
};
