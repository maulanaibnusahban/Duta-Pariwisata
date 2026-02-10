import React from "react";

const CountdownTimer = () => {
  return (
    <div className="bg-[#2D2A26] rounded-xl p-6 mb-6 text-white shadow-lg relative overflow-hidden">
      <h3 className="text-sm text-gray-300 mb-2 font-medium">Sisa Waktu Pemilihan</h3>

      <div className="flex items-center justify-between text-center">
        <div>
          <div className="text-3xl font-bold text-[#EAB37E]">30</div>
          <div className="text-xs text-gray-400 mt-1">Hari</div>
        </div>
        <div className="text-2xl font-bold text-[#EAB37E] pb-4">:</div>
        <div>
          <div className="text-3xl font-bold text-[#EAB37E]">12</div>
          <div className="text-xs text-gray-400 mt-1">Jam</div>
        </div>
        <div className="text-2xl font-bold text-[#EAB37E] pb-4">:</div>
        <div>
          <div className="text-3xl font-bold text-[#EAB37E]">16</div>
          <div className="text-xs text-gray-400 mt-1">Menit</div>
        </div>
        <div className="text-2xl font-bold text-[#EAB37E] pb-4">:</div>
        <div>
          <div className="text-3xl font-bold text-[#EAB37E]">30</div>
          <div className="text-xs text-gray-400 mt-1">Detik</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
