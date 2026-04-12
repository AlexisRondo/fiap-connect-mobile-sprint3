# FIAP Connect - Mobile App

Aplicativo mobile para formação inteligente de grupos acadêmicos no Challenge Oracle da FIAP.

## Integrantes

- Alexis Rondo - RM: 560384 - 2TDSPS  
- Vinicius Rodrigues - RM: 559611 - 2TDSPS  

## Problema

Na FIAP, os alunos precisam formar grupos de até 3 pessoas para o Challenge, cobrindo 7 disciplinas diferentes.  
O processo atual é manual e desorganizado, dificultando encontrar colegas com habilidades complementares.

## Solução

O FIAP Connect resolve esse problema com um sistema de matchmaking que cruza:

- As disciplinas que o aluno deseja cobrir  
- As disciplinas que faltam nos grupos disponíveis  

Com base nisso, o sistema calcula um percentual de compatibilidade e ordena os grupos mais adequados.

## Tecnologias Utilizadas

- React Native com Expo Router (TypeScript)  
- Firebase Authentication (login com e-mail e senha)  
- TanStack Query (gerenciamento de requisições HTTP)  
- Axios (cliente HTTP)  
- AsyncStorage (persistência local)  
- Oracle APEX (API REST com lógica de matchmaking)  

## Funcionalidades - Sprint 3

- Login e cadastro com Firebase Authentication  
- Persistência de sessão (usuário permanece logado)  
- Proteção de rotas (acesso restrito sem autenticação)  
- Logout funcional  
- Busca de grupos compatíveis via API Oracle APEX  
- Cálculo de compatibilidade baseado nas disciplinas do aluno  
- Tema claro e escuro  
- Tela de competências com:
 - As 7 disciplinas do Challenge e opção "sem preferência"  

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

4. Escaneie o QR Code com o aplicativo Expo Go no celular

## Usuários de Teste

- RM: rm560384 | Senha: teste123  
- RM: rm559611 | Senha: teste456  
- RM: rm111111 | Senha: teste789  

## API Oracle APEX

A busca de grupos compativeis e feita via API REST exposta pelo Oracle APEX:

```bash
GET https://oracleapex.com/ords/alexisrondo/fiapconnect/grupos-compativeis/{RM}
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

Cálculo: das disciplinas que o aluno selecionou no perfil, quantas estão livres (não assumidas) naquele grupo. Exemplo: aluno quer JAVA e IOT, grupo tem JAVA livre mas IOT já assumida → 1/2 = 50%.
Ordenação: a query do APEX já faz ORDER BY percentual_compatibilidade DESC, vagas_disponiveis ASC — ou seja, primeiro os grupos com maior compatibilidade, e em caso de empate, os com menos vagas primeiro (grupo mais completo).
Sem preferência: se o aluno não tem habilidades cadastradas, o COUNT retorna 0 e o CASE retorna 100% pra todos os grupos elegíveis.
Filtros obrigatórios: só aparecem grupos da mesma edição do Challenge (mesmo curso + empresa + semestre de ingresso), com status ABERTO, com vagas disponíveis, e onde o aluno não é membro ativo.

## Vídeo de Apresentação

Link: a definir