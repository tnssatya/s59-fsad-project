import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import ProgressCharts from "../../components/ProgressCharts";

function GroupProgressPage() {
  const { projectId } = useParams();
  const { students } = useAuth();
  const { projects, countTaskProgress } = useProjects();

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  return (
    <section className="page-grid">
      <h1>Group Progress - {project.title}</h1>
      <div className="stats-grid">
        <article className="stat-card">
          <p className="muted">Task Completion</p>
          <h3>{countTaskProgress(project.tasks)}%</h3>
        </article>
        <article className="stat-card">
          <p className="muted">Groups</p>
          <h3>{project.groups.length}</h3>
        </article>
      </div>

      <ProgressCharts tasks={project.tasks} />

      <article className="panel">
        <h2>Groups Overview</h2>
        <div className="group-grid">
          {project.groups.map((group) => (
            <div key={group.id} className="group-drop">
              <h3>{group.name}</h3>
              {group.memberIds.length === 0 ? (
                <p className="muted">No members assigned</p>
              ) : (
                group.memberIds.map((memberId) => {
                  const student = students.find((item) => item.id === memberId);
                  return <p key={memberId}>{student?.name || "Unknown"}</p>;
                })
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default GroupProgressPage;
