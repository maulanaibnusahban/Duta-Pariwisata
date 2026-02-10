import React from "react";

const VoteButton = () => {
  return (
    <button className="w-full bg-linear-to-r from-[#C69254] to-[#B07B42] text-white rounded-xl py-4 px-6 flex items-center justify-center space-x-2 shadow-lg mb-8 hover:opacity-90 transition-opacity cursor-pointer">
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
        className="w-6 h-6"
      >
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
      </svg>
      <span className="text-lg font-bold">Vote Sekarang</span>
    </button>
  );
};

export default VoteButton;
