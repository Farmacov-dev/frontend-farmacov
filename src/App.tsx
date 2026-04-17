import { useState } from "react";
import ComparisonModal from "./components/composed/ComparisonModal/ComparisonModal";

const VACCINES = [
  "Comirnarty",
  "Spikevax",
  "Vaxzevria",
  "Janssen",
  "CoronaVac",
  "Sinopharm",
  "Sputnik V",
  "Covaxin",
  "Novaxovid",
  "Covidencia",
  "Corbevax",
  "Covovax",
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<{ a: string; b: string } | null>(null);

  function handleCompare(vaccineA: string, vaccineB: string) {
    setResult({ a: vaccineA, b: vaccineB });
    setIsOpen(false);
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white font-inter font-medium text-[16px] px-[28px] py-[13px] rounded-card cursor-pointer"
      >
        Abrir Comparison Modal
      </button>

      {result && (
        <p className="font-inter text-dark text-[14px]">
          Comparando: <strong>{result.a}</strong> vs <strong>{result.b}</strong>
        </p>
      )}

      <ComparisonModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        vaccines={VACCINES}
        onCompare={handleCompare}
      />
    </div>
  );
}