import { useState } from "react";
import VaccineDetailModal from "./components/composed/VaccineDetailModal/VaccineDetailModal";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DDE3F4]">
      
      {/* Botón para abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-6 py-3 text-white"
      >
        Abrir modal
      </button>

      {/* Modal */}
      <VaccineDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

export default App;