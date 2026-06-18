import api from "../lib/api.js";

export async function getMyProfile() {
  const res = await api.get("/api/profile/me");
  return res.data;
}

export async function createProfile(data) {
  const res = await api.post("/api/profile", data);
  return res.data;
}

export async function updateProfile(data) {
  const res = await api.put("/api/profile/me", data);
  return res.data;
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file);
  const res = await api.post("/api/profile/resume", formData);
  return res.data;
}
