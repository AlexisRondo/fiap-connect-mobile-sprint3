// Serviço de Acesso a API do Apex 

import axios from 'axios';

const apexApi = axios.create({
  baseURL: 'https://oracleapex.com/ords/alexisrondo/fiapconnect',
  timeout: 10000,
});

export interface GrupoCompativel {
  id_grupo: number;
  nome_grupo: string;
  descricao_projeto: string;
  max_integrantes: number;
  status_grupo: string;
  total_membros: number;
  vagas_disponiveis: number;
  percentual_compatibilidade: number;
}

export async function buscarGruposCompativeis(rm: string): Promise<GrupoCompativel[]> {
  const response = await apexApi.get(`/grupos-compativeis/${rm}`);
  return response.data.items;
}

export default apexApi;