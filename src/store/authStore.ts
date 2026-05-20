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

export const useAuthStore = create<AuthStore>()((set) => ({
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: null,

  login: async (email, password) => {
    const { token, user } = await loginService(email, password)
    set({ token, isAuthenticated: true, user })
  },

  logout: async () => {
    await logoutService()
    set({ token: null, isAuthenticated: false, user: null })
  },
}))