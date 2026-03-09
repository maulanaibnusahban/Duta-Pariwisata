"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { candidates } from "@/lib/content";
import CountdownTimer from "./CountdownTimer";

const RightSidebar = () => {

  return (
    <div className="hidden lg:flex flex-col gap-6 overflow-y-auto overflow-hidden pb-24 pt-4">

     
{/* countown */}
<CountdownTimer/>
      {/* ── Kandidat ── */}
      <div>
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-gray-800 font-bold text-base">Kandidat</h3>
          <Link href="/vote" className="text-gold-600 text-xs font-semibold hover:text-gold-500 transition-colors">
            Lihat Semua
          </Link>
        </div>
        <div className="space-y-2">
          {candidates.slice(0, 5).map((candidate) => (
            <Link
              key={candidate.id}
              href={`/vote/${candidate.id}`}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all group"
            >
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate leading-tight">{candidate.name}</p>
                <p className="text-xs text-gray-500 truncate">{candidate.region}</p>
              </div>
              <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                Vote
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Terakhir Dilihat ── */}
      {/* <LastViewed /> */}
    </div>
  );
};

export default RightSidebar;

