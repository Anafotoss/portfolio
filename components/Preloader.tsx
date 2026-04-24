"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const preloaderTitle = "Ana Fotos";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 18 + 6;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black"
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Warm ambient orb */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(194,168,140,0.08) 0%, rgba(212,165,116,0.04) 40%, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{ 
              scale: [1, 1.15, 1],
              rotate: [0, 3, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
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
            className="text-[#C2A88C]/50 text-[10px] sm:text-xs tracking-[0.25em] uppercase font-medium"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Essência & Qualidade
          </motion.p>

          {/* Elegant thin progress bar */}
          <div className="absolute bottom-16 sm:bottom-20 w-44 sm:w-56">
            <div className="h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(194,168,140,0.4), rgba(194,168,140,0.8), rgba(194,168,140,0.4))" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-white/20 text-[10px] tracking-widest mt-3 text-center tabular-nums"
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
