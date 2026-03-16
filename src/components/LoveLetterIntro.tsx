interface Props {
  onContinue: () => void;
}

const LoveLetterIntro = ({ onContinue }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full rounded-[var(--radius)] bg-card/80 backdrop-blur-md p-8 md:p-10 animate-card-glow text-center">
        <h1 className="font-display text-3xl md:text-4xl text-primary mb-6 leading-relaxed">
          A Birthday Love Letter
        </h1>
        <p className="font-display text-lg md:text-xl text-secondary mb-8 italic">
          From My Heart to the Birthday Queen
        </p>

        <img
          src="/images/cat_couple.png"
          alt="Cute cat couple"
          className="w-48 md:w-56 mx-auto mb-8 drop-shadow-lg"
        />

        <p className="font-body text-foreground leading-relaxed mb-8 text-sm md:text-base">
          My dearest love, today the universe celebrates the most beautiful soul it ever created — you. 
          From the moment you came into my life, every sunrise became more golden, every melody more sweet, 
          and every heartbeat carried your name. You are the poetry I never knew I could write, the dream 
          I never want to wake from, and the miracle I thank the stars for every single night. On this 
          magical day, I want you to know that my love for you is deeper than the ocean, brighter than 
          a thousand suns, and more infinite than the cosmos itself. You deserve all the happiness, all 
          the laughter, and all the love this world has to offer. Happy Birthday, my everything. May this 
          year bring you closer to every dream your beautiful heart desires. I love you beyond words, 
          beyond time, beyond forever. 💕
        </p>

        <button
          onClick={onContinue}
          className="font-body font-semibold px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base"
        >
          Continue the Surprise ✨
        </button>
      </div>
    </div>
  );
};

export default LoveLetterIntro;
