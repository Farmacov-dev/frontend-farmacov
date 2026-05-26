import { useState } from "react";
import FarmacosView from "./views/FarmacosView";
import VacunasView from "./views/VacunasView";
import type { Farmaco } from "../../services/admin/adminFarmacos";
import type { Vacuna } from "../../services/admin/adminVacunas";
import VacunaDetallesView from "./views/VacunaDetallesView";

// --- Imports para la Importación Masiva ---
import Button from "../../components/primary/Button/Button";
import { UploadCloud } from "lucide-react";
import ImportarCsvModal from "../../components/composed/ImportarCsvModal/ImportarCsvModal";

type NivelNavegacion = "farmacos" | "vacunas" | "detalles";

export default function GestionDatosPage() {
  const [nivel, setNivel] = useState<NivelNavegacion>("farmacos");
  const [farmacoActivo, setFarmacoActivo] = useState<Farmaco | null>(null);
  const [vacunaActiva, setVacunaActiva] = useState<Vacuna | null>(null); 

  // Estado para controlar la visibilidad del Modal de Importación
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const goNivel1 = () => {
    setFarmacoActivo(null);
    setVacunaActiva(null);
    setNivel("farmacos");
  };

  const goNivel2 = (farmaco: Farmaco) => {
    setFarmacoActivo(farmaco);
    setVacunaActiva(null);
    setNivel("vacunas");
  };

  const goNivel3 = (vacuna: Vacuna) => {
    setVacunaActiva(vacuna);
    setNivel("detalles");
  };

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8 relative">
      <div className="flex flex-col w-full max-w-[1140px] gap-[24px]">
        
        {/* --- CABECERA DE LA PÁGINA Y BOTÓN DE IMPORTACIÓN --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark font-inter">Gestión de Datos Médicos</h1>
            <p className="text-sm text-slate-500 font-inter mt-1">
              Administra el catálogo jerárquico de fármacos, vacunas y registros clínicos.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 bg-white !border-slate-300 !text-slate-700 hover:!bg-slate-50 transition-colors"
          >
            <UploadCloud size={18} className="text-[#5B84E9]" />
            Importar CSV
          </Button>
        </div>

        {/* --- BREADCRUMBS --- */}
        <div className="flex items-center gap-2 font-inter text-[14px]">
          <button 
            onClick={goNivel1}
            className={`transition-colors ${nivel === "farmacos" ? "text-dark font-bold cursor-default" : "text-[#5B84E9] hover:underline"}`}
          >
            Fármacos
          </button>
          
          {farmacoActivo && (
            <>
              <span className="text-slate-400">/</span>
              <button 
                onClick={() => goNivel2(farmacoActivo)}
                className={`transition-colors ${nivel === "vacunas" ? "text-dark font-bold cursor-default" : "text-[#5B84E9] hover:underline"}`}
              >
                {farmacoActivo.nombre}
              </button>
            </>
          )}

          {vacunaActiva && (
            <>
              <span className="text-slate-400">/</span>
              <span className="text-dark font-bold cursor-default">
                {vacunaActiva.nombre}
              </span>
            </>
          )}
        </div>

        <hr className="border-stroke-light" />

        {/* --- VISTAS CONDICIONALES --- */}
        {nivel === "farmacos" && (
          <FarmacosView onSelectFarmaco={goNivel2} />
        )}

        {nivel === "vacunas" && farmacoActivo && (
          <VacunasView 
            farmacoActivo={farmacoActivo} 
            onSelectVacuna={goNivel3} 
          />
        )}

        {nivel === "detalles" && vacunaActiva && (
            <VacunaDetallesView vacunaActiva={vacunaActiva} />
        )}
      </div>

      {/* --- MODALES GLOBALES DE LA PÁGINA --- */}
      <ImportarCsvModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </main>
  );
}