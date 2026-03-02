import { Navigate } from 'react-router-dom'
import { authStorage } from '@/pages/LoginPage/api/authApi'
import type { UnprotectedRouteProps } from '@/app/router/router.types'

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children, redirectTo = '/products' }) => {
  const isAuthenticated = authStorage.isAuthenticated()

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}

export default UnprotectedRoute
