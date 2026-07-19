import { useEffect, useState } from "react";
import { PlayCircle, RotateCcw, X } from "lucide-react";
import { useDemoWorkflow } from "../../context/DemoWorkflowContext.jsx";
import { usePersona } from "../../context/PersonaContext.jsx";

export default function DemoScenarioControl() {
  const { hasChanges, loadDemoScenario, notice } = useDemoWorkflow();
  const { switchPersona } = usePersona();
  const [open, setOpen] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setConfirmingReset(false);
      }
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function loadScenario() {
    loadDemoScenario();
    switchPersona("sarah");
    setOpen(false);
    setConfirmingReset(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="neo-secondary hidden items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold lg:flex"
      >
        <PlayCircle size={15} aria-hidden="true" />
        Demo scenario
      </button>

      {notice && (
        <p
          className={`fixed bottom-5 right-5 z-[80] max-w-sm rounded-xl px-4 py-3 text-sm font-medium shadow-xl ${
            notice.type === "success" ? "neo-good" : "neo-soft"
          }`}
          role="status"
        >
          {notice.message}
        </p>
      )}

      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-scenario-title"
            className="neo-card w-full max-w-lg rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-300">Judge walkthrough</p>
                <h2 id="demo-scenario-title" className="neo-title mt-1 text-xl font-bold">
                  Connected hiring loop
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close demo scenario"
                className="neo-nav-icon-btn"
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            <ol className="neo-text mt-5 space-y-3 text-sm leading-6">
              <li><strong>1.</strong> Sarah reviews her evidence-based 92% TechNova match and fastest gap.</li>
              <li><strong>2.</strong> She applies; the same application appears in TechNova&apos;s employer inbox and pipeline.</li>
              <li><strong>3.</strong> Move Sarah to Screening or Interview in the employer pipeline, then revisit her tracker for feedback.</li>
            </ol>

            <p className="neo-muted mt-4 text-xs leading-5">
              All insights and state changes are deterministic, local-only demo data. No AI service or backend is called.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={loadScenario} className="neo-primary rounded-xl px-4 py-2.5 text-sm font-semibold">
                Load Demo Scenario
              </button>
              <button
                type="button"
                onClick={() => (hasChanges ? setConfirmingReset(true) : loadScenario())}
                className="neo-secondary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Reset Demo Data
              </button>
            </div>

            {confirmingReset && (
              <div className="neo-danger mt-5 rounded-xl p-4 text-sm">
                <p className="font-semibold">Reset this local demo session?</p>
                <p className="mt-1 text-xs">Your application, saved-job, pipeline, and posting changes will be discarded.</p>
                <div className="mt-3 flex gap-3">
                  <button type="button" onClick={loadScenario} className="rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white">
                    Reset data
                  </button>
                  <button type="button" onClick={() => setConfirmingReset(false)} className="neo-secondary rounded-lg px-3 py-2 text-xs font-semibold">
                    Keep changes
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
