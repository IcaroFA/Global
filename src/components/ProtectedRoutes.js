import React, { useContext, useEffect } from "react";
import { GlobalContex } from "../context/contex";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const navigate = useNavigate();

  const { userData } = useContext(GlobalContex);
  const isAuthenticated = Object.keys(userData).length > 0;
  const isAdmin = Object.keys(userData).length > 0 && userData.role === "ADMIN";
  const isDonor = Object.keys(userData).length > 0 && userData.role === "DONOR";
  const isAgent = Object.keys(userData).length > 0 && userData.role === "AGENT";

  useEffect(() => {
    if (!isAuthenticated) return navigate("/");
  }, []);

  return <Outlet />;
}

export default ProtectedRoutes;
