import PageWrapper from '../../components/layout/PageWrapper'
import StatsCards from '../../components/dashboard/StatsCards'
import ActivityList from '../../components/dashboard/ActivityList'
import ChartCard from '../../components/dashboard/ChartCard'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Skeleton from '../../components/ui/Skeleton'
import { useProjects } from '../../hooks/useProjects'
import { usePageLoader } from '../../hooks/usePageLoader'
import { calculateProjectProgress, formatDate } from '../../utils/helpers'

function AdminDashboard() {
  const loading = usePageLoader()
  const { projects, activities } = useProjects()

  const summary = {
    totalProjects: projects.length,
    activeGroups: projects.reduce((acc, project) => acc + project.groups.length, 0),
    pendingReviews: projects.reduce(
      (acc, project) => acc + project.submissions.filter((item) => item.status !== 'Approved').length,
      0,
    ),
    upcomingDeadlines: projects.reduce(
      (acc, project) => acc + project.milestones.filter((milestone) => milestone.status !== 'Completed').length,
      0,
    ),
  }

  const chartData = projects.map((project) => ({
    name: project.title,
    progress: calculateProjectProgress(project),
  }))

  const upcomingMilestones = projects
    .flatMap((project) => project.milestones.map((milestone) => ({ ...milestone, project: project.title })))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-56" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <PageWrapper title="Admin Dashboard" subtitle="Monitor milestones, submissions and overall project health.">
      <StatsCards
        items={[
          { label: 'Total Projects', value: summary.totalProjects },
          { label: 'Active Groups', value: summary.activeGroups },
          { label: 'Pending Reviews', value: summary.pendingReviews },
          { label: 'Upcoming Deadlines', value: summary.upcomingDeadlines },
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ChartCard data={chartData} title="Project Progress" />
        </div>
        <ActivityList activities={activities.slice(0, 5)} />
      </div>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Upcoming Milestones</h2>
        <div className="space-y-2">
          {upcomingMilestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <div>
                <p className="font-medium">{milestone.title}</p>
                <p className="muted">{milestone.project}</p>
              </div>
              <Badge variant={milestone.status === 'Completed' ? 'success' : 'warning'}>
                {formatDate(milestone.dueDate)}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}

export default AdminDashboard