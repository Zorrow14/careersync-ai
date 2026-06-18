import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Upload,
  Plus,
  Trash2,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Link as LinkIcon,
  FileText,
  Target,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  getMyProfile,
  createProfile,
  updateProfile,
  uploadResume,
} from "../../services/profileService.js";

const EMPTY_EDUCATION = { institution: "", degree: "", field: "", startYear: "", endYear: "" };
const EMPTY_EXPERIENCE = { company: "", role: "", description: "", startDate: "", endDate: "" };
const EMPTY_PROJECT = { title: "", description: "", techStack: [], link: "" };
const EMPTY_CERTIFICATION = { name: "", issuer: "", year: "", link: "" };

export default function ProfileSetup() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [toast, setToast] = useState(null);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    education: [{ ...EMPTY_EDUCATION }],
    careerInterests: [],
    skills: [],
    projects: [{ ...EMPTY_PROJECT }],
    certifications: [],
    experience: [],
    githubLink: "",
    portfolioLink: "",
    institution: "",
    optInForEmployerMatching: false,
    resumeText: "",
  });

  const [interestInput, setInterestInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [techStackInputs, setTechStackInputs] = useState({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const profile = await getMyProfile();
        if (cancelled) return;
        setForm({
          education: profile.education?.length ? profile.education : [{ ...EMPTY_EDUCATION }],
          careerInterests: profile.careerInterests || [],
          skills: profile.skills || [],
          projects: profile.projects?.length ? profile.projects : [{ ...EMPTY_PROJECT }],
          certifications: profile.certifications || [],
          experience: profile.experience || [],
          githubLink: profile.githubLink || "",
          portfolioLink: profile.portfolioLink || "",
          institution: profile.institution || "",
          optInForEmployerMatching: profile.optInForEmployerMatching || false,
          resumeText: profile.resumeText || "",
        });
        setIsNew(false);
      } catch {
        // 404 → new profile, keep defaults
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // resumeText is managed only via the upload endpoint — omit it here so
      // a save never overwrites parsed resume text with an empty string.
      const { resumeText: _resume, ...payload } = form;
      if (isNew) {
        await createProfile(payload);
        setIsNew(false);
      } else {
        await updateProfile(payload);
      }
      showToast("success", "Profile saved successfully.");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to save profile.";
      showToast("error", msg);
    } finally {
      setSaving(false);
    }
  }

  async function handleResumeUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const profile = await uploadResume(file);
      setForm((prev) => ({ ...prev, resumeText: profile.resumeText }));
      setIsNew(false);
      showToast("success", "Resume parsed successfully.");
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to upload resume.";
      showToast("error", msg);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateArrayItem(field, index, key, value) {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [field]: arr };
    });
  }

  function addArrayItem(field, template) {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], { ...template }] }));
  }

  function removeArrayItem(field, index) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  function addTag(field, value, setter) {
    const trimmed = value.trim();
    if (!trimmed || form[field].includes(trimmed)) return;
    updateField(field, [...form[field], trimmed]);
    setter("");
  }

  function removeTag(field, index) {
    updateField(field, form[field].filter((_, i) => i !== index));
  }

  function addTechStack(projIndex) {
    const val = (techStackInputs[projIndex] || "").trim();
    if (!val) return;
    setForm((prev) => {
      const projects = [...prev.projects];
      const stack = [...(projects[projIndex].techStack || [])];
      if (!stack.includes(val)) stack.push(val);
      projects[projIndex] = { ...projects[projIndex], techStack: stack };
      return { ...prev, projects };
    });
    setTechStackInputs((prev) => ({ ...prev, [projIndex]: "" }));
  }

  function removeTechStack(projIndex, tagIndex) {
    setForm((prev) => {
      const projects = [...prev.projects];
      const stack = projects[projIndex].techStack.filter((_, i) => i !== tagIndex);
      projects[projIndex] = { ...projects[projIndex], techStack: stack };
      return { ...prev, projects };
    });
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-amber-400" size={36} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-16">
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed right-8 top-8 z-50 flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30"
              : "bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/30"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </motion.div>
      )}

      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">
          {isNew ? "Get Started" : "Your Portfolio"}
        </p>
        <h1 className="neo-title text-4xl font-bold">
          {isNew ? "Build Your Living Profile" : "Edit Profile"}
        </h1>
        <p className="neo-text mt-2">
          {isNew
            ? "Set up your career profile to unlock AI-powered analysis and smart matching."
            : "Keep your profile up to date for the best career insights."}
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ─── Resume Upload ─── */}
        <Section icon={FileText} title="Resume Upload">
          <p className="neo-muted mb-4 text-sm">
            Upload a PDF resume. We'll extract the text for AI analysis — the file itself is not stored.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="neo-secondary flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              {uploading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Upload size={17} />
              )}
              {uploading ? "Parsing…" : "Upload PDF"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleResumeUpload}
            />
            {form.resumeText && (
              <span className="flex items-center gap-1 text-sm text-emerald-400">
                <CheckCircle2 size={14} /> Resume text extracted
              </span>
            )}
          </div>
          {form.resumeText && (
            <div className="neo-soft mt-4 max-h-40 overflow-y-auto rounded-xl p-4">
              <p className="neo-muted whitespace-pre-wrap text-xs leading-relaxed">
                {form.resumeText.slice(0, 1500)}
                {form.resumeText.length > 1500 && "…"}
              </p>
            </div>
          )}
        </Section>

        {/* ─── Career Interests ─── */}
        <Section icon={Target} title="Career Interests">
          <TagInput
            tags={form.careerInterests}
            input={interestInput}
            setInput={setInterestInput}
            onAdd={() => addTag("careerInterests", interestInput, setInterestInput)}
            onRemove={(i) => removeTag("careerInterests", i)}
            placeholder="e.g. Frontend Developer, Data Analyst"
          />
        </Section>

        {/* ─── Skills ─── */}
        <Section icon={Award} title="Skills">
          <TagInput
            tags={form.skills}
            input={skillInput}
            setInput={setSkillInput}
            onAdd={() => addTag("skills", skillInput, setSkillInput)}
            onRemove={(i) => removeTag("skills", i)}
            placeholder="e.g. React, Python, Docker"
          />
        </Section>

        {/* ─── Education ─── */}
        <Section icon={GraduationCap} title="Education">
          {form.education.map((edu, i) => (
            <div key={i} className="neo-soft mb-4 rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-muted text-xs font-semibold uppercase tracking-wider">
                  Education {i + 1}
                </span>
                {form.education.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem("education", i)}
                    className="text-rose-400 hover:text-rose-300">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Institution" value={edu.institution}
                  onChange={(v) => updateArrayItem("education", i, "institution", v)} />
                <Input label="Degree" value={edu.degree}
                  onChange={(v) => updateArrayItem("education", i, "degree", v)} />
                <Input label="Field of Study" value={edu.field}
                  onChange={(v) => updateArrayItem("education", i, "field", v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Start Year" value={edu.startYear}
                    onChange={(v) => updateArrayItem("education", i, "startYear", v)} />
                  <Input label="End Year" value={edu.endYear}
                    onChange={(v) => updateArrayItem("education", i, "endYear", v)} />
                </div>
              </div>
            </div>
          ))}
          <AddButton label="Add Education" onClick={() => addArrayItem("education", EMPTY_EDUCATION)} />
        </Section>

        {/* ─── Experience ─── */}
        <Section icon={Briefcase} title="Experience">
          {form.experience.length === 0 && (
            <p className="neo-muted mb-3 text-sm">No experience added yet.</p>
          )}
          {form.experience.map((exp, i) => (
            <div key={i} className="neo-soft mb-4 rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-muted text-xs font-semibold uppercase tracking-wider">
                  Experience {i + 1}
                </span>
                <button type="button" onClick={() => removeArrayItem("experience", i)}
                  className="text-rose-400 hover:text-rose-300">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Company" value={exp.company}
                  onChange={(v) => updateArrayItem("experience", i, "company", v)} />
                <Input label="Role" value={exp.role}
                  onChange={(v) => updateArrayItem("experience", i, "role", v)} />
                <div className="md:col-span-2">
                  <Input label="Description" value={exp.description}
                    onChange={(v) => updateArrayItem("experience", i, "description", v)} />
                </div>
                <Input label="Start Date" value={exp.startDate}
                  onChange={(v) => updateArrayItem("experience", i, "startDate", v)} />
                <Input label="End Date" value={exp.endDate}
                  onChange={(v) => updateArrayItem("experience", i, "endDate", v)} />
              </div>
            </div>
          ))}
          <AddButton label="Add Experience" onClick={() => addArrayItem("experience", EMPTY_EXPERIENCE)} />
        </Section>

        {/* ─── Projects ─── */}
        <Section icon={FolderGit2} title="Projects">
          {form.projects.map((proj, i) => (
            <div key={i} className="neo-soft mb-4 rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-muted text-xs font-semibold uppercase tracking-wider">
                  Project {i + 1}
                </span>
                {form.projects.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem("projects", i)}
                    className="text-rose-400 hover:text-rose-300">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Title" value={proj.title}
                  onChange={(v) => updateArrayItem("projects", i, "title", v)} />
                <Input label="Link" value={proj.link}
                  onChange={(v) => updateArrayItem("projects", i, "link", v)} />
                <div className="md:col-span-2">
                  <Input label="Description" value={proj.description}
                    onChange={(v) => updateArrayItem("projects", i, "description", v)} />
                </div>
              </div>
              <div className="mt-3">
                <label className="neo-muted mb-1 block text-xs font-medium">Tech Stack</label>
                <div className="flex flex-wrap gap-2">
                  {(proj.techStack || []).map((t, ti) => (
                    <span key={ti}
                      className="neo-badge-match flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                      {t}
                      <button type="button" onClick={() => removeTechStack(i, ti)}
                        className="ml-1 hover:text-rose-400">&times;</button>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    className="neo-input w-48 rounded-lg px-3 py-2 text-sm"
                    placeholder="Add tech…"
                    value={techStackInputs[i] || ""}
                    onChange={(e) => setTechStackInputs((p) => ({ ...p, [i]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTechStack(i); } }}
                  />
                  <button type="button" onClick={() => addTechStack(i)}
                    className="neo-secondary rounded-lg px-3 py-2 text-xs font-semibold">Add</button>
                </div>
              </div>
            </div>
          ))}
          <AddButton label="Add Project" onClick={() => addArrayItem("projects", EMPTY_PROJECT)} />
        </Section>

        {/* ─── Certifications ─── */}
        <Section icon={Award} title="Certifications">
          {form.certifications.length === 0 && (
            <p className="neo-muted mb-3 text-sm">No certifications added yet.</p>
          )}
          {form.certifications.map((cert, i) => (
            <div key={i} className="neo-soft mb-4 rounded-xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="neo-muted text-xs font-semibold uppercase tracking-wider">
                  Certification {i + 1}
                </span>
                <button type="button" onClick={() => removeArrayItem("certifications", i)}
                  className="text-rose-400 hover:text-rose-300">
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Name" value={cert.name}
                  onChange={(v) => updateArrayItem("certifications", i, "name", v)} />
                <Input label="Issuer" value={cert.issuer}
                  onChange={(v) => updateArrayItem("certifications", i, "issuer", v)} />
                <Input label="Year" value={cert.year}
                  onChange={(v) => updateArrayItem("certifications", i, "year", v)} />
                <Input label="Link" value={cert.link}
                  onChange={(v) => updateArrayItem("certifications", i, "link", v)} />
              </div>
            </div>
          ))}
          <AddButton label="Add Certification" onClick={() => addArrayItem("certifications", EMPTY_CERTIFICATION)} />
        </Section>

        {/* ─── Links & Settings ─── */}
        <Section icon={LinkIcon} title="Links & Settings">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="GitHub" value={form.githubLink}
              onChange={(v) => updateField("githubLink", v)} placeholder="https://github.com/…" />
            <Input label="Portfolio" value={form.portfolioLink}
              onChange={(v) => updateField("portfolioLink", v)} placeholder="https://…" />
            <Input label="Institution" value={form.institution}
              onChange={(v) => updateField("institution", v)} placeholder="Your university" />
          </div>
          <label className="mt-5 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.optInForEmployerMatching}
              onChange={(e) => updateField("optInForEmployerMatching", e.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-amber-500 accent-amber-500"
            />
            <span className="neo-text text-sm">
              Opt in for employer smart matching
            </span>
          </label>
        </Section>

        {/* ─── Save ─── */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="neo-primary flex items-center gap-2 rounded-xl px-8 py-3 text-base font-bold"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving…" : isNew ? "Create Profile" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Reusable sub-components ─── */

function Section({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="neo-card rounded-2xl p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
          <Icon size={20} />
        </div>
        <h2 className="neo-title text-xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

function Input({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="neo-muted mb-1 block text-xs font-medium">{label}</label>
      <input
        className="neo-input w-full rounded-lg px-3 py-2.5 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function TagInput({ tags, input, setInput, onAdd, onRemove, placeholder }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i}
            className="neo-badge-match flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
            {tag}
            <button type="button" onClick={() => onRemove(i)}
              className="ml-1 hover:text-rose-400">&times;</button>
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          className="neo-input flex-1 rounded-lg px-3 py-2 text-sm"
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }}
        />
        <button type="button" onClick={onAdd}
          className="neo-secondary rounded-lg px-4 py-2 text-sm font-semibold">Add</button>
      </div>
    </>
  );
}

function AddButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/10"
    >
      <Plus size={16} /> {label}
    </button>
  );
}
