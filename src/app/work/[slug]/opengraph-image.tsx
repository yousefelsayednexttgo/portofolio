import { ImageResponse } from "next/og";
import { SocialCard } from "@/components/social-card";
import { projects } from "@/data/portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(p => p.slug === slug);
  return new ImageResponse(<SocialCard name={project?.brand || "Selected work"} headline={project?.title || "A connected approach to e-commerce growth."} eyebrow="CONCEPT CASE STUDY · ILLUSTRATIVE PROJECT" />, size);
}
