import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-gray-500 text-lg">Selamat Pagi,</h2>
        <h1 className="text-3xl font-bold text-gray-800">Pian!</h1>
      </div>
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xs bg-yellow-300">
        <div className="w-full h-full flex items-center justify-center bg-[#FDF04F]">
          <Image src="/avatar.png" alt="User Avatar" width={64} height={64} className="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
