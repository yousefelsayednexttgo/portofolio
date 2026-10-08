"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

const dashboardRows = [
  [
    { name: "Meta Ads · Purchase results", category: "CAMPAIGNS & PERFORMANCE", image: "/images/results/meta-purchases.jpeg", width: 1000, height: 777, alt: "Meta Ads results showing 1,157 purchases and an average purchase ROAS of 7.88" },
    { name: "Shopify · Last 30 days", category: "STORE & CONVERSION", image: "/images/results/shopify-30-days.png", width: 1444, height: 638, alt: "Shopify analytics for the last 30 days showing EGP 2.95M in sales and 2,456 orders" },
    { name: "Shopify · Last 90 days", category: "STORE & CONVERSION", image: "/images/results/shopify-90-days.png", width: 1454, height: 628, alt: "Shopify analytics for the last 90 days showing EGP 10.86M in sales and 8,205 orders" },
  ],
  [
    { name: "Meta Ads · Jun–Sep 2026", category: "CAMPAIGNS & PERFORMANCE", image: "/images/results/meta-ads-jun-sep.png", width: 655, height: 658, alt: "Meta Ads results from June 16 to September 16, 2026 showing an average purchase ROAS of 9.50" },
    { name: "Shopify · August 2026", category: "STORE & CONVERSION", image: "/images/results/shopify-august-2026.png", width: 1714, height: 872, alt: "Shopify analytics for August 2026 showing EGP 1.01M in sales and 705 orders" },
    { name: "Google Ads · December 2025", category: "CAMPAIGNS & PERFORMANCE", image: "/images/results/google-ads-december-2025.jpeg", width: 1280, height: 304, alt: "Google Ads overview for December 1–14, 2025 showing 81.3K clicks and 4.54M impressions" },
  ],
  [
    { name: "Shopify · July 2026", category: "STORE & CONVERSION", image: "/images/results/shopify-july-2026.png", width: 1719, height: 932, alt: "Shopify analytics for July 2026 showing EGP 7.94M in sales and 6,280 orders" },
    { name: "Meta Ads · Performance results", category: "CAMPAIGNS & PERFORMANCE", image: "/images/results/meta-performance.png", width: 1592, height: 988, alt: "Meta Ads performance results showing 2,446 purchases and a 4.08 percent conversion rate" },
  ],
];

export function DashboardCarousel() {
  const [paused, setPaused] = useState(false);

  return <div id="service-examples" className="dashboard-carousel section-anchor" role="region" aria-labelledby="dashboard-carousel-title" data-paused={paused ? "" : undefined}>
    <div className="dashboard-carousel-header">
      <div><p className="eyebrow"><span />02 / RESULTS</p><h3 id="dashboard-carousel-title">A look inside the results.</h3><p className="dashboard-carousel-note">Campaign performance and Shopify analytics.</p></div>
      <button type="button" className="dashboard-motion-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume dashboard animation" : "Pause dashboard animation"}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}{paused ? "Resume motion" : "Pause motion"}
      </button>
    </div>
    <div className="dashboard-carousel-rows">
      {dashboardRows.map((dashboards, row) => <div key={row} className="dashboard-marquee-row">
        <div className="dashboard-marquee-track">
          {[0, 1].map(copy => <div key={copy} className="dashboard-marquee-group" aria-hidden={copy === 1 ? true : undefined}>
            {[...dashboards, ...dashboards].map((dashboard, index) => {
              const decorative = copy > 0 || index >= dashboards.length;
              return <figure key={index} className="dashboard-slide" aria-hidden={decorative ? true : undefined}>
                <div className="dashboard-slide-top"><span>{dashboard.category}</span></div>
                <Image src={dashboard.image} alt={decorative ? "" : dashboard.alt} width={dashboard.width} height={dashboard.height} sizes="(max-width: 640px) 280px, (prefers-reduced-motion: reduce) 600px, 380px" />
                <figcaption><span>{dashboard.name}</span><span aria-hidden="true">↗</span></figcaption>
              </figure>;
            })}
          </div>)}
        </div>
      </div>)}
    </div>
  </div>;
}
