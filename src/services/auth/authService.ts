// src/services/auth/authService.ts
import type { User } from '../../store/authStore'
import { FirebaseAuthProvider } from './FirebaseAuthProvider'
import type { IAuthProvider } from './IAuthProvider'
import api from '../api'

const provider: IAuthProvider = new FirebaseAuthProvider()



export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user: User }> => {
  // 1. Firebase verifica credenciales y devuelve token
  const { token } = await provider.login(email, password)

  // 2. guardamos token para que Axios lo adjunte en el siguiente request
  localStorage.setItem('token', token)

  // 3. backend verifica token y devuelve datos reales del usuario de MySQL
  const { data: user } = await api.post('/auth/login')
  localStorage.setItem('user', JSON.stringify(user))
  return { token, user }
}

export const logout = async (): Promise<void> => {
  await provider.logout()
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}