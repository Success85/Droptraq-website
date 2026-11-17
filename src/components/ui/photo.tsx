import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Photo as PhotoT } from "@/content/site";

/** Photograph with consistent framing, optional caption, responsive sizing. */
export function Photo({
  photo, className, imgClassName, sizes, caption, preload, position = "center",
}: {
  photo: PhotoT; className?: string; imgClassName?: string; sizes: string; caption?: React.ReactNode;
  preload?: boolean; position?: string;
}) {
  return (
    <figure className={cn("group relative overflow-hidden rounded-2xl border border-line bg-ink-800", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: position }}
        className={cn("object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.025]", imgClassName)}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/75 via-night/5 to-transparent" />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-white/90 sm:p-5">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
