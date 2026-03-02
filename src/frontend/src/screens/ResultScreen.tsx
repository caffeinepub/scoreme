import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Question } from "../backend.d";
import GCashModal from "../components/scoreme/GCashModal";
import ScoreCircle from "../components/scoreme/ScoreCircle";
import ShareCard from "../components/scoreme/ShareCard";
import { useDeepInsights } from "../hooks/useBackend";
import { getCourageColor, getModeConfig, getRiskColor } from "../utils/modes";
import FullResults from "./FullResults";

interface ResultScreenProps {
  question: Question;
  onBack: () => void;
  onNewQuestion: () => void;
}

export default function ResultScreen({
  question,
  onBack,
  onNewQuestion,
}: ResultScreenProps) {
  const [showGCash, setShowGCash] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  const modeConfig = getModeConfig(question.mode);
  const score = Number(question.scoreResult.score);
  const riskColor = getRiskColor(question.scoreResult.riskLevel as string);
  const courageColor = getCourageColor(
    question.scoreResult.courageLevel as string,
  );

  const { data: deepInsights } = useDeepInsights(question.id, isUnlocked);

  const handleUnlockSuccess = () => {
    setShowGCash(false);
    setIsUnlocked(true);
  };

  if (isUnlocked && deepInsights) {
    return (
      <FullResults
        question={question}
        insights={deepInsights}
        onBack={onBack}
        onNewQuestion={onNewQuestion}
      />
    );
  }

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
          data-ocid="result.back_button"
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1
            className="text-base font-black"
            style={{ letterSpacing: "-0.02em" }}
          >
            Your Reality Score
          </h1>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border"
          style={{
            background: modeConfig.gradient,
            borderColor: modeConfig.borderColor,
            color: modeConfig.textColor,
          }}
        >
          {modeConfig.emoji} {modeConfig.label}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-5">
          {/* Question text */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Your Question
            </p>
            <p className="text-sm font-semibold text-foreground leading-relaxed">
              &ldquo;{question.text}&rdquo;
            </p>
          </div>

          {/* Score circle */}
          <div className="flex justify-center py-2">
            <ScoreCircle targetScore={score} size={180} />
          </div>

          {/* Risk + Courage badges */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-2xl p-4 border text-center"
              style={{
                background: `${riskColor}12`,
                borderColor: `${riskColor}30`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Risk Level
              </p>
              <p
                className="text-lg font-black capitalize"
                style={{ color: riskColor }}
              >
                {question.scoreResult.riskLevel as string}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(question.scoreResult.riskLevel as string) === "low"
                  ? "👍 Safe"
                  : (question.scoreResult.riskLevel as string) === "medium"
                    ? "⚡ Moderate"
                    : "🔴 High Risk"}
              </p>
            </div>
            <div
              className="rounded-2xl p-4 border text-center"
              style={{
                background: `${courageColor}12`,
                borderColor: `${courageColor}30`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Courage Needed
              </p>
              <p
                className="text-lg font-black capitalize"
                style={{ color: courageColor }}
              >
                {question.scoreResult.courageLevel as string}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {(question.scoreResult.courageLevel as string) === "low"
                  ? "😌 Easy step"
                  : (question.scoreResult.courageLevel as string) === "medium"
                    ? "💪 Takes guts"
                    : "🦁 Bold move"}
              </p>
            </div>
          </div>

          {/* 1-line insight */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.3 290 / 0.1), oklch(0.62 0.28 335 / 0.08))",
              borderColor: "oklch(0.65 0.3 290 / 0.25)",
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.65 0.3 290)" }}
            >
              ⚡ Reality Insight
            </p>
            <p className="text-sm font-bold text-foreground leading-relaxed">
              &ldquo;{question.scoreResult.insight}&rdquo;
            </p>
          </div>

          {/* Blurred deep insights teaser */}
          <div
            className="relative rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(var(--border))" }}
          >
            {/* Blurred content */}
            <div
              className="p-4 space-y-3 blur-overlay select-none"
              aria-hidden="true"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">
                  ⚠️ 5 Hidden Risks
                </p>
                {["risk1", "risk2", "risk3"].map((riskKey, i) => (
                  <p
                    key={riskKey}
                    className="text-sm text-muted-foreground py-1"
                  >
                    {i + 1}. ████████████████ ██████████
                  </p>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2">
                  ✅ 3 Strengths
                </p>
                {[1, 2, 3].map((i) => (
                  <p key={i} className="text-sm text-muted-foreground py-1">
                    {i}. ████████ ██████████████
                  </p>
                ))}
              </div>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.65 0.3 290)" }}
                >
                  🔮 1-Year Projection
                </p>
                <p className="text-sm text-muted-foreground">
                  ████████████████████████████████████████ ██████████████████
                </p>
              </div>
            </div>

            {/* Overlay */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(var(--background) / 0.1) 0%, oklch(var(--background) / 0.85) 50%, oklch(var(--background) / 0.95) 100%)",
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">🔒</div>
                <p className="text-sm font-black text-foreground">
                  5 Hidden Risks · 3 Strengths · 1-Year Projection
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  + Action Steps · Brutal Truth · Skill Gap
                </p>
              </div>
            </div>
          </div>

          {/* Unlock CTA */}
          <button
            type="button"
            onClick={() => setShowGCash(true)}
            data-ocid="result.unlock_button"
            className="w-full py-4 rounded-2xl flex flex-col items-center gap-1 font-black text-white transition-all active:scale-[0.97]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
              boxShadow: "0 6px 24px oklch(0.65 0.3 290 / 0.45)",
            }}
          >
            <span className="text-base">🔓 Unlock Full Clarity</span>
            <span
              className="text-xs font-bold px-3 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              ₱15 via GCash only
            </span>
          </button>

          {/* Share free score */}
          <button
            type="button"
            onClick={() => setShowShareCard(true)}
            data-ocid="result.share_button"
            className="w-full py-3.5 rounded-2xl font-bold text-sm border transition-all active:scale-95 hover:bg-muted"
            style={{ borderColor: "oklch(var(--border))" }}
          >
            📤 Share Free Score
          </button>

          <div className="h-4" />
        </div>
      </div>

      {showGCash && (
        <GCashModal
          questionId={question.id}
          onClose={() => setShowGCash(false)}
          onSuccess={handleUnlockSuccess}
        />
      )}

      {showShareCard && (
        <ShareCard
          question={question}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
