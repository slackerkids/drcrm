import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../services/constants";
import { useState, useEffect, ReactNode } from "react";

type ProtectedRouteType = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteType) {
  console.log(localStorage.getItem(ACCESS_TOKEN))
  const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  async function refreshToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post("/api/token/refresh", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  async function auth() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        setIsAuthorized(false);
        return;
    }
    const decodedToken = jwtDecode(token);
    const tokenExpiration = decodedToken.exp;
    const now = Date.now() / 1000;

    // Ternary solution against undefined type. 
    if (tokenExpiration ? tokenExpiration < now : false) {
        await refreshToken();
    } else {
        setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute;