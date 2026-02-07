interface ProgressBarProps {
  value: number;
}

export const ProgressBar = ({ value }: ProgressBarProps) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
    <div
      className="h-full rounded-full bg-emerald-400 transition-all"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
