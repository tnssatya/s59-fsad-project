import { useMemo, useState } from "react";
import { FiCheck, FiEye } from "react-icons/fi";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Select from "../../components/ui/Select";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useProjects } from "../../hooks/useProjects";
import { formatDate, statusToBadgeVariant } from "../../utils/helpers";

function Submissions() {
  const { projects, reviewSubmission } = useProjects();
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("Not reviewed");
  const [feedback, setFeedback] = useState("");

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  if (!project) return null;

  return (
    <PageWrapper
      title="Review & Feedback"
      subtitle="Inspect group submissions and update review status."
    >
      <Card className="space-y-3">
        <Select
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
        >
          {projects.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>

        <div className="space-y-2">
          {project.submissions.map((submission) => {
            const group = project.groups.find(
              (item) => item.id === submission.groupId,
            );
            return (
              <button
                key={submission.id}
                onClick={() => {
                  setSelected(submission);
                  setStatus(submission.status);
                  setFeedback(submission.feedback || "");
                }}
                className="w-full rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-2 font-medium">
                    <FiEye className="h-4 w-4" />
                    {group?.name}
                  </p>
                  <Badge variant={statusToBadgeVariant(submission.status)}>
                    {submission.status}
                  </Badge>
                </div>
                <p className="muted mt-1">
                  Last submitted: {formatDate(submission.lastSubmittedAt)}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <Modal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Submission Review"
        side
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Submitted files</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.files.map((file) => (
                  <a
                    key={file}
                    href="#"
                    className="rounded bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800"
                  >
                    {file}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">Description</p>
              <p className="muted mt-1">{selected.description}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option>Not reviewed</option>
                <option>In review</option>
                <option>Approved</option>
                <option>Changes required</option>
              </Select>
              <label className="text-sm">Teacher feedback</label>
              <textarea
                className="min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
              />
              <Button
                className="w-full"
                iconLeft={FiCheck}
                onClick={() => {
                  reviewSubmission(project.id, selected.id, status, feedback);
                  setSelected(null);
                }}
              >
                Save Review
              </Button>
            </div>

            <div>
              <p className="text-sm font-semibold">Submission Timeline</p>
              <div className="mt-2 space-y-2 border-l border-slate-300 pl-3 dark:border-slate-700">
                {selected.history.map((event, index) => (
                  <div key={index} className="relative">
                    <span className="absolute -left-4.5 top-1 h-2 w-2 rounded-full bg-primary" />
                    <p className="text-sm">{event.text}</p>
                    <p className="muted">{formatDate(event.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </PageWrapper>
  );
}

export default Submissions;
