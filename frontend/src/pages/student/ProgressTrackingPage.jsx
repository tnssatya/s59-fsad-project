import { useParams } from "react-router-dom";
import ProgressCharts from "../../components/ProgressCharts";
import { useProjects } from "../../hooks/useProjects";

function ProgressTrackingPage() {
  const { projectId } = useParams();
  const { projects, countTaskProgress } = useProjects();
  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  return (
    <section className="page-grid">
      <article className="panel">
        <h1>Progress Tracking - {project.title}</h1>
        <p className="muted">
          Overall completion: {countTaskProgress(project.tasks)}%
        </p>
      </article>
      <ProgressCharts tasks={project.tasks} />
    </section>
  );
}

export default ProgressTrackingPage;
