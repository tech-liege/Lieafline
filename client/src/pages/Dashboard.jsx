import SkillCard from '../component/SkillCard';
import { getCUSkills } from '../services/skillApi';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Dashboard() {
  const [fetched, setFetched] = useState(false);
  const [CUSkills, setCUSkills] = useState(null);
  const { token, SKILL_SERVER_URL } = useAuth();

  useEffect(() => {
    getCUSkills(SKILL_SERVER_URL, token)
      .then(data => {
        if (data.message === 'Failed to fetch user skills') {
          toast.error(data.message);
        } else {
          setCUSkills(data);
        }
      })
      .catch(() => {
        toast.error('Internal Server Error');
      })
      .finally(() => {
        setFetched(true);
      });
  });

  if (!fetched) {
    return <div className='placeholder'> Fetching ...</div>;
  }

  if (CUSkills) {
    return (
      <div className='space-y-6'>
        <header>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p className='text-sm text-gray-500'>Your active branches and progress</p>
        </header>

        <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'>
          {CUSkills.map(m => (
            <SkillCard key={m.title} {...m} />
          ))}
        </section>
      </div>
    );
  } else {
    return (
      <div className='space-y-6'>
        <header>
          <h1 className='text-2xl font-bold'>Dashboard</h1>
          <p className='text-sm text-gray-500'>Your active branches and progress</p>
        </header>

        <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'>
          No Skills Yet
        </section>
      </div>
    );
  }
}

 export default Dashboard;