import { baseApi } from '@/app/baseApi/baseApi'
import type { AuthResponse, AuthState, LoginCredentials } from './auth.types'



const loadInitialState = (): Partial<AuthState> => {
  try {
    const localToken = localStorage.getItem('auth_token')
    const localUser = localStorage.getItem('auth_user')

    if (localToken && localUser) {
      return {
        token: localToken,
        user: JSON.parse(localUser),
        rememberMe: true,
      }
    }

    const sessionToken = sessionStorage.getItem('auth_token')
    const sessionUser = sessionStorage.getItem('auth_user')

    if (sessionToken && sessionUser) {
      return {
        token: sessionToken,
        user: JSON.parse(sessionUser),
        rememberMe: false,
      }
    }
  } catch (error) {
    console.error('Error loading auth state:', error)
  }

  return {}
}

import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    ...loadInitialState(),
  } as AuthState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setAuth: (state, action) => {
      const { user, rememberMe } = action.payload
      state.user = user
      state.token = user.accessToken
      state.rememberMe = rememberMe
      state.isLoading = false
      state.error = null
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.rememberMe = false
      state.isLoading = false
      state.error = null
    },
  },
})

export const { setLoading, setError, setAuth, clearAuth } = authSlice.actions
export const authReducer = authSlice.reducer

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
      onQueryStarted: async (args, { queryFulfilled, dispatch }) => {
        try {
          dispatch(setLoading(true))

          const { data: user } = await queryFulfilled
          const { rememberMe = false } = args

          const storage = rememberMe ? localStorage : sessionStorage
          storage.setItem('auth_token', user.accessToken)
          storage.setItem('auth_user', JSON.stringify(user))

          if (!rememberMe) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
          }

          dispatch(setAuth({ user, rememberMe }))
        } catch (error) {
          dispatch(setError('Ошибка авторизации'))
          console.error('Login failed:', error)
        } finally {
          dispatch(setLoading(false))
        }
      },
    }),

    logout: builder.mutation<void, void>({
      queryFn: () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        sessionStorage.removeItem('auth_token')
        sessionStorage.removeItem('auth_user')
        return { data: undefined }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(clearAuth())
        } catch (error) {
          console.error('Logout failed:', error)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApi
