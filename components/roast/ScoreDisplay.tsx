import { scoreToColor, scoreToLabel } from "@/lib/utils";
import type { RoastScore } from "@/lib/types";

type ScoreDisplayProps = {
  score: RoastScore;
};

type ScoreBarProps = {
  label: string;
  value: number;
};

function ScoreBar({ label, value }: ScoreBarProps) {
  const color =
    value >= 70
      ? "bg-green-500"
      : value >= 50
        ? "bg-amber-500"
        : value >= 30
          ? "bg-orange-500"
          : "bg-red-500";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-zinc-400 w-8 text-right shrink-0">{value}</span>
    </div>
  );
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const overallColor = scoreToColor(score.overall);
  const overallLabel = scoreToLabel(score.overall);

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start">
      {/* Big score number */}
      <div className="text-center shrink-0">
        <div
          className={`text-7xl font-bold font-mono leading-none glow-amber ${overallColor}`}
        >
          {score.overall}
        </div>
        <div className="text-zinc-500 text-xs mt-2 uppercase tracking-widest">
          out of 100
        </div>
        <div className={`text-sm font-semibold mt-1 ${overallColor}`}>
          {overallLabel}
        </div>
      </div>

      {/* Sub-scores */}
      <div className="flex-1 flex flex-col gap-3 pt-1">
        <ScoreBar label="Clarity" value={score.clarity} />
        <ScoreBar label="CTA" value={score.cta} />
        <ScoreBar label="Messaging" value={score.messaging} />
        <ScoreBar label="Trust" value={score.trust} />
      </div>
    </div>
  );
}
