import { ArrowLeft, Copy, ExternalLink, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsScreenProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onBack: () => void;
}

const SCORE_TIPS = [
  {
    emoji: "🎯",
    title: "Be Specific",
    tip: "The more specific your question, the more accurate your Reality Score. Add context, timeline, and details.",
  },
  {
    emoji: "💪",
    title: "Face the Brutal Truth",
    tip: "Use Brutal Mode when you need a no-filter reality check. Don't be afraid of low scores — they guide you.",
  },
  {
    emoji: "🔄",
    title: "Track Your Progress",
    tip: "Ask the same question every month to see how your score improves as you take action.",
  },
  {
    emoji: "🌱",
    title: "Use Growth Mode",
    tip: "Growth Mode gives you skill-building suggestions that can raise your score over time.",
  },
  {
    emoji: "💰",
    title: "Money Mode for Business",
    tip: "Always run your business decisions through Money Mode before committing real resources.",
  },
  {
    emoji: "🔮",
    title: "Plan with Future Mode",
    tip: "Future Mode's 1-Year Projection helps you understand long-term consequences of today's decisions.",
  },
];

export default function SettingsScreen({
  theme,
  onToggleTheme,
  onBack,
}: SettingsScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyGCash = async () => {
    try {
      await navigator.clipboard.writeText("09858612144");
      setCopied(true);
      toast.success("GCash number copied! 📋");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy number");
    }
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
          data-ocid="settings.back_button"
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
            Settings
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-5 space-y-6">
          {/* Theme Toggle */}
          <section
            className="rounded-2xl border p-4"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <h2 className="text-sm font-black mb-3">Appearance</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon size={18} className="text-primary" />
                ) : (
                  <Sun size={18} className="text-primary" />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {theme === "dark"
                      ? "Easy on the eyes at night"
                      : "Bright and clear"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleTheme}
                data-ocid="settings.theme_toggle"
                className="relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))"
                      : "oklch(var(--muted))",
                }}
                aria-label="Toggle theme"
                role="switch"
                aria-checked={theme === "dark"}
              >
                <span
                  className="absolute w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm"
                  style={{
                    transform:
                      theme === "dark" ? "translateX(26px)" : "translateX(2px)",
                  }}
                />
              </button>
            </div>
          </section>

          {/* Score Improvement Tips */}
          <section>
            <h2 className="text-sm font-black mb-3">
              📈 How to Improve Your Score
            </h2>
            <div className="space-y-3">
              {SCORE_TIPS.map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-xl p-4 border"
                  style={{
                    background: "oklch(var(--card))",
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-2xl flex-shrink-0">{tip.emoji}</span>
                    <div>
                      <p className="text-sm font-bold">{tip.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {tip.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* GCash Payment Info */}
          <section
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: "oklch(0.52 0.22 235 / 0.35)" }}
          >
            <div
              className="px-4 py-3"
              style={{ background: "oklch(0.52 0.22 235 / 0.15)" }}
            >
              <h2
                className="text-sm font-black"
                style={{ color: "oklch(0.65 0.22 235)" }}
              >
                💳 Payment Info
              </h2>
            </div>
            <div
              className="p-4 space-y-3"
              style={{ background: "oklch(var(--card))" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Unlock Price</p>
                  <p className="text-xs text-muted-foreground">
                    Per question, no subscription
                  </p>
                </div>
                <span
                  className="text-2xl font-black"
                  style={{ color: "oklch(0.65 0.22 235)" }}
                >
                  ₱15
                </span>
              </div>
              <div
                className="rounded-xl p-3 border"
                style={{
                  background: "oklch(var(--background))",
                  borderColor: "oklch(var(--border))",
                }}
              >
                <p className="text-xs text-muted-foreground mb-1">
                  GCash Number
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black tracking-wider">
                    09858612144
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyGCash}
                    data-ocid="settings.copy_gcash_button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: copied
                        ? "oklch(0.65 0.2 145 / 0.2)"
                        : "oklch(var(--muted))",
                      color: copied
                        ? "oklch(0.72 0.22 145)"
                        : "oklch(var(--foreground))",
                    }}
                  >
                    <Copy size={12} />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Payment via GCash only. After sending ₱15, tap "I've Paid" to
                unlock your full results instantly.
              </p>
            </div>
          </section>

          {/* About SCOREME */}
          <section
            className="rounded-2xl border p-4"
            style={{
              background: "oklch(var(--card))",
              borderColor: "oklch(var(--border))",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                }}
              >
                <img
                  src="/assets/generated/scoreme-logo-transparent.dim_200x200.png"
                  alt="SCOREME"
                  className="w-7 h-7 object-contain"
                />
              </div>
              <div>
                <h2 className="text-sm font-black">SCOREME</h2>
                <p className="text-xs text-muted-foreground">
                  Reality Score Engine 🇵🇭
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SCOREME is a mobile-first app where you can type any life,
              business, relationship, or personal question and instantly get a
              Reality Score with bold insights. Designed for the Philippines,
              built for Gen Z and Millennials who want honest answers.
            </p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
              <ExternalLink size={12} />
              <span>scoreme.ph</span>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Built with ❤️ using caffeine.ai
              </a>
            </p>
          </footer>

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
