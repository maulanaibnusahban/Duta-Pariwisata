import React from "react";
import Image from "next/image";

const suggestions = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

const stories = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const RightSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col border-gray-100 overflow-hidden">
      {/* Stories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-gray-800 font-bold text-lg relative inline-block">
            Stories
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[--color-gold-400] rounded-full"></span>
          </h3>
          <span className="text-[--color-gold-600] text-sm font-semibold hover:text-[--color-gold-500] cursor-pointer transition-colors">
            Watch All
          </span>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative w-24 h-36 shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <Image
                src="/avatar.png"
                alt="avatar"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/60"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="w-8 h-8 rounded-full border-2 border-gold-400 overflow-hidden mb-1 p-0.5 ">
                  <Image src="/avatar.png" alt="avatar" width={24} height={24} className="rounded-full" />
                </div>
                <p className="text-white text-[10px] font-bold truncate">Maulana Ibnu</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-gray-800 font-bold text-lg relative inline-block">
            Suggestions
            <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-[--color-gold-400] rounded-full"></span>
          </h3>
          <span className="text-[--color-gold-600] text-sm font-semibold hover:text-[--color-gold-500] cursor-pointer transition-colors">
            See all
          </span>
        </div>
        <div className="space-y-4">
          {suggestions.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100">
                  <Image src="/avatar.png" alt="avatar" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Maulana Ibnu</p>
                  <p className="text-xs text-gray-500">Popular</p>
                </div>
              </div>
              <button className="text-white bg-gold-gradient hover:opacity-90 cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-colors">
                Vote
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
