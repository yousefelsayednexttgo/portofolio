import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { copy, profile, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const project = projects.find(p => p.slug === slug); if (!project) return {};
  const title = `${project.brand} — Concept Case Study`;
  return { title, description: project.description, alternates: { canonical: `/work/${slug}` }, openGraph: { title, description: project.description, url: `/work/${slug}`, images: [{ url: `/work/${slug}/opengraph-image`, width: 1200, height: 630, alt: project.title }] }, twitter: { card: "summary_large_image", title, description: project.description, images: [`/work/${slug}/opengraph-image`] } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = projects.find(p => p.slug === slug); if (!project) notFound();
  const sections = [{ label: "01 / CHALLENGE", title: "Start with the real friction.", text: project.challenge }, { label: "02 / STRATEGY", title: "Connect the dots.", text: project.strategy }, { label: "03 / DEVELOPMENT", title: "Build a better journey.", text: project.development }, { label: "04 / MARKETING", title: "Bring the right people to it.", text: project.marketing }];
  return <main id="main-content" className="case-page"><div className="container"><Link href="/#work" className="back-link">← Back to selected work</Link><div className="case-header"><p className="eyebrow"><span />{project.brand} / {project.category}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p><div className="case-tags"><span className="tag">{project.discipline === "Both" ? "Shopify + Media Buying" : project.discipline}</span>{project.isDemo && <span className="tag">CONCEPT CASE STUDY</span>}</div></div>
  <p className="case-demo-notice">This is a concept project for a fictional brand. The strategy and all numerical results are illustrative, not verified client outcomes.</p><div className={`case-cover ${project.theme}`}><Image src={project.image} alt={project.imageAlt} width={1200} height={850} preload className="project-art" /></div>
  <div className="case-content"><aside><p className="eyebrow">THE ENGAGEMENT</p><h2>{project.brand}</h2><p>{project.solution}</p><h3>Tools & expertise</h3><div className="case-tags">{project.technologies.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div></aside><div>{sections.map(section => <section className="case-section" key={section.label}><p className="eyebrow">{section.label}</p><h2>{section.title}</h2><p>{section.text}</p></section>)}</div></div>
  <section className="case-results"><p className="eyebrow">05 / ILLUSTRATIVE RESULTS</p><h2>What success could look like.</h2><p>Example figures to demonstrate the reporting format. Replace with verified measurements and attribution context for a real engagement.</p><dl>{project.results.map(result => <div key={result.label}><dt>{result.label}</dt><dd>{result.value}</dd></div>)}</dl></section>
  <section className="case-cta"><h2>Let’s find your next step.</h2><p>A store, a campaign, or the whole journey. Let’s talk about your business.</p><Link href="/#contact" className="button" data-cta="case-study">{copy.contactCta}</Link></section>
  <section className="case-related"><p className="eyebrow">MORE CONCEPT WORK</p><div className="projects-grid">{projects.filter(p => p.slug !== slug).map(p => <ProjectCard key={p.slug} project={p} />)}</div></section></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, description: project.description, creator: { "@type": "Person", name: profile.name }, url: `${profile.siteUrl}/work/${slug}` }).replace(/</g, "\\u003c") }} /></main>;
}
