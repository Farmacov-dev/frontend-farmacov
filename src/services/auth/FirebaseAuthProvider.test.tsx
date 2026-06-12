// @vitest-environment jsdom
// src/services/auth/FirebaseAuthProvider.test.tsx
import { describe, it, expect, vi, afterEach } from 'vitest';

const { mockSignIn, mockSignOut, mockGetIdToken } = vi.hoisted(() => ({
  mockSignIn:     vi.fn(),
  mockSignOut:    vi.fn(),
  mockGetIdToken: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: mockSignIn,
  signOut:                    mockSignOut,
}));

vi.mock('../../config/firebase', () => ({
  auth: {},
}));

import { FirebaseAuthProvider } from './FirebaseAuthProvider';

describe('Servicio: FirebaseAuthProvider', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('debe llamar a signInWithEmailAndPassword con la instancia de auth, email y password', async () => {
      mockSignIn.mockResolvedValueOnce({
        user: { getIdToken: mockGetIdToken.mockResolvedValueOnce('firebase-token') },
      });

      const provider = new FirebaseAuthProvider();
      await provider.login('user@example.com', 'Pass123!');

      expect(mockSignIn).toHaveBeenCalledWith({}, 'user@example.com', 'Pass123!');
    });

    it('debe retornar el token obtenido de Firebase', async () => {
      mockSignIn.mockResolvedValueOnce({
        user: { getIdToken: mockGetIdToken.mockResolvedValueOnce('firebase-token') },
      });

      const provider = new FirebaseAuthProvider();
      const result = await provider.login('user@example.com', 'Pass123!');

      expect(result).toEqual({ token: 'firebase-token' });
    });

    it('debe propagar el error cuando signInWithEmailAndPassword falla', async () => {
      mockSignIn.mockRejectedValueOnce({ code: 'auth/user-not-found' });

      const provider = new FirebaseAuthProvider();
      await expect(provider.login('notfound@example.com', 'wrong')).rejects.toMatchObject({
        code: 'auth/user-not-found',
      });
    });

    it('debe propagar el error cuando getIdToken falla', async () => {
      mockSignIn.mockResolvedValueOnce({
        user: { getIdToken: vi.fn().mockRejectedValueOnce(new Error('Token error')) },
      });

      const provider = new FirebaseAuthProvider();
      await expect(provider.login('user@example.com', 'Pass123!')).rejects.toThrow('Token error');
    });
  });

  describe('logout', () => {
    it('debe llamar a signOut con la instancia de auth', async () => {
      mockSignOut.mockResolvedValueOnce(undefined);

      const provider = new FirebaseAuthProvider();
      await provider.logout();

      expect(mockSignOut).toHaveBeenCalledWith({});
    });

    it('debe resolver sin valor cuando el logout es exitoso', async () => {
      mockSignOut.mockResolvedValueOnce(undefined);

      const provider = new FirebaseAuthProvider();
      const result = await provider.logout();

      expect(result).toBeUndefined();
    });

    it('debe propagar el error cuando signOut falla', async () => {
      mockSignOut.mockRejectedValueOnce(new Error('Sign out failed'));

      const provider = new FirebaseAuthProvider();
      await expect(provider.logout()).rejects.toThrow('Sign out failed');
    });
  });
});
