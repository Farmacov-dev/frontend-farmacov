import { useState } from "react"
import SearchInput from "./components/primary/SearchInput/SearchInput"

export default function App() {
  const [query, setQuery] = useState("")
  
  return (
    <>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Busqueda"
      />
    </>
  )
}