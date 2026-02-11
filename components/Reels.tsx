import React from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { reelsData } from "@/lib/content";

const Reels = () => {
  return (
    <div className="space-y-6 mb-20">
      {reelsData.map((reel) => (
        <div key={reel.id} className="bg-white overflow-hidden border-b border-gray-100 last:border-0 pb-4">
          {/* Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
                <Image src={reel.user.avatar} alt={reel.user.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <p className="font-bold text-sm text-gray-800">{reel.user.name}</p>
                  <span className="text-gray-400 text-xs">• {reel.timestamp}</span>
                </div>
                {reel.user.isSuggested && <p className="text-xs text-gray-500">Suggested for you</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-white bg-[#C69254] hover:opacity-90 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                Vote
              </button>
              <button className="text-gray-500 cursor-pointer">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Video Content */}
          <div className="w-full aspect-video bg-black relative">
            <iframe
              width="100%"
              height="100%"
              src={reel.videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-x-0 inset-y-0 w-full h-full"
            ></iframe>
          </div>

          {/* Actions & Footer */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-4">
                <button className="hover:text-gray-600 transition-colors cursor-pointer">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="hover:text-gray-600 transition-colors cursor-pointer">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="hover:text-gray-600 transition-colors cursor-pointer">
                  <Send className="w-6 h-6" />
                </button>
              </div>
              <button className="hover:text-gray-600 transition-colors cursor-pointer">
                <Bookmark className="w-6 h-6" />
              </button>
            </div>

            <p className="font-bold text-sm mb-1">{reel.likes} likes</p>

            <div className="text-sm text-gray-800">
              <span className="font-bold mr-2">{reel.user.name}</span>
              <span>{reel.caption.text}</span>
              <span className="text-[#C69254] block mt-1">{reel.caption.hashtags}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;
