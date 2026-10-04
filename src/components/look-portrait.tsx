import type { CSSProperties } from "react";

/** A single compressed atlas keeps all ten previews ready without ten downloads. */
export function LookPortrait({ tile, alt, decorative = false, className = "" }: {
  tile: number; alt: string; decorative?: boolean; className?: string;
}) {
  const style = {
    backgroundPosition: `${(tile % 4) * 100 / 3}% ${Math.floor(tile / 4) * 50}%`,
  } as CSSProperties;
  return <div className={`look-portrait ${className}`} style={style}
    role={decorative ? undefined : "img"} aria-label={decorative ? undefined : alt}
    aria-hidden={decorative ? true : undefined} />;
}
