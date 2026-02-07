import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "../common/Button";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

const tiers = [
  {
    name: "Starter",
    price: "$199",
    note: "per report",
    features: [
      "Sustainability score dashboard",
      "Export-ready tax offset summary",
      "Standard compliance checklist",
    ],
  },
  {
    name: "Growth",
    price: "$399",
    note: "per report",
    features: [
      "Official certification PDF",
      "Auditor-ready evidence pack",
      "AI executive summary",
      "Priority email support",
    ],
    highlight: true,
  },
] as const;

export const PricingModal = ({ open, onClose }: PricingModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Pricing plans"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          className="glass relative w-full max-w-3xl rounded-3xl p-6 sm:p-8"
        >
          <button
            className="absolute right-6 top-6 rounded-full border border-slate-700/70 bg-slate-900/70 p-2 text-slate-300 hover:text-white"
            onClick={onClose}
            aria-label="Close pricing"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-2">
            <p className="eyebrow">Pricing</p>
            <h2 className="heading-2">Choose your certification plan</h2>
            <p className="text-sm text-slate-400">
              Connect Stripe Checkout in production to unlock payments instantly.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-5 ${
                  tier.highlight
                    ? "border-emerald-400/60 bg-emerald-500/10 shadow-glow"
                    : "border-slate-800/80 bg-slate-950/60"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-4 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900">
                    Most popular
                  </span>
                )}
                <div className="space-y-1">
                  <p className="text-sm text-slate-400">{tier.name}</p>
                  <p className="text-2xl font-semibold text-white">{tier.price}</p>
                  <p className="text-xs text-slate-500">{tier.note}</p>
                </div>
                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.highlight ? "primary" : "secondary"}
                  className="mt-5 w-full justify-center"
                  aria-label={`Choose ${tier.name} plan`}
                >
                  Select plan
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
