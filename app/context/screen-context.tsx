"use client";
import { AppScreen } from "@/lib/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ScreenContextType = {
  screen: AppScreen;
  setScreen: Dispatch<SetStateAction<AppScreen>>;
};

type ScreenProviderProps = {
  children: ReactNode;
};

const ScreenContext = createContext<ScreenContextType | null>(null);

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.HOME);

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = (): ScreenContextType => {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error("useScreen must be used within ScreenProvider");
  }

  return context;
};
