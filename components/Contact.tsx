"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// Hook for extreme 3D tilt effect on the contact monoliths
function useContactTilt() {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Aggressive tilt for the dramatic monolith effect
    const tiltX = (y - 0.5) * -20; 
    const tiltY = (x - 0.5) * 20;
    ref.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    const glare = ref.current.querySelector('.glass-glare') as HTMLElement;
    if (glare) {
      glare.style.left = `${x * 100}%`;
      glare.style.top = `${y * 100}%`;
      glare.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      const glare = ref.current.querySelector('.glass-glare') as HTMLElement;
      if (glare) {
        glare.style.opacity = '0';
      }
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}

function ContactMonolith({ 
  href, 
  title, 
  subtitle, 
  icon: Icon,
  delay
}: { 
  href: string, 
  title: string, 
  subtitle: string, 
  icon: React.ElementType,
  delay: number 
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useContactTilt();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-center w-full sm:w-[400px] h-[300px] sm:h-[450px] glass-strong rounded-[2rem] border border-white/10 group overflow-hidden transition-transform duration-500 ease-out"
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Specular Glare */}
      <div 
        className="glass-glare absolute w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(194,168,140,0.05) 30%, transparent 60%)",
          filter: "blur(20px)",
          top: "50%",
          left: "50%"
        }}
      />
      
      {/* Retro Viewfinder Framing Decoration */}
      <div className="absolute inset-4 sm:inset-6 border-[0.5px] border-white/10 opacity-50 pointer-events-none flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-t border-l border-white/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-b border-r border-white/30" />
      </div>

      <div className="relative z-20 flex flex-col items-center group-hover:-translate-y-4 transition-transform duration-500">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-[#E8DDD3] to-[#C2A88C] shadow-[0_0_40px_rgba(194,168,140,0.3)] mb-6 sm:mb-8 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(194,168,140,0.6)] transition-all duration-500">
          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-black" strokeWidth={1.5} />
        </div>
        
        <h3 className="font-display text-3xl sm:text-4xl text-white font-medium tracking-tight mb-2 rgb-split-hover">
          {title}
        </h3>
        <p className="text-[#C2A88C] text-[10px] sm:text-xs tracking-[0.3em] font-mono uppercase">
          {subtitle}
        </p>
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

  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col items-center justify-center py-20 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Cinematic Background Light */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gradient-to-b from-[rgba(194,168,140,0.08)] to-transparent blur-[150px] mix-blend-screen opacity-70" />
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Retro Recording Sign */}
        <motion.div 
          className="glass px-4 py-1.5 rounded-full flex items-center gap-2 mb-10 sm:mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_red]" />
          <span className="text-[9px] text-white/70 tracking-[0.3em] font-mono">READY TO SHOOT</span>
        </motion.div>

        {/* Dramatic Typography with Chromatic Aberration */}
        <motion.div 
          className="text-center mb-16 sm:mb-24"
          style={{ y: titleY }}
        >
          <h2 className="font-display font-bold text-[clamp(3.5rem,10vw,8rem)] leading-[0.85] tracking-tighter text-white mb-6">
            Vamos Criar Algo <br/>
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8DDD3] via-[#C2A88C] to-[#E8DDD3] chromatic-text rgb-split-hover" 
              data-text="Atemporal?"
            >
              Atemporal?
            </span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            Sua essência capturada através de uma lente que entende e valoriza a sua verdadeira arte.
          </p>
        </motion.div>

        {/* The 3D Glass Monoliths */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center justify-center w-full px-4 sm:px-0">
          <ContactMonolith 
            href="https://wa.me/5562994101578?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20seus%20ensaios."
            title="WhatsApp"
            subtitle="Agende sua sessão"
            icon={Phone}
            delay={0.2}
          />
          <ContactMonolith 
            href="https://instagram.com/ana_fotos__"
            title="Instagram"
            subtitle="Acompanhe o portfólio"
            icon={Instagram}
            delay={0.4}
          />
        </div>
      </motion.div>
    </section>
  );
}
