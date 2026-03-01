export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
  }
  
  export interface AuthState {
    user: AuthResponse | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    rememberMe: boolean;
  }