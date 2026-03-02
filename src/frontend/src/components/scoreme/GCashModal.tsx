import { Check, Copy, ExternalLink, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUnlockQuestion } from "../../hooks/useBackend";

interface GCashModalProps {
  questionId: bigint;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GCashModal({
  questionId,
  onClose,
  onSuccess,
}: GCashModalProps) {
  const [copied, setCopied] = useState(false);
  const { mutate: unlockQuestion, isPending } = useUnlockQuestion();

  const GCASH_NUMBER = "09858612144";
  const AMOUNT = 15;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_NUMBER);
      setCopied(true);
      toast.success("GCash number copied! 📋");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Could not copy. Number: ${GCASH_NUMBER}`);
    }
  };

  const handleOpenGCash = () => {
    window.location.href = `gcash://send?to=${GCASH_NUMBER}&amount=${AMOUNT}`;
  };

  const handleConfirmPayment = () => {
    unlockQuestion(questionId, {
      onSuccess: () => {
        toast.success("Unlocked! 🔓 Loading your full results...");
        setTimeout(onSuccess, 800);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      },
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        data-ocid="gcash.modal"
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full z-50 rounded-t-3xl overflow-hidden safe-bottom"
        style={{
          maxWidth: 430,
          background: "oklch(var(--popover))",
          borderTop: "1px solid oklch(var(--border))",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="gcash.close_button"
          className="absolute top-4 right-4 w-8 h-8 rounded-xl flex items-center justify-center bg-muted hover:bg-accent transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="px-5 pb-8 pt-2 space-y-5">
          {/* Header */}
          <div className="text-center">
            <h2
              className="text-xl font-black"
              style={{ letterSpacing: "-0.02em" }}
            >
              🔓 Unlock Full Clarity
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              One-time payment · No subscription
            </p>
            <div
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-2xl"
              style={{
                background: "oklch(0.52 0.22 235 / 0.15)",
                border: "1px solid oklch(0.52 0.22 235 / 0.3)",
              }}
            >
              <span
                className="text-3xl font-black"
                style={{ color: "oklch(0.65 0.22 235)" }}
              >
                ₱{AMOUNT}
              </span>
              <span className="text-sm text-muted-foreground">
                via GCash only
              </span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="p-3 rounded-2xl border"
              style={{
                background: "white",
                borderColor: "oklch(0.52 0.22 235 / 0.3)",
              }}
            >
              <img
                src="/assets/generated/gcash-qr.dim_300x350.png"
                alt="GCash QR Code"
                className="w-44 h-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scan with GCash app or send to:
            </p>
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl w-full"
              style={{
                background: "oklch(var(--card))",
                border: "1px solid oklch(var(--border))",
              }}
            >
              <span className="text-lg font-black tracking-wider flex-1 text-center">
                {GCASH_NUMBER}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                data-ocid="gcash.copy_button"
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
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleOpenGCash}
              data-ocid="gcash.open_app_button"
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.52 0.22 235), oklch(0.48 0.2 245))",
                color: "white",
                boxShadow: "0 4px 16px oklch(0.52 0.22 235 / 0.35)",
              }}
            >
              <ExternalLink size={16} />
              Open GCash App
            </button>

            <button
              type="button"
              onClick={handleConfirmPayment}
              data-ocid="gcash.confirm_button"
              disabled={isPending}
              className="w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black text-sm transition-all active:scale-95 disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
                color: "white",
                boxShadow: "0 4px 20px oklch(0.65 0.3 290 / 0.4)",
              }}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Verifying...
                </>
              ) : (
                <>✅ I&apos;ve Paid – Show My Results</>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 text-sm text-muted-foreground font-medium"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
