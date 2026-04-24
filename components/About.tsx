"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-black"
    >
      {/* Ambient section glow — warm retro */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-[rgba(194,168,140,0.05)] to-transparent blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[rgba(212,165,116,0.04)] to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
        {/* Image side — real photo of Ana */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <motion.div
            className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-[32px] overflow-hidden apple-glass-card shadow-2xl"
            style={{ y: imageY }}
          >
            <Image
              src="/portfolio/photos/aboutme.jpeg"
              alt="Retrato fotográfico de Ana"
              fill
              className="object-cover will-change-transform"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ filter: "saturate(0.85)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Floating glass badge */}
          <motion.div
            className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-8 md:-right-10 glass-strong rounded-2xl p-5 sm:p-7 max-w-[170px] sm:max-w-[210px]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: smoothEase }}
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <span className="ambient-glow-text font-display font-semibold text-4xl sm:text-5xl text-white">
              ✦
            </span>
            <p className="text-white/55 font-light text-xs sm:text-sm mt-1.5 tracking-wide">
              paixão & propósito
            </p>
          </motion.div>
        </motion.div>

        {/* Text side — real texts from old portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
        >
          <p className="text-[#C2A88C]/70 font-medium text-xs sm:text-sm tracking-widest uppercase mb-4">
            Sobre Mim
          </p>
          <h2 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-white">
            <span className="text-white/80">Cada clique é uma</span>
            <br />
            <span className="apple-text italic font-light">memória eternizada</span>
          </h2>

          <div className="space-y-5 sm:space-y-6 mt-8 mb-8 text-white/60 font-light text-sm sm:text-base leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Me chamo Ana e a fotografia começou como um hobby que rapidamente se
              transformou em paixão e propósito. Sempre fui encantada por registrar 
              momentos e contar histórias através das imagens.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Hoje, sigo me profissionalizando e criando memórias com sensibilidade e
              autenticidade. Acredito que a fotografia é mais que um registro: é uma 
              arte que conecta pessoas, emoções e histórias.
            </motion.p>
          </div>

          {/* Quote */}
          <motion.blockquote
            className="mt-10 sm:mt-14 pl-6 sm:pl-8 relative"
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C2A88C]/60 via-[#d4a574]/30 to-transparent rounded-full" />
            <p className="font-display font-light text-xl sm:text-2xl md:text-3xl text-white/90 italic leading-relaxed tracking-wide">
              &ldquo;Cada clique é uma memória eternizada.&rdquo;
            </p>
            <footer className="text-white/35 font-medium text-xs sm:text-sm mt-4 tracking-widest uppercase">
              — Ana
            </footer>
          </motion.blockquote>

          {/* Specialties tags */}
          <motion.div
            className="mt-10 sm:mt-14 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {["Ensaios", "Retratos", "Gestantes", "Infantil", "Eventos", "Sensuais"].map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 glass rounded-full text-white/70 text-xs sm:text-sm tracking-wider font-light border border-white/10 hover:border-[#C2A88C]/30 hover:text-white transition-all duration-300"
                whileHover={{ y: -2, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
