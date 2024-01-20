"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./Header";

export default function Middleware() {
  const pathname = usePathname();
  const checkPath = () => {
    if (pathname == "/") {
      return <Header />;
    }
  };
  return <div>{checkPath()}</div>;
}
