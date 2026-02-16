import React from "react";
import Image from "next/image";

const viewedProfiles = ["/avatar.png", "/avatar.png", "/avatar.png", "/avatar.png", "/avatar.png", "/avatar.png"];

const LastViewed = () => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-gray-800 font-bold text-lg relative inline-block">Terakhir Dilihat</h3>
        <button className="text-gold-600 text-sm font-semibold hover:text-gold-500 transition-colors cursor-pointer">
          Lihat Semua
        </button>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4 scrollbar-hide">
        {viewedProfiles.map((src, index) => (
          <div
            key={index}
            className="shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100 relative cursor-pointer"
          >
            <Image src={src} alt={`Profile ${index}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastViewed;
