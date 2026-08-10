import api from "@/lib/config/api.config";
import type { AuthUser, GoogleLoginRequest, GoogleLoginResponse, LogoutResponse } from "@/types/auth";

/**
 * POST /api/auth/google
 * Melakukan login dengan menukarkan Google ID Token ke backend
 * @param payload - Berisi id_token dari Google Identity
 */
export const loginWithGoogleApi = async (
  payload: GoogleLoginRequest
): Promise<GoogleLoginResponse> => {
  const response = await api.post<GoogleLoginResponse>("/api/auth/google", payload);
  return response.data;
};

/**
 * POST /api/auth/logout
 * Menghapus token (revoke) dari backend
 */
export const logoutFromServer = async (): Promise<LogoutResponse> => {
  // api.config.ts sudah menangani injeksi header Authorization secara otomatis
  const response = await api.post<LogoutResponse>("/api/auth/logout");
  return response.data;
};

/**
 * GET /api/auth/me
 * Mendapatkan data user saat ini beserta coin_balance
 */
export const getMe = async (): Promise<AuthUser> => {
  const response = await api.get<AuthUser>("/api/auth/me");
  return response.data;
};
