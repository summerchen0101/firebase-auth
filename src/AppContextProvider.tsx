import { createContext, useContext, useState } from "react";
import React from "react";
const AppContext = createContext<AppContextProps | null>(null);

interface AppContextProps {
  isPwPopupVisible: boolean;
  setIsPwPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({ children }) {
  const [isPwPopupVisible, setIsPwPopupVisible] = useState(false);

  const value = {
    isPwPopupVisible,
    setIsPwPopupVisible
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
