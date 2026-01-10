import { useEffect, useState } from "react";
import ProgressBar from "../component/ProgressBar";
import { useAuth, useVar } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { getTodos } from "../services/skillApi";
import { useNavigate, useParams } from "react-router-dom";
import BackgroundOverlay from "../component/BackgroundOverlay";
import Todo from "../component/Todo";
import { X } from "lucide-react";

export default function Lesson() {
  const [todos, setTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [tasksLength, setTasksLength] = useState(0);
  const [showEndDialogue, setShowEndDialogue] = useState(false);

  const { SKILL_SERVER_URL, token } = useAuth();
  const { mulTodoSample, toggleInLoading, toggleInFullScreen } = useVar();

  const { phaseId, taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    toggleInLoading(true);
    try {
      const data = getTodos(SKILL_SERVER_URL, token, taskId);
      if (data && data.message === "Todos") {
        setTodos(data.todos);
        setTaskIndex(data.index[0]);
        setTasksLength(data.index[1]);
      } else {
        toast.error("Failed to load lesson. Try Again!");
        setTodos(mulTodoSample);
        setTaskIndex(1);
        setTasksLength(3);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load lesson!");
      setTodos(mulTodoSample);
      setTaskIndex(3);
      setTasksLength(5);
    } finally {
      toggleInLoading(false);
      console.table([
        ["todos", "mulTodos"],
        [todos, mulTodoSample],
      ]);
    }
  }, [SKILL_SERVER_URL, token, taskId]);

  const endLesson = () => {
    toggleInFullScreen(false, ``, false);
    navigate(`/phases/${phaseId}`);
  };

  useEffect(() => {
    toggleInFullScreen(true, `Lesson ${taskIndex} of ${tasksLength}`, true);
  }, [taskIndex, tasksLength]);

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

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-6 flex-1 w-full h-full">
        <div className="w-full flex gap-5 text-2xl items-center">
          <ProgressBar
            value={Math.floor(currentIndex / (todos?.length - 1)) * 100}
            showPer={false}
          />
          <div
            className="cursor-pointer text-gray-400"
            onClick={toggleEndDialogue}
          >
            <X />
          </div>
        </div>
        <div className="w-full h-full bg-red-500">
          {todos?.map((todo, index) => (
            <Todo
              key={todo.id || index}
              todo={todo}
              index={index}
              active={currentIndex === index}
              toggleActive={toggleActive}
              isLast={index === todos.length}
            />
          ))}
        </div>
      </div>
      <div
        onClick={toggleEndDialogue}
        className={
          "fixed w-[100vw] h-[100vh] " + (!showEndDialogue && " hidden")
        }
      >
        <div className="absolute z-60 left-[40%] top-[35%] w-100 h-fit flex flex-col items-center g-3 md:g-6 bg-white rounded-2xl shadow-md p-3 md:p-6">
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
        <BackgroundOverlay />
      </div>
    </div>
  );
}
