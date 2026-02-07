import type { FormData } from "../types/app";

const SENTENCE_POOL = [
  "We recommend formalizing a 12-month decarbonization roadmap with quarterly milestones.",
  "Digitizing operational metering will unlock a clearer audit trail for regulators and investors.",
  "Supplier engagement should prioritize verified low-carbon materials and circular procurement.",
  "A fleet transition plan can immediately improve both emissions intensity and compliance readiness.",
  "Embedding sustainability KPIs into finance reviews will sharpen ROI on green upgrades.",
  "Cross-functional ownership is essential to sustain momentum beyond the onboarding phase.",
  "Employee enablement and training will help operational changes stick.",
  "Consider third-party verification to unlock premium tax incentives and reputational benefits.",
  "A unified data room will accelerate certification workflows and reduce audit friction.",
  "Track progress monthly to stay aligned with the 2026 incentive windows.",
];

const toWords = (text: string) => text.trim().split(/\s+/);

export const generateExecutiveSummary = (
  formData: FormData,
  score: number,
  offset: number
) => {
  const base = `EcoVerify 2026 analyzed ${formData.industry || "your business"} operations in ${
    formData.location || "global"
  } for ${formData.size || "a growing team"} and produced a Sustainability Score of ${
    score || 0
  } out of 100. Monthly energy use of ${formData.monthlyKwh || 0} kWh and waste volume of ${
    formData.wasteVolume || 0
  } tons placed the organization in a moderate readiness tier for upcoming 2026 EU/US reporting expectations. Material sourcing impacts remain the most strategic lever, especially given the current fleet profile (${formData.fleetType || "not specified"}). Based on the declared revenue of $$${
    formData.revenue || 0
  } and tax bracket of ${formData.taxBracket || "21%"}, the estimated tax offset opportunity is approximately $$${
    offset || 0
  } if the organization sustains a score above 75 throughout 2026.`;

  let summary = base;
  let poolIndex = 0;

  while (toWords(summary).length < 300) {
    summary += " " + SENTENCE_POOL[poolIndex % SENTENCE_POOL.length];
    poolIndex += 1;
  }

  const words = toWords(summary).slice(0, 300);
  return `${words.join(" ")}.`;
};
