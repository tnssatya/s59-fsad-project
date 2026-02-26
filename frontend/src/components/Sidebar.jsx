import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const adminLinks = [
  { to: "/admin", label: "Admin Dashboard" },
  { to: "/admin/create-project", label: "Create Project" },
];

const studentLinks = [
  { to: "/student", label: "Student Dashboard" },
  { to: "/student/projects", label: "My Projects" },
];

function Sidebar() {
  const { currentUser } = useAuth();
  const links = currentUser?.role === "admin" ? adminLinks : studentLinks;

  return (
    <aside className="sidebar">
      <p className="muted">Navigation</p>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => `side-link ${isActive ? "active" : ""}`}
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
