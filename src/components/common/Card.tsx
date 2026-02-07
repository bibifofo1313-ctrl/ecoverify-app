import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("card", className)} {...props} />
);

export const CardMuted = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("card-muted", className)} {...props} />
);
