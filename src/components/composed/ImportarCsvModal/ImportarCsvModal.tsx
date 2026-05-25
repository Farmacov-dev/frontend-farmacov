import { useState, useRef } from "react";
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
      <div className="flex flex-col gap-6 w-[500px]">
        <div>
          <h2 className="text-xl font-bold text-dark font-inter flex items-center gap-2">
            <UploadCloud className="text-[#5B84E9]" /> Importación Masiva CSV
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Sube un archivo .csv para alimentar la base de datos automáticamente.
          </p>
        </div>

        {!resultado ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">¿Qué datos vas a importar?</label>
              <select
                value={categoriaSel}
                onChange={(e) => setCategoriaSel(e.target.value)}
                className="p-3 border border-stroke-light rounded-xl bg-white text-dark focus:border-[#5B84E9] focus:ring-1 focus:ring-[#5B84E9] outline-none transition-all"
                disabled={isPending}
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat.id} value={cat.endpoint}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-semibold text-slate-700">Archivo CSV</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
                  ${archivo ? 'border-[#5B84E9] bg-blue-50' : 'border-slate-300 hover:border-[#5B84E9] bg-slate-50'}`}
                onClick={() => fileInputRef.current?.click()}
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
                    <FileText className="text-[#5B84E9] mb-2" size={32} />
                    <span className="text-sm font-medium text-[#5B84E9]">{archivo.name}</span>
                    <span className="text-xs text-slate-500 mt-1">{(archivo.size / 1024).toFixed(2)} KB</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="text-slate-400 mb-2" size={32} />
                    <span className="text-sm font-medium text-slate-600">Haz clic para seleccionar archivo</span>
                    <span className="text-xs text-slate-400 mt-1">Solo formato .csv</span>
                  </>
                )}
              </div>
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
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-xs text-slate-500 uppercase font-bold">Procesados</span>
                    <span className="text-xl font-black text-dark">{resultado.procesados}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-xs text-slate-500 uppercase font-bold">Éxito</span>
                    <span className="text-xl font-black text-green-600">{resultado.exitosos}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="block text-xs text-slate-500 uppercase font-bold">Fallidos</span>
                    <span className="text-xl font-black text-red-500">{resultado.fallidos}</span>
                  </div>
                </div>
              )}
            </div>

            {/* LISTA DE ERRORES (Muestra por qué fallaron las filas inválidas) */}
            {resultado.errores && resultado.errores.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Detalles de errores:</span>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 max-h-[150px] overflow-y-auto">
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