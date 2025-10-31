import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const link = 'px-3 py-2 rounded hover:bg-green-700 dark:hover:bg-green-700';
  const active = 'bg-green-600 dark:bg-green-600';

  return (
    <aside className='w-40 bg-green-800  p-4 h-screen hidden md:block'>
      <ul>
        <li className='mb-3'>
          <NavLink to='/dashboard' className={({ isActive }) => `${link} ${isActive && active}`}>
            Dashboard
          </NavLink>
        </li>
        <li className='mb-3'>
          <NavLink to='/skills' className={({ isActive }) => `${link} ${isActive && active}`}>
            Skills
          </NavLink>
        </li>
        <li className='mb-3'>
          <NavLink to='/progress' className={({ isActive }) => `${link} ${isActive && active}`}>
            Progress
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
