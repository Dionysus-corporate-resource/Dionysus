import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider";

export default function Authentication({
  children,
  permissions,
}: {
  children: ReactNode;
  permissions?: [string];
}) {
  const authContext = useAuth();
  const location = useLocation();

  console.log("Authentication", authContext?.user?.roles);

  if (
    permissions &&
    authContext?.user?.roles &&
    permissions?.includes(authContext?.user?.roles) === false
  ) {
    return <Navigate to="/" />;
  }

  if (!authContext?.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
}
