// Importar la instancia de Axios ya configurada
import api from '../api'

// le decimos a typescript la forma exacta del rol que viene en cad user 
export interface Rol {
    id: number
    nombre : string
    esAdmin : boolean
}

// la forma completa del usaurio que devueleve el back ya que 
// + export por que otros archivos van a usar a este tipo 

export interface Usuario {
    id: string
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    correo: string
    departamento : string
    estado: string 
    rol : Rol // eso si, // el rol esta anidado dentro del usuario
    creadoEn: string
    actualizadoEn: string
}

// la funcion que hace el request es async, porque HTTP tarda 
//  asi que async = va a tardar 
// api = instacia de axios con el tk configurado 
// get = metodo http
// '/usuarios' = la ruta  que axios agrega la url base del backend
// typescript lo que va a llegar sera un array de usuarios 

export const getUsuarios = async (): Promise<Usuario[]> => {
    const {data} = await api.get<Usuario[]>('/usuarios')
    return data
}
