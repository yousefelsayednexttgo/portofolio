import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/portfolio";

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <article className="project-card">
    <Link href={`/work/${project.slug}`} className={`project-image ${project.theme}`} aria-label={`View ${project.brand} ${project.isDemo ? "concept " : ""}case study`}><Image src={project.image} alt={project.imageAlt} width={1200} height={850} className="project-art" />{project.isDemo && <span className="image-label">CONCEPT PROJECT</span>}<span className="project-view">View case study</span></Link>
    <div className="project-meta"><span>{project.brand} <span className="muted">/ {project.category}</span></span><span className="tag">{project.discipline === "Both" ? "Shopify + Ads" : project.discipline}</span></div>
    <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
    <p>{project.solution}</p>
    {!compact && <details className="project-challenge"><summary>The challenge</summary><p>{project.challenge}</p></details>}
    {!compact && <div className="project-result"><div><span className="result-label">{project.isDemo ? "Example result" : "Project result"}</span><strong>{project.results[0].value}</strong></div><span>{project.results[0].label}</span></div>}
    <div className="project-tech">{project.technologies.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>
  </article>;
}
