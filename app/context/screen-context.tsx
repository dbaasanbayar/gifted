"use client"

import { AppScreen } from "@/lib/types";
import { createContext, ReactNode, useContext, useState } from "react"

interface NavigationContextType {
  screen : AppScreen,
  setScreen: (view: AppScreen) => void;
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({children} : {children: ReactNode}) => {
  const [screen, setScreen] =useState<AppScreen>(AppScreen.HOME);
  return <NavigationContext.Provider value={{screen, setScreen}}>{children}</NavigationContext.Provider>
}

export const useNav = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useNav must be used within NavigationProvider");
  return context;
}