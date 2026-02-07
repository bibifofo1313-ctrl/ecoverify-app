import type { FormData } from "../types/app";

export type FieldErrors = Partial<Record<keyof FormData, string>>;

const isEmpty = (value: string) => value.trim().length === 0;

const isPositive = (value: number) => Number.isFinite(value) && value > 0;

export const validateStep = (step: number, data: FormData): FieldErrors => {
  const errors: FieldErrors = {};

  if (step === 1) {
    if (isEmpty(data.industry)) errors.industry = "Select an industry to continue.";
    if (isEmpty(data.size)) errors.size = "Choose a company size.";
    if (isEmpty(data.location)) errors.location = "Select your primary location.";
  }

  if (step === 2) {
    if (!isPositive(data.monthlyKwh))
      errors.monthlyKwh = "Enter a monthly kWh value above zero.";
    if (!isPositive(data.wasteVolume))
      errors.wasteVolume = "Enter a waste volume above zero.";
    if (isEmpty(data.fleetType)) errors.fleetType = "Select a fleet type.";
  }

  if (step === 3) {
    if (!isPositive(data.revenue))
      errors.revenue = "Enter annual revenue greater than zero.";
    if (isEmpty(data.taxBracket)) errors.taxBracket = "Select a tax bracket.";
  }

  return errors;
};

export const validateAll = (data: FormData): FieldErrors => {
  return {
    ...validateStep(1, data),
    ...validateStep(2, data),
    ...validateStep(3, data),
  };
};

export const hasErrors = (errors: FieldErrors) => Object.keys(errors).length > 0;

export const getCompletionPercent = (data: FormData) => {
  const fields: Array<[keyof FormData, boolean]> = [
    ["industry", !isEmpty(data.industry)],
    ["size", !isEmpty(data.size)],
    ["location", !isEmpty(data.location)],
    ["monthlyKwh", isPositive(data.monthlyKwh)],
    ["wasteVolume", isPositive(data.wasteVolume)],
    ["fleetType", !isEmpty(data.fleetType)],
    ["revenue", isPositive(data.revenue)],
    ["taxBracket", !isEmpty(data.taxBracket)],
  ];

  const completed = fields.filter(([, valid]) => valid).length;
  return Math.round((completed / fields.length) * 100);
};
