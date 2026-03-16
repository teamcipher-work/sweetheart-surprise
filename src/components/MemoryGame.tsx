import { useState, useCallback, useEffect } from "react";

interface Props {
  onContinue: () => void;
}

interface Card {
  id: number;
  image: string;
  isBomb: boolean;
  matched: boolean;
  flipped: boolean;
}

const CARD_IMAGES = [
  "/images/hello_kitty_spidy1.png",
  "/images/hello_kitty_spidy2.png",
  "/images/hello_kitty_spidy3.png",
  "/images/hello_kitty_spidy4.png",
];

function shuffleCards(): Card[] {
  const cards: Card[] = [];
  // 4 pairs = 8 cards
  CARD_IMAGES.forEach((img, idx) => {
    cards.push({ id: idx * 2, image: img, isBomb: false, matched: false, flipped: false });
    cards.push({ id: idx * 2 + 1, image: img, isBomb: false, matched: false, flipped: false });
  });
  // 1 bomb card
  cards.push({ id: 8, image: "/images/bomb_card.png", isBomb: true, matched: false, flipped: false });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const MemoryGame = ({ onContinue }: Props) => {
  const [cards, setCards] = useState<Card[]>(() => shuffleCards());
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [bombHit, setBombHit] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  const matchCount = cards.filter((c) => c.matched).length;

  const resetGame = useCallback(() => {
    setBombHit(true);
    setLocked(true);
    setTimeout(() => {
      setCards(shuffleCards());
      setSelected([]);
      setLocked(false);
      setBombHit(false);
    }, 1200);
  }, []);

  const handleFlip = useCallback(
    (index: number) => {
      if (locked || cards[index].flipped || cards[index].matched || selected.length >= 2) return;

      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);

      // Check for bomb
      if (newCards[index].isBomb) {
        setTimeout(() => resetGame(), 600);
        return;
      }

      const newSelected = [...selected, index];
      setSelected(newSelected);

      if (newSelected.length === 2) {
        setLocked(true);
        const [first, second] = newSelected;

        if (newCards[first].image === newCards[second].image) {
          // Match!
          setTimeout(() => {
            const updated = [...newCards];
            updated[first].matched = true;
            updated[second].matched = true;
            setCards(updated);
            setSelected([]);
            setLocked(false);

            // Check win (all 8 non-bomb cards matched)
            if (updated.filter((c) => c.matched).length === 8) {
              setCompleted(true);
              // Confetti
              const colors = [
                "hsl(346, 80%, 60%)",
                "hsl(340, 50%, 85%)",
                "hsl(0, 70%, 55%)",
                "hsl(0, 0%, 100%)",
                "hsl(50, 100%, 65%)",
              ];
              setConfetti(
                Array.from({ length: 40 }, (_, i) => ({
                  id: i,
                  left: Math.random() * 100,
                  color: colors[Math.floor(Math.random() * colors.length)],
                  delay: Math.random() * 0.5,
                }))
              );
            }
          }, 400);
        } else {
          // No match — flip back
          setTimeout(() => {
            const updated = [...newCards];
            updated[first].flipped = false;
            updated[second].flipped = false;
            setCards(updated);
            setSelected([]);
            setLocked(false);
          }, 800);
        }
      }
    },
    [cards, selected, locked, resetGame]
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-md w-full text-center relative">
        {/* Confetti */}
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-2 h-3 rounded-sm animate-confetti z-30"
            style={{
              left: `${c.left}%`,
              top: "-10px",
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}

        <h2 className="font-display text-2xl md:text-3xl text-primary mb-2">
          Memory Game 🎮
        </h2>
        <p className="font-body text-muted-foreground mb-6 text-sm">
          Match the pairs! Watch out for the bomb 💣
        </p>

        {bombHit && (
          <div className="animate-bounce-in mb-4">
            <p className="font-display text-lg text-accent">💥 BOOM! Shuffling...</p>
          </div>
        )}

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 mx-auto max-w-xs">
          {cards.map((card, i) => (
            <div
              key={card.id + "-" + i}
              className="flip-card cursor-pointer aspect-square"
              onClick={() => handleFlip(i)}
            >
              <div
                className={`flip-card-inner w-full h-full relative ${
                  card.flipped || card.matched ? "flipped" : ""
                }`}
              >
                {/* Front (hidden) */}
                <div className="flip-card-front absolute inset-0 rounded-[var(--radius)] bg-card/90 backdrop-blur-md flex items-center justify-center animate-card-glow border border-border/50">
                  <span className="text-2xl text-primary">🎀</span>
                </div>
                {/* Back (revealed) */}
                <div className="flip-card-back absolute inset-0 rounded-[var(--radius)] bg-secondary/50 backdrop-blur-md flex items-center justify-center border border-border/50">
                  <img
                    src={card.image}
                    alt="card"
                    className={`w-14 h-14 object-contain drop-shadow-sm ${
                      card.matched ? "opacity-70" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <p className="font-body text-muted-foreground text-xs mb-4">
          {matchCount / 2} / 4 pairs matched
        </p>

        {completed && (
          <div className="animate-bounce-in">
            <p className="font-display text-2xl text-primary mb-2">Yay! 🎉</p>
            <p className="font-body text-foreground text-sm mb-4">
              You matched them all!
            </p>
            <button
              onClick={onContinue}
              className="glow-btn font-display px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base tracking-wide"
            >
              SEE YOUR SURPRISE 💝
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;
