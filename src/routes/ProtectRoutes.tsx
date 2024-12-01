import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

function ProtectRoutes() {
  const { user } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return loading ? (
    <Loading />
  ) : user === null ? (
    <Navigate to={`/login`} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default ProtectRoutes;
