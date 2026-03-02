import { ScoreMode } from "../backend.d";

export interface ModeConfig {
  mode: ScoreMode;
  label: string;
  emoji: string;
  description: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  bgColor: string;
  exampleQuestions: string[];
}

export const MODES: ModeConfig[] = [
  {
    mode: ScoreMode.logic,
    label: "Logic",
    emoji: "🧠",
    description: "Career & Business",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.22 255 / 0.18), oklch(0.5 0.2 270 / 0.08))",
    borderColor: "oklch(0.55 0.22 255 / 0.35)",
    textColor: "oklch(0.75 0.22 255)",
    bgColor: "oklch(0.55 0.22 255)",
    exampleQuestions: [
      "Should I leave my job to start a business?",
      "Is this the right time to ask for a promotion?",
      "Should I take this freelance project?",
    ],
  },
  {
    mode: ScoreMode.emotion,
    label: "Emotion",
    emoji: "💙",
    description: "Love & Relationships",
    gradient:
      "linear-gradient(135deg, oklch(0.62 0.25 335 / 0.18), oklch(0.6 0.22 345 / 0.08))",
    borderColor: "oklch(0.62 0.25 335 / 0.35)",
    textColor: "oklch(0.78 0.25 335)",
    bgColor: "oklch(0.62 0.25 335)",
    exampleQuestions: [
      "Should I confess my feelings to my crush?",
      "Is this relationship worth saving?",
      "Should I give them another chance?",
    ],
  },
  {
    mode: ScoreMode.money,
    label: "Money",
    emoji: "💰",
    description: "Finance & Hustle",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.2 90 / 0.18), oklch(0.68 0.18 80 / 0.08))",
    borderColor: "oklch(0.7 0.2 90 / 0.35)",
    textColor: "oklch(0.82 0.18 90)",
    bgColor: "oklch(0.7 0.2 90)",
    exampleQuestions: [
      "Should I start a coffee business?",
      "Is investing in crypto right now a good idea?",
      "Should I take out a loan for my business?",
    ],
  },
  {
    mode: ScoreMode.growth,
    label: "Growth",
    emoji: "🌱",
    description: "Level Up Yourself",
    gradient:
      "linear-gradient(135deg, oklch(0.62 0.2 145 / 0.18), oklch(0.6 0.18 155 / 0.08))",
    borderColor: "oklch(0.62 0.2 145 / 0.35)",
    textColor: "oklch(0.75 0.2 145)",
    bgColor: "oklch(0.62 0.2 145)",
    exampleQuestions: [
      "Should I take an online course instead of going out?",
      "Am I ready to lead a team?",
      "Should I change my career path at 28?",
    ],
  },
  {
    mode: ScoreMode.brutal,
    label: "Brutal",
    emoji: "🔥",
    description: "No Filter Reality Check",
    gradient:
      "linear-gradient(135deg, oklch(0.62 0.25 25 / 0.18), oklch(0.58 0.22 20 / 0.08))",
    borderColor: "oklch(0.62 0.25 25 / 0.35)",
    textColor: "oklch(0.78 0.24 25)",
    bgColor: "oklch(0.62 0.25 25)",
    exampleQuestions: [
      "Am I wasting my potential?",
      "Is my business idea actually bad?",
      "Am I the problem in my relationship?",
    ],
  },
  {
    mode: ScoreMode.future,
    label: "Future",
    emoji: "🔮",
    description: "1-Year Projection",
    gradient:
      "linear-gradient(135deg, oklch(0.58 0.28 290 / 0.18), oklch(0.55 0.25 300 / 0.08))",
    borderColor: "oklch(0.58 0.28 290 / 0.35)",
    textColor: "oklch(0.75 0.27 290)",
    bgColor: "oklch(0.58 0.28 290)",
    exampleQuestions: [
      "Where will I be in 1 year if I keep my current habits?",
      "Will my small business succeed by next year?",
      "Should I migrate abroad next year?",
    ],
  },
];

export function getModeConfig(mode: ScoreMode): ModeConfig {
  return MODES.find((m) => m.mode === mode) ?? MODES[0];
}

export function getScoreColor(score: number): string {
  if (score <= 40) return "oklch(0.68 0.24 25)";
  if (score <= 70) return "oklch(0.78 0.2 70)";
  return "oklch(0.72 0.22 145)";
}

export function getScoreLabel(score: number): string {
  if (score <= 40) return "Risky Move ⚠️";
  if (score <= 70) return "Proceed with Caution 🤔";
  return "You're On Track ✅";
}

export function getScoreGradient(score: number): string {
  if (score <= 40)
    return "linear-gradient(135deg, oklch(0.65 0.26 25), oklch(0.6 0.22 15))";
  if (score <= 70)
    return "linear-gradient(135deg, oklch(0.72 0.19 65), oklch(0.7 0.2 55))";
  return "linear-gradient(135deg, oklch(0.65 0.2 145), oklch(0.6 0.22 155))";
}

export function getRiskColor(level: string): string {
  if (level === "low") return "oklch(0.72 0.22 145)";
  if (level === "medium") return "oklch(0.78 0.2 70)";
  return "oklch(0.68 0.24 25)";
}

export function getCourageColor(level: string): string {
  if (level === "low") return "oklch(0.65 0.22 255)";
  if (level === "medium") return "oklch(0.62 0.28 290)";
  return "oklch(0.72 0.2 60)";
}
