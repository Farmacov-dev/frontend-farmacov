// src/components/composed/LoginCard/LoginCard.tsx

import { useState } from "react";
import InputField from "../../primary/InputField/InputField";
import Button from "../../primary/Button/Button";
import ErrorBanner from "../../shared/ErrorBanner";
import LogoMark from "../../LogoMark/LogoMark";
import eyeIcon from "../../../assets/icons/eye.svg";
import eyeOffIcon from "../../../assets/icons/eye-off.svg";

interface LoginCardProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export default function LoginCard({ onLogin }: LoginCardProps) {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [fieldError, setFieldError]   = useState(false);
  const [systemError, setSystemError] = useState(false);
  const [loading, setLoading]         = useState(false);

  async function handleSubmit() {
    // campos vacíos → error de campos, no de sistema
    if (!email || !password) {
      setFieldError(true);
      return;
    }

    try {
      setLoading(true);
      setFieldError(false);
      setSystemError(false);
      await onLogin(email, password);
    } catch (error: any) {
      // credenciales incorrectas → error de campos
      if (
        error?.status === 401 ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/invalid-credential"
      ) {
        setFieldError(true);
      } else {
        // error de red / servidor → pantalla de error
        setSystemError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  // regresa al formulario limpio desde la pantalla de error
  function handleRegresar() {
    setSystemError(false);
    setFieldError(false);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="
      flex flex-col items-center
      w-[520px] h-[618px]
      px-[48px] py-[64px]
      gap-[65px]
      bg-white rounded-[12px]
      shadow-[0_34px_26px_0_rgba(13,10,44,0.05),0_12px_34px_0_rgba(13,10,44,0.08)]
    ">

      {/* sección título — siempre visible */}
      <div className="flex flex-col items-center gap-[16px] self-stretch">
        <LogoMark />
        <p className="
          self-stretch text-center text-negro
          font-inter text-[16px] font-medium leading-[24px]
        ">
          Portal Ejecutivo de Análisis de Vacunas
        </p>
      </div>

      {/* pantalla de error de sistema */}
      {systemError ? (
        <>
          <ErrorBanner message="Algo falló! Intenta nuevamente." />
          <Button variant="primary" onClick={handleRegresar}>
            Regresar
          </Button>
        </>
      ) : (
        <>
          {/* formulario normal */}
          <div className="flex flex-col items-start gap-[25px] self-stretch">

            {/* correo */}
            <div className="flex flex-col items-start gap-[5px] self-stretch h-[80px]">
              <InputField
                label="Correo Electrónico"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldError}
              />
            </div>

            {/* contraseña */}
            <div className="flex flex-col items-start gap-[5px] self-stretch h-[80px]">
              <InputField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldError}
                eyeIcon={eyeIcon}
                eyeOffIcon={eyeOffIcon}
              />
            </div>

            {/* mensaje credenciales incorrectas */}
            {fieldError && (
              <p
                className="w-[345px] h-[43px] font-inter text-[16px] font-semibold leading-[24px]"
                style={{ color: "#BC1C21" }}
              >
                Correo y/o contraseña incorrectos
              </p>
            )}

          </div>

          {/* botón acceder */}
          <Button
            variant="primary"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Accediendo..." : "Accede al dashboard"}
          </Button>
        </>
      )}

    </div>
  );
}