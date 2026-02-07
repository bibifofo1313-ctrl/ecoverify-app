import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonLink } from "../common/ButtonLink";

const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Score", href: "#value" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const MarketingNav = () => (
  <div className="sticky top-0 z-40 border-b border-slate-900/80 bg-slate-950/85 backdrop-blur">
    <div className="app-container flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-2">
          <Leaf className="h-4 w-4 text-emerald-300" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">EcoVerify 2026</p>
          <p className="text-sm text-slate-400">Sustainability intelligence</p>
        </div>
      </div>

      <nav className="hidden items-center gap-6 text-sm text-slate-400 lg:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-emerald-200">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          to="/app/dashboard?demo=true"
          className="hidden text-sm text-slate-400 hover:text-emerald-200 sm:block"
        >
          View demo
        </Link>
        <ButtonLink to="/app/onboarding" variant="primary">
          Start free
        </ButtonLink>
      </div>
    </div>
  </div>
);
