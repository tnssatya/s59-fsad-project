import { NavLink } from "react-router-dom";
import {
  FiClipboard,
  FiFileText,
  FiGrid,
  FiLayers,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";

const adminMenu = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/admin/projects", label: "Projects", icon: FiLayers },
  { to: "/admin/groups", label: "Groups", icon: FiUsers },
  { to: "/admin/submissions", label: "Submissions", icon: FiFileText },
];

const studentMenu = [
  { to: "/student/dashboard", label: "Dashboard", icon: FiGrid },
  { to: "/student/project", label: "Project", icon: FiLayers },
  { to: "/student/tasks", label: "Tasks", icon: FiClipboard },
  {
    to: "/student/project?tab=comments",
    label: "Discussion",
    icon: FiMessageSquare,
  },
];

function Sidebar() {
  const { currentUser } = useAuth();
  const menu = currentUser?.role === "admin" ? adminMenu : studentMenu;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Navigation
      </p>
      <div className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon className="text-base" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
