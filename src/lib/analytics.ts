export type ConversionEvent = "cta_click" | "form_start" | "inquiry_success";

// Connect a listener or tag manager to these events. Never include form values.
export function trackConversion(event: ConversionEvent, properties: Record<string, string> = {}) {
  const detail = { event, ...properties };
  window.dispatchEvent(new CustomEvent("portfolio:conversion", { detail }));
  const analyticsWindow = window as Window & { dataLayer?: Record<string, string>[] };
  analyticsWindow.dataLayer?.push(detail);
}
