import React from "react";
import Navigasi from "../utils/Navigasi";
import { Outlet } from "react-router-dom";
export default function App() {
  return (
    <div>
      <div className="sm:block bg-slate-100">
        {/* Ini untuk navigasi */}
        <Navigasi />
        <main className="sm:w-full container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
