import { DATA_FRESHNESS_DAYS } from "../styles/tokens";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getDaysSince = (isoString: string | null) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  return Math.floor((Date.now() - date.getTime()) / MS_PER_DAY);
};

export const getFreshnessStatus = (isoString: string | null) => {
  const days = getDaysSince(isoString);
  if (days === null) {
    return { label: "No recent updates", tone: "text-slate-400", isFresh: false };
  }
  if (days <= DATA_FRESHNESS_DAYS) {
    return { label: "Fresh data", tone: "text-emerald-300", isFresh: true };
  }
  return { label: "Stale data", tone: "text-amber-300", isFresh: false };
};
