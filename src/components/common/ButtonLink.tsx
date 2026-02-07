import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cx } from "../../utils/cx";
import type { ButtonVariant } from "./Button";

interface ButtonLinkProps {
  to: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  muted: "btn-muted",
};

export const ButtonLink = ({
  to,
  variant = "primary",
  icon,
  className,
  children,
}: ButtonLinkProps) => (
  <Link to={to} className={cx("btn", variantClasses[variant], className)}>
    {children}
    {icon}
  </Link>
);
