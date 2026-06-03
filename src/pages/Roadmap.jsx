import { roadmap } from "../data/mockData";

export default function Roadmap() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">
          Personalized Career Roadmap
        </p>
        <h1 className="neo-title text-4xl font-bold">
          8-Week Improvement Plan
        </h1>
        <p className="neo-text mt-2">
          A mock AI-generated roadmap to improve your employability score.
        </p>
      </div>

      <div className="neo-card rounded-2xl p-8">
        <div className="space-y-8">
          {roadmap.map((item, index) => (
            <div key={item.phase} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 font-bold text-slate-950">
                  {index + 1}
                </div>

                {index !== roadmap.length - 1 && (
                  <div className="h-20 w-px bg-slate-600/40" />
                )}
              </div>

              <div className="neo-soft w-full rounded-2xl p-5">
                <p className="text-sm font-semibold text-amber-300">
                  {item.phase}
                </p>
                <h2 className="neo-title mt-1 text-xl font-bold">
                  {item.title}
                </h2>
                <p className="neo-text mt-2 leading-7">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="neo-card mt-6 rounded-2xl p-6">
        <h2 className="neo-title text-xl font-bold">
          Projected Employability Score
        </h2>
        <p className="neo-text mt-3 leading-7">
          If you complete this roadmap, your projected employability score may
          increase from{" "}
          <span className="font-semibold text-amber-300">78%</span> to{" "}
          <span className="font-semibold text-amber-300">91%</span>.
        </p>
      </div>
    </div>
  );
}