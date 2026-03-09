"use client";

import Link from "next/link";
import { CrownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

// ── Target date for the event ──────────────────────────────────────────────
const TARGET_DATE = new Date("2026-04-10T23:59:59+07:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ];

  return (
    <div className="font-plus-jakarta relative z-10">
      <h3 className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">Sisa Waktu Pemilihan</h3>
      <div className="flex w-full items-center gap-4 md:gap-6">
        <div className="flex w-full items-center justify-evenly text-center gap-2">
          {units.map((unit, i) => (
            <React.Fragment key={unit.label}>
              <div className="bg-white border border-gold-200 shadow-sm h-22 w-22 xl:h-24 xl:w-24 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="text-3xl font-extrabold text-gold-gradient tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">{unit.label}</div>
              </div>
              {i < units.length - 1 && <div className="text-2xl font-bold text-gold-300 pb-4 animate-pulse">:</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <Link
        href="/vote"
        className="w-full mt-6 bg-gold-gradient text-white rounded-md py-4 px-6 flex items-center justify-center space-x-2 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden group"
      >
        <CrownIcon className="w-6 h-6 text-white" />
        <span className="text-lg font-bold">Vote Sekarang</span>
      </Link>
    </div>
  );
};

export default CountdownTimer;
