import { Share2, X } from "lucide-react";
import { toast } from "sonner";
import type { Question } from "../../backend.d";
import { getModeConfig, getScoreColor } from "../../utils/modes";

interface ShareCardProps {
  question: Question;
  onClose: () => void;
}

export default function ShareCard({ question, onClose }: ShareCardProps) {
  const modeConfig = getModeConfig(question.mode);
  const score = Number(question.scoreResult.score);
  const scoreColor = getScoreColor(score);

  const handleShare = async () => {
    const shareText = `I scored ${score}/100 on SCOREME! 🎯\n"${question.text.slice(0, 80)}..."\n\nRisk: ${question.scoreResult.riskLevel} · Courage: ${question.scoreResult.courageLevel}\n\n${question.scoreResult.insight}\n\nscoreme.ph`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `My Reality Score: ${score}/100`,
          text: shareText,
          url: "https://scoreme.ph",
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Score card copied to clipboard! 📋");
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Close share card"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ maxWidth: 430, margin: "0 auto" }}
      >
        <div
          className="w-full rounded-3xl overflow-hidden"
          style={{
            background: "oklch(var(--popover))",
            border: "1px solid oklch(var(--border))",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-black text-base">Share Your Score 📤</h3>
            <button
              type="button"
              onClick={onClose}
              data-ocid="sharecard.close_button"
              className="w-8 h-8 rounded-xl flex items-center justify-center bg-muted hover:bg-accent transition-colors"
              aria-label="Close share card"
            >
              <X size={14} />
            </button>
          </div>

          {/* The shareable card */}
          <div className="p-4">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.12 0.08 290) 0%, oklch(0.08 0.06 310) 50%, oklch(0.1 0.07 335) 100%)",
              }}
            >
              {/* Card header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                    }}
                  >
                    <img
                      src="/assets/generated/scoreme-logo-transparent.dim_200x200.png"
                      alt="SCOREME"
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                  <span
                    className="text-sm font-black tracking-tight"
                    style={{ color: "white", letterSpacing: "-0.02em" }}
                  >
                    SCOREME
                  </span>
                </div>
                <span
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.6 0.08 280)" }}
                >
                  scoreme.ph 🇵🇭
                </span>
              </div>

              {/* Question */}
              <div className="px-4 pb-3">
                <p
                  className="text-sm font-medium italic truncate-2"
                  style={{ color: "oklch(0.82 0.05 280)" }}
                >
                  &ldquo;
                  {question.text.length > 100
                    ? `${question.text.slice(0, 100)}...`
                    : question.text}
                  &rdquo;
                </p>
              </div>

              {/* Score */}
              <div className="px-4 py-3 flex items-center gap-4">
                <div>
                  <div
                    className="text-6xl font-black leading-none"
                    style={{ color: scoreColor, letterSpacing: "-0.04em" }}
                  >
                    {score}
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mt-0.5"
                    style={{ color: "oklch(0.6 0.05 280)" }}
                  >
                    Reality Score
                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <div
                    className="text-sm font-bold px-2.5 py-1 rounded-full inline-block"
                    style={{
                      background: modeConfig.gradient,
                      color: modeConfig.textColor,
                    }}
                  >
                    {modeConfig.emoji} {modeConfig.label}
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.65 0.26 25 / 0.2)",
                        color: "oklch(0.75 0.24 25)",
                      }}
                    >
                      Risk: {question.scoreResult.riskLevel as string}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.65 0.3 290 / 0.2)",
                        color: "oklch(0.75 0.28 290)",
                      }}
                    >
                      Courage: {question.scoreResult.courageLevel as string}
                    </span>
                  </div>
                </div>
              </div>

              {/* Insight */}
              <div
                className="mx-4 mb-4 p-3 rounded-xl"
                style={{
                  background: `${scoreColor}18`,
                  border: `1px solid ${scoreColor}30`,
                }}
              >
                <p
                  className="text-sm font-semibold italic"
                  style={{ color: "oklch(0.9 0.05 280)" }}
                >
                  &ldquo;{question.scoreResult.insight}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Share button */}
          <div className="px-4 pb-5">
            <button
              type="button"
              onClick={handleShare}
              data-ocid="sharecard.share_button"
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm text-white transition-all active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                boxShadow: "0 4px 20px oklch(0.65 0.3 290 / 0.4)",
              }}
            >
              <Share2 size={16} />
              Share to Social Media 📲
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
