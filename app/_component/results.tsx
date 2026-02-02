import { Button } from "@/components/ui/button";
import { AppScreen } from "@/lib/types";

interface ResultProps {
  setScreen: (screen: AppScreen) => void;
}

export const Results = ({ setScreen }: ResultProps) => {
  return (
    <div className="flex flex-col items-center p-10 h-screen">
      <h1>Recommended Gifts</h1>
      <div>
        <Button onClick={() => setScreen(AppScreen.HOME)}>Star again</Button>
      </div>
    </div>
  );
};
