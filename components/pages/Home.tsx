import React from "react";
import Header from "../Home/Header";
import CountdownTimer from "../Home/CountdownTimer";
import CandidateList from "../Home/CandidateList";
import LastViewed from "../Home/LastViewed";
import Reels from "../Home/Reels";
import RightSidebar from "../Home/RightSidebar";

export default function Home() {
  return (
    <>
      <main className={`p-3 md:p-6 w-full overflow-y-auto min-h-screen relative`}>
        <div className="mx-auto">
          <Header />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 max-w-7xl mx-auto">
            <div className="lg:col-span-8 space-y-8 z-20 pb-24 lg:pb-0">
              <CountdownTimer />
              <CandidateList />
              <LastViewed />
              <Reels />
            </div>

            <div className="hidden lg:block col-span-4 xl:col-span-4 relative">
              <div className="sticky top-0">
                <RightSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
