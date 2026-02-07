import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader";
import { ProgressBar } from "../../components/common/ProgressBar";
import { FormField } from "../../components/common/FormField";
import { Button } from "../../components/common/Button";
import { StepIndicator } from "../../components/onboarding/StepIndicator";
import { DEFAULT_FORM_DATA, ONBOARDING_STEPS } from "../../data/defaults";
import {
  COMPANY_SIZES,
  FLEET_TYPES,
  INDUSTRIES,
  LOCATIONS,
  TAX_BRACKETS,
} from "../../data/options";
import { useAppState } from "../../hooks/useAppState";
import type { FormData } from "../../types/app";
import { hasErrors, type FieldErrors, validateStep } from "../../utils/validation";

const clampStep = (value: number) => Math.min(3, Math.max(1, value));

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { state, setFormData, setOnboardingStep, markCompleted } = useAppState();
  const [errors, setErrors] = useState<FieldErrors>({});

  const step = clampStep(state.onboardingStep || 1);
  const progress = useMemo(() => (step / 3) * 100, [step]);
  const stepMeta = ONBOARDING_STEPS.find((item) => item.id === step) ?? ONBOARDING_STEPS[0];

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, state.formData);
    setErrors(stepErrors);
    if (hasErrors(stepErrors)) return;

    if (step === 3) {
      markCompleted();
      navigate("/app/dashboard", { replace: true });
      return;
    }

    setOnboardingStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    setOnboardingStep(step - 1);
  };

  const handleReset = () => {
    setErrors({});
    setFormData(DEFAULT_FORM_DATA);
    setOnboardingStep(1);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Onboarding"
        title="Set up your sustainability baseline"
        subtitle="Three short steps to calibrate your 2026 readiness score."
        breadcrumbs={[
          { label: "App", to: "/app" },
          { label: "Onboarding" },
        ]}
        actions={
          <Button variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        }
      />

      <div className="card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="label">Step {step}</p>
            <h2 className="heading-3">{stepMeta.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{stepMeta.description}</p>
          </div>
          <div className="w-full lg:w-52">
            <ProgressBar value={progress} />
          </div>
        </div>

        <div className="mt-6">
          <StepIndicator currentStep={step} />
        </div>

        <div className="mt-6 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6">
          {step === 1 && (
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Industry" error={errors.industry}>
                <select
                  className="input"
                  value={state.formData.industry}
                  onChange={(event) => updateField("industry", event.target.value as FormData["industry"])}
                  aria-label="Select industry"
                >
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Company size" error={errors.size}>
                <select
                  className="input"
                  value={state.formData.size}
                  onChange={(event) => updateField("size", event.target.value as FormData["size"])}
                  aria-label="Select company size"
                >
                  {COMPANY_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label="Primary location" error={errors.location}>
                <select
                  className="input"
                  value={state.formData.location}
                  onChange={(event) => updateField("location", event.target.value as FormData["location"])}
                  aria-label="Select location"
                >
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Monthly energy usage (kWh)" error={errors.monthlyKwh}>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={state.formData.monthlyKwh}
                  onChange={(event) => updateField("monthlyKwh", Number(event.target.value))}
                  aria-label="Monthly energy usage"
                />
              </FormField>
              <FormField label="Waste volume (tons/month)" error={errors.wasteVolume}>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={state.formData.wasteVolume}
                  onChange={(event) => updateField("wasteVolume", Number(event.target.value))}
                  aria-label="Waste volume"
                />
              </FormField>
              <FormField label="Fleet type" error={errors.fleetType}>
                <select
                  className="input"
                  value={state.formData.fleetType}
                  onChange={(event) => updateField("fleetType", event.target.value as FormData["fleetType"])}
                  aria-label="Fleet type"
                >
                  {FLEET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </FormField>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                <p className="font-semibold">Material sourcing score</p>
                <p className="mt-2 text-xs text-emerald-200/80">
                  Calculated from industry profile, fleet mix, and location benchmarks for
                  2026 standards.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Annual revenue (USD)" error={errors.revenue}>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={state.formData.revenue}
                  onChange={(event) => updateField("revenue", Number(event.target.value))}
                  aria-label="Annual revenue"
                />
              </FormField>
              <FormField label="Current tax bracket" error={errors.taxBracket}>
                <select
                  className="input"
                  value={state.formData.taxBracket}
                  onChange={(event) => updateField("taxBracket", event.target.value as FormData["taxBracket"])}
                  aria-label="Tax bracket"
                >
                  {TAX_BRACKETS.map((bracket) => (
                    <option key={bracket} value={bracket}>
                      {bracket}
                    </option>
                  ))}
                </select>
              </FormField>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">2026 incentive readiness</p>
                <p className="mt-2 text-xs text-slate-400">
                  Tax offsets are forecasted using a blended EU/US incentive multiplier and
                  your current bracket.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Button variant="secondary" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button variant="primary" onClick={handleNext}>
            {step === 3 ? "Complete onboarding" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};
