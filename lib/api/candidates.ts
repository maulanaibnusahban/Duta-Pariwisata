import api from "@/lib/config/api.config";
import type { Candidate, GetCandidatesParams } from "@/types/candidates";

/**
 * GET /api/candidates
 * Mengambil daftar kandidat dengan filter search & sort opsional.
 * Hanya menambahkan param ke URL jika value-nya ada (tidak mengirim key kosong).
 */
export const getCandidates = async (params?: GetCandidatesParams): Promise<Candidate[]> => {
  const queryParams: Record<string, string> = {};

  if (params?.search) queryParams.search = params.search;
  if (params?.sort) queryParams.sort = params.sort;

  const response = await api.get<Candidate[]>("/api/candidates", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });

  return response.data;
};

/**
 * GET /api/candidates/leaderboard
 * Mengambil daftar kandidat yang diurutkan berdasarkan vote count (peringkat).
 */
export const getLeaderboard = async (): Promise<Candidate[]> => {
  const response = await api.get<Candidate[]>("/api/candidates/leaderboard");
  return response.data;
};

/**
 * GET /api/candidates/{slug}
 * Mengambil detail satu kandidat berdasarkan slug-nya.
 *
 * @param slug - Slug kandidat (string)
 */
export const getCandidateBySlug = async (slug: string): Promise<Candidate> => {
  const response = await api.get<Candidate>(`/api/candidates/${slug}`);
  return response.data;
};
