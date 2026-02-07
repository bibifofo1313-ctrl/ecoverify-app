import { ProgressBar } from "../common/ProgressBar";

interface DataCompletenessCardProps {
  percent: number;
}

export const DataCompletenessCard = ({ percent }: DataCompletenessCardProps) => (
  <div className="card flex h-full flex-col gap-3 p-5">
    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Data completeness</div>
    <div className="text-2xl font-semibold text-emerald-200">{percent}%</div>
    <ProgressBar value={percent} />
    <p className="text-xs text-slate-400">
      Complete inputs unlock more precise tax offset modeling.
    </p>
  </div>
);
