// src/services/vacunas/getVacunaDetalle.ts
import api from '../api'

export interface EfectoSecundario {
  descripcion: string
  severidad: 'leve' | 'moderado' | 'grave'
}

export interface VacunaDetalle {
  id: number
  nombre: string
  farmaceutica: string
  tipo: string
  descripcionGeneral: string
  temperatura: number
  tiempoAmbiente: number | null
  costoUnitario: number
  efectosSecundarios: EfectoSecundario[]
}

const MOCK_DETALLE: Record<number, VacunaDetalle> = {
  1: {
    id: 1,
    nombre: 'Comirnaty',
    farmaceutica: 'Pfizer-BioNTech',
    tipo: 'ARNm',
    descripcionGeneral: 'Vacuna basada en ARN mensajero. Proporciona instrucciones a las células para producir una proteína inofensiva que genera una respuesta inmunitaria.',
    temperatura: -70,
    tiempoAmbiente: 2,
    costoUnitario: 19.50,
    efectosSecundarios: [
      { descripcion: 'Problemas Cardíacos', severidad: 'grave' },
      { descripcion: 'Disnea', severidad: 'moderado' },
    ],
  },
  2: {
    id: 2,
    nombre: 'Spikevax',
    farmaceutica: 'Moderna',
    tipo: 'ARNm',
    descripcionGeneral: 'Vacuna de ARNm que utiliza una secuencia genética para instruir a las células a producir la proteína spike del virus.',
    temperatura: -20,
    tiempoAmbiente: 12,
    costoUnitario: 25.00,
    efectosSecundarios: [
      { descripcion: 'Fatiga', severidad: 'leve' },
      { descripcion: 'Dolor muscular', severidad: 'leve' },
    ],
  },
  3: {
    id: 3,
    nombre: 'Vaxzevria',
    farmaceutica: 'AstraZeneca',
    tipo: 'Vector viral',
    descripcionGeneral: 'Vacuna de vector viral que usa un adenovirus modificado para introducir material genético del coronavirus en las células.',
    temperatura: 2,
    tiempoAmbiente: null,
    costoUnitario: 4.00,
    efectosSecundarios: [
      { descripcion: 'Trombosis', severidad: 'grave' },
      { descripcion: 'Fiebre', severidad: 'leve' },
    ],
  },
  4: {
    id: 4,
    nombre: 'Janssen',
    farmaceutica: 'Johnson & Johnson',
    tipo: 'Vector viral',
    descripcionGeneral: 'Vacuna de una sola dosis basada en vector viral. Utiliza un adenovirus para transportar instrucciones genéticas.',
    temperatura: 2,
    tiempoAmbiente: null,
    costoUnitario: 10.00,
    efectosSecundarios: [
      { descripcion: 'Dolor de cabeza', severidad: 'leve' },
      { descripcion: 'Náusea', severidad: 'leve' },
    ],
  },
  5: {
    id: 5,
    nombre: 'CoronaVac',
    farmaceutica: 'Sinovac',
    tipo: 'Virus inactivado',
    descripcionGeneral: 'Vacuna de virus inactivado que utiliza partículas del coronavirus SARS-CoV-2 inactivadas para generar una respuesta inmune.',
    temperatura: -18,
    tiempoAmbiente: null,
    costoUnitario: 13.60,
    efectosSecundarios: [
      { descripcion: 'Dolor en el sitio de inyección', severidad: 'leve' },
    ],
  },
  6: {
    id: 6,
    nombre: 'Sinopharm',
    farmaceutica: 'Sinopharm',
    tipo: 'Virus inactivado',
    descripcionGeneral: 'Vacuna de virus inactivado desarrollada por el Instituto de Productos Biológicos de Beijing.',
    temperatura: 2,
    tiempoAmbiente: null,
    costoUnitario: 36.00,
    efectosSecundarios: [
      { descripcion: 'Fatiga leve', severidad: 'leve' },
      { descripcion: 'Dolor muscular', severidad: 'leve' },
    ],
  },
}

export const getVacunaDetalle = async (id: number): Promise<VacunaDetalle> => {
  // return (await api.get(`/vacunas/${id}`)).data
  return MOCK_DETALLE[id] ?? MOCK_DETALLE[1]
}