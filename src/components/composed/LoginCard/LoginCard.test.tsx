// src/components/composed/LoginCard/LoginCard.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import LoginCard from './LoginCard';

// 1. Mockeamos los componentes visuales externos y los assets
vi.mock('../../shared/ErrorBanner', () => ({
  default: ({ message }: any) => <div data-testid="error-banner">{message}</div>
}));

vi.mock('../../LogoMark/LogoMark', () => ({
  default: () => <div data-testid="logo-mark" />
}));

vi.mock('../../../assets/icons/eye.svg', () => ({ default: 'eye-icon.svg' }));
vi.mock('../../../assets/icons/eye-off.svg', () => ({ default: 'eye-off-icon.svg' }));

describe('Componente: LoginCard', () => {

  const mockOnLogin = vi.fn();

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar el formulario inicial correctamente', () => {
    render(<LoginCard onLogin={mockOnLogin} />);

    expect(screen.getByTestId('logo-mark')).toBeDefined();
    expect(screen.getByText('Portal Ejecutivo de Análisis de Vacunas')).toBeDefined();
    
    // Verificamos que los inputs estén presentes
    expect(screen.getByLabelText(/correo electrónico/i)).toBeDefined();
    expect(screen.getByLabelText('Contraseña', { selector: 'input' })).toBeDefined();
    
    // Verificamos el botón de submit
    expect(screen.getByRole('button', { name: /accede al dashboard/i })).toBeDefined();
  });

  it('debe mostrar error local y NO llamar a la API si se envía con campos vacíos', async () => {
    render(<LoginCard onLogin={mockOnLogin} />);

    const botonSubmit = screen.getByRole('button', { name: /accede al dashboard/i });
    
    // Hacemos clic sin llenar nada
    fireEvent.click(botonSubmit);

    // Debe mostrar el mensaje de validación local
    expect(screen.getByText(/correo y\/o contraseña incorrectos/i)).toBeDefined();
    
    // La función que hace la petición NO debió llamarse
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('debe enviar los datos correctamente y cambiar al estado de carga', async () => {
    // Configuramos el mock para que la promesa se resuelva exitosamente
    mockOnLogin.mockResolvedValueOnce(undefined);

    render(<LoginCard onLogin={mockOnLogin} />);

    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputPassword = screen.getByLabelText('Contraseña', { selector: 'input' });
    const botonSubmit = screen.getByRole('button', { name: /accede al dashboard/i });

    // Llenamos el formulario
    fireEvent.change(inputEmail, { target: { value: 'admin@farmacov.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });

    // Enviamos
    fireEvent.click(botonSubmit);

    // Verificamos que se hayan pasado los parámetros exactos a la API
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith('admin@farmacov.com', '123456');

    // Evaluamos el cambio dinámico del botón mientras "carga"
    expect(screen.getByRole('button', { name: /accediendo/i })).toBeDefined();
  });

  it('debe mostrar el error de validación en el formulario si la API devuelve un error de autenticación (ej. 401)', async () => {
    // Simulamos un error 401 del backend
    mockOnLogin.mockRejectedValueOnce({ status: 401 });

    render(<LoginCard onLogin={mockOnLogin} />);

    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputPassword = screen.getByLabelText('Contraseña', { selector: 'input' });
    const botonSubmit = screen.getByRole('button', { name: /accede al dashboard/i });

    fireEvent.change(inputEmail, { target: { value: 'usuario@invalido.com' } });
    fireEvent.change(inputPassword, { target: { value: 'mal' } });
    fireEvent.click(botonSubmit);

    // waitFor nos ayuda a esperar a que la promesa rechazada actualice el estado de React
    await waitFor(() => {
      expect(screen.getByText(/correo y\/o contraseña incorrectos/i)).toBeDefined();
    });
    
    // Verificamos que el botón vuelve a su estado normal (dejó de cargar)
    expect(screen.getByRole('button', { name: /accede al dashboard/i })).toBeDefined();
  });

  it('debe mostrar la pantalla de ErrorBanner ante una falla de servidor y permitir regresar', async () => {
    // Simulamos un error genérico 500 (falla de red o servidor caído)
    mockOnLogin.mockRejectedValueOnce({ status: 500 });

    render(<LoginCard onLogin={mockOnLogin} />);

    const inputEmail = screen.getByLabelText(/correo electrónico/i);
    const inputPassword = screen.getByLabelText('Contraseña', { selector: 'input' });
    const botonSubmit = screen.getByRole('button', { name: /accede al dashboard/i });

    fireEvent.change(inputEmail, { target: { value: 'test@farmacov.com' } });
    fireEvent.change(inputPassword, { target: { value: 'pass' } });
    fireEvent.click(botonSubmit);

    // Esperamos a que la UI cambie a la pantalla de error del sistema
    await waitFor(() => {
      expect(screen.getByTestId('error-banner')).toBeDefined();
    });

    // En esta vista ya no debería existir el input de email
    expect(screen.queryByLabelText(/correo electrónico/i)).toBeNull();

    // Ahora hacemos clic en "Regresar" para probar el reseteo
    const botonRegresar = screen.getByRole('button', { name: /regresar/i });
    fireEvent.click(botonRegresar);

    // Verificamos que el formulario vuelve a aparecer limpio
    const inputEmailLimpio = screen.getByLabelText(/correo electrónico/i) as HTMLInputElement;
    expect(inputEmailLimpio).toBeDefined();
    expect(inputEmailLimpio.value).toBe('');
    
    // El banner de error debe haber desaparecido
    expect(screen.queryByTestId('error-banner')).toBeNull();
  });
});