import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden ${exiting ? "splash-exit" : "splash-enter"}`}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.12 0.08 290) 0%, oklch(0.08 0.06 310) 40%, oklch(0.1 0.07 335) 100%)",
      }}
    >
      {/* Ambient glow circles */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 30% 60%, oklch(0.55 0.28 290 / 0.25) 0%, transparent 70%), radial-gradient(ellipse 50% 35% at 70% 30%, oklch(0.65 0.28 335 / 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-8">
        {/* Logo */}
        <div className="float-anim">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.3 290), oklch(0.62 0.28 335))",
              boxShadow:
                "0 20px 60px oklch(0.65 0.3 290 / 0.5), 0 8px 24px oklch(0.62 0.28 335 / 0.3)",
            }}
          >
            <img
              src="/assets/generated/scoreme-logo-transparent.dim_200x200.png"
              alt="SCOREME"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <h1
            className="text-6xl font-black tracking-tight leading-none"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.9 0.05 280) 0%, oklch(0.75 0.25 290) 40%, oklch(0.8 0.28 335) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.04em",
            }}
          >
            SCOREME
          </h1>
          <p
            className="text-xl font-semibold mt-2"
            style={{ color: "oklch(0.82 0.1 280)" }}
          >
            Your Reality, Scored. 🎯
          </p>
          <p
            className="text-sm mt-1 font-medium"
            style={{ color: "oklch(0.65 0.08 280)" }}
          >
            Get your Reality Score in seconds
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: "oklch(0.65 0.3 290)",
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <div
        className="absolute bottom-10 text-xs font-medium"
        style={{ color: "oklch(0.5 0.08 280)" }}
      >
        scoreme.ph 🇵🇭
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
