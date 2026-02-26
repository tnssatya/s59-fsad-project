import { Link, useParams } from 'react-router-dom'
import PageWrapper from '../../components/layout/PageWrapper'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'
import { useProjects } from '../../hooks/useProjects'
import { formatDate } from '../../utils/helpers'

function ProjectDetails() {
  const { projectId } = useParams()
  const { projects } = useProjects()
  const project = projects.find((item) => item.id === projectId)

  if (!project) {
    return <EmptyState title="Project not found" description="Select another project from Projects Management." />
  }

  return (
    <PageWrapper
      title={project.title}
      subtitle={`${project.course} • Mentor: ${project.mentor}`}
      actions={
        <>
          <Link to="/admin/groups" className="text-primary hover:underline">Manage Groups</Link>
          <Link to="/admin/submissions" className="text-primary hover:underline">Review Submissions</Link>
        </>
      }
    >
      <Card className="space-y-3">
        <p>{project.description}</p>
        <div className="grid gap-2 md:grid-cols-3">
          <p className="muted">Start: {formatDate(project.startDate)}</p>
          <p className="muted">End: {formatDate(project.endDate)}</p>
          <p className="muted">Max Group Size: {project.maxGroupSize}</p>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Milestones</h2>
        <div className="space-y-2">
          {project.milestones.map((milestone) => (
            <div key={milestone.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <div>
                <p className="font-medium">{milestone.title}</p>
                <p className="muted">{milestone.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{milestone.weight}%</Badge>
                <Badge>{milestone.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageWrapper>
  )
}

export default ProjectDetails