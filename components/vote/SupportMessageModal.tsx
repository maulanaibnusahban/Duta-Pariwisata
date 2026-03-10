"use client";

import React, { useState } from "react";
import { MessageCircle, UserX, Send, SkipForward } from "lucide-react";

interface Props {
  candidateName: string;
  voterName: string;
  voterAvatar: string;
  method: "ads" | "purchase";
  onSubmit: (message: string, isAnonymous: boolean) => void;
  onSkip: () => void;
}

export default function SupportMessageModal({
  candidateName,
  voterName,
  voterAvatar,
  method,
  onSubmit,
  onSkip,
}: Props) {
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    onSubmit(message.trim(), isAnonymous);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm font-plus-jakarta p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.22,1,0.36,1)_both]">
        {/* Header */}
        <div className="bg-linear-to-r from-gold-500 to-gold-400 px-6 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Kirim Pesan Dukungan</h2>
              <p className="text-white/80 text-sm">untuk {candidateName}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Sender preview */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
            {isAnonymous ? (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <UserX className="w-5 h-5 text-gray-400" />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={voterAvatar} alt={voterName} className="w-9 h-9 rounded-full object-cover shrink-0" />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-800">{isAnonymous ? "Anonim" : voterName}</p>
              <p className="text-xs text-gray-400">{method === "ads" ? "Vote via Iklan" : "Vote via Pembelian"}</p>
            </div>
          </div>

          {/* Message input */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Tulis semangat dukunganmu untuk ${candidateName}...`}
              maxLength={200}
              rows={3}
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl resize-none outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all placeholder:text-gray-400"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{message.length}/200</p>
          </div>

          {/* Anonymous toggle */}
          <button
            onClick={() => setIsAnonymous((v) => !v)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all ${
              isAnonymous ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserX className={`w-4 h-4 ${isAnonymous ? "text-gray-600" : "text-gray-400"}`} />
              <span className={`text-sm font-medium ${isAnonymous ? "text-gray-700" : "text-gray-500"}`}>
                Kirim sebagai Anonim
              </span>
            </div>
            <div
              className={`w-10 h-5.5 rounded-full transition-colors relative ${
                isAnonymous ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                  isAnonymous ? "left-5.5" : "left-0.5"
                }`}
              />
            </div>
          </button>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onSkip}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all"
            >
              <SkipForward className="w-4 h-4" />
              Lewati
            </button>
            <button
              onClick={handleSubmit}
              disabled={message.trim().length === 0}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gold-400 text-white text-sm font-bold hover:bg-gold-300 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-gold-400/30"
            >
              <Send className="w-4 h-4" />
              Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
