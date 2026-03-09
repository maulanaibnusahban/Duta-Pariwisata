"use client";

import React from "react";
import Image from "next/image";
import { LogOut, Crown, CheckCircle, Film, User2 } from "lucide-react";
import LoginButton from "../Home/LoginButton";
import { logout } from "@/lib/auth";
import { useUser, useVoteHistory } from "@/lib/useAuth";

export default function Profile() {
  const user = useUser();
  const voteHistory = useVoteHistory();

  if (!user) {
    return (
      <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
        <div className="pt-8 px-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Saya</h1>
          <p className="text-gray-500">Kelola akun dan lihat riwayat votingmu.</p>
        </div>
        <div className="flex flex-col items-center justify-center pt-20 gap-5 px-8">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
            <User2 className="w-12 h-12 text-gray-300" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Belum Login</h2>
            <p className="text-gray-500 text-sm mb-6">Masuk untuk melihat profil dan riwayat votingmu.</p>
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
      <div className="pt-8 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Saya</h1>
        <p className="text-gray-500">Kelola akun dan lihat riwayat votingmu.</p>
      </div>

      {/* Profile card */}
      <div className="px-8 pt-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100">
            <Image src={user.avatar} alt={user.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-gray-900 text-xl leading-tight">{user.name}</h2>
            <p className="text-gray-500 text-sm truncate">{user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">{voteHistory.length} vote diberikan</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Vote history */}
      <div className="px-8 pt-8 max-w-7xl mx-auto">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Riwayat Vote</h3>
        {voteHistory.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <Crown className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Belum ada riwayat vote</p>
            <p className="text-sm mt-1">Vote kandidat favoritmu sekarang!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voteHistory.map((record, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex items-center gap-4"
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={record.candidateImage}
                    alt={record.candidateName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-tight">{record.candidateName}</p>
                  <p className="text-xs text-gray-500">{record.candidateRegion}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(record.votedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {record.method === "ads" ? (
                    <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Film className="w-3 h-3" />
                      Iklan
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Beli
                    </span>
                  )}
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

