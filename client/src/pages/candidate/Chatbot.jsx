import { useState } from "react";
import { Send, Bot } from "lucide-react";

const initialMessages = [
  {
    role: "ai",
    text: "Hi, I’m your CareerSync AI Coach. Ask me about your job match, missing skills, or career roadmap.",
  },
];

const mockReplies = [
  "Based on your current profile, you are strongest in frontend development. Your next priority should be Docker, testing, and deployment.",
  "For a Frontend Developer Internship, your React.js and UI skills are strong. Improving CI/CD and cloud deployment will make you more competitive.",
  "I recommend building one full-stack React + Node.js project with authentication, database, deployment, and clear documentation.",
];

export default function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: reply },
    ]);

    setInput("");
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">AI Career Coach</p>
        <h1 className="neo-title text-4xl font-bold">
          Chat with CareerSync AI
        </h1>
        <p className="neo-text mt-2">
          Prototype chatbot using mock AI responses. Groq API can be connected
          later.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title font-bold">Suggested Questions</h2>

          <div className="mt-4 space-y-3">
            {[
              "Am I suitable for frontend roles?",
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
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
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
              className="neo-primary rounded-xl px-5"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}