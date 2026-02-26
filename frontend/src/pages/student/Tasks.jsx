import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

function Tasks() {
  const { currentUser, users } = useAuth();
  const { projects, createTask, updateTask, deleteTask } = useProjects();
  const [open, setOpen] = useState(false);
  const [panelTask, setPanelTask] = useState(null);
  const [editTask, setEditTask] = useState(null);

  const project = useMemo(
    () =>
      projects.find((item) =>
        item.groups.some((group) => group.memberIds.includes(currentUser.id)),
      ) || projects[0],
    [projects, currentUser.id],
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    assigneeId: currentUser.id,
    dueDate: "",
    priority: "Medium",
    tag: "General",
    status: "To Do",
  });

  const save = () => {
    if (!form.title || !form.dueDate) {
      toast.error("Title and due date are required");
      return;
    }

    if (editTask) {
      updateTask(project.id, editTask.id, form, "Task updated");
      toast.success("Task updated");
    } else {
      createTask(project.id, form);
      toast.success("Task created");
    }

    setForm({ ...form, title: "", description: "", dueDate: "" });
    setEditTask(null);
    setOpen(false);
  };

  return (
    <PageWrapper
      title="Task Management"
      subtitle="Plan tasks, assign ownership, and track activity logs."
      actions={
        <Button iconLeft={FiPlus} onClick={() => setOpen(true)}>
          Add Task
        </Button>
      }
    >
      <Card className="space-y-2">
        {project.tasks.map((task) => {
          const assignee = users.find((user) => user.id === task.assigneeId);
          return (
            <div
              key={task.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="muted">
                  {assignee?.name} • {task.tag}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{task.priority}</Badge>
                <Badge>{task.status}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={FiEdit2}
                  onClick={() => {
                    setEditTask(task);
                    setForm({ ...task });
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconLeft={FiEye}
                  onClick={() => setPanelTask(task)}
                >
                  Details
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  iconLeft={FiTrash2}
                  onClick={() => {
                    deleteTask(project.id, task.id);
                    toast.success("Task deleted");
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </Card>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={editTask ? "Edit Task" : "Add Task"}
      >
        <div className="grid gap-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
          />
          <textarea
            className="min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder="Description"
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              value={form.assigneeId}
              onChange={(event) =>
                setForm({ ...form, assigneeId: event.target.value })
              }
            >
              {users
                .filter((user) => user.role === "student")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </Select>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm({ ...form, dueDate: event.target.value })
              }
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Select
              value={form.priority}
              onChange={(event) =>
                setForm({ ...form, priority: event.target.value })
              }
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Select>
            <Input
              value={form.tag}
              onChange={(event) =>
                setForm({ ...form, tag: event.target.value })
              }
              placeholder="Tag"
            />
            <Select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </Select>
          </div>
          <Button iconLeft={FiCheck} onClick={save}>
            Save Task
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(panelTask)}
        onClose={() => setPanelTask(null)}
        title="Task Details"
        side
      >
        {panelTask && (
          <div className="space-y-3">
            <p className="text-lg font-semibold">{panelTask.title}</p>
            <p className="muted">{panelTask.description}</p>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Activity Log</p>
              {(panelTask.logs || []).map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
}

export default Tasks;
