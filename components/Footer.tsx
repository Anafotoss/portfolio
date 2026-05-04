"use client";

import { motion } from "framer-motion";

function lenisScrollTo(target: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Footer() {
  const scrollToTop = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 2, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 lg:px-20 bg-background">
      {/* Top divider */}
      <div className="section-divider mb-10 sm:mb-14" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:justify-between">
          {/* Brand */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-display font-light text-2xl sm:text-3xl tracking-wider text-foreground">
              Ana <span className="italic text-accent">Fotos</span>
            </span>
            <p className="text-muted text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-2 font-medium">
              Fotografia de Essência
            </p>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[
              { label: "Início", href: "#hero" },
              { label: "Portfólio", href: "#portfolio" },
              { label: "Sobre", href: "#about" },
              { label: "Contato", href: "#contact" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => lenisScrollTo(link.href)}
                className="text-xs sm:text-sm text-muted hover:text-accent transition-colors duration-400 font-light hover-underline"
                data-hover
              >
                {link.label}
              </button>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <a
              href="https://wa.me/5562994101578"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors duration-400 tracking-[0.15em] uppercase hover-underline"
              data-hover
            >
              WhatsApp
            </a>
            <span className="w-[1px] h-3 bg-foreground/10" />
            <a
              href="https://instagram.com/anaefoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors duration-400 tracking-[0.15em] uppercase hover-underline"
              data-hover
            >
              Instagram
            </a>
          </motion.div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-foreground/8 flex items-center justify-center group hover:border-accent/25 transition-all duration-400"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            data-hover
            aria-label="Voltar ao topo"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-muted group-hover:text-accent transition-colors duration-400">
              <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-10 sm:mt-12 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted/60 text-[10px] sm:text-xs tracking-[0.15em] font-light">
            © {new Date().getFullYear()} Ana Fotos — Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
