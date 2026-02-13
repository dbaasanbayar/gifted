"use client";
import { AppScreen, ChildProfile, GiftRecommendation } from "@/lib/types";
import { useState } from "react";
import { Home } from "@/app/_component/home";
import { Form } from "@/app/_component/form";
import { Loading } from "@/app/_component/loading";
import { Results } from "@/app/_component/results";
import { useNav } from "./context/screen-context";
export default function Page() {
  const {screen, setScreen} = useNav();
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

  const handleRecommend = async () => {
    setScreen(AppScreen.LOADING);
    setLoadingText(loadingText);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) throw new Error("Failed to fetch recommendations");
      const data = await response.json();
      setResults(data);
      setScreen(AppScreen.RESULTS);
    } catch (error) {
      console.error(error);
      setLoadingText("Oops! Something went wrong. Returning home...");
      setTimeout(() => setScreen(AppScreen.HOME), 3000);
    }
  };

  const handleSaveGift = (gift: GiftRecommendation) => {
    setSavedGifts((prev) => {
      if (prev.find((g) => g.id === gift.id)) return prev;
      return [...prev, gift];
    });
  };

  return (
    <div className="min-h-screen">
      {screen === AppScreen.HOME && <Home setScreen={setScreen} />}
      {screen === AppScreen.FORM && (
        <Form
          handleRecommend={handleRecommend}
          profile={profile}
          setProfile={setProfile}
          setScreen={setScreen}
        />
      )}
      {screen === AppScreen.LOADING && (
        <Loading loadingText={loadingText} setScreen={setScreen} />
      )}
      {screen === AppScreen.RESULTS && (
        <Results
          onSaveGift={handleSaveGift}
          results={results}
          setScreen={setScreen}
        />
      )}
    </div>
  );
}
