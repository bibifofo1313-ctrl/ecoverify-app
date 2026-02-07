import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span className={cx("badge", className)} {...props} />
);
