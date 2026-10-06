'use client';

import { cn } from '@/libs/utils';
import createGlobe from 'cobe';
import { useIsDarkTheme } from '@/hooks/use-is-dark-theme';
import { useEffect, useRef } from 'react';

type Rgb = [number, number, number];

const ASIA_PHI = Math.PI - ((95 * Math.PI) / 180 - Math.PI / 2);

const BRAND: Rgb = [0.46, 0.39, 1];

const GLOBE_THEME = {
  dark: 1,
  baseColor: [0.32, 0.3, 0.45] as Rgb,
  glowColor: [0.28, 0.24, 0.6] as Rgb,
  mapBrightness: 5,
  diffuse: 1.4,
};

const LIGHT_GLOW: Rgb = [0.185, 0.158, 0.396];

type AuthGlobeProps = {
  className?: string;
};

export default function AuthGlobe({ className }: AuthGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragOffset = useRef(0);
  const isDark = useIsDarkTheme();
  const glowColor = useRef(GLOBE_THEME.glowColor);
  glowColor.current = isDark ? GLOBE_THEME.glowColor : LIGHT_GLOW;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    let size = canvas.offsetWidth;
    let phi = ASIA_PHI;
    let frame = 0;

    const globe = createGlobe(canvas, {
      ...GLOBE_THEME,
      width: size * devicePixelRatio,
      height: size * devicePixelRatio,
      devicePixelRatio,
      phi,
      theta: 0.25,
      mapSamples: 16000,
      markerColor: BRAND,
    });

    const resizeObserver = new ResizeObserver(() => {
      size = canvas.offsetWidth;
    });
    resizeObserver.observe(canvas);

    const render = () => {
      if (dragStartX.current === null && !reduceMotion) phi += 0.001;
      globe.update({
        glowColor: glowColor.current,
        phi: phi + dragOffset.current,
        width: size * devicePixelRatio,
        height: size * devicePixelRatio,
      });
      frame = requestAnimationFrame(render);
    };
    render();

    canvas.style.opacity = '1';

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <div
      className={cn(
        'relative aspect-square w-full',
        !isDark && 'hue-rotate-180 invert',
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="size-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size] active:cursor-grabbing"
        onPointerDown={(event) => {
          dragStartX.current = event.clientX - dragOffset.current * 200;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragStartX.current === null) return;
          dragOffset.current = (event.clientX - dragStartX.current) / 200;
        }}
        onPointerUp={() => {
          dragStartX.current = null;
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      />
    </div>
  );
}
