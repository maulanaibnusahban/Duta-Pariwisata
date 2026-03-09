import { PaymentMethodType } from "@/lib/type";

interface PaymentCategory {
  category: string;
  methods: PaymentMethodType[];
}

function PaymentMethod({
  PAYMENT_CATEGORIES,
  selectedMethod,
  setSelectedMethod,
}: {
  PAYMENT_CATEGORIES: PaymentCategory[];
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-5 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-base">Metode Pembayaran</h2>
        <p className="text-xs text-gray-400 mt-0.5">Pilih metode yang ingin digunakan</p>
      </div>

      <div className="divide-y divide-gray-50">
        {PAYMENT_CATEGORIES.map((cat) => (
          <div key={cat.category} className="px-5 py-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{cat.category}</p>
            <div className="space-y-2">
              {cat.methods.map((method) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
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
                      <method.icon className={method.className} />
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold text-sm ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                          {method.name}
                        </span>
                        {method.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gold-gradient text-white">
                            {method.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{method.description}</p>
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
        ))}
      </div>
    </section>
  );
}

export default PaymentMethod;
