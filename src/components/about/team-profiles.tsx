import Image from "next/image";
import { ArrowUpRight, UserRound } from "lucide-react";
import { publishedTeam, showPendingProfiles, team, type TeamMember } from "@/content/site";

const initials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

function Portrait({ m }: { m: TeamMember }) {
  if (m.photo) {
    return (
      <Image src={m.photo} alt={`Portrait of ${m.name}, ${m.role} at DropTraQ`} fill sizes="(min-width:1024px) 300px, 50vw"
        className="object-cover transition duration-500 group-hover:scale-[1.02]" />
    );
  }
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink-800 via-ink-850 to-ink-700">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
      <span aria-hidden className="relative font-display text-5xl font-semibold tracking-tight text-cyan">{initials(m.name)}</span>
    </div>
  );
}

/**
 * Team profile grid, driven entirely by src/content/site.ts.
 * Production: only published profiles render.
 * Development: unpublished profiles render as dashed "pending" cards.
 */
export function TeamProfiles({ className }: { className?: string }) {
  const people = publishedTeam();
  const pending = showPendingProfiles ? team.filter((m) => !m.published) : [];
  if (people.length === 0 && pending.length === 0) return null;

  return (
    <div className={className}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {people.map((m) => (
          <li key={m.name} className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-850 transition-colors hover:border-cyan/40">
            <div className="relative aspect-[5/4] overflow-hidden border-b border-line bg-ink-800">
              <Portrait m={m} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg leading-snug text-fg">{m.name}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-cyan">{m.role}</p>
              {m.bio && <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>}
              {m.linkedin && (
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-fg hover:text-cyan">
                  LinkedIn <ArrowUpRight aria-hidden className="size-3.5" /><span className="sr-only">profile of {m.name}</span>
                </a>
              )}
            </div>
          </li>
        ))}
        {pending.map((m, i) => (
          <li key={`pending-${i}`} aria-hidden className="rounded-2xl border border-dashed border-line-strong bg-ink-850/60 p-5">
            <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-ink-800 text-subtle">
              <UserRound className="size-10" strokeWidth={1} />
            </div>
            <p className="mt-4 font-display text-fg/60">{m.name}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-subtle">{m.role} · dev only, unpublished</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
