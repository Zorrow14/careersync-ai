import { useEffect, useRef, useState } from "react";
import { X, Pencil, Loader2, Camera } from "lucide-react";
import { buildEditFormState, formStateToProfilePatch } from "../../lib/profileEdits.js";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;

function Field({ label, children, hint, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="neo-label">{label}</span>
      {children}
      {hint && <span className="neo-muted mt-1 block text-xs">{hint}</span>}
    </label>
  );
}

export default function EditProfileModal({ open, profile, onClose, onSave }) {
  const photoInputRef = useRef(null);
  const [form, setForm] = useState(() => buildEditFormState(profile));
  const [saving, setSaving] = useState(false);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(buildEditFormState(profile));
      setPhotoError("");
    }
  }, [open, profile]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file (JPG, PNG, or WebP).");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError("Image must be 2 MB or smaller.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField("photoUrl", reader.result);
      setPhotoError("");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    window.setTimeout(() => {
      onSave(formStateToProfilePatch(form));
      setSaving(false);
      onClose();
    }, 600);
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close edit profile"
        onClick={onClose}
      />
      <div
        className="neo-card relative flex max-h-[min(92dvh,100%)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-amber-300">Living Profile</p>
            <h2 id="edit-profile-title" className="neo-title text-xl font-bold">
              Edit Profile
            </h2>
            <p className="neo-muted mt-1 text-sm">Updates apply to your demo portfolio instantly.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="neo-nav-icon-btn shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          className="neo-scroll-hidden min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6"
        >
          <div className="neo-soft mb-6 flex flex-col items-center gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
            <ProfileAvatar
              photoUrl={form.photoUrl}
              initials={profile.avatar}
              size="xl"
              alt={profile.name}
            />
            <div className="text-center sm:text-left">
              <p className="neo-title font-semibold">{profile.name}</p>
              <p className="neo-muted text-sm">Update how employers see you on CareerSync.</p>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="neo-secondary mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              >
                <Camera size={16} aria-hidden="true" />
                Change Photo
              </button>
              {photoError && (
                <p className="mt-2 text-xs text-rose-400">{photoError}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tagline" className="sm:col-span-2">
              <input
                value={form.tagline}
                onChange={(e) => updateField("tagline", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="Frontend Developer crafting delightful UX"
              />
            </Field>

            <Field label="About" className="sm:col-span-2" hint="Short bio shown on your profile header">
              <textarea
                value={form.about}
                onChange={(e) => updateField("about", e.target.value)}
                rows={4}
                className="neo-input mt-1 w-full resize-none rounded-xl px-4 py-2.5 text-sm leading-6"
                placeholder="Tell employers about your background and goals"
              />
            </Field>

            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="Kuala Lumpur, Malaysia"
              />
            </Field>

            <Field label="Languages" hint="Separate with commas">
              <input
                value={form.languages}
                onChange={(e) => updateField("languages", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="English, Malay, Mandarin"
              />
            </Field>

            <Field label="Skills" hint="Separate with commas">
              <input
                value={form.skills}
                onChange={(e) => updateField("skills", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="React.js, JavaScript, Git"
              />
            </Field>

            <Field label="Career Interests" hint="Separate with commas">
              <input
                value={form.careerInterests}
                onChange={(e) => updateField("careerInterests", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="Frontend Developer, UI Engineer"
              />
            </Field>

            <Field label="GitHub URL">
              <input
                value={form.githubLink}
                onChange={(e) => updateField("githubLink", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="https://github.com/username"
              />
            </Field>

            <Field label="Portfolio URL">
              <input
                value={form.portfolioLink}
                onChange={(e) => updateField("portfolioLink", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="https://yourportfolio.dev"
              />
            </Field>
          </div>

          <p className="neo-muted mb-3 mt-6 text-[11px] font-semibold uppercase tracking-wider">
            Career Preferences
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Target Role">
              <input
                value={form.targetRole}
                onChange={(e) => updateField("targetRole", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              />
            </Field>
            <Field label="Industry">
              <input
                value={form.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              />
            </Field>
            <Field label="Work Mode">
              <input
                value={form.workMode}
                onChange={(e) => updateField("workMode", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="Hybrid, Remote, On-site"
              />
            </Field>
            <Field label="Preferred Location">
              <input
                value={form.prefLocation}
                onChange={(e) => updateField("prefLocation", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
              />
            </Field>
            <Field label="Salary Range" className="sm:col-span-2">
              <input
                value={form.salaryRange}
                onChange={(e) => updateField("salaryRange", e.target.value)}
                className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
                placeholder="RM 2,000 – 3,000 / month"
              />
            </Field>
          </div>
        </form>

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-white/10 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="neo-secondary w-full cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className="neo-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-70 sm:w-auto"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <Pencil size={16} aria-hidden="true" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
