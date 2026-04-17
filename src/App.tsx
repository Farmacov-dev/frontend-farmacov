import LoginCard from "./components/composed/LoginCard/LoginCard";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center">
        <LoginCard
      onLogin={async (email, password) => {
        // simulación temporal — quitar cuando conectemos Firebase
        await new Promise((resolve) => setTimeout(resolve, 800)); // simula delay de red
        
        // credenciales de prueba
        if (email === "admin@farmacov.com" && password === "123456") {
          console.log("Login exitoso");
          // aquí irá navigate("/dashboard")
        } else {
          // simula error de credenciales incorrectas
          const error: any = new Error("Credenciales incorrectas");
          error.code = "auth/wrong-password";
          throw error;
        }
      }}
         />
    </div>
  );
}