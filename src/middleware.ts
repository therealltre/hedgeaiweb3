import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // Read cookies from request headers
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  console.log("🚀 ~ middleware ~ accessToken:", accessToken);

  // If the route is protected, check authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (accessToken) {
      return NextResponse.next();
    }

    // If accessToken is missing but refreshToken is available, try to refresh
    if (refreshToken) {
      try {
        const response = await fetch("http://localhost:5000/api/v1/auth/refresh-access-token", {
          method: "POST",
          credentials: "include",
          headers: {
            Cookie: `refreshToken=${refreshToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;

          console.log("✅ Token refreshed successfully!");

          // Set new cookies
          const responseWithCookies = NextResponse.next();
          responseWithCookies.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          responseWithCookies.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });

          return responseWithCookies;
        } else {
          console.error("❌ Refresh token request failed.");
        }
      } catch (error) {
        console.error("❌ Error refreshing token:", error.message);
      }
    }

    // If no access token and refresh fails, redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile", "/settings"],
};
