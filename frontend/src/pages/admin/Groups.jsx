import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import { useProjects } from "../../hooks/useProjects";
import { useAuth } from "../../hooks/useAuth";

function Groups() {
  const { projects, assignStudent, addGroup } = useProjects();
  const { students } = useAuth();
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [search, setSearch] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

  const project = projects.find((item) => item.id === projectId);

  const filteredStudents = useMemo(
    () =>
      students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [students, search],
  );

  if (!project) return null;

  const onDrop = (event, groupId) => {
    event.preventDefault();
    const studentId = event.dataTransfer.getData("studentId");
    if (!studentId) return;
    assignStudent(project.id, studentId, groupId);
  };

  return (
    <PageWrapper
      title="Group & Student Assignment"
      subtitle="Drag students into groups and monitor group-level progress."
    >
      <Card className="space-y-3">
        <div className="grid gap-3 md:grid-cols-3">
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
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students"
          />
          <div className="flex gap-2">
            <Input
              value={newGroupName}
              onChange={(event) => setNewGroupName(event.target.value)}
              placeholder="New group name"
            />
            <Button
              variant="primary"
              iconLeft={FiPlus}
              onClick={() => {
                if (!newGroupName.trim()) return;
                addGroup(project.id, newGroupName.trim());
                setNewGroupName("");
              }}
            >
              Add Group
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Students</h2>
          <div className="space-y-2">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                draggable
                onDragStart={(event) =>
                  event.dataTransfer.setData("studentId", student.id)
                }
                className="flex cursor-grab items-center gap-2 rounded-lg border border-slate-200 p-2 dark:border-slate-700"
              >
                <Avatar name={student.name} />
                <div>
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="muted">{student.email}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="xl:col-span-2 grid gap-4 md:grid-cols-2">
          {project.groups.map((group) => (
            <Card
              key={group.id}
              className="space-y-3 border-dashed"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => onDrop(event, group.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{group.name}</h3>
                <Badge variant="info">{group.memberIds.length} members</Badge>
              </div>
              <p className="muted">Progress: {group.progress}%</p>
              <div className="space-y-2">
                {group.memberIds.map((memberId) => {
                  const student = students.find((item) => item.id === memberId);
                  return (
                    <div
                      key={memberId}
                      className="flex items-center gap-2 rounded bg-slate-50 p-2 dark:bg-slate-800"
                    >
                      <Avatar name={student?.name} />
                      <span className="text-sm">{student?.name}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Groups;
