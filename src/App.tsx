import InputField from "./components/primary/InputField/InputField"
import eyeSvg    from "./assets/icons/eye.svg"
import eyeOffSvg from "./assets/icons/eye-off.svg"

export default function App() {
  return (
	<>
	  // correo
<InputField
  label="Correo Electrónico"
  type="email"
  placeholder="example@email.com"
/>

// contrasena
<InputField
  label="Contraseña"
  type="password"
  eyeIcon={eyeSvg}
  eyeOffIcon={eyeOffSvg}
/>

// error
<InputField
  label="Correo Electrónico"
  type="email"
  error
  placeholder="example@email.com"
/>

//simular ancho en formulario
<div style={{ width: "480px", margin: "40px auto" }}>
  <InputField
    label="Correo Electrónico"
    type="email"
    placeholder="example@email.com"
  />
</div>
	</>
  )
}