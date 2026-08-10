"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import CountdownTimer from "./CountdownTimer";

const RightSidebar = () => {
  const { data: candidates, loading, error } = useLeaderboard();

  return (
    <div className="hidden lg:flex flex-col gap-6 overflow-y-auto overflow-hidden pb-24 pt-4">
      {/* countown */}
      <CountdownTimer />
      {/* ── Kandidat ── */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-gray-800 font-bold text-base">Kandidat</h3>
          <Link href="/vote" className="text-gold-600 text-xs font-semibold hover:text-gold-500 transition-colors">
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-2">
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 animate-pulse border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-2.5 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              ))
          ) : error ? (
            <div className="p-3 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100">
              Gagal memuat kandidat.
            </div>
          ) : (
            candidates.slice(0, 5).map((candidate) => (
              <Link
                key={candidate.id}
                href={`/vote/${candidate.slug}`}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all group"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gold-400">
                  <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate leading-tight">{candidate.name}</p>
                  <p className="text-xs text-gray-500 truncate">{candidate.region}</p>
                </div>
                <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-lg shrink-0">Vote</span>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* ── Terakhir Dilihat ── */}
      {/* <LastViewed /> */}
    </div>
  );
};

export default RightSidebar;
