import { useEffect, useState } from "react";

export default function Todo({
  todo,
  index,
  active,
  toggleActive,
  addComTodo,
}) {
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState("default value");
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(null);

  useEffect(() => {
    switch (todo.format) {
      case "question":
        setData(todo.q_a.question || "empty question");
        break;
      case "read":
        setData(todo.note || "empty read");
        setCorrect(true);
        break;
      case "video":
        setData(
          <video
            src={todo.video}
            height="300"
            width="550"
            className="bg-[#9bfff76f]"
          ></video>,
        );
        setCorrect(true);
        break;
      default:
        setData("Invalid format");
        setCorrect(true);
        break;
    }
  }, [todo]);

  const check = () => {
    if (!(todo.format === "question")) {
      setDone(true);
      return;
    }
    if (answer === todo?.q_a?.options[todo?.q_a?.answer]) {
      setCorrect(true);
      setDone(true);
    } else {
      setCorrect(false);
      setDone(true);
    }
  };

  const next = () => {
    addComTodo({ index, correct });
    toggleActive(index + 1);
  };

  const handleSelect = (index) => () => {
    setAnswer(todo?.q_a?.options[index]);
  };

  return (
    <div
      id={index}
      className={
        "absolute w-full h-full bg-transparent transition-opacity duration-500 " +
        (!active && " opacity-0 -z-1")
      }
    >
      <div className="flex flex-col h-full justify-between w-full">
        <div className="h-full w-full">
          <div className="w-full p-3 md:p-5 flex flex-col items-center justify-between">
            <div className="w-full min-h-20 flex items-center p-3 md:p-5 text-gray-900 font-semibold shadow-sm rounded-xl  bg-[#bbbbff60]">
              {data}
            </div>
          </div>
          <div
            className={
              "mx-auto mt-20 max-w-full flex items-center justify-center gap-6 " +
              (!(todo.format === "question") && " hidden")
            }
          >
            {todo.format === "question" &&
              todo?.q_a?.options?.map((opt, index) => (
                <div
                  key={index}
                  className={
                    "btn flex items-center justify-between border-[1.5px] border-b-4 px-4 md:px-10 py-8 box-border cursor-pointer rounded-2xl md:ml-5 " +
                    (answer === opt
                      ? " bg-[#bbbbff] text-gray-800 shadow-md"
                      : "  bg-[#bbbbff60] text-gray-800 shadow-sm")
                  }
                  onClick={handleSelect(index)}
                >
                  {opt}
                </div>
              ))}
          </div>
        </div>
        <div
          className={
            "w-full absolute left-0 bottom-0 grid grid-cols-3 p-3 md:p-6 h-30 border-t border-[#37464F]  " +
            (done
              ? correct
                ? "bg-success text-success-content"
                : "bg-error text-error-content"
              : "bg-emerald-600 text-success-content")
          }
        >
          {!done ? (
            <button
              className="btn btn-lg px-15 shadow-md bg-gray-50 border-white text-gray-800"
              onClick={next}
            >
              Skip
            </button>
          ) : (
            <div className="col-start-1 col-span-2">
              <h2
                className={
                  "font-extrabold text-xl " +
                  (correct ? " text-emerald-800" : " text-red-800")
                }
              >
                {todo.format === "question"
                  ? correct
                    ? "Correct:"
                    : "Wrong:"
                  : "Well Done!"}
              </h2>
              <div className="">
                {todo.format === "question" && todo.q_a.correction}
              </div>
            </div>
          )}
          <div className="col-start-3 col-span-1 w-full md:w-fit flex items-center justify-end">
            <button
              className={
                "btn btn-lg px-15 shadow-md w-full " +
                (done
                  ? correct
                    ? " btn-success"
                    : " btn-error"
                  : !answer
                    ? " bg-emerald-50 border-white text-emerald-800"
                    : " bg-gray-50 border-white text-gray-800")
              }
              onClick={done ? next : check}
            >
              {done ? "Continue" : "Check"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
