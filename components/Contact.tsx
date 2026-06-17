"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ContactCard({
  href, title, subtitle, icon: Icon, delay,
}: {
  href: string; title: string; subtitle: string; icon: React.ElementType; delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center justify-center w-full h-[220px] sm:w-[380px] sm:h-[340px] rounded-2xl border border-foreground/5 group overflow-hidden bg-surface/60 hover:border-accent/20 transition-all duration-600 shadow-[0_10px_40px_-15px_rgba(28,25,23,0.06)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 20px 60px -15px rgba(28,25,23,0.12)" }}
      data-hover
    >
      {/* Subtle gradient hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-light via-transparent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

      <div className="relative z-10 flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-500">
        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border border-accent/12 mb-4 sm:mb-8 group-hover:border-accent/25 group-hover:scale-105 transition-all duration-500">
          <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
        </div>

        <h3 className="font-display font-light text-2xl sm:text-3xl text-foreground tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-secondary text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          {subtitle}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-3 right-3 w-[1px] h-6 bg-accent/15" />
        <div className="absolute top-3 right-3 w-6 h-[1px] bg-accent/15" />
      </div>
    </motion.a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden bg-background"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-[rgba(241,238,232,0.6)] to-transparent blur-[150px] opacity-70" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Section indicator */}
        <motion.div
          className="flex items-center gap-3 mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-8 h-[1px] bg-accent/30" />
          <span className="text-accent text-[10px] tracking-[0.3em] uppercase font-medium">Contato</span>
          <div className="w-8 h-[1px] bg-accent/30" />
        </motion.div>

        {/* Headline */}
        <motion.div className="text-center mb-14 sm:mb-20" style={{ y: titleY }}>
          <h2 className="font-display font-light text-[clamp(2.2rem,8vw,7rem)] leading-[0.9] tracking-tight text-foreground mb-4 sm:mb-6">
            Vamos Criar Algo
            <br />
            <span className="italic text-accent">Atemporal?</span>
          </h2>
          <p className="text-secondary text-sm sm:text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto">
            Sua essência capturada através de uma lente que entende e valoriza a sua verdadeira arte.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full">
          <ContactCard
            href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20ensaios."
            title="WhatsApp"
            subtitle="Agende sua sessão"
            icon={Phone}
            delay={0.1}
          />
          <ContactCard
            href="https://instagram.com/anaefoto"
            title="Instagram"
            subtitle="Acompanhe o portfólio"
            icon={Instagram}
            delay={0.25}
          />
        </div>
      </motion.div>
    </section>
  );
}
