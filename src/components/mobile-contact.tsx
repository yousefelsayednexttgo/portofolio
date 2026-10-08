"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { copy } from "@/data/portfolio";

export function MobileContact() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const contact = document.getElementById("contact");
    const hero = document.getElementById("home");
    if (!contact || !hero) return;
    const update = () => {
      const contactBounds = contact.getBoundingClientRect();
      setVisible(hero.getBoundingClientRect().bottom < 100 && contactBounds.top > window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div className="mobile-contact-bar" hidden={!visible}><Link className="button" href="#contact" data-cta="mobile-sticky">{copy.contactCta}<ArrowUpRight size={17} aria-hidden="true" /></Link></div>;
}
