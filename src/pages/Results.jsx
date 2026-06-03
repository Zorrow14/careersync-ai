import { mockAnalysis } from "../data/mockData";
import SkillBadge from "../components/SkillBadge";
import { Link } from "react-router-dom";

export default function Results() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Mock AI Result</p>
        <h1 className="neo-title text-4xl font-bold">
          Career Match Analysis
        </h1>
        <p className="neo-text mt-2">
          AI-generated compatibility analysis based on your portfolio and the job
          description.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-8 text-center">
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-amber-500/20 bg-amber-500/10">
            <div>
              <h2 className="text-5xl font-bold text-amber-300">
                {mockAnalysis.matchScore}%
              </h2>
              <p className="neo-muted text-sm">Match Score</p>
            </div>
          </div>

          <h3 className="neo-title mt-6 text-xl font-bold">
            {mockAnalysis.role}
          </h3>
          <p className="neo-muted mt-2 text-sm">{mockAnalysis.company}</p>
        </div>

        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <h2 className="neo-title text-xl font-bold">AI Summary</h2>
          <p className="neo-text mt-4 leading-7">{mockAnalysis.summary}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="neo-good rounded-2xl p-4">
              <p className="text-sm font-medium">Strength Level</p>
              <h3 className="mt-2 text-2xl font-bold">Strong Fit</h3>
            </div>

            <div className="neo-blue rounded-2xl p-4">
              <p className="text-sm font-medium">Estimated Improvement</p>
              <h3 className="mt-2 text-2xl font-bold">+12% in 8 weeks</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">Matched Skills</h2>
          <div className="flex flex-wrap gap-3">
            {mockAnalysis.matchedSkills.map((skill) => (
              <SkillBadge key={skill}>{skill}</SkillBadge>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">Missing Skills</h2>
          <div className="flex flex-wrap gap-3">
            {mockAnalysis.missingSkills.map((skill) => (
              <SkillBadge key={skill} type="missing">
                {skill}
              </SkillBadge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title text-xl font-bold">Strengths</h2>
          <ul className="neo-text mt-4 space-y-3 text-sm leading-6">
            {mockAnalysis.strengths.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title text-xl font-bold">Weaknesses</h2>
          <ul className="neo-text mt-4 space-y-3 text-sm leading-6">
            {mockAnalysis.weaknesses.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title text-xl font-bold">Recommendations</h2>
          <ul className="neo-text mt-4 space-y-3 text-sm leading-6">
            {mockAnalysis.recommendations.map((item) => (
              <li key={item}>→ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="/roadmap"
        className="neo-primary mt-8 inline-flex rounded-xl px-6 py-3 font-semibold"
      >
        View Personalized Roadmap
      </Link>
    </div>
  );
}