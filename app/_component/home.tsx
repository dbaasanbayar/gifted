import { Button } from "@/components/ui/button";
import { AppScreen } from "@/lib/types";

interface HomeProps {
  setScreen: (screen: AppScreen) => void;
}

export const Home = ({ setScreen }: HomeProps) => {
  return (
    <div className="flex flex-col items-center p-10 h-screen">
      <h1>Gift for Kids</h1>
      <div>
        <Button onClick={() => setScreen(AppScreen.FORM)}>Start</Button>
      </div>
    </div>
  );
};
