// @vitest-environment jsdom
// src/services/auth/authService.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const { mockProviderLogin, mockProviderLogout, mockApiPost } = vi.hoisted(() => ({
  mockProviderLogin:  vi.fn(),
  mockProviderLogout: vi.fn(),
  mockApiPost:        vi.fn(),
}));

vi.mock('./FirebaseAuthProvider', () => ({
  FirebaseAuthProvider: function FirebaseAuthProvider() {
    return { login: mockProviderLogin, logout: mockProviderLogout };
  },
}));

vi.mock('../api', () => ({
  default: { post: mockApiPost },
}));

const mockUser = {
  email: 'test@farmacov.com',
  nombre: 'Test',
  apellidoPaterno: 'User',
  rol: 'Admin',
  esAdmin: true,
  permisos: { dashboard: true, catalogo: true, analisis: true },
};

let localStorageStore: Record<string, string> = {};
const localStorageStub = {
  getItem:    (key: string) => localStorageStore[key] ?? null,
  setItem:    (key: string, val: string) => { localStorageStore[key] = val; },
  removeItem: (key: string) => { delete localStorageStore[key]; },
  clear:      () => { localStorageStore = {}; },
};

describe('Servicio: authService', () => {
  beforeEach(() => {
    localStorageStore = {};
    vi.stubGlobal('localStorage', localStorageStub);
    mockProviderLogin.mockResolvedValue({ token: 'fake-jwt' });
    mockApiPost.mockResolvedValue({ data: mockUser });
    mockProviderLogout.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('debe llamar a FirebaseAuthProvider.login con email y password', async () => {
      const { login } = await import('./authService');
      await login('test@farmacov.com', 'Pass123!');
      expect(mockProviderLogin).toHaveBeenCalledWith('test@farmacov.com', 'Pass123!');
    });

    it('debe guardar el token en localStorage tras obtenerlo de Firebase', async () => {
      const { login } = await import('./authService');
      await login('test@farmacov.com', 'Pass123!');
      expect(localStorage.getItem('token')).toBe('fake-jwt');
    });

    it('debe llamar a api.post /auth/login después de guardar el token', async () => {
      const { login } = await import('./authService');
      await login('test@farmacov.com', 'Pass123!');
      expect(mockApiPost).toHaveBeenCalledWith('/auth/login');
    });

    it('debe guardar el usuario serializado en localStorage', async () => {
      const { login } = await import('./authService');
      await login('test@farmacov.com', 'Pass123!');
      expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockUser);
    });

    it('debe retornar token y usuario cuando el flujo es exitoso', async () => {
      const { login } = await import('./authService');
      const result = await login('test@farmacov.com', 'Pass123!');
      expect(result.token).toBe('fake-jwt');
      expect(result.user).toEqual(mockUser);
    });

    it('no debe guardar el token cuando Firebase falla', async () => {
      mockProviderLogin.mockRejectedValueOnce({ code: 'auth/invalid-credential' });
      const { login } = await import('./authService');
      await expect(login('test@farmacov.com', 'wrong')).rejects.toMatchObject({
        code: 'auth/invalid-credential',
      });
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('no debe guardar el usuario cuando api.post falla', async () => {
      mockApiPost.mockRejectedValueOnce(new Error('Backend error'));
      const { login } = await import('./authService');
      await expect(login('test@farmacov.com', 'Pass123!')).rejects.toThrow('Backend error');
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  describe('logout', () => {
    it('debe llamar a FirebaseAuthProvider.logout', async () => {
      const { logout } = await import('./authService');
      await logout();
      expect(mockProviderLogout).toHaveBeenCalledTimes(1);
    });

    it('debe eliminar el token de localStorage', async () => {
      localStorage.setItem('token', 'existing-token');
      const { logout } = await import('./authService');
      await logout();
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('debe eliminar el usuario de localStorage', async () => {
      localStorage.setItem('user', JSON.stringify(mockUser));
      const { logout } = await import('./authService');
      await logout();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});
