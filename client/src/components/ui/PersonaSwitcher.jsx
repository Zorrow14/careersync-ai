import { usePersona } from "../../context/PersonaContext.jsx";

export default function PersonaSwitcher() {
  const { personaId, personas, switchPersona } = usePersona();

  return (
    <div className="space-y-1">
      <p className="neo-muted mb-2 text-xs font-semibold uppercase tracking-wider">
        Demo Persona
      </p>
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => switchPersona(p.id)}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
            personaId === p.id
              ? "bg-amber-500/15 text-amber-300"
              : "neo-text hover:bg-white/5"
          }`}
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              personaId === p.id
                ? "bg-amber-500 text-slate-950"
                : "neo-soft neo-muted"
            }`}
          >
            {p.avatar}
          </span>
          <span className="truncate">
            <span className="block text-sm font-medium leading-tight">{p.name}</span>
            <span className="neo-muted block text-xs leading-tight">{p.targetRole}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
