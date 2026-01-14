import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCUSkills } from '../services/skillApi';
import { useAuth, useVar } from "../hooks/useAuth";
import SkillCard from "../component/SkillCard";
import { Link } from "react-router-dom";
import ContainerCard from "../component/ContainerCard";
import { ChevronRight } from "lucide-react";
import BackgroundOverlay from "../component/BackgroundOverlay";

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

  const cards = [
    {
      header: "Skills",
      body:
        CUSkills && CUSkills.length > 0 ? (
          <div className="grid grid-rows-1 gap-6 overflow-scroll">
            {CUSkills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
            <Link to={"/skills"} className="h-full w-25 text-white relative">
              <BackgroundOverlay position="absolute" grad={true} />
              <ChevronRight
                strokeWidth={1}
                size={80}
                className="absolute z-51 my-20"
              />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-500 text-lg">No skills added yet 🌱</p>
            <p className="text-sm text-gray-400 mt-1">
              Start by{" "}
              <Link to={"/explore"} className="link">
                exploring
              </Link>{" "}
              your first skill branch.
            </p>
          </div>
        ),
    },
    {
      header: "Discover Pathways",
      body: <div className=""></div>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-6 py-8 rounded-2xl">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-blue-600">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your current skills and progress
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <ContainerCard key={index} header={card.header} body={card.body} />
        ))}
      </section>
    </div>
  );
}
