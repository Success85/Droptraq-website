import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, id, align = "left", className, as: Tag = "h2" }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          <span aria-hidden className="h-px w-8 bg-cyan/60" />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn(
        "font-display font-semibold text-fg",
        Tag === "h1" ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl" : "text-3xl leading-[1.1] sm:text-4xl lg:text-[3.1rem]",
      )}>
        {title}
      </Tag>
      {intro && <div className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{intro}</div>}
    </div>
  );
}
