import { Navigate } from 'react-router-dom';

export default function Home() {
  const goto = link => {
    return <Navigate to={link} />;
  };

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold text-center'>Welcome to Lieafline 🌱</h1>
      <p className='text-center mt-4 text-gray-600'>Start tracking your growth, one skill at a time.</p>
      <button className='cursor-pointer' onClick={goto('/authenticate')}>
        Get Started
      </button>
    </div>
  );
}
// This page will be used as hero page
