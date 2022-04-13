import { Navigate } from "react-router-dom";
import React from "react";
import { getSessionAuth } from "./Session";
import toast from "react-hot-toast";

export type ProtectedRouteProps = {
  outlet: JSX.Element;
};

export function ProtectedAuth({ outlet }: ProtectedRouteProps) {
  if (getSessionAuth()) {
    return outlet;
  } else {
    toast.error("Session anda telah habis, harap masuk kembali");
    return <Navigate to="/login" replace />;
  }
}

export function LoginStatus({ outlet }: ProtectedRouteProps) {
  //   const navigator = useContext(UNSAFE_NavigationContext).navigator;
  if (getSessionAuth()) {
    return <Navigate to="/" replace />;
  } else return outlet;
}
