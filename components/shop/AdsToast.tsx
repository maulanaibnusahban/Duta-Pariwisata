"use client";

import React, { useEffect, useState } from "react";
import { Crown } from "lucide-react";

interface Props {
  onDone: () => void;
}

export default function AdsToast({ onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2000);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-400 ease-out font-plus-jakarta px-5
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div className="flex items-center gap-3 bg-white border border-amber-200 rounded-lg px-5 py-3.5 min-w-max">
        <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center shrink-0">
          <Crown className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-400 leading-none mb-0.5">Hadiah Diterima</p>
          <p className="text-sm font-semibold text-gray-900">
            Selamat! Anda mendapatkan <span className="text-gold-gradient">1 point vote</span>
          </p>
        </div>
      </div>
    </div>
  );
}
