import { BookOpen, CheckCircle2, Lightbulb, WandSparkles } from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

const impactColors = {
  High: "neo-danger",
  Medium: "neo-blue",
  Low: "neo-soft",
};

export default function CurriculumInsights() {
  const data = universityInsights.curriculumInsights;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Curriculum Insights</h1>
        <p className="neo-text mt-2">Mock AI recommendations and skill-gap signals for curriculum planning.</p>
      </div>

      <section className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <WandSparkles size={22} className="text-amber-300" />
          <h2 className="neo-title text-xl font-bold">AI Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {data.aiRecommendations.map((rec) => (
            <div key={rec.title} className="neo-soft rounded-2xl p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="neo-title font-semibold">{rec.title}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${impactColors[rec.impact]}`}>
                  {rec.impact}
                </span>
              </div>
              <p className="neo-text mb-4 text-sm leading-6">{rec.description}</p>
              <div className="flex flex-wrap gap-2">
                {rec.targetSkills.map((skill) => (
                  <span key={skill} className="neo-badge-missing rounded-full px-3 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <BookOpen size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Identified Module Gaps</h2>
          </div>
          <div className="space-y-5">
            {data.moduleGaps.map((gap) => (
              <div key={`${gap.module}-${gap.gap}`}>
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <p className="neo-title font-semibold">{gap.module}</p>
                    <p className="neo-muted text-xs">{gap.gap}</p>
                  </div>
                  <p className="text-xs font-semibold text-amber-300">
                    {gap.currentCoverage}% / {gap.recommendedCoverage}%
                  </p>
                </div>
                <div className="neo-progress-track relative h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-stone h-full rounded-full" style={{ width: `${gap.currentCoverage}%` }} />
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-amber-400/40"
                    style={{ width: `${gap.recommendedCoverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <Lightbulb size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Quick Wins</h2>
          </div>
          <div className="space-y-3">
            {data.quickWins.map((win) => (
              <div key={win} className="neo-soft flex items-start gap-3 rounded-xl p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                <p className="neo-text text-sm leading-6">{win}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
