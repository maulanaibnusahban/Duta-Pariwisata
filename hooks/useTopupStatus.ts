import { useState, useEffect, useRef } from "react";
import type { TopupOrder } from "@/types/payment";
import { getTopupStatus } from "@/lib/api/payment";
import { getErrorMessage } from "@/lib/utils/error";

const FINAL_STATUSES: TopupOrder["status"][] = ["paid", "failed", "expired"];

export function useTopupStatus(orderId: string | null) {
  const [data, setData] = useState<TopupOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(!!orderId);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!orderId) {
      // TIDAK ada setState di sini. loading sudah default false 
      // (dari useState(!!orderId)) saat orderId null.
      return;
    }

    let ignore = false;

    const fetchStatus = async () => {
      try {
        const order = await getTopupStatus(orderId);
        if (ignore) return;

        setData(order);
        setError(null);
        setLoading(false);

        if (FINAL_STATUSES.includes(order.status)) {
          setIsPolling(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
          setIsPolling(true);
        }
      } catch (err: unknown) {
        if (ignore) return;
        setError(getErrorMessage(err, "Gagal memuat status order"));
        setLoading(false);
        setIsPolling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 3000);

    return () => {
      ignore = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId]);

  return { data, loading, error, isPolling };
}
