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
    <div className="hidden lg:flex flex-col w-[40%] bg-white p-6 overflow-y-auto z-10">
      {/* Stories Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Stories</h3>
          <span className="text-gray-400 text-sm cursor-pointer">Watch All</span>
        </div>
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map((story) => (
            <div
              key={story.id}
              className="relative w-28 h-40 shrink-0 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <Image src="/avatar.png" alt="avatar" fill className="object-cover" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="w-6 h-6 rounded-full border-2 border-white overflow-hidden mb-1">
                  <Image src="/avatar.png" alt="avatar" width={24} height={24} />
                </div>
                <p className="text-white text-[10px] font-medium truncate">Maulana Ibnu</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Suggestions</h3>
          <span className="text-gray-400 text-sm cursor-pointer">See all</span>
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
              <button className="text-white bg-[#C69254] hover:opacity-90 cursor-pointer px-4 py-1.5 rounded-full text-xs font-medium transition-colors">
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
