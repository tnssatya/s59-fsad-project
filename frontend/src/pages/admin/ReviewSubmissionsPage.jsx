import { useMemo, useState } from "react";
import { FiCheck, FiEye } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import { formatDate } from "../../utils/helpers";

function ReviewSubmissionsPage() {
  const { projectId } = useParams();
  const { users } = useAuth();
  const { projects, reviewSubmission } = useProjects();
  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  const [selected, setSelected] = useState(null);
  const [grade, setGrade] = useState("A");
  const [comment, setComment] = useState("");

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const openReview = (submission) => {
    setSelected(submission);
    setGrade(submission.grade || "A");
    setComment(submission.reviewComment || "");
  };

  const saveReview = () => {
    if (!selected) return;
    reviewSubmission(project.id, selected.id, grade, comment);
    setSelected(null);
  };

  return (
    <section className="panel">
      <h1>Review Submissions - {project.title}</h1>
      {project.submissions.length === 0 ? (
        <p className="muted">No submissions yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>File</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {project.submissions.map((submission) => {
                const owner = users.find(
                  (user) => user.id === submission.submittedBy,
                );
                return (
                  <tr key={submission.id}>
                    <td>{submission.fileName}</td>
                    <td>{owner?.name || "Unknown"}</td>
                    <td>{formatDate(submission.submittedAt)}</td>
                    <td>{submission.grade || "-"}</td>
                    <td>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={FiEye}
                        onClick={() => openReview(submission)}
                      >
                        Review
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={Boolean(selected)}
        title="Grade Submission"
        onClose={() => setSelected(null)}
      >
        <label>
          Grade
          <select
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
        <label>
          Comments
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <Button iconLeft={FiCheck} onClick={saveReview}>
          Save Review
        </Button>
      </Modal>
    </section>
  );
}

export default ReviewSubmissionsPage;
