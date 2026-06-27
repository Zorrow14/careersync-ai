import { Check, Circle, Sparkles } from "lucide-react";
import { getBranchProgress } from "../../data/roadmapData.js";

function nodeState(id, completed) {
  return completed.has(id) ? "done" : "todo";
}

function RoadmapNode({ id, label, variant = "skill", state, selected, onSelect, onToggle }) {
  const isDone = state === "done";

  return (
    <div className="roadmap-sh__node-wrap">
      <div
        className={`roadmap-sh__node roadmap-sh__node--${variant} ${
          isDone ? "roadmap-sh__node--done" : ""
        } ${selected ? "roadmap-sh__node--selected" : ""}`}
      >
        <button
          type="button"
          onClick={() => onSelect(id)}
          aria-pressed={selected}
          className="roadmap-sh__node-main"
        >
          <span className="roadmap-sh__node-label">{label}</span>
        </button>
        {variant !== "root" && (
          <button
            type="button"
            aria-label={isDone ? `Mark ${label} incomplete` : `Mark ${label} complete`}
            aria-pressed={isDone}
            onClick={() => onToggle(id)}
            className={`roadmap-sh__check ${isDone ? "roadmap-sh__check--done" : ""}`}
          >
            {isDone ? <Check size={12} strokeWidth={3} /> : <Circle size={10} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default function RoadmapGraph({ graph, completed, selectedId, onSelect, onToggle }) {
  const { rootLabel, branches } = graph;

  return (
    <div className="roadmap-sh roadmap-sh--clean">
      <div className="roadmap-sh__canvas">
        <div className="roadmap-sh__level roadmap-sh__level--root">
          <RoadmapNode
            id="root"
            label={rootLabel}
            variant="root"
            state={nodeState("root", completed)}
            selected={selectedId === "root"}
            onSelect={onSelect}
            onToggle={onToggle}
          />
        </div>

        <div className="roadmap-sh__spine" aria-hidden="true">
          <div className="roadmap-sh__spine-line" />
        </div>

        {branches.map((branch, branchIndex) => {
          const { percent } = getBranchProgress(branch, completed);
          const isActive =
            selectedId === branch.id ||
            branch.skills?.some((s) => selectedId === `${branch.id}:${s}`);

          return (
            <div
              key={branch.id}
              className={`roadmap-sh__step ${isActive ? "roadmap-sh__step--active" : ""}`}
            >
              <p className="roadmap-sh__step-label">
                Phase {branch.index} · {branch.phase}
                <span className="roadmap-sh__step-progress">{percent}%</span>
              </p>

              <RoadmapNode
                id={branch.id}
                label={branch.milestone}
                variant="milestone"
                state={nodeState(branch.id, completed)}
                selected={selectedId === branch.id}
                onSelect={onSelect}
                onToggle={onToggle}
              />

              {branch.skills?.length > 0 && (
                <>
                  <div className="roadmap-sh__fork" aria-hidden="true">
                    <div className="roadmap-sh__fork-line" />
                  </div>
                  <div className="roadmap-sh__skill-row">
                    {branch.skills.map((skill) => {
                      const skillId = `${branch.id}:${skill}`;
                      return (
                        <RoadmapNode
                          key={skillId}
                          id={skillId}
                          label={skill}
                          variant="skill"
                          state={nodeState(skillId, completed)}
                          selected={selectedId === skillId}
                          onSelect={onSelect}
                          onToggle={onToggle}
                        />
                      );
                    })}
                  </div>
                </>
              )}

              {branchIndex < branches.length - 1 && (
                <div className="roadmap-sh__spine roadmap-sh__spine--between" aria-hidden="true">
                  <div className="roadmap-sh__spine-line" />
                </div>
              )}
            </div>
          );
        })}

        <div className="roadmap-sh__finish">
          <div className="roadmap-sh__spine-line roadmap-sh__spine-line--short" aria-hidden="true" />
          <div className="roadmap-sh__finish-badge">
            <Sparkles size={15} />
            <span>Role ready</span>
          </div>
        </div>
      </div>

      <p className="roadmap-sh__hint">Click a topic for details · Use the checkmark to track progress</p>
    </div>
  );
}
