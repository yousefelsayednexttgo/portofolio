"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand, Globe, X } from "lucide-react";
import { useRef, useState } from "react";
import { featuredWebsites } from "@/data/portfolio";

export function WebsiteGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = featuredWebsites[activeIndex];

  function openPreview(index: number) {
    setActiveIndex(index);
    dialog.current?.showModal();
  }

  function changePreview(direction: number) {
    setActiveIndex(index => (index + direction + featuredWebsites.length) % featuredWebsites.length);
  }

  return <>
    <div className="website-gallery">
      {featuredWebsites.map((website, index) => <article key={website.domain} className={`website-card website-${website.theme}`}>
        <div className="website-browser">
          <div className="website-browser-bar">
            <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="browser-address"><Globe size={12} aria-hidden="true" />{website.domain}</span>
            <span className="website-live"><i aria-hidden="true" />LIVE</span>
          </div>
          <button type="button" className="website-preview" onClick={() => openPreview(index)} aria-label={`Preview ${website.name} website screenshot`}>
            <Image src={website.image} alt={website.imageAlt} width={1200} height={1000} sizes="(max-width: 850px) calc(100vw - 48px), (max-width: 1100px) calc((100vw - 124px) / 2), (max-width: 1336px) calc((100vw - 152px) / 3), 395px" />
            <span className="website-expand"><Expand size={16} aria-hidden="true" />View screenshot</span>
          </button>
        </div>
        <div className="website-card-body">
          <p className="website-category"><span>0{index + 1}</span>{website.category}</p>
          <div className="website-title-row"><h3>{website.name}</h3><a href={website.url} target="_blank" rel="noopener noreferrer" className="website-visit" aria-label={`Visit ${website.name} website (opens in a new tab)`}>Visit website<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          <p className="website-description">{website.description}</p>
          <ul className="website-tags" aria-label={`${website.name} project categories`}>{website.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </article>)}
    </div>
    <dialog ref={dialog} className="website-lightbox" aria-labelledby="website-preview-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); changePreview(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); changePreview(1); }
    }}>
      <div className="website-lightbox-header">
        <div><p className="website-category">WEBSITE PREVIEW</p><h2 id="website-preview-title">{active.name}</h2></div>
        <button type="button" className="gallery-icon-button" aria-label="Close screenshot preview" onClick={() => dialog.current?.close()} autoFocus><X size={22} aria-hidden="true" /></button>
      </div>
      <div className="website-lightbox-image"><Image src={active.image} alt={active.imageAlt} width={1200} height={1000} sizes="(max-width: 1100px) 90vw, 1000px" /></div>
      <div className="website-lightbox-footer">
        <a href={active.url} target="_blank" rel="noopener noreferrer">Visit {active.domain}<ArrowUpRight size={16} aria-hidden="true" /></a>
        <div className="website-preview-controls"><button type="button" className="gallery-icon-button" aria-label="Previous website" onClick={() => changePreview(-1)}><ArrowLeft size={18} aria-hidden="true" /></button><span aria-live="polite">{activeIndex + 1} / {featuredWebsites.length}</span><button type="button" className="gallery-icon-button" aria-label="Next website" onClick={() => changePreview(1)}><ArrowRight size={18} aria-hidden="true" /></button></div>
      </div>
    </dialog>
  </>;
}
