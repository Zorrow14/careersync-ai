import { useState } from "react";
import { Mic, CheckCircle2, AlertCircle } from "lucide-react";

const mockQuestion = {
  question:
    "Tell me about a React project you built. What was your role, what challenges did you face, and how did you solve them?",
  feedback: {
    score: 78,
    strengths: [
      "Clear explanation of project purpose",
      "Mentioned React hooks and component structure",
    ],
    weaknesses: [
      "Could include more detail on state management",
      "Did not mention testing or deployment",
    ],
    improvedAnswer:
      "I built a task management app using React and Context API for state. I faced performance issues with re-renders and solved them using useMemo and useCallback. I deployed it on Vercel with CI/CD via GitHub Actions.",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Quantify impact where possible (users, performance gains)",
    ],
  },
};

const readinessDimensions = [
  { label: "Technical accuracy", score: 80 },
  { label: "Communication", score: 75 },
  { label: "Project explanation", score: 82 },
  { label: "Problem solving", score: 70 },
  { label: "Confidence", score: 76 },
  { label: "Role relevance", score: 85 },
];

export default function MockInterview() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    setSubmitted(true);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">AI Mock Interview</p>
        <h1 className="neo-title text-4xl font-bold">Practice Interview</h1>
        <p className="neo-text mt-2">
          Mock interview prototype — role-based questions and AI feedback (demo data).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
              Frontend Developer Intern
            </span>
            <span className="neo-muted text-xs">Technical · Question 1 of 3</span>
          </div>

          <div className="neo-soft rounded-xl p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <Mic size={18} />
              <span className="text-sm font-semibold">Interview Question</span>
            </div>
            <p className="neo-text leading-7">{mockQuestion.question}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <label className="neo-text mb-2 block text-sm font-medium">
              Your answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              placeholder="Type your answer here…"
              className="neo-input w-full resize-none rounded-xl px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={!answer.trim()}
              className="neo-primary mt-4 rounded-xl px-6 py-3 text-sm font-semibold disabled:opacity-50"
            >
              Submit Answer
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {submitted ? (
            <>
              <div className="neo-card rounded-2xl p-6 text-center">
                <p className="neo-muted text-sm">Interview Readiness Score</p>
                <h2 className="neo-title mt-2 text-5xl font-bold text-amber-300">
                  {mockQuestion.feedback.score}%
                </h2>
              </div>

              <div className="neo-card rounded-2xl p-6">
                <h3 className="neo-title mb-3 font-bold">AI Feedback</h3>
                <div className="neo-good mb-3 rounded-xl p-3 text-sm">
                  <p className="mb-1 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={14} /> Strengths
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    {mockQuestion.feedback.strengths.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="neo-danger mb-3 rounded-xl p-3 text-sm">
                  <p className="mb-1 flex items-center gap-1 font-semibold">
                    <AlertCircle size={14} /> Areas to improve
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    {mockQuestion.feedback.weaknesses.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
                <p className="neo-muted text-xs leading-6">
                  <span className="font-semibold text-amber-300">Improved answer: </span>
                  {mockQuestion.feedback.improvedAnswer}
                </p>
              </div>
            </>
          ) : (
            <div className="neo-card rounded-2xl p-6">
              <h3 className="neo-title mb-4 font-bold">Readiness Dimensions</h3>
              <div className="space-y-3">
                {readinessDimensions.map(({ label, score }) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="neo-text">{label}</span>
                      <span className="neo-muted">{score}%</span>
                    </div>
                    <div className="neo-progress-track h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-blue-400"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="neo-muted mt-4 text-xs">
                Submit an answer to see AI feedback and updated scores.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
