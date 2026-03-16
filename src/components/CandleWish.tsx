import { useState, useCallback } from "react";

interface Props {
  onContinue: () => void;
}

const CandleWish = ({ onContinue }: Props) => {
  const [extinguished, setExtinguished] = useState([false, false, false]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const blowCandle = useCallback(
    (index: number) => {
      if (extinguished[index]) return;

      // Add sparkles around the candle
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: 25 + index * 25 + (Math.random() - 0.5) * 15,
        y: 10 + (Math.random() - 0.5) * 10,
      }));
      setSparkles((prev) => [...prev, ...newSparkles]);

      setExtinguished((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });

      // Clear sparkles after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.find((n) => n.id === s.id)));
      }, 1000);
    },
    [extinguished]
  );

  const allOut = extinguished.every(Boolean);

  // Candle positions relative to the cake image
  const candlePositions = [
    { left: "32%", bottom: "62%" },
    { left: "50%", bottom: "66%" },
    { left: "68%", bottom: "62%" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full rounded-[var(--radius)] bg-card/85 backdrop-blur-md p-8 md:p-10 animate-card-glow text-center relative overflow-hidden">
        {/* Sparkles */}
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute animate-sparkle text-accent z-20 text-sm"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            ✦
          </div>
        ))}

        <h2 className="font-display text-2xl md:text-3xl text-primary mb-3">
          Make a Wish! 🎂
        </h2>
        <p className="font-body text-muted-foreground mb-6 text-sm">
          Tap each candle to blow it out
        </p>

        {/* Cake with candles */}
        <div className="relative inline-block mb-8 w-56 md:w-64 mx-auto">
          <img
            src="/images/candle_cake.png"
            alt="Birthday cake"
            className="w-full drop-shadow-lg"
          />

          {/* Clickable candle flame areas */}
          {candlePositions.map((pos, i) => (
            <button
              key={i}
              onClick={() => blowCandle(i)}
              className="absolute w-8 h-10 z-10 cursor-pointer"
              style={{ left: pos.left, bottom: pos.bottom, transform: "translateX(-50%)" }}
              aria-label={`Blow candle ${i + 1}`}
            >
              {!extinguished[i] && (
                <div className="w-3 h-5 mx-auto rounded-full bg-accent animate-candle-flicker drop-shadow-[0_0_8px_hsl(0_70%_55%/0.6)]" />
              )}
              {extinguished[i] && (
                <div className="w-2 h-3 mx-auto rounded-full bg-muted-foreground/30 animate-bounce-in" />
              )}
            </button>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {extinguished.map((out, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                out ? "bg-primary scale-110" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {allOut && (
          <div className="animate-bounce-in">
            <p className="font-display text-xl text-primary mb-4">
              WISH GRANTED ✨
            </p>
            <button
              onClick={onContinue}
              className="glow-btn font-display px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base tracking-wide"
            >
              CONTINUE THE SURPRISE 💖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandleWish;
