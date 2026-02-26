import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiEdit2,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import PageWrapper from "../../components/layout/PageWrapper";
import { useProjects } from "../../hooks/useProjects";
import { calculateProjectProgress, formatDate } from "../../utils/helpers";

const emptyMilestone = {
  title: "",
  description: "",
  dueDate: "",
  weight: 10,
  status: "Pending",
};

function Projects() {
  const { projects, createProject, updateProject } = useProjects();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [course, setCourse] = useState("all");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    course: "",
    startDate: "",
    endDate: "",
    maxGroupSize: 4,
    milestones: [emptyMilestone],
  });

  const courses = Array.from(
    new Set(projects.map((project) => project.course)),
  );

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const bySearch = project.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const byStatus = status === "all" || project.status === status;
        const byCourse = course === "all" || project.course === course;
        return bySearch && byStatus && byCourse;
      }),
    [projects, search, status, course],
  );

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      course: "",
      startDate: "",
      endDate: "",
      maxGroupSize: 4,
      milestones: [emptyMilestone],
    });
    setStep(1);
    setEditProject(null);
  };

  const onSave = async () => {
    if (!form.title || !form.course || !form.startDate || !form.endDate) {
      toast.error("Please complete required fields");
      return;
    }

    if (editProject) {
      updateProject({ ...editProject, ...form });
      toast.success("Project updated");
      setOpen(false);
      resetForm();
      return;
    }

    await createProject(form);
    toast.success("Project created");
    setOpen(false);
    resetForm();
  };

  return (
    <PageWrapper
      title="Projects Management"
      subtitle="Create, edit, and monitor projects by course and status."
      actions={
        <Button
          iconLeft={FiPlus}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          New Project
        </Button>
      }
    >
      <Card className="space-y-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
              placeholder="Search project"
            />
          </div>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">All status</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </Select>
          <Select
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="all">All courses</option>
            {courses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left dark:border-slate-700">
                {[
                  "Project",
                  "Course",
                  "Groups",
                  "Progress",
                  "Due Date",
                  "Status",
                  "Actions",
                ].map((title) => (
                  <th key={title} className="px-3 py-2 font-semibold">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="px-3 py-2">{project.title}</td>
                  <td className="px-3 py-2">{project.course}</td>
                  <td className="px-3 py-2">{project.groups.length}</td>
                  <td className="px-3 py-2">
                    {calculateProjectProgress(project)}%
                  </td>
                  <td className="px-3 py-2">{formatDate(project.endDate)}</td>
                  <td className="px-3 py-2">{project.status}</td>
                  <td className="px-3 py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconLeft={FiEdit2}
                      onClick={() => {
                        setEditProject(project);
                        setForm({ ...project });
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={editProject ? "Edit Project" : "Create Project"}
      >
        <div className="mb-3 flex gap-2 text-xs">
          <span
            className={`rounded px-2 py-1 ${step === 1 ? "bg-primary text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"}`}
          >
            1. Details
          </span>
          <span
            className={`rounded px-2 py-1 ${step === 2 ? "bg-primary text-white" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"}`}
          >
            2. Milestones
          </span>
        </div>

        {step === 1 ? (
          <div className="grid gap-3">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
            />
            <Input
              placeholder="Course"
              value={form.course}
              onChange={(event) =>
                setForm({ ...form, course: event.target.value })
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
              <Input
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm({ ...form, startDate: event.target.value })
                }
              />
              <Input
                type="date"
                value={form.endDate}
                onChange={(event) =>
                  setForm({ ...form, endDate: event.target.value })
                }
              />
            </div>
            <Input
              type="number"
              min={2}
              max={10}
              value={form.maxGroupSize}
              onChange={(event) =>
                setForm({ ...form, maxGroupSize: Number(event.target.value) })
              }
            />
          </div>
        ) : (
          <div className="space-y-3">
            {form.milestones.map((milestone, index) => (
              <Card
                key={index}
                className="space-y-2 border border-slate-200 dark:border-slate-700"
              >
                <Input
                  placeholder="Milestone title"
                  value={milestone.title}
                  onChange={(event) => {
                    const next = [...form.milestones];
                    next[index].title = event.target.value;
                    setForm({ ...form, milestones: next });
                  }}
                />
                <Input
                  placeholder="Description"
                  value={milestone.description}
                  onChange={(event) => {
                    const next = [...form.milestones];
                    next[index].description = event.target.value;
                    setForm({ ...form, milestones: next });
                  }}
                />
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    type="date"
                    value={milestone.dueDate}
                    onChange={(event) => {
                      const next = [...form.milestones];
                      next[index].dueDate = event.target.value;
                      setForm({ ...form, milestones: next });
                    }}
                  />
                  <Input
                    type="number"
                    value={milestone.weight}
                    onChange={(event) => {
                      const next = [...form.milestones];
                      next[index].weight = Number(event.target.value);
                      setForm({ ...form, milestones: next });
                    }}
                  />
                </div>
              </Card>
            ))}
            <Button
              variant="ghost"
              iconLeft={FiPlus}
              onClick={() =>
                setForm({
                  ...form,
                  milestones: [...form.milestones, { ...emptyMilestone }],
                })
              }
            >
              Add Milestone
            </Button>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <Button
            variant="ghost"
            iconLeft={FiArrowLeft}
            onClick={() => setStep((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            Back
          </Button>
          {step === 1 ? (
            <Button iconRight={FiArrowRight} onClick={() => setStep(2)}>
              Next
            </Button>
          ) : (
            <Button iconLeft={FiCheck} onClick={onSave}>
              Save Project
            </Button>
          )}
        </div>
      </Modal>
    </PageWrapper>
  );
}

export default Projects;
