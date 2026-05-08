// src/App.tsx
import { useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { useAuthStore } from './store/authStore'

export default function App() {
  const token = useAuthStore((state) => state.token)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    if (!token) return

    // TODO: descomentar cuando backend esté listo
    // import api from './services/api'
    // api.get('/auth/me')
    //   .then((res) => useAuthStore.setState({ user: res.data }))
    //   .catch(() => logout())

    // temporal — leer usuario de localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      useAuthStore.setState({ user: JSON.parse(savedUser) })
    } else {
      logout()
    }
  }, [])

  return <AppRouter />
}