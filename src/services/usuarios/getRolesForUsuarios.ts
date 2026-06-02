import api from '../api'

// sin tatntos tecnisismos para roles admin

export interface RolSimple {
    id: number
    nombre: string
    esAdmin: boolean
}

export const getRolesForUsuarios = async (): Promise<RolSimple[]> => {
    const {data} = await api.get<RolSimple[]>('/roles')
    return data 
}
