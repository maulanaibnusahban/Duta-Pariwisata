import { useState, useEffect } from "react";
import type { TopupHistoryItem } from "@/types/payment";
import { getTopupHistory } from "@/lib/api/payment";
import { getErrorMessage } from "@/lib/utils/error";

export function useTopupHistory() {
  const [data, setData] = useState<TopupHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async (getIgnore: () => boolean = () => false) => {
    try {
      setLoading(true);
      setError(null);
      const history = await getTopupHistory();
      if (getIgnore()) return;
      setData(history);
    } catch (err: unknown) {
      if (getIgnore()) return;
      setError(getErrorMessage(err, "Gagal memuat riwayat transaksi"));
    } finally {
      if (!getIgnore()) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let ignore = false;
    fetchHistory(() => ignore);
    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading, error, refetch: () => fetchHistory() };
}
