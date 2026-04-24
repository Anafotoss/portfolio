"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { photos, type Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";

// Reusable hook for 3D card tilt and glare effect
function useMouseTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Exaggerated 3D tilt for Apple Glass feel
    const tiltX = (y - 0.5) * -15; 
    const tiltY = (x - 0.5) * 15;
    ref.current.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Specular light glare moving with the mouse
    const glare = ref.current.querySelector('.glass-glare') as HTMLElement;
    if (glare) {
      glare.style.left = `${x * 100}%`;
      glare.style.top = `${y * 100}%`;
      glare.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      const glare = ref.current.querySelector('.glass-glare') as HTMLElement;
      if (glare) {
        glare.style.opacity = '0';
      }
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

function ReelCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMouseTilt();

  return (
    <motion.div
      className="relative flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] h-[60vh] sm:h-[65vh] md:h-[70vh] rounded-[2rem] overflow-hidden group cursor-pointer apple-glass-card shadow-xl"
      onClick={onClick}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.96 }}
      data-hover
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full transition-transform duration-[0.6s] ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.08] will-change-transform"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 35vw"
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          style={{ filter: "sepia(0.15) contrast(1.05) brightness(1.05)" }}
        />
        
        {/* Cinematic gradient overlay — soft fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2420]/80 via-[#2A2420]/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />
        
        {/* Dynamic Specular Glare */}
        <div 
          className="glass-glare absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 z-[3]"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 40%, transparent 70%)",
            filter: "blur(40px)",
            top: "50%",
            left: "50%"
          }}
        />

        {/* Floating Glass Info Panel */}
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-[4] translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <div className="glass-strong rounded-2xl p-5 sm:p-7 border border-white/40 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block px-3 py-1 text-[9px] sm:text-[10px] tracking-widest uppercase text-background bg-foreground rounded-full font-bold shadow-sm">
                0{index + 1}
              </span>
              <span className="w-8 h-[1px] bg-foreground/20" />
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-retro-warm font-mono">
                {photo.category}
              </span>
            </div>
            
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight mb-2">
              {photo.category}
            </h3>
            <p className="text-white/70 font-light text-xs sm:text-sm leading-relaxed line-clamp-2">
              {photo.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioReel() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Creates a sticky scroll context
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal movement based on the vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Lightbox State
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % photos.length
        : (selectedIndex - 1 + photos.length) % photos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <>
      <section id="portfolio" ref={targetRef} className="relative h-[400vh] bg-background">
        {/* Sticky Container that holds the viewport height */}
        <div className="sticky top-0 h-screen flex flex-col items-start justify-center overflow-hidden">
          
          {/* Ambient Background Lights — warm sunlight pools */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-[rgba(232,221,211,0.4)] to-transparent blur-[140px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-l from-[rgba(255,255,255,0.5)] to-transparent blur-[140px]" />
          </div>

          {/* Section Header */}
          <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 max-w-screen-2xl mx-auto mb-10 sm:mb-16 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-retro-warm to-transparent" />
                <p className="text-retro-warm font-medium text-[10px] sm:text-xs tracking-[0.3em] uppercase font-mono">
                  06 Trabalhos
                </p>
              </div>
              <h2 className="font-display font-bold text-[clamp(2.5rem,8vw,6rem)] tracking-tight text-foreground leading-[0.95]">
                <span className="text-foreground/35 font-light italic">Acervo &</span>{" "}
                <span className="retro-title-shine" data-text="Especialidades">Especialidades</span>
              </h2>
            </motion.div>
          </div>

          {/* Cinematic Scroll Reel */}
          <motion.div style={{ x }} className="flex gap-6 sm:gap-10 md:gap-16 px-4 sm:px-6 md:px-12 lg:px-20 z-10 pb-8">
            {photos.map((photo, index) => (
              <ReelCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => handlePhotoClick(photo, index)}
              />
            ))}
            
            {/* End of reel spacer */}
            <div className="w-[10vw] flex-shrink-0" />
          </motion.div>

          {/* Cinematic Film strip perforations (decoration) */}
          <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-between px-8 z-0 opacity-15 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-sm border border-retro-warm/30 bg-foreground/5" />
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox integration */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={handleNavigate}
          />
        )}
      </AnimatePresence>
    </>
  );
}
