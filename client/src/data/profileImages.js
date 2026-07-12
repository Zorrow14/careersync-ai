const personaPhotoUrls = {
  "Sarah Tan":
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=face",
  "Jason Lim":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face",
  "Aina Rahman":
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&crop=face",
};

export function getCandidatePhotoUrl(name, seed = 1) {
  if (personaPhotoUrls[name]) return personaPhotoUrls[name];

  const imageId = (Math.abs(seed) % 70) + 1;
  return `https://i.pravatar.cc/256?img=${imageId}`;
}

export function getCompanyProfileImage(name) {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundColor=f59e0b&textColor=0f172a&fontWeight=700`;
}
