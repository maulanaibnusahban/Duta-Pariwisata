/* ── quantity handlers ── */
export const handleDecrement = (
  quantity: number,
  setQuantity: (value: number) => void,
  setInputValue: (value: string) => void,
) => {
  const newVal = Math.max(1, quantity - 1);
  setQuantity(newVal);
  setInputValue(String(newVal));
};

export const handleIncrement = (
  quantity: number,
  setQuantity: (value: number) => void,
  setInputValue: (value: string) => void,
) => {
  const newVal = Math.min(9999, quantity + 1);
  setQuantity(newVal);
  setInputValue(String(newVal));
};

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const handlePay = (selectedMethod: string, setIsProcessing: (value: boolean) => void) => {
  if (!selectedMethod) return;
  setIsProcessing(true);
  setTimeout(() => setIsProcessing(false), 2000);
};
