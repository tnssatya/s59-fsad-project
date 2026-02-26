import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function RoleRoute({ role }) {
  const { currentUser } = useAuth()

  if (!currentUser) return <Navigate to="/login" replace />
  if (currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />
  }

  return <Outlet />
}

export default RoleRoute