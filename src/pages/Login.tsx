// src/pages/LoginPage.tsx
// angel

import { useNavigate } from "react-router-dom";
import LoginCard from "../components/composed/LoginCard/LoginCard";
import Button from "../components/primary/Button/Button";
import salirSvg from "../assets/icons/salir.svg";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      if (error.code === 'auth/user-disabled') {
        navigate('/error', {
          state: {
            mensaje: 'Error: usuario no activo, contacte a su administrador'
          }
        });
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-login-bg p-4">
      
      <div className="flex flex-col items-center gap-[16px] w-full max-w-[520px]">
        <LoginCard onLogin={handleLogin} />
        
        <div className="flex justify-between w-full px-2">
          <Button
            variant="floating"
            icon={salirSvg}
            iconAlt="Salir"
            className="h-[43px]"
            onClick={() => navigate("/")}
          >
            Salir
          </Button>
 
        </div>
      </div>
      
    </div>
  );
}