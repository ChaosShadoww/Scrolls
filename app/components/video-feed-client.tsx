"use client";

import { useEffect, useRef, useCallback } from "react";
import type { VideoMetadata } from "@/app/types/video";
import { useVideoStore } from "@/app/stores/video-store";
import { VideoPlayer } from "./video/video-player";

interface VideoFeedClientProps {
  posts?: VideoMetadata[];
}

export function VideoFeedClient({ posts = [] }: VideoFeedClientProps) {
  const { videos, setVideos, isInitialized, setInitialized } = useVideoStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevVideosLengthRef = useRef(videos.length);

  // Initialize store with server data
  useEffect(() => {
    if (!isInitialized && posts.length > 0) {
      setVideos(posts);
      setInitialized(true);
    }
  }, [posts, isInitialized, setVideos, setInitialized]);

  // Scroll Event Listener for Infinite Scrolling
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // Check if user is near the bottom of the scrollable area
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log("Load more videos...");
      // Implement a function to fetch and append new videos
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div ref={scrollContainerRef} className="flex flex-col items-center space-y-8 p-4 overflow-y-auto h-screen">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="w-full max-w-md bg-gray-900 p-4 rounded-lg shadow-md">
            <VideoPlayer videoUrl={video.url} />
            <h2 className="text-white mt-2 text-lg font-semibold">{video.title}</h2>
            <p className="text-gray-400">❤️ {video.likes} | 💬 {video.comments}</p>
          </div>
        ))
      ) : (
        <p className="text-white text-lg">No videos available.</p>
      )}
    </div>
  );
}
