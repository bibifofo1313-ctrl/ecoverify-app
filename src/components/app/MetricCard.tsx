import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
  tone?: "emerald" | "sky" | "amber" | "slate";
}

const toneMap: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  emerald: "text-emerald-200",
  sky: "text-sky-200",
  amber: "text-amber-200",
  slate: "text-slate-200",
};

export const MetricCard = ({ label, value, helper, icon, tone = "emerald" }: MetricCardProps) => (
  <div className="card flex h-full flex-col gap-3 p-5">
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
      <span>{label}</span>
      {icon && <span className="text-emerald-300">{icon}</span>}
    </div>
    <div className={cx("text-2xl font-semibold", toneMap[tone])}>{value}</div>
    {helper && <p className="text-xs text-slate-400">{helper}</p>}
  </div>
);
