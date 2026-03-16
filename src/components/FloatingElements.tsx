const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 10 + Math.random() * 8,
  size: 10 + Math.random() * 16,
}));

const STARS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
  size: 4 + Math.random() * 6,
}));

const CLOUDS = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  top: 5 + Math.random() * 25,
  delay: i * 10,
  duration: 35 + Math.random() * 20,
  size: 80 + Math.random() * 60,
  opacity: 0.12 + Math.random() * 0.1,
}));

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
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
            background: "hsl(0 0% 100% / 0.35)",
            filter: "blur(20px)",
            opacity: c.opacity,
          }}
        />
      ))}

      {/* Ribbons */}
      {[15, 85].map((left, i) => (
        <div
          key={`r-${i}`}
          className="absolute animate-ribbon text-primary/20"
          style={{
            left: `${left}%`,
            top: `${10 + i * 30}%`,
            fontSize: '24px',
          }}
        >
          🎀
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
