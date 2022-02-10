import '@testing-library/jest-dom';

describe('Explore Foods e Explore Drinks', () => {
  describe('70 - Implemente os elementos da tela de explorar bebidas ou comidas', () => {
    test.todo('Tem os data-testids corretos para a tela de explorar comidas');
    test.todo('Tem os data-testids corretos para a tela de explorar bebidas');
  });

  describe('71 - Botões de explorar por ingrediente, nacionalidade e receita aleatória',
    () => {
      test.todo(
        'Explore Foods tem os botões "By Ingredient", "By Nationality" e "Suprise me!"',
      );
      test.todo('Explore Drinks tem os botões "By Ingredient" e "Surprise me!"');
    });

  describe('72 - Ao clicar em "By Ingredient", explora receita por ingrediente', () => {
    test.todo('Ao clicar em "By Ingredient", explora comidas por ingrediente');
    test.todo('Ao clicar em "By Ingredient", explora bebidas por ingrediente');
  });

  describe('73 - Ao clicar em "By Nationality", explora comida por nacionalidade', () => {
    test.todo('A rota deve mudar para tela de explorar por nacionalidades');
  });

  describe('74 - Ao clicar em "Surprise me!", vai para uma receita aleatória', () => {
    test.todo('Ao clicar em "Surprise me!", vai para uma comida aleatória');
    test.todo('Ao clicar em "Surprise me!", vai para uma bebida aleatória');
  });
});
