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
    <footer className="relative py-10 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:justify-between">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-display font-medium text-2xl sm:text-3xl tracking-wider text-white">
              Ana Fotos
            </span>
            <p className="text-[#C2A88C]/50 text-[10px] sm:text-xs tracking-widest uppercase mt-2 font-medium">
              Essência & Qualidade
            </p>
          </motion.div>

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
                className="text-xs sm:text-sm text-white/50 hover:text-[#C2A88C] transition-colors duration-300 font-light"
                data-hover
              >
                {link.label}
              </button>
            ))}
          </motion.div>

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
              className="text-xs text-white/40 hover:text-[#C2A88C] transition-colors tracking-wider uppercase"
              data-hover
            >
              WhatsApp
            </a>
            <span className="w-[1px] h-3 bg-white/15" />
            <a
              href="https://instagram.com/anaefoto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-[#C2A88C] transition-colors tracking-wider uppercase"
              data-hover
            >
              Instagram
            </a>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center group bg-white/5 hover:bg-white/10 transition-colors duration-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            data-hover
            aria-label="Voltar ao topo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50 group-hover:text-white transition-colors duration-300">
              <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        <motion.div
          className="mt-10 sm:mt-12 pt-6 sm:pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-white/30 text-[10px] sm:text-xs tracking-wider font-light">
            © {new Date().getFullYear()} Ana Fotos — Todos os direitos reservados
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
