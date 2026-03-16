import { useState, useEffect } from "react";

interface Props {
  onContinue: () => void;
}

interface LetterData {
  title: string;
  message: string;
}

const LetterIntro = ({ onContinue }: Props) => {
  const [opened, setOpened] = useState(false);
  const [letter, setLetter] = useState<LetterData | null>(null);

  useEffect(() => {
    fetch("/user_content/letter.json")
      .then((r) => r.json())
      .then((data: LetterData) => setLetter(data))
      .catch(() =>
        setLetter({
          title: "Happy Birthday My Love 💖",
          message: "Your birthday message here...",
        })
      );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 animate-fade-section">
      <div className="max-w-lg w-full text-center">
        {!opened ? (
          <div className="animate-fade-section">
            <img
              src="/images/hello_kitty_intro.png"
              alt="Hello Kitty with letter"
              className="w-44 md:w-56 mx-auto mb-6 drop-shadow-lg"
            />

            <div className="rounded-[var(--radius)] bg-card/85 backdrop-blur-md p-6 md:p-8 animate-card-glow mb-6">
              <p className="font-body text-foreground text-base md:text-lg leading-relaxed">
                Hey, cutie 💖
                <br />
                I have a special birthday letter for you.
                <br />
                Click below to open it!
              </p>
            </div>

            <button
              onClick={() => setOpened(true)}
              className="glow-btn font-display px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base tracking-wide"
            >
              OPEN THE LETTER 💌
            </button>
          </div>
        ) : (
          <div className="animate-fade-section">
            {/* Envelope animation */}
            <div className="relative mx-auto mb-6 w-full max-w-2xl">
              {/* Envelope body */}
              <div className="bg-secondary/40 backdrop-blur-md rounded-[var(--radius)] border border-border/50 overflow-hidden">
                {/* Envelope flap */}
                <div className="h-12 bg-primary/20 animate-envelope-open" />

                {/* Letter content */}
                <div className="animate-letter-rise p-6 md:p-8">
                  {letter && (
                    <>
                      <h2 className="font-display text-2xl md:text-3xl text-primary mb-4">
                        {letter.title}
                      </h2>
                      <p className="font-body text-foreground text-sm md:text-base leading-relaxed mb-6">
                        {letter.message}
                      </p>
                    </>
                  )}

                  <button
                    onClick={onContinue}
                    className="glow-btn font-display px-8 py-3 rounded-full bg-primary text-primary-foreground animate-breathing hover:brightness-110 transition-all duration-300 text-base tracking-wide"
                  >
                    CONTINUE THE SURPRISE ✨
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterIntro;
