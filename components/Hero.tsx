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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-background"
    >
      {/* ===== MOBILE: Full-screen hero image with overlaid text ===== */}
      <div className="lg:hidden relative w-full h-full">
        {/* Full-screen background image */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.6, ease: smoothEase }}
          >
            <Image
              src="/portfolio/photos/Ana_03.jpeg"
              alt="Fotografia por Ana Fotos"
              fill
              className="object-cover object-[center_25%] will-change-transform"
              priority
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/20 to-[#1C1917]/40 pointer-events-none" />

        {/* Content overlaid at bottom */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col justify-end px-5 sm:px-8 pb-20"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Tagline */}
          <motion.div
            className="flex items-center gap-2.5 mb-4"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: smoothEase }}
          >
            <div className="w-6 h-[1px] bg-white/40" />
            <p className="text-white/70 text-[10px] tracking-[0.35em] uppercase font-medium">
              Fotografia de Essência
            </p>
          </motion.div>

          {/* Title */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-display font-light text-[clamp(3rem,14vw,5rem)] tracking-tight leading-[0.88] text-white"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.2, ease: smoothEase }}
            >
              Ana
              <br />
              <span className="italic font-light text-white/80">Fotos</span>
            </motion.h1>
          </div>

          {/* Decorative line */}
          <motion.div
            className="h-[1px] bg-white/25 mb-4"
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ delay: 2, duration: 1, ease: smoothEase }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-white/60 font-normal text-sm max-w-xs leading-relaxed tracking-wide mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            Cada clique é uma{" "}
            <span className="text-white/90 italic font-display text-base">memória eternizada.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
          >
            <motion.button
              onClick={() => lenisScrollTo("#portfolio")}
              className="px-8 py-3.5 rounded-full bg-white text-[#1C1917] font-medium text-[11px] tracking-[0.2em] uppercase active:scale-95 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
              whileTap={{ scale: 0.97 }}
            >
              Explorar Portfólio
            </motion.button>
            <motion.a
              href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20falar%20sobre%20fotografia."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-white/70 font-medium text-[11px] tracking-[0.2em] uppercase active:scale-95 transition-all text-center rounded-full border border-white/20"
              whileTap={{ scale: 0.97 }}
            >
              Falar no WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-[1px] h-5 bg-white/20 origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* ===== DESKTOP: Split layout ===== */}
      <div className="hidden lg:flex relative z-20 w-full h-full items-center">
        {/* LEFT — Typography */}
        <motion.div
          className="relative z-20 flex-1 flex flex-col justify-center px-20 xl:px-28"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: smoothEase }}
          >
            <div className="w-12 h-[1px] bg-accent/40" />
            <p className="text-accent text-xs tracking-[0.35em] uppercase font-medium">
              Fotografia de Essência
            </p>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-display font-light text-[clamp(4rem,7vw,9rem)] tracking-tight leading-[0.9] text-foreground"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.2, ease: smoothEase }}
            >
              Ana
              <br />
              <span className="italic font-light text-accent">Fotos</span>
            </motion.h1>
          </div>

          <motion.div
            className="h-[1px] bg-accent/30 mb-8"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 2, duration: 1, ease: smoothEase }}
          />

          <motion.p
            className="text-secondary font-normal text-base md:text-lg max-w-md leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: smoothEase }}
          >
            Cada clique é uma{" "}
            <span className="text-foreground italic font-display text-xl md:text-2xl">memória eternizada.</span>
          </motion.p>

          <motion.div
            className="mt-14 flex flex-row gap-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
          >
            <motion.button
              onClick={() => lenisScrollTo("#portfolio")}
              className="px-10 py-4 rounded-full bg-foreground text-background font-medium text-xs tracking-[0.2em] uppercase transition-all shadow-[0_4px_20px_rgba(28,25,23,0.12)]"
              whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(28,25,23,0.18)" }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              Explorar Portfólio
            </motion.button>
            <motion.a
              href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20falar%20sobre%20fotografia."
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 text-secondary font-medium text-xs tracking-[0.2em] uppercase hover:text-foreground hover:border-accent/40 transition-all duration-400 text-center rounded-full border border-foreground/12"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              Falar no WhatsApp
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo */}
        <motion.div
          className="relative flex-1 h-full w-auto"
          style={{ scale: imageScale }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.8, ease: smoothEase }}
          >
            <Image
              src="/portfolio/photos/Ana_03.jpeg"
              alt="Fotografia por Ana Fotos — Essência & Qualidade"
              fill
              className="object-cover object-[center_25%] will-change-transform"
              style={{ filter: "saturate(0.92) contrast(1.02)" }}
              priority
              quality={90}
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop scroll indicator */}
      <motion.div
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="text-muted text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-6 bg-accent/25 origin-top"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
