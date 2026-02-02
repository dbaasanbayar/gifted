import { AppScreen } from "@/lib/types";

interface LoadProps {
  setScreen: (screen: AppScreen) => void;
  loadingText: string;
}

export const Loading = ({ setScreen, loadingText }: LoadProps) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p>{loadingText}</p>
    </div>
  );
};
