"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

function lenisScrollTo(target: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

const heroTitle = "Ana Fotos";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, -80]);
  const contentScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.95]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 
        Cinemascope / Letterboxing 
        White bars at top and bottom to create a dramatic anamorphic film look on light theme
      */}
      <div className="absolute top-0 left-0 right-0 h-[10svh] bg-background z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[10svh] bg-background z-30 pointer-events-none flex items-center justify-between px-3 sm:px-8">
        {/* Retro Film Timecodes integrated inside letterbox */}
        <motion.div 
          className="glass px-2.5 sm:px-4 py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[7px] sm:text-[9px] text-white/70 tracking-[0.2em] sm:tracking-[0.3em] font-mono">REC / 35MM</span>
        </motion.div>
        
        <motion.div 
          className="glass px-2.5 sm:px-4 py-1.5 rounded-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[7px] sm:text-[9px] text-white/70 tracking-[0.2em] sm:tracking-[0.3em] font-mono">SCN 01 — TAKE 1</span>
        </motion.div>
      </div>

      {/* Exaggerated Lens Flares */}
      <div className="lens-flare-top" />
      <div className="lens-flare-bottom" />

      {/* 
        Background Image — Full warm color, no desaturation.
        The photo is the star of the hero. We let it breathe with
        natural tones, a gentle sepia warmth, and a smooth gradient
        fade at the bottom so it melts into the off-white background.
      */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: imageScale }}>
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.15, opacity: 0, filter: "blur(12px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: smoothEase }}
        >
          <Image
            src="/portfolio/photos/Ana_03.webp"
            alt="Fotografia por Ana Fotos — Essência & Qualidade"
            fill
            className="object-cover will-change-transform"
            style={{ filter: "sepia(0.08) contrast(1.05) brightness(0.95) saturate(0.9)" }}
            priority
            quality={100}
            sizes="100vw"
          />
        </motion.div>
        
        {/* Layered gradient fade — bottom melts into background, top stays visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F6F0] via-[#F9F6F0]/60 via-[30%] to-transparent pointer-events-none" />
        
        {/* Soft side fades for elegant framing */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F9F6F0]/50 via-transparent to-[#F9F6F0]/50 pointer-events-none" />
        
        {/* Very subtle dark overlay so text is readable over the photo */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-2 sm:px-4 w-full max-w-6xl mx-auto flex flex-col items-center"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Apple Glass Label Pill */}
        <motion.div
          className="glass-pill px-5 sm:px-6 py-2 sm:py-2.5 mb-10 sm:mb-12 flex items-center gap-2 sm:gap-3 border border-white/40 shadow-lg bg-white/20"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.9, ease: smoothEase }}
        >
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)] animate-pulse bg-white" />
          <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] uppercase text-white font-semibold">
            Essência & Qualidade
          </p>
        </motion.div>

        {/* Exaggerated Cinematic Title */}
        <div className="overflow-visible pb-10 pt-4 sm:pb-12 sm:pt-6 w-full max-w-[100vw] px-2 flex justify-center">
          <motion.h1
            className="font-display font-semibold text-[clamp(3.5rem,13vw,5.5rem)] sm:text-[9rem] md:text-[11rem] lg:text-[13rem] tracking-tighter leading-[0.8] retro-title-shine relative whitespace-nowrap"
            initial={{ y: "80%", opacity: 0, rotateX: 45, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 1.4, ease: smoothEase }}
            style={{ perspective: "1000px" }}
            data-text={heroTitle}
          >
            {heroTitle}
          </motion.h1>
        </div>

        {/* Dramatic Subtitle */}
        <motion.p
          className="mt-4 sm:mt-8 text-white/80 font-light text-lg sm:text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed tracking-wide drop-shadow-sm"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.2, duration: 1, ease: smoothEase }}
        >
          Cada clique é uma <span className="italic text-white">memória eternizada.</span>
        </motion.p>

        {/* CTA Buttons in strong glass */}
        <motion.div
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.button
            onClick={() => lenisScrollTo("#portfolio")}
            className="relative px-12 py-4 sm:py-5 overflow-hidden rounded-full bg-white text-foreground font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase w-full sm:w-auto active:scale-95 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Explorar Portfólio
          </motion.button>

          <motion.a
            href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20falar%20sobre%20fotografia."
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-4 sm:py-5 text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase w-full sm:w-auto hover:bg-white/15 active:bg-white/20 transition-all duration-300 text-center rounded-full border border-white/40 bg-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Falar no WhatsApp
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
