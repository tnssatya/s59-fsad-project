import { formatDate, findUserById } from "../utils/helpers";

function TaskCard({ task, users, onMove }) {
  const assignee = findUserById(users, task.assigneeId);

  return (
    <article className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p className="muted">Assignee: {assignee?.name || "Unassigned"}</p>
      <p className="muted">Deadline: {formatDate(task.deadline)}</p>
      <div className="task-actions">
        {task.status !== "To Do" && (
          <button
            className="btn btn-outline"
            onClick={() => onMove(task, "To Do")}
          >
            To Do
          </button>
        )}
        {task.status !== "In Progress" && (
          <button
            className="btn btn-outline"
            onClick={() => onMove(task, "In Progress")}
          >
            In Progress
          </button>
        )}
        {task.status !== "Done" && (
          <button
            className="btn btn-outline"
            onClick={() => onMove(task, "Done")}
          >
            Done
          </button>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
