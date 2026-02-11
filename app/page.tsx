"use client";

import Header from "@/components/Header";
import CountdownTimer from "@/components/CountdownTimer";
import VoteButton from "@/components/VoteButton";
import CandidateList from "@/components/CandidateList";
import LastViewed from "@/components/LastViewed";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import Reels from "@/components/Reels";

export default function Home() {
  return (
    <div className="bg-white min-h-screen max-w-full font-sans flex relative">
      <Sidebar />
      <main className={`p-3 md:p-6 w-full overflow-y-auto min-h-screen`}>
        <div className="max-w-2xl mx-auto pt-6 md:pt-0 ">
          <Header />

          <div className="space-y-6 z-20">
            <CountdownTimer />
            <VoteButton />
            <CandidateList />
            <LastViewed />
            <Reels />
          </div>
        </div>

        <BottomNav />
      </main>

      <RightSidebar />
    </div>
  );
}
