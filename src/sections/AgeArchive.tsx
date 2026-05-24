import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Table, Printer, CheckCircle2, ChevronDown } from "lucide-react";
import { surveyData, ageLabels } from "@/data/surveyData";
import type {
  Skill,
  SphereKey,
  SurveyResult,
  SphereResult,
} from "@/types";

gsap.registerPlugin(ScrollTrigger);

const AGE_KEYS = Object.keys(surveyData);

function getAssessment(percentage: number): "below" | "normal" | "above" {
  if (percentage < 40) return "below";
  if (percentage <= 75) return "normal";
  return "above";
}

function getAssessmentLabel(a: "below" | "normal" | "above"): string {
  if (a === "below") return "Ниже нормы";
  if (a === "normal") return "В норме";
  return "Выше нормы";
}

function getAssessmentColor(a: "below" | "normal" | "above"): string {
  if (a === "below") return "#8B4513";
  if (a === "normal") return "#B8860B";
  return "#2E5A1C";
}

function getRecommendations(
  sphere: SphereKey,
  percentage: number,
  _age: string
): string[] {
  const recs: Record<SphereKey, Record<string, string[]>> = {
    Сенсорное: {
      below: [
        "Предложите ребёнку корзинку с разными текстурами (мех, шёлк, бархат, дерево)",
        "Используйте шумовые яйца разного цвета и звучания",
        "Играйте в 'тёплый-холодный' с водой разной температуры",
        "Покажите контрастные чёрно-белые картинки для визуального фокуса",
      ],
      normal: [
        "Расширяйте сенсорный опыт: песок, вода, тесто, листья",
        "Используйте сенсорные мешочки с разными наполнителями",
        "Предложите простые пазлы с большими деталями",
      ],
      above: [
        "Введите сложные сенсорные пазлы с вкладышами по форме",
        "Предложите сортировку по нескольким признакам (цвет + форма)",
        "Используйте шнуровки и пуговицы для развития тактильной чувствительности",
      ],
    },
    "Практическая жизнь": {
      below: [
        "Начните с простых действий: перекладывание предметов между ёмкостями",
        "Предложите баночки с откручивающимися крышками",
        "Учите вытирать стол салфеткой вместе с вами",
        "Используйте липучки и большие пуговицы для развития захвата",
      ],
      normal: [
        "Предложите лить воду из одного кувшина в другой",
        "Учите развешивать одежду на низкие крючки",
        "Введите самостоятельное мытье рук пошагово",
      ],
      above: [
        "Предложите застёгивать пуговицы и молнии на рамках",
        "Учите завязывать шнурки на шнуровке",
        "Введите полное самостоятельное одевание",
      ],
    },
    Речь: {
      below: [
        "Читайте книги с яркими картинками и называйте предметы",
        "Пойте простые песенки с жестами",
        "Используйте погремушки-шумовки для привлечения внимания к звукам",
        "Разговаривайте с ребёнком постоянно, описывая действия",
      ],
      normal: [
        "Читайте книги с короткими историями и обсуждайте сюжет",
        "Учите новые слова через категории (животные, транспорт, еда)",
        "Используйте картинки для составления простых описаний",
      ],
      above: [
        "Предложите рассказать историю по серии картинок",
        "Учите противоположности (большой-маленький, тёплый-холодный)",
        "Введите звуковой анализ: 'На что начинается слово?'",
      ],
    },
    Математика: {
      below: [
        "Используйте стихи и песенки со счётом",
        "Предложите вкладыши 'большой-маленький'",
        "Считайте пальчики и пальчики на ножках",
        "Используйте пирамидки и чашки для сортировки по размеру",
      ],
      normal: [
        "Введите счётные палочки и шнуровку с бусинами",
        "Используйте шпаргалки с цифрами для знакомства",
        "Предложите сортировать по одному признаку (все красное, все круглое)",
      ],
      above: [
        "Предложите сложение и вычитание с реальными предметами",
        "Введите понятие 'нуля' через игру 'ничего не осталось'",
        "Используйте математические истории (у Пети 2 яблока, дали ещё 1)",
      ],
    },
    Космос: {
      below: [
        "Показывайте реальных животных и растения, называйте их",
        "Используйте каталки в форме животных",
        "Читайте книги о природе с крупными иллюстрациями",
        "Выходите на прогулку и называйте всё вокруг",
      ],
      normal: [
        "Изучайте части растений (корень, стебель, лист) через настоящие образцы",
        "Используйте глобус для знакомства с планетой",
        "Сортируйте животных по среде обитания (вода, земля, воздух)",
      ],
      above: [
        "Предложите выращивать растение и наблюдать за ростом",
        "Изучайте жизненный цикл бабочки или лягушки",
        "Введите простые географические понятия через пазлы континентов",
      ],
    },
    Физическое: {
      below: [
        "Обеспечьте много времени на животе для укрепления мышц",
        "Используйте развивающий коврик с дугами",
        "Делайте лёгкий массаж для стимуляции моторики",
        "Предложите хватать и держать предметы разного веса",
      ],
      normal: [
        "Организуйте полосу препятствий из подушек",
        "Предложите ходьбу по невысокому бревну (балансир)",
        "Учите прыгать через препятствие на мягкой поверхности",
      ],
      above: [
        "Введите детскую йогу и простые асаны",
        "Предложить лазание по шведской стенке с подстраховкой",
        "Учите кататься на самокате или велосипеде",
      ],
    },
  };
  const level =
    percentage < 40 ? "below" : percentage <= 75 ? "normal" : "above";
  return recs[sphere]?.[level] || [];
}

