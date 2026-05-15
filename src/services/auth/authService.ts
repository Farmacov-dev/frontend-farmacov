// src/services/auth/authService.ts
import type { User } from '@/store/authStore'

const MOCK_USERS: Record<string, { password: string; user: User; activo: boolean }> = {
  'jrodriguez@farmacov.com': {
    password: '12345678',
    activo: true,
    user: {
      email: 'jrodriguez@farmacov.com',
      nombre: 'Jose',
      apellidoPaterno: 'Rodriguez',
      apellidoMaterno: '',
      departamento: 'Dirección General',
      rol: 'Analisis de Farmacos',
    },
  },
  'abosquez@farmacov.com': {
    password: '12345678',
    activo: false,
    user: {
      email: 'abosquez@farmacov.com',
      nombre: 'Alejandro',
      apellidoPaterno: 'Bosquez',
      apellidoMaterno: '',
      departamento: 'Ventas',
      rol: 'Ejecutivo de Ventas',
    },
  },
}

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const mockUser = MOCK_USERS[email]

  if (!mockUser || mockUser.password !== password) {
    throw new Error('Credenciales incorrectas')
  }

  if (!mockUser.activo) {
    const error: any = new Error('Usuario no activo, contacte a su administrador')
    error.code = 'auth/user-disabled'
    throw error
  }

  const mockToken = 'mock-token-farmacov'
  localStorage.setItem('token', mockToken)
  localStorage.setItem('user', JSON.stringify(mockUser.user))
  return { token: mockToken, user: mockUser.user }
}

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}