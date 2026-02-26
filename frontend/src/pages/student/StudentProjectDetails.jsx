import { useMemo, useState } from "react";
import { FiArrowRight, FiSend, FiUpload } from "react-icons/fi";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Tabs } from "../../components/ui/Tabs";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";
import { formatDate, statusToBadgeVariant } from "../../utils/helpers";

const columns = ["To Do", "In Progress", "Done"];

function StudentProjectDetails() {
  const { currentUser, users } = useAuth();
  const { projects, updateTask, addComment, addSubmission } = useProjects();
  const [activeTab, setActiveTab] = useState("Overview");
  const [message, setMessage] = useState("");

  const project = useMemo(
    () =>
      projects.find((item) =>
        item.groups.some((group) => group.memberIds.includes(currentUser.id)),
      ) || projects[0],
    [projects, currentUser.id],
  );

  const myGroup =
    project.groups.find((group) => group.memberIds.includes(currentUser.id)) ||
    project.groups[0];

  const tabs = [
    "Overview",
    "Milestones",
    "Tasks",
    "Group Members",
    "Files & Submissions",
    "Comments",
  ];

  return (
    <PageWrapper title="Project Detail" subtitle={project.title}>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Overview" && (
        <Card className="space-y-3">
          <p>{project.description}</p>
          <div className="grid gap-2 md:grid-cols-3">
            <p className="muted">Mentor: {project.mentor}</p>
            <p className="muted">Start: {formatDate(project.startDate)}</p>
            <p className="muted">End: {formatDate(project.endDate)}</p>
          </div>
        </Card>
      )}

      {activeTab === "Milestones" && (
        <Card className="space-y-3">
          {project.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{milestone.title}</p>
                <Badge variant={statusToBadgeVariant(milestone.status)}>
                  {milestone.status}
                </Badge>
              </div>
              <p className="muted mt-1">{milestone.description}</p>
              <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{
                    width: `${milestone.status === "Completed" ? 100 : milestone.status === "In Progress" ? 55 : 20}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
      )}

      {activeTab === "Tasks" && (
        <div className="grid gap-3 md:grid-cols-3">
          {columns.map((column) => (
            <Card key={column} className="space-y-3">
              <h3 className="font-semibold">{column}</h3>
              {project.tasks
                .filter((task) => task.status === column)
                .map((task) => {
                  const assignee = users.find(
                    (item) => item.id === task.assigneeId,
                  );
                  return (
                    <div
                      key={task.id}
                      className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                    >
                      <p className="text-sm font-semibold">{task.title}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <Avatar name={assignee?.name} />
                        <span>{assignee?.name}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "danger"
                              : task.priority === "Medium"
                                ? "warning"
                                : "success"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <span className="muted">
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {columns
                          .filter((next) => next !== task.status)
                          .map((nextStatus) => (
                            <Button
                              key={nextStatus}
                              size="sm"
                              variant="ghost"
                              iconRight={FiArrowRight}
                              className="text-xs"
                              onClick={() =>
                                updateTask(
                                  project.id,
                                  task.id,
                                  { status: nextStatus },
                                  `Moved to ${nextStatus}`,
                                )
                              }
                            >
                              {nextStatus}
                            </Button>
                          ))}
                      </div>
                    </div>
                  );
                })}
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Group Members" && (
        <Card className="space-y-2">
          {myGroup.memberIds.map((memberId, index) => {
            const member = users.find((user) => user.id === memberId);
            return (
              <div
                key={memberId}
                className="flex items-center justify-between rounded-lg border border-slate-200 p-3 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <Avatar name={member?.name} />
                  <div>
                    <p className="text-sm font-medium">{member?.name}</p>
                    <p className="muted">{member?.email}</p>
                  </div>
                </div>
                <Badge>{index === 0 ? "Leader" : "Member"}</Badge>
              </div>
            );
          })}
        </Card>
      )}

      {activeTab === "Files & Submissions" && (
        <Card className="space-y-3">
          <Button
            iconLeft={FiUpload}
            onClick={() =>
              addSubmission(project.id, {
                groupId: myGroup.id,
                files: ["demo-upload.zip"],
                description: "Latest milestone upload",
                status: "Not reviewed",
                feedback: "",
                lastSubmittedAt: new Date().toISOString(),
                history: [
                  {
                    date: new Date().toISOString(),
                    text: "Submitted by student",
                  },
                ],
              })
            }
          >
            Mock Upload Submission
          </Button>
          {project.submissions.map((submission) => (
            <div
              key={submission.id}
              className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {submission.files.join(", ")}
                </p>
                <Badge variant={statusToBadgeVariant(submission.status)}>
                  {submission.status}
                </Badge>
              </div>
              <p className="muted mt-1">{submission.description}</p>
            </div>
          ))}
        </Card>
      )}

      {activeTab === "Comments" && (
        <Card className="space-y-3">
          <div className="max-h-80 space-y-2 overflow-auto">
            {project.comments.map((comment) => {
              const owner = users.find((user) => user.id === comment.userId);
              return (
                <div
                  key={comment.id}
                  className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                >
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-semibold">{owner?.name}</span>
                    <span className="muted">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a group message"
            />
            <Button
              iconLeft={FiSend}
              onClick={() => {
                if (!message.trim()) return;
                addComment(project.id, {
                  userId: currentUser.id,
                  text: message.trim(),
                  createdAt: new Date().toISOString(),
                });
                setMessage("");
              }}
            >
              Send
            </Button>
          </div>
        </Card>
      )}
    </PageWrapper>
  );
}

export default StudentProjectDetails;
