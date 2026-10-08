import { Contact, Hero, Services, Work } from "@/components/portfolio";
import { MobileContact } from "@/components/mobile-contact";
import { profile } from "@/data/portfolio";

export default function Home() {
  const contactEnabled = Boolean((process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL) || process.env.FORMSPREE_FORM_ID);
  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: "Shopify Developer & Media Buyer", description: profile.description, url: profile.siteUrl, knowsAbout: ["Shopify development", "Conversion rate optimization", "Performance marketing", "Meta Ads", "TikTok Ads"], ...(profile.linkedin ? { sameAs: [profile.linkedin] } : {}) };
  return <main id="main-content" className="landing-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /><Hero /><Work /><Contact enabled={contactEnabled} /><Services /><MobileContact /></main>;
}


