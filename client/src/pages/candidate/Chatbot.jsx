import { useState } from "react";
import { Send, Bot, Loader2 } from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { getCoachReply } from "../../lib/mock-ai.js";

export default function Chatbot() {
  const { personaId, persona } = usePersona();
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `Hi ${persona.name.split(" ")[0]}, I'm your CareerSync AI Coach. Ask me about your job match, missing skills, or career roadmap.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    const result = await getCoachReply(personaId, userMsg);

    setMessages((prev) => [...prev, { role: "ai", text: result.reply }]);
    setLoading(false);
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">AI Career Coach</p>
        <h1 className="neo-title text-4xl font-bold">Chat with CareerSync AI</h1>
        <p className="neo-text mt-2">
          AI-powered career coaching based on {persona.name}'s profile and analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title font-bold">Suggested Questions</h2>

          <div className="mt-4 space-y-3">
            {[
              "Am I ready for intern roles?",
              "What skills am I missing?",
              "How can I improve my portfolio?",
              "What should I learn next?",
            ].map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="neo-secondary w-full rounded-xl p-3 text-left text-sm"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="neo-card flex h-[620px] flex-col rounded-2xl p-6 lg:col-span-3">
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-amber-500 text-slate-950"
                      : "neo-soft neo-text"
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
                      <Bot size={16} />
                      <span>CareerSync AI</span>
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="neo-soft flex items-center gap-2 rounded-2xl p-4 text-sm text-amber-300">
                  <Loader2 size={16} className="animate-spin" />
                  Thinking…
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about your career readiness..."
              className="neo-input flex-1 rounded-xl px-5 py-4 text-sm"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="neo-primary rounded-xl px-5 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
