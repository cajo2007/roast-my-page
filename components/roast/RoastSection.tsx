import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { severityToColor, severityToIcon, ratingToColor } from "@/lib/utils";
import type {
  AboveTheFoldSection,
  ConversionKillersSection,
  RoastRewrite,
  FinalVerdictSection,
  RatingLevel,
} from "@/lib/types";

// --- Above the fold ---

type AboveTheFoldProps = {
  data: AboveTheFoldSection;
};

export function AboveTheFoldCard({ data }: AboveTheFoldProps) {
  return (
    <Card>
      <CardHeader
        title="Above the Fold"
        subtitle={data.summary}
        badge={
          <Badge variant={severityBadgeVariant(data.rating)}>
            {capitalize(data.rating)}
          </Badge>
        }
      />
      <ul className="flex flex-col gap-3">
        {data.issues.map((issue, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span
              className={`shrink-0 mt-0.5 text-xs ${severityToColor(issue.severity)}`}
              aria-hidden
            >
              {severityToIcon(issue.severity)}
            </span>
            <span className="text-zinc-300 leading-relaxed">{issue.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// --- Conversion killers ---

type ConversionKillersProps = {
  data: ConversionKillersSection;
};

export function ConversionKillersCard({ data }: ConversionKillersProps) {
  return (
    <Card>
      <CardHeader title="Conversion Killers" />
      <ul className="flex flex-col gap-3">
        {data.items.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span
              className={`shrink-0 mt-0.5 text-xs ${severityToColor(item.severity)}`}
              aria-hidden
            >
              {severityToIcon(item.severity)}
            </span>
            <span className="text-zinc-300 leading-relaxed">{item.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// --- Rewrites ---

type RewritesProps = {
  rewrites: RoastRewrite[];
};

export function RewritesCard({ rewrites }: RewritesProps) {
  return (
    <Card>
      <CardHeader
        title="Rewrites"
        subtitle="Here's what the copy should actually say."
      />
      <div className="flex flex-col gap-6">
        {rewrites.map((rewrite, i) => (
          <div key={i} className="flex flex-col gap-3">
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
              {rewrite.label}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                <p className="text-xs text-red-400 font-medium mb-1.5 uppercase tracking-wide">
                  Before
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {rewrite.original}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                <p className="text-xs text-green-400 font-medium mb-1.5 uppercase tracking-wide">
                  After
                </p>
                <p className="text-sm text-zinc-100 leading-relaxed font-medium">
                  {rewrite.rewrite}
                </p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              <span className="text-zinc-400 font-medium">Why: </span>
              {rewrite.why}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// --- Final verdict ---

type FinalVerdictProps = {
  data: FinalVerdictSection;
};

export function FinalVerdictCard({ data }: FinalVerdictProps) {
  return (
    <Card accent>
      <CardHeader
        title="Final Verdict"
        badge={
          <Badge variant={data.wouldConvert ? "good" : "critical"}>
            {data.wouldConvert ? "Would convert" : "Would not convert"}
          </Badge>
        }
      />
      <p className="text-zinc-300 text-sm leading-relaxed mb-6">
        {data.summary}
      </p>

      <div className="mb-6">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Fix these first
        </p>
        <ol className="flex flex-col gap-2">
          {data.topPriorities.map((priority, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-amber-500 font-mono font-bold shrink-0">
                {i + 1}.
              </span>
              <span className="text-zinc-300 leading-relaxed">{priority}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="pt-5 border-t border-zinc-800">
        <p className="text-zinc-400 italic text-sm leading-relaxed">
          "{data.verdict}"
        </p>
      </div>
    </Card>
  );
}

// --- Helpers ---

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function severityBadgeVariant(
  rating: RatingLevel
): "critical" | "warning" | "good" | "default" {
  const map: Record<RatingLevel, "critical" | "warning" | "good" | "default"> = {
    critical: "critical",
    poor: "warning",
    decent: "default",
    good: "good",
  };
  return map[rating];
}
