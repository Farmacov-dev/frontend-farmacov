import { getVacunas } from '../vacunas/getVacunas'

export interface CostoVacunaItem {
  label: string
  value: number
}

export const getCostosVacuna = async (): Promise<CostoVacunaItem[]> => {
  const vacunas = await getVacunas()

  return vacunas.slice(0, 5).map((vacuna) => ({
    label: vacuna.farmaceutica === 'AstraZeneca'
      ? 'AZ'
      : vacuna.farmaceutica === 'Johnson & Johnson'
        ? 'J&J'
        : vacuna.farmaceutica,
    value: vacuna.costo,
  }))
}
