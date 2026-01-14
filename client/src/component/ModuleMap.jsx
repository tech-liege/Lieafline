import { LucideAlbum } from "lucide-react";
import LessonNode from "./LessonNode";
import { useState } from "react";

export default function ModuleMap({
  module,
  index,
  toggleDialogue,
  showDialogue,
}) {
  const [showGuide, setshowGuide] = useState(false);
  const toggleGuide = () => {
    setshowGuide(!showGuide);
  };
  return (
    <main className="flex-1 min-h-fit w-full">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col bg-emerald-100 p-10 rounded-2xl w-full z-20 relative group sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-lg md:text-2xl font-bold text-green-900">
            <s className="hidden md:inline"> Module {index + 1} - </s>
            {module.title}
          </h1>
          <div className="absolute right-10 top-8 hidden items-center gap-2 rounded-md bg-white/70 p-1  text-gray-400 hover:bg-emerald-200 hover:text-emerald-500 transition-colors duration-500 shadow-sm backdrop-blur group-hover:flex">
            <button
              onClick={toggleGuide}
              className="rounded-md p-1.5"
              title="Note"
            >
              <LucideAlbum size={16} />
            </button>
          </div>
        </div>
        {showGuide ? (
          <div className="">{module.note}</div>
        ) : (
          <section className="relative flex flex-col items-center gap-30 mt-8 before:absolute before:left-[50%] before:top-[-20%] before:h-[140%] before:w-[5px] before:bg-emerald-400">
            {module.lessons?.map((lesson, lInd) => (
              <LessonNode
                key={lesson.id || lesson.title}
                lesson={lesson}
                tInd={1}
                mInd={index}
                index={lInd}
                showDialogue={
                  showDialogue[0] === index && showDialogue[1] === lInd
                }
                toggleDialogue={toggleDialogue}
                locked={lesson.locked}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
