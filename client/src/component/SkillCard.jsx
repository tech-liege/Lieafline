import { Archive, BookmarkPlus, EllipsisVertical } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

function SkillCard({
  id,
  title,
  description,
  progress = 10,
  tags = [],
  bookmark,
  archive,
}) {
  return (
    <Link
      to={`/skills/${id}`}
      className="relative group z-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-5 text-sm text-gray-600 truncate h-4">
          {description}
        </div>
      )}

      {/* Progress */}
      <ProgressBar value={progress} />

      {/* Tags */}
      {tags?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons (appear on hover) */}
      <div className="absolute right-3 top-3 hidden items-center gap-2 rounded-md bg-white/70 p-1 shadow-sm backdrop-blur group-hover:flex">
        <button
          onClick={bookmark}
          className="rounded-md p-1.5 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
          title="Bookmark"
        >
          <BookmarkPlus size={16} />
        </button>
        <button
          onClick={archive}
          className="rounded-md p-1.5 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Archive"
        >
          <Archive size={16} />
        </button>
      </div>
      <div className="absolute right-3 top-3 items-center gap-2 rounded-md bg-white/70 p-1 shadow-sm backdrop-blur lg:hidden">
        <button type="button">
          <EllipsisVertical />
        </button>
      </div>
    </Link>
  );
}

export default SkillCard;
