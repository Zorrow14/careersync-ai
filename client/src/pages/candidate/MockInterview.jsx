import { useEffect, useState } from "react";
import { Mic, CheckCircle2, AlertCircle, Loader2, TrendingUp } from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { interviewSets, readinessDimensions } from "../../data/interviewQuestions.js";
import { recordScoreBoost, getScoreBoost } from "../../lib/scoreProgress.js";

export default function MockInterview() {
  const { personaId } = usePersona();
  const interview = interviewSets[personaId];
  const dimensions = readinessDimensions[personaId];

  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [scoreBoost, setScoreBoost] = useState(() => getScoreBoost(personaId));

  const question = interview.questions[currentQ];

  function handleSubmit(e) {
    e.preventDefault();
    if (!answer.trim()) return;
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setSubmitted(true);
      const boost = recordScoreBoost(personaId, "mockInterview", 5);
      setScoreBoost(boost);
    }, 1200);
  }

  function handleNext() {
    if (currentQ < interview.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setAnswer("");
      setSubmitted(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">AI Mock Interview</p>
        <h1 className="neo-title text-3xl font-bold sm:text-4xl">Practice Interview</h1>
        <p className="neo-text mt-2">
          Role-based questions and AI feedback for {interview.targetRole}.
        </p>
        {scoreBoost > 0 && (
          <p className="neo-good mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium">
            <TrendingUp size={16} />
            Employability score boosted +{scoreBoost}% from completed AI practice
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
              {interview.targetRole}
            </span>
            <span className="neo-muted text-xs">
              {question.category} · Question {currentQ + 1} of {interview.questions.length}
            </span>
            {question.difficulty && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                question.difficulty === "hard" ? "neo-danger" :
                question.difficulty === "medium" ? "neo-blue" : "neo-good"
              }`}>
                {question.difficulty}
              </span>
            )}
          </div>

          <div className="neo-soft rounded-xl p-5">
            <div className="mb-3 flex items-center gap-2 text-amber-300">
              <Mic size={18} />
              <span className="text-sm font-semibold">Interview Question</span>
            </div>
            <p className="neo-text leading-7">{question.question}</p>
          </div>

          {evaluating ? (
            <div className="mt-6 flex flex-col items-center justify-center py-16">
              <Loader2 size={36} className="animate-spin text-amber-400" />
              <p className="neo-text mt-4 text-sm">Evaluating your answer…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <label className="neo-text mb-2 block text-sm font-medium">Your answer</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                placeholder="Type your answer here…"
                className="neo-input w-full resize-none rounded-xl px-4 py-3 text-sm"
                disabled={submitted}
              />
              {!submitted && (
                <button
                  type="submit"
                  disabled={!answer.trim()}
                  className="neo-primary mt-4 rounded-xl px-6 py-3 text-sm font-semibold disabled:opacity-50"
                >
                  Submit Answer
                </button>
              )}
              {submitted && currentQ < interview.questions.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="neo-primary mt-4 rounded-xl px-6 py-3 text-sm font-semibold"
                >
                  Next Question →
                </button>
              )}
            </form>
          )}
        </div>

        <div className="space-y-6">
          {submitted ? (
            <>
              <div className="neo-card rounded-2xl p-6 text-center">
                <p className="neo-muted text-sm">Answer Score</p>
                <h2 className="neo-title mt-2 text-5xl font-bold text-amber-300">
                  {interview.sampleFeedback.score}%
                </h2>
              </div>

              <div className="neo-card rounded-2xl p-6">
                <h3 className="neo-title mb-3 font-bold">AI Feedback</h3>
                <div className="neo-good mb-3 rounded-xl p-3 text-sm">
                  <p className="mb-1 flex items-center gap-1 font-semibold">
                    <CheckCircle2 size={14} /> Strengths
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    {interview.sampleFeedback.strengths.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="neo-danger mb-3 rounded-xl p-3 text-sm">
                  <p className="mb-1 flex items-center gap-1 font-semibold">
                    <AlertCircle size={14} /> Areas to improve
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    {interview.sampleFeedback.weaknesses.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
                <p className="neo-muted text-xs leading-6">
                  <span className="font-semibold text-amber-300">Better answer: </span>
                  {interview.sampleFeedback.improvedAnswer}
                </p>
              </div>
            </>
          ) : (
            <div className="neo-card rounded-2xl p-6">
              <h3 className="neo-title mb-4 font-bold">Readiness Dimensions</h3>
              <div className="space-y-3">
                {dimensions.map(({ label, score }) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="neo-text">{label}</span>
                      <span className="neo-muted">{score}%</span>
                    </div>
                    <div className="neo-progress-track h-2 overflow-hidden rounded-full">
                      <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="neo-muted mt-4 text-xs">
                Submit an answer to see AI feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
