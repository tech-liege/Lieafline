import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useVar } from '../../hooks/useAuth';
import { Bell, User } from "lucide-react"; // modern minimal icons
import { useState } from "react";

export default function Navbar() {
  const [PDNActive, setPDNActive] = useState(false);

  const { logout, token, user } = useAuth();
  const { notifications, isSideActive, md } = useVar();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const togglePDN = (val) => () => {
    if (val === true || val === false) {
      setPDNActive(val);
    } else {
      setPDNActive(!PDNActive);
    }
  };

  return (
    <nav
      className={
        "w-9/10 md:w-19/20 ml-20 right-0 top-0 h-20 pr-10 fixed z-200 flex justify-between items-center " +
        (!isSideActive && !md && " bg-white transition-colors duration-200")
      }
    >
      <div className={"w-fit" + (!isSideActive && " ml-8 md:ml-20")}>
        <Link
          to="/"
          className="text-3xl font-bold cursor-pointer tracking-tight bg-gradient-to-r to-blue-700 from-green-700 bg-clip-text text-transparent transition-all"
        >
          Lieafline
        </Link>
      </div>
      <div className="flex items-center justify-end gap-8">
        {token ? (
          <>
            {/* Notifications */}
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg transition"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {notifications && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <button
                className="flex items-center focus:outline-none"
                onClick={togglePDN()}
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Avatar"
                    className="h-9 w-9 rounded-full border border-gray-300 object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>

              {/* Dropdown Menu */}
              <ul
                onClick={togglePDN(false)}
                className={` ${
                  PDNActive ? "block" : "hidden"
                } absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-md group-hover:translate-y-1 transition-all transform origin-top-right duration-200 z-20`}
              >
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-xl"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Login
              </button>
            </Link>
            <Link to="/auth/signup">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
