"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/* ── Ikon ornamen batik SVG ── */
function BatchOrnament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" />
      <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.5" />
      <path d="M40 12 L44 24 L40 20 L36 24 Z" fill="currentColor" opacity="0.6" />
      <path d="M40 68 L44 56 L40 60 L36 56 Z" fill="currentColor" opacity="0.6" />
      <path d="M12 40 L24 44 L20 40 L24 36 Z" fill="currentColor" opacity="0.6" />
      <path d="M68 40 L56 44 L60 40 L56 36 Z" fill="currentColor" opacity="0.6" />
      <circle cx="40" cy="40" r="5" fill="currentColor" opacity="0.4" />
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, mounted, error } = useAuth();
  const [loading, setLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.replace("/");
    }
  }, [mounted, isAuthenticated, router]);

  const handleCustomLogin = () => {
    setLoading(true);
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + "/auth/callback";
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=id_token&scope=email%20profile%20openid&nonce=${nonce}&prompt=select_account`;

    window.location.href = url;
  };

  // Mencegah flash screen saat memeriksa state login
  if (!mounted || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1c1a18]">
        <div className="flex flex-col items-center gap-4 text-white">
          <svg className="animate-spin w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <p className="font-medium animate-pulse">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-plus-jakarta bg-[#1c1a18]">
      {/* ════════════════════════════════════
          PANEL KIRI — Hero Visual
      ════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
        {/* Background image */}
        <Image src="/login-bg.png" alt="Pesona Pariwisata Indonesia" fill className="object-cover" priority />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-[#1c1a18]/85 via-[#1c1a18]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#1c1a18]/70 via-transparent to-transparent" />

        {/* Ornamen dekoratif */}
        <BatchOrnament className="absolute top-8 left-8 w-16 h-16 text-gold-400/40" />
        <BatchOrnament className="absolute bottom-12 right-12 w-24 h-24 text-gold-300/25" />

        {/* Konten hero */}
        <div className="relative z-10 flex flex-col justify-end p-12 pb-16 max-w-xl">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300 text-xs font-semibold tracking-widest uppercase">
              Official Platform
            </span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
            Duta Pariwisata
            <span className="block text-gold-gradient">Indonesia</span>
          </h1>

          <p className="text-gray-300 text-base leading-relaxed max-w-sm">
            Platform resmi pemilihan Duta Pariwisata Indonesia. Dukung kandidat favoritmu dan saksikan perjalanan mereka
            menuju mahkota.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[
              { value: "150+", label: "Kandidat" },
              { value: "34", label: "Provinsi" },
              { value: "1 Jt+", label: "Pemilih" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          PANEL KANAN — Form Login
      ════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-10 relative">
        <div className="w-full lg:w-sm 2xl:w-full max-w-md space-y-8 relative z-10">
          {/* Mobile: Brand header */}
          <div className="lg:hidden text-center mb-2">
            <h1 className="text-2xl font-bold text-white">
              Duta Pariwisata <span className="text-gold-gradient">Indonesia</span>
            </h1>
          </div>

          {/* Card glass */}
          <div
            className="rounded-2xl p-8 sm:p-8 space-y-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 0 1px rgba(212,175,55,0.08), 0 24px 64px rgba(0,0,0,0.4)",
            }}
          >
            {/* Heading */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white">Selamat Datang</h2>
              <p className="text-gray-400 text-sm">Masuk untuk berpartisipasi dalam pemilihan</p>
            </div>

            {/* Area Pesan Error dari hook useAuth */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
            )}

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-500 text-xs">Masuk dengan</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Area Tombol Google */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleCustomLogin}
                disabled={loading}
                className="w-full h-12 relative flex items-center justify-center gap-3 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-50 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Lanjutkan dengan Google</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer link */}
          <p className="text-center text-gray-500 text-sm">
            Belum kenal platform ini?{" "}
            <Link
              href="/"
              className="text-gold-400 font-semibold hover:text-gold-300 hover:underline transition-colors"
            >
              Jelajahi dulu →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
