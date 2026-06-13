// src/components/composed/ImportarCsvModal/ImportarCsvModal.tsx
// angel

import { useState, useRef, useId } from "react";
import ModalContainer from "../ModalContainer/ModalContainer";
import Button from "../../primary/Button/Button";
import { useImportarCsv, type ImportResultDto } from "../../../hooks/useImportarCsv";
import { UploadCloud, CheckCircle, AlertTriangle, FileText } from "lucide-react";

interface ImportarCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIAS = [
  { id: "farmacos", label: "Fármacos", endpoint: "farmacos" },
  { id: "vacunas", label: "Vacunas", endpoint: "vacunas" },
  { id: "costos", label: "Costos de Vacunas", endpoint: "vacuna-costos" },
  { id: "efectos", label: "Efectos Secundarios", endpoint: "efectos-secundarios" },
  { id: "sintomas", label: "Síntomas Graves", endpoint: "sintomas-graves" },
  { id: "reportes", label: "Reportes Adversos", endpoint: "reportes-adversos" },
];

export default function ImportarCsvModal({ isOpen, onClose }: ImportarCsvModalProps) {
  const [categoriaSel, setCategoriaSel] = useState(CATEGORIAS[0].endpoint);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [resultado, setResultado] = useState<ImportResultDto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectId = useId();

  const { mutate: importar, isPending } = useImportarCsv();

  const handleClose = () => {
    setArchivo(null);
    setResultado(null);
    setCategoriaSel(CATEGORIAS[0].endpoint);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setArchivo(e.target.files[0]);
    }
  };

  const handleSubir = () => {
    if (!archivo) return;
    importar(
      { endpoint: categoriaSel, archivo },
      {
        onSuccess: (data) => setResultado(data),
        onError: (err: any) => {
          setResultado({
            mensaje: err.response?.data?.error || "Error crítico al conectar con el servidor.",
            errores: []
          });
        }
      }
    );
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col gap-6 w-full max-w-[500px]">
        <div>
          <h2 className="text-xl font-bold text-dark font-inter flex items-center gap-2">
            <UploadCloud className="text-primary" /> Importación Masiva CSV
          </h2>
          <p className="text-sm text-muted mt-1">
            Sube un archivo .csv para alimentar la base de datos automáticamente.
          </p>
        </div>

        {!resultado ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor={selectId} className="text-sm font-semibold text-dark">
                ¿Qué datos vas a importar?
              </label>
              <select
                id={selectId}
                value={categoriaSel}
                onChange={(e) => setCategoriaSel(e.target.value)}
                className="p-3 border border-stroke rounded-xl bg-white text-dark focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                disabled={isPending}
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat.id} value={cat.endpoint}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-semibold text-dark">Archivo CSV</label>
              <button 
                type="button"
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 w-full
                  ${archivo ? 'border-primary bg-primary/5' : 'border-stroke hover:border-primary bg-surface'}`}
                onClick={() => fileInputRef.current?.click()}
                disabled={isPending}
              >
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {archivo ? (
                  <>
                    <FileText className="text-primary mb-2" size={32} />
                    <span className="text-sm font-medium text-primary">{archivo.name}</span>
                    <span className="text-xs text-muted mt-1">{(archivo.size / 1024).toFixed(2)} KB</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="text-muted-light mb-2" size={32} />
                    <span className="text-sm font-medium text-dark">Haz clic para seleccionar archivo</span>
                    <span className="text-xs text-muted mt-1">Solo formato .csv</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" onClick={handleClose} disabled={isPending}>Cancelar</Button>
              <Button variant="primary" onClick={handleSubir} disabled={!archivo || isPending}>
                {isPending ? "Procesando..." : "Iniciar Importación"}
              </Button>
            </div>
          </div>
        ) : (
          /* PANTALLA DE RESULTADOS */
          <div className="flex flex-col gap-4 animate-fadeIn">
            <div className={`p-4 rounded-xl border ${resultado.fallidos && resultado.fallidos > 0 ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                {resultado.fallidos && resultado.fallidos > 0 ? (
                  <AlertTriangle className="text-amber-500" />
                ) : (
                  <CheckCircle className="text-green-500" />
                )}
                <h3 className="font-bold text-dark">
                  {resultado.mensaje || "Resumen de Importación"}
                </h3>
              </div>
              
              {resultado.procesados !== undefined && (
                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-white p-2 rounded-lg border border-stroke">
                    <span className="block text-xs text-muted uppercase font-bold">Procesados</span>
                    <span className="text-xl font-black text-dark">{resultado.procesados}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stroke">
                    <span className="block text-xs text-muted uppercase font-bold">Éxito</span>
                    <span className="text-xl font-black text-green-600">{resultado.exitosos}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-stroke">
                    <span className="block text-xs text-muted uppercase font-bold">Fallidos</span>
                    <span className="text-xl font-black text-red-500">{resultado.fallidos}</span>
                  </div>
                </div>
              )}
            </div>

            {/* LISTA DE ERRORES */}
            {resultado.errores && resultado.errores.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-sm font-bold text-dark">Detalles de errores:</span>
                <div className="bg-surface p-3 rounded-lg border border-stroke max-h-[150px] overflow-y-auto">
                  <ul className="list-disc pl-5 text-xs text-red-600 space-y-1">
                    {resultado.errores.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button variant="primary" onClick={handleClose}>Entendido</Button>
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
}