import { createContext, useContext } from "react";
import { demoPersona, DEMO_PERSONA_ID } from "../data/personas.js";
import { userProfiles } from "../data/userProfile.js";

const PersonaContext = createContext(null);

export function PersonaProvider({ children }) {
  const value = {
    personaId: DEMO_PERSONA_ID,
    persona: demoPersona,
    profile: userProfiles[DEMO_PERSONA_ID],
  };

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside PersonaProvider");
  return ctx;
}
