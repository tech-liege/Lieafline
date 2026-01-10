import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function LessonNode({
  lesson,
  tInd,
  index,
  showDialogue,
  toggleDialogue,
  locked,
}) {
  const getAveragePercent = (value) => {
    if (value >= 100) {
      return "border-green-400";
    } else if (value >= 75) {
      return "border-green-400 border-l-gray-300";
    } else if (value >= 50) {
      return "border-gray-300 border-t-green-400 border-r-green-400";
    } else if (value >= 25) {
      return "border-gray-300 border-t-green-400";
    } else {
      return "border-gray-300";
    }
  };
  return (
    <div
      onClick={
        !locked
          ? showDialogue
            ? toggleDialogue("off")
            : toggleDialogue(index)
          : undefined
      }
      className="relative before:-left-23 before:top-30 before:md:left-33 before:md:top-0 before:bg-red-500 before:w-[10rem] before:h-[10rem] before:z-200"
    >
      <div
        className={
          (locked
            ? " border-0 bg-gray-400 cursor-default border-hidden "
            : getAveragePercent(lesson.progress) +
              " bg-emerald-600 hover:shadow-xl hover:bg-white hover:text-emerald-600 transition-colors ") +
          " p-3 w-30 h-30 rounded-full border-4 text-white font-semibold shadow-lg btn rotate-45"
        }
      >
        <div className="-rotate-45">
          <Star size={32} />
        </div>
      </div>
      <div
        className={
          " absolute -left-23 top-30 md:left-33 md:top-0 w-70 h-fit p-5 m-5 z-50 rounded-2xl border-2 border-white shadow-sm bg-green-100 hover:bg-emerald-100 text-gray-900 callout-left md:callout-top " +
          (showDialogue ? " block " : " hidden ")
        }
      >
        <span className="text-xl font-semibold">
          Lesson {tInd + 1} of {lesson.tasks?.length}
          <br />
          {lesson.tasks[tInd]?.xp} XP
        </span>
        <div className="mt-4 flex justify-end items-end h-20">
          <Link
            to={`./lesson/${lesson.tasks[tInd]?.id}`}
            className={`text-sm md:text-lg font-medium px-4 py-2 btn rounded-lg transition-colors bg-emerald-600 text-white hover:bg-emerald-700`}
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
