// src/services/auth/authService.ts

// TODO: reemplazar con Firebase real antes de producción
const MOCK_CREDENTIALS = {
  email: "admin@farmacov.com",
  password: "1234",
}

export const login = async (email: string, password: string): Promise<string> => {
  // simula delay de red
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const mockToken = "mock-token-farmacov"
    localStorage.setItem("token", mockToken)
    return mockToken
  }

  throw new Error("Credenciales incorrectas")
}

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token")
  // TODO: agregar Firebase signOut antes de producción
}