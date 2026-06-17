"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "@/lib/photos";

const criticalImages = [
  "/portfolio/photos/Ana_03.jpeg",
  "/portfolio/photos/aboutme.jpeg",
  ...photos.map((p) => p.src),
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loaded = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) lenis.stop();

    const total = criticalImages.length;

    const promises = criticalImages.map((src) =>
      preloadImage(src).then(() => {
        loaded.current += 1;
        setProgress(Math.round((loaded.current / total) * 100));
      })
    );

    const windowLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        window.addEventListener("load", () => resolve(), { once: true });
      }
    });

    Promise.all([...promises, windowLoadPromise]).then(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 600);
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
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient warm orb */}
          <div
            className="absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(241,238,232,0.8) 0%, rgba(249,247,243,0.3) 50%, transparent 70%)",
            }}
          />

          {/* Logo — horizontal mask reveal */}
          <div className="relative mb-6 overflow-hidden">
            <motion.h1
              className="font-display font-light text-5xl sm:text-7xl md:text-8xl tracking-tight text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.span
                className="inline-block"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Ana{" "}
                <span className="italic font-light text-accent">Fotos</span>
              </motion.span>
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-muted text-[10px] sm:text-xs tracking-[0.4em] uppercase font-medium mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Fotografia de Essência
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-16 sm:bottom-20 w-40 sm:w-52">
            <div className="h-[1px] bg-foreground/6 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(139,115,85,0.3), rgba(139,115,85,0.7), rgba(139,115,85,0.3))" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-muted text-[10px] tracking-[0.3em] mt-3 text-center tabular-nums uppercase"
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
