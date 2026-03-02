import { Moon, Sun, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { Screen } from "../App";
import { type Question, ScoreMode } from "../backend.d";
import { useTopQuestions } from "../hooks/useBackend";
import {
  MODES,
  getModeConfig,
  getScoreColor,
  getScoreLabel,
} from "../utils/modes";

interface HomeScreenProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onSelectMode: (mode: ScoreMode) => void;
  onNavigate: (screen: Screen) => void;
  onViewQuestion: (question: Question) => void;
}

export default function HomeScreen({
  theme,
  onToggleTheme,
  onSelectMode,
  onNavigate,
  onViewQuestion,
}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<"home" | "trending" | "settings">(
    "home",
  );
  const { data: topQuestions = [] } = useTopQuestions(5n);
  const featuredQuestion = topQuestions[0];

  const handleTabChange = (tab: "home" | "trending" | "settings") => {
    setActiveTab(tab);
    if (tab === "trending") onNavigate("trending");
    if (tab === "settings") onNavigate("settings");
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background screen-enter">
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 pt-12 pb-3 flex items-center justify-between border-b border-border"
        style={{
          background: "oklch(var(--background) / 0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
            }}
          >
            <img
              src="/assets/generated/scoreme-logo-transparent.dim_200x200.png"
              alt="SCOREME"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span
            className="text-xl font-black tracking-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            SCOREME
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleTheme}
          data-ocid="settings.toggle"
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-5 space-y-6">
          {/* Featured question banner */}
          {featuredQuestion && (
            <button
              type="button"
              className="w-full rounded-2xl p-4 border cursor-pointer active:scale-95 transition-transform text-left"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.3 290 / 0.15), oklch(0.62 0.28 335 / 0.1))",
                borderColor: "oklch(0.65 0.3 290 / 0.3)",
              }}
              onClick={() => onViewQuestion(featuredQuestion)}
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-primary" />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "oklch(0.65 0.3 290)" }}
                >
                  Trending Today 🔥
                </span>
              </div>
              <p className="text-sm font-semibold line-clamp-2 text-foreground">
                "{featuredQuestion.text}"
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="text-2xl font-black"
                  style={{
                    color: getScoreColor(
                      Number(featuredQuestion.scoreResult.score),
                    ),
                  }}
                >
                  {Number(featuredQuestion.scoreResult.score)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {getScoreLabel(Number(featuredQuestion.scoreResult.score))}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {Number(featuredQuestion.viewCount)} views 👁
                </span>
              </div>
            </button>
          )}

          {/* Choose Your Mode */}
          <section>
            <h2
              className="text-lg font-black mb-1"
              style={{ letterSpacing: "-0.02em" }}
            >
              Choose Your Mode 🎯
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Pick a mode to get your Reality Score
            </p>

            <div className="grid grid-cols-2 gap-3">
              {MODES.map((modeConfig) => (
                <button
                  type="button"
                  key={modeConfig.mode}
                  data-ocid={`mode.${modeConfig.mode}_button`}
                  onClick={() => onSelectMode(modeConfig.mode)}
                  className="relative rounded-2xl p-4 border text-left transition-all duration-200 active:scale-95 hover:scale-[1.02]"
                  style={{
                    background: modeConfig.gradient,
                    borderColor: modeConfig.borderColor,
                    boxShadow: `0 2px 12px ${modeConfig.borderColor}`,
                  }}
                >
                  <div className="text-2xl mb-2">{modeConfig.emoji}</div>
                  <div
                    className="text-sm font-black tracking-tight"
                    style={{ color: modeConfig.textColor }}
                  >
                    {modeConfig.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {modeConfig.description}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Trending Today List */}
          {topQuestions.length > 1 && (
            <section>
              <h2
                className="text-lg font-black mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                Trending Today 🔥
              </h2>
              <div className="space-y-2">
                {topQuestions.slice(0, 5).map((q) => {
                  const modeConfig = getModeConfig(q.mode);
                  const score = Number(q.scoreResult.score);
                  return (
                    <button
                      type="button"
                      key={String(q.id)}
                      className="w-full rounded-xl p-3 border text-left transition-all duration-150 active:scale-[0.98] hover:border-primary/30"
                      style={{
                        background: "oklch(var(--card))",
                        borderColor: "oklch(var(--border))",
                      }}
                      onClick={() => onViewQuestion(q)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm border"
                          style={{
                            background: modeConfig.gradient,
                            borderColor: modeConfig.borderColor,
                          }}
                        >
                          {modeConfig.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate-2">
                            {q.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className="text-xs"
                              style={{ color: modeConfig.textColor }}
                            >
                              {modeConfig.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ·
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {Number(q.viewCount)} views
                            </span>
                          </div>
                        </div>
                        <div
                          className="text-xl font-black flex-shrink-0"
                          style={{ color: getScoreColor(score) }}
                        >
                          {score}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                className="w-full mt-3 py-3 rounded-xl border text-sm font-semibold text-center transition-colors hover:bg-muted"
                style={{ borderColor: "oklch(var(--border))" }}
                onClick={() => onNavigate("trending")}
                data-ocid="home.trending_link"
              >
                See All Trending →
              </button>
            </section>
          )}

          {/* Daily Invite Section */}
          <section
            className="rounded-2xl p-5 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.3 290 / 0.12), oklch(0.62 0.28 335 / 0.12))",
              border: "1px solid oklch(0.65 0.3 290 / 0.2)",
            }}
          >
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm font-bold text-foreground">
              What's your burning question today?
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Get a Reality Score for anything in your life
            </p>
            <button
              type="button"
              className="mt-3 px-6 py-2.5 rounded-xl text-sm font-black text-white transition-all active:scale-95 hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                boxShadow: "0 4px 16px oklch(0.65 0.3 290 / 0.35)",
              }}
              onClick={() => onSelectMode(ScoreMode.logic)}
              data-ocid="home.primary_button"
            >
              Get My Score Now 🚀
            </button>
          </section>

          {/* Footer padding */}
          <div className="h-6" />
        </div>
      </div>

      {/* Bottom Nav */}
      <nav
        className="sticky bottom-0 border-t safe-bottom"
        style={{
          background: "oklch(var(--background) / 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "oklch(var(--border))",
        }}
      >
        <div className="flex">
          {[
            { id: "home" as const, label: "Home", emoji: "🏠" },
            { id: "trending" as const, label: "Trending", emoji: "🔥" },
            { id: "settings" as const, label: "Settings", emoji: "⚙️" },
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              data-ocid={`nav.${tab.id}_button`}
              onClick={() => handleTabChange(tab.id)}
              className="flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors"
            >
              <span className="text-xl leading-none">{tab.emoji}</span>
              <span
                className="text-xs font-semibold"
                style={{
                  color:
                    activeTab === tab.id
                      ? "oklch(0.65 0.3 290)"
                      : "oklch(var(--muted-foreground))",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
