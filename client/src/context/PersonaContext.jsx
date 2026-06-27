import { createContext, useContext, useMemo, useState } from "react";
import { personas, DEFAULT_PERSONA } from "../data/personas.js";
import { userProfiles } from "../data/userProfile.js";
import { getMergedProfile, saveProfileEdits } from "../lib/profileEdits.js";

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
  const [profileVersion, setProfileVersion] = useState(0);

  function switchPersona(id) {
    setPersonaId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  function updateProfile(patch) {
    saveProfileEdits(personaId, patch);
    setProfileVersion((v) => v + 1);
  }

  const persona = personas.find((p) => p.id === personaId) || personas[0];
  const profile = useMemo(() => {
    const base = userProfiles[personaId] || userProfiles[DEFAULT_PERSONA];
    return getMergedProfile(personaId, base);
  }, [personaId, profileVersion]);

  return (
    <PersonaContext.Provider
      value={{ personaId, persona, profile, personas, switchPersona, updateProfile }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside PersonaProvider");
  return ctx;
}
