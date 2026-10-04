"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { studioCategories, studioLooks, type StudioCategory } from "@/data/looks";
import { LookPortrait } from "./look-portrait";

export function StyleStudio() {
  const [category, setCategory] = useState<StudioCategory>("Colour");
  const [choices, setChoices] = useState({ Cut: "layers", Colour: "caramel", Style: "waves" });
  const [previous, setPrevious] = useState<number | null>(null);
  const [revision, setRevision] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const look = studioLooks.find((item) => item.id === choices[category])!;
  const options = studioLooks.filter((item) => item.category === category);

  function selectCategory(next: StudioCategory) {
    if (next === category) return;
    setPrevious(look.tile); setCategory(next); setRevision((value) => value + 1);
  }
  function selectLook(id: string) {
    if (id === look.id) return;
    setPrevious(look.tile); setChoices({ ...choices, [category]: id }); setRevision((value) => value + 1);
  }
  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault(); selectCategory(studioCategories[next]); tabs.current[next]?.focus();
  }

  return <section className="style-studio" id="style-studio" aria-labelledby="studio-title">
    <div className="container section">
      <div className="studio-heading" data-reveal>
        <div><p className="eyebrow">EXPLORE YOUR NEXT LOOK</p><h2 id="studio-title">The Style <em>Studio.</em></h2></div>
        <p>A new cut. A different shade.<br />Find a direction that feels like you.</p>
      </div>
      <div className="studio-layout">
        <div className="studio-frame" data-reveal style={{ "--studio-tone": look.swatch ?? "#d8b888" } as CSSProperties}>
          {previous !== null && <LookPortrait key={`old-${revision}`} tile={previous} alt="" decorative className="studio-photo studio-photo-out" onAnimationEnd={() => setPrevious(null)} />}
          <LookPortrait key={`new-${revision}`} tile={look.tile} alt={`Illustrative model preview: ${look.name}`} className={`studio-photo ${revision > 0 ? "studio-photo-in" : ""}`} />
          {revision > 0 && <span key={`highlight-${revision}`} className="studio-highlight" aria-hidden="true" />}
          <span className="studio-edition">LOOK GOOD / THE EDIT</span>
          <div className="studio-photo-caption"><span>{category.toUpperCase()} / {String(look.tile + 1).padStart(2, "0")}</span><p>{look.name}</p></div>
          <span className="studio-frame-corner" aria-hidden="true" />
        </div>
        <div className="studio-controls" data-reveal data-reveal-order="1">
          <p className="studio-step"><span>01</span> CHOOSE YOUR DIRECTION</p>
          <div className="studio-tabs" role="tablist" aria-label="Style Studio categories">
            <span className="studio-tab-pill" aria-hidden="true" style={{ transform: `translateX(${studioCategories.indexOf(category) * 100}%)` }} />
            {studioCategories.map((item, index) => <button key={item} id={`studio-tab-${item.toLowerCase()}`} ref={(element) => { tabs.current[index] = element; }}
              type="button" role="tab" aria-selected={category === item} aria-controls="studio-options" tabIndex={category === item ? 0 : -1}
              onClick={() => selectCategory(item)} onKeyDown={(event) => moveTab(event, index)}>{item}</button>)}
          </div>
          <div id="studio-options" role="tabpanel" aria-labelledby={`studio-tab-${category.toLowerCase()}`}>
            <p className="studio-step"><span>02</span> MAKE IT YOURS</p>
            <fieldset className="studio-options"><legend className="sr-only">Choose a {category.toLowerCase()} look</legend>
              {options.map((item) => <label key={item.id} className={`studio-option ${item.id === look.id ? "is-selected" : ""}`}>
                <input type="radio" name={`studio-${category}`} checked={item.id === look.id} onChange={() => selectLook(item.id)} value={item.id} />
                {item.swatch ? <span className="studio-swatch" style={{ background: item.swatch }} aria-hidden="true" /> : <span className="studio-option-number" aria-hidden="true">{String(options.indexOf(item) + 1).padStart(2, "0")}</span>}
                <span>{item.name}</span><Check size={16} className="studio-option-check" aria-hidden="true" />
              </label>)}
            </fieldset>
          </div>
          <div className="studio-look-copy" aria-live="polite" aria-atomic="true"><div key={revision} className={revision > 0 ? "studio-copy-enter" : ""}><h3>{look.name}</h3><p>{look.description}</p><span>{look.detail}</span></div></div>
          <Link className="button button-light studio-book" href={`/book?service=${look.service}&look=${encodeURIComponent(look.name)}`}>Book This Look <ArrowUpRight size={19} aria-hidden="true" /></Link>
          <p className="studio-consultation"><Sparkles size={14} aria-hidden="true" /> Your stylist will tailor the look to you.</p>
        </div>
      </div>
    </div>
  </section>;
}
