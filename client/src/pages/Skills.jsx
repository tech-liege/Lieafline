import SkillCard from '../component/SkillCard';
import { SkillTree } from '../component/SkillTree/SkillTree';
import Stats from '../component/Stats';
import { Link, useParams } from 'react-router-dom';
import { getCUSkills, getOneSkill } from '../services/skillApi';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Skills() {
  const [fetched, setFetched] = useState(false);
  const [skill, setSkill] = useState(null);
  const [CUSkills, setCUSkills] = useState(null);

  const { token, SKILL_SERVER_URL } = useAuth();
  const { skillId } = useParams();

  useEffect(() => {
    if (skillId) {
      getOneSkill(SKILL_SERVER_URL, token, skillId)
        .then(data => {
          if (!(data.message === 'Skill not found')) {
            setSkill(data);
          }
        })
        .catch(error => console.error(error.message || error))
        .finally(() => setFetched(true));
    } else {
      getCUSkills(SKILL_SERVER_URL, token)
        .then(data => {
          if (!(data.message === 'Failed to fetch user skills')) {
            setCUSkills(data);
          }
        })
        .catch(error => console.error(error.message || error))
        .finally(() => {
          setFetched(true);
        });
    }
    !fetched && toast.error('Internal Server Error');
  }, [token, skillId, SKILL_SERVER_URL]);

  if (!fetched) {
    return <div className='placeholder'> Fetching ...</div>;
  }

  if (skill) {
    return (
      <main className='flex-1 p-4'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <section className='lg:col-span-2 bg-base-200 rounded-box p-4'>
            {/* Skill branches / tracking map placeholder */}
            <h2 className='text-lg font-bold mb-2'>Skill Map</h2>
            <div className='h-64 border border-dashed border-neutral rounded-lg flex items-center justify-center'>
              <SkillTree skillsData={skill} />
            </div>
          </section>

          <aside className='bg-base-200 rounded-box p-4'>
            {/* Sidebar / extra info */}
            <h2 className='text-lg font-bold mb-2'>Stats</h2>
            <Stats />
          </aside>
        </div>
      </main>
    );
  } else {
    return (
      <div className='space-y-6'>
        <header>
          <h1 className='text-2xl font-bold'>Skills</h1>
          <Link className='btn btn-info place-self-end' to={'/createSkill'}>
            <span className='indicator-start font-lg'>+</span> Add Skills
          </Link>
        </header>

        <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'>
          {CUSkills.map(m => (
            <SkillCard key={m.title} {...m} />
          ))}
        </section>
      </div>
    );
  }
}

export default Skills;
