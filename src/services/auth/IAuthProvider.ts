// src/services/auth/IAuthProvider.ts
export interface IAuthProvider {
  login(email: string, password: string): Promise<{ token: string }>
  logout(): Promise<void>
}