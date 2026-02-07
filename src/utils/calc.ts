import type { FormData, ScoreBreakdown } from "../types/app";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const SIZE_BASELINES = {
  micro: { energy: 5000, waste: 1.5 },
  small: { energy: 20000, waste: 6 },
  mid: { energy: 80000, waste: 18 },
  large: { energy: 250000, waste: 45 },
} as const;

const INDUSTRY_MATERIAL_BASE: Record<string, number> = {
  Technology: 82,
  "Professional Services": 86,
  Retail: 68,
  Manufacturing: 54,
  Logistics: 60,
  Energy: 46,
  Agriculture: 50,
  Construction: 58,
  Healthcare: 74,
};

const FLEET_ADJUSTMENT: Record<string, number> = {
  Electric: 10,
  Hybrid: 6,
  "Low Emission": 3,
  Diesel: -8,
  Gasoline: -6,
  None: 4,
};

const LOCATION_ADJUSTMENT: Record<string, number> = {
  "United States": 2,
  "European Union": 6,
  "United Kingdom": 5,
  Canada: 4,
  "Asia-Pacific": -2,
  Global: 0,
};

const TAX_BRACKETS: Record<string, number> = {
  "12%": 0.12,
  "21%": 0.21,
  "28%": 0.28,
  "35%": 0.35,
};

const SCORE_WEIGHTS = {
  energy: 0.4,
  waste: 0.3,
  material: 0.3,
} as const;

const ENERGY_RANGE = { low: 0.6, high: 1.6 } as const;
const WASTE_RANGE = { low: 0.5, high: 1.7 } as const;
const MATERIAL_RANGE = { min: 25, max: 98 } as const;
const OPTIMIZED_REDUCTION = { energy: 0.75, waste: 0.7 } as const;
const MATERIAL_BOOST = 12;
const INCENTIVE_RATE = 0.08;

const normalizeScore = (value: number, low: number, high: number) => {
  if (!Number.isFinite(value)) return 0;
  if (value <= low) return 100;
  if (value >= high) return 0;
  const ratio = (value - low) / (high - low);
  return clamp(100 - ratio * 100, 0, 100);
};

const parseNumber = (value: number) => (Number.isFinite(value) ? value : 0);

const getSizeKey = (sizeLabel: string) => {
  if (sizeLabel.includes("Micro")) return "micro";
  if (sizeLabel.includes("Small")) return "small";
  if (sizeLabel.includes("Mid")) return "mid";
  if (sizeLabel.includes("Large")) return "large";
  return "small";
};

export const calculateSustainability = (formData: FormData): ScoreBreakdown => {
  const sizeKey = getSizeKey(formData.size);
  const baseline = SIZE_BASELINES[sizeKey] || SIZE_BASELINES.small;

  const monthlyKwh = parseNumber(formData.monthlyKwh);
  const wasteVolume = parseNumber(formData.wasteVolume);
  const revenue = parseNumber(formData.revenue);

  const energyScore = normalizeScore(
    monthlyKwh,
    baseline.energy * ENERGY_RANGE.low,
    baseline.energy * ENERGY_RANGE.high
  );
  const wasteScore = normalizeScore(
    wasteVolume,
    baseline.waste * WASTE_RANGE.low,
    baseline.waste * WASTE_RANGE.high
  );

  const industryBase = INDUSTRY_MATERIAL_BASE[formData.industry] ?? 70;
  const fleetAdjust = FLEET_ADJUSTMENT[formData.fleetType] ?? 0;
  const locationAdjust = LOCATION_ADJUSTMENT[formData.location] ?? 0;
  const materialScore = clamp(
    industryBase + fleetAdjust + locationAdjust,
    MATERIAL_RANGE.min,
    MATERIAL_RANGE.max
  );

  const sustainabilityScore = Math.round(
    energyScore * SCORE_WEIGHTS.energy +
      wasteScore * SCORE_WEIGHTS.waste +
      materialScore * SCORE_WEIGHTS.material
  );

  const taxRate = TAX_BRACKETS[formData.taxBracket] ?? 0.21;
  const taxLiability = revenue * taxRate;
  const estimatedTaxOffset = Math.round(
    taxLiability * INCENTIVE_RATE * (sustainabilityScore / 100)
  );

  return {
    energyScore: Math.round(energyScore),
    wasteScore: Math.round(wasteScore),
    materialScore: Math.round(materialScore),
    sustainabilityScore,
    estimatedTaxOffset,
  };
};

export const calculateOptimized = (formData: FormData): ScoreBreakdown => {
  const optimized = {
    ...formData,
    monthlyKwh: parseNumber(formData.monthlyKwh) * OPTIMIZED_REDUCTION.energy,
    wasteVolume: parseNumber(formData.wasteVolume) * OPTIMIZED_REDUCTION.waste,
  };
  const scores = calculateSustainability(optimized);
  const boostedMaterial = clamp(scores.materialScore + MATERIAL_BOOST, 0, 100);
  const totalScore = Math.round(
    scores.energyScore * SCORE_WEIGHTS.energy +
      scores.wasteScore * SCORE_WEIGHTS.waste +
      boostedMaterial * SCORE_WEIGHTS.material
  );

  return {
    ...scores,
    materialScore: boostedMaterial,
    sustainabilityScore: totalScore,
  };
};
