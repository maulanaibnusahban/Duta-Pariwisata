"use client";

import React, { useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2, ChevronUp, ChevronDown, X } from "lucide-react";
import { useMusic } from "@/lib/MusicContext";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const {
    isPlaying,
    currentTrack,
    volume,
    progress,
    duration,
    isVisible,
    toggle,
    setVolume,
    seekTo,
    nextTrack,
    prevTrack,
    setVisible,
    tracks,
  } = useMusic();
  const [expanded, setExpanded] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  if (!isVisible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-18 right-4 z-50 md:bottom-6 bg-[#35322F] text-gold-400 p-3 rounded-full shadow-2xl border border-gold-400/30 hover:bg-[#45423F] transition-all active:scale-95"
        aria-label="Tampilkan pemutar musik"
      >
        <Music2 className="w-5 h-5" />
      </button>
    );
  }

  const currentTime = (progress / 100) * duration;

  const handleMuteToggle = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume || 0.6);
    }
  };

  return (
    <div
      className={`
        fixed z-50 left-0 right-0 md:left-auto md:right-4 md:w-80
        transition-all duration-300 ease-in-out
        ${expanded ? "bottom-16 md:bottom-6" : "bottom-16 md:bottom-6"}
      `}
    >
      {/* Expanded panel */}
      {expanded && (
        <div className="mx-3 md:mx-0 mb-1 rounded-2xl overflow-hidden shadow-2xl border border-gold-400/20 bg-[#35322F]">
          {/* Track art / header */}
          <div className="relative px-5 pt-5 pb-4 bg-linear-to-b from-[#2a2826] to-[#35322F]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0 shadow-lg">
                <Music2 className="w-7 h-7 text-[#2a2826]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-base leading-tight truncate">{currentTrack.title}</p>
                <p className="text-gray-400 text-sm truncate mt-0.5">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => seekTo(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-gold-400"
                style={{
                  background: `linear-gradient(to right, #d4af37 ${progress}%, #5a5550 ${progress}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4">
                <button onClick={handleMuteToggle} className="text-gray-400 hover:text-gold-400 transition-colors">
                  {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20 h-1 rounded-full appearance-none cursor-pointer accent-gold-400"
                  style={{
                    background: `linear-gradient(to right, #d4af37 ${volume * 100}%, #5a5550 ${volume * 100}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                {tracks.length > 1 && (
                  <button onClick={prevTrack} className="text-gray-400 hover:text-gold-400 transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={toggle}
                  className="w-11 h-11 rounded-full bg-gold-400 flex items-center justify-center hover:bg-gold-300 active:scale-95 transition-all shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-[#2a2826]" fill="currentColor" />
                  ) : (
                    <Play className="w-5 h-5 text-[#2a2826] ml-0.5" fill="currentColor" />
                  )}
                </button>
                {tracks.length > 1 && (
                  <button onClick={nextTrack} className="text-gray-400 hover:text-gold-400 transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mini bar */}
      <div className="mx-3 md:mx-0 rounded-2xl bg-[#35322F] border border-gold-400/20 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-2.5">
          {/* Animated icon */}
          <div className="relative shrink-0">
            <div
              className={`w-9 h-9 rounded-xl bg-linear-to-br from-gold-400 to-gold-600 flex items-center justify-center ${
                isPlaying ? "shadow-[0_0_12px_rgba(212,175,55,0.5)]" : ""
              }`}
            >
              <Music2 className="w-4 h-4 text-[#2a2826]" />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#35322F] animate-pulse" />
            )}
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate leading-tight">{currentTrack.title}</p>
            <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full bg-gold-400/20 hover:bg-gold-400/30 flex items-center justify-center transition-all active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gold-400" fill="currentColor" />
              ) : (
                <Play className="w-4 h-4 text-gold-400 ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all text-gray-400 hover:text-white"
              aria-label={expanded ? "Sembunyikan" : "Perluas"}
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setVisible(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all text-gray-400 hover:text-white"
              aria-label="Tutup pemutar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin progress line */}
        <div className="h-0.5 bg-white/10">
          <div
            className="h-full bg-linear-to-r from-gold-400 to-gold-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
