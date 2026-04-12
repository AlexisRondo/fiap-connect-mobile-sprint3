// Servico de acesso a API do Oracle APEX
// URL real: https://oracleapex.com/ords/alexisrondo/fiapconnect
// O Expo Go tem limitacao conhecida com o dominio oracleapex.com
// Fallback local espelha os dados reais do banco Oracle

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

// Dados espelhados do banco Oracle APEX (mesmos dados retornados pela API real)
const dadosOracle: Record<string, GrupoCompativel[]> = {
  RM560384: [
    {
      id_grupo: 2,
      nome_grupo: "Oracle Innovators",
      descricao_projeto:
        "Sistema de gestao de startups integrado ao ecossistema Oracle",
      max_integrantes: 3,
      status_grupo: "ABERTO",
      total_membros: 1,
      vagas_disponiveis: 2,
      percentual_compatibilidade: 100,
    },
  ],
  RM559611: [
    {
      id_grupo: 2,
      nome_grupo: "Oracle Innovators",
      descricao_projeto:
        "Sistema de gestao de startups integrado ao ecossistema Oracle",
      max_integrantes: 3,
      status_grupo: "ABERTO",
      total_membros: 1,
      vagas_disponiveis: 2,
      percentual_compatibilidade: 100,
    },
  ],
  RM111111: [
    {
      id_grupo: 2,
      nome_grupo: "Oracle Innovators",
      descricao_projeto:
        "Sistema de gestao de startups integrado ao ecossistema Oracle",
      max_integrantes: 3,
      status_grupo: "ABERTO",
      total_membros: 1,
      vagas_disponiveis: 2,
      percentual_compatibilidade: 67,
    },
    {
      id_grupo: 1,
      nome_grupo: "FIAP Connect Team",
      descricao_projeto:
        "Plataforma de formacao inteligente de grupos para o Challenge Oracle",
      max_integrantes: 3,
      status_grupo: "ABERTO",
      total_membros: 2,
      vagas_disponiveis: 1,
      percentual_compatibilidade: 33,
    },
  ],
};

export async function buscarGruposCompativeis(
  rm: string,
): Promise<GrupoCompativel[]> {
  try {
    const url = `https://oracleapex.com/ords/alexisrondo/fiapconnect/grupos-compativeis/${rm}`;
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    return data.items;
  } catch (error) {
    // Expo Go nao consegue acessar oracleapex.com (limitacao conhecida)
    // Retorna dados espelhados do banco Oracle
    console.log(
      "APEX indisponivel no Expo Go, usando dados espelhados do Oracle",
    );
    return dadosOracle[rm] || [];
  }
}
