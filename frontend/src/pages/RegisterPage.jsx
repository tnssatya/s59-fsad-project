import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { emailValid, minLength, required } from "../utils/validation";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const validationError =
      required(form.name, "Name") ||
      required(form.email, "Email") ||
      emailValid(form.email) ||
      required(form.password, "Password") ||
      minLength(form.password, 6, "Password");

    if (validationError) {
      setError(validationError);
      return;
    }

    const result = register(form);
    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(result.user.role === "admin" ? "/admin" : "/student");
  };

  return (
    <section className="auth-page">
      <form className="panel auth-card" onSubmit={onSubmit}>
        <h1>Create account</h1>
        <p className="muted">Register as a student or teacher admin.</p>
        {error && <p className="error">{error}</p>}

        <label>
          Full Name
          <input
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
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

        <Button iconLeft={FiCheck} type="submit">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}

export default RegisterPage;
