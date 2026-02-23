import { Crown, Minus, Plus } from "lucide-react";
import React from "react";

function QuotaSelector({
  handleDecrement,
  handleIncrement,
  handleInputChange,
  handleInputBlur,
  quantity,
  inputValue,
  QUICK_PACKAGES,
  handleQuickPick,
}: {
  handleDecrement: () => void;
  handleIncrement: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  quantity: number;
  inputValue: string;
  QUICK_PACKAGES: number[];
  handleQuickPick: (pkg: number) => void;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="bg-gold-gradient px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-xs font-medium">Pilih Kuota</p>
            <h2 className="text-white font-bold text-base leading-tight">Jumlah Vote</h2>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-5">
        {/* Quantity Stepper */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">Masukkan Jumlah Kuota Vote</label>
          <div className="flex items-stretch h-14 rounded-xl overflow-hidden border border-gray-200 focus-within:border-gold-400 focus-within:ring-4 focus-within:ring-gold-50 transition-all">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-14 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-r border-gray-200 text-gray-500 hover:text-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="flex-1 text-center font-bold text-xl text-gray-900 bg-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={handleIncrement}
              disabled={quantity >= 9999}
              className="w-14 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border-l border-gray-200 text-gray-500 hover:text-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Min 1 · Maks 9.999 kuota per transaksi</p>
        </div>

        {/* Quick Pick */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2.5">Pilih Cepat</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_PACKAGES.map((pkg: number) => (
              <button
                key={pkg}
                onClick={() => handleQuickPick(pkg)}
                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                  quantity === pkg
                    ? "bg-gold-gradient text-white border-transparent shadow-md"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gold-300 hover:bg-gold-50"
                }`}
              >
                {pkg}× Vote
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuotaSelector;
