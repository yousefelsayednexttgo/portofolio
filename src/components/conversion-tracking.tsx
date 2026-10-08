"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

export function ConversionTracking() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-cta]");
      if (link) trackConversion("cta_click", { placement: link.dataset.cta || "unknown" });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
