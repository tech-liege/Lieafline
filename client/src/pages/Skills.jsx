import SkillCard from '../component/SkillCard';
import { SkillTree } from '../component/SkillTree/SkillTree';
import Stats from '../component/Stats';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { getCUSkills, getOneSkill } from '../services/skillApi';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Skills() {
  const [loading, setLoading] = useState(true);
  const [skill, setSkill] = useState(null);
  const [CUSkills, setCUSkills] = useState([]);
  const [delSkill, setDelSkill] = useState();
  const [modState, setModState] = useState('hidden');
  const { token, SKILL_SERVER_URL } = useAuth();
  const { skillId } = useParams();
  const [searchParams, _] = useSearchParams();

  const { delSuccess, delSkillTitle } = searchParams;

  useEffect(() => {
    async function fetchData() {
      try {
        if (skillId) {
          const data = await getOneSkill(SKILL_SERVER_URL, token, skillId);
          if (data && data.message !== 'Skill not found') setSkill(data);
        } else {
          const data = await getCUSkills(SKILL_SERVER_URL, token);
          if (data && data.message !== 'Failed to fetch user skills') setCUSkills(data);
        }
      } catch (error) {
        console.error(error.message || error);
        toast.error('Failed to load skills. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token, skillId, SKILL_SERVER_URL]);

  const openDeleteModal = (skill_Id, title) => {
    setDelSkill({ skillTitle: title, id: skill_Id });
    setModState('block');
  };

  const closeDeleteModal = () => {
    setDelSkill({ skillTitle: '', id: '' });
    setModState('hidden');
  };

  if (delSuccess === 'true') {
    toast.success(`Skill (${delSkillTitle}) successfully deleted`);
  }

  // 🌀 Loading State
  if (loading) {
    return <div className='flex h-[70vh] items-center justify-center text-gray-500 text-sm'>Fetching skills...</div>;
  }

  // 🌳 Single Skill View
  if (skill) {
    return (
      <main className='flex-1 p-6 bg-gray-50 min-h-screen'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {/* Skill Tree Section */}
          <section className='lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Skill Map</h2>
            <div className='h-72 border border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50'>
              <SkillTree skillsData={skill} />
            </div>
          </section>

          {/* Sidebar / Stats */}
          <aside className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Stats</h2>
            <Stats />
          </aside>
        </div>
      </main>
    );
  }

  // 📚 All User Skills View
  return (
    <main className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <header className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <h1 className='text-2xl font-bold text-gray-800'>My Skills</h1>
          <Link
            to='/createSkill'
            className='inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-emerald-600 transition-colors'>
            <span className='text-lg font-bold leading-none'>+</span> Add Skill
          </Link>
        </header>

        {/* Skill Grid */}
        {CUSkills.length > 0 ? (
          <section className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {CUSkills.map(skill => (
              <SkillCard
                key={skill._id || skill.title}
                {...skill}
                onEdit={() => {
                  return <Navigate to={`/editSkill/${skill._id}`} />;
                }}
                onDelete={() => {
                  openDeleteModal(skill._id, skill.title);
                }}
              />
            ))}
          </section>
        ) : (
          <section className='flex flex-col items-center justify-center h-[60vh] text-gray-500'>
            <p className='text-sm'>No skills added yet.</p>
            <Link
              to='/createSkill'
              className='mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-emerald-600 transition-colors'>
              <span className='text-lg font-bold leading-none'>+</span> Add Skill
            </Link>
          </section>
        )}
      </div>
      <dialog className={`min-h-screen min-w-screen bg-blend-soft-light ${modState}`} id='deleteModal'>
        <div className='h-fit w-fit p-10 bg-gray-100 border-0 rounded-lg shadow-xl ml-auto mr-auto mt-auto mb-auto'>
          <h1 className='inline-block'>Delete Skill : </h1>
          <h3 className='inline-block'>{delSkill.skillTitle}</h3>
          <div>
            <Link
              to={`./deleteSkill/${delSkill.id}`}
              className='mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 text-white text-sm font-medium px-4 py-2 shadow-sm hover:bg-red-600 transition-colors'>
              Delete
            </Link>
            <div className='btn btn-neutral' onClick={closeDeleteModal()}>
              Cancel
            </div>
          </div>
        </div>
      </dialog>
    </main>
  );
}

export default Skills;
