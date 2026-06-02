// src/components/composed/LoginCard/LoginCard.tsx
// angel

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

  async function handleSubmit(e?: React.SyntheticEvent) {
    if (e) e.preventDefault();

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
      if (
        error?.status === 401 ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/invalid-credential"
      ) {
        setFieldError(true);
      } else {
        setSystemError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleRegresar() {
    setSystemError(false);
    setFieldError(false);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="
      flex flex-col items-center
      /* [REFACTOR]: w-full max-w-[520px] y min-h-[618px] para evitar que se desborde en pantallas pequeñas */
      w-full max-w-[520px] min-h-[618px]
      px-[48px] py-[64px]
      gap-[65px]
      bg-white rounded-[12px]
      shadow-[0_34px_26px_0_rgba(13,10,44,0.05),0_12px_34px_0_rgba(13,10,44,0.08)]
    ">

      {/* sección título — siempre visible */}
      <div className="flex flex-col items-center gap-[16px] self-stretch">
        <LogoMark />
        {/* [REFACTOR]: text-negro a text-dark */}
        <p className="
          self-stretch text-center text-dark
          font-inter text-[16px] font-medium leading-[24px]
        ">
          Portal Ejecutivo de Análisis de Vacunas
        </p>
      </div>

      {/* pantalla de error de sistema */}
      {systemError ? (
        <div className="flex flex-col w-full gap-6 animate-fadeIn">
          <ErrorBanner message="Algo falló! Intenta nuevamente." />
          <Button variant="primary" onClick={handleRegresar}>
            Regresar
          </Button>
        </div>
      ) : (
        /* [REFACTOR]: Cambiamos este div por un <form> para activar el envío con la tecla "Enter" */
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-[25px] self-stretch w-full">

          {/* correo */}
          <div className="flex flex-col items-start gap-[5px] self-stretch">
            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={fieldError}
              disabled={loading}
            />
          </div>

          {/* contraseña */}
          <div className="flex flex-col items-start gap-[5px] self-stretch">
            <InputField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={fieldError}
              eyeIcon={eyeIcon}
              eyeOffIcon={eyeOffIcon}
              disabled={loading}
            />
          </div>

          {/* mensaje credenciales incorrectas */}
          {fieldError && (
            <p className="w-full font-inter text-[16px] font-semibold leading-[24px] text-red animate-fadeIn">
              Correo y/o contraseña incorrectos
            </p>
          )}

          {/* botón acceder */}
          {/* [REFACTOR]: type="submit" añadido para que el formulario funcione nativamente */}
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? "Accediendo..." : "Accede al dashboard"}
          </Button>
        </form>
      )}

    </div>
  );
}