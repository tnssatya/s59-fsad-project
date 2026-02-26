import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

function SubmitWorkPage() {
  const { projectId } = useParams();
  const { currentUser } = useAuth();
  const { projects, addSubmission } = useProjects();
  const [form, setForm] = useState({
    milestoneId: "",
    fileName: "",
    fileNote: "",
  });

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    addSubmission(project.id, { ...form, submittedBy: currentUser.id });
    setForm({ milestoneId: "", fileName: "", fileNote: "" });
  };

  return (
    <section className="page-grid">
      <article className="panel">
        <h1>Submit Work - {project.title}</h1>
        <form className="form-grid" onSubmit={onSubmit}>
          <label>
            Milestone
            <select
              value={form.milestoneId}
              onChange={(event) =>
                setForm({ ...form, milestoneId: event.target.value })
              }
              required
            >
              <option value="">Select milestone</option>
              {project.milestones.map((milestone) => (
                <option key={milestone.id} value={milestone.id}>
                  {milestone.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            File Name
            <input
              value={form.fileName}
              onChange={(event) =>
                setForm({ ...form, fileName: event.target.value })
              }
              placeholder="prototype.zip"
              required
            />
          </label>
          <label>
            Notes
            <textarea
              value={form.fileNote}
              onChange={(event) =>
                setForm({ ...form, fileNote: event.target.value })
              }
            />
          </label>
          <Button iconLeft={FiCheck} type="submit">
            Submit
          </Button>
        </form>
      </article>

      <article className="panel">
        <h2>Submitted Files</h2>
        {project.submissions.map((submission) => (
          <div key={submission.id} className="list-row">
            <div>
              <h4>{submission.fileName}</h4>
              <p className="muted">Grade: {submission.grade || "Pending"}</p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}

export default SubmitWorkPage;
