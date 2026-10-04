"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Enhance the server-rendered page; content stays visible without JavaScript. */
export function MotionEffects() {
  const pathname = usePathname();
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const seen = new Set<HTMLElement>();
    const depthScenes = new Set<HTMLElement>();
    const activeScenes = new Set<HTMLElement>();
    const progressBar = progress.current;
    const hero = main.querySelector<HTMLElement>("[data-hero-motion]");
    let revealObserver: IntersectionObserver | undefined;
    let heroObserver: IntersectionObserver | undefined;
    let depthObserver: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    let heroVisible = false;
    let frame = 0;

    function reveal(element: HTMLElement, immediate = false) {
      if (immediate) element.dataset.motionImmediate = "true";
      element.dataset.motionState = "visible";
      revealObserver?.unobserve(element);
    }

    function registerReveals() {
      main!.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        const bounds = element.getBoundingClientRect();
        // Never hide content the visitor has already reached, including anchors.
        if (bounds.top < window.innerHeight || element.contains(document.activeElement)) {
          reveal(element, true);
          return;
        }
        element.dataset.motionState = "pending";
        revealObserver?.observe(element);
      });
      seen.forEach((element) => { if (!element.isConnected) seen.delete(element); });
      main!.querySelectorAll<HTMLElement>("[data-scroll-depth]").forEach((element) => {
        if (depthScenes.has(element)) return;
        depthScenes.add(element);
        depthObserver?.observe(element);
      });
      depthScenes.forEach((element) => {
        if (!element.isConnected) {
          depthObserver?.unobserve(element);
          depthScenes.delete(element);
          activeScenes.delete(element);
        }
      });
      scheduleDepth();
    }

    function updateDepth() {
      frame = 0;
      if (preference.matches) return;
      // Batch layout reads before style writes; only on-screen photographs participate.
      const viewport = window.innerHeight;
      const scrollRange = document.documentElement.scrollHeight - viewport;
      const scenes = [...activeScenes].map((element) => ({ element, bounds: element.getBoundingClientRect() }));
      const distance = Math.min(Math.max(window.scrollY, 0), 900);
      const amount = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;
      if (progressBar) progressBar.style.transform = `scaleX(${amount.toFixed(4)})`;
      if (hero && heroVisible && desktop.matches) {
        hero.style.setProperty("--portrait-offset", `${Math.min(distance * 0.018, 10).toFixed(2)}px`);
        hero.style.setProperty("--studio-offset", `${(-distance * 0.018).toFixed(2)}px`);
      }
      scenes.forEach(({ element, bounds }) => {
        const position = (viewport / 2 - bounds.top - bounds.height / 2) / ((viewport + bounds.height) / 2);
        const shift = -Math.max(-1, Math.min(position, 1)) * (desktop.matches ? 28 : 12);
        element.style.setProperty("--depth-shift", `${shift.toFixed(2)}px`);
      });
    }

    function scheduleDepth() {
      if (!frame && !preference.matches) {
        frame = window.requestAnimationFrame(updateDepth);
      }
    }

    function resetDepth() {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      hero?.style.removeProperty("--portrait-offset");
      hero?.style.removeProperty("--studio-offset");
      depthScenes.forEach((element) => element.style.removeProperty("--depth-shift"));
      scheduleDepth();
    }

    function stopMotion() {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      depthObserver?.disconnect();
      mutationObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      heroVisible = false;
      hero?.style.removeProperty("--portrait-offset");
      hero?.style.removeProperty("--studio-offset");
      if (progressBar) progressBar.style.transform = "scaleX(0)";
      depthScenes.forEach((element) => element.style.removeProperty("--depth-shift"));
      depthScenes.clear();
      activeScenes.clear();
      seen.forEach((element) => {
        delete element.dataset.motionState;
        delete element.dataset.motionImmediate;
      });
      seen.clear();
    }

    function startMotion() {
      stopMotion();
      if (preference.matches || !("IntersectionObserver" in window)) return;

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0, rootMargin: "0px 0px -12px 0px" });
      depthObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) activeScenes.add(element);
          else activeScenes.delete(element);
        });
        scheduleDepth();
      });
      registerReveals();
      // Filtered gallery cards and streamed route content receive the same treatment.
      mutationObserver = new MutationObserver(registerReveals);
      mutationObserver.observe(main!, { childList: true, subtree: true });

      if (hero) {
        heroObserver = new IntersectionObserver(([entry]) => {
          heroVisible = entry.isIntersecting;
          scheduleDepth();
        });
        heroObserver.observe(hero);
      }
    }

    function showFocusedContent(event: FocusEvent) {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-reveal]");
      if (element) reveal(element, true);
    }

    startMotion();
    preference.addEventListener("change", startMotion);
    desktop.addEventListener("change", resetDepth);
    window.addEventListener("scroll", scheduleDepth, { passive: true });
    window.addEventListener("resize", scheduleDepth);
    main.addEventListener("focusin", showFocusedContent);

    return () => {
      stopMotion();
      preference.removeEventListener("change", startMotion);
      desktop.removeEventListener("change", resetDepth);
      window.removeEventListener("scroll", scheduleDepth);
      window.removeEventListener("resize", scheduleDepth);
      main.removeEventListener("focusin", showFocusedContent);
    };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true"><span ref={progress} /></div>;
}
