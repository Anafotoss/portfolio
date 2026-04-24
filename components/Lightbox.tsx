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

  // Swipe navigation for mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      setDirection(1);
      onNavigate("next");
    } else if (info.offset.x > threshold) {
      setDirection(-1);
      onNavigate("prev");
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.92,
    }),
  };

  if (!photo) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full glass hover:bg-white/10 active:bg-white/20 transition-colors"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        data-hover
        aria-label="Fechar"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="text-white">
          <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>

      {/* Navigation arrows — hidden on mobile (swipe instead) */}
      <motion.button
        onClick={() => { setDirection(-1); onNavigate("prev"); }}
        className="absolute left-2 sm:left-4 md:left-8 z-20 w-11 h-11 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center rounded-full glass hover:border-white/30 transition-all text-white/70 hover:text-white hover:bg-white/10"
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.9 }}
        data-hover
        aria-label="Foto anterior"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M13 3L6 10L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      <motion.button
        onClick={() => { setDirection(1); onNavigate("next"); }}
        className="absolute right-2 sm:right-4 md:right-8 z-20 w-11 h-11 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center rounded-full glass hover:border-white/30 transition-all text-white/70 hover:text-white hover:bg-white/10"
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.9 }}
        data-hover
        aria-label="Próxima foto"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      {/* Image — swipeable on mobile */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={photo.id}
          className="relative z-10 w-[92vw] h-[65svh] sm:w-[85vw] sm:h-[75vh] md:w-[80vw] md:h-[80vh] max-w-5xl touch-pan-y"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, opacity: dragOpacity }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain rounded-lg pointer-events-none drop-shadow-2xl"
            sizes="(max-width: 768px) 92vw, 80vw"
            quality={95}
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Info bar — responsive */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:left-auto sm:right-auto z-10 glass border border-white/10 rounded-xl sm:rounded-full px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 sm:w-auto shadow-2xl bg-black/40"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <span className="text-white text-[10px] sm:text-xs tracking-widest uppercase font-medium bg-white/10 px-2 py-0.5 rounded">
          {photo.category}
        </span>
        <span className="w-[1px] h-4 bg-white/20 hidden sm:block" />
        <span className="text-white/80 font-light text-xs sm:text-sm tracking-wide line-clamp-1">
          {photo.description}
        </span>
        {/* Swipe hint on mobile */}
        <span className="text-white/40 text-[10px] tracking-wider sm:hidden mt-1 font-light">
          ← Deslize para navegar →
        </span>
      </motion.div>
    </motion.div>
  );
}
