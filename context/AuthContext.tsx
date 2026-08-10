"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { AuthUser } from "@/types/auth";
import { loginWithGoogleApi, logoutFromServer, getMe } from "@/lib/api/auth";
import { getToken, setToken, removeToken } from "@/lib/auth/token";
import { getErrorMessage } from "@/lib/utils/error";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  mounted: boolean;
  loginWithGoogle: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const fetchCurrentUser = async () => {
    try {
      const me = await getMe();
      setUser(me);
      setError(null);
    } catch (err: unknown) {
      // token invalid/expired -> bersihkan token & anggap logout
      removeToken();
      setUser(null);
      setError(getErrorMessage(err, "Gagal memuat data user"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetchCurrentUser();
  }, []);

  const loginWithGoogle = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginWithGoogleApi({ id_token: idToken });
      
      const token = res.data?.token || res.token;
      if (token) {
        setToken(token);
        // setelah login, fetch ulang via /api/auth/me supaya dapat coin_balance
        // (response login tidak menyertakan coin_balance)
        await fetchCurrentUser();
      } else {
        throw new Error(res.message || "Login gagal. Format response tidak sesuai.");
      }
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Gagal login"));
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (getToken()) {
        await logoutFromServer();
      }
    } catch (err: unknown) {
      console.error("Gagal logout di server:", getErrorMessage(err, "Gagal logout"));
    } finally {
      removeToken();
      setUser(null);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    mounted,
    loginWithGoogle,
    logout,
    refetchUser: fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  }
  return ctx;
}
