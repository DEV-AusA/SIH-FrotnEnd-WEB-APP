"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  token: string | null;
  role: "user" | "admin" | "security" | null;
  setToken: (token: string | null) => void;
  setRole: (role: "user" | "admin" | "security" | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin" | "security" | null>(null);

  return (
    <UserContext.Provider value={{ token, role, setToken, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used inside a UserProvider");
  }
  return context;
};
