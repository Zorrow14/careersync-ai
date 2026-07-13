---
type: architecture
status: active
updated: 2026-07-13
tags: [project, architecture, stack]
sources:
  - package.json
  - client/package.json
  - server/package.json
  - client/src/lib/mock-ai.js
---

# Actual tech stack

## Active demo runtime

- React 19 with React DOM.
- Vite 8 development server and build.
- React Router 7 for client-side routes and protected role routes.
- Tailwind CSS v4 through the Vite plugin, plus project CSS tokens in `client/src/index.css` and `App.css`.
- Framer Motion for landing animations and Lucide React for icons.
- Browser `localStorage` for demo auth session, candidate persona selection, theme, and profile edits.
- Local ES module data under `client/src/data/` and local simulated AI under `client/src/lib/mock-ai.js`.

## Optional scaffold, not active in the demo

The root scripts can run the client and server separately. `server/` contains Node.js + Express, CORS, dotenv, JWT/bcrypt/Firebase-related auth scaffolding, Mongoose-oriented model files, multer/pdf-parse, and Groq/Azure OpenAI service dependencies. The frontend does not call it in the current hackathon build.

## Runtime conventions

- Run `npm run dev:client` from the root or `npm run dev` inside `client/`.
- Build with `npm run build:client`.
- Lint the active client with `npm run lint:client`.
- Use demo query parameters `?demo=candidate`, `?demo=employer`, or `?demo=university`.
- Keep mock return shapes stable if replacing `mock-ai.js` with API calls later.
