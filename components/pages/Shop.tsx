"use client";

import { ChevronRight, Crown, FilmIcon, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AdsToast from "@/components/shop/AdsToast";
import AdsModal from "@/components/shop/AdsModal";
import LoginButton from "@/components/Home/LoginButton";
import { useUser } from "@/lib/useAuth";

export default function Shop() {
  const router = useRouter();
  const [showAds, setShowAds] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const user = useUser();

  const handleAdsClose = () => {
    setShowAds(false);
    setShowToast(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
        <div className="pt-6 px-5 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-gray-500">Dapatkan koin untuk mendukung kandidat favoritmu.</p>
        </div>
        <div className="flex flex-col items-center justify-center pt-20 gap-5 px-5">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <User2 className="w-12 h-12 text-gray-300" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Login Diperlukan</h2>
            <p className="text-gray-500 text-sm mb-6">Masuk terlebih dahulu untuk mengakses Shop.</p>
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
      {/* Desktop Header Title */}
      <div className="pt-6 px-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
        <p className="text-gray-500">Dapatkan koin untuk mendukung kandidat favoritmu.</p>
      </div>

      <div className="p-5 md:p-8 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 gap-4 md:gap-6 xl:gap-8 items-start">
          <div className="h-full flex items-center justify-between bg-gold-gradient rounded-2xl p-6 text-white">
            <div className="relative z-10">
              <p className="font-semibold text-white/90 mb-1 text-sm">Saldo Saya</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-white" />
                  <span className="text-4xl font-bold tracking-tight">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="flex flex-col justify-center space-y-4 h-full">
            {/* Tonton Iklan button */}
            <button
              onClick={() => setShowAds(true)}
              className="flex w-full bg-white rounded-2xl px-5 py-4 border shadow-xs hover:shadow-md transition-all group border-gray-200 justify-between items-center active:scale-[0.99]"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FilmIcon className="w-6 h-6 md:w-7 md:h-7 text-gold-500" />
                  <span className="text-base md:text-lg font-bold">Tonton Iklan</span>
                </div>
                <p className="text-sm hidden md:block text-gray-500">Dapatkan koin dengan menonton Iklan</p>
              </div>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Top Up button */}
            <button
              onClick={() => router.push("/top-up")}
              className="flex w-full bg-white rounded-2xl px-5 py-4 border shadow-xs hover:shadow-md transition-all group border-gray-200 justify-between items-center active:scale-[0.99]"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 md:w-7 md:h-7 text-gold-500" />
                  <span className="text-base md:text-lg font-bold">Top Up</span>
                </div>
                <p className="text-sm hidden md:block text-start text-gray-500">
                  Dapatkan koin dengan melakukan pembelian
                </p>
              </div>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Ad Modal */}
      {showAds && <AdsModal onClose={handleAdsClose} />}

      {/* Success Toast */}
      {showToast && <AdsToast onDone={() => setShowToast(false)} />}
    </div>
  );
}
