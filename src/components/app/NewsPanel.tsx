import type { NewsItem } from "../../types/app";
import { formatDateTime } from "../../utils/format";
import { Skeleton } from "../common/Skeleton";

interface NewsPanelProps {
  items: NewsItem[];
  isLoading: boolean;
  error: string | null;
}

export const NewsPanel = ({ items, isLoading, error }: NewsPanelProps) => (
  <div className="card flex h-full flex-col gap-4 p-6">
    <div>
      <p className="eyebrow">Industry & regulatory updates</p>
      <h3 className="heading-3">Context you can trust</h3>
      <p className="mt-2 text-sm text-slate-400">
        Curated sustainability coverage to guide your next compliance moves.
      </p>
    </div>

    {isLoading && (
      <div className="space-y-3">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
      </div>
    )}

    {!isLoading && error && (
      <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-200">
        {error}
      </div>
    )}

    {!isLoading && !error && items.length === 0 && (
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4 text-sm text-slate-400">
        No updates available yet.
      </div>
    )}

    {!isLoading && !error && items.length > 0 && (
      <ul className="space-y-4">
        {items.slice(0, 5).map((item) => (
          <li key={item.id} className="rounded-2xl border border-slate-800/80 bg-slate-950/50 p-4">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="mt-2 text-xs text-slate-400">
              {item.source} · {formatDateTime(item.publishedAt)}
            </p>
            <p className="mt-2 text-sm text-slate-300">{item.summary}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
