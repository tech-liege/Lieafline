import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function PhaseCard({
  id,
  title,
  description,
  progress = 0,
  locked = false,
  index,
}) {
  return (
    <div
      className={`relative group rounded-2xl p-6 w-full border transition-all duration-300
        ${
          locked
            ? "bg-gray-100 border-gray-200 text-gray-500"
            : "bg-white border-emerald-200 hover:shadow-lg hover:-translate-y-1"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">
          <span className="text-gray-400 mr-1">Phase {index + 1}</span>
          <span className={locked ? "text-gray-500" : "text-emerald-900"}>
            {title}
          </span>
        </h3>

        {locked && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-700">
            Locked
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
      )}

      {/* Progress */}
      <ProgressBar value={progress} disabled={locked} />

      {/* Action */}
      <div className="mt-4 flex justify-end">
        <Link
          to={`/phases/${id}`}
          className={`text-sm md:text-lg font-medium px-4 py-2 rounded-lg transition-colors
            ${
              locked
                ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
        >
          {locked ? "Locked" : "Continue"}
        </Link>
      </div>
    </div>
  );
}