function nodePosition(ageKey: string): string {
  const posMap: Record<string, string> = {
    "0": "0%",
    "1": "3%",
    "2": "6%",
    "3": "8%",
    "4": "11%",
    "5": "14%",
    "6": "17%",
    "9": "25%",
    "12": "33%",
    "15": "42%",
    "18": "50%",
    "24": "67%",
    "30": "83%",
    "36": "100%",
  };
  return posMap[ageKey] || "0%";
}

interface AgeArchiveProps {
  onPrint: (result?: SurveyResult) => void;
}

export default function AgeArchive({ onPrint }: AgeArchiveProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [currentSurvey, setCurrentSurvey] = useState<Skill[]>([]);
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [openSpheres, setOpenSpheres] = useState<Record<string, boolean>>({});
  const [, setShowPdfModal] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const timelineEl = timelineRef.current;
    if (timelineEl) {
      gsap.fromTo(
        timelineEl.querySelectorAll(".age-node"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineEl,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        timelineEl.querySelector(".timeline-base"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineEl,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const selectAge = useCallback((age: string) => {
    setSelectedAge(age);
    setResult(null);
    const data = surveyData[age];
    if (data) {
      setCurrentSurvey(data.skills.map((skill: Skill) => ({ ...skill })));
    }
  }, []);

  const toggleSphere = (sphere: string) => {
    setOpenSpheres((prev) => ({ ...prev, [sphere]: !prev[sphere] }));
  };

  const toggleSkill = (index: number) => {
    setCurrentSurvey((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], checked: !next[index].checked };
      return next;
    });
    setResult(null);
  };

  const calculateResults = () => {
    if (!selectedAge) return;
    const total = currentSurvey.length;
    const checked = currentSurvey.filter((s) => s.checked).length;
    const overall = Math.round((checked / total) * 100);

    const sphereResults: SphereResult[] = (
      [
        "Сенсорное",
        "Практическая жизнь",
        "Речь",
        "Математика",
        "Космос",
        "Физическое",
      ] as SphereKey[]
    ).map((sphere) => {
      const sphereSkills = currentSurvey.filter((s) => s.sphere === sphere);
      const sphereTotal = sphereSkills.length;
      const sphereChecked = sphereSkills.filter((s) => s.checked).length;
      return {
        sphere,
        total: sphereTotal,
        checked: sphereChecked,
        percentage:
          sphereTotal > 0 ? Math.round((sphereChecked / sphereTotal) * 100) : 0,
      };
    });

    const assessment = getAssessment(overall);
    const recommendations: string[] = [];
    sphereResults.forEach((sr) => {
      const recs = getRecommendations(sr.sphere, sr.percentage, selectedAge);
      recommendations.push(...recs);
    });

    const surveyResult: SurveyResult = {
      age: selectedAge,
      label: surveyData[selectedAge]?.label || "",
      overallPercentage: overall,
      sphereResults,
      assessment,
      recommendations,
    };
    setResult(surveyResult);
  };

  const generatePdfReport = () => {
    if (!result) return;
    const assessmentColor = getAssessmentColor(result.assessment);
    const assessmentLabel = getAssessmentLabel(result.assessment);

    const sphereRows = result.sphereResults
      .map(
        (sr) => `
      <tr style="border-bottom:1px solid #E8DCC8;">
        <td style="padding:12px 16px;font-family:'Lora',serif;font-size:14px;color:#1A1A1A;">${sr.sphere}</td>
        <td style="padding:12px 16px;font-family:'Cinzel Decorative',serif;font-size:16px;color:#1A1A1A;text-align:right;">${sr.percentage}%</td>
        <td style="padding:12px 16px;text-align:right;">
          <div style="width:100px;height:8px;background:#E8DCC8;display:inline-block;">
            <div style="width:${sr.percentage}%;height:100%;background:#B8860B;"></div>
          </div>
        </td>
        <td style="padding:12px 16px;font-family:'Lora',serif;font-size:13px;color:${sr.percentage < 40 ? "#8B4513" : sr.percentage <= 75 ? "#B8860B" : "#2E5A1C"};text-align:right;">
          ${sr.percentage < 40 ? "Ниже нормы" : sr.percentage <= 75 ? "В норме" : "Выше нормы"}
        </td>
      </tr>
    `
      )
      .join("");

    const recommendationsHtml = result.recommendations
      .map(
        (r, i) => `
      <li style="padding:8px 0;font-family:'Lora',serif;font-size:14px;color:#1A1A1A;line-height:1.6;">
        <span style="color:#B8860B;font-weight:bold;">${i + 1}.</span> ${r}
      </li>
    `
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400&family=Cormorant+Garamond:wght@500&family=Lora:wght@400&family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet">
<style>
  @page { margin: 20mm; }
  body { margin:0;padding:0;font-family:'Lora',serif;background:#F5F0E8;color:#1A1A1A; }
</style>
</head>
<body>
  <div style="max-width:800px;margin:0 auto;padding:40px;">
    <!-- Cover -->
    <div style="text-align:center;margin-bottom:60px;border-bottom:2px solid #5C4A3A;padding-bottom:40px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#5C4A3A;margin-bottom:16px;">Диагностический отчёт</p>
      <h1 style="font-family:'Cinzel Decorative',serif;font-size:36px;color:#1A1A1A;margin-bottom:8px;">МОНТЕССОРИ КНИГА</h1>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:#B8860B;margin-bottom:24px;">Архив развития</h2>
      <p style="font-family:'Lora',serif;font-size:14px;color:#5C4A3A;">
        ${result.label}<br>
        Дата: ${new Date().toLocaleDateString("ru-RU")}
      </p>
    </div>

    <!-- Overall -->
    <div style="text-align:center;margin-bottom:40px;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#5C4A3A;margin-bottom:12px;">Общий результат</p>
      <div style="font-family:'Cinzel Decorative',serif;font-size:64px;color:#1A1A1A;margin-bottom:16px;">${result.overallPercentage}%</div>
      <div style="display:inline-block;border:2px solid ${assessmentColor};padding:12px 24px;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:${assessmentColor};">
        ${assessmentLabel}
      </div>
    </div>

    <!-- Sphere breakdown -->
    <h3 style="font-family:'Cinzel Decorative',serif;font-size:20px;color:#1A1A1A;margin-bottom:20px;border-bottom:1px solid #5C4A3A;padding-bottom:8px;">Сферы развития</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:40px;">
      <thead>
        <tr style="border-bottom:2px solid #5C4A3A;">
          <th style="padding:12px 16px;text-align:left;font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#5C4A3A;">Сфера</th>
          <th style="padding:12px 16px;text-align:right;font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#5C4A3A;">%</th>
          <th style="padding:12px 16px;text-align:right;font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#5C4A3A;">Прогресс</th>
          <th style="padding:12px 16px;text-align:right;font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:#5C4A3A;">Оценка</th>
        </tr>
      </thead>
      <tbody>${sphereRows}</tbody>
    </table>

    <!-- Recommendations -->
    <h3 style="font-family:'Cinzel Decorative',serif;font-size:20px;color:#1A1A1A;margin-bottom:16px;border-bottom:1px solid #5C4A3A;padding-bottom:8px;">Рекомендации</h3>
    <ul style="list-style:none;padding:0;margin:0;">${recommendationsHtml}</ul>

    <!-- Footer -->
    <div style="margin-top:60px;padding-top:20px;border-top:1px solid #5C4A3A;text-align:center;">
      <p style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#5C4A3A;">
        Монтессори Книга — Ирина Сергеевна Кичигина — 2026
      </p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    if (w) {
      w.onload = () => {
        w.print();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
    }
    setShowPdfModal(false);
  };

  const generateExcel = () => {
    if (!result) return;

    let csv =
      "\uFEFFСфера,Всего навыков,Отмечено,Процент,Оценка\n";
    result.sphereResults.forEach((sr) => {
      const label =
        sr.percentage < 40
          ? "Ниже нормы"
          : sr.percentage <= 75
            ? "В норме"
            : "Выше нормы";
      csv += `${sr.sphere},${sr.total},${sr.checked},${sr.percentage}%,${label}\n`;
    });
    csv += `\n,Общий результат,,${result.overallPercentage}%,${getAssessmentLabel(result.assessment)}\n`;

    csv += "\n\nРекомендации\n";
    result.recommendations.forEach((r, i) => {
      csv += `${i + 1},"${r}"\n`;
    });

    csv += "\n\nДетальные навыки\nСфера,Навык,Отмечено\n";
    currentSurvey.forEach((s) => {
      csv += `${s.sphere},"${s.skill}",${s.checked ? "Да" : "Нет"}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `montessori-diagnostika-${selectedAge}-mes.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    setShowPdfModal(false);
  };

  const groupedSkills = currentSurvey.reduce<Record<string, Skill[]>>(
    (acc, skill) => {
      if (!acc[skill.sphere]) acc[skill.sphere] = [];
      acc[skill.sphere].push(skill);
      return acc;
    },
    {}
  );

  return (
    <section
      id="archive"
      ref={sectionRef}
      className="relative py-[120px] bg-[#F5F0E8] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <p className="font-mono-label text-[13px] tracking-[0.12em] uppercase text-[#B8860B] mb-4">
            Глава третья
          </p>
          <h2 className="font-display text-[32px] sm:text-[38px] lg:text-[42px] text-[#1A1A1A] leading-[1.1]">
            Архив развития: от рождения до трёх лет
          </h2>
          <span
            className="font-handwritten text-lg text-[#B8860B] absolute -top-1 right-[5%] sm:right-[20%] pointer-events-none"
            style={{ transform: "rotate(-3deg)" }}
          >
            двигайте по оси
          </span>
        </div>

        {/* Timeline */}
        <div
          ref={timelineRef}
          className="relative mb-12 overflow-x-auto pb-4"
        >
          <div className="relative min-w-[800px] h-[100px]">
            {/* Base line */}
            <div
              className="timeline-base absolute top-1/2 left-0 right-0 h-[2px] bg-[#5C4A3A] origin-left"
            />

            {/* Tick marks and nodes */}
            {AGE_KEYS.map((age) => (
              <div
                key={age}
                className="absolute top-1/2"
                style={{ left: nodePosition(age), transform: "translateX(-50%)" }}
              >
                {/* Tick */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-px h-3 bg-[#5C4A3A]"
                  style={{ top: -6 }}
                />
                {/* Node */}
                <button
                  className={`age-node relative w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                    selectedAge === age
                      ? "bg-[#B8860B] border-[#B8860B] scale-[1.3]"
                      : "bg-[#F5F0E8] border-[#5C4A3A] hover:border-[#B8860B]"
                  }`}
                  onClick={() => selectAge(age)}
                  aria-label={`${ageLabels[age]} — диагностика`}
                  style={{ transform: selectedAge === age ? "translateX(-50%) scale(1.3)" : "translateX(-50%)", top: -10 }}
                />
                {/* Label */}
                <span
                  className="absolute font-label text-[11px] font-medium uppercase tracking-[0.06em] text-[#5C4A3A] whitespace-nowrap"
                  style={{ top: 16, left: "50%", transform: "translateX(-50%)" }}
                >
                  {ageLabels[age]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Survey accordion */}
        {selectedAge && (
          <div className="border border-[#5C4A3A]/15 bg-[#F5F0E8] p-6 sm:p-10 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
              <div>
                <h3 className="font-display text-[24px] sm:text-[28px] text-[#1A1A1A]">
                  {surveyData[selectedAge]?.label}
                </h3>
                <p className="font-body text-sm text-[#5C4A3A] mt-1">
                  Отметьте навыки, которые ребёнок уже освоил
                </p>
              </div>
              <button
                onClick={calculateResults}
                className="bg-[#1A1A1A] text-[#F5F0E8] px-8 py-3 font-label text-sm font-medium uppercase tracking-[0.08em] hover:bg-[#B8860B] transition-colors duration-300 shrink-0"
              >
                Рассчитать результат
              </button>
            </div>

            {/* Sphere groups */}
            <div className="space-y-4">
              {Object.entries(groupedSkills).map(([sphere, skills]) => (
                <div
                  key={sphere}
                  className="border border-[#5C4A3A]/10"
                >
                  <button
                    onClick={() => toggleSphere(sphere)}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#E8DCC8]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-label text-sm font-semibold uppercase tracking-[0.06em] text-[#1A1A1A]">
                        {sphere}
                      </span>
                      <span className="font-mono-label text-xs text-[#5C4A3A]">
                        {skills.filter((s) => s.checked).length}/{skills.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#5C4A3A] transition-transform duration-300 ${
                        openSpheres[sphere] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openSpheres[sphere] !== false && (
                    <div className="px-5 pb-4 space-y-2">
                      {skills.map((skill, idx) => {
                        const globalIdx = currentSurvey.findIndex(
                          (s) => s.skill === skill.skill
                        );
                        return (
                          <label
                            key={idx}
                            className="flex items-start gap-3 py-2 cursor-pointer group"
                          >
                            <div
                              className={`mt-0.5 w-[18px] h-[18px] border-[1.5px] flex items-center justify-center transition-all duration-200 shrink-0 ${
                                skill.checked
                                  ? "bg-[#B8860B] border-[#B8860B]"
                                  : "border-[#5C4A3A] group-hover:border-[#B8860B]"
                              }`}
                              onClick={() => toggleSkill(globalIdx)}
                            >
                              {skill.checked && (
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              )}
                            </div>
                            <span
                              className={`font-body text-sm leading-relaxed transition-colors ${
                                skill.checked
                                  ? "text-[#1A1A1A] line-through opacity-60"
                                  : "text-[#1A1A1A]"
                              }`}
                              onClick={() => toggleSkill(globalIdx)}
                            >
                              {skill.skill}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results panel */}
        {result && (
          <div className="mt-10 border border-[#5C4A3A]/15 bg-[#F5F0E8] p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left: overall */}
              <div className="lg:w-1/3 text-center lg:text-left">
                <p className="font-mono-label text-[12px] tracking-[0.12em] uppercase text-[#5C4A3A] mb-3">
                  Общий результат
                </p>
                <div className="font-display text-[56px] sm:text-[64px] text-[#1A1A1A] leading-none">
                  {result.overallPercentage}%
                </div>
                <div
                  className="inline-block mt-4 px-6 py-3 font-label text-base font-medium uppercase tracking-[0.08em]"
                  style={{
                    border: `2px solid ${getAssessmentColor(result.assessment)}`,
                    color: getAssessmentColor(result.assessment),
                  }}
                >
                  {getAssessmentLabel(result.assessment)}
                </div>

                {/* Action buttons */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => onPrint(result)}
                    className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-[#F5F0E8] px-6 py-3 font-label text-sm font-medium uppercase tracking-[0.08em] hover:bg-[#B8860B] transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Печать отчёта
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={generatePdfReport}
                      className="flex-1 flex items-center justify-center gap-2 border border-[#5C4A3A] text-[#5C4A3A] px-4 py-3 font-label text-xs font-medium uppercase tracking-[0.06em] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] hover:border-[#1A1A1A] transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      PDF
                    </button>
                    <button
                      onClick={generateExcel}
                      className="flex-1 flex items-center justify-center gap-2 border border-[#5C4A3A] text-[#5C4A3A] px-4 py-3 font-label text-xs font-medium uppercase tracking-[0.06em] hover:bg-[#1A1A1A] hover:text-[#F5F0E8] hover:border-[#1A1A1A] transition-all"
                    >
                      <Table className="w-4 h-4" />
                      Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: sphere breakdown */}
              <div className="lg:w-2/3">
                <h4 className="font-display text-[20px] text-[#1A1A1A] mb-6 pb-3 border-b border-[#5C4A3A]/20">
                  Сферы развития
                </h4>
                <div className="space-y-5">
                  {result.sphereResults.map((sr) => {
                    return (
                      <div key={sr.sphere}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-label text-sm font-semibold text-[#1A1A1A]">
                              {sr.sphere}
                            </span>
                            <span className="font-mono-label text-[11px] text-[#5C4A3A]">
                              {sr.checked}/{sr.total}
                            </span>
                          </div>
                          <span className="font-display text-[20px] text-[#1A1A1A]">
                            {sr.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-[#5C4A3A]/10">
                          <div
                            className="h-full transition-all duration-700"
                            style={{
                              width: `${sr.percentage}%`,
                              backgroundColor:
                                sr.percentage < 40
                                  ? "#8B4513"
                                  : sr.percentage <= 75
                                    ? "#B8860B"
                                    : "#2E5A1C",
                            }}
                          />
                        </div>
                        <span
                          className="font-body text-xs mt-1 inline-block"
                          style={{
                            color:
                              sr.percentage < 40
                                ? "#8B4513"
                                : sr.percentage <= 75
                                  ? "#B8860B"
                                  : "#2E5A1C",
                          }}
                        >
                          {sr.percentage < 40
                            ? "Ниже нормы"
                            : sr.percentage <= 75
                              ? "В норме"
                              : "Выше нормы"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendations */}
                <div className="mt-10">
                  <h4 className="font-display text-[20px] text-[#1A1A1A] mb-4 pb-3 border-b border-[#5C4A3A]/20">
                    Рекомендации
                  </h4>
                  <ul className="space-y-3">
                    {result.recommendations.slice(0, 8).map((rec, i) => (
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
