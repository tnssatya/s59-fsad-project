import { cn } from '../../utils/cn'

const variants = {
  default: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  danger: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
}

function Badge({ children, variant = 'default', className }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  )
}

export default Badge