import { ImageResponse } from "next/og";
import { SocialCard } from "@/components/social-card";
import { profile } from "@/data/portfolio";
export const alt = `${profile.name} — Shopify Developer & Media Buyer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<SocialCard name={profile.name} headline={profile.headline} />, size); }
