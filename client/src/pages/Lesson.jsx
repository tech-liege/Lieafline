import { useEffect, useState } from "react";
import ProgressBar from "../component/ProgressBar";
import { useAuth, useVar } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { getTask } from "../services/skillApi";
import { useNavigate, useParams } from "react-router-dom";
import BackgroundOverlay from "../component/BackgroundOverlay";
import Todo from "../component/Todo";
import { X } from "lucide-react";
import EndofTask from "../component/EndofTask";

export default function Lesson() {
  const [task, setTask] = useState({});
  const [comTodos, setComTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lengths, setLengths] = useState([0, 0]);
  const [showEndDialogue, setShowEndDialogue] = useState(false);

  const { SKILL_SERVER_URL, token } = useAuth();
  const { mulTodoSample, toggleInLoading, toggleInFullScreen } = useVar();

  const { phaseId, taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    toggleInLoading(true, "Loading Lesson...");
    try {
      const data = getTask(SKILL_SERVER_URL, token, taskId);
      if (data && data.message === "Single Task") {
        setTask(data.task);
        setLengths([data.l, task.todos?.legth]);
      } else {
        toast.error("Failed to load lesson. Try Again!");
        setTask(mulTodoSample);
        setLengths([3, task.todos?.legth]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load lesson!");
      setTask(mulTodoSample);
      setLengths([5, task.todos?.length]);
    } finally {
      toggleInLoading(false);
      console.log(lengths);
    }
  }, [SKILL_SERVER_URL, token, taskId, task]);

  const endLesson = () => {
    navigate(`/phase/${phaseId}`);
    toggleInFullScreen(false, ``, false);
  };
  useEffect(() => {
    setLengths([lengths[0], task.todos?.length]);
    console.log(lengths);
  }, [task]);

  useEffect(() => {
    toggleInFullScreen(true, `Lesson ${task.index} of ${lengths[1]}`, false);
  }, [lengths, task]);

  const toggleEndDialogue = () => {
    setShowEndDialogue(!showEndDialogue);
  };

  const toggleActive = (index) => {
    if (Number.isInteger(index)) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(99);
    }
  };

  const addComTodo = (obj = {}) => {
    setComTodos([...comTodos, obj]);
  };

  return (
    <div className="w-full max-h-[95dvh]">
      <div className="grid grid-rows-12 gap-6 w-full h-[95dvh]">
        <div className="w-full flex gap-5 text-2xl items-center">
          <div
            className="cursor-pointer text-gray-400 hover:text-green-900"
            onClick={toggleEndDialogue}
          >
            <X />
          </div>
          <ProgressBar
            value={Math.floor((comTodos?.length / lengths[1]) * 100)}
            showPer={false}
          />
          <div className="cursor-pointer hover:translate-y-4 transition-transform duration-300">
            <img src="/heart.svg" alt="heart" />
          </div>
        </div>
        <div className="w-full h-full row-start-2 -row-end-1 relative">
          {task.todos?.map((todo, index) => (
            <Todo
              key={todo.id || index}
              todo={todo}
              index={index}
              active={currentIndex === index}
              toggleActive={toggleActive}
              addComTodo={addComTodo}
            />
          ))}
          <EndofTask
            index={0} // {lengths[1]}
            active={1} // {currentIndex === lengths[1]}
            comTodos={comTodos}
          />
        </div>
      </div>
      <div
        onClick={toggleEndDialogue}
        className={
          "fixed w-full h-full top-0 left-0 " + (!showEndDialogue && " hidden")
        }
      >
        <div className="absolute grid h-full w-full z-301">
          <div className="z-60 m-auto w-100 flex flex-col items-center g-3 md:g-6 bg-white rounded-2xl shadow-md p-3 md:p-6">
            <span className="text-xl font-semibold">Are you sure?</span>
            <span>
              If you end the lesson
              <span className="font-extrabold"> all XP </span>
              will be lost!
            </span>
            <div className="w-full flex flex-row justify-end">
              <span className="btn btn-base m-2" onClick={toggleEndDialogue}>
                Cancel
              </span>
              <span className="btn btn-error m-2" onClick={endLesson}>
                End
              </span>
            </div>
          </div>
        </div>
        <BackgroundOverlay />
      </div>
    </div>
  );
}
