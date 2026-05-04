"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { photos, categories, type Photo } from "@/lib/photos";
import Lightbox from "./Lightbox";

function GalleryCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  return (
    <motion.div
      className="relative group cursor-pointer editorial-card overflow-hidden rounded-2xl"
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      data-hover
    >
      {/* Image with generous portrait ratio — shows more content */}
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover object-[center_30%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] will-change-transform"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
        />

        {/* Permanent bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/75 via-[#1C1917]/5 via-[40%] to-transparent z-[2] pointer-events-none" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1C1917]/0 group-hover:bg-[#1C1917]/15 transition-colors duration-500 z-[3]" />

        {/* ALWAYS visible: Category + Description */}
        <div className="absolute bottom-0 left-0 right-0 z-[4] p-4 sm:p-5">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-white/95 font-display text-lg sm:text-xl font-light tracking-wide block leading-tight">
                {photo.category}
              </span>
              <span className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-1 block line-clamp-1">
                {photo.description.split(".")[0]}
              </span>
            </div>
            <span className="text-white/25 text-[10px] tracking-widest font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioReel() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPhotos = activeCategory === "Todos"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const handlePhotoClick = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    const list = filteredPhotos;
    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % list.length
        : (selectedIndex - 1 + list.length) % list.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(list[newIndex]);
  };

  return (
    <>
      <section id="portfolio" className="relative py-14 sm:py-28 md:py-36 px-3 sm:px-6 md:px-12 lg:px-20 bg-background">

        {/* Ambient warm light */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-gradient-to-r from-[rgba(241,238,232,0.6)] to-transparent blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-l from-[rgba(255,255,255,0.5)] to-transparent blur-[140px]" />
        </div>

        {/* Section Header */}
        <div className="relative max-w-7xl mx-auto mb-14 sm:mb-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="h-[1px] w-10 sm:w-16 bg-accent/35" />
              <p className="text-accent text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
                Portfólio
              </p>
            </div>
            <h2 className="font-display font-light text-[clamp(2rem,7vw,5.5rem)] tracking-tight text-foreground leading-[0.95]">
              Acervo{" "}
              <span className="italic text-accent/60">&</span>{" "}
              <span className="italic">Especialidades</span>
            </h2>
          </motion.div>

          {/* Category filters — horizontal scroll on mobile */}
          <motion.div
            className="mt-6 sm:mt-14 flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-none"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.15em] uppercase transition-all duration-400 border whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-secondary border-foreground/8 hover:border-accent/30 hover:text-foreground"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="relative max-w-7xl mx-auto z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredPhotos.map((photo, index) => (
              <GalleryCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => handlePhotoClick(photo, index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Lightbox */}
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
