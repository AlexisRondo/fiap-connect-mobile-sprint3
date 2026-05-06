// Servico de acesso a API do Oracle APEX
// URL base: https://oracleapex.com/ords/alexisrondo/fiapconnect
//
// Os headers Origin e User-Agent sao necessarios porque o WAF da Oracle
// bloqueia requisicoes que parecem vir de mobile/emulador. Forcando esses
// headers a requisicao passa como se fosse um navegador comum.

const API_BASE = "https://oracleapex.com/ords/alexisrondo/fiapconnect";

const headersPadrao = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Origin": "https://oracleapex.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

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

// Busca grupos compativeis com o RM informado
// O calculo de compatibilidade e feito direto no Oracle APEX
export async function buscarGruposCompativeis(
  rm: string,
): Promise<GrupoCompativel[]> {
  const url = `${API_BASE}/grupos-compativeis/${rm}`;
  const response = await fetch(url, {
    method: "GET",
    headers: headersPadrao,
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar grupos: HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.items || [];
}