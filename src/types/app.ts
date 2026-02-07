import type {
  CompanySize,
  FleetType,
  Industry,
  Location,
  TaxBracket,
} from "../data/options";

export interface FormData {
  industry: Industry;
  size: CompanySize;
  location: Location;
  monthlyKwh: number;
  wasteVolume: number;
  fleetType: FleetType;
  revenue: number;
  taxBracket: TaxBracket;
}

export interface ScoreBreakdown {
  energyScore: number;
  wasteScore: number;
  materialScore: number;
  sustainabilityScore: number;
  estimatedTaxOffset: number;
}

export type ImpactLevel = "High" | "Medium" | "Low";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: ImpactLevel;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  summary: string;
  url?: string;
  publishedAt: string;
}

export interface AppState {
  formData: FormData;
  onboardingStep: number;
  updatedAt: string | null;
  completed: boolean;
}
