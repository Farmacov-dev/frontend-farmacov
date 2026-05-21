// src/hooks/useAuth.ts
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  return {
    user,
    isAuthenticated,
    login,
    logout,
    userName: user ? `${user.nombre} ${user.apellidoPaterno}` : '',
    userRole: user?.rol ?? '',
    isAdmin: user?.esAdmin ?? false,
    canView: (modulo: 'dashboard' | 'catalogo' | 'analisis') =>
      user?.permisos?.[modulo] ?? false,
  }
}