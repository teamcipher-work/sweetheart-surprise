import { useState, useEffect, useCallback } from "react";
import LoveLetterIntro from "@/components/LoveLetterIntro";
import CakeWish from "@/components/CakeWish";
import SurpriseCards from "@/components/SurpriseCards";
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_scene.png')" }}
      />
      <div className="fixed inset-0 bg-background/60" />

      <FloatingElements />

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-[800ms] ease-in-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentSection === 0 && <LoveLetterIntro onContinue={() => goToSection(1)} />}
        {currentSection === 1 && <CakeWish onContinue={() => goToSection(2)} />}
        {currentSection === 2 && <SurpriseCards onContinue={() => goToSection(3)} />}
        {currentSection === 3 && <FinalLetter onRestart={restart} />}
      </div>
    </div>
  );
};

export default Index;
