"use client";

import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

export interface Track {
  title: string;
  artist: string;
  src: string;
}

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: Track;
  currentIndex: number;
  volume: number;
  progress: number; // 0–100
  duration: number; // seconds
  tracks: Track[];
  isVisible: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  seekTo: (pct: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVisible: (v: boolean) => void;
}

export const TRACKS: Track[] = [
  {
    title: "Pesona Indonesia",
    artist: "Duta Pariwisata",
    src: "/audio/track1.mp3",
  },
];

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolumeState] = useState(0.6);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setVisible] = useState(true);

  // Init audio once on client
  useEffect(() => {
    const audio = new Audio(TRACKS[0].src);
    audio.volume = 0.6;
    audio.loop = false;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoadedMeta = () => setDuration(audio.duration);
    const onEnded = () => {
      // auto next track
      setCurrentIndex((prev) => {
        const next = (prev + 1) % TRACKS.length;
        audio.src = TRACKS[next].src;
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
        return next;
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMeta);
    audio.addEventListener("ended", onEnded);

    // Autoplay only on the home page
    if (window.location.pathname === "/") {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback: play on first user interaction (home page only)
          const startOnInteraction = () => {
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          };
          document.addEventListener("click", startOnInteraction, { once: true });
          document.addEventListener("touchstart", startOnInteraction, { once: true });
          document.addEventListener("scroll", startOnInteraction, { once: true });
        });
    }

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMeta);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const play = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        ?.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying]);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
    setVolumeState(v);
  }, []);

  const seekTo = useCallback((pct: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (pct / 100) * audioRef.current.duration;
    }
  }, []);

  const changeTrack = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.pause();
      audio.src = TRACKS[index].src;
      setCurrentIndex(index);
      setProgress(0);
      if (isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    },
    [isPlaying],
  );

  const nextTrack = useCallback(() => {
    changeTrack((currentIndex + 1) % TRACKS.length);
  }, [currentIndex, changeTrack]);

  const prevTrack = useCallback(() => {
    changeTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);
  }, [currentIndex, changeTrack]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTrack: TRACKS[currentIndex],
        currentIndex,
        volume,
        progress,
        duration,
        tracks: TRACKS,
        isVisible,
        play,
        pause,
        toggle,
        setVolume,
        seekTo,
        nextTrack,
        prevTrack,
        setVisible,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
