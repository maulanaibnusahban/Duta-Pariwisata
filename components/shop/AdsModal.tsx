"use client";

import React, { useEffect, useRef, useState } from "react";
import { Crown, X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function AdsModal({ onClose }: Props) {
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
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

          <div className="absolute top-3 right-3 z-20">
            {finished ? (
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-900 font-bold shadow-lg hover:bg-gray-100 active:scale-95 transition-all animate-fade-in cursor-pointer"
                aria-label="Tutup iklan"
              >
                <X className="w-5 h-5" />
              </button>
            ) : (
              <div className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-bold tabular-nums border border-white/10">
                {Math.max(0, Math.ceil(duration - currentTime))}s
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-xs">
              {finished ? (
                <span className="text-amber-400 font-bold">Iklan selesai! Klik × untuk klaim</span>
              ) : (
                <span>Selesaikan iklan untuk mendapatkan 1 koin vote</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
