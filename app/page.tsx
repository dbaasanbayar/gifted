"use client";
import { AppScreen, ChildProfile, GiftRecommendation } from "@/lib/types";
import { useState } from "react";
import { Home } from "@/app/_component/home";
import { Form } from "@/app/_component/form";
import { Loading } from "@/app/_component/loading";
import { Results } from "@/app/_component/results";
export default function Page() {
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
      {screen === AppScreen.FORM && (
        <Form profile={profile} setProfile={setProfile} setScreen={setScreen} />
      )}
      {screen === AppScreen.LOADING && (
        <Loading loadingText={loadingText} setScreen={setScreen} />
      )}
      {screen === AppScreen.RESULTS && <Results setScreen={setScreen} />}
    </div>
  );
}
