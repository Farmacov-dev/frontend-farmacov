// src/services/auth/FirebaseAuthProvider.ts
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '../../config/firebase'
import type { IAuthProvider } from './IAuthProvider'

export class FirebaseAuthProvider implements IAuthProvider {
  async login(email: string, password: string): Promise<{ token: string }> {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    const token = await credential.user.getIdToken()
    return { token }
  }

  async logout(): Promise<void> {
    await signOut(auth)
  }
}