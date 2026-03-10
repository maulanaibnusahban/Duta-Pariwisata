"use client";

import React, { useState } from "react";
import { Crown, Search } from "lucide-react";
import Image from "next/image";
import { candidates } from "@/lib/content";
import { useRouter } from "next/navigation";

export default function Vote() {
  const [activeTab, setActiveTab] = useState("People Choice");
  const router = useRouter();

  return (
    <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
      {/* Desktop Header Title */}
      <div className="pt-6 px-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vote</h1>
        <p className="text-gray-500">Dukung kandidat favoritmu untuk menjadi juara.</p>
      </div>

      <div className="p-5 md:p-8 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 xl:gap-8 items-start">
          <div className="lg:col-span-5 h-full flex items-center justify-between bg-gold-gradient rounded-2xl p-6 text-white">
            <div className="relative z-10">
              <p className="font-semibold text-white/90 mb-1 text-sm">Saldo Saya</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-white" />
                  <span className="text-4xl font-bold tracking-tight">0</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/shop")}
              className="bg-white text-gold-600 h-fit w-fit px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1"
            >
              <span>+</span> Dapatkan
            </button>
          </div>

          {/* Search & Tabs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 h-full">
            <div className="relative group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-gold-500 transition-colors" />
              <input
                type="text"
                placeholder="Cari Kandidat..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-gold-300 focus:ring-4 focus:ring-gold-50 transition-all shadow-sm"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("People Choice")}
                className={`px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all border cursor-pointer ${
                  activeTab === "People Choice"
                    ? "bg-gray-900 text-white border-gray-900 shadow-gray-200 scale-105"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                People Choice
              </button>
              <button
                onClick={() => setActiveTab("Video Choice")}
                className={`px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all border cursor-pointer ${
                  activeTab === "Video Choice"
                    ? "bg-gray-900 text-white border-gray-900 shadow-lg shadow-gray-200 scale-105"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                Video Choice
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => router.push(`/vote/${candidate.id}`)}
              className="relative aspect-3/4 rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Image
                src={candidate.image}
                alt={candidate.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg leading-tight mb-1">{candidate.name}</h3>
                <p className="text-xs text-gray-300 font-medium">{candidate.region}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
