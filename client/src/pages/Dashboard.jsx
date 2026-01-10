import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCUSkills } from '../services/skillApi';
import { useAuth, useVar } from "../hooks/useAuth";
import SkillCard from "../component/SkillCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [CUSkills, setCUSkills] = useState([]);
  const { token, SKILL_SERVER_URL } = useAuth();
  const { toggleInLoading } = useVar();

  useEffect(() => {
    toggleInLoading(true);
    const fetchSkills = async () => {
      try {
        const data = await getCUSkills(SKILL_SERVER_URL, token);
        if (data.message === "Failed to fetch user skills") {
          toast.error("Failed to fetch your skills");
        } else {
          setCUSkills(data);
        }
      } catch {
        toast.error("Internal Server Error");
      } finally {
        toggleInLoading(false);
      }
    };

    fetchSkills();
  }, [SKILL_SERVER_URL, token]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-8 rounded-2xl">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your current skills and progress
        </p>
      </header>

      {CUSkills && CUSkills.length > 0 ? (
        <div>
          <div className="flex">
            <div className="my-skills">
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {CUSkills.map((skill) => (
                  <SkillCard key={skill.title} {...skill} />
                ))}
              </section>
            </div>
            <div className="info">Streak, Leaderboard, etc</div>
          </div>
          <div className="stats"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 text-lg">No skills added yet 🌱</p>
          <p className="text-sm text-gray-400 mt-1">
            Start by{" "}
            <Link to={"/explore"} className=" link">
              {" "}
              exploring{" "}
            </Link>{" "}
            your first skill branch.
          </p>
        </div>
      )}
    </div>
  );
}
