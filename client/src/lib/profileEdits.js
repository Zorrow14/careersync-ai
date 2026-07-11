const PROFILE_EDITS_KEY = "careersync_profile_edits";

export function readProfileEdits() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_EDITS_KEY) || "{}");
  } catch {
    return {};
  }
}

export function mergeProfileEdits(base, edits) {
  if (!edits) return base;

  return {
    ...base,
    ...edits,
    languages: edits.languages ?? base.languages,
    skills: edits.skills ?? base.skills,
    careerInterests: edits.careerInterests ?? base.careerInterests,
    preferences: edits.preferences
      ? { ...base.preferences, ...edits.preferences }
      : base.preferences,
  };
}

export function getMergedProfile(personaId, baseProfile) {
  const edits = readProfileEdits()[personaId];
  return mergeProfileEdits(baseProfile, edits);
}

export function saveProfileEdits(personaId, patch) {
  const all = readProfileEdits();
  const current = all[personaId] || {};

  all[personaId] = {
    ...current,
    ...patch,
    preferences: patch.preferences
      ? { ...(current.preferences || {}), ...patch.preferences }
      : current.preferences,
  };

  localStorage.setItem(PROFILE_EDITS_KEY, JSON.stringify(all));
  return all[personaId];
}

export function buildEditFormState(profile) {
  return {
    photoUrl: profile.photoUrl || "",
    tagline: profile.tagline || "",
    about: profile.about || "",
    location: profile.location || "",
    languages: (profile.languages || []).join(", "),
    skills: (profile.skills || []).join(", "),
    careerInterests: (profile.careerInterests || []).join(", "),
    githubLink: profile.githubLink || "",
    portfolioLink: profile.portfolioLink || "",
    targetRole: profile.preferences?.role || profile.targetRole || "",
    industry: profile.preferences?.industry || "",
    workMode: profile.preferences?.workMode || "",
    prefLocation: profile.preferences?.location || "",
    salaryRange: profile.preferences?.salaryRange || "",
  };
}

export function formStateToProfilePatch(form) {
  const splitList = (value) =>
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  return {
    photoUrl: form.photoUrl || undefined,
    tagline: form.tagline.trim(),
    about: form.about.trim(),
    location: form.location.trim(),
    languages: splitList(form.languages),
    skills: splitList(form.skills),
    careerInterests: splitList(form.careerInterests),
    githubLink: form.githubLink.trim(),
    portfolioLink: form.portfolioLink.trim(),
    preferences: {
      role: form.targetRole.trim(),
      industry: form.industry.trim(),
      workMode: form.workMode.trim(),
      location: form.prefLocation.trim(),
      salaryRange: form.salaryRange.trim(),
    },
  };
}
