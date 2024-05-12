"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "@/helpers/types";

interface UserContextProps {
  token: string | null;
  user: IUser | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <UserContext.Provider value={{ token, user, setToken, setUser }}>
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
