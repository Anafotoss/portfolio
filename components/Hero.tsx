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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100svh] flex items-center overflow-hidden bg-background"
    >
      {/* Split layout: Text left, Image right */}
      <div className="relative z-20 w-full h-full flex flex-col lg:flex-row items-center">

        {/* LEFT — Typography */}
        <motion.div
          className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-28 lg:pt-0"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Tagline */}
          <motion.div
            className="flex items-center gap-3 mb-8 sm:mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: smoothEase }}
          >
            <div className="w-8 sm:w-12 h-[1px] bg-accent/40" />
            <p className="text-accent text-[10px] sm:text-xs tracking-[0.35em] uppercase font-medium">
              Fotografia de Essência
            </p>
          </motion.div>

          {/* Main title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-display font-light text-[clamp(3.2rem,10vw,8rem)] lg:text-[clamp(4rem,7vw,9rem)] tracking-tight leading-[0.9] text-foreground"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.2, ease: smoothEase }}
            >
              Ana
              <br />
              <span className="italic font-light text-accent">Fotos</span>
            </motion.h1>
          </div>

          {/* Decorative line */}
          <motion.div
            className="h-[1px] bg-accent/30 mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 2, duration: 1, ease: smoothEase }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-secondary font-normal text-sm sm:text-base md:text-lg max-w-md leading-relaxed tracking-wide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8, ease: smoothEase }}
          >
            Cada clique é uma{" "}
            <span className="text-foreground italic font-display text-lg sm:text-xl md:text-2xl">memória eternizada.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
          >
            <motion.button
              onClick={() => lenisScrollTo("#portfolio")}
              className="relative px-8 sm:px-10 py-3.5 sm:py-4 overflow-hidden rounded-full bg-foreground text-background font-medium text-[11px] sm:text-xs tracking-[0.2em] uppercase active:scale-95 transition-all shadow-[0_4px_20px_rgba(28,25,23,0.12)]"
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
              className="px-8 sm:px-10 py-3.5 sm:py-4 text-secondary font-medium text-[11px] sm:text-xs tracking-[0.2em] uppercase hover:text-foreground hover:border-accent/40 active:scale-95 transition-all duration-400 text-center rounded-full border border-foreground/12"
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
          className="relative flex-1 h-[45vh] lg:h-full w-full lg:w-auto"
          style={{ y: imageY, scale: imageScale }}
        >
          <motion.div
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.8, ease: smoothEase }}
          >
            <Image
              src="/portfolio/photos/Ana_03.webp"
              alt="Fotografia por Ana Fotos — Essência & Qualidade"
              fill
              className="object-cover will-change-transform"
              style={{ filter: "saturate(0.92) contrast(1.02)" }}
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Gradient fades into background */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent pointer-events-none lg:from-background/25" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
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
