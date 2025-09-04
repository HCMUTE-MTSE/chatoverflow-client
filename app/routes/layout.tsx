import * as React from "react";
import { Outlet } from "react-router";
import Navbar from "~/components/Navbar/Navbar";
import Header from "~/components/Header";

export default function Layout() {
  return (
    <div className="grid grid-cols-[1fr_5fr] gap-4 h-screen">
      <Navbar />
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto px-6 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
