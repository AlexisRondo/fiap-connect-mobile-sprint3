import { useQuery } from "@tanstack/react-query";
import { buscarGruposCompativeis, GrupoCompativel } from "../services/apexApi";

// Hook para buscar grupos compativeis com o aluno logado
export function useGruposCompativeis(rm: string) {
  return useQuery<GrupoCompativel[]>({
    queryKey: ["grupos-compativeis", rm],
    queryFn: () => buscarGruposCompativeis(rm),
    enabled: !!rm,
  });
}
