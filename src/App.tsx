import { useState } from "react"
import ModalContainer from "./components/composed/ModalContainer/ModalContainer"
import Button from "./components/primary/Button/Button"

export default function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir modal</Button>

      <ModalContainer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* aquí va el contenido de cada modal */}
        <h2>Título del modal</h2>
        <p>Contenido...</p>
      </ModalContainer>
    </>
  )
}