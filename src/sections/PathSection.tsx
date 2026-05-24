import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: "2009", text: "Начало пути. Учитель начальных классов" },
  { year: "2015", text: "Погружение в метод Монтессори" },
  { year: "2019", text: "Сертификация AMI 0-3" },
  { year: "2024", text: "Собственная студия и книга" },
];

export default function PathSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textCol = textColRef.current;
    if (!section || !textCol) return;

    // Text column entrance
    const textElements = textCol.querySelectorAll(".path-animate");
    gsap.fromTo(
      textElements,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Timeline SVG stroke animation
    const line = timelineRef.current?.querySelector(".timeline-line");
    const circles = timelineRef.current?.querySelectorAll(".timeline-circle");
    const labels = timelineRef.current?.querySelectorAll(".timeline-label");

    if (line) {
      const totalLength = (line as SVGLineElement).getTotalLength?.() || 440;
      gsap.set(line, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
      });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        },
      });
    }

    if (circles) {
      gsap.fromTo(
        circles,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }

    if (labels) {
      gsap.fromTo(
        labels,
        { x: 15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="path"
      ref={sectionRef}
      className="relative py-[120px] bg-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          {/* Left column - text */}
          <div ref={textColRef} className="lg:w-[45%] relative">
            <p className="path-animate font-mono-label text-[13px] tracking-[0.12em] uppercase text-[#B8860B] mb-4 opacity-0">
              Глава первая
            </p>
            <h2 className="path-animate font-display text-[36px] sm:text-[42px] lg:text-[48px] text-[#1A1A1A] leading-[1.1] mb-8 opacity-0">
              Путь учителя
            </h2>
            <p className="path-animate font-body text-base sm:text-lg text-[#1A1A1A] leading-[1.7] mb-6 opacity-0">
              Более 15 лет в образовании. Путь от классического учителя
              начальных классов к сертифицированному педагогу Монтессори.
              Специализация: дети от рождения до трёх лет — самый важный период
              формирования личности.
            </p>
            <p className="path-animate font-body text-base text-[#5C4A3A] leading-[1.7] mb-8 opacity-0">
              Ирина Сергеевна прошла полный цикл обучения по методу Монтессори
              AMI (Association Montessori Internationale), включая стажировку в
              международных центрах. Её подход сочетает глубокое знание метода
              с искренней любовью к каждому ребёнку.
            </p>

            {/* Teacher portrait */}
            <div className="path-animate relative mt-8 opacity-0">
              <img
                src="/assets/teacher-portrait.jpg"
                alt="Ирина Сергеевна Кичигина"
                className="w-full max-w-[380px] h-auto object-cover"
                style={{
                  boxShadow: "0 12px 40px rgba(26, 26, 26, 0.15)",
                }}
              />
              <span className="font-handwritten text-lg text-[#B8860B] absolute -bottom-3 -right-2 sm:right-4 pointer-events-none"
                style={{ transform: "rotate(-4deg)" }}
              >
                каждый ребёнок — это свет
              </span>
            </div>
          </div>

          {/* Right column - timeline */}
          <div className="lg:w-[55%] flex items-center justify-center">
            <svg
              ref={timelineRef}
              viewBox="0 0 400 500"
              className="w-full max-w-[400px] h-auto"
              style={{ overflow: "visible" }}
            >
              {/* Vertical dashed line */}
              <line
                className="timeline-line"
                x1="60"
                y1="30"
                x2="60"
                y2="470"
                stroke="#5C4A3A"
                strokeWidth="1"
                strokeDasharray="4 4"
                fill="none"
              />

              {/* Milestones */}
              {MILESTONES.map((m, i) => {
                const y = 80 + i * 120;
                const isLast = i === MILESTONES.length - 1;
                return (
                  <g key={m.year}>
                    <circle
                      className="timeline-circle"
                      cx="60"
                      cy={y}
                      r="8"
                      stroke="#5C4A3A"
                      strokeWidth="2"
                      fill={isLast ? "#B8860B" : "#F5F0E8"}
                    />
                    <text
                      className="timeline-label"
                      x="85"
                      y={y - 8}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="13"
                      fontWeight="300"
                      letterSpacing="0.08em"
                      fill={isLast ? "#B8860B" : "#5C4A3A"}
                    >
                      {m.year}
                    </text>
                    <text
                      className="timeline-label"
                      x="85"
                      y={y + 12}
                      fontFamily="'Lora', serif"
                      fontSize="15"
                      fill="#1A1A1A"
                    >
                      {m.text}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
