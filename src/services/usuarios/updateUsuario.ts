import api from '../api'
import type { Usuario } from './getUsuarios'

// actulizo al dude pero solo son solo depa y rol 

export interface UpdateUsuarioBody {
    departamento: string
    idRol: number
}

// en la uncion vamo a recibir el id del user a editar + campos nuevos 
// el id va en la url, el body solo lleva lo que cambia 

export const updateUsuario = async (id: string, body: UpdateUsuarioBody): Promise<Usuario> => {
    const {data} = await api.put<Usuario>(`/usuarios/${id}`, body)
    return data
}

