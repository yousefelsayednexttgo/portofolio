/** Edit this file to personalize the site. Demo records are deliberately public and labeled. */
export const profile = {
  name: "Youseef",
  monogram: "Y",
  role: "Shopify Developer · Media Buyer",
  headline: "Turn more Shopify visitors into customers.",
  introduction: "I’m Youseef. I help e-commerce brands build better Shopify stores, remove buying friction, and connect paid ads to the customer journey. One partner for your store and your growth.",
  description: "Youseef is an independent Shopify developer and media buyer, connecting thoughtful storefronts with performance marketing to grow e-commerce brands.",
  image: "/images/profile.jpg",
  imageAlt: "Portrait of the portfolio owner wearing a black jacket against a burgundy background",
  email: "", // Add your real address. Empty values show a clear setup state, never a fake link.
  whatsapp: "", // International digits only, e.g. 201012345678.
  linkedin: "", // Full https://www.linkedin.com/in/... URL.
  location: "Working with e-commerce brands worldwide",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const navigation = [
  { label: "Selected work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "How it works", href: "/#process" },

];

export const copy = {
  contactCta: "Work with me",
  contact: { note: "Your project details are used only to respond to your inquiry." },
  footer: "Built for performance, conversion and growth.",
};

export const featuredWebsites = [
  {
    name: "Atheen",
    domain: "atheen-eg.com",
    url: "https://www.atheen-eg.com/",
    category: "APPAREL & E-COMMERCE",
    description: "An Arabic storefront for ihram clothing, with a distinctive brand presentation and clear product details.",
    image: "/images/projects/atheen-desktop.png",
    imageAlt: "Atheen homepage screenshot showing Arabic navigation and an ihram clothing hero in pink and teal",
    tags: ["Shopify", "Arabic storefront", "Apparel"],
    theme: "atheen",
  },
  {
    name: "Next & Go",
    domain: "nexttgo.com",
    url: "https://www.nexttgo.com/",
    category: "FURNITURE & HOME",
    description: "A home and furniture storefront bringing mattresses, living spaces, and everyday comfort into one shopping experience.",
    image: "/images/projects/nexttgo-desktop.png",
    imageAlt: "Next and Go homepage screenshot showing Arabic category navigation and a navy mattress promotion banner",
    tags: ["Shopify", "Product catalog", "Home & furniture"],
    theme: "nexttgo",
  },
  {
    name: "Orakit",
    domain: "orakit.myshopify.com",
    url: "https://orakit.myshopify.com/",
    category: "DENTAL SUPPLIES & E-COMMERCE",
    description: "A dental supplies storefront with a fresh teal identity, product categories, and dedicated offers and bundles.",
    image: "/images/projects/orakit-desktop.png",
    imageAlt: "Orakit homepage screenshot showing teal dental supply banners and categories for instruments, composite kits, and endodontic teeth",
    tags: ["Shopify", "Dental supplies", "Product catalog"],
    theme: "orakit",
  },
];

export type Project = {
  slug: string; brand: string; title: string; category: string; discipline: "Shopify" | "Media Buying" | "Both";
  image: string; imageAlt: string; theme: string; isDemo: boolean; description: string;
  challenge: string; strategy: string; development: string; marketing: string; solution: string;
  results: { value: string; label: string }[]; technologies: string[];
};

export const projects: Project[] = [
  {
    slug: "forma-storefront", brand: "FORMA", title: "A better storefront. A stronger first impression.", category: "Lifestyle & essentials", discipline: "Shopify", image: "/images/forma.svg", imageAlt: "FORMA concept storefront interface with editorial typography and a minimal product grid", theme: "forma", isDemo: true,
    description: "A concept Shopify redesign that turns a fragmented shopping journey into a focused, considered brand experience.",
    challenge: "This fictional lifestyle brand illustrates a common problem: a mobile storefront with unclear product information, slow pages, and friction before checkout.",
    strategy: "Make the product story clearer, simplify navigation, and give mobile customers a faster path to the cart. Define conversion and performance measurements before designing.",
    development: "A proposed modular Shopify theme with reusable Liquid sections, streamlined product templates, responsive imagery, and an accessible cart experience.",
    marketing: "Campaign-ready landing pages and a consistent message from the ad to the product page. A proposed analytics plan covers product views, cart additions, and purchases.",
    solution: "A mobile-first Shopify experience with clearer product storytelling and a faster path to purchase.",
    results: [{ value: "+32%", label: "Illustrative conversion lift" }, { value: "92", label: "Example performance score" }, { value: "−28%", label: "Illustrative load time" }],
    technologies: ["Shopify", "Liquid", "JavaScript", "CRO", "Technical SEO"],
  },
  {
    slug: "ritual-growth", brand: "RITUAL", title: "Connecting the campaign to the conversion.", category: "Beauty & personal care", discipline: "Both", image: "/images/ritual.svg", imageAlt: "RITUAL concept e-commerce storefront with a beauty brand layout", theme: "ritual", isDemo: true,
    description: "A concept growth engagement that connects paid social, product storytelling, and conversion optimization.",
    challenge: "This fictional beauty brand demonstrates how a mismatch between ad messaging and the storefront can weaken otherwise promising paid campaigns.",
    strategy: "Align the creative promise with the landing page, organize campaigns by intent, and establish dependable attribution before increasing spend.",
    development: "Proposed benefit-led landing pages, better product comparison, and a simpler mobile checkout journey supported by clear event tracking.",
    marketing: "A proposed Meta campaign structure with creative testing, warm-audience retargeting, and weekly decisions based on acquisition cost and contribution margin.",
    solution: "Aligned landing pages, a structured creative testing plan, and a connected Meta Ads funnel.",
    results: [{ value: "4.7×", label: "Illustrative ROAS" }, { value: "−24%", label: "Illustrative CPA change" }, { value: "+18%", label: "Illustrative AOV lift" }],
    technologies: ["Shopify", "Meta Ads", "Meta Pixel", "Google Tag Manager", "CRO"],
  },
  {
    slug: "stride-performance", brand: "STRIDE", title: "A smarter approach to paid social growth.", category: "Activewear", discipline: "Media Buying", image: "/images/stride.svg", imageAlt: "STRIDE concept campaign dashboard showing illustrative performance metrics", theme: "stride", isDemo: true,
    description: "A concept paid social strategy built around clean data, purposeful creative tests, and measured scaling.",
    challenge: "This fictional activewear brand represents a familiar challenge: inconsistent acquisition costs and limited insight into which creative drives useful demand.",
    strategy: "Audit the funnel, confirm purchase events, and establish a testing framework that evaluates creative and audiences against the same business goals.",
    development: "A proposed tracking audit, event deduplication plan, and mobile landing page improvements to make campaign traffic easier to convert.",
    marketing: "Proposed Meta and TikTok testing cycles, audience segmentation, retargeting, and budget rules based on verified performance rather than impressions alone.",
    solution: "A clear creative testing framework supported by conversion tracking and disciplined budget decisions.",
    results: [{ value: "−21%", label: "Illustrative CPA change" }, { value: "2.8%", label: "Example click-through rate" }, { value: "3.6×", label: "Illustrative ROAS" }],
    technologies: ["Meta Ads", "TikTok Ads", "GA4", "Conversion Tracking", "Reporting"],
  },
];

export const contactOptions = {
  services: ["Shopify Development", "Media Buying", "Shopify + Media Buying", "CRO", "Other"],
  adBudgets: ["Not applicable", "Under $1,000", "$1,000–$5,000", "$5,000–$20,000", "$20,000+", "Let’s discuss"],
  projectBudgets: ["Under $1,000", "$1,000–$3,000", "$3,000–$10,000", "$10,000+", "Let’s discuss"],
};

export const problems = [
  { title: "Visitors leave without buying.", description: "Product pages, mobile navigation, or the path to checkout may be making the decision harder.", direction: "Make the buying journey clearer" },
  { title: "The ads and store feel disconnected.", description: "A strong campaign needs a landing page that delivers on the promise and makes the next step obvious.", direction: "Align the click with the experience" },
  { title: "Your store needs a stronger foundation.", description: "A new launch or a growing brand needs a storefront that is easy to use, maintain, and improve.", direction: "Build around your customers" },
];

export const landingServices = [
  { title: "Shopify development", audience: "FOR A NEW STORE OR REDESIGN", icon: "store", description: "Build a storefront that makes your products easy to discover and your brand easy to understand.", items: ["Store setup and theme customization", "Reusable sections and product templates", "Responsive layouts and technical SEO"], placement: "service-shopify" },
  { title: "Conversion optimization", audience: "FOR AN EXISTING STORE", icon: "mouse", description: "Find friction in the customer journey and turn it into a focused plan for improvement.", items: ["Product and landing page reviews", "Mobile usability and speed improvements", "Prioritized changes and measurement"], placement: "service-cro" },
  { title: "Paid social campaigns", audience: "FOR YOUR NEXT GROWTH PHASE", icon: "target", description: "Connect Meta and TikTok campaigns with the store experience and meaningful conversion data.", items: ["Campaign structure and creative testing", "Landing page alignment and retargeting", "Conversion tracking and reporting"], placement: "service-ads" },
];

export const landingSteps = [
  { title: "Understand the opportunity", description: "Tell me about your store, audience, and main challenge. We’ll identify where the work should start." },
  { title: "Agree on a focused scope", description: "Define the deliverables, priorities, timeline, and success measures before the project begins." },
  { title: "Build, measure, improve", description: "Put the plan into action, test the customer experience, and use the findings to guide the next move." },
];
