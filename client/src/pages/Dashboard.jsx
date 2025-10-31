import SkillCard from '../component/SkillCard';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
  const { mock } = useAuth();
  return (
    <div className='space-y-6'>
      <header>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
        <p className='text-sm text-gray-500'>Your active branches and progress</p>
      </header>

      <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'>
        {mock.map(m => (
          <SkillCard key={m.title} {...m} />
        ))}
      </section>
    </div>
  );
}

 export default Dashboard;