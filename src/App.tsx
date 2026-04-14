import { useState } from "react"
import TextAreaField from "./components/primary/TextAreaField/TextAreaField"

export default function App() {
  const [texto, setTexto] = useState("")  
  return (
    <>
    //sin limite
      <TextAreaField
  label="Observaciones y análisis"
  placeholder="Describe tus hallazgos..."
  value={texto}
  onChange={(e) => setTexto(e.target.value)}
/>

// limite de caracteres con contador
<TextAreaField
  label="Observaciones y análisis"
  placeholder="Describe tus hallazgos..."
  value={texto}
  onChange={(e) => setTexto(e.target.value)}
  maxLength={500}
  showCount
/>

// Con error
<TextAreaField
  label="Observaciones y análisis"
  error
  value={texto}
  onChange={(e) => setTexto(e.target.value)}
/>
    </>
  )
}