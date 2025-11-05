import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Menu, Bell, User } from 'lucide-react'; // modern minimal icons

export default function Navbar() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <nav className='w-full bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16'>
        {/* Left Section */}
        <div className='flex items-center gap-2'>
          <button className='md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-lg transition'>
            <Menu className='h-5 w-5' />
          </button>

          <Link to='/' className='text-xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-black bg-clip-text text-transparent'>
            Lieafline
          </Link>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {token ? (
            <>
              {/* Notifications */}
              <button className='relative p-2 text-gray-500 hover:text-gray-700 rounded-lg transition' aria-label='Notifications'>
                <Bell className='h-5 w-5' />
                <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full'>8</span>
              </button>

              {/* Profile Dropdown */}
              <div className='relative group'>
                <button className='flex items-center focus:outline-none'>
                  <img src='/avatar/batperson.webp' alt='Avatar' className='h-9 w-9 rounded-full border border-gray-300 object-cover' />
                </button>

                {/* Dropdown Menu */}
                <ul className='absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all transform origin-top-right duration-200 z-20'>
                  <li>
                    <Link to='/profile' className='block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl'>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to='/settings' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl'>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to='/auth/login'>
                <button className='px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition'>
                  Login
                </button>
              </Link>
              <Link to='/auth/signup'>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
