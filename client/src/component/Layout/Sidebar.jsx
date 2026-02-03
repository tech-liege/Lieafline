import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, Code2, BarChart3, Compass, Menu } from "lucide-react";
import { useVar } from "../../hooks/useAuth";

export default function Sidebar() {
  const { toggleSidebar, isSideActive, md } = useVar();

  const baseLink =
    "flex items-center gap-3 mx-auto px-2 py-2 w-full rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200" +
    (!isSideActive && " justify-center");
  const activeLink = "bg-blue-100 text-blue-600 font-medium shadow-sm";

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
    },
    {
      to: "/skills",
      label: "Skills",
      icon: <Code2 size={20} strokeWidth={1.5} />,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: <Compass size={20} strokeWidth={1.5} />,
    },
    {
      to: "/progress",
      label: "Progress",
      icon: <BarChart3 size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="h-full py-6 px-2 bg-white w-full z-301 absolute md:border-r md:border-gray-200">
      <div className="flex items-center mx-auto mb-15 w-full gap-2 ">
        <button
          className={
            "p-2 text-3xl text-gray-500 hover:text-gray-700 rounded-lg transition " +
            (!isSideActive && " mx-[0.5rem]")
          }
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <nav className="my-2">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeLink : ""}`
            }
            onClick={!md ? toggleSidebar : undefined}
          >
            {icon}
            {md ? isSideActive && <span>{label}</span> : <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
