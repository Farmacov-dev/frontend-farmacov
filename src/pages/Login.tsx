// LoginPage.tsx
// angel

import { useNavigate } from "react-router-dom";
import LoginCard from "../components/composed/LoginCard/LoginCard";
import Button from "../components/primary/Button/Button";
import salirSvg from "../assets/icons/salir.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    // cambiar esto con firebase
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (email === "admin@farmacov.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      const error: any = new Error("Credenciales incorrectas");
      error.code = "auth/wrong-password";
      throw error;
    }
  }

  // parte de estilos
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-login-bg">

      {/* ccard y botones*/}
      <div className="flex flex-col items-center gap-[16px]">

        {/* login card */}
        <LoginCard onLogin={handleLogin} />

        {/* botones alineados con el ancho de la card */}
        <div className="flex justify-between w-[520px]">

          {/* salir */}
          <Button
            variant="floating"
            icon={salirSvg}
            iconAlt="Salir"
            className="h-[43px]"
            onClick={() => navigate("/")}
          >
            Salir
          </Button>

          {/* olvidaste la contrasena */}
          <Button
            variant="floating"
            className="h-[43px]"
            onClick={() => console.log("forgot password")}
          >
            Olvidaste tu contraseña?
          </Button>

        </div>
      </div>
    </div>
  );
}