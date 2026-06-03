export default function SkillBadge({ children, type = "match" }) {
  const style = type === "match" ? "neo-badge-match" : "neo-badge-missing";

  return (
    <span className={`rounded-full px-4 py-2 text-sm font-semibold ${style}`}>
      {children}
    </span>
  );
}