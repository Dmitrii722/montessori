interface FooterProps {
  scrollTo: (target: string) => void;
}

const NAV_LINKS = [
  { label: "Обложка", target: "#hero" },
  { label: "Путь", target: "#path" },
  { label: "Диагностика", target: "#diagnostic" },
  { label: "Архив", target: "#archive" },
];

export default function Footer({ scrollTo }: FooterProps) {
  return (
    <footer className="bg-[#1A1A1A] pt-20 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">
          <div>
            <span className="font-display text-2xl text-[#F5F0E8]">
              МОНТЕССОРИ
            </span>
            <span className="font-label text-sm tracking-[0.2em] uppercase text-[#B8860B] ml-3">
              Книга
            </span>
          </div>
          <p className="font-body text-base text-[#E8DCC8]">
            Ирина Сергеевна Кичигина — педагог Монтессори 0-3
          </p>
          <p className="font-mono-label text-[13px] tracking-[0.08em] text-[#5C4A3A]">
            Издание первое — 2026
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#5C4A3A]/30 pt-10">
          {/* Nav */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="font-label text-[13px] font-medium uppercase tracking-[0.1em] text-[#5C4A3A] hover:text-[#F5F0E8] transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center font-label text-sm text-[#5C4A3A]">
            © 2026 Монтессори Книга. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
