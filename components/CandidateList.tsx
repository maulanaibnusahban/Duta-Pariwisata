import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Bunga Sanjaya",
    image: "/avatar.png",
  },
  {
    id: 2,
    name: "Sabrina Kartika",
    image: "/avatar.png",
  },
  {
    id: 3,
    name: "Jihan Nabila",
    image: "/avatar.png",
  },
  {
    id: 4,
    name: "Jihan Nabila",
    image: "/avatar.png",
  },
  {
    id: 5,
    name: "Jihan Nabila",
    image: "/avatar.png",
  },
  {
    id: 6,
    name: "Jihan Nabila",
    image: "/avatar.png",
  },
];

const CandidateList = () => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-semibold text-lg">Voting Saya</h3>
        <button className="text-[#C69254] text-sm font-medium cursor-pointer">Lihat Semua</button>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="relative shrink-0 w-40 h-48 rounded-xl overflow-hidden shadow-md cursor-pointer">
            <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3">
              <p className="text-white text-sm font-semibold relative z-10">{candidate.name}</p>
              <div className="absolute right-2 bottom-3 z-10 text-white">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
