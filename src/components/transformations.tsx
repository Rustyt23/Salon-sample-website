"use client";

import { useRef, useState, type CSSProperties } from "react";
import { ChevronsLeftRight, Sparkles } from "lucide-react";
import { transformations } from "@/data/looks";
import { LookPortrait } from "./look-portrait";
import { SectionHeading } from "./ui";

export function Transformations() {
  const [selected, setSelected] = useState(0);
  const [position, setPosition] = useState(50);
  const [shine, setShine] = useState(0);
  const shone = useRef(false);
  const transformation = transformations[selected];
  function compare(value: number) {
    setPosition(value);
    if (value <= 10 && !shone.current) { shone.current = true; setShine((count) => count + 1); }
  }
  function choose(index: number) {
    if (index === selected) return;
    setSelected(index); setPosition(50); shone.current = false; setShine(0);
  }

  return <section className="section container transformation-section" id="transformations" aria-label="See the Difference">
    <SectionHeading eyebrow="SEE THE DIFFERENCE" title={<>See what a little<br /><em>change can do.</em></>} description="A fresh shape, a softer shade, a completely different feeling." />
    <div className="comparison-stage" data-reveal style={{ "--split": `${position}%` } as CSSProperties}>
      <div className="comparison-layer"><LookPortrait tile={transformation.before} alt={`${transformation.name}: illustrative before look`} /></div>
      <div className="comparison-layer comparison-after"><LookPortrait tile={transformation.after} alt={`${transformation.name}: illustrative after look`} /></div>
      <span className="comparison-label before-label" style={{ opacity: position > 8 ? 1 : 0 }}>Before</span>
      <span className="comparison-label after-label" style={{ opacity: position < 92 ? 1 : 0 }}>After</span>
      <div className="comparison-divider" aria-hidden="true"><span><ChevronsLeftRight size={22} strokeWidth={1.5} /></span></div>
      {shine > 0 && <div className="comparison-shine" key={`${selected}-${shine}`} aria-hidden="true"><Sparkles size={25} strokeWidth={1} /></div>}
      <input className="comparison-range" type="range" min="0" max="100" step="1" value={position}
        aria-label={`Compare ${transformation.name} before and after`}
        aria-valuetext={`${100 - position}% of the after look is visible`}
        onChange={(event) => compare(Number(event.target.value))} />
      <span className="comparison-hint" aria-hidden="true">DRAG TO DISCOVER</span>
    </div>
    <div className="transformation-selectors" role="group" aria-label="Choose a transformation">
      {transformations.map((item, index) => <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => choose(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
    </div>
    <p className="transformation-description" aria-live="polite">{transformation.description}</p>
  </section>;
}
