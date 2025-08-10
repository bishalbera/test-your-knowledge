import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        ref={ref as any}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur",
          className
        )}
        {...props}
      />
    );
  }
);
GlassCard.displayName = "GlassCard";

export default GlassCard;

