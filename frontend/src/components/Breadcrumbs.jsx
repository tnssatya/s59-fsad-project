import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) return null;

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {segments.map((segment, index) => {
        const to = `/${segments.slice(0, index + 1).join("/")}`;
        const label = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <span key={to}>
            {" / "}
            {index === segments.length - 1 ? (
              <span>{label}</span>
            ) : (
              <Link to={to}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
