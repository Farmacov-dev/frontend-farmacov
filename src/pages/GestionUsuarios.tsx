import { useState, useMemo } from 'react'
import PageHeader from '../components/PageHeader/PageHeader'
import Button from '../components/primary/Button/Button'
import InputField from '../components/primary/InputField/InputField'
import SearchInput from '../components/primary/SearchInput/SearchInput'
import SelectDropdown from '../components/SelectDropdown/SelectDropdown'
import ModalContainer from '../components/composed/ModalContainer/ModalContainer'
import {
  useUsuarios,
  useRolesFormulario,
  useCreateUsuario,
  useUpdateUsuario,
  useDeleteUsuario,
} from '../hooks/useUsuarios'
import type { Usuario } from '../services/usuarios/getUsuarios'

const AVATAR_COLORS = ['#14B8A6', '#7C3AED', '#F59E0B', '#1D4ED8', '#EF4444', '#10B981']
const getInitials = (nombre: string, apellido: string) =>
  `${nombre[0] ?? ''}${apellido[0] ?? ''}`.toUpperCase()
const getColor = (str: string) =>
  AVATAR_COLORS[str.charCodeAt(0) % AVATAR_COLORS.length]

export default function GestionUsuarios() {
  const { data: usuarios = [], isPending } = useUsuarios()
  const { data: roles = [] } = useRolesFormulario()
  const createMutation = useCreateUsuario()
  const updateMutation = useUpdateUsuario()
  const deleteMutation = useDeleteUsuario()

  const [busqueda, setBusqueda] = useState('')
  const [modalCrear, setModalCrear] = useState(false)
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [usuarioEliminar, setUsuarioEliminar] = useState<Usuario | null>(null)

  const [formCrear, setFormCrear] = useState({
    nombre: '', apellidoPaterno: '', apellidoMaterno: '',
    correo: '', password: '', departamento: '', rolNombre: ''
  })
  const [formEditar, setFormEditar] = useState({ departamento: '', rolNombre: '' })

  const usuariosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return usuarios
    const q = busqueda.toLowerCase()
    return usuarios.filter(u =>
      u.nombre.toLowerCase().includes(q) ||
      u.apellidoPaterno.toLowerCase().includes(q) ||
      u.correo.toLowerCase().includes(q) ||
      u.departamento.toLowerCase().includes(q)
    )
  }, [usuarios, busqueda])

  const roleNames = roles.map(r => r.nombre)

  const handleCrear = () => {
    const rol = roles.find(r => r.nombre === formCrear.rolNombre)
    if (!rol) return
    createMutation.mutate({
      nombre: formCrear.nombre,
      apellidoPaterno: formCrear.apellidoPaterno,
      apellidoMaterno: formCrear.apellidoMaterno || undefined,
      correo: formCrear.correo,
      password: formCrear.password,
      departamento: formCrear.departamento || undefined,
      idRol: rol.id,
    }, {
      onSuccess: () => {
        setModalCrear(false)
        setFormCrear({ nombre: '', apellidoPaterno: '', apellidoMaterno: '', correo: '', password: '', departamento: '', rolNombre: '' })
      }
    })
  }

  const handleEditar = () => {
    if (!usuarioEditar) return
    const rol = roles.find(r => r.nombre === formEditar.rolNombre)
    if (!rol) return
    updateMutation.mutate(
      { id: usuarioEditar.id, body: { departamento: formEditar.departamento, idRol: rol.id } },
      { onSuccess: () => setUsuarioEditar(null) }
    )
  }

  const handleEliminar = () => {
    if (!usuarioEliminar) return
    deleteMutation.mutate(usuarioEliminar.id, {
      onSuccess: () => setUsuarioEliminar(null)
    })
  }

  const abrirEditar = (u: Usuario) => {
    setFormEditar({ departamento: u.departamento, rolNombre: u.rol.nombre })
    setUsuarioEditar(u)
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-8">
      <PageHeader title="Gestión de Usuarios" description="Administra los usuarios del sistema" />

      <div className="flex items-center gap-4">
        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar por nombre, correo o departamento..."
        />
        <Button onClick={() => setModalCrear(true)}>Nuevo Usuario</Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {['Usuario', 'Departamento', 'Rol', 'Estado', 'Acciones'].map(col => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isPending ? (
              <tr>
                <td data-testid="usuarios-cargando" colSpan={5} className="py-10 text-center text-sm text-gray-400">Cargando usuarios...</td>
              </tr>
            ) : usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-gray-400">No se encontraron usuarios</td>
              </tr>
            ) : (
              usuariosFiltrados.map(u => (
                <tr key={u.id} data-testid="usuario-fila" className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: getColor(u.nombre) }}
                      >
                        {getInitials(u.nombre, u.apellidoPaterno)}
                      </div>
                      <div>
                        <p data-testid="usuario-nombre" className="text-sm font-medium text-gray-900">{u.nombre} {u.apellidoPaterno}</p>
                        <p data-testid="usuario-correo" className="text-xs text-gray-400">{u.correo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {u.departamento || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.rol.esAdmin ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.rol.nombre}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${u.estado === 'ACTIVO' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="!px-3 !py-1 text-xs" onClick={() => abrirEditar(u)}>
                        Editar
                      </Button>
                      <Button variant="ghost" className="!px-3 !py-1 text-xs !text-red-500 !border-red-200 hover:!bg-red-50" onClick={() => setUsuarioEliminar(u)}>
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear */}
      <ModalContainer isOpen={modalCrear} onClose={() => setModalCrear(false)}>
        <h2 className="mb-6 text-xl font-bold text-gray-900">Nuevo Usuario</h2>
        <div className="flex flex-col gap-4 w-full min-w-[460px]">
          <div className="flex gap-4">
            <InputField label="Nombre" value={formCrear.nombre}
              onChange={e => setFormCrear(f => ({ ...f, nombre: e.target.value }))} />
            <InputField label="Apellido Paterno" value={formCrear.apellidoPaterno}
              onChange={e => setFormCrear(f => ({ ...f, apellidoPaterno: e.target.value }))} />
          </div>
          <InputField label="Apellido Materno (opcional)" value={formCrear.apellidoMaterno}
            onChange={e => setFormCrear(f => ({ ...f, apellidoMaterno: e.target.value }))} />
          <InputField label="Correo" type="email" value={formCrear.correo}
            onChange={e => setFormCrear(f => ({ ...f, correo: e.target.value }))} />
          <InputField label="Contraseña" type="password" value={formCrear.password}
            onChange={e => setFormCrear(f => ({ ...f, password: e.target.value }))} />
          <p className="text-xs text-gray-400 -mt-2">
            Mínimo 10 caracteres, al menos una mayúscula y un carácter especial (ej. !@#$%)
          </p>
          <InputField label="Departamento (opcional)" value={formCrear.departamento}
            onChange={e => setFormCrear(f => ({ ...f, departamento: e.target.value }))} />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Rol</span>
            <SelectDropdown options={roleNames} value={formCrear.rolNombre}
              onChange={v => setFormCrear(f => ({ ...f, rolNombre: v }))} placeholder="Seleccionar rol" />
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setModalCrear(false)}>Cancelar</Button>
            <Button onClick={handleCrear} disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Creando...' : 'Crear Usuario'}
            </Button>
          </div>
        </div>
      </ModalContainer>

      {/* Modal Editar */}
      <ModalContainer isOpen={!!usuarioEditar} onClose={() => setUsuarioEditar(null)}>
        <h2 className="mb-6 text-xl font-bold text-gray-900">Editar Usuario</h2>
        <div className="flex flex-col gap-4 w-full min-w-[400px]">
          <InputField label="Departamento" value={formEditar.departamento}
            onChange={e => setFormEditar(f => ({ ...f, departamento: e.target.value }))} />
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">Rol</span>
            <SelectDropdown options={roleNames} value={formEditar.rolNombre}
              onChange={v => setFormEditar(f => ({ ...f, rolNombre: v }))} placeholder="Seleccionar rol" />
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setUsuarioEditar(null)}>Cancelar</Button>
            <Button onClick={handleEditar} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </div>
      </ModalContainer>

      {/* Modal Eliminar */}
      <ModalContainer isOpen={!!usuarioEliminar} onClose={() => setUsuarioEliminar(null)}>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Eliminar Usuario</h2>
        <p className="mb-6 text-sm text-gray-500">
          ¿Estás seguro que deseas eliminar a{' '}
          <strong>{usuarioEliminar?.nombre} {usuarioEliminar?.apellidoPaterno}</strong>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setUsuarioEliminar(null)}>Cancelar</Button>
          <Button
            className="!bg-red-500 hover:!bg-red-600 !border-transparent"
            onClick={handleEliminar}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Eliminando...' : 'Sí, eliminar'}
          </Button>
        </div>
      </ModalContainer>
    </main>
  )
}