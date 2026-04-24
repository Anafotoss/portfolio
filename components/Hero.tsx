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
          <span className="text-[7px] sm:text-[9px] text-foreground/50 tracking-[0.2em] sm:tracking-[0.3em] font-mono">REC / 35MM</span>
        </motion.div>
        
        <motion.div 
          className="glass px-2.5 sm:px-4 py-1.5 rounded-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="text-[7px] sm:text-[9px] text-foreground/50 tracking-[0.2em] sm:tracking-[0.3em] font-mono">SCN 01 — TAKE 1</span>
        </motion.div>
      </div>

      {/* Exaggerated Lens Flares */}
      <div className="lens-flare-top" />
      <div className="lens-flare-bottom" />

      {/* 
        Background Setup: Fixed the image visibility.
        Removed harsh gradients, using mix-blend-luminosity and sepia overlays 
        to blend the image perfectly with the light warm background.
      */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: imageScale }}>
        <div className="absolute inset-0 bg-background" /> {/* Warm light base */}
        
        <motion.div
          className="relative w-full h-full mix-blend-luminosity opacity-40"
          initial={{ scale: 1.2, opacity: 0, filter: "blur(20px)" }}
          animate={{ scale: 1, opacity: 0.4, filter: "blur(0px)" }}
          transition={{ duration: 2.5, ease: smoothEase }}
        >
          <Image
            src="/portfolio/photos/Ana_03.webp"
            alt="Fotografia por Ana Fotos — Essência & Qualidade"
            fill
            className="object-cover will-change-transform"
            style={{ filter: "sepia(0.2) contrast(1.1) brightness(1.2)" }}
            priority
            quality={100}
            sizes="100vw"
          />
        </motion.div>
        
        {/* Subtle radial vignette directly on the image layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#F9F6F0_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-2 sm:px-4 w-full max-w-6xl mx-auto flex flex-col items-center"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
      >
        {/* Apple Glass Label Pill */}
        <motion.div
          className="glass-pill px-5 sm:px-6 py-2 sm:py-2.5 mb-10 sm:mb-12 flex items-center gap-2 sm:gap-3 border border-white shadow-sm"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.9, ease: smoothEase }}
        >
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full shadow-[0_0_10px_rgba(42,36,32,0.4)] animate-pulse bg-foreground" />
          <p className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] uppercase text-foreground font-semibold">
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
          className="mt-4 sm:mt-8 text-foreground/70 font-light text-lg sm:text-2xl md:text-3xl max-w-2xl mx-auto leading-relaxed tracking-wide"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 2.2, duration: 1, ease: smoothEase }}
        >
          Cada clique é uma <span className="italic text-foreground">memória eternizada.</span>
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
            className="relative px-12 py-4 sm:py-5 overflow-hidden rounded-full bg-foreground text-background font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase w-full sm:w-auto active:scale-95 transition-all shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(42,36,32,0.2)" }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Explorar Portfólio
          </motion.button>

          <motion.a
            href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20falar%20sobre%20fotografia."
            target="_blank"
            rel="noopener noreferrer"
            className="glass-strong px-12 py-4 sm:py-5 text-foreground font-medium text-xs sm:text-sm tracking-[0.2em] uppercase w-full sm:w-auto hover:bg-black/5 active:bg-black/10 transition-all duration-300 text-center rounded-full border border-black/10"
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
