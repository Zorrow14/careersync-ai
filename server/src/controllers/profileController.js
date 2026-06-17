import Profile from "../models/Profile.js";

// GET /api/profile/me
// Returns the authenticated user's profile.
// If no profile exists yet returns 404 so the frontend can show the setup form.
export async function getMyProfile(req, res) {
  try {
    const profile = await Profile.findOne({ firebaseUid: req.firebaseUid });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    return res.status(200).json(profile);
  } catch (err) {
    console.error("getMyProfile error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
}

// POST /api/profile
// Creates a new profile for the authenticated user.
// Returns 409 if a profile already exists (use PUT to update).
export async function createProfile(req, res) {
  try {
    const existing = await Profile.findOne({ firebaseUid: req.firebaseUid });
    if (existing) {
      return res.status(409).json({ message: "Profile already exists. Use PUT to update." });
    }

    const profile = await Profile.create({
      firebaseUid: req.firebaseUid,
      ...sanitizeProfileBody(req.body),
    });

    return res.status(201).json(profile);
  } catch (err) {
    console.error("createProfile error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
}

// PUT /api/profile/me
// Updates the authenticated user's existing profile.
// Creates one if it does not exist yet (upsert).
export async function updateProfile(req, res) {
  try {
    const profile = await Profile.findOneAndUpdate(
      { firebaseUid: req.firebaseUid },
      { $set: sanitizeProfileBody(req.body) },
      { new: true, upsert: true, runValidators: true }
    );
    return res.status(200).json(profile);
  } catch (err) {
    console.error("updateProfile error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
}

// Whitelist allowed profile fields from the request body.
// Prevents firebaseUid from being overwritten via the request.
function sanitizeProfileBody(body) {
  const {
    education,
    careerInterests,
    skills,
    projects,
    certifications,
    githubLink,
    portfolioLink,
    resumeText,
    experience,
    institution,
    optInForEmployerMatching,
  } = body;

  return {
    ...(education !== undefined && { education }),
    ...(careerInterests !== undefined && { careerInterests }),
    ...(skills !== undefined && { skills }),
    ...(projects !== undefined && { projects }),
    ...(certifications !== undefined && { certifications }),
    ...(githubLink !== undefined && { githubLink }),
    ...(portfolioLink !== undefined && { portfolioLink }),
    ...(resumeText !== undefined && { resumeText }),
    ...(experience !== undefined && { experience }),
    ...(institution !== undefined && { institution }),
    ...(optInForEmployerMatching !== undefined && { optInForEmployerMatching }),
  };
}
