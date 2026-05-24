import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  imageIndex: number;
}

const IMAGE_PATHS = [
  "/assets/montessori-pink-tower.png",
  "/assets/montessori-brown-stair.png",
  "/assets/montessori-red-rods.png",
  "/assets/montessori-letters.png",
  "/assets/montessori-golden-beads.png",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Load images
    const loadPromises = IMAGE_PATHS.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
          img.src = src;
        })
    );

    Promise.all(loadPromises).then((images) => {
      imagesRef.current = images;
      imagesLoadedRef.current = true;
    });

    // IntersectionObserver for pause
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#F5F0E8";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (imagesLoadedRef.current && Math.random() < 0.003) {
        spawnParticle(canvas.width, canvas.height);
      }

      const particles = particlesRef.current;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Avoidance zone
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const ndx = dx / dist;
          const ndy = dy / dist;
          p.x += ndx * 0.5;
          p.y += ndy * 0.5;
        }

        const img = imagesRef.current[p.imageIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity;
          ctx.drawImage(img, -p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }

        if (p.y < -200) {
          particles.splice(i, 1);
        }
      }

      // Warm overlay
      ctx.fillStyle = "rgba(232, 220, 200, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    // Scroll fade
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const opacity = 1 - Math.min(scrollY / 300, 1);
      canvas.style.opacity = String(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Title entrance animation
    if (titleRef.current) {
      const children = titleRef.current.querySelectorAll(".hero-animate");
      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }

    // Book cover entrance
    if (bookRef.current) {
      gsap.fromTo(
        bookRef.current,
        { x: 60, opacity: 0, rotateY: -20 },
        {
          x: 0,
          opacity: 1,
          rotateY: -8,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const spawnParticle = (canvasWidth: number, canvasHeight: number) => {
    const particles = particlesRef.current;
    if (particles.length >= 35) return;
    particles.push({
      x: Math.random() * canvasWidth,
      y: canvasHeight + 50,
      size: 70 + Math.random() * 100,
      speedY: -0.4 - Math.random() * 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.004,
      opacity: 0.12 + Math.random() * 0.18,
      imageIndex: Math.floor(Math.random() * IMAGE_PATHS.length),
    });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Subtle radial gradient overlay for text safety */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(245,240,232,0.7) 0%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-[800px] mx-auto"
        ref={titleRef}
      >
        <p className="hero-animate font-mono-label text-[13px] tracking-[0.15em] uppercase text-[#5C4A3A] mb-6 opacity-0">
          Книга первая — Путь педагога
        </p>

        <div className="relative inline-block">
          <h1 className="hero-animate font-display text-[40px] sm:text-[56px] lg:text-[72px] tracking-[0.04em] text-[#1A1A1A] leading-[1.1] opacity-0">
            МОНТЕССОРИ
          </h1>
          <br />
          <h1 className="hero-animate font-display text-[32px] sm:text-[44px] lg:text-[56px] tracking-[0.06em] text-[#1A1A1A] leading-[1.1] opacity-0">
            Книга
          </h1>

          {/* Handwritten annotation */}
          <span
            className="font-handwritten text-[24px] lg:text-[28px] text-[#B8860B] absolute -right-4 sm:right-[-60px] bottom-2 sm:bottom-4 pointer-events-none"
            style={{ transform: "rotate(-6deg)", opacity: 0.85 }}
          >
            от 0 до 3 лет
          </span>
        </div>

        <p className="hero-animate font-body text-base sm:text-lg lg:text-xl text-[#1A1A1A] leading-relaxed max-w-[520px] mx-auto mt-8 opacity-0">
          Ирина Сергеевна Кичигина — педагог по методу Монтессори. От учителя
          начальных классов до проводника в мир детской свободы.
        </p>

        <div className="hero-animate mt-10 opacity-0">
          <span className="font-handwritten text-[28px] sm:text-[32px] text-[#B8860B]">
            И. Кичигина
          </span>
          <p className="font-mono-label text-[12px] tracking-[0.08em] text-[#5C4A3A] mt-2">
            2009 — 2026
          </p>
        </div>
      </div>

      {/* Book cover object - desktop only */}
      <div
        ref={bookRef}
        className="hidden lg:block absolute right-[8vw] top-1/2 -translate-y-1/2 opacity-0"
        style={{
          perspective: "800px",
          zIndex: 2,
        }}
      >
        <div
          className="w-[200px] xl:w-[240px] h-[280px] xl:h-[320px] bg-[#1A1A1A] flex flex-col items-center justify-center relative transition-transform duration-600 hover:scale-[1.02] cursor-default"
          style={{
            boxShadow:
              "0 25px 60px rgba(26, 26, 26, 0.3), 0 0 0 1px rgba(92, 74, 58, 0.2)",
            transform: "rotateY(-8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="w-[50px] h-px bg-[#B8860B] mb-4" />
          <span className="font-display text-[80px] xl:text-[100px] text-[#F5F0E8] leading-none">
            М
          </span>
          <span className="font-label text-sm tracking-[0.3em] uppercase text-[#B8860B] mt-4">
            КНИГА
          </span>
          <span
            className="font-handwritten text-base text-[#B8860B]/60 absolute bottom-4 right-4"
            style={{ transform: "rotate(-8deg)" }}
          >
            Издание первое
          </span>
        </div>
      </div>
    </section>
  );
}
