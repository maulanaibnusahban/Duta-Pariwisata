"use client";

import React from "react";
import { Crown, ChevronRight, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { formatIDR } from "./helpers";
import { PaymentMethodType } from "@/lib/type";

/* ─────────────────────────────────────────────
   Shared type (exported so page.tsx can import it)
───────────────────────────────────────────── */

interface Props {
  quantity: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  selectedMethodDetail: PaymentMethodType | undefined;
  handlePay: () => void;
  isProcessing: boolean;
}

export default function OrderSummarySticky({
  quantity,
  subtotal,
  serviceFee,
  total,
  selectedMethodDetail,
  handlePay,
  isProcessing,
}: Props) {
  return (
    <div className="lg:col-span-2">
      <div className="lg:sticky lg:top-24 space-y-4">
        {/* ── Summary Card ── */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-base">Ringkasan Pembayaran</h2>
          </div>

          <div className="px-6 py-5 space-y-4">
            {/* Vote preview */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3.5">
              <div className="w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Anda mendapatkan</p>
                <p className="font-bold text-gray-900 text-lg leading-tight">
                  {quantity.toLocaleString("id-ID")} <span className="text-sm font-semibold text-gold-600">Kuota Vote</span>
                </p>
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Harga ({quantity.toLocaleString("id-ID")} × Rp 10.000)</span>
                <span className="font-semibold text-gray-900">{formatIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 flex items-center gap-1">
                  Biaya Layanan
                  <span className="text-xs text-gray-400">(0,7%)</span>
                </span>
                <span className="font-semibold text-gray-900">{formatIDR(serviceFee)}</span>
              </div>

              <div className="h-px bg-gray-100" />

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gold-gradient">{formatIDR(total)}</span>
              </div>
            </div>

            {/* Selected Payment */}
            {selectedMethodDetail && (
              <div className="bg-gold-50 border border-gold-100 rounded-xl px-4 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                  <selectedMethodDetail.icon className={selectedMethodDetail.className} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">Metode Terpilih</p>
                  <p className="font-semibold text-sm text-gray-900 truncate">{selectedMethodDetail.name}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full h-14 rounded-xl font-bold text-base text-white bg-gold-gradient hover:opacity-90 active:scale-[0.98] transition-all shadow-md shadow-amber-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Memproses…
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Bayar {formatIDR(total)}
                </>
              )}
            </button>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>Transaksi aman Powered by Midtrans</span>
            </div>
          </div>
        </section>

        {/* ── Notice ── */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3.5">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Kuota vote bersifat non-refundable. Pastikan jumlah dan metode pembayaran sudah benar sebelum melanjutkan.
          </p>
        </div>
      </div>
    </div>
  );
}
