// src/services/auth/authService.ts

import type { User } from '@/store/authStore'

const MOCK_USER: User = {
  email: 'admin@farmacov.com',
  nombre: 'Angel',
  apellidoPaterno: 'Ramírez',
  apellidoMaterno: '',
  departamento: 'Dirección',
  rol: 'Director de finanzas',
}

export const login = async (email: string, password: string): Promise<{ token: string, user: User }> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email === 'admin@farmacov.com' && password === '1234') {
    const mockToken = 'mock-token-farmacov'
    localStorage.setItem('token', mockToken)
    localStorage.setItem('user', JSON.stringify(MOCK_USER))
    return { token: mockToken, user: MOCK_USER }
  }

  throw new Error('Credenciales incorrectas')
}

export const logout = async (): Promise<void> => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}