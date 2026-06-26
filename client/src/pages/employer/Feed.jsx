import { useEffect, useMemo, useState } from "react";
import {
  Send,
  Megaphone,
  Sparkles,
  Tag,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { companyProfile } from "../../data/employerData.js";
import CompanyPostCard from "../../components/feed/CompanyPostCard.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";
import {
  createCompanyPost,
  getAllCompanyPosts,
  getTrendingTags,
  saveCompanyFeed,
} from "../../data/companyFeedData.js";

const postTypeOptions = [
  { value: "announcement", label: "Announcement", description: "Hiring news and openings" },
  { value: "culture", label: "Culture", description: "Team life and workplace stories" },
  { value: "event", label: "Event", description: "Workshops, talks, and meetups" },
  { value: "milestone", label: "Milestone", description: "Funding, growth, and wins" },
];

const initialComposer = {
  type: "announcement",
  title: "",
  content: "",
  tags: "hiring, internship, react",
};

export default function Feed() {
  const [feedPosts, setFeedPosts] = useState(() => getAllCompanyPosts());
  const [liked, setLiked] = useState({});
  const [composer, setComposer] = useState(initialComposer);
  const [toast, setToast] = useState(null);

  const companyPosts = useMemo(
    () => feedPosts.filter((post) => post.companyId === "c1"),
    [feedPosts]
  );
  const trendingTags = useMemo(() => getTrendingTags(feedPosts, 8), [feedPosts]);

  useEffect(() => {
    saveCompanyFeed(feedPosts);
  }, [feedPosts]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  function toggleLike(id) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handlePublish(event) {
    event.preventDefault();

    const title = composer.title.trim();
    const content = composer.content.trim();
    if (!title || !content) return;

    const tags = composer.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 6);

    const nextPost = createCompanyPost({
      companyId: "c1",
      companyName: companyProfile.name,
      companyLogo: "TN",
      type: composer.type,
      author: "TechNova HR",
      avatar: "TN",
      title,
      content,
      tags: tags.length ? tags : ["hiring"],
    });

    setFeedPosts((prev) => [nextPost, ...prev]);
    setComposer(initialComposer);
    setToast("Post published to the company feed");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Company Feed"
        title="Culture & Updates"
        description={`Latest posts, events, and milestones from ${companyProfile.name}.`}
      />

      {toast && (
        <div className="neo-pipeline-toast mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium">
          <CheckCircle2 size={16} className="text-emerald-300" aria-hidden="true" />
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.3fr)_320px]">
        <div className="space-y-6">
          <div className="neo-card rounded-2xl p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="neo-eyebrow">Create post</p>
                <h2 className="neo-title text-2xl font-bold">Share an update with candidates</h2>
                <p className="neo-muted mt-2 text-sm leading-6">
                  Publish hiring announcements, culture stories, or milestone updates. The post will
                  appear in the candidate Company Feed immediately.
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
                <Megaphone size={20} aria-hidden="true" />
              </div>
            </div>

            <form onSubmit={handlePublish} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <label htmlFor="post-title" className="neo-label">
                    Post title
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    value={composer.title}
                    onChange={(e) => setComposer((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Frontend Developer Internship now open"
                    className="neo-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <DropdownSelect
                  label="Post type"
                  value={composer.type}
                  options={postTypeOptions}
                  onChange={(nextType) => setComposer((prev) => ({ ...prev, type: nextType }))}
                  helperText="Pick the post category"
                />
              </div>

              <div>
                <label htmlFor="post-content" className="neo-label">
                  Post content
                </label>
                <textarea
                  id="post-content"
                  rows={5}
                  value={composer.content}
                  onChange={(e) => setComposer((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Describe what’s new, why it matters, and what candidates should know..."
                  className="neo-input w-full resize-none rounded-xl px-4 py-3 text-sm leading-6"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                <div>
                  <label htmlFor="post-tags" className="neo-label">
                    Tags
                  </label>
                  <input
                    id="post-tags"
                    type="text"
                    value={composer.tags}
                    onChange={(e) => setComposer((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="hiring, react, internship"
                    className="neo-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                  <p className="neo-muted mt-2 text-xs">
                    Use comma-separated tags to improve discovery in the candidate feed.
                  </p>
                </div>

                <div className="neo-soft rounded-xl p-4">
                  <p className="neo-muted text-[11px] font-semibold uppercase tracking-wider">
                    Publishing tips
                  </p>
                  <ul className="neo-text mt-3 space-y-2 text-xs leading-6">
                    <li>Lead with the outcome or opportunity.</li>
                    <li>Keep it under 2 short paragraphs.</li>
                    <li>Use tags that students would actually search.</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="neo-muted text-xs">
                  Posts are shared with candidates across the Company Feed.
                </p>
                <button
                  type="submit"
                  disabled={!composer.title.trim() || !composer.content.trim()}
                  className="neo-primary flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:opacity-60"
                >
                  <Send size={16} />
                  Publish post
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {companyPosts.map((post) => (
              <CompanyPostCard
                key={post.id}
                post={post}
                liked={liked[post.id]}
                onToggleLike={toggleLike}
                showCompany={false}
              />
            ))}

            {companyPosts.length === 0 && (
              <EmptyState
                icon={Sparkles}
                title="No posts yet"
                description="Publish your first update above and it will appear here along with the candidate feed."
              />
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-lg font-bold text-slate-950">
                TN
              </div>
              <div>
                <h3 className="neo-title font-bold">{companyProfile.name}</h3>
                <p className="neo-muted text-xs">{companyProfile.tagline}</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Industry", companyProfile.industry],
                ["Size", companyProfile.size],
                ["Location", companyProfile.location],
                ["Founded", companyProfile.founded],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="neo-muted">{label}</span>
                  <span className="neo-text font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-4 font-bold">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <span key={tag} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center gap-2">
              <Tag size={16} className="text-amber-300" />
              <h3 className="neo-title font-bold">Feed strategy</h3>
            </div>
            <p className="neo-text text-sm leading-7">
              Candidate engagement improves when employers share concrete updates, not just jobs.
              Mix hiring posts with culture stories and team milestones to keep the feed useful.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
