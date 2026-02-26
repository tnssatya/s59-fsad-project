import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiSearch, FiSettings } from "react-icons/fi";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Badge from "../ui/Badge";
import { useAuth } from "../../hooks/useAuth";

function Navbar({ onOpenThemeSettings }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-360 items-center gap-3 px-4 py-3">
        <Link
          to={
            currentUser?.role === "admin"
              ? "/admin/dashboard"
              : "/student/dashboard"
          }
          className="text-lg font-bold text-primary"
        >
          Task Profile
        </Link>

        <div className="relative hidden flex-1 md:block">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search projects, students, tasks..."
            className="pl-9"
            aria-label="Global search"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="!p-2"
          iconLeft={FiSettings}
          onClick={onOpenThemeSettings}
          aria-label="Open theme settings"
          title="Theme settings"
        >
          <span className="sr-only">Theme settings</span>
        </Button>

        <Badge variant="info">
          {currentUser?.role === "admin" ? "Teacher" : "Student"}
        </Badge>
        <span className="hidden text-sm md:inline">{currentUser?.name}</span>
        <Button
          variant="ghost"
          iconLeft={FiLogOut}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
