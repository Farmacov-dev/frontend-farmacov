// src/store/authStore.ts
import { create } from 'zustand'
import { login as loginService, logout as logoutService } from '../services/auth/authService'

export interface User {
  email: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno?: string
  departamento?: string
  rol: string
  esAdmin: boolean
  permisos: {
    dashboard: boolean
    catalogo: boolean
    analisis: boolean
  }
}

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set) => {
  // Load persisted data from localStorage on initialization
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  const user = userStr ? JSON.parse(userStr) : null

  return {
    token,
    isAuthenticated: !!token,
    user,

    login: async (email, password) => {
      const { token, user } = await loginService(email, password)
      set({ token, isAuthenticated: true, user })
    },

    logout: async () => {
      await logoutService()
      set({ token: null, isAuthenticated: false, user: null })
    },
  }
})