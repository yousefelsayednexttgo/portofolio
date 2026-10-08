export function SectionHeading({ eyebrow, title, description, className = "" }: { eyebrow: string; title: string; description?: string; className?: string }) {
  return <div className={`section-heading ${className}`}><p className="eyebrow"><span />{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
