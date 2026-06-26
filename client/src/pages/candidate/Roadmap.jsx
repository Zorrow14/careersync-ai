import { useEffect } from "react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { roadmaps } from "../../data/roadmapData.js";
import { recordScoreBoost, getScoreBoost } from "../../lib/scoreProgress.js";
import { TrendingUp } from "lucide-react";

export default function Roadmap() {
  const { personaId } = usePersona();
  const roadmap = roadmaps[personaId];

  useEffect(() => {
    recordScoreBoost(personaId, "roadmap", 4);
  }, [personaId]);

  const boost = getScoreBoost(personaId);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Personalized Career Roadmap</p>
        <h1 className="neo-title text-4xl font-bold">{roadmap.title}</h1>
        <p className="neo-text mt-2">
          AI-generated {roadmap.duration} improvement plan tailored to your skill gaps.
        </p>
        {boost > 0 && (
          <p className="neo-good mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium">
            <TrendingUp size={16} />
            Following this roadmap adds +{boost}% to your employability score
          </p>
        )}
      </div>

      <div className="neo-card rounded-2xl p-8">
        <div className="space-y-8">
          {roadmap.steps.map((item, index) => (
            <div key={item.phase} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-950">
                  {index + 1}
                </div>
                {index !== roadmap.steps.length - 1 && (
                  <div className="h-full min-h-16 w-px bg-slate-600/40" />
                )}
              </div>

              <div className="neo-soft w-full rounded-2xl p-5">
                <p className="text-sm font-semibold text-amber-300">{item.phase}</p>
                <h2 className="neo-title mt-1 text-xl font-bold">{item.title}</h2>
                <p className="neo-text mt-2 leading-7">{item.description}</p>

                {item.skills?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                )}

                {item.tasks?.length > 0 && (
                  <ul className="neo-muted mt-3 space-y-1 text-sm">
                    {item.tasks.map((t) => (
                      <li key={t}>→ {t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="neo-card mt-6 rounded-2xl p-6">
        <h2 className="neo-title text-xl font-bold">Projected Employability Score</h2>
        <p className="neo-text mt-3 leading-7">
          If you complete this roadmap, your projected employability score may increase from{" "}
          <span className="font-semibold text-amber-300">{roadmap.currentScore}%</span> to{" "}
          <span className="font-semibold text-amber-300">{roadmap.projectedScore}%</span>.
        </p>
        <div className="mt-4 flex gap-4">
          <div className="neo-soft flex-1 rounded-xl p-4 text-center">
            <p className="neo-muted text-xs">Current</p>
            <p className="neo-title text-3xl font-bold">{roadmap.currentScore}%</p>
          </div>
          <div className="flex items-center text-amber-300">→</div>
          <div className="neo-good flex-1 rounded-xl p-4 text-center">
            <p className="text-xs font-medium">Projected</p>
            <p className="text-3xl font-bold">{roadmap.projectedScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
