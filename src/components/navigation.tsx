"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { copy, navigation, profile } from "@/data/portfolio";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab" && window.matchMedia("(max-width: 1000px)").matches) {
        const elements = Array.from(header.current?.querySelectorAll<HTMLElement>("a, button") || []).filter(el => el.getClientRects().length > 0);
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 1000) setOpen(false); };
    window.addEventListener("keydown", keydown); window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keydown); window.removeEventListener("resize", resize); };
  }, [open]);
  return <header ref={header} className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""}`}>
    <div className="container nav-inner">
      <Link href="/#home" className="brand" onClick={() => setOpen(false)} aria-label={`${profile.name}, home`}><span className="brand-mark">{profile.monogram}<span>.</span></span><span className="brand-name">{profile.name}<span>DEVELOPMENT & GROWTH</span></span></Link>
      <nav id="main-navigation" className={open ? "navigation open" : "navigation"} aria-label="Main navigation">
        {navigation.map(item => <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link className="button button-small mobile-nav-cta" href="/#contact" data-cta="navigation-mobile" onClick={() => setOpen(false)}>{copy.contactCta}</Link>
      </nav>
      <Link className="button button-small desktop-nav-cta" href="/#contact" data-cta="navigation-desktop">{copy.contactCta}</Link>
      <button ref={menuButton} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
