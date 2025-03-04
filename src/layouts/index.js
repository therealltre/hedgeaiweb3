import PropTypes from "prop-types";
// guards

// components
import MainLayout from "./main";
import DashboardLayout from "./dashboard";
import LogoOnlyLayout from "./LogoOnlyLayout";
// import GuestGuard from "@/guards/GuestGuard";
// import AuthGuard from "@/guards/AuthGuard";

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "main", "logoOnly"])
};

export default function Layout({ variant = "dashboard", children }) {
  if (variant === "logoOnly") {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === "main") {
    return <MainLayout>{children}</MainLayout>;
  }

  return (
    // <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    // </AuthGuard>
  );
}
