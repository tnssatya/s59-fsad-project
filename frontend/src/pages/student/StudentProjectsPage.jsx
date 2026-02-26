import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

function StudentProjectsPage() {
  const { currentUser } = useAuth();
  const { projects, countTaskProgress } = useProjects();

  const myProjects = projects.filter((project) =>
    project.groups.some((group) => group.memberIds.includes(currentUser.id)),
  );

  return (
    <section className="panel">
      <h1>My Projects</h1>
      {myProjects.length === 0 ? (
        <p className="muted">No projects assigned.</p>
      ) : (
        <div className="cards-grid">
          {myProjects.map((project) => (
            <article className="stat-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p className="muted">
                Progress: {countTaskProgress(project.tasks)}%
              </p>
              <Link to={`/student/projects/${project.id}`}>
                Project Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default StudentProjectsPage;
