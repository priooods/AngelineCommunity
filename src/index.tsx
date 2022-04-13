import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./layout/auth/Login";
import Register from "./layout/auth/Register";
import Beranda from "./layout/Beranda";
import Profile from "./layout/Profile";
import ProfilePosting from "./layout/profile/ProfilePosting";
import ProfileCollection from "./layout/profile/ProfileCollection";
import ProfileAbout from "./layout/profile/ProfileAbout";
import App from "./layout/App";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { Toaster } from "react-hot-toast";
import { ProtectedAuth, LoginStatus } from "../src/helper/Authenticator";
initializeIcons(undefined, { disableWarnings: true });

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="login"
        element={<LoginStatus outlet={<Login />}></LoginStatus>}
      />
      <Route path="register" element={<Register />} />
      <Route
        path="/"
        element={<ProtectedAuth outlet={<App />}></ProtectedAuth>}
      >
        <Route path="/" element={<ProtectedAuth outlet={<Beranda />} />} />
        <Route path="profile" element={<ProtectedAuth outlet={<Profile />} />}>
          <Route
            path=""
            element={<ProtectedAuth outlet={<ProfilePosting />} />}
          />
          <Route
            path="about"
            element={<ProtectedAuth outlet={<ProfileAbout />} />}
          />
          <Route
            path="collection"
            element={<ProtectedAuth outlet={<ProfileCollection />} />}
          />
        </Route>
      </Route>
    </Routes>
    <Toaster
      toastOptions={{
        duration: 4000,
        position: "top-right",
        style: {
          background: "#191919",
          color: "#f0f0f0",
          fontSize: "11px",
        },
      }}
    />
  </BrowserRouter>,
  document.getElementById("root")
);
