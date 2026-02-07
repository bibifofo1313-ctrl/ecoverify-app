import type { FormData } from "../types/app";
import {
  COMPANY_SIZES,
  FLEET_TYPES,
  INDUSTRIES,
  LOCATIONS,
  TAX_BRACKETS,
} from "./options";

export const DEFAULT_FORM_DATA: FormData = {
  industry: INDUSTRIES[0],
  size: COMPANY_SIZES[1],
  location: LOCATIONS[0],
  monthlyKwh: 24000,
  wasteVolume: 8,
  fleetType: FLEET_TYPES[1],
  revenue: 1200000,
  taxBracket: TAX_BRACKETS[1],
};

export const APP_STORAGE_KEY = "ecoverify:state";

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Business identity",
    description: "Set the organizational context for scoring benchmarks.",
  },
  {
    id: 2,
    title: "Operational data",
    description: "Share the inputs that influence energy and waste scores.",
  },
  {
    id: 3,
    title: "Financial context",
    description: "Capture revenue and tax context for incentive modeling.",
  },
] as const;
