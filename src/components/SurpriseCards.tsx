import { useState } from "react";

interface Props {
  onContinue: () => void;
}

const cards = [
  {
    image: "/images/hello_kitty_card.png",
    message: "You are the sweetest gift life has ever given me. Every moment with you feels like unwrapping happiness. Happy Birthday, my love! 🎀",
  },
  {
    image: "/images/kitty_love_card.png",
    message: "My heart beats only for you. You make every ordinary day feel like a fairytale. Wishing you a birthday as magical as you are! 💗",
  },
  {
    image: "/images/spiderman_kitty_card.png",
    message: "You're my superhero and my soulmate. No universe, no timeline exists where I wouldn't choose you. Happy Birthday, my forever! 🕸️💕",
  },
];

const SurpriseCards = ({ onContinue }: Props) => {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const flipCard = (index: number) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const allFlipped = flipped.every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
          Birthday Surprise Cards 🎁
        </h2>
        <p className="font-body text-foreground mb-10 text-sm md:text-base">
          Click each card to reveal a hidden birthday message.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flip-card cursor-pointer mx-auto w-full max-w-[220px] h-72"
              onClick={() => flipCard(i)}
            >
              <div className={`flip-card-inner w-full h-full relative ${flipped[i] ? "flipped" : ""}`}>
                {/* Front */}
                <div className="flip-card-front absolute inset-0 rounded-[var(--radius)] bg-card/80 backdrop-blur-md p-4 flex flex-col items-center justify-center animate-card-glow">
                  <img
                    src={card.image}
                    alt={`Card ${i + 1}`}
                    className="w-28 h-28 object-contain mb-4 drop-shadow-md"
                  />
                  <p className="font-body text-muted-foreground text-xs">Tap to reveal ✨</p>
                </div>
                {/* Back */}
                <div className="flip-card-back absolute inset-0 rounded-[var(--radius)] bg-secondary/60 backdrop-blur-md p-6 flex items-center justify-center">
                  <p className="font-body text-foreground text-sm leading-relaxed">
                    {card.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allFlipped && (
          <div className="animate-fade-section">
            <button
              onClick={onContinue}
              className="font-body font-semibold px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base"
            >
              One Last Surprise 💝
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurpriseCards;
