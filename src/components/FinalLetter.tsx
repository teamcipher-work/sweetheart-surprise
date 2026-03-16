import { useState } from "react";

interface Props {
  onRestart: () => void;
}

const FinalLetter = ({ onRestart }: Props) => {
  const [sealed, setSealed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full rounded-[var(--radius)] bg-card/85 backdrop-blur-md p-8 md:p-10 animate-card-glow text-center">
        <h2 className="font-display text-2xl md:text-3xl text-primary mb-2">
          Final Birthday Letter
        </h2>
        <p className="font-body text-muted-foreground italic mb-6 text-sm">
          Sealed With Love 💌
        </p>

        <img
          src="/images/final_love_letter.png"
          alt="Love letter"
          className="w-40 md:w-48 mx-auto mb-6 drop-shadow-lg"
        />

        <p className="font-body text-foreground leading-relaxed mb-8 text-sm md:text-base">
          As this letter reaches its final words, know that my love for you has no final chapter.
          You are the sunrise I wake up grateful for, the lullaby that soothes my soul, and the
          heartbeat that gives my life its rhythm. Every laugh we've shared is a treasure, every
          tear we've overcome is a testament to our strength, and every quiet moment between us
          is my definition of paradise. I promise to celebrate you not just today, but every single
          day, because someone as extraordinary as you deserves to feel loved infinitely. You are
          my best friend, my greatest adventure, and my forever home. Thank you for existing, for
          choosing me, and for making this world unbearably beautiful just by being in it.
          Happy Birthday, my love. Here's to a lifetime of us. Forever and always yours. 💕
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setSealed(true)}
            className={`glow-btn font-display px-8 py-3 rounded-full transition-all duration-300 text-base tracking-wide ${
              sealed
                ? "bg-accent text-accent-foreground scale-105"
                : "bg-primary text-primary-foreground animate-breathing hover:brightness-110"
            }`}
          >
            {sealed ? "Sealed! 💕" : "Seal The Letter 💌"}
          </button>
          <button
            onClick={onRestart}
            className="font-display px-8 py-3 rounded-full bg-secondary text-secondary-foreground hover:brightness-110 transition-all duration-300 text-base tracking-wide"
          >
            Experience Again ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalLetter;
