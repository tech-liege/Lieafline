import { useEffect, useState } from "react";

export default function EndofTask({ index, active, comTodos }) {
  const [results, setResults] = useState([{}]);
  const [show, setShow] = useState(0);

  useEffect(() => {
    const percentage = 0;
    const xp = 0;
    if (active) {
      setResults([
        { title: "XP", value: xp, color: "lime" },
        { title: "Percentage", value: percentage, color: "sky" },
      ]);
    }
  }, [active]);

  const continues = () => {
    if (show < 2) {
      setShow(show + 1);
    }
    // end
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
          {results.map((result, index) => (
            <div
              key={index}
              className={`w-80 h-40 border rounded-2xl p-4 bg-${result.color}-500`}
            >
              <div className="w-full text-center h-1/5 p-4 md:p-8">
                {result.title}
              </div>
              <div className="w-full text-center h-4/5 rounded-2xl bg-white">
                {result.value}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 bg-emerald-600 text-success-content h-30 w-full flex justify-end items-center p-5 md:p-10">
          <button
            className="btn btn-lg px-15 shadow-md  bg-emerald-50 border-white text-emerald-800"
            onClick={continues}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
