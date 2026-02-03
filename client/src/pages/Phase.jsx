import { useParams } from "react-router-dom";
import { useAuth, useVar } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getExtPhase } from "../services/skillApi";
import ModuleMap from "../component/ModuleMap";

export default function Phase() {
  const [phase, setPhase] = useState({});
  const [showDialogue, setshowDialogue] = useState([99, 99]);

  const { token, SKILL_SERVER_URL } = useAuth();
  const { toggleInLoading, phaseSample } = useVar();
  const { phaseId } = useParams();

  useEffect(() => {
    toggleInLoading(true);
    async function fetchData() {
      try {
        const data = await getExtPhase(SKILL_SERVER_URL, token, phaseId);
        if (data && data.message === "ExtPhase") {
          setPhase(data.phase);
        } else {
          setPhase(phaseSample);
        }
      } catch (error) {
        console.error(error.message || error);
        toast.error("Failed to load skills. Please try again.");
        setPhase(phaseSample);
      } finally {
        toggleInLoading(false);
      }
    }

    fetchData();
  }, [token, phaseId, SKILL_SERVER_URL]);

  const toggleDialogue = (mIndex, lIndex) => () => {
    if (Number.isInteger(mIndex) && Number.isInteger(lIndex)) {
      setshowDialogue([mIndex, lIndex]);
    } else {
      setshowDialogue([99, 99]);
    }
  };

  return (
    <section className="bg-white rounded-2xl max-w-full shadow-sm border border-gray-200 p-2 md:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Phase {phase.index + 1} - {phase.title}
      </h2>
      <main className="flex-1 w-full overflow-y-auto">
        <div className="flex flex-col gap-6 w-full rounded-3xl border-4 border-emerald-100 mx-auto pb-10">
          {phase.modules?.map((module, ind) => (
            <ModuleMap
              key={module.id || module.title}
              module={module}
              index={ind}
              toggleDialogue={toggleDialogue}
              showDialogue={showDialogue}
            />
          ))}
        </div>
      </main>
    </section>
  );
}
