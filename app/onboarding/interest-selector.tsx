"use client";

import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

// These would ideally come from a database or config
export const AVAILABLE_INTEREST = [
    "Music",
    "Gaming",
    "Sports",
    "Technology",
    "Science",
    "Art",
    "Food",
    "Travel",
    "Fashion",
    "Fitness",
    "Education",
    "Entertainment",
    "News",
    "Politics",
    "Business",
    "Finance",
    "Health",
    "Lifestyle",
    "Comedy",
    "DIY",
    "Pets",
    "Nature",
    "Photography",
    "Dance",
    "Beauty",
    "Cars",
    "Movies",
    "Books",
];

interface InterestSelectorProps {
    onInterestsChange: (interests: string[]) => void;
    initialInterests?: string[];
    maxSelections?: number;
}

export function InterestSelector({
    onInterestsChange,
    initialInterests = [],
    maxSelections = 5,
}: InterestSelectorProps) {
    const[selectedInterests, setSelectedInterests] = 
      useState<string[]>(initialInterests);
    
    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => {
          const isSelected = prev.includes(interest);
          if (isSelected) {
            const updated = prev.filter(i => i !== interest);
            onInterestsChange(updated);
            return updated;
          } else if (prev.length < maxSelections) {
            const updated = [...prev, interest];
            onInterestsChange(updated);
            return updated;
          }
          return prev;
        });
    };

    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between px-1">
            <p className="text-sm text-zinc-50 font-medium">
              Select up to {maxSelections} interests
            </p>
            <p className="text-sm text-zinc-50 font-medium">
              {selectedInterests.length}/{maxSelections} selected
            </p>
        </div>

        <ScrollArea className="h-[300px] w-full rounded-md border border-zinc-800/50 bg-gradient-to-b from-zinc-900/50 to-black/50 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex flex-wrap gap-2.5">
              {AVAILABLE_INTEREST.map(interest => (
                <Badge
                  key={interest}
                  variant={
                      selectedInterests.includes(interest) ? "default" : "outline"
                  }
                  className={cn(
                      "cursor-pointer transition-all duration-300 text-sm py-1.5 px-3 hover:scale-105 active:scale-95",
                      selectedInterests.includes(interest)
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 hover:from-indigo-600 hover:to-purple-600 shadow-lg"
                        : "bg-zinc-900/50 text-zinc-300 hover:text-white border-zinc-700/50 hover:border-zinc-500 hover:bg-zinc-800/50"
                  )}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
          </div>
        </ScrollArea>
      </div>

    );
}