"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";
import { useTopupStatus } from "@/hooks/useTopupStatus";
import { formatIDR } from "@/components/top-up/helpers";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

interface TopupStatusModalProps {
  orderId: string;
  onClose: () => void;
}

export function TopupStatusModal({ orderId, onClose }: TopupStatusModalProps) {
  const router = useRouter();
  const { data, loading, error, isPolling } = useTopupStatus(orderId);
  const { refetchUser } = useAuth();

  useEffect(() => {
    if (data?.status === "paid") {
      refetchUser();
    }
  }, [data?.status, refetchUser]);

  // If we don't have data yet and it's loading, or if it's polling/pending,
  // we treat it as a 'pending' visual state.
  const isPendingState = loading || isPolling || data?.status === "pending";

  const handleBackToCheckout = () => {
    onClose();
    router.push("/top-up");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden p-6 relative">
        {error ? (
          <div className="flex flex-col items-center text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h2>
            <p className="text-sm text-gray-500 mb-6">{error}</p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        ) : isPendingState ? (
          <div className="flex flex-col items-center text-center">
            <Clock className="w-16 h-16 text-amber-500 mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Memproses Pembayaran</h2>
            <p className="text-sm text-gray-500 mb-6">Menunggu konfirmasi pembayaran Anda...</p>
            <button
              disabled
              className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-bold cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              Harap Tunggu
            </button>
          </div>
        ) : data?.status === "paid" ? (
          <div className="flex flex-col items-center text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pembayaran Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-6">Kuota vote Anda telah ditambahkan.</p>

            <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Kuota Didapat</span>
                <span className="font-semibold text-gray-900">{data.quantity} Vote</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Total</span>
                <span className="font-semibold text-gray-900">{formatIDR(data.total)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gold-gradient text-white font-bold hover:opacity-90 transition-opacity"
            >
              Tutup
            </button>
          </div>
        ) : data?.status === "expired" ? (
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pembayaran Kedaluwarsa</h2>
            <p className="text-sm text-gray-500 mb-6">Waktu pembayaran telah habis. Silakan buat pesanan baru.</p>
            <div className="w-full flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleBackToCheckout}
                className="flex-1 py-3 rounded-xl bg-gold-gradient text-white font-bold hover:opacity-90 transition-opacity"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : data?.status === "failed" ? (
          <div className="flex flex-col items-center text-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Pembayaran Gagal</h2>
            <p className="text-sm text-gray-500 mb-6">Transaksi tidak dapat diselesaikan. Silakan coba lagi.</p>
            <div className="w-full flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={handleBackToCheckout}
                className="flex-1 py-3 rounded-xl bg-gold-gradient text-white font-bold hover:opacity-90 transition-opacity"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
