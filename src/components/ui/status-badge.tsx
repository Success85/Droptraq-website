import { cn } from "@/lib/cn";
import { statusMeta, type Status } from "@/content/technology";

const tone: Record<Status, string> = {
  prototyped: "border-cyan/40 bg-cyan/10 text-cyan",
  development: "border-water/45 bg-water/10 text-water",
  planned: "border-line-strong bg-transparent text-muted",
};

const dot: Record<Status, string> = {
  prototyped: "bg-cyan",
  development: "bg-water animate-blink",
  planned: "border border-muted bg-transparent",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      title={statusMeta[status].description}
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider", tone[status], className)}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", dot[status])} />
      {statusMeta[status].label}
    </span>
  );
}

export function StatusLegend({ className }: { className?: string }) {
  return (
    <dl className={cn("flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted", className)}>
      {(Object.keys(statusMeta) as Status[]).map((s) => (
        <div key={s} className="flex items-center gap-3">
          <dt><StatusBadge status={s} /></dt>
          <dd>{statusMeta[s].description}</dd>
        </div>
      ))}
    </dl>
  );
}
