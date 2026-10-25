"use client";
import {usePathname} from "next/navigation";

const items=[
  {label:"Animovies",href:"/movies",icon:"◉"},
  {label:"Animes",href:"/anime-series",icon:"▷"},
  {label:"Home",href:"/",icon:"⌂"},
  {label:"Series",href:"/series",icon:"▣"},
  {label:"Tamil",href:"/tamil-movies",icon:"✦"},
];

export default function BottomNav(){
 const pathname=usePathname();
 return <nav className="bottom-nav" aria-label="Main navigation">
   <div className="bottom-nav-inner">
    {items.map((item)=><a key={item.href} href={item.href} className={`bottom-item ${pathname===item.href?"is-active":""} ${item.href==="/"?"home-item":""}`}>
      <span className="bottom-icon">{item.icon}</span><span>{item.label}</span>
    </a>)}
   </div>
 </nav>
}
