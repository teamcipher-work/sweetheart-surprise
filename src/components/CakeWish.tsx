import { useState, useCallback } from "react";

interface Props {
  onContinue: () => void;
}

const CakeWish = ({ onContinue }: Props) => {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number }>>([]);

  const blowCandles = useCallback(() => {
    if (blown) return;

    // Create sparkles
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: 30 + Math.random() * 40,
      top: 20 + Math.random() * 30,
    }));
    setSparkles(newSparkles);

    // Create confetti
    const colors = [
      "hsl(346, 100%, 86%)",
      "hsl(280, 47%, 82%)",
      "hsl(51, 100%, 50%)",
      "hsl(0, 0%, 100%)",
      "hsl(340, 60%, 70%)",
    ];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);

    setTimeout(() => setBlown(true), 300);
  }, [blown]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full rounded-[var(--radius)] bg-card/80 backdrop-blur-md p-8 md:p-10 animate-card-glow text-center relative overflow-hidden">
        {/* Confetti */}
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2 h-3 rounded-sm animate-confetti z-20"
            style={{
              left: `${c.left}%`,
              top: "-10px",
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

        {/* Sparkles */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute animate-sparkle text-accent z-20 text-lg"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDuration: `${0.5 + Math.random()}s`,
            }}
          >
            ✦
          </div>
        ))}

        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
          It's Cake Time! 🎂
        </h2>
        <p className="font-body text-foreground mb-8 text-sm md:text-base">
          Close your eyes, make a wish, and tap the cake to blow the candles.
        </p>

        <div className="relative inline-block cursor-pointer mb-8" onClick={blowCandles}>
          {/* Candle glow overlay */}
          {!blown && (
            <div className="absolute inset-0 z-10 flex items-start justify-center pt-2">
              <div className="w-32 h-16 bg-accent/30 rounded-full blur-xl animate-candle-flicker" />
            </div>
          )}
          <img
            src="/images/birthday_cake.png"
            alt="Birthday cake"
            className={`w-56 md:w-64 mx-auto drop-shadow-lg transition-all duration-500 hover:scale-105 ${
              blown ? "brightness-90" : ""
            }`}
          />
          {blown && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-fade-section">🌟</span>
            </div>
          )}
        </div>

        {blown && (
          <div className="animate-fade-section">
            <p className="font-body text-foreground mb-6 text-sm">
              Your wish has been sent to the stars! ✨
            </p>
            <button
              onClick={onContinue}
              className="font-body font-semibold px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base"
            >
              I've Made My Wish 💖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CakeWish;
