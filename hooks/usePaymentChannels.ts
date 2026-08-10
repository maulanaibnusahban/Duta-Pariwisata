import { useState, useEffect } from "react";
import type { PaymentChannel } from "@/types/payment";
import { getPaymentChannels } from "@/lib/api/payment";
import { getErrorMessage } from "@/lib/utils/error";

export function usePaymentChannels() {
  const [data, setData] = useState<PaymentChannel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = async (getIgnore: () => boolean = () => false) => {
    try {
      setLoading(true);
      setError(null);
      const channels = await getPaymentChannels();
      if (getIgnore()) return;
      setData(channels);
    } catch (err: unknown) {
      if (getIgnore()) return;
      setError(getErrorMessage(err, "Gagal memuat metode pembayaran"));
    } finally {
      if (!getIgnore()) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let ignore = false;
    fetchChannels(() => ignore);
    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error, refetch: () => fetchChannels() };
}
