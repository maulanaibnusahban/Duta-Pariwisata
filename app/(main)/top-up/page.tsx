"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import QuotaSelector from "@/components/top-up/QuotaSelector";
import PaymentMethod from "@/components/top-up/PaymentMethod";
import OrderSummarySticky from "@/components/top-up/OrderSummarySticky";
import { handleDecrement, handleIncrement } from "@/components/top-up/helpers";
import { usePaymentChannels } from "@/hooks/usePaymentChannels";
import { useTopup } from "@/hooks/useTopup";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const PRICE_PER_VOTE = 1000; // IDR

/* ─────────────────────────────────────────────
   Quick Select Packages
───────────────────────────────────────────── */
const QUICK_PACKAGES = [5, 10, 25, 50, 100];

export default function TopupPage() {
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(5);
  const [inputValue, setInputValue] = useState<string>("5");
  const [selectedMethod, setSelectedMethod] = useState<string>("qris");

  const { data: channels, loading: channelsLoading, error: channelsError } = usePaymentChannels();
  const { submitTopup, loading: isProcessing } = useTopup();

  // Set default selected method when channels load
  useEffect(() => {
    if (channels.length > 0 && !channels.some((c) => c.code === selectedMethod)) {
      setSelectedMethod(channels[0].code);
    }
  }, [channels, selectedMethod]);

  /* ── computed values ── */
  const subtotal = quantity * PRICE_PER_VOTE;

  const selectedMethodDetail = channels.find((m) => m.code === selectedMethod);
  let serviceFee = 0;
  if (selectedMethodDetail) {
    if (selectedMethodDetail.fee_type === "percent") {
      serviceFee = Math.round(subtotal * (parseFloat(selectedMethodDetail.fee_value) / 100));
    } else {
      serviceFee = parseFloat(selectedMethodDetail.fee_value);
    }
  }

  const total = subtotal + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setInputValue(raw);
    const num = parseInt(raw, 10);
    if (!isNaN(num) && num >= 1 && num <= 9999) setQuantity(num);
  };

  const handleInputBlur = () => {
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num < 1) {
      setQuantity(1);
      setInputValue("1");
    } else if (num > 9999) {
      setQuantity(9999);
      setInputValue("9999");
    } else {
      setQuantity(num);
      setInputValue(String(num));
    }
  };

  const handleQuickPick = (val: number) => {
    setQuantity(val);
    setInputValue(String(val));
  };

  const handlePay = async () => {
    if (!selectedMethodDetail) return;
    try {
      const order = await submitTopup({
        quantity,
        payment_channel_code: selectedMethodDetail.code,
      });
      if (order.payment_url) {
        window.location.href = order.payment_url;
      }
    } catch (err: unknown) {
      alert("Gagal melakukan topup. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-plus-jakarta w-full">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="mx-auto px-5 sm:px-5 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push("/shop")}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Top Up Kuota Vote</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-5 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-5">
            <QuotaSelector
              handleDecrement={() => handleDecrement(quantity, setQuantity, setInputValue)}
              handleIncrement={() => handleIncrement(quantity, setQuantity, setInputValue)}
              handleInputChange={handleInputChange}
              handleInputBlur={handleInputBlur}
              quantity={quantity}
              inputValue={inputValue}
              QUICK_PACKAGES={QUICK_PACKAGES}
              handleQuickPick={handleQuickPick}
            />

            {channelsLoading ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
                Memuat metode pembayaran...
              </div>
            ) : channelsError ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-red-500">
                {channelsError}
              </div>
            ) : (
              <PaymentMethod
                channels={channels}
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            )}
          </div>

          <OrderSummarySticky
            quantity={quantity}
            subtotal={subtotal}
            serviceFee={serviceFee}
            total={total}
            selectedMethodDetail={selectedMethodDetail}
            handlePay={handlePay}
            isProcessing={isProcessing}
          />
        </div>
      </main>
    </div>
  );
}
