// src/pages/GestionDatosPage.tsx
// angel

import { useState } from "react";
import FarmacosView from "./views/FarmacosView";
import VacunasView from "./views/VacunasView";
import type { Farmaco } from "../../services/admin/adminFarmacos";
import type { Vacuna } from "../../services/admin/adminVacunas";
import VacunaDetallesView from "./views/VacunaDetallesView";

import Button from "../../components/primary/Button/Button";
import { UploadCloud } from "lucide-react";
import ImportarCsvModal from "../../components/composed/ImportarCsvModal/ImportarCsvModal";

type NivelNavegacion = "farmacos" | "vacunas" | "detalles";

export default function GestionDatosPage() {
  const [nivel, setNivel] = useState<NivelNavegacion>("farmacos");
  const [farmacoActivo, setFarmacoActivo] = useState<Farmaco | null>(null);
  const [vacunaActiva, setVacunaActiva] = useState<Vacuna | null>(null); 

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
    <>
      <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4 sm:p-8 bg-surface">
        {/* [REFACTOR]: Eliminamos max-w-[1140px] para aprovechar todo el espacio horizontal */}
        <div className="flex flex-col w-full gap-[24px]">
          
          {/* --- CABECERA DE LA PÁGINA Y BOTÓN DE IMPORTACIÓN --- */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-dark font-inter">Gestión de Datos Médicos</h1>
              <p className="text-sm text-muted font-inter mt-1">
                Administra el catálogo jerárquico de fármacos, vacunas y registros clínicos.
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setIsImportModalOpen(true)}
              className="flex items-center gap-2"
            >
              <UploadCloud size={18} className="text-primary" aria-hidden="true" />
              Importar CSV
            </Button>
          </div>

          {/* --- BREADCRUMBS (Navegación) --- */}
          <nav aria-label="Navegación de catálogo" className="flex items-center gap-2 font-inter text-[14px]">
            {nivel === "farmacos" ? (
              <span className="text-dark font-bold" aria-current="page">
                Fármacos
              </span>
            ) : (
              <button 
                onClick={goNivel1}
                className="text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                Fármacos
              </button>
            )}
            
            {farmacoActivo && (
              <>
                <span className="text-muted-light" aria-hidden="true">/</span>
                {nivel === "vacunas" ? (
                  <span className="text-dark font-bold" aria-current="page">
                    {farmacoActivo.nombre}
                  </span>
                ) : (
                  <button 
                    onClick={() => goNivel2(farmacoActivo)}
                    className="text-primary hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {farmacoActivo.nombre}
                  </button>
                )}
              </>
            )}

            {vacunaActiva && (
              <>
                <span className="text-muted-light" aria-hidden="true">/</span>
                <span className="text-dark font-bold" aria-current="page">
                  {vacunaActiva.nombre}
                </span>
              </>
            )}
          </nav>

          <hr className="border-stroke" />

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
      </main>

      {/* [REFACTOR]: El modal ahora vive AFUERA de <main> para evitar el Contexto de Apilamiento del overflow */}
      <ImportarCsvModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
      />
    </>
  );
}