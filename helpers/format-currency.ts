export const formatCurrency = (amount: number): string => {
  return `$${new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
};
