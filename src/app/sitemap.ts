import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/portfolio";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: profile.siteUrl, changeFrequency: "monthly", priority: 1 }, ...projects.map(project => ({ url: `${profile.siteUrl}/work/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))]; }
