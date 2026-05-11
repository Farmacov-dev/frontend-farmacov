// src/components/VaccineTableRow/VaccineTableRow.tsx
import { Info } from 'lucide-react';
import EffectivenessBadge from '../EffectivenessBadge/EffectivenessBadge';

export interface Vaccine {
  id: number;
  name: string;
  farmaceutica: string;
  costo: number;
  costoMayoreo: number;
  temperatura: string;
  efectividad: number;
  longevidad: string;
}

interface VaccineTableRowProps {
  vaccine: Vaccine;
  onClick?: () => void;
  onInfoClick?: (vaccine: Vaccine) => void;
}

const VaccineTableRow = ({ vaccine, onClick, onInfoClick }: VaccineTableRowProps) => (
  <tr onClick={onClick} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-100">
    <td className="px-4 py-3">
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900">
        {vaccine.name}
        <Info
          size={14}
          className="text-gray-400 flex-shrink-0 cursor-pointer hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation()
            onInfoClick?.(vaccine)
          }}
        />
      </span>
    </td>
    <td className="px-4 py-3 text-sm text-gray-600">{vaccine.farmaceutica}</td>
    <td className="px-4 py-3 text-sm text-gray-600">${vaccine.costo.toFixed(2)}</td>
    <td className="px-4 py-3 text-sm text-gray-600">${vaccine.costoMayoreo.toFixed(2)}</td>
    <td className="px-4 py-3 text-sm text-gray-600">{vaccine.temperatura}</td>
    <td className="px-4 py-3">
      <EffectivenessBadge value={vaccine.efectividad} />
    </td>
    <td className="px-4 py-3 text-sm text-gray-600">{vaccine.longevidad}</td>
  </tr>
);

export default VaccineTableRow;