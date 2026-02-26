import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import StatCard from "../../components/StatCard";
import ProjectTable from "../../components/ProjectTable";

function AdminDashboardPage() {
  const { projects, countTaskProgress, deleteProject } = useProjects();

  const totalTasks = projects.reduce(
    (sum, project) => sum + project.tasks.length,
    0,
  );
  const totalSubmissions = projects.reduce(
    (sum, project) => sum + project.submissions.length,
    0,
  );

  const progressByProject = (project) => countTaskProgress(project.tasks);

  return (
    <section className="page-grid">
      <div className="page-head">
        <h1>Admin Dashboard</h1>
        <Link className="btn btn-primary" to="/admin/create-project">
          Create New Project
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard label="Total Projects" value={projects.length} />
        <StatCard label="Total Tasks" value={totalTasks} />
        <StatCard label="Submissions" value={totalSubmissions} />
      </div>

      <article className="panel">
        <h2>All Projects</h2>
        <ProjectTable
          projects={projects}
          progressByProject={progressByProject}
          onDelete={deleteProject}
        />
      </article>
    </section>
  );
}

export default AdminDashboardPage;
