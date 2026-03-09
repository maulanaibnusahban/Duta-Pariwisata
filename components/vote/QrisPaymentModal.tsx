"use client";

import React, { useEffect, useState } from "react";
import { X, Clock, CheckCircle2 } from "lucide-react";

interface Props {
  candidateName: string;
  candidateRegion: string;
  onSuccess: () => void;
  onClose: () => void;
}

const PAYMENT_DURATION = 300; // 5 minutes

export default function QrisPaymentModal({ candidateName, candidateRegion, onSuccess, onClose }: Props) {
  const [timeLeft, setTimeLeft] = useState(PAYMENT_DURATION);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (paid) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [paid, onClose]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleConfirm = () => {
    setPaid(true);
    setTimeout(() => {
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm font-plus-jakarta">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg leading-tight">Pembayaran QRIS</h2>
            <p className="text-xs text-gray-500 mt-0.5">Scan QR untuk membayar</p>
          </div>
          {!paid && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        <div className="px-5 py-4">
          {/* Candidate info */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-gray-500">Mendukung kandidat</p>
            <p className="font-bold text-gray-900 text-base mt-0.5">{candidateName}</p>
            <p className="text-xs text-gray-500">{candidateRegion}</p>
          </div>

          {/* QR Code placeholder */}
          <div className="flex justify-center mb-4">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-3 shadow-sm">
              {/* Dummy QR SVG */}
              <svg viewBox="0 0 200 200" className="w-44 h-44" xmlns="http://www.w3.org/2000/svg">
                {/* Top-left finder */}
                <rect x="10" y="10" width="60" height="60" rx="4" fill="#1a1a1a" />
                <rect x="20" y="20" width="40" height="40" rx="2" fill="white" />
                <rect x="28" y="28" width="24" height="24" rx="1" fill="#1a1a1a" />
                {/* Top-right finder */}
                <rect x="130" y="10" width="60" height="60" rx="4" fill="#1a1a1a" />
                <rect x="140" y="20" width="40" height="40" rx="2" fill="white" />
                <rect x="148" y="28" width="24" height="24" rx="1" fill="#1a1a1a" />
                {/* Bottom-left finder */}
                <rect x="10" y="130" width="60" height="60" rx="4" fill="#1a1a1a" />
                <rect x="20" y="140" width="40" height="40" rx="2" fill="white" />
                <rect x="28" y="148" width="24" height="24" rx="1" fill="#1a1a1a" />
                {/* Data dots (simplified) */}
                <rect x="85" y="10" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="10" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="10" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="25" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="25" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="40" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="40" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="10" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="25" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="40" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="55" y="100" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="10" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="40" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="130" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="145" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="160" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="175" y="85" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="100" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="100" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="145" y="100" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="175" y="100" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="130" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="160" y="115" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="130" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="130" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="145" y="130" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="175" y="130" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="145" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="145" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="130" y="145" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="115" y="160" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="145" y="160" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="175" y="160" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="85" y="175" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="100" y="175" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="130" y="175" width="8" height="8" rx="1" fill="#1a1a1a" />
                <rect x="160" y="175" width="8" height="8" rx="1" fill="#1a1a1a" />
              </svg>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-center">
            <p className="text-xs text-gray-500 mb-0.5">Total Pembayaran</p>
            <p className="text-2xl font-bold text-amber-700">Rp 1.000</p>
            <p className="text-xs text-gray-500 mt-0.5">1 vote untuk {candidateName}</p>
          </div>

          {/* Timer */}
          {!paid && (
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-4">
              <Clock className="w-4 h-4 text-red-400" />
              <span>
                Berlaku:{" "}
                <span className={`font-bold tabular-nums ${timeLeft < 60 ? "text-red-500" : "text-gray-700"}`}>
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </span>
            </div>
          )}

          {/* Action button */}
          {paid ? (
            <div className="flex items-center justify-center gap-2 text-green-600 font-bold py-3.5 bg-green-50 rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
              Pembayaran Dikonfirmasi
            </div>
          ) : (
            <button
              onClick={handleConfirm}
              className="w-full bg-gold-gradient text-white font-bold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
            >
              Saya Sudah Bayar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
