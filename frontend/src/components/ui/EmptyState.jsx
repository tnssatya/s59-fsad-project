import { FiInbox } from 'react-icons/fi'

function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
      <FiInbox className="mx-auto mb-2 text-2xl text-slate-400" />
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="muted mt-1">{description}</p>
    </div>
  )
}

export default EmptyState