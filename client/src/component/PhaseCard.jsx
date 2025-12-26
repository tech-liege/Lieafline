import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function PhaseCard(_id, title, description, progress, index, disabled) {
  return (
    <div
      className={`rounded-3xl border shadow-md min-h-fit flex flex-col justify-around content-around ${
        disabled
          ? "border-dashed border-gray-700 shadow-gray-800 bg-gray-50 text-gray-600"
          : "border-green-900 shadow-emerald-800 bg-white text-gray-800"
      }`}>
      <header className="font-bold text-4xl mx-auto">
        Phase {index} - <span className={!disabled && "text-emerald-900"}> {title} </span>
      </header>
      <div className="desc 3-line-clip">{description}</div>
      <ProgressBar value={progress} />
      <Link
        to={`/phases/${_id}`}
        className={
          "btn btn-md hover:btn-lg border cursor-pointer " +
          (disabled ? "bg-gray-600 border-gray-800" : "bg-emerald-600 border-emerald-800 ")
        }>
        Go
      </Link>
    </div>
  );
}
