import { Link } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import StatsCards from '../../components/dashboard/StatsCards'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import { calculateProjectProgress, formatDate } from '../../utils/helpers'

function StudentDashboard() {
  const { currentUser } = useAuth()
  const { projects } = useProjects()

  const myProjects = projects.filter((project) =>
    project.groups.some((group) => group.memberIds.includes(currentUser.id)),
  )
  const myTasks = myProjects.flatMap((project) =>
    project.tasks.filter((task) => task.assigneeId === currentUser.id),
  )
  const pendingTasks = myTasks.filter((task) => task.status !== 'Done').length
  const upcoming = myTasks.filter((task) => task.status !== 'Done').slice(0, 5)

  return (
    <PageWrapper title="Student Dashboard" subtitle="Track your projects, tasks, and milestones at a glance.">
      <StatsCards
        items={[
          { label: 'Active Projects', value: myProjects.length },
          { label: 'Pending Tasks', value: pendingTasks },
          { label: 'Upcoming Deadlines', value: upcoming.length },
          { label: 'Group Messages', value: myProjects.reduce((sum, project) => sum + project.comments.length, 0) },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">My Projects</h2>
          {myProjects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              description="No projects yet. Ask your teacher to assign one."
            />
          ) : (
            myProjects.map((project) => (
              <div key={project.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold">{project.title}</p>
                  <Badge variant="info">{calculateProjectProgress(project)}%</Badge>
                </div>
                <p className="muted">Mentor: {project.mentor}</p>
                <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${calculateProjectProgress(project)}%` }} />
                </div>
                <Link className="mt-2 inline-block text-sm text-primary hover:underline" to="/student/project">
                  Open Project
                </Link>
              </div>
            ))
          )}
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Today / This Week</h2>
          {upcoming.length === 0 ? (
            <p className="muted">All clear for now.</p>
          ) : (
            upcoming.map((task) => (
              <label key={task.id} className="flex items-start gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <input type="checkbox" checked={task.status === 'Done'} readOnly className="mt-1" />
                <span>
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="muted">Due {formatDate(task.dueDate)}</p>
                </span>
              </label>
            ))
          )}
        </Card>
      </div>
    </PageWrapper>
  )
}

export default StudentDashboard