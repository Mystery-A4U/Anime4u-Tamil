"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Chrome, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const SIGNIN_ART = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Kawaii_Kon_2013_-_Dragon_Ball_Cosplayers.jpg";
const SIGNUP_ART = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cosplayers_duo,_28_Manga_BCN.jpg";

export default function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#050609] p-3 md:p-6">
      <section className="relative mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090b10] shadow-2xl shadow-black/50">
        {/* Moving diagonal hero panel */}
        <motion.div
          animate={{ x: mode === "signin" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 110, damping: 19 }}
          className="absolute inset-y-0 left-0 z-20 hidden w-1/2 overflow-hidden md:block"
          style={{ clipPath: mode === "signin" ? "polygon(0 0, 100% 0, 86% 100%, 0 100%)" : "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <motion.img
            key={mode}
            initial={{ scale: 1.08, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            src={mode === "signin" ? SIGNIN_ART : SIGNUP_ART}
            alt="Anime hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/25 to-[#050609]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
          <div className="absolute bottom-10 left-10 max-w-xs">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.28em] text-white/55"><Sparkles size={13}/> Anime4u.Tamil</div>
            <h2 className="text-3xl font-black leading-tight text-white">{mode === "signin" ? "Power up your watchlist." : "Enter a new universe."}</h2>
            <p className="mt-2 text-xs leading-5 text-white/45">{mode === "signin" ? "Your anime, your episodes, your community — all in one place." : "Create your A4U account and keep every favourite close."}</p>
          </div>
        </motion.div>

        {/* Form side */}
        <motion.div
          animate={{ x: mode === "signin" ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 110, damping: 19 }}
          className="relative z-10 flex min-h-[650px] w-full items-center justify-center p-6 md:w-1/2 md:ml-auto md:p-12"
        >
          <div className="w-full max-w-sm">
            <Link href="/" className="text-xs text-white/35 hover:text-white">← Back to Anime4u.Tamil</Link>
            <div className="mt-8">
              <p className="text-[10px] font-black uppercase tracking-[.3em] text-[#2778ff]">{mode === "signin" ? "Welcome back" : "Create account"}</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">{mode === "signin" ? "Sign in." : "Sign up."}</h1>
              <p className="mt-2 text-sm text-white/35">{mode === "signin" ? "Continue your anime journey." : "Join the Anime4u.Tamil community."}</p>
            </div>

            <div className="mt-7 flex rounded-2xl border border-white/10 bg-white/[.025] p-1">
              <button onClick={() => setMode("signin")} className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${mode === "signin" ? "bg-white text-black" : "text-white/40"}`}>Sign in</button>
              <button onClick={() => setMode("signup")} className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${mode === "signup" ? "bg-white text-black" : "text-white/40"}`}>Sign up</button>
            </div>

            <button className="btn mt-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3.5 text-sm font-bold text-black">
              <Chrome size={17} /> Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3 text-[10px] text-white/20"><span className="h-px flex-1 bg-white/10" />OR<span className="h-px flex-1 bg-white/10" /></div>

            {mode === "signup" && <><label className="text-xs text-white/45">Username</label><div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4"><input className="w-full bg-transparent py-3.5 text-sm outline-none" placeholder="Your name" /></div></>}

            <label className={`${mode === "signup" ? "mt-4" : ""} block text-xs text-white/45`}>Email</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 focus-within:border-[#2778ff]/60"><Mail size={16} className="text-white/25"/><input className="w-full bg-transparent py-3.5 text-sm outline-none" placeholder="you@example.com" /></div>

            <label className="mt-4 block text-xs text-white/45">Password</label>
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 focus-within:border-[#2778ff]/60"><Lock size={16} className="text-white/25"/><input type="password" className="w-full bg-transparent py-3.5 text-sm outline-none" placeholder="••••••••" /></div>

            <button className="btn mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2778ff] px-4 py-3.5 text-sm font-black text-white shadow-[0_12px_35px_rgba(39,120,255,.22)]">
              {mode === "signin" ? "Sign in" : "Create account"}<ArrowRight size={16}/>
            </button>

            <p className="mt-5 text-center text-[10px] leading-5 text-white/25">Auth is wired for your FastAPI backend. No demo account is included.</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
