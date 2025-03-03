import { BACKEND_URL } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized, try refreshing token
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/api/v1/auth/refresh-access-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const userData = createApi({
  reducerPath: "userData",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => "/api/v1/user/details",
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUserDataQuery } = userData;
