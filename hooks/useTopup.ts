import { useState } from "react";
import type { TopupRequest, TopupOrder } from "@/types/payment";
import { createTopup } from "@/lib/api/payment";
import { getErrorMessage } from "@/lib/utils/error";

export function useTopup() {
  const [data, setData] = useState<TopupOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitTopup = async (payload: TopupRequest): Promise<TopupOrder> => {
    try {
      setLoading(true);
      setError(null);
      const order = await createTopup(payload);
      setData(order);
      return order;
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, "Gagal membuat topup");
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submitTopup, data, loading, error };
}
