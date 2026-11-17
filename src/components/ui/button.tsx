import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-cyan text-white hover:bg-cyan-soft shadow-[0_8px_30px_-10px_rgba(36,200,216,0.7)]",
  secondary:
    "border border-line-strong bg-ink-800/60 text-fg hover:border-cyan/60 hover:bg-ink-700/80 backdrop-blur",
  ghost: "text-fg hover:text-cyan px-0",
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px disabled:opacity-60 disabled:pointer-events-none";

export function ButtonLink({
  href, children, variant = "primary", arrow = false, className, ...rest
}: { href: string; children: React.ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link href={href} className={cn(base, styles[variant], className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </Link>
  );
}

export function Button({
  children, variant = "primary", className, ...rest
}: { variant?: Variant } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}
