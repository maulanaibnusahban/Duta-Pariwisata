import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getLeaderboard } from "@/lib/api/candidates";
import type { Candidate } from "@/types/candidates";

interface UseLeaderboardReturn {
  data: Candidate[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook untuk mengambil data leaderboard kandidat.
 * Fetch otomatis saat mount, sediakan fungsi refetch() untuk trigger ulang manual.
 */
export const useLeaderboard = (): UseLeaderboardReturn => {
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLeaderboard();
      setData(result);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Gagal mengambil data leaderboard."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui.");
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
};
