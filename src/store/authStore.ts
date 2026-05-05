// src/store/authStore.ts
import { create } from 'zustand'
import { login as loginService, logout as logoutService } from '../services/auth/authService'

interface User {
  email: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// forma correcta para TypeScript según documentación oficial
export const useAuthStore = create<AuthStore>()((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,

  login: async (email, password) => {
    const token = await loginService(email, password)
    set({
      token,
      isAuthenticated: true,
      user: { email },
    })
  },

  logout: async () => {
    await logoutService()
    set({
      token: null,
      isAuthenticated: false,
      user: null,
    })
  },
}))