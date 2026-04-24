"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "@/lib/photos";

const preloaderTitle = "Ana Fotos";

// All critical images that must load before showing the site
const criticalImages = [
  "/portfolio/photos/Ana_03.webp",        // Hero background
  "/portfolio/photos/aboutme.jpeg",        // About section
  ...photos.map((p) => p.src),             // Portfolio cards
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't block on errors
    img.src = src;
  });
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaded = useRef(0);

  useEffect(() => {
    // Block scrolling & Lenis
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) lenis.stop();

    const total = criticalImages.length;

    // Load all images in parallel, updating progress as each completes
    const promises = criticalImages.map((src) =>
      preloadImage(src).then(() => {
        loaded.current += 1;
        setProgress(Math.round((loaded.current / total) * 100));
      })
    );

    // Also wait for the window load event (fonts, scripts, etc.)
    const windowLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    Promise.all([...promises, windowLoadPromise]).then(() => {
      setProgress(100);
      // Small delay so the 100% state is visible before exit animation
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (window as any).__lenis;
      if (lenis) lenis.start();
    }
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background"
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Warm ambient orb — simple CSS gradient, no animated blur */}
          <div
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(232,221,211,0.6) 0%, rgba(249,246,240,0.2) 50%, transparent 70%)",
            }}
          />

          {/* Logo with letter-by-letter reveal */}
          <div className="relative mb-6 overflow-hidden">
            <motion.h1
              className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl tracking-tight flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {preloaderTitle.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="apple-text inline-block"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.15 + i * 0.06, 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  style={char === " " ? { width: "0.3em" } : {}}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            className="text-retro-warm/60 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Essência & Qualidade
          </motion.p>

          {/* Real progress bar tied to actual image loading */}
          <div className="absolute bottom-16 sm:bottom-20 w-44 sm:w-56">
            <div className="h-[1px] bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(194,168,140,0.4), rgba(194,168,140,0.9), rgba(194,168,140,0.4))" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-foreground/25 text-[10px] tracking-widest mt-3 text-center tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
