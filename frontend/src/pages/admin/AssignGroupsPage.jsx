import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { useProjects } from "../../hooks/useProjects";

function AssignGroupsPage() {
  const { projectId } = useParams();
  const { students } = useAuth();
  const { projects, assignStudentToGroup, createGroup } = useProjects();
  const [groupName, setGroupName] = useState("");
  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  if (!project) {
    return <section className="panel">Project not found.</section>;
  }

  const onDrop = (event, groupId) => {
    event.preventDefault();
    const studentId = event.dataTransfer.getData("studentId");
    if (!studentId) return;
    assignStudentToGroup(project.id, studentId, groupId);
  };

  return (
    <section className="page-grid">
      <h1>Assign Students to Groups</h1>

      <article className="panel">
        <h2>Student List (drag to group)</h2>
        <div className="chip-wrap">
          {students.map((student) => (
            <div
              key={student.id}
              className="chip draggable"
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData("studentId", student.id)
              }
            >
              {student.name}
            </div>
          ))}
        </div>
      </article>

      <article className="panel">
        <h2>Groups</h2>
        <form
          className="inline-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!groupName.trim()) return;
            createGroup(project.id, groupName.trim());
            setGroupName("");
          }}
        >
          <input
            placeholder="New group name"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <Button iconLeft={FiPlus} type="submit">
            Add Group
          </Button>
        </form>

        <div className="group-grid">
          {project.groups.map((group) => (
            <div
              key={group.id}
              className="group-drop"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onDrop(event, group.id)}
            >
              <h3>{group.name}</h3>
              {group.memberIds.length === 0 ? (
                <p className="muted">Drop students here</p>
              ) : (
                group.memberIds.map((memberId) => {
                  const member = students.find(
                    (student) => student.id === memberId,
                  );
                  return (
                    <p key={memberId} className="chip">
                      {member?.name || "Unknown student"}
                    </p>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default AssignGroupsPage;
