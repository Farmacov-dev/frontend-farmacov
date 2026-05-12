// src/services/vacunas/getPerfilRiesgo.ts
import api from '../api'

export interface SintomaReporte {
  label: string
  value: number
}

export interface PerfilRiesgoData {
  costoUnitario: number
  porcentajeSintomasGraves: number
  efectividad: number
  totalReportes: number
  topSintomas: SintomaReporte[]
}

const MOCK_PERFIL: Record<number, PerfilRiesgoData> = {
  1: {
    costoUnitario: 19.50,
    porcentajeSintomasGraves: 8.2,
    efectividad: 95,
    totalReportes: 28400,
    topSintomas: [
      { label: 'Dolor de cabeza', value: 3800 },
      { label: 'Fatiga', value: 3600 },
      { label: 'Fiebre', value: 3100 },
      { label: 'Dolor en brazo', value: 2800 },
      { label: 'Náuseas', value: 2200 },
    ],
  },
  2: {
    costoUnitario: 25.00,
    porcentajeSintomasGraves: 6.5,
    efectividad: 94,
    totalReportes: 24100,
    topSintomas: [
      { label: 'Fatiga', value: 4100 },
      { label: 'Dolor de cabeza', value: 3200 },
      { label: 'Fiebre', value: 2800 },
      { label: 'Náuseas', value: 2100 },
      { label: 'Escalofríos', value: 1800 },
    ],
  },
  3: {
    costoUnitario: 4.00,
    porcentajeSintomasGraves: 12.1,
    efectividad: 74,
    totalReportes: 18200,
    topSintomas: [
      { label: 'Dolor de cabeza', value: 3100 },
      { label: 'Fatiga', value: 2900 },
      { label: 'Trombosis', value: 2200 },
      { label: 'Fiebre', value: 1900 },
      { label: 'Náuseas', value: 1400 },
    ],
  },
  4: {
    costoUnitario: 10.00,
    porcentajeSintomasGraves: 9.8,
    efectividad: 66,
    totalReportes: 15600,
    topSintomas: [
      { label: 'Dolor de cabeza', value: 2800 },
      { label: 'Fatiga', value: 2400 },
      { label: 'Fiebre', value: 2100 },
      { label: 'Náuseas', value: 1600 },
      { label: 'Dolor en brazo', value: 1200 },
    ],
  },
  5: {
    costoUnitario: 13.60,
    porcentajeSintomasGraves: 5.3,
    efectividad: 51,
    totalReportes: 12800,
    topSintomas: [
      { label: 'Dolor de cabeza', value: 2200 },
      { label: 'Fatiga', value: 1900 },
      { label: 'Fiebre', value: 1600 },
      { label: 'Dolor en brazo', value: 1300 },
      { label: 'Náuseas', value: 900 },
    ],
  },
  6: {
    costoUnitario: 36.00,
    porcentajeSintomasGraves: 4.1,
    efectividad: 79,
    totalReportes: 10200,
    topSintomas: [
      { label: 'Fatiga', value: 1800 },
      { label: 'Dolor de cabeza', value: 1600 },
      { label: 'Fiebre', value: 1400 },
      { label: 'Náuseas', value: 1100 },
      { label: 'Dolor en brazo', value: 800 },
    ],
  },
}

export const getPerfilRiesgo = async (idVacuna: number): Promise<PerfilRiesgoData> => {
  // return (await api.get(`/vacunas/${idVacuna}/perfil-riesgo`)).data
  return MOCK_PERFIL[idVacuna] ?? MOCK_PERFIL[1]
}