import { FiCalendar, FiCheckCircle, FiFolder, FiMessageSquare } from 'react-icons/fi'
import Card from '../ui/Card'

const icons = [FiFolder, FiCheckCircle, FiCalendar, FiMessageSquare]

function StatsCards({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length]
        return (
          <Card key={item.label} className="transition hover:-translate-y-0.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="muted">{item.label}</p>
              <Icon className="text-lg text-primary" />
            </div>
            <h3 className="text-2xl font-semibold">{item.value}</h3>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsCards