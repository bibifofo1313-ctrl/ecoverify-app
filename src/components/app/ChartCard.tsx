import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => (
  <div className="card p-5">
    <p className="text-sm font-semibold text-white">{title}</p>
    {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    {children}
  </div>
);
