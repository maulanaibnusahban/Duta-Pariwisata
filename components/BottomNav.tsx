import React from "react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#35322F] text-gray-400 py-3 px-8 flex justify-between items-center rounded-t-2xl shadow-2xl z-50 md:hidden">
      <div className="flex flex-col items-center space-y-1 text-[#C69254]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span className="text-[10px]">Beranda</span>
      </div>

      <div className="flex flex-col items-center space-y-1 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
        </svg>
        <span className="text-[10px]">Vote</span>
      </div>

      <div className="flex flex-col items-center space-y-1 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span className="text-[10px]">Shop</span>
      </div>
    </div>
  );
};

export default BottomNav;
