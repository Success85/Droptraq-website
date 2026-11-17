import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import { publishedTeam, showPendingProfiles, team } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Team profile grid, driven entirely by src/content/site.ts.
 * Production: only verified (published) profiles render.
 * Development: unverified profiles render as dashed "pending" cards so the
 * layout can be reviewed. They never ship.
 */
export function TeamProfiles({ className }: { className?: string }) {
  const people = publishedTeam();
  const pending = showPendingProfiles ? team.filter((m) => !m.published) : [];
  if (people.length === 0 && pending.length === 0) return null;

  return (
    <div className={className}>
      {pending.length > 0 && (
        <p className="mb-4 rounded-lg border border-dashed border-amber/40 bg-amber/5 px-4 py-3 font-mono text-[11px] leading-relaxed text-amber">
          DEV ONLY · {pending.length} unverified profile{pending.length > 1 ? "s" : ""}. These cards are hidden in
          production until names, roles and bios are confirmed in src/content/site.ts.
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((m) => (
          <li key={m.name} className="group overflow-hidden rounded-2xl border border-line bg-ink-900">
            <div className="relative aspect-[4/5] bg-ink-800">
              {m.photo ? (
                <Image src={m.photo} alt={`Portrait of ${m.name}, ${m.role} at DropTraQ`} fill sizes="(min-width:1024px) 300px, 50vw"
                  className="object-cover grayscale-[25%] transition duration-500 group-hover:grayscale-0" />
              ) : (
                <div className="flex h-full items-center justify-center text-subtle"><UserRound aria-hidden className="size-14" strokeWidth={1} /></div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-fg">{m.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-wider text-cyan">{m.role}</p>
              {m.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-fg hover:text-cyan">
                  LinkedIn <ArrowUpRight aria-hidden className="size-3.5" /><span className="sr-only">profile of {m.name}</span>
                </a>
              )}
            </div>
          </li>
        ))}
        {pending.map((m, i) => (
          <li key={`pending-${i}`} aria-hidden className={cn("rounded-2xl border border-dashed border-line-strong bg-ink-900/40 p-5")}>
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-ink-800/50 text-subtle">
              <UserRound className="size-10" strokeWidth={1} />
            </div>
            <p className="mt-4 font-display text-fg/60">{m.name}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{m.role} · to verify</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
