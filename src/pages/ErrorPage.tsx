// src/pages/ErrorPage.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/primary/Button/Button'

export default function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const mensaje = location.state?.mensaje ?? 'Error desconocido'

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 bg-[#3758F9]">
      <h1 className="text-white font-inter text-[100px] font-bold leading-[130px] text-center">
        ERROR
      </h1>

      <p className="text-white font-inter text-[22px] font-semibold leading-[24px] text-center">
        {mensaje}
      </p>

      <Button variant="inverse" onClick={() => navigate('/')}>
        Regresar al login
      </Button>
    </div>
  )
}