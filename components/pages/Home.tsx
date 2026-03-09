"use client";
import React from "react";
import Header from "../Home/Header";
import CountdownTimer from "../Home/CountdownTimer";
import CandidateList from "../Home/CandidateList";
import LastViewed from "../Home/LastViewed";
import Reels from "../Home/Reels";
import RightSidebar from "../Home/RightSidebar";
import { useUser } from "@/lib/useAuth";
import Image from "next/image";
import Link from "next/link";
import { loginWithGoogle } from "@/lib/auth";
import { LogIn } from "lucide-react";

export default function Home() {
  const user = useUser();
  return (
    <>
      <main className={`px-5 pb-6 md:py-4 w-full min-h-screen relative`}>
        <div className="mx-auto">
          <Header />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  max-w-7xl mx-auto  ">
            <div className="lg:col-span-6 xl:col-span-8 space-y-4 z-20 pb-24 lg:pb-0">
              <div className="bg-white lg:hidden rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4  ">
                {user ? (
                  <Link href="/profile" className=" flex justify-between w-full">
                    <div>
                      <h2 className="text-gray-500  lg:text-lg font-medium">Selamat Pagi,</h2>
                      <h1 className="text-2xl  font-bold text-gray-900 tracking-tight">{user.name}</h1>
                    </div>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-gold-200">
                      <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex justify-between w-full">
                    <div>
                      <h2 className="text-gray-500  lg:text-lg font-medium">Selamat Datang,</h2>
                      <h1 className="text-2xl  font-bold text-gray-900 tracking-tight">Pengunjung</h1>
                    </div>
                    <button
                      onClick={() => loginWithGoogle()}
                      className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-amber-400 border border-amber-200 rounded-xl hover:bg-amber-50 active:scale-[0.98] transition-all cursor-pointer shrink-0"
                    >
                      <LogIn className="w-4 h-4 text-gray-500" />
                      <span className="">Masuk</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:hidden">
                <CountdownTimer />
              </div>
              {/* <div className="lg:hidden"><CandidateList /></div> */}
              {/* <div className="lg:hidden"><LastViewed /></div> */}
              <Reels />
            </div>

            <div className="hidden lg:block col-span-6 xl:col-span-4 relative">
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
