// src/components/primary/InputField/InputField.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import InputField from './InputField';

describe('Componente: InputField', () => {
  
  afterEach(() => {
    cleanup();
  });

  it('debe renderizar correctamente el label y vincularlo al input', () => {
    render(<InputField label="Nombre completo" />);
    
    // getByLabelText hace la magia: busca el <label>, lee su texto, y te devuelve el <input> vinculado
    const inputElement = screen.getByLabelText(/nombre completo/i);
    expect(inputElement).toBeDefined();
    expect(inputElement.getAttribute('type')).toBe('text');
  });

  it('debe aplicar las clases de error cuando la prop error es true', () => {
    render(<InputField label="Correo" error={true} />);
    
    // Buscamos el label directamente por su texto para revisar sus clases
    const labelElement = screen.getByText(/correo/i);
    expect(labelElement.className).toContain('text-red');

    // Buscamos el input y subimos un nivel al <div> contenedor para revisar el borde
    const inputElement = screen.getByLabelText(/correo/i);
    const containerElement = inputElement.parentElement;
    
    expect(containerElement?.className).toContain('border-red-light');
  });

  it('debe aplicar estilos y atributos deshabilitados si disabled es true', () => {
    render(<InputField label="Usuario" disabled={true} />);
    
    const inputElement = screen.getByLabelText(/usuario/i) as HTMLInputElement;
    const containerElement = inputElement.parentElement;

    expect(inputElement.disabled).toBe(true);
    expect(containerElement?.className).toContain('opacity-50 bg-surface');
  });

  it('no debe renderizar el boton de toggle si es password pero no se pasan iconos', () => {
    render(<InputField label="Clave secreta" type="password" />);
    
    // Si no hay icono, no debería existir ningún botón en este componente
    const toggleButton = screen.queryByRole('button');
    expect(toggleButton).toBeNull();
  });

  it('debe iniciar con type password y alternar a text al hacer clic en el boton', () => {
    const iconOn = '/eye.svg';
    const iconOff = '/eye-off.svg';

    render(
      <InputField 
        label="Contraseña" 
        type="password" 
        eyeIcon={iconOn} 
        eyeOffIcon={iconOff} 
      />
    );
    
    const inputElement = screen.getByLabelText('Contraseña') as HTMLInputElement;
    
    // RTL encuentra el botón por su aria-label (como lo leería un VoiceOver)
    const toggleButton = screen.getByRole('button', { name: /mostrar contraseña/i });
    
    // Como recordamos del botón anterior, la imagen tiene aria-hidden="true"
    const eyeIcon = screen.getByRole('presentation', { hidden: true });

    // 1. Verificamos el estado inicial (oculto)
    expect(inputElement.type).toBe('password');
    expect(eyeIcon.getAttribute('src')).toBe(iconOn);

    // 2. Hacemos clic
    fireEvent.click(toggleButton);

    // 3. Verificamos el estado actualizado (visible)
    expect(inputElement.type).toBe('text');
    // El aria-label del botón debió cambiar dinámicamente
    expect(toggleButton.getAttribute('aria-label')).toBe('Ocultar contraseña');
    expect(eyeIcon.getAttribute('src')).toBe(iconOff);
  });
});