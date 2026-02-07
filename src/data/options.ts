export const INDUSTRIES = [
  "Technology",
  "Professional Services",
  "Retail",
  "Manufacturing",
  "Logistics",
  "Energy",
  "Agriculture",
  "Construction",
  "Healthcare",
] as const;

export const COMPANY_SIZES = [
  "Micro (1-9)",
  "Small (10-49)",
  "Mid (50-249)",
  "Large (250+)",
] as const;

export const LOCATIONS = [
  "United States",
  "European Union",
  "United Kingdom",
  "Canada",
  "Asia-Pacific",
  "Global",
] as const;

export const FLEET_TYPES = [
  "Electric",
  "Hybrid",
  "Low Emission",
  "Diesel",
  "Gasoline",
  "None",
] as const;

export const TAX_BRACKETS = ["12%", "21%", "28%", "35%"] as const;

export type Industry = (typeof INDUSTRIES)[number];
export type CompanySize = (typeof COMPANY_SIZES)[number];
export type Location = (typeof LOCATIONS)[number];
export type FleetType = (typeof FLEET_TYPES)[number];
export type TaxBracket = (typeof TAX_BRACKETS)[number];
