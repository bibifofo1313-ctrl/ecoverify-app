import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { generateExecutiveSummary } from "../../utils/summary";
import type { FormData } from "../../types/app";
import { Button } from "../common/Button";

interface SmartAuditCardProps {
  formData: FormData;
  score: number;
  offset: number;
}

export const SmartAuditCard = ({ formData, score, offset }: SmartAuditCardProps) => {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [summary, setSummary] = useState("");

  const handleGenerate = () => {
    setStatus("loading");
    setSummary("");

    window.setTimeout(() => {
      const report = generateExecutiveSummary(formData, score, offset);
      setSummary(report);
      setStatus("done");
    }, 1200);
  };

  return (
    <div className="card flex flex-col gap-4 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Gemini</p>
          <h3 className="heading-3">Smart audit summary</h3>
          <p className="mt-2 text-sm text-slate-400">
            Simulated Gemini API response to deliver a 300-word executive summary.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={handleGenerate}
          disabled={status === "loading"}
          icon={status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          aria-label="Generate smart audit summary"
        >
          {status === "loading" ? "Generating" : "Smart Audit"}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100"
          >
            Aligning audit heuristics and compliance guidance...
          </motion.div>
        )}
        {summary && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300"
          >
            <p className="label text-emerald-300/70">Executive summary</p>
            <p className="mt-3 leading-relaxed">{summary}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
