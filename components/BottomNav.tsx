"use client";

import {usePathname} from "next/navigation";

const items = [
  {label:"Animovies", href:"/movies", kind:"circle"},
  {label:"Animes", href:"/anime-series", kind:"circle"},
  {label:"Home", href:"/", kind:"home"},
  {label:"Series", href:"/series", kind:"circle"},
  {label:"Tamil Movies", href:"/tamil-movies", kind:"circle"},
];

export default function BottomNav(){
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`bottom-item ${pathname===item.href ? "is-active" : ""} ${item.kind==="home" ? "home-item" : ""}`}
          >
            {item.kind==="home" && (
              <span className="bottom-image-wrap home-image-wrap">
                <img className="bottom-image home-image" src="/assets/navbar-home.png" alt="" />
              </span>
            )}
            {item.kind==="circle" && (
              <span className={`circle-label circle-${item.label.toLowerCase().replace(/\s+/g,"-")}`}>
                <span>{item.label}</span>
              </span>
            )}
            {item.kind==="home" && <span className="bottom-label">Home</span>}
          </a>
        ))}
      </div>
    </nav>
  );
}
