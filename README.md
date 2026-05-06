# FIAP Connect - Mobile App

Aplicativo mobile para formação inteligente de grupos acadêmicos no Challenge Sprint da FIAP.

## Integrantes

- Alexis Rondo - RM: 560384 - 2TDSPS  
- Vinicius Rodrigues - RM: 559611 - 2TDSPS 


## Problema

Na FIAP, os alunos precisam formar grupos de até 3 pessoas para o Challenge, cobrindo 7 disciplinas diferentes.  
O processo atual é demorado pois requer intervenção manual dos Coordenadores e Scrum Masters, dificultando encontrar colegas de outras turmas, ainda mais com habilidades complementares.

## Solução

O FIAP Connect resolve esse problema com um sistema de matchmaking inteligente. O aluno faz login, informa quais disciplinas ele pode ou quer cobrir, e o sistema busca automaticamente os grupos que precisam dessas materias.
 
O calculo de compatibilidade funciona da seguinte forma:
 
- O sistema verifica quais disciplinas o aluno selecionou no seu perfil
- Para cada grupo disponivel, verifica quais dessas disciplinas ainda estao livres (nao foram assumidas por nenhum membro)
- O percentual e calculado como: (disciplinas do aluno que estao livres no grupo) / (total de disciplinas que o aluno selecionou) x 100
- Se o aluno marcou "Sem preferencia", todos os grupos elegiveis aparecem com 100%
- A ordenacao prioriza grupos com maior compatibilidade, e em caso de empate, os com menos vagas primeiro
 
Toda essa logica de matchmaking e processada diretamente no Oracle APEX, que recebe o RM do aluno via API REST e retorna os grupos ordenados por compatibilidade.
 
Os filtros obrigatorios sao aplicados automaticamente: o sistema so mostra grupos da mesma edicao do Challenge (mesmo curso + mesma empresa parceira + mesmo semestre de ingresso), com status ABERTO, com vagas disponiveis, e onde o aluno nao e membro ativo. Na query SQL do handler, tem essa linha:

```bash
sqlAND ec.id_edicao = (SELECT u.id_edicao_challenge FROM usuario u WHERE u.rm = :rm)
Isso garante que so aparecem grupos da mesma edicao do Challenge que o aluno.
```

## Tecnologias Utilizadas
 
| Tecnologia | Finalidade |
|------------|-----------|
| React Native | Framework para desenvolvimento mobile multiplataforma |
| Expo Router | Sistema de navegacao baseado em arquivos |
| TypeScript | Tipagem estatica para maior seguranca no codigo |
| Firebase Authentication | Autenticacao real com e-mail/senha e persistencia de sessao |
| TanStack Query | Gerenciamento de estado de servidor e requisicoes HTTP |
| Axios | Cliente HTTP para comunicacao com APIs REST |
| AsyncStorage | Armazenamento local persistente no dispositivo |
| Oracle APEX (ORDS) | API REST com logica de matchmaking processada no banco Oracle |

### Integracao com API Backend
- Requisicoes feitas com TanStack Query (useQuery) para a API do Oracle APEX
- Dados dos grupos compativeis vem da API REST do APEX
- Estado de carregamento (loading) exibido durante requisicoes
- Tratamento de erro com botao de retry
 
### Funcionalidade Oracle APEX
- O matchmaking e processado no Oracle APEX via API REST
- Endpoint: GET /fiapconnect/grupos-compativeis/{RM}
- A logica de compatibilidade roda no banco Oracle, nao no app
- Resultado visivel no app: cards com nome do grupo, descricao, membros e percentual
 
### Navegacao
- Expo Router com file-based routing
- 9 telas distintas com funcionalidades diferentes
- Navegacao entre telas via rotas explicitas
 
### Tema Claro/Escuro
- Suporte completo a tema claro e escuro
- Toggle acessivel no dashboard e na tela de perfil
- Todas as telas respeitam o tema selecionado
 

## Como Executar o Projeto

1. Clone o repositório

2. Instale as dependências:

```bash
npm install
```

3. Inicie o projeto:

```bash
npx expo start
```

4. digite "a" para abrir o android studio ou escaneie com celular com o app Expo Go

## Usuários de Teste

- RM: rm111111 | Senha: teste789 
- RM: rm560384 | Senha: teste123  
- RM: rm559611 | Senha: teste456  

Basta digitar o RM no campo de login e a senha correspondente. O sistema monta o e-mail institucional automaticamente.
 

## API Oracle APEX
 
A busca de grupos compativeis e feita via API REST exposta pelo Oracle APEX:
 
```
GET https://oracleapex.com/ords/alexisrondo/fiapconnect/grupos-compativeis/{RM}
```
 
A URL pode ser testada diretamente no navegador. Exemplo:
```
https://oracleapex.com/ords/alexisrondo/fiapconnect/grupos-compativeis/RM333333
```
 
Exemplo de resposta:
```json
{
  "items": [
    {
      "id_grupo": 1,
      "nome_grupo": "FIAP Connect Team",
      "descricao_projeto": "Plataforma de formacao inteligente de grupos",
      "max_integrantes": 3,
      "status_grupo": "ABERTO",
      "total_membros": 2,
      "vagas_disponiveis": 1,
      "percentual_compatibilidade": 100
    }
  ]
}
```

### Logica de Compatibilidade
 
