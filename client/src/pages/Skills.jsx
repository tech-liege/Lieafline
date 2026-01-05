import SkillCard from '../component/SkillCard';
import PhaseCard from "../component/PhaseCard";
import Stats from "../component/Stats";
import { Link, useParams } from "react-router-dom";
import { getCUSkills, getPhases } from "../services/skillApi";
import { useAuth, useVar } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { archiveSkill, bookmarkSkill } from "../services/userApi";

function Skills() {
  const [skill, setSkill] = useState(null);
  const [CUSkills, setCUSkills] = useState([]);

  const { token, SKILL_SERVER_URL } = useAuth();
  const { toggleLoading, skillSample } = useVar();
  const { skillId } = useParams();

  useEffect(() => {
    toggleLoading(true, "Fetching Skills...");
    async function fetchData() {
      const action = skillId ? getPhases : getCUSkills;
      const args = skillId
        ? [SKILL_SERVER_URL, token, skillId]
        : [SKILL_SERVER_URL, token];
      try {
        const data = await action(args);
        if (data && data.message === "Phases") {
          setSkill(data.skill);
        } else if (data && data.message === "All My Skill") {
          setCUSkills(data.skills);
        } else {
          setSkill(skillSample);
          setCUSkills([skillSample]);
        }
      } catch (error) {
        console.error(error.message || error);
        toast.error("Failed to load skills. Please try again.");
        setSkill(skillSample);
        setCUSkills([skillSample]);
      } finally {
        toggleLoading(false);
      }
    }

    fetchData();
  }, [token, skillId, SKILL_SERVER_URL]);

  const bookmark = (skillId) => async () => {
    try {
      const data = await bookmarkSkill(SKILL_SERVER_URL, token, skillId);
      data.bookmarks ? toast("bookmarked!") : toast.error("failed to bookmark");
    } catch (err) {
      toast.error("Failed to Bookmark!");
      console.error(err.message);
    }
  };
  const archive = (skillId) => async () => {
    try {
      const data = await archiveSkill(SKILL_SERVER_URL, token, skillId);
      data.archives ? toast("archiveed!") : toast.error("failed to archive");
    } catch (err) {
      toast.error("Failed to Archive!");
      console.error(err.message);
    }
  };

  // 🌳 Single Skill View
  if (skill) {
    return (
      <main className="flex-1 p-6 min-h-screen w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full">
          {/* Skill Tree Section */}
          <section className="lg:col-span-3 bg-transparent rounded-2xl shadow-sm p-6">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-2xl font-bold text-green-900">
                {skill ? skill.title : "no skill"}
              </h1>
            </header>
            <div
              id="phase"
              className="relative flex flex-col gap-8 mt-8
             before:absolute before:left-3 before:top-0
             before:h-full before:w-px before:bg-emerald-200"
            >
              {skill?.phases?.map((phase, ind) => (
                <PhaseCard
                  key={phase.id || phase.title}
                  {...phase}
                  index={ind}
                />
              ))}
            </div>
          </section>

          {/* Sidebar / Stats */}
          <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Stats</h2>
            <Stats />
          </aside>
        </div>
      </main>
    );
  }

  // 📚 All User Skills View
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Skills</h1>
          <Link
            to="/exploreSkill"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-emerald-600 transition-colors"
          >
            <span className="text-lg font-bold leading-none">+</span> Add Skill
          </Link>
        </header>
        {/* Skill Grid */}
        {CUSkills.length > 0 ? (
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CUSkills.map((skill) => (
              <SkillCard
                key={skill.id || skill.title}
                {...skill}
                bookmark={bookmark(skill.id)}
                archive={archive(skill.id)}
              />
            ))}
          </section>
        ) : (
          <section className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
            <p className="text-sm">No skills added yet.</p>
            <Link
              to="/exploreSkill"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-emerald-600 transition-colors"
            >
              <span className="text-lg font-bold leading-none">+</span> Add
              Skill
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

export default Skills;
