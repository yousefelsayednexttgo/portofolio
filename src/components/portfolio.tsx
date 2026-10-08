import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Mail, MessageCircle, BriefcaseBusiness } from "lucide-react";
import { copy, featuredWebsites, landingServices, landingSteps, problems, profile } from "@/data/portfolio";
import { ContactForm } from "@/components/contact-form";
import { DashboardCarousel } from "@/components/dashboard-carousel";
import { Icon } from "@/components/icon";
import { WebsiteGallery } from "@/components/website-gallery";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Hero() {
  return <section id="home" className="hero landing-hero section-anchor">
    <div className="container">
      <p className="eyebrow"><span />SHOPIFY DEVELOPMENT & PERFORMANCE MARKETING</p>
      <div className="landing-hero-grid">
        <div>
          <h1>Turn more Shopify<br className="desktop-break" /> visitors into <em>customers.</em></h1>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-actions"><Link href="#contact" className="button" data-cta="hero">{copy.contactCta}<ArrowUpRight size={18} aria-hidden="true" /></Link><Link href="#work" className="hero-secondary">Explore my work<ArrowRight size={16} aria-hidden="true" /></Link></div>
          <p className="hero-reassurance">Share your goals. Get a clear next step for your project.</p>
        </div>
        <aside className="hero-offer" aria-label="Ways I can help">
          <p className="offer-label">YOUR NEXT MOVE</p>
          <h2>A better store.<br />{" "}A connected growth plan.</h2>
          <ul><li><Check size={17} aria-hidden="true" /><span><strong>Build with purpose</strong>Shopify stores shaped around the buying journey.</span></li><li><Check size={17} aria-hidden="true" /><span><strong>Remove buying friction</strong>Clearer product pages, smoother mobile experiences.</span></li><li><Check size={17} aria-hidden="true" /><span><strong>Connect ads to the store</strong>Campaigns, landing pages, and tracking working together.</span></li></ul>
          <Link href="#services" className="offer-link">Find the right starting point<ArrowRight size={16} aria-hidden="true" /></Link>
        </aside>
      </div>
      <div className="hero-capabilities"><span>ONE PARTNER, FROM CLICK TO CHECKOUT</span><ul><li>Shopify</li><li>Conversion optimization</li><li>Meta & TikTok Ads</li></ul></div>
    </div>
  </section>;
}

export function Services() {
  return <section id="services" className="section section-anchor section-tinted services-approach"><div className="container">
    <Reveal><SectionHeading eyebrow="04 / SERVICES & APPROACH" title="From challenge to a clear plan." description="Find what’s holding growth back, choose the right service, and agree on a focused path forward." /></Reveal>
    <div id="problems" className="services-block section-anchor">
      <Reveal><div className="services-block-heading"><h3>Start with the challenge.</h3><p>Your next opportunity may be in the store, the campaign, or the connection between them.</p></div></Reveal>
      <div className="problem-grid">{problems.map((problem, index) => <Reveal key={problem.title}><article className="problem-card"><span className="problem-number">0{index + 1}</span><h4>{problem.title}</h4><p>{problem.description}</p><span className="problem-direction"><ArrowRight size={15} aria-hidden="true" />{problem.direction}</span></article></Reveal>)}</div>
    </div>
    <div className="services-block">
      <Reveal><div className="services-block-heading"><h3>Choose your starting point.</h3><p>Start with the part of your business that needs attention. Connect the rest as your project grows.</p></div></Reveal>
      <div className="landing-services">{landingServices.map(service => <Reveal key={service.title}><article className="landing-service"><span className="service-icon"><Icon name={service.icon} size={25} /></span><p className="service-for">{service.audience}</p><h4>{service.title}</h4><p>{service.description}</p><ul>{service.items.map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul><Link href="#contact" className="service-link" data-cta={service.placement}>{copy.contactCta}<ArrowUpRight size={16} aria-hidden="true" /></Link></article></Reveal>)}</div>
      <div className="service-bottom"><p>Need both development and advertising? We can connect them in one scope.</p><Link href="#contact" data-cta="services-combined">Let’s talk about the whole journey<ArrowRight size={16} aria-hidden="true" /></Link></div>
    </div>
    <div id="process" className="services-block section-anchor">
      <Reveal><div className="services-block-heading"><h3>A clear way forward.</h3><p>You’ll know what we’re solving, what’s included, and how the work will be assessed.</p></div></Reveal>
      <div className="landing-process">{landingSteps.map((step, index) => <Reveal key={step.title}><article className="landing-step"><span>0{index + 1}</span><h4>{step.title}</h4><p>{step.description}</p></article></Reveal>)}</div>
      <p className="process-note"><Check size={17} aria-hidden="true" />Scope and priorities agreed before work begins.</p>
    </div>
  </div></section>;
}

export function Work() {
  return <section id="work" className="section section-anchor landing-work"><div className="container">
    <Reveal><div className="website-gallery-heading"><SectionHeading eyebrow="01 / SELECTED WORK" title="From an idea to a live store." description="A look at my storefronts and performance results. Explore the dashboards, then visit the live websites." /><span className="website-gallery-count">0{featuredWebsites.length} PROJECTS <span aria-hidden="true">↘</span></span></div></Reveal>
    <DashboardCarousel />
    <Reveal><div className="website-gallery-intro"><p className="eyebrow"><span />LIVE WEBSITES</p><h3>Built by {profile.name}.</h3></div></Reveal>
    <WebsiteGallery />
    <div className="work-next"><p>Have a similar challenge in your business?</p><Link className="button button-outline" href="#contact" data-cta="work">{copy.contactCta}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
  </div></section>;
}

export function Contact({ enabled }: { enabled: boolean }) {
  const contacts = [
    { title: "WhatsApp", icon: MessageCircle, href: profile.whatsapp ? "https://wa.me/" + profile.whatsapp : "", detail: "Start a conversation" },
    { title: "Email", icon: Mail, href: profile.email ? "mailto:" + profile.email : "", detail: profile.email },
    { title: "LinkedIn", icon: BriefcaseBusiness, href: profile.linkedin, detail: "View my profile" },
  ].filter(contact => contact.href);
  return <section id="contact" className="section section-anchor contact-section"><div className="container contact-layout">
    <Reveal><SectionHeading eyebrow="03 / LET’S FIND YOUR NEXT STEP" title={"Tell me what you\nwant to improve."} description="A new Shopify store, a better buying journey, or campaigns that connect. Start with your biggest priority." />
      <ol className="contact-expectations"><li><span>01</span>Share your goal and where you are today.</li><li><span>02</span>I’ll review your inquiry and ask any useful follow-up questions.</li><li><span>03</span>We’ll discuss fit, scope, and the next step.</li></ol>
      {contacts.length > 0 && <div className="contact-links">{contacts.map(contact => <a key={contact.title} href={contact.href} data-cta={"contact-" + contact.title.toLowerCase()} target={contact.title === "Email" ? undefined : "_blank"} rel="noopener noreferrer"><contact.icon size={21} aria-hidden="true" /><span><strong>{contact.title}</strong><small>{contact.detail}</small></span></a>)}</div>}
      <p className="contact-location">{profile.location}</p>
    </Reveal><Reveal><ContactForm enabled={enabled} /></Reveal>
  </div></section>;
}


