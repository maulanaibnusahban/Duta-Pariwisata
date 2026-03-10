"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Crown,
  FilmIcon,
  CheckCircle2,
  LogIn,
  Users,
  Share2,
  Link2,
  Heart,
  Play,
  MessageCircle,
  UserX,
  Film,
} from "lucide-react";
import { candidates, reelsData } from "@/lib/content";
import AdsModal from "@/components/shop/AdsModal";
import QrisPaymentModal from "@/components/vote/QrisPaymentModal";
import SupportMessageModal from "@/components/vote/SupportMessageModal";
import LoginButton from "@/components/Home/LoginButton";
import AlertModal from "@/components/ui/AlertModal";
import { addVoteRecord, addSupportMessage } from "@/lib/auth";
import { useUser, useVoteHistory, useSupportMessages } from "@/lib/useAuth";
import { useParams, useRouter } from "next/navigation";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} hari lalu`;
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

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
  const messages = useSupportMessages(candidate.id);

  const [showAds, setShowAds] = useState(false);
  const [showQris, setShowQris] = useState(false);
  const [voteAlert, setVoteAlert] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [pendingMethod, setPendingMethod] = useState<"ads" | "purchase" | null>(null);
  const router = useRouter();

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Dukung ${candidate.name} dari ${candidate.region} menjadi Duta Pariwisata Indonesia! 🌟`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: candidate.name, text, url });
      } catch {
        // user cancelled — no need to handle
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopyAlert(true);
    }
  };

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
    setPendingMethod("ads");
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
    setPendingMethod("purchase");
  };

  const handleMessageSubmit = (message: string, isAnonymous: boolean) => {
    if (message && user) {
      addSupportMessage({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        candidateId: candidate.id,
        voterName: user.name,
        voterAvatar: user.avatar,
        message,
        votedAt: new Date().toISOString(),
        method: pendingMethod!,
        isAnonymous,
      });
    }
    setPendingMethod(null);
    setVoteAlert(true);
  };

  const handleMessageSkip = () => {
    setPendingMethod(null);
    setVoteAlert(true);
  };

  const simulatedVotes = candidate.id * 347 + 1204;
  const otherCandidates = candidates.filter((c) => c.id !== candidate.id);

  return (
    <div className="w-full">
      {/* Back button */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className=" mx-auto px-5 sm:px-5 h-16 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Detail Kandidat</h1>
          </div>
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"
            aria-label="Bagikan kandidat"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>
      <div className="min-h-screen pb-24 font-plus-jakarta w-full max-w-7xl mx-auto">
        {/* Hero image */}
        <div className="relative mx-5 md:mx-8 mt-4 h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl">
          <Image src={candidate.image} alt={candidate.name} fill className="object-cover" priority />
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
        <div className="px-5 md:px-8 mt-6 ">
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
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg whitespace-nowrap">
                    Rp 1.000
                  </span>
                </div>
              </button>

              {/* <p className="text-xs text-gray-400 text-center pt-1">
                Setiap transaksi memberikan 1 vote seharga Rp 1.000
              </p> */}
            </div>
          )}
        </div>

        {/* ── Pesan Dukungan ────────────────────────────────── */}
        <div className="mt-6 px-5 md:px-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gold-500" />
              Pesan Dukungan
            </h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              {messages.length} pesan
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <MessageCircle className="w-9 h-9 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-medium text-gray-400">Belum ada pesan dukungan</p>
              <p className="text-xs text-gray-300 mt-1">Jadilah yang pertama memberikan semangat!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 20).map((msg) => (
                <div key={msg.id} className="flex gap-3 bg-white rounded-2xl border border-gray-100 shadow-xs p-4">
                  {/* Avatar */}
                  {msg.isAnonymous ? (
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <UserX className="w-4 h-4 text-gray-400" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={msg.voterAvatar}
                      alt={msg.voterName}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-gray-800 truncate">
                        {msg.isAnonymous ? "Anonim" : msg.voterName}
                      </p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
                          msg.method === "ads" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {msg.method === "ads" ? (
                          <>
                            <Film className="w-2.5 h-2.5" />
                            Iklan
                          </>
                        ) : (
                          <>
                            <Crown className="w-2.5 h-2.5" />
                            Beli
                          </>
                        )}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto shrink-0">{timeAgo(msg.votedAt)}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Video Dukungan ─────────────────────────────────── */}
        <div className="mt-6 px-5 md:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 text-lg">Video Dukungan</h2>
            <span className="text-xs text-gray-400">{reelsData.length} video</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-5 px-5 md:-mx-8 md:px-8 scrollbar-hide">
            {reelsData.map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
          </div>
        </div>

        {/* ── Kandidat Lainnya ───────────────────────────────── */}
        <div className="mt-6 px-5 md:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-900 text-lg">Kandidat Lainnya</h2>
            <Link href="/vote" className="text-gold-600 text-xs font-semibold hover:text-gold-500 transition-colors">
              Lihat Semua
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 -mx-5 px-5 md:-mx-8 md:px-8 scrollbar-hide">
            {otherCandidates.map((c) => {
              const votes = c.id * 347 + 1204;
              return (
                <Link key={c.id} href={`/vote/${c.id}`} className="shrink-0 w-36 group">
                  <div className="relative w-36 h-48 rounded-2xl overflow-hidden shadow-md mb-2 bg-gray-100">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-bold leading-tight truncate">{c.name}</p>
                      <p className="text-white/70 text-[10px] truncate">{c.region}</p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold bg-gold-gradient text-white px-2 py-0.5 rounded-full">
                        Vote
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="w-3 h-3" />
                    <span className="text-[11px] font-medium">{votes.toLocaleString("id-ID")}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Vote success alert */}
        {voteAlert && (
          <AlertModal
            icon={<CheckCircle2 className="w-7 h-7 text-white" />}
            iconBg="bg-green-500"
            title="Vote Berhasil! 🎉"
            description={
              <>
                Terima kasih sudah mendukung <span className="font-bold text-gray-800">{candidate.name}</span>.
                <br />
                Vote kamu sangat berarti!
              </>
            }
            okLabel="Lanjutkan"
            onOk={() => setVoteAlert(false)}
          />
        )}

        {/* Copy link alert */}
        {copyAlert && (
          <AlertModal
            icon={<Link2 className="w-7 h-7 text-white" />}
            iconBg="bg-blue-500"
            title="Link Disalin!"
            description="Link kandidat sudah tersalin. Bagikan ke teman-temanmu untuk dapat lebih banyak dukungan!"
            okLabel="OK"
            onOk={() => setCopyAlert(false)}
          />
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

        {/* Support message modal */}
        {pendingMethod && user && (
          <SupportMessageModal
            candidateName={candidate.name}
            voterName={user.name}
            voterAvatar={user.avatar}
            method={pendingMethod}
            onSubmit={handleMessageSubmit}
            onSkip={handleMessageSkip}
          />
        )}
      </div>
    </div>
  );
}

// ── Reel card ────────────────────────────────────────────────────────────────
type Reel = (typeof reelsData)[number];

function ReelCard({ reel }: { reel: Reel }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="shrink-0 w-64 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white">
      {/* Video area */}
      <div className="relative w-full aspect-video bg-black">
        {playing ? (
          <iframe
            width="100%"
            height="100%"
            src={`${reel.videoUrl}&autoplay=1`}
            title={reel.user.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 group cursor-pointer"
          >
            <Image src={reel.user.avatar} alt={reel.user.name} fill className="object-cover opacity-40" />
            <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-gray-100">
            <Image src={reel.user.avatar} alt={reel.user.name} fill className="object-cover" />
          </div>
          <p className="text-xs font-bold text-gray-800 truncate">{reel.user.name}</p>
          <span className="text-gray-400 text-[10px] ml-auto shrink-0">{reel.timestamp}</span>
        </div>
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{reel.caption.text}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-gold-500 font-semibold truncate">{reel.caption.hashtags}</span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 shrink-0">
            <Heart className="w-3 h-3" />
            {reel.likes}
          </span>
        </div>
      </div>
    </div>
  );
}
