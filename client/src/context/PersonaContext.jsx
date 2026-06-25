import { createContext, useContext, useState } from "react";
import { personas, DEFAULT_PERSONA } from "../data/personas.js";
import { userProfiles } from "../data/userProfile.js";

const PersonaContext = createContext(null);

const STORAGE_KEY = "careersync_persona";

export function PersonaProvider({ children }) {
  const [personaId, setPersonaId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_PERSONA;
    } catch {
      return DEFAULT_PERSONA;
    }
  });

  function switchPersona(id) {
    setPersonaId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }

  const persona = personas.find((p) => p.id === personaId) || personas[0];
  const profile = userProfiles[personaId] || userProfiles[DEFAULT_PERSONA];

  return (
    <PersonaContext.Provider value={{ personaId, persona, profile, personas, switchPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside PersonaProvider");
  return ctx;
}
