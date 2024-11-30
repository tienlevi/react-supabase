import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { SESSION } from "../constants/enum";
import useAuth from "../hooks/useAuth";

function ProtectRoutes({ children }: { children: ReactNode }) {
  const { event } = useAuth();
  const location = useLocation();

  if (event === SESSION.SIGNED_OUT) {
    return <Navigate to={`/login`} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectRoutes;
