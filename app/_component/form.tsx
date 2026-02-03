"use client";
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
  handleRecommend: () => void;
}
const budgetOpions = ["20", "50", "100", "100+"];
const interestsLists = ["Space", "Animals", "Sports", "Drawing", "Cars"];
const genderOptions = ["Girl", "Boy", "Prefer not to say"];
const learningFocus = [
  "Problem solving",
  "Socail skills",
  "Creativity",
  "Science, Technology, Engineering and Maths",
  "Physical Activity",
  "Language",
  "Emotional Intelligence",
  "Fine Motor Skills",
];

export const Form = ({
  setScreen,
  setProfile,
  profile,
  handleRecommend,
}: FormProps) => {
  const [customInterest, setCustomInterest] = useState("");
  const [allInterests, setAllInterests] = useState(interestsLists);
  const addInterest = (interest: string) => {
    const value = interest.trim();
    if (!value) return;

    setAllInterests((prev) => (prev.includes(value) ? prev : [...prev, value]));

    if (!profile.interests.includes(value)) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, value],
      }));
    }
    setCustomInterest("");
  };

  const toggleLearningFocus = (subject: string) => {
    setProfile((prev) => {
      const exists = prev.learningFocus.includes(subject);

      return {
        ...prev,
        learningFocus: exists
          ? prev.learningFocus.filter((s) => s !== subject)
          : [...prev.learningFocus, subject],
      };
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 px-20 py-5">
      <div className="flex items-center flex-col ">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Child's Profile
        </h1>
        <p className="space-y-1 text-lg text-gray-600">
          Help us to understand your child
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-8">
        <div className="space-y-2 flex-1 min-w-0">
          <Label className="font-bold">Gender (optinal)</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger className="w-full bg-white">
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
        <div className="space-y-2 flex-1 min-w-0">
          <Label className="font-bold">Age Range</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, age: value }))
            }
          >
            <SelectTrigger className="w-full bg-white">
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
        <div className="space-y-2 flex-1 min-w-0">
          <Label className="font-bold">Budget Limit</Label>
          <Select
            onValueChange={(value) =>
              setProfile((prev) => ({ ...prev, budget: value }))
            }
          >
            <SelectTrigger className="w-full bg-white">
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
      <div className="flex flex-col space-y-2">
        <Label className="font-bold">
          Interest<span>(choose many)</span>
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={customInterest}
              onChange={(e) => setCustomInterest(e.target.value)}
              placeholder="More interests"
              className="bg-white"
            />
            <Button onClick={() => addInterest(customInterest)}>Add</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="font-bold">Learning Focus</Label>
        <div className="grid grid-cols-2 gap-4">
          {learningFocus.map((subject) => {
            const selected = profile.learningFocus.includes(subject);
            return (
              <Button
                key={subject}
                onClick={() => toggleLearningFocus(subject)}
                variant={selected ? "default" : "outline"}
              >
                {subject}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <Button onClick={handleRecommend}>Generate Gifts</Button>
      </div>
    </div>
  );
};
