"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useTopupStatus } from "@/hooks/useTopupStatus";
import { formatIDR } from "@/components/top-up/helpers";
import { formatDate } from "@/lib/utils/date";
import { ArrowLeft, Clock, CheckCircle2, AlertTriangle, XCircle, CreditCard } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function PaymentDetail() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.order_id as string;

  const { data, loading, error, isPolling } = useTopupStatus(orderId);
  const { refetchUser } = useAuth();

  useEffect(() => {
    if (data?.status === "paid") {
      refetchUser();
    }
  }, [data?.status, refetchUser]);

  // Jika error atau tidak ada
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5 font-plus-jakarta">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Order tidak ditemukan</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">{error}</p>
        <button
          onClick={() => router.push("/shop")}
          className="px-6 py-3 rounded-xl bg-gold-gradient text-white font-bold hover:opacity-90 transition-opacity"
        >
          Kembali ke Shop
        </button>
      </div>
    );
  }

  // Jika masih loading pertama kali
  if (loading || (!data && isPolling)) {
    return (
      <div className="min-h-screen bg-gray-50 p-5 font-plus-jakarta max-w-2xl mx-auto w-full animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const renderStatus = () => {
    switch (data.status) {
      case "pending":
        return (
          <div className="flex flex-col items-center">
            <Clock className="w-12 h-12 text-amber-500 mb-3 animate-pulse" />
            <h2 className="text-xl font-bold text-gray-900">Menunggu Pembayaran</h2>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mt-2">Pending</span>
          </div>
        );
      case "paid":
        return (
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-3" />
            <h2 className="text-xl font-bold text-gray-900">Pembayaran Berhasil</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mt-2">Paid</span>
          </div>
        );
      case "expired":
        return (
          <div className="flex flex-col items-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
            <h2 className="text-xl font-bold text-gray-900">Waktu Habis</h2>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full mt-2">Expired</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex flex-col items-center">
            <XCircle className="w-12 h-12 text-gray-500 mb-3" />
            <h2 className="text-xl font-bold text-gray-900">Pembayaran Gagal</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full mt-2">Failed</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-plus-jakarta pb-10">
      <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-4">
        <button
          onClick={() => router.push("/shop")}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Detail Transaksi</h1>
      </header>

      <main className="max-w-2xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 text-center">{renderStatus()}</div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-semibold text-gray-900 text-sm">{data.order_id}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Kuota Vote</span>
              <span className="font-semibold text-gray-900 text-sm">{data.quantity} Vote</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Harga per Vote</span>
              <span className="font-semibold text-gray-900 text-sm">{formatIDR(data.coin_price)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-semibold text-gray-900 text-sm">{formatIDR(data.amount)}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Biaya Layanan</span>
              <span className="font-semibold text-gray-900 text-sm">{formatIDR(data.service_fee)}</span>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-gray-50">
              <span className="font-bold text-gray-900">Total Pembayaran</span>
              <span className="font-bold text-xl text-gold-gradient">{formatIDR(data.total)}</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Metode Pembayaran</p>
                  <p className="text-sm font-semibold text-gray-900 uppercase">{data.payment_method}</p>
                </div>
              </div>
            </div>

            {data.paid_at && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 text-sm">Waktu Bayar</span>
                <span className="font-medium text-gray-700 text-sm">{formatDate(data.paid_at)}</span>
              </div>
            )}

            {data.created_at && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 text-sm">Waktu Dibuat</span>
                <span className="font-medium text-gray-700 text-sm">{formatDate(data.created_at)}</span>
              </div>
            )}

            {/* <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 text-sm">Kedaluwarsa</span>
              <span className="font-medium text-gray-700 text-sm">{formatDate(data.expired_at)}</span>
            </div> */}
          </div>
        </div>

        {data.status === "pending" && data.payment_url && (
          <div className="mt-6">
            <button
              onClick={() => {
                window.location.href = data.payment_url;
              }}
              className="w-full h-14 rounded-xl bg-gold-gradient text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              Lanjutkan Pembayaran
            </button>
            <p className="text-center text-xs text-gray-500 mt-3">
              Silakan selesaikan pembayaran sebelum batas waktu habis.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
