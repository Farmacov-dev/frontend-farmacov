// src/components/composed/ImportarCsvModal/ImportarCsvModal.test.tsx
// @vitest-environment jsdom
import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest';
import ImportarCsvModal from './ImportarCsvModal';
import { useImportarCsv } from '../../../hooks/useImportarCsv';

// 1. Mock de dependencias
vi.mock('../ModalContainer/ModalContainer', () => ({
  default: ({ children, isOpen }: any) => (isOpen ? <div data-testid="mock-modal">{children}</div> : null)
}));

vi.mock('../../../hooks/useImportarCsv', () => ({
  useImportarCsv: vi.fn(),
}));

vi.mock('lucide-react', () => ({
  UploadCloud: () => <svg data-testid="icon-upload" />,
  CheckCircle: () => <svg data-testid="icon-check" />,
  AlertTriangle: () => <svg data-testid="icon-alert" />,
  FileText: () => <svg data-testid="icon-file" />,
}));

describe('Componente: ImportarCsvModal', () => {

  const mockOnClose = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    (useImportarCsv as any).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('debe renderizar la pantalla inicial y bloquear el botón sin archivo', () => {
    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: /importación masiva csv/i })).toBeDefined();
    
    // Verificamos que el select tenga el primer valor por defecto
    const selectCat = screen.getByLabelText(/qué datos vas a importar/i) as HTMLSelectElement;
    expect(selectCat.value).toBe('farmacos');

    // El botón de enviar debe estar bloqueado
    const botonSubir = screen.getByRole('button', { name: /iniciar importación/i }) as HTMLButtonElement;
    expect(botonSubir.disabled).toBe(true);
  });

  it('debe permitir seleccionar un archivo simulando el evento onchange del input oculto', () => {
    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    // Buscamos el input oculto por su atributo type.
    // Usamos el contenedor Document en lugar del screen si no está en el árbol accesible (por estar hidden),
    // pero RTL sí lo encuentra si no tiene display:none puro, sino clase tailwind 'hidden'.
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const botonSubir = screen.getByRole('button', { name: /iniciar importación/i }) as HTMLButtonElement;

    // Creamos un archivo ficticio para la prueba
    const fakeFile = new File(['nombre,tipo\nPfizer,ARNm'], 'datos_farmacos.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [fakeFile] } });

    // La interfaz debió actualizarse mostrando el nombre del archivo
    expect(screen.getByText('datos_farmacos.csv')).toBeDefined();
    
    // Y el botón se debió habilitar
    expect(botonSubir.disabled).toBe(false);
  });

  it('debe cambiar a la pantalla de resultados exitosos al recibir onSuccess del backend', () => {
    // Configuramos el mock para que dispare el éxito
    mockMutate.mockImplementation((data, options) => {
      options.onSuccess({
        mensaje: "Archivo importado con éxito",
        procesados: 50,
        exitosos: 50,
        fallidos: 0,
        errores: []
      });
    });

    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const botonSubir = screen.getByRole('button', { name: /iniciar importación/i });

    fireEvent.change(fileInput, { target: { files: [new File([''], 'test.csv')] } });
    fireEvent.click(botonSubir);

    // Evaluamos la PANTALLA DE RESULTADOS
    expect(screen.getByText('Archivo importado con éxito')).toBeDefined();
    expect(screen.getByTestId('icon-check')).toBeDefined();
    
    // Verificamos los números del resumen
    const elementosCincuenta = screen.getAllByText('50');
    expect(elementosCincuenta).toHaveLength(2); // Uno por Procesados y otro por Éxito
    
    // El botón final debe existir
    expect(screen.getByRole('button', { name: /entendido/i })).toBeDefined();
  });

  it('debe mostrar la pantalla de advertencia y los errores si hubo fallos parciales', () => {
    mockMutate.mockImplementation((data, options) => {
      options.onSuccess({
        mensaje: "Importación con errores",
        procesados: 10,
        exitosos: 8,
        fallidos: 2,
        errores: ["Fila 3: Falta el tipo de fármaco", "Fila 8: Formato de fecha inválido"]
      });
    });

    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [new File([''], 'test.csv')] } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar importación/i }));

    // Verificamos elementos de la rama de advertencia
    expect(screen.getByTestId('icon-alert')).toBeDefined();
    expect(screen.getByText('Fila 3: Falta el tipo de fármaco')).toBeDefined();
    expect(screen.getByText('Fila 8: Formato de fecha inválido')).toBeDefined();
  });

  it('debe atrapar un error crítico del servidor y mostrarlo en la vista', () => {
    mockMutate.mockImplementation((data, options) => {
      options.onError({
        response: { data: { error: "Formato de archivo inválido." } }
      });
    });

    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [new File([''], 'test.csv')] } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar importación/i }));

    // Deberíamos ver el mensaje del catch de la API
    expect(screen.getByText('Formato de archivo inválido.')).toBeDefined();
  });

  it('debe resetear todos los estados cuando el usuario cierra el modal', () => {
    render(<ImportarCsvModal isOpen={true} onClose={mockOnClose} />);

    const botonCancelar = screen.getByRole('button', { name: /cancelar/i });
    fireEvent.click(botonCancelar);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    // Nota: Como la prueba desmonta el componente, el reset interno (setArchivo(null)) 
    // asegura que la próxima vez que se abra, esté limpio.
  });
});