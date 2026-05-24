import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPHERE_INFO } from "@/types";

gsap.registerPlugin(ScrollTrigger);

function SphereIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "radiating-lines":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="4" stroke="#B8860B" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="20"
              y1="20"
              x2={20 + 14 * Math.cos((angle * Math.PI) / 180)}
              y2={20 + 14 * Math.sin((angle * Math.PI) / 180)}
              stroke="#B8860B"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    case "grid-pattern":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect
            x="10"
            y="10"
            width="20"
            height="20"
            stroke="#B8860B"
            strokeWidth="1.5"
          />
          <line x1="10" y1="20" x2="30" y2="20" stroke="#B8860B" strokeWidth="1" />
          <line x1="20" y1="10" x2="20" y2="30" stroke="#B8860B" strokeWidth="1" />
        </svg>
      );
    case "waveform":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M8 20 Q12 12, 16 20 T24 20 T32 20"
            stroke="#B8860B"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="8" cy="20" r="2" fill="#B8860B" />
          <circle cx="32" cy="20" r="2" fill="#B8860B" />
        </svg>
      );
    case "ascending-bars":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="8" y="26" width="5" height="8" fill="#B8860B" />
          <rect x="16" y="20" width="5" height="14" fill="#B8860B" />
          <rect x="24" y="14" width="5" height="20" fill="#B8860B" />
          <rect x="32" y="8" width="5" height="26" fill="#B8860B" />
        </svg>
      );
    case "concentric-circles":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#B8860B" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" stroke="#B8860B" strokeWidth="1" />
          <circle cx="20" cy="20" r="4" fill="#B8860B" />
        </svg>
      );
    case "kinetic-arc":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M8 32 Q20 8, 32 32"
            stroke="#B8860B"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="8" cy="32" r="2.5" fill="#B8860B" />
          <circle cx="32" cy="32" r="2.5" fill="#B8860B" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DiagnosticSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [demoPercentages] = useState([73, 65, 81, 58, 70, 77]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".sphere-card");
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      id="diagnostic"
      ref={sectionRef}
      className="relative py-[120px] bg-[#E8DCC8] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <p className="font-mono-label text-[13px] tracking-[0.12em] uppercase text-[#B8860B] mb-4">
            Глава вторая
          </p>
          <h2 className="font-display text-[36px] sm:text-[42px] lg:text-[48px] text-[#1A1A1A] leading-[1.1]">
            Шесть сфер развития
          </h2>
          <p className="font-body text-base sm:text-lg text-[#5C4A3A] mt-4 max-w-[640px] mx-auto">
            Диагностика по методике Монтессори — оценка навыков в шести
            ключевых областях от рождения до трёх лет
          </p>
          <span
            className="font-handwritten text-lg sm:text-xl text-[#B8860B] absolute -top-2 right-[5%] sm:right-[15%] pointer-events-none"
            style={{ transform: "rotate(3deg)" }}
          >
            отмечайте навыки ребёнка
          </span>
        </div>

        {/* Sphere grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPHERE_INFO.map((sphere, i) => (
            <div
              key={sphere.key}
              className="sphere-card bg-[#F5F0E8] border border-[#5C4A3A]/15 p-8 sm:p-10 transition-all duration-400 hover:border-[#B8860B] hover:shadow-[0_8px_32px_rgba(26,26,26,0.06)] group opacity-0"
            >
              {/* Percentage */}
              <div className="flex justify-between items-start mb-6">
                <div className="text-[#B8860B]">
                  <SphereIcon icon={sphere.icon} />
                </div>
                <span className="font-display text-[36px] text-[#1A1A1A] leading-none">
                  {demoPercentages[i]}%
                </span>
              </div>

              {/* Title */}
              <h3 className="font-label text-xl font-semibold text-[#1A1A1A] mb-3 tracking-wide">
                {sphere.key}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-[#5C4A3A] leading-relaxed mb-6">
                {sphere.description}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#5C4A3A]/10 overflow-hidden">
                <div
                  className="h-full bg-[#B8860B] transition-all duration-1000"
                  style={{ width: `${demoPercentages[i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
