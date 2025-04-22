"use client";
import { UserType } from "@/types/User_Types";
import React, { createContext, ReactNode, useState } from "react";

interface UserProviderProps {
  children?: ReactNode;
}
export interface UserContextProps {
  user: UserType;
  handleChange: (field: string, value: string) => void;
  loginPopUp: boolean;
  handleLoginPopUpChange: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  //USER LOGIN AND REGISTER
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
  });

  //USER HANDLE CHANGE
  const handleChange = (field: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //USER LOGIN AND REGISTER POP UP
  const [loginPopUp, setLoginPopUp] = useState(false);

  // POP HANDLE CHANGE
  const handleLoginPopUpChange = (value: boolean) => {
    setLoginPopUp(value);
  };

  const socket_context_value = {
    user,
    handleChange,
    loginPopUp,
    handleLoginPopUpChange,
  };

  return (
    <UserContext.Provider value={socket_context_value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
