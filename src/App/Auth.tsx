import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../hooks/isLoggedIn";

interface Props {
  children: React.ReactNode;
}

export const AuthCheck: React.FC<Props> = ({ children }) => {
  const nav = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      return nav("/");
    }
  });
  return <>{children}</>;
};
