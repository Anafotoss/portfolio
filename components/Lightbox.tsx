"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import type { Photo } from "@/lib/photos";

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function Lightbox({ photo, onClose, onNavigate }: LightboxProps) {
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-200, 0, 200], [0.5, 1, 0.5]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") { setDirection(1); onNavigate("next"); }
      if (e.key === "ArrowLeft") { setDirection(-1); onNavigate("prev"); }
    },
    [onClose, onNavigate]
  );

  useEffect(() => {
    if (photo) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [photo, handleKeyDown]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) { setDirection(1); onNavigate("next"); }
    else if (info.offset.x > threshold) { setDirection(-1); onNavigate("prev"); }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 150 : -150, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -150 : 150, opacity: 0, scale: 0.95 }),
  };

  if (!photo) return null;

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.div className="absolute inset-0 bg-background/92 backdrop-blur-2xl" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

      <motion.button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full border border-foreground/8 hover:border-accent/20 transition-all text-secondary hover:text-foreground" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} data-hover aria-label="Fechar">
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
      </motion.button>

      <motion.button onClick={() => { setDirection(-1); onNavigate("prev"); }} className="absolute left-2 sm:left-4 md:left-8 z-20 w-10 h-10 hidden sm:flex items-center justify-center rounded-full border border-foreground/6 hover:border-accent/20 transition-all text-secondary hover:text-foreground" whileHover={{ scale: 1.1, x: -2 }} whileTap={{ scale: 0.9 }} data-hover aria-label="Anterior">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 3L6 10L13 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.button>

      <motion.button onClick={() => { setDirection(1); onNavigate("next"); }} className="absolute right-2 sm:right-4 md:right-8 z-20 w-10 h-10 hidden sm:flex items-center justify-center rounded-full border border-foreground/6 hover:border-accent/20 transition-all text-secondary hover:text-foreground" whileHover={{ scale: 1.1, x: 2 }} whileTap={{ scale: 0.9 }} data-hover aria-label="Próxima">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </motion.button>

      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div key={photo.id} className="relative z-10 w-[92vw] h-[65svh] sm:w-[85vw] sm:h-[75vh] md:w-[80vw] md:h-[80vh] max-w-5xl touch-pan-y" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.15} onDragEnd={handleDragEnd} style={{ x: dragX, opacity: dragOpacity }}>
          <Image src={photo.src} alt={photo.alt} fill className="object-contain rounded-lg pointer-events-none drop-shadow-xl" sizes="(max-width: 768px) 92vw, 80vw" quality={95} priority />
        </motion.div>
      </AnimatePresence>

      <motion.div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-10 glass-elevated rounded-xl sm:rounded-full px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 sm:w-auto" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 25, opacity: 0 }} transition={{ delay: 0.15, duration: 0.4 }}>
        <span className="text-accent text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">{photo.category}</span>
        <span className="w-[1px] h-4 bg-foreground/8 hidden sm:block" />
        <span className="text-secondary font-light text-xs sm:text-sm tracking-wide line-clamp-1">{photo.description}</span>
        <span className="text-muted text-[10px] tracking-wider sm:hidden mt-1">← Deslize →</span>
      </motion.div>
    </motion.div>
  );
}
