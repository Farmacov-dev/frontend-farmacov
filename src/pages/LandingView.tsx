// src/pages/LandingView.tsx
// angel

import LogoMark from "../components/LogoMark/LogoMark";
import Button from "../components/primary/Button/Button";

interface LandingViewProps {
  onLoginClick: () => void;
}

export default function LandingView({ onLoginClick }: LandingViewProps) {
  return (
    // Fondo general ligeramente más oscuro (azul/gris) para que la navbar blanca resalte
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 font-inter flex flex-col relative overflow-hidden">
      
      {/* Burbujas decorativas ajustadas para el nuevo fondo */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] pointer-events-none" />

      {/* NAVBAR: Ahora es blanca sólida con sombra para crear el contraste perfecto */}
      <header className="w-full h-[90px] bg-white shadow-sm border-b border-stroke/60 shrink-0 relative z-50">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-6 sm:px-12">
          
          {/* Ruta del logo corregida */}
          <LogoMark variant="full" />

          {/* NAVEGACIÓN Y BOTÓN */}
          <div className="flex items-center gap-8">
            <button className="text-[16px] font-medium leading-[24px] text-[#111928] transition-colors hover:text-[#6B97EE] focus-visible:outline-none">
             
            </button>
            
            <Button 
              variant="primary" 
              onClick={onLoginClick}
              className="w-[132px] !py-[13px] !px-[28px] !bg-[#6B97EE] hover:!bg-[#5881d3] text-[16px] font-medium rounded-[6px] shadow-sm flex justify-center items-center gap-2.5"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL: 
          1. flex-1 para que tome el alto sobrante del monitor.
          2. items-stretch para que la imagen llegue hasta abajo. */}
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-12 px-6 sm:px-12 py-8 lg:flex-row lg:items-stretch lg:gap-8">
        
        {/* TEXTO: Quitamos el h-[621px] fijo. Ahora se centra verticalmente sin limitar la pantalla. */}
        <div className="flex w-full lg:w-[676px] flex-col justify-center items-start gap-[80px]">
          
          <div className="flex flex-col gap-6">
            <h1 className="w-full max-w-[509px] text-[64px] font-bold leading-[58px] tracking-tight text-[#111928]">
              Datos reales decisiones seguras
            </h1>
            
            <p className="w-full max-w-[489px] text-[18px] font-semibold leading-[26px] text-[#637381]">
              Identifica anomalías en segundos antes que se conviertan en crisis
            </p>
          </div>

        </div>

        {/* HERO IMAGE: Al estar en un contenedor flex-1 con items-stretch, 
            esta imagen ahora crecerá automáticamente para llenar el monitor hasta abajo. */}
        <div
          className="w-full flex-1 min-h-[400px] shadow-xl transition-transform duration-300 hover:scale-[1.01] self-center lg:self-stretch my-auto lg:my-8"
          style={{
            borderRadius: "110px 8px 0 8px",
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundColor: "lightgray"
          }}
          aria-label="Farmacov Dashboard Hero Preview"
          role="img"
        />
      </main>
    </div>
  );
}