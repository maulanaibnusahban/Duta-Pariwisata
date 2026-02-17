import React, { useState, useEffect, useRef } from "react";
import { CrownIcon, Search, X, ChevronRight } from "lucide-react";
import { candidates } from "@/lib/content";
import Image from "next/image";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Shortcut Listener (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      // slight delay to ensure render
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  const filteredCandidates = searchQuery
    ? candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.region.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <>
      <div className="flex justify-between items-center md:py-0 lg:mb-8 relative z-10 gap-4">
        <div>
          <h2 className="text-gray-500 text-sm lg:text-lg font-medium">Selamat Pagi,</h2>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Pian</h1>
        </div>

        {/* Search Trigger Bar (Desktop) */}
        <div className="flex gap-4 w-auto">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="hidden lg:flex w-[300px] border border-gray-200 rounded-lg px-4 py-2.5 items-center gap-3 cursor-pointer hover:border-gold-300 hover:shadow-md hover:shadow-gold-50 transition-all group"
          >
            <Search className="w-5 h-5 text-gray-400 group-hover:text-gold-500 transition-colors" />
            <span className="text-gray-400 text-sm flex-1 group-hover:text-gray-600">Cari kandidat...</span>
            <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium text-gray-500 border border-gray-200">
              <span className="text-xs">⌘</span>
              <span>K</span>
            </div>
          </div>

          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors ml-auto"
          >
            <Search className="w-6 h-6" />
          </button>

          <div className="py-2 px-5 rounded-md flex items-center justify-center gap-3 border-gold-200 border-[1.5px] shadow-sm">
            <CrownIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gold-500" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-bold text-lg lg:text-xl text-gold-gradient">1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-4 sm:pt-20 px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="flex items-center px-4 py-4 border-b border-gray-100 gap-3">
              <Search className="w-5 h-5 text-gold-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Cari nama kandidat atau daerah..."
                className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-50 rounded border border-gray-200">
                  ESC to close
                </span>
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="sm:hidden p-1 rounded-full hover:bg-gray-100">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto p-2 min-h-[300px]">
              {!searchQuery && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                  <Search className="w-12 h-12 text-gray-200 opacity-50" />
                  <p className="text-sm">Ketik untuk mencari kandidat...</p>
                </div>
              )}

              {searchQuery && filteredCandidates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
                  <p className="font-semibold text-lg text-gray-900 mb-1">Kandidat tidak ditemukan</p>
                  <p className="text-sm text-gray-400">
                    Kami tidak dapat menemukan kandidat dengan nama &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}

              {searchQuery && filteredCandidates.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">Kandidat</p>
                  {filteredCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center gap-4 p-3 hover:bg-gold-50 rounded-xl cursor-pointer group transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 group-hover:border-gold-300">
                        <Image src={candidate.image} alt={candidate.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 group-hover:text-gold-700">{candidate.name}</h4>
                        <p className="text-sm text-gray-500">{candidate.region}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gold-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
