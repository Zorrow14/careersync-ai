import admin from "../config/firebaseAdmin.js";

export async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUid = decoded.uid;
    req.firebaseEmail = decoded.email;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
