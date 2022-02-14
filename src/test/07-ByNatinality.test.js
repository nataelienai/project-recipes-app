import '@testing-library/jest-dom';

describe('Explore By Nationality', () => {
  describe('78 - A tela deve conter os atributos descritos no protótipo', () => {
    test.todo('Há os data-testids de 12 cards e de todas as nacionalidades');
  });

  describe('79 - A tela tem as especificações da tela principal de receitas', () => {
    test.todo('Devem ser carregadas as 12 primeiras receitas de comidas');
    test.todo('Os dados filtrados da API devem mudar conforme o filtro de nacionalidade');
    test.todo('Ao clicar no card, a rota deve mudar para a tela de detalhes da receita');
  });

  describe('80 - O dropdown contém todas as áreas retornadas da API', () => {
    test.todo('O dropdown deve conter todas as áreas retornadas da API e a opção "All"');
    test.todo('A opção "All" retorna as receitas sem nenhum filtro');
  });

  describe('81 - Deve haver apenas a rota /explore/foods/nationalities', () => {
    test.todo('A rota /explore/drinks/nationalities retorna um erro de "Not Found"');
  });
});
