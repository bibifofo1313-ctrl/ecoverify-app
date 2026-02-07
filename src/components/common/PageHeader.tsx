import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
}

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
}: PageHeaderProps) => (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <div>
      {breadcrumbs && (
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-emerald-300">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span>/</span>}
            </span>
          ))}
        </div>
      )}
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="heading-2">{title}</h1>
      {subtitle && <p className="mt-2 text-sm text-slate-400 md:text-base">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-3">{actions}</div>}
  </div>
);
