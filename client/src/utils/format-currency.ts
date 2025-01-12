export function formatCurrencyVND(amount: number) {
  return amount.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
