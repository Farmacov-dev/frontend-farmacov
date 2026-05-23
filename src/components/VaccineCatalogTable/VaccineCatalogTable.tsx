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
  { key: 'farmaceutica', label: 'Farmaceutica' },
  { key: 'costo', label: 'Costo' },
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
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
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
                className={`px-4 py-3 text-left text-xs font-medium cursor-pointer select-none whitespace-nowrap ${sortKey === col.key ? 'text-indigo-500' : 'text-gray-500'}`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  <ChevronDown size={12} />
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