import { Button } from "@/components/ui/button";
import { AppScreen } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormProps {
  setScreen: (screen: AppScreen) => void;
}
const budgetOpions = ["20", "50", "100", "100+"];

export const Form = ({ setScreen }: FormProps) => {
  return (
    <div className="flex flex-col items-center p-10 h-screen">
      <h1>Child's Profile</h1>
      <p>Help us understand what makes your child special.</p>
      <div className="flex gap-10 p-10">
        <div className="flex flex-col">
          <Label>Age Range</Label>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select age" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from({ length: 16 }, (_, i) => i + 1).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year} {year === 1 ? "year" : "years"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label>Budget Limit</Label>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select budget (USD)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {budgetOpions.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget}$
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10 flex flex-col">
        <Label>
          Interest<span>(choose many)</span>
        </Label>
        <div className="flex gap-10">
          <Button>Space</Button>
          <Button>Animals</Button>
          <Button>+Add other</Button>
        </div>
      </div>
      <div className="p-10 flex flex-col">
        <Label>Learning Focus</Label>
        <div className="grid grid-cols-2 gap-4">
          <Button>Problem Solving</Button>
          <Button>Creativity</Button>
          <Button>Social Skills</Button>
          <Button>STEM</Button>
        </div>
      </div>
      <div>
        <Button onClick={() => setScreen(AppScreen.RESULTS)}>
          Generate Gifts
        </Button>
      </div>
    </div>
  );
};
