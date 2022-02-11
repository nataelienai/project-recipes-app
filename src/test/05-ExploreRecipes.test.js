import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import '@testing-library/jest-dom';

const EXPLORE_FOODS_ROUTE = '/explore/foods';
const EXPLORE_DRINKS_ROUTE = '/explore/drinks';
const EXPLORE_FOODS_BY_INGREDIENT_ROUTE = '/explore/foods/ingredients';
const EXPLORE_DRINKS_BY_INGREDIENT_ROUTE = '/explore/drinks/ingredients';
const EXPLORE_FOODS_BY_NATIONALITY_ROUTE = '/explore/foods/nationalities';
const EXPLORE_BY_INGREDIENT_TEST_ID = 'explore-by-ingredient';
const EXPLORE_BY_NATIONALITY_TEST_ID = 'explore-by-nationality';
const SURPRISE_ME_TEST_ID = 'explore-surprise';

describe('Explore Foods e Explore Drinks', () => {
  describe('70 - Implemente os elementos da tela de explorar bebidas ou comidas', () => {
    it('Tem os data-testids corretos para a tela de explorar comidas', () => {
      renderWithRouter(<App />, { route: EXPLORE_FOODS_ROUTE });

      const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT_TEST_ID);
      const exploreByNationalityBtn = screen.getByTestId(EXPLORE_BY_NATIONALITY_TEST_ID);
      const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_TEST_ID);

      expect(exploreByIngredientBtn).toBeInTheDocument();
      expect(exploreByNationalityBtn).toBeInTheDocument();
      expect(surpriseMeBtn).toBeInTheDocument();
    });

    it('Tem os data-testids corretos para a tela de explorar bebidas', () => {
      renderWithRouter(<App />, { route: EXPLORE_DRINKS_ROUTE });

      const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT_TEST_ID);
      const exploreByNationalityBtn = screen.queryByTestId(
        EXPLORE_BY_NATIONALITY_TEST_ID,
      );
      const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_TEST_ID);

      expect(exploreByIngredientBtn).toBeInTheDocument();
      expect(exploreByNationalityBtn).not.toBeInTheDocument();
      expect(surpriseMeBtn).toBeInTheDocument();
    });
  });

  describe('71 - Botões de explorar por ingrediente, nacionalidade e receita aleatória',
    () => {
      it('Explore Foods tem os botões "By Ingredient", "By Nationality" e "Suprise me!"',
        () => {
          renderWithRouter(<App />, { route: EXPLORE_FOODS_ROUTE });

          const exploreByIngredientBtn = screen.getByTestId(
            EXPLORE_BY_INGREDIENT_TEST_ID,
          );
          const exploreByNationalityBtn = screen.getByTestId(
            EXPLORE_BY_NATIONALITY_TEST_ID,
          );
          const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_TEST_ID);

          expect(exploreByIngredientBtn).toHaveTextContent('By Ingredient');
          expect(exploreByNationalityBtn).toHaveTextContent('By Nationality');
          expect(surpriseMeBtn).toHaveTextContent('Surprise me!');
        });
      it('Explore Drinks tem os botões "By Ingredient" e "Surprise me!"', () => {
        renderWithRouter(<App />, { route: EXPLORE_DRINKS_ROUTE });

        const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT_TEST_ID);
        const exploreByNationalityBtn = screen.queryByTestId(
          EXPLORE_BY_NATIONALITY_TEST_ID,
        );
        const surpriseMeBtn = screen.getByTestId(SURPRISE_ME_TEST_ID);

        expect(exploreByIngredientBtn).toHaveTextContent('By Ingredient');
        expect(exploreByNationalityBtn).not.toBeInTheDocument();
        expect(surpriseMeBtn).toHaveTextContent('Surprise me!');
      });
    });

  describe('72 - Ao clicar em "By Ingredient", explora receita por ingrediente', () => {
    it('Ao clicar em "By Ingredient", explora comidas por ingrediente', () => {
      const { history } = renderWithRouter(<App />, { route: EXPLORE_FOODS_ROUTE });

      const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT_TEST_ID);
      userEvent.click(exploreByIngredientBtn);

      expect(history.location.pathname).toBe(EXPLORE_FOODS_BY_INGREDIENT_ROUTE);
    });

    it('Ao clicar em "By Ingredient", explora bebidas por ingrediente', () => {
      const { history } = renderWithRouter(<App />, { route: EXPLORE_DRINKS_ROUTE });

      const exploreByIngredientBtn = screen.getByTestId(EXPLORE_BY_INGREDIENT_TEST_ID);
      userEvent.click(exploreByIngredientBtn);

      expect(history.location.pathname).toBe(EXPLORE_DRINKS_BY_INGREDIENT_ROUTE);
    });
  });

  describe('73 - Ao clicar em "By Nationality", explora comida por nacionalidade', () => {
    it('A rota deve mudar para tela de explorar por nacionalidades', () => {
      const { history } = renderWithRouter(<App />, { route: EXPLORE_FOODS_ROUTE });

      const exploreByNationalityBtn = screen.getByTestId(EXPLORE_BY_NATIONALITY_TEST_ID);
      userEvent.click(exploreByNationalityBtn);

      expect(history.location.pathname).toBe(EXPLORE_FOODS_BY_NATIONALITY_ROUTE);
    });
  });

  describe('74 - Ao clicar em "Surprise me!", vai para uma receita aleatória', () => {
    it.todo('Ao clicar em "Surprise me!", vai para uma comida aleatória');
    it.todo('Ao clicar em "Surprise me!", vai para uma bebida aleatória');
  });
});
