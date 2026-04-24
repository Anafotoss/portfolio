"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Início", href: "#hero" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Sobre", href: "#about" },
  { name: "Contato", href: "#contact" },
];

function lenisScrollTo(target: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
    const sections = ["contact", "about", "portfolio", "hero"];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) {
        setActiveSection(id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).__lenis;
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => { 
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => lenisScrollTo(href), isMobileMenuOpen ? 350 : 0);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 lg:mt-8 pointer-events-none px-4">
        <motion.nav
          className={`pointer-events-auto transition-all duration-700 ease-out flex items-center justify-between
            ${isScrolled ? "glass-pill py-3 px-6 lg:px-8 shadow-[0_8px_40px_rgba(0,0,0,0.5)]" : "bg-transparent py-3 px-4 lg:px-6"}
          `}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, width: isScrolled ? "auto" : "100%", maxWidth: "1200px" }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <button onClick={() => handleNavClick("#hero")} className="group flex items-center pr-8 lg:pr-16" data-hover>
            <motion.span
              className="font-display font-medium text-xl sm:text-2xl tracking-wide text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Ana<span className="text-[#C2A88C] mx-0.5">.</span>
            </motion.span>
          </button>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-xs lg:text-sm tracking-widest uppercase transition-colors duration-300 group ${
                  activeSection === link.href.slice(1) ? "text-white" : "text-white/50 hover:text-white"
                }`}
                data-hover
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C2A88C] shadow-[0_0_6px_rgba(194,168,140,0.5)]"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span className="w-5 h-[1.5px] bg-white block origin-center" animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />
            <motion.span className="w-4 h-[1.5px] bg-white block ml-auto" animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="w-5 h-[1.5px] bg-white block origin-center" animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />
          </button>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.button
                    onClick={() => handleNavClick(link.href)}
                    className={`font-display text-4xl sm:text-5xl font-light tracking-wide py-2 transition-colors duration-300 ${
                      activeSection === link.href.slice(1) ? "text-white" : "text-white/40 active:text-white"
                    }`}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {link.name}
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              className="absolute bottom-12 flex gap-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <a href="https://wa.me/5562994101578" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C2A88C] text-xs tracking-widest uppercase transition-colors">WhatsApp</a>
              <a href="https://instagram.com/anaefoto" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C2A88C] text-xs tracking-widest uppercase transition-colors">Instagram</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
