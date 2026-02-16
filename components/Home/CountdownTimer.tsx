import { Crown, CrownIcon } from "lucide-react";
import React from "react";

const CountdownTimer = () => {
  return (
    <div className="font-plus-jakarta relative z-10">
      <h3 className="text-sm text-gray-500 mb-3 font-semibold uppercase tracking-wider">Sisa Waktu Pemilihan</h3>
      <div className="flex w-full items-center gap-4 md:gap-6">
        <div className="hidden lg:block p-5 rounded-full bg-gold-100 border border-gold-200">
          <Crown className="text-gold-600 w-12 h-12" />
        </div>

        <div className="flex w-full items-center justify-between text-center gap-2">
          <div className="bg-white border border-gold-200 shadow-sm h-22 w-22 xl:h-24 xl:w-24 rounded-2xl flex flex-col items-center justify-center relative overlow-hidden">
            <div className="text-3xl font-extrabold text-gold-gradient">30</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">Hari</div>
          </div>
          <div className="text-2xl font-bold text-gold-300 pb-4 animate-pulse">:</div>

          <div className="bg-white border border-gold-200 shadow-sm h-22 w-22 xl:h-24 xl:w-24 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-3xl font-extrabold text-gold-gradient">12</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">Jam</div>
          </div>
          <div className="text-2xl font-bold text-gold-300 pb-4 animate-pulse">:</div>

          <div className="bg-white border border-gold-200 shadow-sm h-22 w-22 xl:h-24 xl:w-24 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-3xl font-extrabold text-gold-gradient">16</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">Menit</div>
          </div>
          <div className="text-2xl font-bold text-gold-300 pb-4 animate-pulse">:</div>

          <div className="bg-white border border-gold-200 shadow-sm h-22 w-22 xl:h-24 xl:w-24 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-3xl font-extrabold text-gold-gradient">1</div>
            <div className="text-xs text-gray-400 mt-1 font-medium">Detik</div>
          </div>
        </div>
      </div>
      <button className="w-full mt-6 bg-gold-gradient text-white rounded-md py-4 px-6 flex items-center justify-center space-x-2 mb-8 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden group">
        <CrownIcon className="w-6 h-6 text-white" />
        <span className="text-lg font-bold">Vote Sekarang</span>
      </button>
    </div>
  );
};

export default CountdownTimer;
