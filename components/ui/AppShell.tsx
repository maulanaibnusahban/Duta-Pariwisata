"use client";

import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import MusicPlayer from "./MusicPlayer";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showBottomBar = !pathname.startsWith("/top-up");
  const showMusicPlayer = !pathname.startsWith("/top-up") && !pathname.startsWith("/vote/");

  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {children}
        <Footer />
      </div>
      {showMusicPlayer && <MusicPlayer />}
      {showBottomBar && <BottomNav />}
    </div>
  );
}
