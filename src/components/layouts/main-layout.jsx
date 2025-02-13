"use client";
import { useEffect } from "react";

const MainLayout = ({ children }) => {
  return <div className="w-screen h-screen bg-white">{children}</div>;
};

export default MainLayout;
