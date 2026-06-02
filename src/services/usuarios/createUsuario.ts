import api from '../api'
import type { Usuario } from './getUsuarios' // imporatar la interfaz de Usuario 

// el body obvio no sera igual a mi entidad como tal 
export interface CreateUsuarioBody {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno?: string 
    correo: string
    password: string
    departamento?: string // optional
    idRol: number // solo el id no el obj completo 
}

// el back ya devuelve el usaurio completo creado
// por lo que el tipo de retrono es el mismo de getUsario 

export const createUsuario = async (body: CreateUsuarioBody): Promise<Usuario> => {
    const { data } = await api.post<Usuario>('/auth/registro', body)
    return data
}

