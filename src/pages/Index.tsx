import { useState, useCallback } from "react";
import LetterIntro from "@/components/LetterIntro";
import CandleWish from "@/components/CandleWish";
import MemoryGame from "@/components/MemoryGame";
import FinalLetter from "@/components/FinalLetter";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goToSection = useCallback((section: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setTransitioning(false);
    }, 800);
  }, []);

  const restart = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentSection(0);
      setTransitioning(false);
    }, 800);
  }, []);

  return (
    <div className="grain-overlay relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_scene.png')" }}
      />
      <div className="fixed inset-0 bg-background/50" />

      <FloatingElements />

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-[800ms] ease-in-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentSection === 0 && <LetterIntro onContinue={() => goToSection(1)} />}
        {currentSection === 1 && <CandleWish onContinue={() => goToSection(2)} />}
        {currentSection === 2 && <MemoryGame onContinue={() => goToSection(3)} />}
        {currentSection === 3 && <FinalLetter onRestart={restart} />}
      </div>
    </div>
  );
};

export default Index;
