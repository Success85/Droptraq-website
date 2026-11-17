import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Official DropTraQ drop icon (from the company's brand folder) paired with
 * a typeset wordmark, so it stays legible on the dark site background.
 */
export function Logo({ className, size = 30, href = "/" }: { className?: string; size?: number; href?: string | null }) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image src="/images/brand/droptraq-icon-96.png" alt="" width={size} height={size} className="shrink-0" style={{ width: size, height: size }} />
      <span className="font-display text-[1.28rem] font-semibold tracking-tight text-fg">
        Drop<span className="text-brand">TraQ</span>
      </span>
    </span>
  );
  if (!href) return mark;
  return (
    <Link href={href} aria-label="DropTraQ home" className="rounded-md">
      {mark}
    </Link>
  );
}
