import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navigasi() {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 left-0 z-50 right-0 bg-white block shadow-md">
      <div className="w-full h-0.5 bg-orange-500"></div>
      <div className="w-full flex justify-start sm:py-3 container mx-auto">
        <p
          className="w-auto font-RobMed text-base cursor-pointer my-auto mr-auto"
          onClick={() => navigate("/")}
        >
          Angeline Community
        </p>
        <ol className="text-sm sm:font-RobLight list-none flex justify-start">
          <ul className="sm:ml-2.5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-slate-800 cursor-pointer rounded-full sm:px-3 sm:py-1 bg-slate-200"
                  : "sm:px-3 sm:py-1 text-slate-800"
              }
            >
              Social Post
            </NavLink>
          </ul>
          <ul className="sm:ml-2.5">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-slate-800 cursor-pointer rounded-full sm:px-3 sm:py-1 bg-slate-200"
                  : "sm:px-3 sm:py-1 text-slate-800"
              }
            >
              Profile
            </NavLink>
          </ul>
        </ol>
      </div>
    </div>
  );
}
