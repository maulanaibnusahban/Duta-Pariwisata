import { Suspense } from "react";
import Shop from "@/components/pages/Shop";
import { TopupStatusGate } from "@/components/payment/TopupStatusGate";

export default function ShopPage() {
  return (
    <>
      <Shop />
      <Suspense fallback={null}>
        <TopupStatusGate />
      </Suspense>
    </>
  );
}
