import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { emailValid, minLength, required } from "../utils/validation";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const validationError =
      required(form.email, "Email") ||
      emailValid(form.email) ||
      required(form.password, "Password") ||
      minLength(form.password, 6, "Password");

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = login(form.email, form.password, form.role);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === "admin" ? "/admin" : "/student");
  };

  return (
    <section className="auth-page">
      <form className="panel auth-card" onSubmit={onSubmit}>
        <h1>Student Group Project Platform</h1>
        <p className="muted">Login with your role to access your workflow.</p>
        {error && <p className="error">{error}</p>}

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            placeholder="admin@school.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            placeholder="********"
          />
        </label>

        <label>
          Role
          <select
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <Button iconLeft={FiLogIn} type="submit">
          Login
        </Button>
        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
        <p className="muted">Demo Admin: admin@school.com / admin123</p>
      </form>
    </section>
  );
}

export default LoginPage;
