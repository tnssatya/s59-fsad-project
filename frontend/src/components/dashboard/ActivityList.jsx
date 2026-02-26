import Card from '../ui/Card'

function ActivityList({ activities }) {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li key={activity.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
            <p className="text-sm">{activity.message}</p>
            <p className="muted mt-1">{activity.time}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default ActivityList