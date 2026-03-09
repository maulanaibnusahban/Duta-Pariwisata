"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Crown, FilmIcon, CheckCircle2, LogIn, Users } from "lucide-react";
import { candidates } from "@/lib/content";
import AdsModal from "@/components/shop/AdsModal";
import QrisPaymentModal from "@/components/vote/QrisPaymentModal";
import LoginButton from "@/components/Home/LoginButton";
import { addVoteRecord } from "@/lib/auth";
import { useUser, useVoteHistory } from "@/lib/useAuth";
import { useParams, useRouter } from "next/navigation";

type Candidate = (typeof candidates)[number];

// Outer shell: reads params and guards. No hooks — safe early return.
export default function CandidateDetail() {
  const params = useParams();
  const candidateId = Number(params.id);
  const candidate = candidates.find((c) => c.id === candidateId);

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-plus-jakarta">
        Kandidat tidak ditemukan.
      </div>
    );
  }

  return <CandidateDetailContent candidate={candidate} />;
}

// Inner component: receives guaranteed non-null candidate. All hooks live here.
function CandidateDetailContent({ candidate }: { candidate: Candidate }) {
  const user = useUser();
  const voteHistory = useVoteHistory();
  const myVoteCount = voteHistory.filter((r) => r.candidateId === candidate.id).length;

  const [showAds, setShowAds] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [voteToast, setVoteToast] = useState(false);
  const router = useRouter();

  const handleAdsClose = () => {
    addVoteRecord({
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateRegion: candidate.region,
      candidateImage: candidate.image,
      votedAt: new Date().toISOString(),
      method: "ads",
    });
    setShowAds(false);
    setVoteToast(true);
    setTimeout(() => setVoteToast(false), 3000);
  };

  const handlePurchaseSuccess = () => {
    addVoteRecord({
      candidateId: candidate.id,
      candidateName: candidate.name,
      candidateRegion: candidate.region,
      candidateImage: candidate.image,
      votedAt: new Date().toISOString(),
      method: "purchase",
    });
    setShowQris(false);
    setVoteToast(true);
    setTimeout(() => setVoteToast(false), 3000);
  };

  const simulatedVotes = candidate.id * 347 + 1204;

  return (
    <div className="w-full">
      {/* Back button */}
     <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className=" mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Top Up Kuota Vote</h1>
          </div>
        </div>
      </header>
    <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
     

      {/* Hero image */}
      <div className="relative mx-5 md:mx-8 mt-4 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl">
        <Image
          src={candidate.image}
          alt={candidate.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        {/* My vote badge */}
        {myVoteCount > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {myVoteCount}× vote kamu
          </div>
        )}

        {/* Candidate info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h1 className="text-3xl font-bold text-white leading-tight">{candidate.name}</h1>
          <p className="text-white/80 text-sm font-medium mt-1">{candidate.region}</p>
          <div className="flex items-center gap-1.5 mt-2 text-white/70 text-xs font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>{simulatedVotes.toLocaleString("id-ID")} votes</span>
          </div>
        </div>
      </div>

      {/* Vote Section */}
      <div className="px-5 md:px-8 mt-6 max-w-2xl">
        {!user ? (
          /* Login required */
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1.5">Login untuk Vote</h3>
            <p className="text-gray-500 text-sm mb-5">Masuk terlebih dahulu untuk mendukung {candidate.name}.</p>
            <div className="flex justify-center">
              <LoginButton />
            </div>
          </div>
        ) : (
          /* Vote options */
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-gray-900 text-xl mb-1">Berikan Vote Kamu</h2>
              <p className="text-gray-500 text-sm">Pilih cara vote untuk mendukung {candidate.name}.</p>
            </div>

            {/* Vote with Ad */}
            <button
              onClick={() => setShowAds(true)}
              className="flex w-full bg-white rounded-2xl px-5 py-4 border shadow-xs hover:shadow-md transition-all group border-gray-200 justify-between items-center active:scale-[0.99] cursor-pointer"
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <FilmIcon className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-base font-bold text-gray-900">Vote dengan Iklan</span>
                </div>
                <p className="text-sm text-gray-500 pl-13">Tonton iklan pendek untuk mendapatkan 1 vote gratis</p>
              </div>
              <div className="shrink-0 ml-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">GRATIS</span>
              </div>
            </button>

            {/* Buy vote */}
            <button
              onClick={() => setShowQris(true)}
              className="flex w-full bg-white rounded-2xl px-5 py-4 border shadow-xs hover:shadow-md transition-all group border-gray-200 justify-between items-center active:scale-[0.99] cursor-pointer"
            >
              <div className="flex flex-col gap-1 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Crown className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-base font-bold text-gray-900">Beli Vote</span>
                </div>
                <p className="text-sm text-gray-500 pl-13">Bayar Rp 1.000 via QRIS untuk 1 vote</p>
              </div>
              <div className="shrink-0 ml-3">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg whitespace-nowrap">Rp 1.000</span>
              </div>
            </button>

            <p className="text-xs text-gray-400 text-center pt-1">
              Setiap transaksi memberikan 1 vote seharga Rp 1.000
            </p>
          </div>
        )}
      </div>

      {/* Vote success toast */}
      {voteToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 px-4 animate-fade-in">
          <div className="flex items-center gap-3 bg-white border border-green-200 rounded-xl px-5 py-3.5 shadow-lg min-w-max">
            <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-0.5">Vote Berhasil</p>
              <p className="text-sm font-semibold text-gray-900">
                Kamu mendukung <span className="text-green-600">{candidate.name}</span>!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ads modal */}
      {showAds && <AdsModal onClose={handleAdsClose} />}

      {/* QRIS modal */}
      {showQris && (
        <QrisPaymentModal
          candidateName={candidate.name}
          candidateRegion={candidate.region}
          onSuccess={handlePurchaseSuccess}
          onClose={() => setShowQris(false)}
        />
      )}
    </div>
    </div>

  );
}
