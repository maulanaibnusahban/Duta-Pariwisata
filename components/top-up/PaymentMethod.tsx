import { CreditCard, Wallet, QrCode } from "lucide-react";
import Image from "next/image";
import { PaymentChannel } from "@/types/payment";

function PaymentMethod({
  channels,
  selectedMethod,
  setSelectedMethod,
}: {
  channels: PaymentChannel[];
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-5 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-base">Metode Pembayaran</h2>
        <p className="text-xs text-gray-400 mt-0.5">Pilih metode yang ingin digunakan</p>
      </div>

      <div className="divide-y divide-gray-50 px-5 py-4">
        <div className="space-y-2">
          {channels.map((method) => {
            const isSelected = selectedMethod === method.code;
            return (
              <button
                key={method.code}
                onClick={() => setSelectedMethod(method.code)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all cursor-pointer text-left group ${
                  isSelected
                    ? "border-gold-400 bg-gold-50 shadow-sm"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-white shadow-sm" : "bg-gray-100 group-hover:bg-white"
                  }`}
                >
                  {method.icon ? (
                    <Image src={method.icon} alt={method.name} width={24} height={24} className="object-contain" />
                  ) : method.code.toLowerCase().includes("qris") ? (
                    <QrCode className="w-5 h-5 text-gray-500" />
                  ) : method.code.toLowerCase().includes("wallet") || method.code.toLowerCase().includes("pay") ? (
                    <Wallet className="w-5 h-5 text-gray-500" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                      {method.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    Biaya layanan:{" "}
                    {method.fee_type === "percent"
                      ? `${method.fee_value}%`
                      : `Rp ${parseFloat(method.fee_value).toLocaleString("id-ID")}`}
                  </p>
                </div>

                {/* Indicator */}
                <div
                  className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "border-gold-500 bg-gold-500" : "border-gray-300"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PaymentMethod;
