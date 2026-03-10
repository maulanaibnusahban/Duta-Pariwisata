"use client";

import React from "react";
import Image from "next/image";
import {
  LogOut,
  Crown,
  CheckCircle,
  Film,
  User2,
  Music2,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react";
import LoginButton from "../Home/LoginButton";
import { logout } from "@/lib/auth";
import { useUser, useVoteHistory } from "@/lib/useAuth";
import { useMusic } from "@/lib/MusicContext";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Profile() {
  const user = useUser();
  const voteHistory = useVoteHistory();
  const {
    isPlaying,
    currentTrack,
    currentIndex,
    volume,
    progress,
    duration,
    tracks,
    toggle,
    setVolume,
    seekTo,
    nextTrack,
    prevTrack,
    isVisible,
    setVisible,
  } = useMusic();

  if (!user) {
    return (
      <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
        <div className="pt-6 px-5 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Saya</h1>
          <p className="text-gray-500">Kelola akun dan lihat riwayat votingmu.</p>
        </div>
        <div className="flex flex-col items-center justify-center pt-20 gap-5 px-5">
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
      <div className="pt-6 px-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Saya</h1>
        <p className="text-gray-500">Kelola akun dan lihat riwayat votingmu.</p>
      </div>

      {/* Profile card */}
      <div className="px-5 pt-6 max-w-7xl mx-auto">
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
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Vote history */}
      <div className="px-5 pt-6 max-w-7xl mx-auto">
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
                  <Image src={record.candidateImage} alt={record.candidateName} fill className="object-cover" />
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

      {/* ── Music Player Section ── */}
      <div className="px-5 pt-6 pb-2 max-w-7xl mx-auto">
        <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
          <Music2 className="w-5 h-5 text-gold-500" />
          Musik Latar
        </h3>
        <div className="bg-[#35322F] rounded-2xl shadow-lg overflow-hidden border border-gold-400/20">
          {/* Header gradient */}
          <div className="bg-linear-to-r from-[#2a2826] to-[#35322F] px-5 pt-5 pb-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0 shadow-xl ${isPlaying ? "animate-[pulse_3s_ease-in-out_infinite]" : ""}`}
              >
                <Music2 className="w-8 h-8 text-[#2a2826]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-lg leading-tight truncate">{currentTrack.title}</p>
                <p className="text-gray-400 text-sm truncate mt-0.5">{currentTrack.artist}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                  />
                  <span className="text-xs text-gray-400">{isPlaying ? "Sedang Diputar" : "Dijeda"}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #d4af37 ${progress}%, #5a5550 ${progress}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                <span>{formatTime((progress / 100) * duration)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.6)}
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                  aria-label="Toggle mute"
                >
                  {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #d4af37 ${volume * 100}%, #5a5550 ${volume * 100}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                {tracks.length > 1 && (
                  <button
                    onClick={prevTrack}
                    className="text-gray-400 hover:text-gold-400 transition-colors active:scale-95"
                    aria-label="Track sebelumnya"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={toggle}
                  className="w-14 h-14 rounded-full bg-gold-400 hover:bg-gold-300 active:scale-95 flex items-center justify-center transition-all shadow-lg shadow-gold-400/30"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-[#2a2826]" fill="currentColor" />
                  ) : (
                    <Play className="w-6 h-6 text-[#2a2826] ml-0.5" fill="currentColor" />
                  )}
                </button>
                {tracks.length > 1 && (
                  <button
                    onClick={nextTrack}
                    className="text-gray-400 hover:text-gold-400 transition-colors active:scale-95"
                    aria-label="Track berikutnya"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Track list */}
          {tracks.length > 1 && (
            <div className="px-4 py-3 space-y-1">
              {tracks.map((track, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i !== currentIndex) {
                      if (i > currentIndex) nextTrack();
                      else prevTrack();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                    i === currentIndex
                      ? "bg-gold-400/15 border border-gold-400/30"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${i === currentIndex ? "bg-gold-400/20" : "bg-white/5"}`}
                  >
                    {i === currentIndex && isPlaying ? (
                      <span className="flex gap-0.5 items-end h-4">
                        <span
                          className="w-0.5 bg-gold-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite]"
                          style={{ height: "60%" }}
                        />
                        <span
                          className="w-0.5 bg-gold-400 rounded-full animate-[bounce_0.8s_ease-in-out_0.2s_infinite]"
                          style={{ height: "100%" }}
                        />
                        <span
                          className="w-0.5 bg-gold-400 rounded-full animate-[bounce_0.8s_ease-in-out_0.4s_infinite]"
                          style={{ height: "40%" }}
                        />
                      </span>
                    ) : (
                      <Music2 className={`w-4 h-4 ${i === currentIndex ? "text-gold-400" : "text-gray-500"}`} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold truncate ${i === currentIndex ? "text-gold-400" : "text-gray-300"}`}
                    >
                      {track.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Show/hide floating player toggle */}
          <div className="px-4 pb-4 pt-1 border-t border-white/5">
            <button
              onClick={() => setVisible(!isVisible)}
              className="w-full text-center text-xs text-gray-400 hover:text-gold-400 transition-colors py-2 rounded-xl hover:bg-white/5"
            >
              {isVisible ? "Sembunyikan pemutar mini" : "Tampilkan pemutar mini"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
