interface Props {
  onRestart: () => void;
}

const FinalLetter = ({ onRestart }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full rounded-[var(--radius)] bg-card/80 backdrop-blur-md p-8 md:p-10 animate-card-glow text-center">
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-6">
          Final Birthday Letter
        </h2>
        <p className="font-display text-lg text-secondary italic mb-6">
          Sealed With Love
        </p>

        <img
          src="/images/final_love_letter.png"
          alt="Love letter"
          className="w-48 md:w-56 mx-auto mb-8 drop-shadow-lg"
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
          Happy Birthday, my love. Here's to a lifetime of us. Forever and always yours. 💌
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              // Seal animation - just a visual confirmation
              const el = document.getElementById("seal-text");
              if (el) {
                el.textContent = "Sealed! 💕";
                el.classList.add("scale-110");
              }
            }}
            className="font-body font-semibold px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base"
          >
            <span id="seal-text">Seal The Letter 💌</span>
          </button>
          <button
            onClick={onRestart}
            className="font-body font-semibold px-8 py-3 rounded-full bg-secondary text-secondary-foreground hover:brightness-110 transition-all duration-300 text-base"
          >
            Experience Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalLetter;
