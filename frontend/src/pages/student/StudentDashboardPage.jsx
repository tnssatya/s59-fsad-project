import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import StatCard from "../../components/StatCard";

function StudentDashboardPage() {
  const { currentUser } = useAuth();
  const { projects, countTaskProgress } = useProjects();

  const myProjects = projects.filter((project) =>
    project.groups.some((group) => group.memberIds.includes(currentUser.id)),
  );

  const myTasks = myProjects.flatMap((project) =>
    project.tasks.filter((task) => task.assigneeId === currentUser.id),
  );

  const completed = myTasks.filter((task) => task.status === "Done").length;

  return (
    <section className="page-grid">
      <div className="page-head">
        <h1>Student Dashboard</h1>
        <Link className="btn btn-primary" to="/student/projects">
          View My Projects
        </Link>
      </div>

      <div className="stats-grid">
        <StatCard label="Joined Projects" value={myProjects.length} />
        <StatCard label="My Tasks" value={myTasks.length} />
        <StatCard label="Completed Tasks" value={completed} />
      </div>

      <article className="panel">
        <h2>Active Projects</h2>
        {myProjects.length === 0 ? (
          <p className="muted">You are not assigned to any project yet.</p>
        ) : (
          myProjects.map((project) => (
            <div key={project.id} className="list-row">
              <div>
                <h3>{project.title}</h3>
                <p className="muted">
                  Progress: {countTaskProgress(project.tasks)}%
                </p>
              </div>
              <Link to={`/student/projects/${project.id}`}>Open</Link>
            </div>
          ))
        )}
      </article>
    </section>
  );
}

export default StudentDashboardPage;
