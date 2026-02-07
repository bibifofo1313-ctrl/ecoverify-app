import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cx("skeleton", className)} {...props} />
);
