import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Newspaper, Filter, Building2, RotateCcw } from "lucide-react";
import CompanyPostCard from "../../components/feed/CompanyPostCard.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";
import {
  getAllCompanyPosts,
  getFeedCompanies,
  getTrendingTags,
} from "../../data/companyFeedData.js";

const postTypeOptions = [
  { value: "all", label: "All post types", description: "Show every company update" },
  { value: "announcement", label: "Announcement", description: "Hiring news and openings" },
  { value: "culture", label: "Culture", description: "Team life and workplace stories" },
  { value: "event", label: "Event", description: "Workshops, talks, and meetups" },
  { value: "milestone", label: "Milestone", description: "Funding, growth, and wins" },
];

export default function CompanyFeed() {
  const [liked, setLiked] = useState({});
  const [companyFilter, setCompanyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [feedPosts] = useState(() => getAllCompanyPosts());

  const companies = useMemo(() => getFeedCompanies(feedPosts), [feedPosts]);
  const trendingTags = useMemo(() => getTrendingTags(feedPosts, 8), [feedPosts]);
  const companyOptions = useMemo(
    () => [
      { value: "all", label: "All companies", description: "Show every employer in the feed" },
      ...companies.map((c) => ({
        value: c.id,
        label: c.name,
        description: "Employer updates and company posts",
      })),
    ],
    [companies]
  );

  const filteredPosts = useMemo(() => {
    return feedPosts.filter((post) => {
      const matchesCompany = companyFilter === "all" || post.companyId === companyFilter;
      const matchesType = typeFilter === "all" || post.type === typeFilter;
      return matchesCompany && matchesType;
    });
  }, [companyFilter, feedPosts, typeFilter]);

  function toggleLike(id) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function clearFilters() {
    setCompanyFilter("all");
    setTypeFilter("all");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Company Feed"
        description="See what employers are sharing — hiring news, culture stories, events, and milestones — so you know which companies are active before you apply."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="neo-card rounded-2xl p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Filter size={16} className="text-amber-300" />
              <span className="neo-title text-sm font-semibold">Filter posts</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <DropdownSelect
                label="Company"
                value={companyFilter}
                options={companyOptions}
                onChange={setCompanyFilter}
                helperText="Filter updates by employer"
              />
              <DropdownSelect
                label="Post type"
                value={typeFilter}
                options={postTypeOptions}
                onChange={setTypeFilter}
                helperText="Narrow the feed by content type"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="neo-muted text-xs">
                {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} visible
              </p>
              {(companyFilter !== "all" || typeFilter !== "all") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="neo-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
                >
                  <RotateCcw size={12} />
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              title="No posts match your filters"
              description="Try a different company or post type to explore employer updates."
            />
          ) : (
            filteredPosts.map((post) => (
              <CompanyPostCard
                key={post.id}
                post={post}
                liked={liked[post.id]}
                onToggleLike={toggleLike}
                showCompany
              />
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Building2 size={18} className="text-amber-300" />
              <h3 className="neo-title font-bold">Active on the feed</h3>
            </div>
            <div className="space-y-3">
              {companies.map((c) => (
                <Link
                  key={c.id}
                  to={`/companies/${c.id}`}
                  className="neo-soft flex items-center gap-3 rounded-xl p-3 transition hover:bg-white/5"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-xs font-bold text-amber-300">
                    {c.logo}
                  </span>
                  <span className="neo-text text-sm font-medium">{c.name}</span>
                </Link>
              ))}
            </div>
            <Link
              to="/companies"
              className="mt-4 block text-center text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              Browse full directory →
            </Link>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-4 font-bold">Trending tags</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <span key={tag} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-2 font-bold">Why follow company posts?</h3>
            <p className="neo-text text-sm leading-7">
              Hiring announcements, team culture, and events help you understand what each employer
              is really like — beyond the job description. Use this feed to shortlist companies that
              align with your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
