import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useProjects } from "../../hooks/useProjects";

function CreateProjectPage() {
  const { createProject } = useProjects();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    maxGroupSize: 4,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const project = createProject(form);
    navigate(`/admin/assign-groups/${project.id}`);
  };

  return (
    <section className="panel">
      <h1>Create New Project</h1>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Title
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
          Start Date
          <input
            type="date"
            value={form.startDate}
            onChange={(event) =>
              setForm({ ...form, startDate: event.target.value })
            }
            required
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            value={form.endDate}
            onChange={(event) =>
              setForm({ ...form, endDate: event.target.value })
            }
            required
          />
        </label>
        <label>
          Max Group Size
          <input
            type="number"
            min="2"
            max="10"
            value={form.maxGroupSize}
            onChange={(event) =>
              setForm({ ...form, maxGroupSize: Number(event.target.value) })
            }
            required
          />
        </label>
        <Button iconLeft={FiCheck} type="submit">
          Save Project
        </Button>
      </form>
    </section>
  );
}

export default CreateProjectPage;
