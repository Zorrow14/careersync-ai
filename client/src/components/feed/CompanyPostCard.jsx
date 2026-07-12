import { Link } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Megaphone,
  PartyPopper,
  Users,
  Trophy,
  Building2,
  Briefcase,
} from "lucide-react";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";
import { getCompanyProfileImage } from "../../data/profileImages.js";

const typeIcons = {
  announcement: Megaphone,
  culture: Users,
  event: PartyPopper,
  milestone: Trophy,
};

const typeColors = {
  announcement: "bg-blue-500/15 text-blue-300",
  culture: "bg-purple-500/15 text-purple-300",
  event: "bg-emerald-500/15 text-emerald-300",
  milestone: "bg-amber-500/15 text-amber-300",
};

export default function CompanyPostCard({
  post,
  liked,
  onToggleLike,
  showCompany = true,
}) {
  const TypeIcon = typeIcons[post.type] || Building2;

  return (
    <article className="neo-card rounded-2xl p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {showCompany ? (
            <Link
              to={`/companies/${post.companyId}`}
              className="transition hover:opacity-90"
            >
              <ProfileAvatar
                photoUrl={getCompanyProfileImage(post.companyName)}
                initials={post.companyLogo}
                size="sm"
                alt={`${post.companyName} logo`}
              />
            </Link>
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
              {post.avatar}
            </span>
          )}
          <div className="min-w-0">
            {showCompany ? (
              <>
                <Link
                  to={`/companies/${post.companyId}`}
                  className="neo-title block truncate text-sm font-semibold hover:text-amber-300"
                >
                  {post.companyName}
                </Link>
                <p className="neo-muted text-sm">{post.author}</p>
              </>
            ) : (
              <p className="neo-title text-sm font-semibold">{post.author}</p>
            )}
            <p className="neo-muted text-xs">{post.date}</p>
          </div>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeColors[post.type]}`}
        >
          <TypeIcon size={13} />
          {post.type}
        </span>
      </div>

      <h3 className="neo-title mb-2 text-lg font-bold">{post.title}</h3>
      <p className="neo-text text-sm leading-7">{post.content}</p>

      {post.jobId && (
        <Link
          to={`/jobs/${post.jobId}`}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
        >
          <Briefcase size={15} />
          View open role
        </Link>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="neo-soft neo-muted rounded-full px-3 py-1 text-xs font-medium">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-6 border-t border-slate-700/30 pt-4">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition ${
            liked ? "text-rose-400" : "neo-muted hover:text-rose-400"
          }`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} />
          {post.likes + (liked ? 1 : 0)}
        </button>
        <span className="neo-muted flex items-center gap-2 text-sm">
          <MessageCircle size={16} /> {post.comments}
        </span>
        <span className="neo-muted flex items-center gap-2 text-sm">
          <Share2 size={16} /> Share
        </span>
      </div>
    </article>
  );
}
