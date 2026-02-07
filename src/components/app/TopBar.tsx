import { Leaf } from "lucide-react";

export const TopBar = () => (
  <div className="flex items-center justify-between border-b border-slate-900/60 bg-slate-950/70 px-6 py-4">
    <div className="flex items-center gap-3 lg:hidden">
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-2">
        <Leaf className="h-4 w-4 text-emerald-300" />
      </div>
      <span className="text-sm font-semibold text-white">EcoVerify 2026</span>
    </div>
    <div className="ml-auto flex items-center gap-3">
      <div className="text-right">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Account</p>
        <p className="text-sm text-slate-200">Northwind Co.</p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10 text-sm font-semibold text-emerald-200">
        NW
      </div>
    </div>
  </div>
);
