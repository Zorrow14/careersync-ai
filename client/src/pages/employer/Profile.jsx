import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Globe, MapPin, Users, Briefcase, Pencil, X, Camera } from "lucide-react";
import { companyProfile, employerJobs } from "../../data/employerData.js";
import { getEmployerApplicationStats } from "../../data/employerApplications.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";

export default function EmployerProfile() {
  const [profile, setProfile] = useState(() => ({ ...companyProfile }));
  const [draft, setDraft] = useState(() => ({ ...companyProfile }));
  const [editing, setEditing] = useState(false);
  const applicationStats = getEmployerApplicationStats();
  const activeJobs = employerJobs.filter((job) => job.status === "Active").length;

  function openEditor() {
    setDraft({ ...profile });
    setEditing(true);
  }

  function saveProfile(event) {
    event.preventDefault();
    Object.assign(companyProfile, draft);
    setProfile({ ...draft });
    setEditing(false);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Company Account"
        title="Company Profile"
        description="Manage the employer identity candidates see across CareerSync AI."
        actions={
          <button
            type="button"
            onClick={openEditor}
            className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <Pencil size={15} />
            Edit Profile
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="neo-card rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <ProfileAvatar
              photoUrl={profile.profileImageUrl}
              initials="TN"
              size="xl"
              alt={`${companyProfile.name} logo`}
              className="rounded-2xl"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-amber-300">Employer account</p>
              <h2 className="neo-title mt-1 text-2xl font-bold">{profile.name}</h2>
              <p className="neo-text mt-2 leading-6">{profile.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <span className="neo-muted flex items-center gap-2">
                  <Building2 size={15} />
                  {profile.industry}
                </span>
                <span className="neo-muted flex items-center gap-2">
                  <MapPin size={15} />
                  {profile.location}
                </span>
                <span className="neo-muted flex items-center gap-2">
                  <Users size={15} />
                  {profile.size}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ProfileMetric label="Active positions" value={activeJobs} />
            <ProfileMetric label="Applications" value={applicationStats.total} />
            <ProfileMetric label="Founded" value={profile.founded} />
          </div>
        </section>

        <aside className="neo-card rounded-2xl p-6">
          <h2 className="neo-title text-lg font-bold">Company details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="neo-muted">Industry</dt>
              <dd className="neo-text mt-1 font-medium">{profile.industry}</dd>
            </div>
            <div>
              <dt className="neo-muted">Company size</dt>
              <dd className="neo-text mt-1 font-medium">{profile.size}</dd>
            </div>
            <div>
              <dt className="neo-muted">Location</dt>
              <dd className="neo-text mt-1 font-medium">{profile.location}</dd>
            </div>
            <div>
              <dt className="neo-muted">Website</dt>
              <dd className="mt-1">
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-medium text-amber-300 hover:text-amber-200"
                >
                  <Globe size={14} />
                  Visit website
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <section className="neo-card mt-6 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="neo-title text-lg font-bold">Manage your hiring presence</h2>
            <p className="neo-muted mt-1 text-sm">Keep jobs and candidate communication up to date.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/employer/jobs" className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
              <Briefcase size={15} />
              Manage jobs
            </Link>
            <Link to="/employer/feed" className="neo-primary rounded-xl px-4 py-2.5 text-sm font-semibold">
              Open company feed
            </Link>
          </div>
        </div>
      </section>

      {editing && (
        <EditEmployerProfileModal
          draft={draft}
          setDraft={setDraft}
          onClose={() => setEditing(false)}
          onSave={saveProfile}
        />
      )}
    </div>
  );
}

function ProfileMetric({ label, value }) {
  return (
    <div className="neo-soft rounded-xl p-4">
      <p className="neo-title text-2xl font-bold">{value}</p>
      <p className="neo-muted mt-1 text-xs">{label}</p>
    </div>
  );
}

function EditEmployerProfileModal({ draft, setDraft, onClose, onSave }) {
  const [photoError, setPhotoError] = useState("");

  function updateField(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField("profileImageUrl", reader.result);
      setPhotoError("");
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-employer-profile-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close edit profile"
        onClick={onClose}
      />
      <form
        onSubmit={onSave}
        className="neo-card relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl p-6 sm:rounded-2xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-amber-300">Company Account</p>
            <h2 id="edit-employer-profile-title" className="neo-title text-xl font-bold">
              Edit Profile
            </h2>
            <p className="neo-muted mt-1 text-sm">Update the company details shown to candidates.</p>
          </div>
          <button type="button" onClick={onClose} className="neo-nav-icon-btn cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="neo-soft mb-6 flex items-center gap-4 rounded-2xl p-4">
          <ProfileAvatar
            photoUrl={draft.profileImageUrl}
            initials="TN"
            size="lg"
            alt={`${draft.name} logo`}
            className="rounded-2xl"
          />
          <div>
            <p className="neo-title font-semibold">{draft.name}</p>
            <label className="neo-secondary mt-2 inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
              <Camera size={14} />
              Change image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={handlePhotoChange}
              />
            </label>
            {photoError && <p className="mt-1 text-[11px] text-rose-400">{photoError}</p>}
            <p className="neo-muted mt-1 text-[11px]">Images must be 2 MB or smaller.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileField label="Company name" value={draft.name} onChange={(value) => updateField("name", value)} />
          <ProfileField label="Industry" value={draft.industry} onChange={(value) => updateField("industry", value)} />
          <ProfileField label="Company size" value={draft.size} onChange={(value) => updateField("size", value)} />
          <ProfileField label="Location" value={draft.location} onChange={(value) => updateField("location", value)} />
          <ProfileField
            label="Tagline"
            value={draft.tagline}
            onChange={(value) => updateField("tagline", value)}
            className="sm:col-span-2"
          />
          <ProfileField
            label="Website"
            type="url"
            value={draft.website}
            onChange={(value) => updateField("website", value)}
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="neo-secondary rounded-xl px-4 py-2.5 text-sm font-semibold">
            Cancel
          </button>
          <button type="submit" className="neo-primary rounded-xl px-4 py-2.5 text-sm font-semibold">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

function ProfileField({ label, type = "text", value, onChange, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="neo-label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="neo-input mt-1 w-full rounded-xl px-4 py-2.5 text-sm"
      />
    </label>
  );
}
