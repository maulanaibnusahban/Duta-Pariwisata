"use client";

import { Crown } from "lucide-react";
import AlertModal from "@/components/ui/AlertModal";

interface Props {
  onDone: () => void;
}

export default function AdsToast({ onDone }: Props) {
  return (
    <AlertModal
      icon={<Crown className="w-7 h-7 text-white" />}
      iconBg="bg-gold-gradient"
      title="Hadiah Diterima! 🎉"
      description={
        <>
          Selamat! Kamu mendapatkan <span className="font-bold text-amber-700">1 point vote</span> dari menonton iklan.
        </>
      }
      okLabel="Sip, Makasih!"
      onOk={onDone}
    />
  );
}
