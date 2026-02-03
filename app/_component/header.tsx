"use client";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useScreen } from "../context/screen-context";
import { AppScreen } from "@/lib/types";

export const Header = () => {
  const { setScreen } = useScreen();
  return (
    <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
      <Button
        onClick={() => setScreen(AppScreen.HOME)}
        variant="ghost"
        size="lg"
        className={cn(
          "text-xl font-bold tracking-tight text-black hover:bg-purple-50/70",
          "hover:text-purple-700 transition-all duration-200",
          "active:bg-purple-100 active:scale-95 active:shadow-inner",
        )}
      >
        Gifted
      </Button>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "text-xl font-bold tracking-tight text-black hover:bg-purple-50/70",
            "hover:text-purple-700 transition-all duration-200",
            "active:bg-purple-100 active:scale-95 active:shadow-inner",
          )}
        >
          <Bookmark />
          Saved
        </Button>
        <div className="flex gap-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
