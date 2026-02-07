import type { FormData, Recommendation, ScoreBreakdown } from "../types/app";

const RECOMMENDATION_MAP: Record<
  "energy" | "waste" | "material",
  { title: string; items: Array<Omit<Recommendation, "id">> }
> = {
  energy: {
    title: "Energy performance",
    items: [
      {
        title: "Deploy smart metering",
        description: "Identify peak usage windows and eliminate hidden waste in operations.",
        impact: "High",
      },
      {
        title: "Shift heavy loads off-peak",
        description: "Reduce grid intensity and unlock immediate cost savings.",
        impact: "Medium",
      },
      {
        title: "Audit HVAC and lighting",
        description: "Target quick retrofits that lift the energy score quickly.",
        impact: "Low",
      },
    ],
  },
  waste: {
    title: "Waste optimization",
    items: [
      {
        title: "Introduce circular packaging",
        description: "Reduce landfill exposure while improving compliance readiness.",
        impact: "High",
      },
      {
        title: "Benchmark supplier take-back",
        description: "Negotiate take-back clauses for high-volume material streams.",
        impact: "Medium",
      },
      {
        title: "Track waste weekly",
        description: "Build audit-ready evidence without slowing operations.",
        impact: "Low",
      },
    ],
  },
  material: {
    title: "Material sourcing",
    items: [
      {
        title: "Prioritize verified suppliers",
        description: "Secure low-carbon materials that boost the material score fast.",
        impact: "High",
      },
      {
        title: "Create a preferred materials list",
        description: "Standardize sourcing with ESG thresholds for 2026 readiness.",
        impact: "Medium",
      },
      {
        title: "Document chain-of-custody",
        description: "Close evidence gaps ahead of certification review.",
        impact: "Low",
      },
    ],
  },
};

export const buildRecommendations = (
  scores: ScoreBreakdown,
  formData: FormData
): Recommendation[] => {
  const priorities: Array<["energy" | "waste" | "material", number]> = [
    ["energy", scores.energyScore],
    ["waste", scores.wasteScore],
    ["material", scores.materialScore],
  ];

  const [lowestKey] = priorities.sort((a, b) => a[1] - b[1])[0];
  const selected = RECOMMENDATION_MAP[lowestKey];

  return selected.items.map((item, index) => ({
    ...item,
    title: `${item.title} for ${formData.industry}`,
    id: `${lowestKey}-${index}`,
  }));
};
