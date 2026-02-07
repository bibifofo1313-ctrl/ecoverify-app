import { CheckCircle2 } from "lucide-react";
import { ONBOARDING_STEPS } from "../../data/defaults";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => (
  <div className="grid gap-4 md:grid-cols-3">
    {ONBOARDING_STEPS.map((step) => {
      const isActive = step.id === currentStep;
      const isDone = step.id < currentStep;

      return (
        <div key={step.id} className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold ${
              isActive
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                : isDone
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                : "border-slate-700/80 bg-slate-900/60 text-slate-500"
            }`}
          >
            {isDone ? <CheckCircle2 className="h-4 w-4" /> : step.id}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Step {step.id}
            </p>
            <p className={`text-sm ${isActive ? "text-white" : "text-slate-400"}`}>
              {step.title}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);
