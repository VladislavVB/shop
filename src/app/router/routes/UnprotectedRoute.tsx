import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/app/store/index'

interface UnprotectedRouteProps {
  children: React.ReactNode
  needsRedirect?: boolean
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children, needsRedirect = false }) => {
  const { token } = useAppSelector((state) => state.auth)

  if (token && needsRedirect) {
    return <Navigate to="/products" replace />
  }

  return <>{children}</>
}

export default UnprotectedRoute
