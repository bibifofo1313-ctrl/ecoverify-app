export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);

export const formatDateTime = (isoString: string | null) => {
  if (!isoString) return "Not yet updated";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "Not yet updated";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const formatRelativeDays = (isoString: string | null) => {
  if (!isoString) return "No recent data";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "No recent data";
  const diffMs = Date.now() - date.getTime();
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (days === 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  return `Updated ${days} days ago`;
};
