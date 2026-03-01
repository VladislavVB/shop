import { createBrowserRouter, Navigate } from 'react-router-dom'
import ProtectedRoute from '@/router/routes/ProtectedRoute'
import UnprotectedRoute from '@/router/routes/UnprotectedRoute'
import LoginPage from '@/pages/LoginPage/LoginPage'
import ProductsPage from '@/pages/ProductsPage/ProductsPage'
import AddProductPage from '@/pages/AddProductPage/AddProductPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="products" replace />,
  },
  {
    path: '/login',
    element: (
      <UnprotectedRoute needsRedirect>
        <LoginPage />
      </UnprotectedRoute>
    ),
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/add-product',
    element: (
      <ProtectedRoute>
        <AddProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
