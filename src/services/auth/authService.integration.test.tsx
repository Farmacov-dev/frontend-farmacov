// @vitest-environment jsdom
// src/services/auth/authService.integration.test.tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── variables hoisted para que estén disponibles en las factories de vi.mock ──
const { mockProviderLogin, mockProviderLogout, mockApiPost } = vi.hoisted(() => ({
  mockProviderLogin:  vi.fn(),
  mockProviderLogout: vi.fn(),
  mockApiPost:        vi.fn(),
}));

// ── mocks de proveedor externo (Firebase) ────────────────────────────────
vi.mock('./FirebaseAuthProvider', () => ({
  // Función regular (no arrow) para que new FirebaseAuthProvider() funcione
  FirebaseAuthProvider: function FirebaseAuthProvider() {
    return { login: mockProviderLogin, logout: mockProviderLogout };
  },
}));

// ── mock de la instancia de axios ────────────────────────────────────────
vi.mock('../api', () => ({
  default: { post: mockApiPost },
}));

// ── helpers ───────────────────────────────────────────────────────────────
const mockUser = {
  email: 'test@farmacov.com',
  nombre: 'Test',
  apellidoPaterno: 'User',
  rol: 'Admin',
  esAdmin: true,
  permisos: { dashboard: true, catalogo: true, analisis: true },
};

// Stub localStorage explícito para evitar la implementación experimental de Node.js 22
let localStorageStore: Record<string, string> = {};
const localStorageStub = {
  getItem:    (key: string) => localStorageStore[key] ?? null,
  setItem:    (key: string, val: string) => { localStorageStore[key] = val; },
  removeItem: (key: string) => { delete localStorageStore[key]; },
  clear:      () => { localStorageStore = {}; },
};

describe('Integración: authService → FirebaseAuthProvider + api', () => {
  beforeEach(() => {
    localStorageStore = {};
    vi.stubGlobal('localStorage', localStorageStub);
    mockProviderLogin.mockResolvedValue({ token: 'fake-jwt-token' });
    mockApiPost.mockResolvedValue({ data: mockUser });
    mockProviderLogout.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('login debe guardar el token y el usuario en localStorage', async () => {
    const { login } = await import('./authService');
    await login('test@farmacov.com', 'Password123!');

    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockUser);
  });

  it('login debe llamar a FirebaseAuthProvider con email y password', async () => {
    const { login } = await import('./authService');
    await login('test@farmacov.com', 'Password123!');

    expect(mockProviderLogin).toHaveBeenCalledWith('test@farmacov.com', 'Password123!');
  });

  it('login debe llamar a api.post luego de obtener el token de Firebase', async () => {
    const { login } = await import('./authService');
    await login('test@farmacov.com', 'Password123!');

    expect(mockApiPost).toHaveBeenCalledWith('/auth/login');
  });

  it('login debe retornar token y usuario cuando el flujo es exitoso', async () => {
    const { login } = await import('./authService');
    const result = await login('test@farmacov.com', 'Password123!');

    expect(result.token).toBe('fake-jwt-token');
    expect(result.user).toEqual(mockUser);
  });

  it('login debe propagare el error y no guardar token cuando FirebaseAuth falla', async () => {
    mockProviderLogin.mockRejectedValueOnce({ code: 'auth/invalid-credential' });

    const { login } = await import('./authService');
    await expect(login('test@farmacov.com', 'wrong')).rejects.toMatchObject({
      code: 'auth/invalid-credential',
    });

    expect(localStorage.getItem('token')).toBeNull();
  });

  it('logout debe llamar a FirebaseAuthProvider.logout', async () => {
    const { logout } = await import('./authService');
    await logout();

    expect(mockProviderLogout).toHaveBeenCalled();
  });

  it('logout debe limpiar token y usuario de localStorage', async () => {
    localStorage.setItem('token', 'existing-token');
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { logout } = await import('./authService');
    await logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
