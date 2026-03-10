"use client";

import React, { useState } from "react";
import { Crown, Search } from "lucide-react";
import Image from "next/image";
import { candidates } from "@/lib/content";
import { useRouter } from "next/navigation";

// Simulated votes — same formula as CandidateDetail
const candidatesWithVotes = candidates
  .map((c) => ({ ...c, votes: c.id * 347 + 1204 }))
  .sort((a, b) => b.votes - a.votes);

const totalVotes = candidatesWithVotes.reduce((s, c) => s + c.votes, 0);

function getPct(votes: number) {
  return ((votes / totalVotes) * 100).toFixed(1);
}

const MEDAL_COLOR = ["#9ca3af", "#d4af37", "#b45309"];
const PODIUM_HEIGHT = ["h-24", "h-32", "h-20"];

export default function Vote() {
  const [activeTab, setActiveTab] = useState("People Choice");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filtered = candidates.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase()),
  );

  // podium: 2nd | 1st | 3rd
  const podium = [candidatesWithVotes[1], candidatesWithVotes[0], candidatesWithVotes[2]];
  const podiumRanks = [2, 1, 3];

  return (
    <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="pt-6 px-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vote</h1>
        <p className="text-gray-500">Dukung kandidat favoritmu untuk menjadi juara.</p>
      </div>

      <div className="p-5 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Search & Tabs */}
        <div className="flex flex-col gap-4">
          <div className="relative group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-gold-500 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Kandidat..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-gold-300 focus:ring-4 focus:ring-gold-50 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            {["People Choice", "Leaderboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all border cursor-pointer ${
                  activeTab === tab
                    ? "bg-gray-900 text-white border-gray-900 scale-105"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Leaderboard Tab ── */}
        {activeTab === "Leaderboard" && (
          <div className="space-y-6">
            {/* Podium */}
            <div className="bg-linear-to-b from-[#35322F] to-[#2a2826] rounded-3xl px-4 pt-8 pb-0 overflow-hidden">
              <p className="text-center text-white/60 text-xs font-semibold tracking-widest uppercase mb-6">
                Top 3 Kandidat
              </p>

              {/* Candidate avatars above podium */}
              <div className="flex items-end justify-center gap-2 sm:gap-6">
                {podium.map((candidate, i) => {
                  const rank = podiumRanks[i];
                  const isFirst = rank === 1;
                  return (
                    <button
                      key={candidate.id}
                      onClick={() => router.push(`/vote/${candidate.id}`)}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      {/* Crown for 1st */}
                      {isFirst && <Crown className="w-6 h-6 text-gold-400 animate-bounce mb-1" />}
                      <div
                        className={`relative rounded-full overflow-hidden border-4 transition-transform group-hover:scale-105 ${
                          isFirst
                            ? "w-20 h-20 sm:w-24 sm:h-24 border-gold-400 shadow-[0_0_24px_rgba(212,175,55,0.5)]"
                            : "w-16 h-16 sm:w-20 sm:h-20 border-gray-500"
                        }`}
                      >
                        <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
                      </div>
                      <p
                        className={`font-bold text-center leading-tight max-w-20 sm:max-w-25 truncate ${
                          isFirst ? "text-white text-sm" : "text-gray-300 text-xs"
                        }`}
                      >
                        {candidate.name.split(" ")[0]}
                      </p>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isFirst ? "bg-gold-400/20 text-gold-400" : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {getPct(candidate.votes)}%
                      </span>

                      {/* Podium block */}
                      <div
                        className={`w-24 sm:w-32 ${PODIUM_HEIGHT[i]} rounded-t-xl flex items-start justify-center pt-2`}
                        style={{ backgroundColor: `${MEDAL_COLOR[i]}22`, border: `1px solid ${MEDAL_COLOR[i]}44` }}
                      >
                        <span className="font-black text-2xl sm:text-3xl" style={{ color: MEDAL_COLOR[i] }}>
                          {rank}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rank 4 to last */}
            <div className="space-y-2">
              {candidatesWithVotes.slice(3).map((candidate, i) => {
                const rank = i + 4;
                const pct = parseFloat(getPct(candidate.votes));
                return (
                  <button
                    key={candidate.id}
                    onClick={() => router.push(`/vote/${candidate.id}`)}
                    className="w-full flex items-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-xs px-4 py-3 hover:border-gold-200 hover:shadow-md transition-all group active:scale-[0.99] cursor-pointer"
                  >
                    {/* Rank */}
                    <span className="w-8 text-center font-black text-lg text-gray-300 shrink-0">{rank}</span>

                    {/* Avatar */}
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                      <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
                    </div>

                    {/* Info + bar */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-bold text-sm text-gray-800 truncate">{candidate.name}</p>
                        <span className="text-xs font-bold text-gray-500 shrink-0 ml-2">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-gray-400 to-gray-300 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{candidate.region}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── People Choice Tab ── */}
        {activeTab === "People Choice" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
            {filtered.map((candidate) => (
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
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg leading-tight mb-1">{candidate.name}</h3>
                  <p className="text-xs text-gray-300 font-medium">{candidate.region}</p>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Kandidat tidak ditemukan</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
