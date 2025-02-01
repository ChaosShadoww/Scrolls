// import { auth } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation'

// export default async function RootLayout({ children }: { children: React.ReactNode }) {
//   if ((await auth()).sessionClaims?.metadata.onboardingComplete === true) {
//     redirect('./videos/video-feed')
//   }

//   return <>{children}</>
// }

"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { InterestSelector } from "./interest-selector";
import { useState } from "react";
import { updateUserInterests } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface OnboardingModalProps {
    isOpen: boolean;
}

export function OnboardingModal({ isOpen }: OnboardingModalProps) {
    const [interests, setInterests] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (interests.length === 0) return;

        try {
            setIsSubmitting(true);
            await updateUserInterests(interests);
            router.refresh();
        } catch (error) {
            console.error("Failed to update interests:", error);
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <Dialog open={isOpen} modal>
          <DialogContent className="sm:max-w-[425px] bg-zinc-900 border border-zinc-800 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-zinc-50">
                Welcome to Scrolls!
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Tell us what you are interested in so we can show you the best 
                content. You can always change these later in your settings.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <InterestSelector
                onInterestsChange={setInterests}
                maxSelections={5}
              />
            </div>

            <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={interests.length === 0 || isSubmitting}
                  className={cn(
                    "transition-all duration-300 text-white font-sm px-6 py-4",
                    "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
                    "shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                    "rounded-lg text-base"
                  )}
                >
                    {isSubmitting ? "Saving..." : "Start Watching"}
                </Button>
            </div>
          </DialogContent>
        </Dialog>
    );


}