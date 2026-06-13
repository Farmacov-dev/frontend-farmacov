// src/App.tsx
import { useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { useAuthStore } from './store/authStore'
import api from './services/api'

export default function App() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (!token) return

    api.get('/auth/me')
      .then((res) => {
        useAuthStore.setState({ user: res.data })
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(() => {
        // fallback — no llamar logout() para evitar bucle
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          useAuthStore.setState({ user: JSON.parse(savedUser) })
        } else {
          // solo si no hay usuario guardado limpiamos
          localStorage.removeItem('token')
          useAuthStore.setState({ 
            token: null, 
            isAuthenticated: false, 
            user: null 
          })
        }
      })
  }, [])

  return <AppRouter />
}