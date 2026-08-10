import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCandidateBySlug } from "@/lib/api/candidates";
import type { Candidate } from "@/types/candidates";

interface UseCandidateDetailReturn {
  data: Candidate | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook untuk mengambil detail satu kandidat berdasarkan ID (number) atau Slug (string).
 *
 * @param slug - ID atau Slug kandidat (number | string)
 */
export const useCandidateDetail = (identifier: string): UseCandidateDetailReturn => {
  const [data, setData] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState<number>(0);

  const fetchData = useCallback(async () => {
    // Guard clause: jangan fetch jika identifier tidak valid
    if (!identifier) {
      setData(null);
      setLoading(false);
      return;
    }

    // Jika tipe number, tapi <= 0, anggap tidak valid (hanya berlaku jika number)
    if (typeof identifier === "number" && (isNaN(identifier) || identifier <= 0)) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await getCandidateBySlug(identifier);
      setData(result);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError(`Kandidat dengan identitas ${identifier} tidak ditemukan.`);
        } else {
          setError(err.response?.data?.message || err.message || "Gagal mengambil detail kandidat.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan.");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [identifier]);

  // Re-fetch setiap kali identifier atau fetchTrigger berubah
  useEffect(() => {
    fetchData();
  }, [identifier, fetchTrigger]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = useCallback(() => {
    setFetchTrigger((prev) => prev + 1);
  }, []);

  return { data, loading, error, refetch };
};
