import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Button from "./ui/Button";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link
        to={currentUser?.role === "admin" ? "/admin" : "/student"}
        className="brand-link"
      >
        Task Profile
      </Link>
      <div className="nav-right">
        <span className="pill">{currentUser?.role?.toUpperCase()}</span>
        <span>{currentUser?.name}</span>
        <Button
          variant="ghost"
          size="sm"
          iconLeft={FiLogOut}
          onClick={onLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
