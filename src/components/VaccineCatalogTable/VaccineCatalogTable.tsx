import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import VaccineTableRow from '../VaccineTableRow/VaccineTableRow';
import type { Vaccine } from '../VaccineTableRow/VaccineTableRow';

type SortKey = keyof Vaccine;
type SortDir = 'asc' | 'desc';

interface VaccineCatalogTableProps {
  vaccines: Vaccine[];
  onVaccineClick?: (vaccine: Vaccine) => void;
  onInfoClick?: (vaccine: Vaccine) => void;
}

const columns: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Nombre de Vacuna' },
  { key: 'farmaceutica', label: 'Farmacéutica' },
  { key: 'costoUnitario', label: 'Costo' },
  { key: 'temperatura', label: 'Temperatura' },
  { key: 'indice_seguridad', label: 'Índice de Seguridad' },
  { key: 'longevidad', label: 'Longevidad' },
];

const VaccineCatalogTable = ({ vaccines, onVaccineClick, onInfoClick }: VaccineCatalogTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...vaccines].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    // 1. Manejo inteligente para columnas que mezclan números y texto ("-70°C", "2 horas")
    if (sortKey === 'temperatura' || sortKey === 'longevidad') {
      // Extraemos solo el valor matemático usando Regex (soporta negativos y decimales)
      aVal = parseFloat(String(aVal).replace(/[^\d.-]/g, '')) || 0;
      bVal = parseFloat(String(bVal).replace(/[^\d.-]/g, '')) || 0;
    }

    // 2. Manejo de Textos puros (Nombre, Farmacéutica)
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const compare = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? compare : -compare;
    }

    // 3. Manejo de Números puros (Costos, Índice de Seguridad)
    // Nos aseguramos de tratar undefined/null como 0 para que no explote
    const numA = (aVal as number) || 0;
    const numB = (bVal as number) || 0;

    if (numA < numB) return sortDir === 'asc' ? -1 : 1;
    if (numA > numB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-4 py-3 text-left text-xs font-medium select-none whitespace-nowrap transition-colors
                  ${sortKey === col.key ? 'text-[#5B84E9]' : 'text-slate-500 hover:text-slate-700'}
                `}
              >
                <span className="inline-flex items-center gap-1.5">
                  {col.label}
                  {/* MAGIA VISUAL: Ocultamos la flecha si no es la columna activa, y la rotamos si es descendente */}
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-200 ${sortKey === col.key ? 'opacity-100' : 'opacity-0'} 
                      ${sortDir === 'desc' && sortKey === col.key ? 'rotate-180' : ''}
                    `} 
                  />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(vaccine => (
            <VaccineTableRow
              key={vaccine.id}
              vaccine={vaccine}
              onClick={() => onVaccineClick?.(vaccine)}
              onInfoClick={onInfoClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccineCatalogTable;