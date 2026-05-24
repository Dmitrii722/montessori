import { useState, useEffect } from "react";
import { Printer, Menu, X } from "lucide-react";

interface NavigationProps {
  scrollTo: (target: string) => void;
  onPrint: () => void;
}

const NAV_LINKS = [
  { label: "Обложка", target: "#hero" },
  { label: "Путь", target: "#path" },
  { label: "Диагностика", target: "#diagnostic" },
  { label: "Архив", target: "#archive" },
];

export default function Navigation({ scrollTo, onPrint }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (target: string) => {
    scrollTo(target);
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5F0E8]/92 backdrop-blur-xl border-b border-[#5C4A3A]/12 shadow-[0_1px_20px_rgba(26,26,26,0.04)]"
          : "bg-transparent"
      }`}
      style={{ height: 64 }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full px-6">
        {/* Logo */}
        <button
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-3 group"
        >
          <span className="font-display text-lg tracking-[0.12em] text-[#1A1A1A]">
            МОНТЕССОРИ
          </span>
          <span className="w-px h-5 bg-[#5C4A3A]/30" />
          <span className="font-label text-sm font-medium tracking-[0.1em] uppercase text-[#5C4A3A] group-hover:text-[#B8860B] transition-colors">
            Книга
          </span>
        </button>

        {/* Center Nav - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNav(link.target)}
              className="font-label text-[13px] font-medium tracking-[0.1em] uppercase text-[#5C4A3A] hover:text-[#1A1A1A] relative pb-1 after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-px after:bg-[#B8860B] after:transition-all after:duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onPrint}
            className="hidden md:flex items-center gap-2 border border-[#5C4A3A] px-7 py-2.5 bg-transparent font-label text-[13px] font-medium tracking-[0.08em] uppercase text-[#5C4A3A] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] hover:border-[#1A1A1A] transition-all duration-400"
          >
            <Printer className="w-4 h-4" />
            Печать
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#5C4A3A]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#F5F0E8] z-40 flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.target}
              onClick={() => handleNav(link.target)}
              className="font-label text-xl font-medium tracking-[0.1em] uppercase text-[#5C4A3A] hover:text-[#1A1A1A]"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onPrint();
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 border border-[#5C4A3A] px-7 py-3 font-label text-sm font-medium tracking-[0.08em] uppercase text-[#5C4A3A]"
          >
            <Printer className="w-4 h-4" />
            Печать
          </button>
        </div>
      )}
    </nav>
  );
}
