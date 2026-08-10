"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTopupHistory } from "@/hooks/useTopupHistory";
import { formatIDR } from "@/components/top-up/helpers";
import { formatDate } from "@/lib/utils/date";
import { ChevronRight, ShoppingCart, X } from "lucide-react";

export function TopupHistoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Custom hook will fetch on mount, but we only strictly need it when opened.
  const { data, loading, error } = useTopupHistory();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 text-amber-700">Pending</span>
        );
      case "paid":
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-green-100 text-green-700">Berhasil</span>
        );
      case "expired":
      case "failed":
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-red-100 text-red-700">Gagal</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full bg-white rounded-2xl px-5 py-4 border shadow-xs hover:shadow-md transition-all group border-gray-200 justify-between items-center active:scale-[0.99]"
      >
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 md:w-7 md:h-7 text-gold-500" />
            <span className="text-base md:text-lg font-bold text-gray-900">Riwayat Transaksi</span>
          </div>
          <p className="text-sm hidden md:block text-gray-500">Lihat riwayat transaksi dan status pembayaran Anda</p>
        </div>
        <ChevronRight
          className={`w-5 h-5 md:w-6 md:h-6 text-gray-500 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="w-full bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col max-h-112.5">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-900 text-sm md:text-base">Riwayat Transaksi</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-2 md:p-3 space-y-1">
            {loading ? (
              <div className="p-6 text-center text-sm text-gray-500 animate-pulse">Memuat riwayat...</div>
            ) : error ? (
              <div className="p-6 text-center text-sm text-red-500">{error}</div>
            ) : data.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">Belum ada riwayat pembayaran</div>
            ) : (
              data.map((item) => (
                <button
                  key={item.order_id}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(`/shop/payment/${item.order_id}`);
                  }}
                  className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex flex-col gap-2 border border-transparent hover:border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900 text-sm md:text-base">{item.quantity} Kuota Vote</p>
                      <p className="text-xs md:text-sm text-gray-400 mt-1">{formatDate(item.created_at)}</p>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold text-gold-600">{formatIDR(item.total)}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
