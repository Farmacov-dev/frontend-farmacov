import api from '../api'

// no ocupa un body ni devueve nada solo confirma que se fue el usuario 
//  Promise<void> = esta funcion termina sin devolver nada 

export const deleteUsuario = async (id: string): Promise<void> => {
    await api.delete(`/usuarios/${id}`)
}
