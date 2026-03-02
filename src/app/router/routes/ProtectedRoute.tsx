import { Navigate } from 'react-router-dom'
import { authStorage } from '@/pages/LoginPage/api/authApi'
import type { ProtectedRouteProps } from '@/app/router/router.types'

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = '/login' }) => {
  const isAuthenticated = authStorage.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
