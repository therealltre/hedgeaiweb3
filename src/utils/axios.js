// import axios from 'axios';
// import AxiosMockAdapter from 'axios-mock-adapter';

// // ----------------------------------------------------------------------

// const axiosInt = axios.create();

// axiosInt.interceptors.response.use(
//   (response) => response,
//   (error) =>
//     Promise.reject(
//       (error.response && error.response.data) || 'There is an error!'
//     )
// );

// export const mock = new AxiosMockAdapter(axiosInt, { delayResponse: 0 });

// export default axiosInt;

// //------------FOR ACTUAL BACKEND FETCH--------------------------------------

import axios from "axios";

// // ----------------------------------------------------------------------

const axiosInt = axios.create({
  baseURL: "http://3.84.217.67:8000", // process.env.HOST_API_KEY
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
    // Add other headers here if needed, such as authorization tokens
  },
});

// Interceptor for handling responses and errors
axiosInt.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "There is an error!"
    )
);

export default axiosInt;

export const getAxiosApi = (enqueueSnackbar) => {
  const api = axios.create({
    withCredentials: true,
  });
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message || "Unauthorized! Redirecting to login..."
        // console.log()
        // console.error("Unauthorized! Redirecting to login...");
        enqueueSnackbar(errorMessage, {
          variant: "error",
        });
        window.location.href = "/auth/login"; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );
  return api;
};
