import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireCurator?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireCurator = false,
}) => {
  const { isAuthenticated, isCurator, authState } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to auth page
  if (!isAuthenticated()) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If curator access is required but user is not a curator, redirect to home
  if (requireCurator && !isCurator()) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
