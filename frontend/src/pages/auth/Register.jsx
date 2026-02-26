import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../hooks/useAuth";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(["student", "admin"]),
});

function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const roleFromQuery = new URLSearchParams(location.search).get("role");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: roleFromQuery === "admin" ? "admin" : "student" },
  });

  const onSubmit = async (values) => {
    const result = await registerUser(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success("Account created");
    navigate(
      result.user.role === "admin" ? "/admin/dashboard" : "/student/dashboard",
    );
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[color:var(--color-public-bg)] p-4">
      <Card className="w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="muted">Join Task Profile as a student or teacher.</p>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm">Name</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <Input type="password" {...register("password")} />
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
            iconLeft={FiCheck}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default Register;
