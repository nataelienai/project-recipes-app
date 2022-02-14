import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetchMock from './mocks/fetch';
import nationalitiesMock from '../../cypress/mocks/areas';
import mealsMock from '../../cypress/mocks/meals';
import italianMealsMock from '../../cypress/mocks/italianMeals';
import {
  NATIONALITIES_ENDPOINT,
  MEALS_ENDPOINT,
  MEAL_BY_NATIONALITY_ENDPOINT,
} from './mocks/endpoints';

const EXPLORE_FOOD_NATIONALITIES_ROUTE = '/explore/foods/nationalities';
const NATIONALITY_FILTER_TEST_ID = 'explore-by-nationality-dropdown';
const MAX_NUMBER_OF_MEALS = 12;

function assertExistenceOfFirstMeals(meals, limit = MAX_NUMBER_OF_MEALS) {
  meals.slice(0, limit).forEach((meal, index) => {
    const recipeCard = screen.getByTestId(`${index}-recipe-card`);
    const cardImage = screen.getByTestId(`${index}-card-img`);
    const cardName = screen.getByTestId(`${index}-card-name`);

    expect(recipeCard).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', meal.strMealThumb);
    expect(cardName).toHaveTextContent(meal.strMeal);
  });
  const recipeCard = screen.queryByTestId(`${limit}-recipe-card`);
  const cardImage = screen.queryByTestId(`${limit}-card-img`);
  const cardName = screen.queryByTestId(`${limit}-card-name`);

  expect(recipeCard).not.toBeInTheDocument();
  expect(cardImage).not.toBeInTheDocument();
  expect(cardName).not.toBeInTheDocument();
}

describe('Explore By Nationality', () => {
  describe('78 - A tela deve conter os atributos descritos no protótipo', () => {
    it('Há os data-testids de 12 cards e de todas as nacionalidades', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

      await act(async () => {
        renderWithRouter(<App />, { route: EXPLORE_FOOD_NATIONALITIES_ROUTE });
      });

      const nationalityFilter = screen.getByTestId(NATIONALITY_FILTER_TEST_ID);
      expect(nationalityFilter).toBeInTheDocument();

      nationalitiesMock.meals.forEach(({ strArea: nationality }) => {
        const nationalityOption = screen.getByTestId(`${nationality}-option`);
        expect(nationalityOption).toBeInTheDocument();
      });

      const NUMBER_OF_CARDS = 12;
      for (let index = 0; index < NUMBER_OF_CARDS; index += 1) {
        const recipeCard = screen.getByTestId(`${index}-recipe-card`);
        const cardImage = screen.getByTestId(`${index}-card-img`);
        const cardName = screen.getByTestId(`${index}-card-name`);

        expect(recipeCard).toBeInTheDocument();
        expect(cardImage).toBeInTheDocument();
        expect(cardName).toBeInTheDocument();
      }

      const recipeCard = screen.queryByTestId('12-recipe-card');
      const cardImage = screen.queryByTestId('12-card-img');
      const cardName = screen.queryByTestId('12-card-name');

      expect(recipeCard).not.toBeInTheDocument();
      expect(cardImage).not.toBeInTheDocument();
      expect(cardName).not.toBeInTheDocument();

      global.fetch.mockRestore();
    });
  });

  describe('79 - A tela tem as especificações da tela principal de receitas', () => {
    it('Devem ser carregadas as 12 primeiras receitas de comidas', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

      await act(async () => {
        renderWithRouter(<App />, { route: EXPLORE_FOOD_NATIONALITIES_ROUTE });
      });
      expect(fetch).toHaveBeenCalledWith(NATIONALITIES_ENDPOINT);
      expect(fetch).toHaveBeenCalledWith(MEALS_ENDPOINT);
      assertExistenceOfFirstMeals(mealsMock.meals);

      global.fetch.mockRestore();
    });

    it('Os dados filtrados da API mudam conforme o filtro de nacionalidade', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

      await act(async () => {
        renderWithRouter(<App />, { route: EXPLORE_FOOD_NATIONALITIES_ROUTE });
      });

      const nationalityFilter = screen.getByTestId(NATIONALITY_FILTER_TEST_ID);
      await act(async () => {
        userEvent.selectOptions(nationalityFilter, 'Italian');
      });
      expect(fetch).toHaveBeenCalledWith(MEAL_BY_NATIONALITY_ENDPOINT);
      assertExistenceOfFirstMeals(italianMealsMock.meals);

      global.fetch.mockRestore();
    });

    it('Ao clicar no card, a rota deve mudar para a tela de detalhes da receita',
      async () => {
        jest.spyOn(global, 'fetch').mockImplementation(fetchMock);
        let history;

        await act(async () => {
          const renderResult = (
            renderWithRouter(<App />, { route: EXPLORE_FOOD_NATIONALITIES_ROUTE })
          );
          history = renderResult.history;
        });

        const recipeCard = screen.getByTestId('0-recipe-card');
        await act(async () => {
          userEvent.click(recipeCard);
        });

        const mealId = mealsMock.meals[0].idMeal;
        expect(history.location.pathname).toBe(`/foods/${mealId}`);

        global.fetch.mockRestore();
      });
  });

  describe('80 - O dropdown contém todas as áreas retornadas da API', () => {
    test.todo('O dropdown deve conter todas as áreas retornadas da API e a opção "All"');
    test.todo('A opção "All" retorna as receitas sem nenhum filtro');
  });

  describe('81 - Deve haver apenas a rota /explore/foods/nationalities', () => {
    test.todo('A rota /explore/drinks/nationalities retorna um erro de "Not Found"');
  });
});
