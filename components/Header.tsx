"use client";

import Link from "next/link";
import { Home, Film, Clapperboard, Search, UserRound, Menu, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Series", href: "/anime-series", icon: Film },
  { label: "Movies", href: "/anime-movies", icon: Clapperboard },
  { label: "Tamil", href: "/tamil-movies", icon: Sparkles },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050609]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 md:px-6">
        <button onClick={() => setOpen(!open)} className="rounded-xl p-2 text-white/70 hover:bg-white/5 md:hidden" aria-label="Menu">
          <Menu size={21} />
        </button>

        <Link href="/" className="group flex items-center gap-1 text-lg font-black tracking-tight">
          <span>Anime4u</span><span className="text-[#ff2b86]">.Tamil</span>
          <span className="ml-1 text-[9px] text-white/30">A4U</span>
        </Link>

        {/* The active icon physically rises out of the navbar. */}
        <nav className="mx-auto hidden h-14 items-center gap-1 rounded-[22px] border border-white/10 bg-white/[.035] px-2 md:flex">
          {nav.map(({ label, href, icon: Icon }) => {
            const isActive = active(href);
            return (
              <Link key={href} href={href} aria-label={label} className="relative flex h-full items-center px-1">
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 420, damping: 25 }}
                  className={`relative flex min-w-[72px] flex-col items-center justify-center gap-1 rounded-[19px] px-3 py-2 text-[9px] font-bold transition-colors duration-200 ${
                    isActive
                      ? "-translate-y-3 bg-[#2778ff] text-white shadow-[0_12px_30px_rgba(39,120,255,.42)]"
                      : "text-white/38 hover:-translate-y-1 hover:bg-white/[.06] hover:text-white/80"
                  }`}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.6 : 1.8} />
                  <span>{label}</span>
                  {isActive && <motion.i layoutId="active-dot" className="absolute -bottom-1 h-1 w-7 rounded-full bg-white/90" />}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/search" className="btn flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-3 py-2 text-sm text-white/50 hover:border-white/20 hover:text-white">
            <Search size={16} /><span className="hidden sm:inline">Search</span>
          </Link>
          <Link href="/login" className="btn flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-black">
            <UserRound size={15} /><span>Sign in</span>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 md:hidden">
            <div className="grid grid-cols-4 gap-2 p-3">
              {nav.map(({ label, href, icon: Icon }) => (
                <Link key={href} onClick={() => setOpen(false)} href={href} className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-[10px] font-bold ${active(href) ? "bg-[#2778ff] text-white shadow-lg shadow-blue-500/20" : "bg-white/[.03] text-white/45"}`}>
                  <Icon size={18} />{label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
