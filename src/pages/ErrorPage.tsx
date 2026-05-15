import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/primary/Button/Button'

export default function ErrorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const mensaje = location.state?.mensaje ?? 'Error desconocido'

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center gap-8"
      style={{ backgroundColor: '#3758F9' }}
    >
      <h1
        style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '100px',
          fontWeight: 700,
          lineHeight: '130px',
          textAlign: 'center',
        }}
      >
        ERROR
      </h1>

      <p
        style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: '22px',
          fontWeight: 600,
          lineHeight: '24px',
          textAlign: 'center',
        }}
      >
        {mensaje}
      </p>

      <Button variant="inverse" onClick={() => navigate('/')}>
        Regresar al login
      </Button>
    </div>
  )
}