"use client";

import { useEffect, useRef } from "react";

export function BackgroundSpotlight() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = glow.current;
    if (!element) return;

    const background = element.parentElement;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 0;
    let y = 0;

    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      element!.removeAttribute("data-active");
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        element!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        element!.setAttribute("data-active", "");
        frame = 0;
      });
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }

    function update() {
      window.removeEventListener("pointermove", move);
      hide();
      background?.toggleAttribute("data-paused", document.hidden);
      if (pointer.matches && !reducedMotion.matches && !document.hidden) {
        window.addEventListener("pointermove", move, { passive: true });
      }
    }

    update();
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", update);
    pointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", update);
      pointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      background?.removeAttribute("data-paused");
    };
  }, []);

  return <div ref={glow} className="background-spotlight" />;
}