- Das disciplinas que o aluno selecionou no perfil, quantas estao livres (nao assumidas) naquele grupo
- Exemplo: aluno quer JAVA e IOT, grupo tem JAVA livre mas IOT ja assumida -> 1/2 = 50%
- Ordenacao: maior compatibilidade primeiro, e em caso de empate, grupo mais completo primeiro
- Sem preferencia: se o aluno nao selecionou nenhuma disciplina, todos os grupos retornam 100%
- Filtros obrigatorios: mesma edicao do Challenge, status ABERTO, com vagas, aluno nao e membro
 
---
 
## Nota sobre o Expo Go e Oracle APEX
 
Durante o desenvolvimento, identificamos uma limitacao do Expo Go no emulador Android ao acessar o dominio oracleapex.com. O app consegue fazer requisicoes HTTPS para outros servicos (Firebase Auth, jsonplaceholder) sem problema, mas especificamente para o dominio da Oracle, o runtime nativo do React Native (Hermes) retorna "Network request failed".
 
Essa limitacao nao e do codigo do aplicativo e sim do ambiente Expo Go, que e um app pre-construido sem acesso ao AndroidManifest.xml ou ao network_security_config.xml do Android. A causa mais provavel e uma restricao de certificado SSL ou configuracao especifica do servidor ORDS da Oracle que nao e compativel com o runtime nativo do Expo Go.
 
Evidencias de que o problema e do Expo Go e nao do app:
- A mesma URL funciona perfeitamente no navegador do emulador
- A mesma URL funciona no navegador do computador
- Firebase Auth (HTTPS para servidores Google) funciona normalmente no app
- jsonplaceholder (HTTPS) funciona normalmente no app
- O erro ocorre apenas com o dominio oracleapex.com dentro do Expo Go
 
Como solucao, o app implementa um fallback que utiliza dados espelhados do banco Oracle quando a API do APEX nao esta acessivel. Esses dados sao identicos aos retornados pelo endpoint real, garantindo que o app demonstre o fluxo completo de matchmaking.
 
Na Sprint 4, com o build nativo (necessario para publicacao no Firebase App Distribution), sera possivel configurar o network_security_config.xml e resolver essa limitacao, integrando o app diretamente com o APEX sem fallback.
 
---
 
## Video de Apresentacao

[![Video da apresentação](https://img.youtube.com/vi/OeshUFbvvhU/0.jpg)](https://www.youtube.com/watch?v=OeshUFbvvhU)


---

## Branch `sprint-3-apresentacao` (evolução pós-entrega)

Esta branch contém uma evolução do app feita após a entrega original da Sprint 3 (commit marcado pela tag `sprint-3-entrega`).

A branch `main` permanece intocada — corresponde exatamente ao que está no vídeo do README e ao que foi avaliado.

### O que mudou nesta branch

**Novos endpoints REST no Oracle APEX (módulo `fiapconnect`):**

| Endpoint | Método | Função |
|----------|--------|--------|
| `/usuario/:rm` | GET | Perfil completo do aluno |
| `/habilidades/:rm` | GET | Disciplinas selecionadas pelo aluno |
| `/habilidades/:rm` | POST | Salvar/atualizar disciplinas (DELETE + INSERT) |
| `/grupos/:id` | GET | Dados básicos do grupo |
| `/grupos/:id/membros` | GET | Membros ativos do grupo |
| `/grupos/:id/disciplinas` | GET | Disciplinas com situação (ASSUMIDA / LIVRE) |
| `/solicitacoes/recebidas/:rm` | GET | Convites recebidos pelo aluno |
| `/solicitacoes` | POST | Criar solicitação de entrada |
| `/solicitacoes/:id` | PUT | Aceitar/rejeitar solicitação (atualiza grupo) |

Todos consumidos diretamente pelo app via `fetch`. Cada endpoint tem tratamento de pelo menos 3 exceções diferentes (NO_DATA_FOUND, OTHERS, validações de negócio).

**Telas refatoradas para consumir o Oracle:**
- `profilepage` — exibe nome real, email, telefone, bio, curso/período/unidade vindos do banco
- `skillssetuppage` — carrega disciplinas atuais ao abrir e salva no Oracle ao confirmar
- `searchpage` — cards agora navegam para tela de detalhes
- `invites` — lista solicitações reais com botões aceitar/rejeitar funcionais
- `dashboard` — saudação com primeiro nome real, contador de convites pendentes, status reativo

**Tela nova:**
- `app/grupo/[id].tsx` — detalhes completos do grupo (membros, disciplinas livres/assumidas, solicitar entrada)

### Sobre o problema Expo Go × oracleapex.com

A limitação documentada no README principal foi resolvida nesta branch via headers HTTP customizados (`Origin` e `User-Agent`) na chamada `fetch`, contornando o filtro WAF da Oracle Free Tier. Solução pragmática para apresentacao do projeto

### Sobre segurança dos endpoints

Os endpoints novos estão **sem proteção de privilege** no APEX. A autenticação OAuth2 esta planejado para Sprint 4.

### Como rodar esta branch

```bash
# 1. Clonar o repositório
git clone https://github.com/AlexisRondo/fiap-connect-mobile-sprint3.git

# 2. Entrar na pasta
cd fiap-connect-mobile-sprint3

# 3. Mudar para a branch da apresentação
git checkout sprint-3-apresentacao

# 4. Instalar dependências
npm install

# 5. Iniciar o projeto
npx expo start
```

Mesmas credenciais de teste do README principal (rm560384, rm559611, rm111111).