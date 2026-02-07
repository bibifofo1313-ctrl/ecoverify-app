import type { Recommendation } from "../../types/app";

const impactStyles: Record<Recommendation["impact"], string> = {
  High: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  Medium: "border-amber-400/40 bg-amber-500/10 text-amber-200",
  Low: "border-slate-700/60 bg-slate-900/60 text-slate-200",
};

interface RecommendationsListProps {
  items: Recommendation[];
}

export const RecommendationsList = ({ items }: RecommendationsListProps) => (
  <div className="card flex flex-col gap-4 p-6">
    <div>
      <p className="eyebrow">What to do next</p>
      <h3 className="heading-3">Priority actions</h3>
      <p className="mt-2 text-sm text-slate-400">
        Actionable steps ranked by impact on your 2026 readiness score.
      </p>
    </div>
    <div className="divide-y divide-slate-800/80">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-2 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                impactStyles[item.impact]
              }`}
            >
              {item.impact} impact
            </span>
          </div>
          <p className="text-sm text-slate-400">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);
