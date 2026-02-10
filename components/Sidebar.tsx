import React from "react";
import Image from "next/image";
import { Crown, House, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-1/3 bg-[#35322F] pt-12 text-white p-3 shadow-xl md:flex flex-col md:inset-auto md:h-screen md:sticky md:top-0 hidden z-10`}
    >
      <div className="flex items-center space-x-3 mb-10 md:mt-0 mt-16">
        <h1 className="text-xl font-bold tracking-wider ml-2">DUTA PARIWISATA</h1>
      </div>

      <nav className="space-y-2">
        <div className="flex items-center space-x-2 text-[#C69254] bg-white/10 px-3 py-2 rounded-lg cursor-pointer">
          <House />
          <span className="font-medium">Beranda</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg cursor-pointer transition-all">
          <Crown />
          <span className="font-medium">Vote</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg cursor-pointer transition-all">
          <ShoppingCart />
          <span className="font-medium">Shop</span>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-yellow-300 overflow-hidden relative">
            <Image src="/avatar.png" alt="User Avatar" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold">Pian</p>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
