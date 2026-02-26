import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";
import { formatDate } from "../../utils/helpers";

function StudentProjectDetailsPage() {
  const { projectId } = useParams();
  const { projects, toggleMilestone } = useProjects();

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  return (
    <section className="page-grid">
      <div className="panel">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="quick-links">
          <Link to={`/student/tasks/${project.id}`}>Task Assignment</Link>
          <Link to={`/student/progress/${project.id}`}>Progress Tracking</Link>
          <Link to={`/student/chat/${project.id}`}>Group Chat</Link>
          <Link to={`/student/submit/${project.id}`}>Submit Work</Link>
          <Link to={`/projects/${project.id}`}>Shared Project Page</Link>
        </div>
      </div>

      <article className="panel">
        <h2>Milestones Timeline</h2>
        <div className="timeline">
          {project.milestones.map((milestone) => (
            <label key={milestone.id} className="timeline-item">
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={() => toggleMilestone(project.id, milestone.id)}
              />
              <span>
                {milestone.title} - {formatDate(milestone.dueDate)}
              </span>
            </label>
          ))}
        </div>
      </article>
    </section>
  );
}

export default StudentProjectDetailsPage;
