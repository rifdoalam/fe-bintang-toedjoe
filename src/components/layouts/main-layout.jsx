"use client";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const MainLayout = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  return <div className="w-screen h-screen bg-white">{children}</div>;
};

export default MainLayout;
