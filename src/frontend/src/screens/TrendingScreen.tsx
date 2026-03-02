import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Question } from "../backend.d";
import {
  useAllFeaturedQuestions,
  useTopByUnlocks,
  useTopQuestions,
} from "../hooks/useBackend";
import { getModeConfig, getScoreColor } from "../utils/modes";

interface TrendingScreenProps {
  onBack: () => void;
  onViewQuestion: (question: Question) => void;
}

type TrendingTab = "trending" | "topscores" | "daily";

export default function TrendingScreen({
  onBack,
  onViewQuestion,
}: TrendingScreenProps) {
  const [activeTab, setActiveTab] = useState<TrendingTab>("trending");

  const { data: trendingQuestions = [], isLoading: isTrendingLoading } =
    useTopQuestions(10n);
  const { data: topByUnlocks = [], isLoading: isTopLoading } =
    useTopByUnlocks(10n);
  const { data: dailyQuestions = [], isLoading: isDailyLoading } =
    useAllFeaturedQuestions();

  const renderQuestionItem = (q: Question, index: number) => {
    const modeConfig = getModeConfig(q.mode);
    const score = Number(q.scoreResult.score);
    const scoreColor = getScoreColor(score);

    return (
      <button
        type="button"
        key={String(q.id)}
        data-ocid={`leaderboard.item.${index + 1}`}
        onClick={() => onViewQuestion(q)}
        className="w-full rounded-2xl p-4 border text-left transition-all active:scale-[0.98] hover:border-primary/30"
        style={{
          background: "oklch(var(--card))",
          borderColor: "oklch(var(--border))",
        }}
      >
        <div className="flex items-start gap-3">
          {/* Rank */}
          <div
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black"
            style={{
              background:
                index < 3
                  ? "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))"
                  : "oklch(var(--muted))",
              color: index < 3 ? "white" : "oklch(var(--muted-foreground))",
            }}
          >
            {index === 0
              ? "🥇"
              : index === 1
                ? "🥈"
                : index === 2
                  ? "🥉"
                  : `${index + 1}`}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold leading-snug truncate-2">
              {q.text}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full border"
                style={{
                  background: modeConfig.gradient,
                  borderColor: modeConfig.borderColor,
                  color: modeConfig.textColor,
                }}
              >
                {modeConfig.emoji} {modeConfig.label}
              </span>
              <span className="text-xs text-muted-foreground">
                👁 {Number(q.viewCount)} · 🔓 {Number(q.unlockCount)}
              </span>
            </div>
          </div>

          {/* Score chip */}
          <div
            className="flex-shrink-0 text-center px-2 py-1 rounded-xl border"
            style={{
              background: `${scoreColor}15`,
              borderColor: `${scoreColor}30`,
            }}
          >
            <div
              className="text-xl font-black leading-none"
              style={{ color: scoreColor }}
            >
              {score}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">Score</div>
          </div>
        </div>
      </button>
    );
  };

  const renderEmpty = () => (
    <div className="text-center py-16" data-ocid="leaderboard.empty_state">
      <div className="text-5xl mb-4">🔥</div>
      <p className="text-sm font-bold text-muted-foreground">
        No questions yet. Be the first to score!
      </p>
    </div>
  );

  const isLoading =
    (activeTab === "trending" && isTrendingLoading) ||
    (activeTab === "topscores" && isTopLoading) ||
    (activeTab === "daily" && isDailyLoading);

  const currentData =
    activeTab === "trending"
      ? trendingQuestions
      : activeTab === "topscores"
        ? topByUnlocks
        : dailyQuestions;

  return (
    <div className="flex flex-col min-h-dvh bg-background screen-enter">
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 pt-12 pb-3 flex items-center gap-3 border-b border-border"
        style={{
          background: "oklch(var(--background) / 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          data-ocid="leaderboard.back_button"
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1
            className="text-base font-black"
            style={{ letterSpacing: "-0.02em" }}
          >
            Leaderboard
          </h1>
          <p className="text-xs text-muted-foreground">
            Trending questions in PH 🇵🇭
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-border flex gap-2">
        {[
          {
            id: "trending" as const,
            label: "Trending 🔥",
            ocid: "leaderboard.trending_tab",
          },
          {
            id: "topscores" as const,
            label: "Top Scores 🏆",
            ocid: "leaderboard.topscores_tab",
          },
          {
            id: "daily" as const,
            label: "Daily ⭐",
            ocid: "leaderboard.daily_tab",
          },
        ].map((tab) => (
          <button
            type="button"
            key={tab.id}
            data-ocid={tab.ocid}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background:
                activeTab === tab.id
                  ? "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))"
                  : "oklch(var(--muted))",
              color:
                activeTab === tab.id
                  ? "white"
                  : "oklch(var(--muted-foreground))",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 space-y-3">
          {isLoading ? (
            <div data-ocid="leaderboard.loading_state" className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-2xl animate-pulse"
                  style={{ background: "oklch(var(--muted))" }}
                />
              ))}
            </div>
          ) : currentData.length === 0 ? (
            renderEmpty()
          ) : (
            currentData.map((q, i) => renderQuestionItem(q, i))
          )}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
