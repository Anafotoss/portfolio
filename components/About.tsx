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

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-12 lg:px-20 bg-background"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-[rgba(241,238,232,0.6)] to-transparent blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[rgba(255,255,255,0.5)] to-transparent blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
        {/* Image side */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <motion.div
            className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(28,25,23,0.1)]"
            style={{ y: imageY }}
          >
            {/* Photo frame */}
            <div className="absolute inset-0 rounded-2xl border border-foreground/5 z-10 pointer-events-none" />
            <Image
              src="/portfolio/photos/aboutme.jpeg"
              alt="Retrato fotográfico de Ana"
              fill
              className="object-cover will-change-transform"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ filter: "saturate(0.9)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
          </motion.div>

          {/* Floating accent element — hidden on small mobile */}
          <motion.div
            className="hidden sm:block absolute -bottom-6 -right-6 glass-elevated rounded-xl p-4 sm:p-5 max-w-[160px] sm:max-w-[190px]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: smoothEase }}
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <span className="font-display font-light text-3xl sm:text-4xl text-accent italic">
              ✦
            </span>
            <p className="text-secondary text-[11px] sm:text-xs mt-1.5 tracking-wide font-light">
              paixão & propósito
            </p>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent/35" />
            <p className="text-accent text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
              Sobre Mim
            </p>
          </div>

          <h2 className="font-display font-light text-[clamp(2rem,8vw,4.5rem)] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-foreground">
            <span className="text-secondary">Cada clique é uma</span>
            <br />
            <span className="editorial-text italic">memória eternizada</span>
          </h2>

          <div className="space-y-5 sm:space-y-6 mt-8 mb-8 text-secondary text-sm sm:text-base leading-relaxed">
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
            <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-accent/40 via-accent/15 to-transparent rounded-full" />
            <p className="font-display font-light text-xl sm:text-2xl md:text-3xl text-foreground/75 italic leading-relaxed tracking-wide">
              &ldquo;Cada clique é uma memória eternizada.&rdquo;
            </p>
            <footer className="text-muted font-medium text-xs sm:text-sm mt-4 tracking-[0.2em] uppercase">
              — Ana
            </footer>
          </motion.blockquote>

          {/* Specialties tags */}
          <motion.div
            className="mt-10 sm:mt-14 flex flex-wrap gap-2.5 sm:gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {["Ensaios", "Retratos", "Gestantes", "Infantil", "Eventos", "Sensuais"].map((tag) => (
              <motion.span
                key={tag}
                className="px-4 py-2 rounded-full text-secondary text-[11px] sm:text-xs tracking-[0.15em] uppercase border border-foreground/6 hover:border-accent/25 hover:text-foreground transition-all duration-400"
                whileHover={{ y: -2 }}
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
