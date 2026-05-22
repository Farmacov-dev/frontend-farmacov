import { useQuery } from "@tanstack/react-query";
import { CACHE_15MIN } from "../config/queryClient";
import { getHistorialKpis, getHistorialUsers } from "../services/historial/getHistorial";

export const useHistorialUsers = () => {
  return useQuery({
    queryKey: ["historial-users"],
    queryFn: getHistorialUsers,
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
