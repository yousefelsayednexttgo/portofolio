import type { CSSProperties } from "react";
import { BackgroundSpotlight } from "@/components/background-spotlight";

const particles = [
  [8, 18, 19, -7], [19, 68, 24, -13], [29, 36, 21, -4],
  [39, 86, 26, -18], [49, 12, 23, -10], [58, 57, 20, -15],
  [68, 27, 25, -3], [76, 77, 22, -12], [86, 44, 27, -20],
  [94, 16, 24, -8], [12, 91, 28, -16], [91, 93, 21, -6],
];

export function SiteBackground() {
  return <div className="site-background" aria-hidden="true">
    <div className="background-glow background-glow-left" />
    <div className="background-glow background-glow-right" />
    <div className="background-glow background-glow-center" />
    <BackgroundSpotlight />
    <div className="background-grid-motion">
      <div className="background-grid" />
      <div className="background-shimmer" />
      <div className="background-trails">
        {Array.from({ length: 5 }, (_, index) => <span key={index} className={`background-trail background-trail-${index + 1}`} />)}
      </div>
    </div>
    <div className="background-particles">
      {particles.map(([x, y, duration, delay], index) => <span key={index} style={{
        left: `${x}%`, top: `${y}%`, "--float-duration": `${duration}s`, "--float-delay": `${delay}s`,
      } as CSSProperties} />)}
    </div>
    <div className="background-grain" />
  </div>;
}
