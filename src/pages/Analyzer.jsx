import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, WandSparkles, FileText } from "lucide-react";

export default function Analyzer() {
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState("");

  const sampleJD = `We are looking for a Frontend Developer Intern with experience in React.js, JavaScript, HTML, CSS, Git, REST API integration, and basic Node.js. Knowledge of Docker, CI/CD, and cloud deployment is a plus.`;

  const handleAnalyze = () => {
    navigate("/results");
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">
          AI Job Match Analyzer
        </p>
        <h1 className="neo-title text-4xl font-bold">
          Analyze Job Description
        </h1>
        <p className="neo-text mt-2">
          Paste an employer’s job description and compare it with your portfolio
          profile.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">
            Resume / Portfolio
          </h2>

          <div className="neo-soft flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-500/30 p-8 text-center">
            <div className="rounded-2xl bg-amber-500/15 p-4 text-amber-300">
              <Upload size={36} />
            </div>

            <h3 className="neo-title mt-4 font-semibold">Upload Resume</h3>
            <p className="neo-muted mt-2 text-sm">
              Prototype mode: upload is mocked for now.
            </p>

            <button className="neo-secondary mt-5 rounded-xl px-5 py-2 text-sm font-medium">
              Choose PDF
            </button>
          </div>

          <div className="neo-soft mt-6 rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-2 text-amber-300">
              <FileText size={18} />
              <p className="font-semibold">Detected Portfolio Skills</p>
            </div>

            <p className="neo-text text-sm leading-6">
              React.js, JavaScript, Node.js, MongoDB, UI/UX, Git, Tailwind CSS
            </p>
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">
            Employer Job Description
          </h2>

          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste job description here..."
            className="neo-input h-72 w-full resize-none rounded-2xl p-5 text-sm leading-6"
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setJobDesc(sampleJD)}
              className="neo-secondary rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Use Sample JD
            </button>

            <button
              onClick={handleAnalyze}
              className="neo-primary flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <WandSparkles size={18} />
              Analyze Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}