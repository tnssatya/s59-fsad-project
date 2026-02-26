import { cn } from '../../utils/cn'

function Card({ className, children }) {
  return <section className={cn('panel', className)}>{children}</section>
}

export default Card