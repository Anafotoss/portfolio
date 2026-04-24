"use client";

import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    // Lower FPS (e.g., 12 or 16) gives a more authentic analog film feeling
    const fps = 12; 
    const interval = 1000 / fps;

    const resize = () => {
      // Use lower resolution for performance — scale up with CSS
      // This naturally creates chunkier, more organic grain
      canvas.width = Math.ceil(window.innerWidth / 2.5);
      canvas.height = Math.ceil(window.innerHeight / 2.5);
    };

    const renderGrain = (time: number) => {
      animationId = requestAnimationFrame(renderGrain);

      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      // Add a slight amber/warm noise to emulate retro 35mm
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v + 30;       // R: slightly warmer
        data[i + 1] = v + 15;   // G: neutral
        data[i + 2] = v;        // B: cooler
        // Organic random alpha varying per pixel
        data[i + 3] = Math.random() * 22; 
      }

      ctx.putImageData(imageData, 0, 0);

      // Add Random Film Scratches (Vertical lines)
      // Only draw occasionally for realistic film wear
      if (Math.random() > 0.6) {
        const numScratches = Math.floor(Math.random() * 3);
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        for (let i = 0; i < numScratches; i++) {
          const x = Math.random() * w;
          const scratchWidth = Math.random() * 1.5 + 0.5;
          ctx.fillRect(x, 0, scratchWidth, h);
        }
      }
      
      // Light leaks / bright scratches
      if (Math.random() > 0.85) {
        ctx.fillStyle = "rgba(255, 230, 200, 0.08)";
        const x = Math.random() * w;
        ctx.fillRect(x, 0, Math.random() * 2 + 1, h);
      }
    };

    resize();
    animationId = requestAnimationFrame(renderGrain);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9995] mix-blend-overlay"
      style={{ opacity: 0.3, imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
