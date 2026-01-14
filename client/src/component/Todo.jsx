import { useState } from "react";

export default function Todo({ todo, index, active, toggleActive, isLast }) {
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(false);

  const check = () => {
    if (answer === todo.answer) {
      setCorrect(true) && setDone(true);
    } else {
      setCorrect(false) && setDone(true);
    }
  };

  const next = () => {
    toggleActive(index + 1);
  };

  return (
    <div
      className={
        "absolute w-full h-full transition-opacity " +
        (!active ? " opacity-0" : undefined)
      }
    >
      {isLast ? (
        <div>
          <div className="">Completed</div>
          <div className="">Result and XP</div>
          <div className="">Exit</div>
        </div>
      ) : (
        <div className="flex flex-col h-full ">
          <div className="">
            <div className="w-full">Note or Question or Video</div>
            <div
              className={"w-full" + (!(todo.format === "question") && "hidden")}
            >
              Options & Answer
              <input
                type="text"
                name="answer"
                placeholder="Anser"
                className="input rounded-2xl"
                onChange={(e) => () => {
                  setAnswer(e.target.value);
                }}
              />
            </div>
          </div>
          <div
            className={
              "w-full flex justify-between items-center p-3 md:p-6 h-[10rem] rounded-b-2xl " +
              (done
                ? correct
                  ? "bg-success text-success-content"
                  : "bg-error text-error-content"
                : "bg-emerald-600 text-success-content")
            }
          >
            <div className={!done && "opacity-0"}>
              <h2
                className={
                  "font-extrabold text-xl " +
                  (correct ? " text-emerald-800" : " text-red-800")
                }
              >
                {correct ? "Correct:" : "Wrong:"}
              </h2>
              <div className="">{todo.correction}</div>
            </div>
            <span
              className={
                "btn btn-lg px-15 shadow-md " +
                (done
                  ? correct
                    ? " btn-success"
                    : " btn-error"
                  : "bg-emerald-50 border-white text-emerald-800")
              }
              onClick={done ? next : check}
            >
              {done ? "Continue" : "Check"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
