import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthState, LoginCredentials, AuthResponse } from '@/pages/LoginPage/api/auth.types'

const loadState = (): Partial<AuthState> => {
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
    console.log(error)
  }

  return {}
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  rememberMe: false,
  token: null,
  ...loadState(),
}

export const loginUser = createAsyncThunk<
  { user: AuthResponse; rememberMe: boolean },
  { credentials: LoginCredentials; rememberMe: boolean },
  { rejectValue: string }
>('auth/login', async ({ credentials, rememberMe }, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...credentials,
      }),
    })

    const data: AuthResponse = await response.json()

    if (!response.ok) {
      return rejectWithValue('Ошибка авторизации')
    }

    return { user: data, rememberMe }
  } catch (error) {
    console.log(error)
    return rejectWithValue('Ошибка авторизации')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.rememberMe = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_user')
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, rememberMe } = action.payload

        state.isLoading = false
        state.user = user
        state.token = user.accessToken
        state.rememberMe = rememberMe
        state.error = null

        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('auth_token', user.accessToken)
        storage.setItem('auth_user', JSON.stringify(user))

        if (!rememberMe) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка авторизации'
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
