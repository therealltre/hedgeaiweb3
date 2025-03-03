import { getAxiosApi } from "@/utils/axios";

export async function getUserDetails(_enqueueSnackbar) {
  console.log("🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 ");

  try {
    const axiosApi = getAxiosApi(_enqueueSnackbar);
    const response = await axiosApi.get(
      "http://localhost:5000/api/v1/user/details",
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    console.log("User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }
}
