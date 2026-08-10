import { useState, useCallback } from "react";
import axios from "axios";
import { getNextAd, completeAd } from "@/lib/api/ads";
import type { NextAd, CompleteAdRequest, CompleteAdResponse } from "@/types/ads";

export const useNextAd = () => {
  const [data, setData] = useState<NextAd | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNextAd = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ad = await getNextAd();
      setData(ad);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Gagal mengambil data iklan.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Terjadi kesalahan mohon coba beberapa saat lagi.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchNextAd };
};

export const useCompleteAd = () => {
  const [data, setData] = useState<CompleteAdResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitCompleteAd = useCallback(async (payload: CompleteAdRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await completeAd(payload);
      setData(result);
      return result;
    } catch (err: unknown) {
      let errorMessage = "Gagal menyelesaikan iklan.";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, submitCompleteAd };
};
