import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import { lazy, Suspense, memo } from 'react'
import ProtectedRoute from '@/app/router/routes/ProtectedRoute'
import UnprotectedRoute from '@/app/router/routes/UnprotectedRoute'
import { LoadingIndicator } from '@/components/LoadingIndicator/LoadingIndicator'
import type { RouteConfig } from './router.types'

const pages = {
  Login: lazy(() => import('@/pages/LoginPage/LoginPage')),
  Products: lazy(() => import('@/pages/ProductsPage/ProductsPage')),
  AddProduct: lazy(() => import('@/pages/AddProductPage/AddProductPage')),
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PRODUCTS: '/products',
  ADD_PRODUCT: '/add-product',
} as const

const SuspenseWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingIndicator isLoading={true} description="Загрузка страницы..." />}>{children}</Suspense>
))

SuspenseWrapper.displayName = 'SuspenseWrapper'

const routesConfig: RouteConfig[] = [
  { path: ROUTES.LOGIN, component: pages.Login, unprotected: true },
  { path: ROUTES.PRODUCTS, component: pages.Products, protected: true },
  { path: ROUTES.ADD_PRODUCT, component: pages.AddProduct, protected: true },
]

const generateRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = routesConfig.map(
    ({ path, component: Component, protected: isProtected, unprotected: isUnprotected }) => {
      let element = (
        <SuspenseWrapper>
          <Component />
        </SuspenseWrapper>
      )

      if (isProtected) {
        element = <ProtectedRoute>{element}</ProtectedRoute>
      } else if (isUnprotected) {
        element = <UnprotectedRoute>{element}</UnprotectedRoute>
      }

      return { path, element }
    }
  )

  return [
    {
      path: ROUTES.HOME,
      element: <Navigate to={ROUTES.PRODUCTS} replace />,
    },
    ...routes,
    {
      path: '*',
      element: <Navigate to={ROUTES.HOME} replace />,
    },
  ]
}

export const router = createBrowserRouter(generateRoutes())
