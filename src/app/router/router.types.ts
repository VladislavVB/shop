import type { ComponentType, ReactNode } from "react"

export interface UnprotectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export type RouteConfig = {
  path: string
  component: ComponentType
  protected?: boolean
  unprotected?: boolean
}