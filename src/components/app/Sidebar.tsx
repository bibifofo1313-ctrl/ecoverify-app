import { Leaf, LayoutDashboard, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cx } from "../../utils/cx";

const navItems = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { label: "Onboarding", to: "/app/onboarding", icon: Sparkles },
] as const;

export const Sidebar = () => (
  <aside className="hidden w-64 flex-col gap-6 border-r border-slate-900/60 bg-slate-950/80 p-6 lg:flex">
    <div className="flex items-center gap-3">
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-2">
        <Leaf className="h-5 w-5 text-emerald-300" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
          EcoVerify 2026
        </p>
        <p className="text-sm text-slate-400">Sustainability OS</p>
      </div>
    </div>

    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cx(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                isActive
                  ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-100"
                  : "border-transparent text-slate-400 hover:border-slate-800/70 hover:bg-slate-900/60"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>

    <div className="mt-auto rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 text-xs text-slate-400">
      Next audit cycle: <span className="text-emerald-200">Q2 2026</span>
    </div>
  </aside>
);
