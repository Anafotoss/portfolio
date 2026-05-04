"use client";

import { useEffect, useRef } from "react";

/**
 * Performance-optimized FilmGrain for light theme.
 * Pre-generates a single static noise frame with warm undertones.
 * Uses multiply blend mode for natural grain on light backgrounds.
 */
export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const grainW = 256;
    const grainH = 256;
    canvas.width = grainW;
    canvas.height = grainH;

    // Pre-generate warm-tinted noise tile for light theme
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = grainW;
    noiseCanvas.height = grainH;
    const noiseCtx = noiseCanvas.getContext("2d")!;
    const imageData = noiseCtx.createImageData(grainW, grainH);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 200 + 40;
      data[i] = v + 8;      // R: slightly warm
      data[i + 1] = v + 4;  // G
      data[i + 2] = v;      // B: cooler
      data[i + 3] = Math.random() * 18;
    }
    noiseCtx.putImageData(imageData, 0, 0);

    let animationId: number;
    let lastTime = 0;
    const fps = 8;
    const interval = 1000 / fps;

    const render = (time: number) => {
      animationId = requestAnimationFrame(render);
      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);

      const ox = Math.random() * grainW | 0;
      const oy = Math.random() * grainH | 0;
      ctx.clearRect(0, 0, grainW, grainH);
      ctx.drawImage(noiseCanvas, ox, oy);
      ctx.drawImage(noiseCanvas, ox - grainW, oy);
      ctx.drawImage(noiseCanvas, ox, oy - grainH);
      ctx.drawImage(noiseCanvas, ox - grainW, oy - grainH);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9995] mix-blend-multiply"
      style={{ opacity: 0.08, imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
