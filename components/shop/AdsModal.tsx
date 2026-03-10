"use client";

import React, { useEffect, useRef, useState } from "react";
import { Crown, X } from "lucide-react";
import { useMusic } from "@/lib/MusicContext";

interface Props {
  onClose: () => void;
}

export default function AdsModal({ onClose }: Props) {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying, pause, play } = useMusic();
  const wasPlayingRef = useRef(false);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleEnded = () => {
    setFinished(true);
    setProgress(100);
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    // Pause background music while ad plays
    wasPlayingRef.current = isPlaying;
    if (isPlaying) pause();
    return () => {
      document.body.classList.remove("overflow-hidden");
      // Resume music if it was playing before
      if (wasPlayingRef.current) play();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm font-plus-jakarta overflow-y-auto scrollbar-hide md:py-3">
      <div className="relative w-full h-full mx-auto flex flex-col min-h-96 my-auto">
        <div className="relative h-1.5 bg-white/20 w-full shrink-0">
          <div
            className="h-full bg-gold-gradient transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-black flex-1 w-full flex flex-col items-center justify-center relative ">
          <video
            ref={videoRef}
            src="/video/Iklan_layanan_masyarakat.mp4"
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-center"
          />

          {/* Top-right HUD: info chip + close button */}
          <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-2">
            {/* Info chip — slides in from right on mount, changes text when finished */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm
                transition-all duration-500 ease-out
                ${finished ? "translate-x-0 opacity-100" : "translate-x-0 opacity-100"}`}
              style={{
                animation: "slideInRight 0.45s cubic-bezier(0.22,1,0.36,1) both",
              }}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span
                key={String(finished)}
                className="text-xs font-semibold tabular-nums whitespace-nowrap"
                style={{ animation: "fadeSlideUp 0.3s ease-out both" }}
              >
                {finished ? (
                  <span className="text-amber-400">Iklan selesai! Klik × untuk klaim</span>
                ) : (
                  <span className="text-white/80">
                    {Math.max(0, Math.ceil(duration - currentTime))}s · Tonton iklan untuk 1 koin
                  </span>
                )}
              </span>
            </div>

            {/* Close button — only when finished */}
            {finished && (
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-900 font-bold shadow-lg hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                style={{ animation: "slideInRight 0.35s cubic-bezier(0.22,1,0.36,1) both" }}
                aria-label="Tutup iklan"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
