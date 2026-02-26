import { useMemo } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard from "../../components/KanbanBoard";
import ProgressCharts from "../../components/ProgressCharts";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import { formatDate } from "../../utils/helpers";

function SharedProjectPage() {
  const { projectId } = useParams();
  const { users } = useAuth();
  const { projects, updateTask, toggleMilestone } = useProjects();

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const members = project.groups.flatMap((group) => group.memberIds);

  return (
    <section className="page-grid">
      <article className="panel">
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </article>

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

      <article className="panel">
        <h2>Group Members</h2>
        <div className="chip-wrap">
          {members.map((memberId) => {
            const user = users.find((item) => item.id === memberId);
            return (
              <span className="chip" key={memberId}>
                {user?.name || "Unknown"} (Student)
              </span>
            );
          })}
        </div>
      </article>

      <KanbanBoard
        tasks={project.tasks}
        users={users}
        onMove={(task, status) => updateTask(project.id, task.id, { status })}
      />

      <ProgressCharts tasks={project.tasks} />

      <article className="panel">
        <h2>File Submissions Area</h2>
        {project.submissions.length === 0 ? (
          <p className="muted">No submissions yet.</p>
        ) : (
          project.submissions.map((submission) => (
            <div key={submission.id} className="list-row">
              <div>
                <h4>{submission.fileName}</h4>
                <p className="muted">Grade: {submission.grade || "Pending"}</p>
              </div>
              <span>{formatDate(submission.submittedAt)}</span>
            </div>
          ))
        )}
      </article>
    </section>
  );
}

export default SharedProjectPage;
