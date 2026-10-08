import Link from "next/link";
import { copy, navigation, profile } from "@/data/portfolio";

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><div><Link href="/#home" className="footer-logo">{profile.name}<span>.</span></Link><p>{profile.role}</p><p className="muted">Stores that convert. Ads that scale.</p></div><nav aria-label="Footer navigation">{navigation.filter(item => item.label !== "Home").map(item => <Link key={item.label} href={item.href}>{item.label}</Link>)}</nav>
      <div className="footer-socials">{profile.email && <a href={`mailto:${profile.email}`}>Email</a>}{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}{profile.whatsapp && <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}<Link href="/#contact" data-cta="footer">{copy.contactCta}</Link></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span><span>{copy.footer}</span></div>
  </div></footer>;
}
