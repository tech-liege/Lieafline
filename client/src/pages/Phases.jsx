import { useParams } from "react-router-dom";
import { useAuth, useVar } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getExtPhase } from "../services/skillApi";
import ModuleMap from "../component/ModuleMap";

export default function Phases() {
  const [phase, setPhase] = useState({});

  const { token, SKILL_SERVER_URL } = useAuth();
  const { toggleInLoading, phaseSample } = useVar();
  const { phaseId } = useParams();

  useEffect(() => {
    toggleInLoading(true, "Fetching Data...");
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

  return (
    <section className="bg-white rounded-2xl max-w-full shadow-sm border border-gray-200 p-2 md:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Phase {phase.index} - {phase.title}
      </h2>
      <div className="min-h-fit max-w-full border border-dashed border-gray-300 rounded-3xl flex items-center justify-center bg-gray-50">
        <main className="flex-1 max-w-full min-h-screen">
          <div className="max-w-full space-y-8">
            <div className="flex flex-col gap-6 max-w-full rounded-3xl border-4 border-emerald-100 mx-auto pb-10 overflow-y-hidden">
              {phase.modules?.map((module, ind) => (
                <ModuleMap
                  key={module.id || module.title}
                  module={module}
                  index={ind}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
