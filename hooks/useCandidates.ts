import { useState, useEffect, useCallback, useRef } from "react";
import { getCandidates } from "@/lib/api/candidates";
import type { Candidate, GetCandidatesParams } from "@/types/candidates";

interface UseCandidatesReturn {
  data: Candidate[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook untuk mengambil daftar kandidat dari API.
 * Re-fetch otomatis setiap kali params (search/sort) berubah.
 *
 * @param params - Filter opsional: search (string) dan sort (CandidateSort)
 */
export const useCandidates = (
  params?: GetCandidatesParams
): UseCandidatesReturn => {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gunakan counter sebagai trigger manual refetch
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  // Simpan params sebagai ref untuk dibandingkan — hindari re-render tak perlu
  const paramsRef = useRef<GetCandidatesParams | undefined>(params);
  paramsRef.current = params;

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getCandidates(paramsRef.current);
      setData(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan saat mengambil data kandidat.");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Re-fetch setiap params (search/sort) atau trigger refetch berubah
  useEffect(() => {
    fetch();
  }, [params?.search, params?.sort, fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
};
