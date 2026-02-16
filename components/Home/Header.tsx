import React from "react";
import { CrownIcon } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-5 md:py-0 lg:mb-8 relative z-10">
      <div>
        <h2 className="text-gray-500 text-sm lg:text-lg font-medium">Selamat Pagi,</h2>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Pian</h1>
      </div>
      <div className="py-2 px-5 rounded-md flex items-center justify-center gap-3  border-gold-200 border-[1.5px]">
        <CrownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gold-500" />
        <div className="flex flex-col items-start leading-none">
          <span className="font-bold text-lg lg:text-xl text-gold-gradient">1</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
