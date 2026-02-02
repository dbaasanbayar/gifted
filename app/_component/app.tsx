"use client";
import { AppScreen, ChildProfile, GiftRecommendation } from "@/lib/types";
import { useState } from "react";
import { Home } from "./home";
import { Form } from "./form";
import { Loading } from "./loading";
import { Results } from "./results";
export const App = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.HOME);
  const [profile, setProfile] = useState<ChildProfile>({
    age: "",
    gender: "",
    interests: [],
    budget: "",
    learningFocus: [],
  });
  const [results, setResults] = useState<GiftRecommendation[]>([]);
  const [savedGifts, setSavedGifts] = useState<GiftRecommendation[]>([]);
  const [loadingText, setLoadingText] = useState("Thinking...");
  return (
    <div className="min-h-screen bg-gray-100">
      {screen === AppScreen.HOME && <Home setScreen={setScreen} />}
      {screen === AppScreen.FORM && <Form setScreen={setScreen} />}
      {screen === AppScreen.LOADING && (
        <Loading loadingText={loadingText} setScreen={setScreen} />
      )}
      {screen === AppScreen.RESULTS && <Results setScreen={setScreen} />}
    </div>
  );
};
