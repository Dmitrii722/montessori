export interface Skill {
  sphere: SphereKey;
  skill: string;
  checked: boolean;
}

export type SphereKey =
  | "Сенсорное"
  | "Практическая жизнь"
  | "Речь"
  | "Математика"
  | "Космос"
  | "Физическое";

export interface SurveyAge {
  label: string;
  skills: Skill[];
}

export type SurveyData = Record<string, SurveyAge>;

export interface SphereResult {
  sphere: SphereKey;
  total: number;
  checked: number;
  percentage: number;
}

export interface SurveyResult {
  age: string;
  label: string;
  overallPercentage: number;
  sphereResults: SphereResult[];
  assessment: "below" | "normal" | "above";
  recommendations: string[];
}

export interface SphereInfo {
  key: SphereKey;
  slug: string;
  icon: string;
  description: string;
}

export const SPHERE_MAP: Record<SphereKey, string> = {
  Сенсорное: "sensory",
  "Практическая жизнь": "practical",
  Речь: "language",
  Математика: "math",
  Космос: "cosmic",
  Физическое: "physical",
};

export function getAssessment(percentage: number): "below" | "normal" | "above" {
  if (percentage < 40) return "below";
  if (percentage <= 75) return "normal";
  return "above";
}

export function getAssessmentLabel(a: "below" | "normal" | "above"): string {
  if (a === "below") return "Ниже нормы";
  if (a === "normal") return "В норме";
  return "Выше нормы";
}

export function getAssessmentColor(a: "below" | "normal" | "above"): string {
  if (a === "below") return "#8B4513";
  if (a === "normal") return "#B8860B";
  return "#2E5A1C";
}

export const SPHERE_INFO: SphereInfo[] = [
  {
    key: "Сенсорное",
    slug: "sensory",
    icon: "radiating-lines",
    description:
      "Восприятие цвета, формы, текстуры, звука, вкуса и запаха. Развитие сенсорных органов через специальные материалы.",
  },
  {
    key: "Практическая жизнь",
    slug: "practical",
    icon: "grid-pattern",
    description:
      "Самообслуживание, уход за окружающим пространством, мелкая моторика, развитие независимости.",
  },
  {
    key: "Речь",
    slug: "language",
    icon: "waveform",
    description:
      "Понимание речи, активный словарь, фонематический слух, подготовка к письму и чтению.",
  },
  {
    key: "Математика",
    slug: "math",
    icon: "ascending-bars",
    description:
      "Числовой ряд, счёт, понятие количества, геометрия, десятичная система через конкретные материалы.",
  },
  {
    key: "Космос",
    slug: "cosmic",
    icon: "concentric-circles",
    description:
      "Природа, география, зоология, ботаника, история, культура — всё, что окружает ребёнка.",
  },
  {
    key: "Физическое",
    slug: "physical",
    icon: "kinetic-arc",
    description:
      "Крупная моторика, равновесие, координация движений, психомоторное развитие.",
  },
];
