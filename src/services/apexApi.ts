// Servico de acesso a API do Oracle APEX
// Headers Origin e User-Agent sao necessarios pra contornar o WAF da Oracle

const API_BASE = "https://oracleapex.com/ords/alexisrondo/fiapconnect";

const headersPadrao = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Origin: "https://oracleapex.com",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

// =============== TIPOS ===============

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

export interface Usuario {
  id_usuario: number;
  rm: string;
  nome_completo: string;
  email_institucional: string;
  telefone: string;
  bio: string;
  curso: string;
  periodo: string;
  unidade: string;
  status_busca: string;
}

export interface Habilidade {
  id_habilidade: number;
  sigla: string;
  nome_materia: string;
}

export interface GrupoDetalhes {
  id_grupo: number;
  nome_grupo: string;
  descricao_projeto: string;
  max_integrantes: number;
  status_grupo: string;
  total_membros: number;
  vagas_disponiveis: number;
}

export interface MembroGrupo {
  id_usuario: number;
  rm: string;
  nome_completo: string;
  cargo: string;
  status_membro: string;
  data_entrada: string;
}

export interface DisciplinaGrupo {
  id_habilidade: number;
  sigla: string;
  nome_materia: string;
  situacao: "ASSUMIDA" | "LIVRE";
}

export interface SolicitacaoRecebida {
  id_solicitacao: number;
  tipo_solicitacao: string;
  status: string;
  mensagem: string;
  data_solicitacao: string;
  id_origem: number;
  rm_origem: string;
  nome_origem: string;
  id_grupo: number;
  nome_grupo: string;
}

// =============== ENDPOINTS ===============

// 1 - Busca grupos compativeis com o RM informado
export async function buscarGruposCompativeis(
  rm: string,
): Promise<GrupoCompativel[]> {
  const url = `${API_BASE}/grupos-compativeis/${rm}`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items || [];
}

// 2 - Busca dados do usuario pelo RM
export async function buscarUsuario(rm: string): Promise<Usuario | null> {
  const url = `${API_BASE}/usuario/${rm}`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items && data.items[0] ? data.items[0] : null;
}

// 3 - Busca habilidades cadastradas do usuario
export async function buscarHabilidades(rm: string): Promise<Habilidade[]> {
  const url = `${API_BASE}/habilidades/${rm}`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items || [];
}

// 4 - Salva habilidades
export async function salvarHabilidades(
  rm: string,
  siglas: string[],
): Promise<{ status: string; mensagem: string }> {
  const siglasParam = siglas.join(",");
  const url = `${API_BASE}/habilidades/${rm}?siglas=${siglasParam}`;
  const response = await fetch(url, {
    method: "POST",
    headers: headersPadrao,
    body: "{}",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return await response.json();
}

// 5 - Busca dados basicos de um grupo
export async function buscarGrupoDetalhes(
  idGrupo: number,
): Promise<GrupoDetalhes | null> {
  const url = `${API_BASE}/grupos/${idGrupo}`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items && data.items[0] ? data.items[0] : null;
}

// 6 - Busca membros do grupo
export async function buscarMembrosGrupo(
  idGrupo: number,
): Promise<MembroGrupo[]> {
  const url = `${API_BASE}/grupos/${idGrupo}/membros`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items || [];
}

// 7 - Busca disciplinas do grupo (com situacao ASSUMIDA ou LIVRE)
export async function buscarDisciplinasGrupo(
  idGrupo: number,
): Promise<DisciplinaGrupo[]> {
  const url = `${API_BASE}/grupos/${idGrupo}/disciplinas`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items || [];
}

// 8 - Busca solicitacoes recebidas pelo usuario
export async function buscarSolicitacoesRecebidas(
  rm: string,
): Promise<SolicitacaoRecebida[]> {
  const url = `${API_BASE}/solicitacoes/recebidas/${rm}`;
  const response = await fetch(url, { method: "GET", headers: headersPadrao });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.items || [];
}

// 9 - Cria nova solicitacao de entrada em grupo
export async function criarSolicitacao(
  rmOrigem: string,
  idGrupo: number,
  mensagem: string,
): Promise<{ status: string; id_solicitacao?: number; mensagem?: string }> {
  const params = new URLSearchParams({
    rm_origem: rmOrigem,
    id_grupo: String(idGrupo),
    mensagem: mensagem,
  });
  const url = `${API_BASE}/solicitacoes?${params.toString()}`;
  const response = await fetch(url, {
    method: "POST",
    headers: headersPadrao,
    body: "{}",
  });
  return await response.json();
}

// 10 - Aceitar ou rejeitar solicitacao
export async function responderSolicitacao(
  idSolicitacao: number,
  acao: "aceitar" | "rejeitar",
): Promise<{ status: string; mensagem: string; novo_status?: string }> {
  const url = `${API_BASE}/solicitacoes/${idSolicitacao}?acao=${acao}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: headersPadrao,
    body: "{}",
  });
  return await response.json();
}
