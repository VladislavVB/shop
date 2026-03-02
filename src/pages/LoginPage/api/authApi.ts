import { baseApi } from '@/app/baseApi/baseApi'
import type { AuthResponse, LoginCredentials } from './auth.types'

export const authStorage = {
  getToken: (): string | null => {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
  },

  getUser: (): AuthResponse | null => {
    try {
      const userStr = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  },

  setAuth: (user: AuthResponse, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('auth_token', user.accessToken)
    storage.setItem('auth_user', JSON.stringify(user))

    if (!rememberMe) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  },

  clearAuth: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_user')
  },

  isAuthenticated: (): boolean => {
    return !!(localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token'))
  },
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials & { rememberMe?: boolean }>({
      query: (credentials) => {
        const { rememberMe, ...loginCredentials } = credentials
        return {
          url: 'auth/login',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: loginCredentials,
        }
      },
      transformResponse: (response: AuthResponse, _meta, arg) => {
        const { rememberMe = false } = arg
        authStorage.setAuth(response, rememberMe)
        return response
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: () => {
        authStorage.clearAuth()
        return { data: undefined }
      },
    }),

    getCurrentUser: builder.query<AuthResponse | null, void>({
      queryFn: () => {
        const user = authStorage.getUser()
        return { data: user }
      },
      providesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = authApi
