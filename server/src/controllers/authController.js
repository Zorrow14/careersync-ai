import User from "../models/User.js";

// POST /api/auth/register-role
// Called immediately after Firebase registration to save name, email, and role.
export async function registerRole(req, res) {
  const { name, email, role } = req.body;
  const firebaseUid = req.firebaseUid;

  if (!name || !email || !role) {
    return res.status(400).json({ message: "name, email, and role are required." });
  }

  const allowed = ["candidate", "employer", "university"];
  if (!allowed.includes(role)) {
    return res.status(400).json({ message: "Invalid role." });
  }

  try {
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Update name/role if the user re-registers or changes role
      user.name = name;
      user.role = role;
      await user.save();
    } else {
      user = await User.create({ firebaseUid, name, email, role });
    }

    return res.status(200).json({ uid: user.firebaseUid, role: user.role });
  } catch (err) {
    console.error("registerRole error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
}

// GET /api/auth/me
// Returns the logged-in user's role and metadata.
export async function getMe(req, res) {
  try {
    const user = await User.findOne({ firebaseUid: req.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      uid: user.firebaseUid,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("getMe error:", err.message);
    return res.status(500).json({ message: "Server error." });
  }
}
