"use client";

import { useState } from "react";

interface InterestSelectorProps {
  onInterestsChange: (interests: string[]) => void;
  maxSelections?: number;
}

export function InterestSelector({ onInterestsChange, maxSelections = 5 }: InterestSelectorProps) {
  const allInterests = ["Tech", "Gaming", "Music", "Art", "Science", "Movies", "Sports"];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    let updatedInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter((i) => i !== interest)
      : [...selectedInterests, interest];

    if (updatedInterests.length > maxSelections) return;

    setSelectedInterests(updatedInterests);
    onInterestsChange(updatedInterests);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {allInterests.map((interest) => (
        <button
          key={interest}
          className={`px-4 py-2 rounded-md ${
            selectedInterests.includes(interest) ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => toggleInterest(interest)}
        >
          {interest}
        </button>
      ))}
    </div>
  );
}
