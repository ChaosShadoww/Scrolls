import React from "react";
import Link from "next/link";

export default function SideNavigation() {
  return (
    <nav className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center pt-4">
      <Link href="/video-feed">
        <div className="text-white text-xl p-2 cursor-pointer">🏠</div>
      </Link>
      <Link href="/upload">
        <div className="text-white text-xl p-2 cursor-pointer">⬆️</div>
      </Link>
      <Link href="/profile">
        <div className="text-white text-xl p-2 cursor-pointer">👤</div>
      </Link>
    </nav>
  );
}
