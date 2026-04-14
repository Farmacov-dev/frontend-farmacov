import Button from "./components/primary/Button/Button"
import salirSvg    from "./assets/icons/salir.svg"
import anadirSvg   from "./assets/icons/anadir.svg"
import exportarSvg from "./assets/icons/exportar.svg"
import collapseSvg from "./assets/icons/Collapse.svg"

export default function App() {
  return (
	<>
	  {/* Primary simple */}
	  <Button variant="primary">Accede al dashboard</Button>
	  <Button variant="primary">Volver</Button>

	  {/* Primary con ícono */}
	  <Button variant="primary" icon={anadirSvg} iconAlt="añadir">Nueva comparación</Button>
	  <Button variant="primary" icon={exportarSvg} iconAlt="exportar">Exportar</Button>
	  <Button variant="primary" icon={anadirSvg} iconAlt="añadir">Generar anotación</Button>

	  {/* Primary disabled → primary cuando seleccionan vacunas */}
	  <Button variant="primary" disabled>Crear comparación</Button>

	  {/* Outline */}
	  <Button variant="outline">Cancelar</Button>
	  <Button variant="outline">Olvidaste la contraseña?</Button>

	  {/* Ghost — pantalla login */}
	  <Button variant="ghost" icon={salirSvg} iconAlt="salir">Salir</Button>

	  {/* Sidebar — dentro del sidebar, ocupa todo el ancho */}
	  <Button variant="sidebar" icon={salirSvg} iconAlt="cerrar sesión">Cerrar sesión</Button>
	  <Button variant="sidebar" icon={collapseSvg} iconAlt="comprimir">Comprimir</Button>
	</>
  )
}