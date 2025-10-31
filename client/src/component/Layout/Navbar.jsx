import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-none'>
        <button className='btn btn-square btn-ghost lg:hidden'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block h-5 w-5 stroke-current'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>
      </div>

      <div className='flex-1'>
        <Link to='/' className='text-xl text-gray-300 font-bold font-serif  hover:text-gray-200'>
          Lieafline
        </Link>
      </div>

      <div className='flex gap-2'>
        {token ? (
          <>
            {/* Notifications */}
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
                <div className='indicator'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <span className='badge badge-sm indicator-item'>8</span>
                </div>
              </div>
              <div tabIndex={0} className='card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow'>
                <div className='card-body'>
                  <span className='text-lg font-bold'>8 Notifications</span>
                  <div className='card-actions'>
                    <button className='btn btn-primary btn-block'>View Notifications</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className='dropdown dropdown-end'>
              <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                <div className='w-10 rounded-full'>
                  <img alt='Avatar' src='/avatar/batperson.webp' />
                </div>
              </div>
              <ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
                <li>
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li>
                  <Link to={'/settings'}>Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to='/auth/login'>
              <button className='btn border-[2px] border-primary bg-inherit text-primary hover:bg-primary hover:text-primary-content'>
                Login
              </button>
            </Link>
            <Link to='/auth/signup'>
              <button className='btn border-[2px] border-primary bg-inherit text-primary hover:bg-primary hover:text-primary-content'>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
