"use client"
import { Button } from "@/components/ui/button";
import { AppScreen, ChildProfile } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface FormProps {
  setScreen: (screen: AppScreen) => void;
  profile: ChildProfile;
  setProfile: React.Dispatch<React.SetStateAction<ChildProfile>>;
}
const budgetOpions = ["20", "50", "100", "100+"];
const interestsLists = ["Space", "Animals", "Sports", "Drawing"];
const genderOptions = ["Girl", "Boy", "Prefer not to say"];

export const Form = ({ setScreen, setProfile, profile }: FormProps) => {
  const [customInterest, setCustomInterest]= useState("");
  const [allInterests, setAllInterests] = useState(interestsLists);
  const addInterest = (interest: string) => {
    const value = interest.trim();
    if (!value) return;

    setAllInterests((prev) =>
      prev.includes(value) ? prev : [...prev, value]
    );
  
    if (!profile.interests.includes(value)) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, value],
      }));
    }
  
    setCustomInterest("");
  };

  return (
    <div className="flex flex-col items-center p-10 h-screen">
      <h1 className="font-bold">Child's Profile</h1>
      <p>Help us understand what makes your child special.</p>
      <div className="flex gap-10 p-10">
        <div className="flex flex-col">
          <Label className="font-bold">Gender(optinal)</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {genderOptions.map((gen) => (
                  <SelectItem key={gen} value={gen}>
                    {gen}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label className="font-bold">Age Range</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, age: value }))
            }
          >
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
          <Label className="font-bold">Budget Limit</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, budget: value }))
            }
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select budget (USD)" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {budgetOpions.map((budget) => (
                  <SelectItem key={budget} value={budget}>
                    {budget} $
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10 flex flex-col">
        <Label className="font-bold">
          Interest<span>(choose many)</span>
        </Label>
        <div className="grid grid-cols-3 gap-4">
          {allInterests.map((interest) => {
            const selected = profile.interests.includes(interest);
            return (
              <Button
                key={interest}
                onClick={() => addInterest(interest)}
                variant={selected ? "default" : "outline"}
              >
                {interest}
              </Button>
            );
          })}
          <div className="flex gap-2">
  <Input
    value={customInterest}
    onChange={(e) => setCustomInterest(e.target.value)}
    placeholder="Other interest"
    className="border rounded px-2 py-1"
  />
  <Button onClick={() => addInterest(customInterest)}>Add</Button>
</div>
        </div>
      </div>
      <div className="p-10 flex flex-col">
        <Label className="font-bold">Learning Focus</Label>
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
