// src/pages/ErrorPage.tsx
// angel

import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/primary/Button/Button'

interface ErrorLocationState {
  mensaje?: string;
}

export default function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const state = location.state as ErrorLocationState;
  const mensaje = state?.mensaje ?? 'Error desconocido'

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-primary p-6">
      
      <h1 className="text-white font-inter text-[60px] md:text-[100px] font-bold leading-tight md:leading-[130px] text-center">
        ERROR
      </h1>

      <p className="text-white font-inter text-[18px] md:text-[22px] font-semibold leading-relaxed text-center max-w-2xl">
        {mensaje}
      </p>

      <Button variant="inverse" onClick={() => navigate('/')}>
        Regresar al login
      </Button>
    </div>
  )
}