import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthCenter = createContext(null);

export function AuthCenterProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("centerToken") || "");
  const [authenticated, setAuthenticated] = useState(false);
  const [centerId, setCenterId] = useState(
    localStorage.getItem("centerId") || ""
  );
  const [centerLogo, setCenterLogo] = useState(
    localStorage.getItem("centerLogo") || ""
  );

  useEffect(() => {
    setAuthenticated(token !== "");
    if (token) {
      localStorage.setItem("centerToken", token);
    } else {
      localStorage.removeItem("centerToken");
    }
    if (centerId) {
      localStorage.setItem("centerId", centerId);
    } else {
      localStorage.removeItem("centerId");
    }
    if (centerLogo) {
      localStorage.setItem("centerLogo", centerLogo);
    } else {
      localStorage.removeItem("centerLogo");
    }
  }, [centerId, token, centerLogo]);

  const value = {
    token,
    setToken,
    authenticated,
    centerId,
    setCenterId,
    centerLogo,
    setCenterLogo,
  };

  return <AuthCenter.Provider value={value}>{children}</AuthCenter.Provider>;
}
