import { useEffect } from "react";
import { X } from "lucide-react";
import { getAssessmentColor, getAssessmentLabel } from "@/types";
import type { SurveyResult } from "@/types";

interface PrintReportProps {
  result: SurveyResult;
  onClose: () => void;
}

export default function PrintReport({ result, onClose }: PrintReportProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
      onClose();
    }, 500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const assessmentColor = getAssessmentColor(result.assessment);
  const assessmentLabel = getAssessmentLabel(result.assessment);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F0E8] overflow-auto print:static">
      {/* Close button — hidden when printing */}
      <button
        onClick={onClose}
        className="no-print fixed top-4 right-4 z-50 p-2 bg-[#1A1A1A] text-[#F5F0E8] hover:bg-[#B8860B] transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-[800px] mx-auto p-10 sm:p-16 print:p-0">
        {/* Cover */}
        <div className="text-center mb-16 pb-10 border-b-2 border-[#5C4A3A]">
          <p className="font-mono-label text-[12px] tracking-[0.15em] uppercase text-[#5C4A3A] mb-4">
            Диагностический отчёт
          </p>
          <h1 className="font-display text-[36px] text-[#1A1A1A] mb-2">
            МОНТЕССОРИ КНИГА
          </h1>
          <h2 className="font-label text-lg font-medium tracking-[0.1em] uppercase text-[#B8860B] mb-6">
            Архив развития
          </h2>
          <p className="font-body text-sm text-[#5C4A3A]">
            {result.label}
            <br />
            Дата: {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>

        {/* Overall */}
        <div className="text-center mb-12">
          <p className="font-mono-label text-[12px] tracking-[0.1em] uppercase text-[#5C4A3A] mb-3">
            Общий результат
          </p>
          <div className="font-display text-[64px] text-[#1A1A1A] mb-4">
            {result.overallPercentage}%
          </div>
          <div
            className="inline-block px-6 py-3 font-label text-lg font-medium uppercase tracking-[0.08em]"
            style={{
              border: `2px solid ${assessmentColor}`,
              color: assessmentColor,
            }}
          >
            {assessmentLabel}
          </div>
        </div>

        {/* Sphere breakdown */}
        <h3 className="font-display text-[20px] text-[#1A1A1A] mb-6 pb-2 border-b border-[#5C4A3A]">
          Сферы развития
        </h3>
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-[#5C4A3A]">
              <th className="text-left font-label text-[13px] font-medium uppercase tracking-[0.08em] text-[#5C4A3A] py-3">
                Сфера
              </th>
              <th className="text-right font-label text-[13px] font-medium uppercase tracking-[0.08em] text-[#5C4A3A] py-3">
                %
              </th>
              <th className="text-right font-label text-[13px] font-medium uppercase tracking-[0.08em] text-[#5C4A3A] py-3">
                Прогресс
              </th>
              <th className="text-right font-label text-[13px] font-medium uppercase tracking-[0.08em] text-[#5C4A3A] py-3">
                Оценка
              </th>
            </tr>
          </thead>
          <tbody>
            {result.sphereResults.map((sr) => {
              const color =
                sr.percentage < 40
                  ? "#8B4513"
                  : sr.percentage <= 75
                    ? "#B8860B"
                    : "#2E5A1C";
              const label =
                sr.percentage < 40
                  ? "Ниже нормы"
                  : sr.percentage <= 75
                    ? "В норме"
                    : "Выше нормы";
              return (
                <tr
                  key={sr.sphere}
                  className="border-b border-[#E8DCC8]"
                >
                  <td className="py-3 font-body text-sm text-[#1A1A1A]">
                    {sr.sphere}
                  </td>
                  <td className="py-3 text-right font-display text-base text-[#1A1A1A]">
                    {sr.percentage}%
                  </td>
                  <td className="py-3 text-right">
                    <div className="w-[100px] h-2 bg-[#E8DCC8] inline-block">
                      <div
                        className="h-full"
                        style={{
                          width: `${sr.percentage}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </td>
                  <td
                    className="py-3 text-right font-body text-sm"
                    style={{ color }}
                  >
                    {label}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Recommendations */}
        <h3 className="font-display text-[20px] text-[#1A1A1A] mb-6 pb-2 border-b border-[#5C4A3A]">
          Рекомендации
        </h3>
        <ul className="space-y-3 mb-16">
          {result.recommendations.map((rec, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-body text-sm text-[#1A1A1A] leading-relaxed"
            >
              <span className="text-[#B8860B] font-display text-sm shrink-0 mt-0.5">
                {i + 1}.
              </span>
              {rec}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="border-t border-[#5C4A3A] pt-6 text-center">
          <p className="font-mono-label text-[11px] tracking-[0.08em] text-[#5C4A3A]">
            Монтессори Книга — Ирина Сергеевна Кичигина — 2026
          </p>
        </div>
      </div>
    </div>
  );
}
