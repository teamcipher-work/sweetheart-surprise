import { useEffect, useState } from "react";

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 8 + Math.random() * 6,
  size: 12 + Math.random() * 20,
}));

const STARS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
  size: 4 + Math.random() * 8,
}));

const CLOUDS = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: 5 + Math.random() * 30,
  delay: i * 8,
  duration: 30 + Math.random() * 20,
  size: 80 + Math.random() * 60,
  opacity: 0.15 + Math.random() * 0.15,
}));

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {/* Hearts */}
      {HEARTS.map((h) => (
        <div
          key={`h-${h.id}`}
          className="absolute animate-float-heart text-primary"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          ♥
        </div>
      ))}

      {/* Stars */}
      {STARS.map((s) => (
        <div
          key={`s-${s.id}`}
          className="absolute animate-float-star text-accent"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            fontSize: `${s.size}px`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Clouds */}
      {CLOUDS.map((c) => (
        <div
          key={`c-${c.id}`}
          className="absolute animate-drift-cloud"
          style={{
            top: `${c.top}%`,
            left: "-150px",
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            width: `${c.size}px`,
            height: `${c.size * 0.5}px`,
            borderRadius: "50%",
            background: "hsl(0 0% 100% / 0.3)",
            filter: "blur(20px)",
            opacity: c.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
