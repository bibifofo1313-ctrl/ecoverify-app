import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "muted";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  muted: "btn-muted",
};

export const Button = ({
  variant = "primary",
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={cx(
      "btn",
      variantClasses[variant],
      disabled && "cursor-not-allowed opacity-60",
      className
    )}
    type="button"
    disabled={disabled}
    {...props}
  >
    {children}
    {icon}
  </button>
);
