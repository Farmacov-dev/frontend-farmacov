import { useQuery } from "@tanstack/react-query";
import { CACHE_15MIN } from "../config/queryClient";
import { getHistorialKpis } from "../services/historial/getHistorial";
import { getBitacora } from "../services/historial/getBitacora";

export const useHistorialUsers = (page: number = 0) => {
  return useQuery({
    queryKey: ["bitacora", page],
    queryFn: () => getBitacora(page),
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  });
};

export const useHistorialKpis = () => {
  return useQuery({
    queryKey: ["historial-kpis"],
    queryFn: getHistorialKpis,
    staleTime: CACHE_15MIN,
    gcTime: CACHE_15MIN,
  });
};
