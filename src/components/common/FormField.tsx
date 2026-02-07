import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  helper?: string;
  error?: string;
  children: ReactNode;
}

export const FormField = ({ label, helper, error, children }: FormFieldProps) => (
  <label className="flex flex-col gap-2 text-sm text-slate-300">
    <span className="text-slate-400">{label}</span>
    {children}
    {helper && !error && <span className="text-xs text-slate-500">{helper}</span>}
    {error && <span className="text-xs text-rose-300">{error}</span>}
  </label>
);
