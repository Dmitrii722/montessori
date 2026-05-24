import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import PathSection from "@/sections/PathSection";
import DiagnosticSection from "@/sections/DiagnosticSection";
import AgeArchive from "@/sections/AgeArchive";
import Footer from "@/sections/Footer";
import type { SurveyResult } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const PrintReport = lazy(() => import("@/sections/PrintReport"));

function App() {
  const [showPrint, setShowPrint] = useState(false);
  const [printResult, setPrintResult] = useState<SurveyResult | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

   useEffect(() => {
  const lenis = new Lenis({
    lerp: 0.08,
    duration: 1.2,
  });
  lenisRef.current = lenis;

  // Единственный правильный способ связать Lenis + GSAP
  lenis.on("scroll", ScrollTrigger.update);
  
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf); // важно очистить ticker
  };
}, []);

  const handlePrint = (result?: SurveyResult) => {
    if (result) {
      setPrintResult(result);
      setShowPrint(true);
    } else {
      window.print();
    }
  };

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -64 });
    }
  };

  return (
    <div className="bg-parchment min-h-screen">
      <Navigation scrollTo={scrollTo} onPrint={() => handlePrint()} />
      <Hero />
      <PathSection />
      <DiagnosticSection />
      <AgeArchive onPrint={handlePrint} />
      <Footer scrollTo={scrollTo} />
      {showPrint && printResult && (
        <Suspense fallback={null}>
          <PrintReport
            result={printResult}
            onClose={() => setShowPrint(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
