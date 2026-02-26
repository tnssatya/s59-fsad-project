import { useMemo, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import KanbanBoard from "../../components/KanbanBoard";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

function TaskManagementPage() {
  const { projectId } = useParams();
  const { students } = useAuth();
  const { projects, createTask, updateTask, deleteTask } = useProjects();

  const [form, setForm] = useState({
    title: "",
    description: "",
    assigneeId: "",
    deadline: "",
    priority: "Medium",
  });

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const submitTask = (event) => {
    event.preventDefault();
    createTask(project.id, form);
    setForm({
      title: "",
      description: "",
      assigneeId: "",
      deadline: "",
      priority: "Medium",
    });
  };

  return (
    <section className="page-grid">
      <article className="panel">
        <h1>Task Assignment - {project.title}</h1>
        <form className="form-grid" onSubmit={submitTask}>
          <label>
            Task Title
            <input
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
          </label>
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              required
            />
          </label>
          <label>
            Assignee
            <select
              value={form.assigneeId}
              onChange={(event) =>
                setForm({ ...form, assigneeId: event.target.value })
              }
              required
            >
              <option value="">Select member</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Deadline
            <input
              type="date"
              value={form.deadline}
              onChange={(event) =>
                setForm({ ...form, deadline: event.target.value })
              }
              required
            />
          </label>
          <label>
            Priority
            <select
              value={form.priority}
              onChange={(event) =>
                setForm({ ...form, priority: event.target.value })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <Button iconLeft={FiPlus} type="submit">
            Add Task
          </Button>
        </form>
      </article>

      <KanbanBoard
        tasks={project.tasks}
        users={students}
        onMove={(task, status) => updateTask(project.id, task.id, { status })}
      />

      <article className="panel">
        <h2>Task List (CRUD)</h2>
        {project.tasks.map((task) => (
          <div key={task.id} className="list-row">
            <div>
              <h4>{task.title}</h4>
              <p className="muted">{task.status}</p>
            </div>
            <Button
              variant="danger"
              size="sm"
              iconLeft={FiTrash2}
              onClick={() => deleteTask(project.id, task.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </article>
    </section>
  );
}

export default TaskManagementPage;
