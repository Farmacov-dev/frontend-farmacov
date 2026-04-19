import { Stethoscope } from 'lucide-react';

interface MedicalSpec {
  label: string;
  value: string | number;
}

interface MedicalSpecsSectionProps {
  specs: MedicalSpec[];
}

const MedicalSpecsSection = ({ specs }: MedicalSpecsSectionProps) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-base font-bold font-['Inter',sans-serif] text-gray-900">
      Especificaciones medicas
    </h3>
    <div className="flex flex-col gap-2">
      {specs.map((spec, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm text-gray-500 font-['Inter',sans-serif]">
            <Stethoscope size={14} className="text-gray-400 flex-shrink-0" />
            {spec.label}:
          </span>
          <span className="text-sm font-medium text-gray-900 font-['Inter',sans-serif]">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default MedicalSpecsSection;