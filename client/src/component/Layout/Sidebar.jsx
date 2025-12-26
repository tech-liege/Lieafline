import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code2, BarChart3 } from "lucide-react";

export default function Sidebar() {
  const baseLink =
    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200';
  const activeLink = 'bg-blue-100 text-blue-600 font-medium shadow-sm';

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/skills', label: 'Skills', icon: <Code2 size={18} /> },
    { to: '/progress', label: 'Progress', icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="h-full p-6 bg-white border-r border-gray-200 w-full z-10 absolute">
      <nav className="space-y-2">
        {navItems.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `${baseLink} ${isActive ? activeLink : ""}`}>
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
