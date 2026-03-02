import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Question, ScoreMode } from "../backend.d";
import { useSubmitQuestion } from "../hooks/useBackend";
import { MODES, getModeConfig } from "../utils/modes";

interface QuestionScreenProps {
  mode: ScoreMode;
  onBack: () => void;
  onResult: (questionId: bigint, question: Question) => void;
}

export default function QuestionScreen({
  mode,
  onBack,
  onResult,
}: QuestionScreenProps) {
  const [text, setText] = useState("");
  const modeConfig = getModeConfig(mode);
  const { mutate: submitQuestion, isPending } = useSubmitQuestion();

  const handleSubmit = () => {
    if (text.trim().length < 5) {
      toast.error("Please type a more detailed question 🎯");
      return;
    }

    submitQuestion(
      { text: text.trim(), mode },
      {
        onSuccess: ({ questionId, scoreResult }) => {
          const question: Question = {
            id: questionId,
            text: text.trim(),
            mode,
            scoreResult,
            unlockCount: 0n,
            viewCount: 0n,
            isFeatured: false,
            createdAt: BigInt(Date.now() * 1_000_000),
          };
          onResult(questionId, question);
        },
        onError: (err) => {
          console.error(err);
          toast.error("Something went wrong. Please try again 😢");
        },
      },
    );
  };

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
          data-ocid="question.back_button"
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-border transition-colors hover:bg-muted"
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex-1">
          <h1
            className="text-lg font-black"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ask Your Question
          </h1>
        </div>

        {/* Mode badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border"
          style={{
            background: modeConfig.gradient,
            borderColor: modeConfig.borderColor,
            color: modeConfig.textColor,
          }}
        >
          <span>{modeConfig.emoji}</span>
          <span>{modeConfig.label}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {/* Mode description */}
        <div
          className="rounded-2xl p-4 border"
          style={{
            background: modeConfig.gradient,
            borderColor: modeConfig.borderColor,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl">{modeConfig.emoji}</div>
            <div>
              <div
                className="font-black text-base"
                style={{ color: modeConfig.textColor }}
              >
                {modeConfig.label} Mode
              </div>
              <div className="text-sm text-muted-foreground">
                {modeConfig.description}
              </div>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <label
            className="text-sm font-bold text-foreground"
            htmlFor="question-input"
          >
            Your Question
          </label>
          <textarea
            id="question-input"
            data-ocid="question.input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question here... Be specific for a better score! 🎯"
            disabled={isPending}
            rows={5}
            className="w-full rounded-2xl border p-4 text-sm font-medium resize-none focus:outline-none transition-all placeholder:text-muted-foreground"
            style={{
              background: "oklch(var(--card))",
              borderColor:
                text.length > 5
                  ? modeConfig.borderColor
                  : "oklch(var(--border))",
              color: "oklch(var(--foreground))",
            }}
            maxLength={300}
          />
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {text.length}/300
            </span>
          </div>
        </div>

        {/* Example questions */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Example Questions
          </p>
          <div className="space-y-2">
            {modeConfig.exampleQuestions.map((example) => (
              <button
                type="button"
                key={example}
                onClick={() => setText(example)}
                disabled={isPending}
                className="w-full text-left rounded-xl p-3 border text-sm transition-all active:scale-[0.98] hover:border-primary/30"
                style={{
                  background: "oklch(var(--card))",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <span className="text-muted-foreground text-xs mr-1">💡</span>
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* All modes quick selector */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Available Modes
          </p>
          <div className="flex gap-2 flex-wrap">
            {MODES.map((m) => (
              <div
                key={m.mode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border"
                style={{
                  background: m.mode === mode ? m.gradient : "transparent",
                  borderColor:
                    m.mode === mode ? m.borderColor : "oklch(var(--border))",
                  color:
                    m.mode === mode
                      ? m.textColor
                      : "oklch(var(--muted-foreground))",
                }}
              >
                {m.emoji} {m.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="px-4 py-4 safe-bottom border-t border-border">
        {isPending ? (
          <div
            data-ocid="question.loading_state"
            className="w-full py-4 rounded-2xl flex flex-col items-center gap-3"
            style={{
              background: "oklch(var(--card))",
              border: `1px solid ${modeConfig.borderColor}`,
            }}
          >
            <div className="flex items-center gap-2">
              <Loader2
                size={20}
                className="animate-spin"
                style={{ color: modeConfig.textColor }}
              />
              <span
                className="text-sm font-bold"
                style={{ color: modeConfig.textColor }}
              >
                Calculating your Reality Score...
              </span>
            </div>
            <div className="w-full max-w-48 h-2 rounded-full overflow-hidden bg-muted">
              <div
                className="h-full rounded-full animate-pulse"
                style={{
                  background: `linear-gradient(90deg, ${modeConfig.bgColor}, oklch(0.62 0.28 335))`,
                  width: "70%",
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Analyzing your question with AI 🤖
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            data-ocid="question.submit_button"
            disabled={text.trim().length < 5}
            className="w-full py-4 rounded-2xl text-base font-black uppercase tracking-wide transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                text.trim().length >= 5
                  ? "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))"
                  : "oklch(var(--muted))",
              color:
                text.trim().length >= 5
                  ? "white"
                  : "oklch(var(--muted-foreground))",
              boxShadow:
                text.trim().length >= 5
                  ? "0 4px 20px oklch(0.65 0.3 290 / 0.4)"
                  : undefined,
            }}
          >
            🎯 GET MY SCORE
          </button>
        )}
      </div>
    </div>
  );
}
