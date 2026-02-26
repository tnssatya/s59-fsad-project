import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FiLogIn } from "react-icons/fi";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(["student", "admin"]),
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: "student" },
  });

  const onSubmit = async (values) => {
    const result = await login(values.email, values.password, values.role);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Welcome back!");
    navigate(
      result.user.role === "admin" ? "/admin/dashboard" : "/student/dashboard",
    );
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[color:var(--color-public-bg)] p-4">
      <Card className="w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">Login to Task Profile</h1>
        <p className="muted">Use your role and credentials to continue.</p>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <Input placeholder="admin@taskprofile.edu" {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm">Role</label>
            <Select {...register("role")}>
              <option value="student">Student</option>
              <option value="admin">Teacher</option>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            iconLeft={FiLogIn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="muted text-xs">Demo: admin@taskprofile.edu / admin123</p>
        <p className="text-sm">
          No account?{" "}
          <Link to="/register" className="text-primary">
            Create one
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default Login;
