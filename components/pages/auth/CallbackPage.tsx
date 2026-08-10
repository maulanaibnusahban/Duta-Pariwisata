"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CallbackPage() {
  const router = useRouter();
  const { loginWithGoogle, isAuthenticated } = useAuth();

  useEffect(() => {
    // Jika sudah login, langsung ke beranda
    if (isAuthenticated) {
      router.replace("/");
      return;
    }

    // Google menaruh id_token di URL fragment (hash) ketika menggunakan response_type=id_token
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // hilangkan karakter '#'
      const idToken = params.get("id_token");

      if (idToken) {
        loginWithGoogle(idToken)
          .then(() => {
            router.replace("/");
          })
          .catch((err) => {
            console.error("Login gagal:", err);
            router.replace("/auth/login?error=auth_failed");
          });
      } else {
        router.replace("/auth/login?error=no_token");
      }
    } else {
      // Tidak ada hash, kembali ke login
      router.replace("/auth/login");
    }
  }, [isAuthenticated, loginWithGoogle, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1a18]">
      <div className="flex flex-col items-center gap-4 text-white">
        <svg className="animate-spin w-8 h-8 text-gold-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="font-medium animate-pulse">Memproses autentikasi...</p>
      </div>
    </div>
  );
}
