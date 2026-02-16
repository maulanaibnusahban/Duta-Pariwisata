"use client";
import Sidebar from "@/components/ui/Sidebar";
import { useState } from "react";
import Vote from "@/components/pages/Vote";
import Shop from "@/components/pages/Shop";
import Home from "@/components/pages/Home";
import BottomNav from "@/components/ui/BottomNav";

export default function Page() {
  const [page, setPage] = useState("home");
  let pageToRender;

  if (page === "home") {
    pageToRender = <Home />;
  } else if (page === "vote") {
    pageToRender = <Vote />;
  } else if (page === "shop") {
    pageToRender = <Shop />;
  } else {
    pageToRender = <Home />;
  }

  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar setPage={setPage} page={page} />
      {pageToRender}
      {/* <main className={`p-3 md:p-6 w-full overflow-y-auto min-h-screen`}>
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

      <RightSidebar /> */}
      <BottomNav setPage={setPage} page={page} />
    </div>
  );
}
