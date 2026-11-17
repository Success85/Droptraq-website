import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/cn";

/** Mandatory label for any visualization that uses simulated data. */
export function SimLabel({ children = "Simulated visualization · not live data", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border border-amber/30 bg-amber/10 px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-amber", className)}>
      <FlaskConical aria-hidden className="size-3" />
      {children}
    </span>
  );
}
