import { getVideos } from "../actions/video";
import { VideoFeedClient } from "./video-feed-client";
import { OnboardingModal } from "../onboarding/onboarding-modal";
import { auth } from "@clerk/nextjs/server";
import { getAuthenticatedSupabaseClient } from "../lib/supabase";

export async function VideoFeed() {
    const { userId } = await auth();

    // If not logged in, show all videos
    if (!userId) {
        const posts = await getVideos();
        return <VideoFeedClient posts={posts} />;
    }

    // Check if user has completed onboarding
    const client = await getAuthenticatedSupabaseClient();
    const { data: userData } = await client
        .from("users")
        .select("metadata")
        .eq("id", userId)
        .single();
        
    // If user doesnt exist or hasn't completed onboarding, show onboarding
    const hasCompletedOnboarding =
        userData?.metadata?.completed_onboarding ?? false;

    // Get recommended videos for all videos if onboarding not completed
    const posts = await getVideos(userId);

    // console.log('posts', posts)
    console.log("hasCompletedOnboarding", hasCompletedOnboarding);

    return (
        <>
            <OnboardingModal isOpen={!hasCompletedOnboarding} />
            <VideoFeedClient posts={posts} />
        </>
    );



}


// import React from "react";

// const videos = [
//   {
//     id: 1,
//     title: "Amazing Dance Moves",
//     url: "https://www.w3schools.com/html/mov_bbb.mp4",
//     likes: 120,
//     comments: 10,
//   },
//   {
//     id: 2,
//     title: "Funny Cat Compilation",
//     url: "https://www.w3schools.com/html/movie.mp4",
//     likes: 250,
//     comments: 35,
//   },
// ];

// export default function VideoFeed() {
//   return (
//     <div className="flex flex-col items-center space-y-8 p-4">
//       {videos.map((video) => (
//         <div key={video.id} className="w-full max-w-md bg-gray-900 p-4 rounded-lg">
//           <video
//             controls
//             className="w-full rounded-lg"
//             src={video.url}
//           ></video>
//           <h2 className="text-white mt-2">{video.title}</h2>
//           <p className="text-gray-400">❤️ {video.likes} | 💬 {video.comments}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
