import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import RoleRoute from "./components/layout/RoleRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Projects from "./pages/admin/Projects";
import ProjectDetails from "./pages/admin/ProjectDetails";
import Groups from "./pages/admin/Groups";
import Submissions from "./pages/admin/Submissions";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProjectDetails from "./pages/student/StudentProjectDetails";
import Tasks from "./pages/student/Tasks";
import NotFoundPage from "./pages/NotFoundPage";
import ThemeSettingsLauncher from "./components/layout/ThemeSettingsLauncher";

function HomeRedirect() {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/landing" replace />;
  return (
    <Navigate
      to={
        currentUser.role === "admin" ? "/admin/dashboard" : "/student/dashboard"
      }
      replace
    />
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route element={<RoleRoute role="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/projects" element={<Projects />} />
              <Route
                path="/admin/projects/:projectId"
                element={<ProjectDetails />}
              />
              <Route path="/admin/groups" element={<Groups />} />
              <Route path="/admin/submissions" element={<Submissions />} />
            </Route>

            <Route element={<RoleRoute role="student" />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route
                path="/student/project"
                element={<StudentProjectDetails />}
              />
              <Route path="/student/tasks" element={<Tasks />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ThemeSettingsLauncher />
    </>
  );
}

export default App;
