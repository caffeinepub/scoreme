import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { DeepInsights, Question } from "../backend.d";
import ScoreCircle from "../components/scoreme/ScoreCircle";
import ShareCard from "../components/scoreme/ShareCard";
import { getCourageColor, getModeConfig, getRiskColor } from "../utils/modes";

interface FullResultsProps {
  question: Question;
  insights: DeepInsights;
  onBack: () => void;
  onNewQuestion: () => void;
}

export default function FullResults({
  question,
  insights,
  onBack,
  onNewQuestion,
}: FullResultsProps) {
  const [showShareCard, setShowShareCard] = useState(false);
  const modeConfig = getModeConfig(question.mode);
  const score = Number(question.scoreResult.score);
  const riskColor = getRiskColor(question.scoreResult.riskLevel as string);
  const courageColor = getCourageColor(
    question.scoreResult.courageLevel as string,
  );

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
          data-ocid="fullresult.back_button"
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
            Full Clarity 🔓
          </h1>
          <p className="text-xs text-muted-foreground">
            Complete Reality Report
          </p>
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
          {/* Question */}
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
            <p className="text-sm font-semibold leading-relaxed">
              "{question.text}"
            </p>
          </div>

          {/* Score */}
          <div className="flex justify-center py-2">
            <ScoreCircle targetScore={score} size={160} />
          </div>

          {/* Risk + Courage */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-2xl p-3 border text-center"
              style={{
                background: `${riskColor}12`,
                borderColor: `${riskColor}30`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Risk Level
              </p>
              <p
                className="text-base font-black capitalize"
                style={{ color: riskColor }}
              >
                {question.scoreResult.riskLevel as string}
              </p>
            </div>
            <div
              className="rounded-2xl p-3 border text-center"
              style={{
                background: `${courageColor}12`,
                borderColor: `${courageColor}30`,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Courage Needed
              </p>
              <p
                className="text-base font-black capitalize"
                style={{ color: courageColor }}
              >
                {question.scoreResult.courageLevel as string}
              </p>
            </div>
          </div>

          {/* Insight */}
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
            <p className="text-sm font-bold leading-relaxed">
              "{question.scoreResult.insight}"
            </p>
          </div>

          {/* Hidden Risks */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.65 0.26 25 / 0.3)" }}
          >
            <div
              className="px-4 py-3"
              style={{ background: "oklch(0.65 0.26 25 / 0.12)" }}
            >
              <h3
                className="text-sm font-black"
                style={{ color: "oklch(0.75 0.24 25)" }}
              >
                ⚠️ Hidden Risks / Pitfalls
              </h3>
            </div>
            <div
              className="p-4 space-y-3"
              style={{ background: "oklch(var(--card))" }}
            >
              {insights.hiddenRisks.map((risk, i) => (
                <div key={risk.slice(0, 20)} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: "oklch(0.65 0.26 25 / 0.15)",
                      color: "oklch(0.75 0.24 25)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {risk}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Strengths */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.65 0.2 145 / 0.3)" }}
          >
            <div
              className="px-4 py-3"
              style={{ background: "oklch(0.65 0.2 145 / 0.12)" }}
            >
              <h3
                className="text-sm font-black"
                style={{ color: "oklch(0.72 0.22 145)" }}
              >
                ✅ Your Strengths / Advantages
              </h3>
            </div>
            <div
              className="p-4 space-y-3"
              style={{ background: "oklch(var(--card))" }}
            >
              {insights.strengths.map((strength, i) => (
                <div
                  key={strength.slice(0, 20)}
                  className="flex gap-3 items-start"
                >
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
                    style={{
                      background: "oklch(0.65 0.2 145 / 0.15)",
                      color: "oklch(0.72 0.22 145)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 1-Year Projection */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.65 0.3 290 / 0.3)" }}
          >
            <div
              className="px-4 py-3"
              style={{ background: "oklch(0.65 0.3 290 / 0.12)" }}
            >
              <h3
                className="text-sm font-black"
                style={{ color: "oklch(0.75 0.28 290)" }}
              >
                🔮 1-Year Future Projection
              </h3>
            </div>
            <div className="p-4" style={{ background: "oklch(var(--card))" }}>
              <p className="text-sm text-foreground leading-relaxed">
                {insights.yearProjection}
              </p>
            </div>
          </section>

          {/* Action Steps */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.65 0.3 290 / 0.3)" }}
          >
            <div
              className="px-4 py-3"
              style={{ background: "oklch(0.65 0.3 290 / 0.12)" }}
            >
              <h3
                className="text-sm font-black"
                style={{ color: "oklch(0.75 0.28 290)" }}
              >
                🎯 Action Steps
              </h3>
            </div>
            <div
              className="p-4 space-y-3"
              style={{ background: "oklch(var(--card))" }}
            >
              {insights.actionSteps.map((step, i) => (
                <div key={step.slice(0, 20)} className="flex gap-3 items-start">
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                      color: "white",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skill Gap Warning */}
          <section
            className="rounded-2xl p-4 border"
            style={{
              background: "oklch(0.7 0.2 90 / 0.08)",
              borderColor: "oklch(0.7 0.2 90 / 0.25)",
            }}
          >
            <h3
              className="text-sm font-black mb-2"
              style={{ color: "oklch(0.78 0.2 90)" }}
            >
              ⚡ Skill Gap Warning
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {insights.skillGapWarning}
            </p>
          </section>

          {/* Brutal Truth */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.65 0.26 25 / 0.4)" }}
          >
            <div
              className="px-4 py-3"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.25 25 / 0.25), oklch(0.58 0.22 15 / 0.15))",
              }}
            >
              <h3
                className="text-sm font-black"
                style={{ color: "oklch(0.78 0.24 25)" }}
              >
                🔥 Brutal Truth
              </h3>
            </div>
            <div
              className="p-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.25 25 / 0.08), oklch(var(--card)))",
              }}
            >
              <p
                className="text-sm font-semibold leading-relaxed"
                style={{ color: "oklch(0.88 0.05 280)" }}
              >
                {insights.brutalTruth}
              </p>
            </div>
          </section>

          {/* Action buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => setShowShareCard(true)}
              data-ocid="fullresult.share_card_button"
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm text-white transition-all active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                boxShadow: "0 4px 20px oklch(0.65 0.3 290 / 0.4)",
              }}
            >
              📤 Generate Share Card
            </button>
            <button
              type="button"
              onClick={onNewQuestion}
              data-ocid="fullresult.new_question_button"
              className="w-full py-3.5 rounded-2xl font-bold text-sm border transition-all active:scale-95 hover:bg-muted"
              style={{ borderColor: "oklch(var(--border))" }}
            >
              🎯 Ask Another Question
            </button>
          </div>

          <div className="h-4" />
        </div>
      </div>

      {/* Share card */}
      {showShareCard && (
        <ShareCard
          question={question}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
