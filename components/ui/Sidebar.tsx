"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, X } from "lucide-react";
import { useState } from "react";
import { NavbarItem } from "@/lib/content";
import { useAuth } from "@/context/AuthContext";

/* ── Modal Konfirmasi Logout ── */
function LogoutModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal card */}
      <div
        className="relative z-10 w-full max-w-sm rounded-2xl p-6 shadow-2xl"
        style={{
          background: "#2a2724",
          border: "1px solid rgba(212,175,55,0.15)",
          boxShadow: "0 0 0 1px rgba(212,175,55,0.08), 0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 mb-4">
          <LogOut className="w-5 h-5 text-red-400" />
        </div>

        {/* Text */}
        <h3 className="text-white font-semibold text-lg mb-1">Keluar dari akun?</h3>
        <p className="text-gray-400 text-sm mb-6">
          Kamu akan keluar dari platform Duta Pariwisata Indonesia. Kamu bisa masuk kembali kapan saja.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 border border-red-500/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Keluar...
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                Keluar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar Utama ── */
const Sidebar = () => {
  const pathname = usePathname();
  // const router = useRouter();
  const { user, logout, loading, isAuthenticated, mounted } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    // router.push("/auth/login");
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-full max-w-1/3 lg:max-w-1/5 bg-[#35322F] pt-12 text-white p-3 shadow-xl md:flex flex-col md:inset-auto md:h-screen md:sticky md:top-0 hidden z-10`}
      >
        <div className="flex items-center space-x-3 mb-10 md:mt-0 mt-16">
          <h1 className="text-xl font-bold tracking-wider ml-2">DUTA PARIWISATA INDONESIA</h1>
        </div>

        <nav className="space-y-2 flex-1">
          {NavbarItem.filter((item) => item.name !== "Profile" || isAuthenticated).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-3 py-2 rounded-sm ${
                isActive(item.href) ? "bg-white/10 text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* ── Profile / Auth section ── */}
        <div className="mt-auto pt-3 border-t border-white/10 space-y-1">
          {/* Render skeleton saat belum mounted untuk menghindari hydration mismatch */}
          {!mounted ? (
            <div className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-gray-600 animate-pulse">
              <div className="w-5 h-5 rounded-full bg-white/5 shrink-0" />
              <div className="h-4 bg-white/5 rounded w-16" />
            </div>
          ) : isAuthenticated && user ? (
            <>
              {/* Info user */}
              <Link
                href="/profile"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all ${
                  isActive("/profile") ? "bg-white/10 text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-gold-400/50">
                  <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate leading-tight">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </Link>

              {/* Tombol Keluar */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all group"
              >
                <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400 transition-colors" />
                <span className="font-medium text-sm">Keluar</span>
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogIn className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">Masuk</span>
            </Link>
          )}
        </div>
      </div>

      {/* Modal logout */}
      {showLogoutModal && (
        <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} loading={loading} />
      )}
    </>
  );
};

export default Sidebar;
