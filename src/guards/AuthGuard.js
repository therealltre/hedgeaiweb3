import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import Login from "../pages/auth/login";
import LoadingScreen from "../components/LoadingScreen";

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  useEffect(() => {
    console.log("isInitialized:", isInitialized);
    console.log("isAuthenticated:", isAuthenticated);
  }, [isInitialized, isAuthenticated]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
