# Recipes App

Recipes App, como o próprio nome alega, é um aplicativo de receitas que permite a visualização, pesquisa, filtragem, marcação como favorito e o acompanhamento da preparação de comidas e bebidas. Inclusive, todo o layout do aplicativo foi construído com foco para dispositivos móveis.

O desenvolvimento do projeto foi realizado em conjunto com [Bruno Fay](https://github.com/brunofay), [Douglas Toledo](https://github.com/duskimm) e [Ronny Velárdez](https://github.com/ronnymv) utilizando as metodologias Scrum e Kanban. Cada membro ficou responsável por uma parte da aplicação, mas nos unimos em pares e em grupo na hora de solucionarmos problemas mais complexos. Dessa forma, fui responsável por:

- Desenvolver a lógica da cópia do link da receita para a área de transferência (clipboard);
- Elaborar a tela de receita em progresso, incluindo toda a lógica que envolve as caixas de seleção (checkbox) de cada ingrediente;
- Construir todas as telas de exploração de comidas e bebidas; e
- Refatorar o código da aplicação, visando a reutilização de componentes.

## Tecnologias utilizadas

O código foi desenvolvido utilizando a biblioteca [React](https://reactjs.org/), incluindo o [React Router](https://reactrouter.com/) para roteamento e o Context API, embutido no próprio React, para gerenciamento de estado da aplicação. Aqui, a Context API foi escolhida devido a sua menor complexidade de configuração quando comparada com a biblioteca Redux, tendo em mente que o projeto seria de porte pequeno.

Além disso, foi utilizado a API do [TheMealDB](https://www.themealdb.com/) para obter as receitas de comidas e a do [TheCocktailDB](https://www.thecocktaildb.com/) para as receitas de bebidas, sendo ambas bancos de dados abertos mantidos pela mesma comunidade.

Os ícones usados na aplicação, que se encontram no diretório `src/image/`, foram fornecidos pela [Trybe](https://betrybe.com).

## Instalação das dependências

Você precisará de um ambiente de execução [Node.js](https://nodejs.org) instalado em sua máquina para executar o comando de instalação de dependências.

Com o repositório clonado e dentro de um terminal:

1. Entre na pasta do repositório:

```
cd project-recipes-app/
```

2. Instale as dependências:

```
npm install
```

## Como executar a aplicação

Para iniciar a aplicação, execute no terminal:

```
npm start
```

## Como executar os testes

Para executar todos os testes:

```
npm test -- --watchAll=false
```

Para executar um teste específico, execute `npm test` com o caminho do arquivo de teste, por exemplo:

```
npm test src/test/05-ExploreRecipes.test.js
```

---
