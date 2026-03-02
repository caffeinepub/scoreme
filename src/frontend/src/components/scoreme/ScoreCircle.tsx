import { useEffect, useRef, useState } from "react";
import { getScoreColor, getScoreLabel } from "../../utils/modes";

interface ScoreCircleProps {
  targetScore: number;
  size?: number;
}

export default function ScoreCircle({
  targetScore,
  size = 160,
}: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const duration = 1500;

  useEffect(() => {
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setDisplayScore(Math.round(eased * targetScore));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [targetScore]);

  const scoreColor = getScoreColor(displayScore);
  const scoreLabel = getScoreLabel(targetScore);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (displayScore / 100) * circumference;

  // Background track color
  const trackColor = "oklch(var(--muted) / 0.6)";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="score-ring-glow-low"
          aria-label={`Reality Score: ${displayScore}`}
          role="img"
          style={{
            filter: `drop-shadow(0 0 18px ${scoreColor}88)`,
            transform: "rotate(-90deg)",
          }}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={8}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={scoreColor}
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke 0.4s ease, stroke-dashoffset 0.03s linear",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-black leading-none"
            style={{
              fontSize: size * 0.3,
              color: scoreColor,
              letterSpacing: "-0.03em",
            }}
          >
            {displayScore}
          </span>
          <span
            className="text-xs font-bold uppercase tracking-wider mt-0.5"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            Score
          </span>
        </div>
      </div>

      {/* Score label */}
      <div
        className="px-4 py-1.5 rounded-full text-sm font-bold"
        style={{
          background: `${scoreColor}22`,
          color: scoreColor,
          border: `1px solid ${scoreColor}44`,
        }}
      >
        {scoreLabel}
      </div>
    </div>
  );
}
