"use client";
import React, { useState, useEffect, useRef } from "react";
import { CrownIcon, Search, X, ChevronRight } from "lucide-react";
import { candidates } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { Crown, LogIn } from "lucide-react";
import { useUser } from "@/lib/useAuth";
import { loginWithGoogle } from "@/lib/auth";
const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUser();

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
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.region.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : candidates; // Show all candidates when no search query
  return (
    <>
      <div className="flex justify-between items-center md:py-0 pt-8 mb-6 lg:mb-4 relative z-10 gap-4">
        <div className="md:hidden flex gap-2 items-center">
          <CrownIcon className="hidden sm:block w-5 h-5 lg:w-6 lg:h-6 text-gold-500" />
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gold-gradient">
            Duta Pariwasata Indonesia
          </h1>
        </div>

        {/* Search Trigger Bar (Desktop) */}
        <div className="flex gap-4 md:w-full">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex  border border-gray-200 rounded-lg px-4 py-2.5 items-center gap-3 cursor-pointer hover:border-gold-300 hover:shadow-md hover:shadow-gold-50 transition-all group w-full"
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
            className="md:hidden p-2 rounded-full hover:bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors ml-auto"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
        {/* ── Profile card ── */}
        {user ? (
          <Link
            href="/profile"
            className="hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gold-200 hover:bg-gold-50/40 transition-all group w-sm"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-gold-200">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate leading-tight">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            <Crown className="w-4 h-4 text-gold-400 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        ) : (
          <button
            onClick={() => loginWithGoogle()}
            className="hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-dashed border-gray-200 hover:border-gold-300 hover:bg-gold-50/30 transition-all w-sm text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <LogIn className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-700 text-sm leading-tight">Masuk ke akun</p>
              <p className="text-xs text-gray-400">untuk vote & pantau kandidat</p>
            </div>
          </button>
        )}
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
              {searchQuery && filteredCandidates.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
                  <p className="font-semibold text-lg text-gray-900 mb-1">Kandidat tidak ditemukan</p>
                  <p className="text-sm text-gray-400">
                    Kami tidak dapat menemukan kandidat dengan nama &quot;{searchQuery}&quot;
                  </p>
                </div>
              )}

              {filteredCandidates.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 py-2">Kandidat</p>
                  {filteredCandidates.map((candidate) => (
                    <Link
                      href={`/vote/${candidate.id}`}
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
                    </Link>
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
