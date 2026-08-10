"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { TopupStatusModal } from "./TopupStatusModal";

export function TopupStatusGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  if (!orderId) return null;

  const handleClose = () => {
    router.replace("/shop");
  };

  return <TopupStatusModal orderId={orderId} onClose={handleClose} />;
}
