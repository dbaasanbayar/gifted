"use client";
import { Button } from "@/components/ui/button";
import { AppScreen } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { Brain, Heart, Rocket } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

interface HomeProps {
  setScreen: (screen: AppScreen) => void;
}

export const Home = ({ setScreen }: HomeProps) => {
  const { isSignedIn } = useUser();
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="text-slate-800">Gift</span>{" "}
          <span className="text-primary">for Kids</span>
        </h2>
        <p className="mt-5 text-xl text-slate-600 font-medium">
          Find the educational gift that sparks learning, joy, and growth!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full mb-16">
        {[
          {
            icon: Brain,
            // Map the full tailwind classes here
            styles: "bg-sky-50 text-sky-600",
            title: "Develop Skills",
          },
          {
            icon: Heart,
            styles: "bg-pink-50 text-pink-600",
            title: "Bring Joy",
          },
          {
            icon: Rocket,
            styles: "bg-indigo-50 text-indigo-600",
            title: "Spark Curiosity",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div
              className={`
          w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
          transition-transform group-hover:scale-110
          ${item.styles} 
        `}
            >
              <item.icon className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-center text-slate-800">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
      {!isSignedIn ? (
        <SignInButton mode="modal">
          <Button>Start Recommendation →</Button>
        </SignInButton>
      ) : (
        <Button onClick={() => setScreen(AppScreen.FORM)}>
          Start Recommendation →
        </Button>
      )}
    </div>
  );
};
