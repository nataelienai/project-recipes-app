import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const url = '/explore/foods/ingredients';

describe(
  'Testa todos os elementos da página By Ingredients', () => {
    test('01-Verificando se o icone profile existe.', () => {
      renderWithRouter(<App />, { route: url });
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo Done Recipes existe.', () => {
      renderWithRouter(<App />, { route: url });
      const TITLE_EXP = screen.getByText('Explore Ingredients');
      expect(TITLE_EXP).toBeInTheDocument();
    });

    test('03-Verificando se existe 12 igredients cards', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const MAIN_SECTION = await screen.findAllByTestId(/[0-9]-recipe-card/);
      const size = 12;
      expect(MAIN_SECTION).toHaveLength(size);
    });

    test('04-Verificando se o card de Ingredient redireciona', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const BY_ING_BUTTON = await screen.findByTestId('0-ingredient-card');
      userEvent.click(BY_ING_BUTTON);
      expect(history.location.pathname).toBe('/foods');
    });

    test('09-Verificando se o botão DRINKS existe', async () => {
      renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    test('10-Verificando se o botão DRINKS redireciona para /drinks', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      userEvent.click(DRINKS_BUTTON);
      expect(history.location.pathname).toBe('/drinks');
    });

    test('11-Verificando se o botão EXPLORE existe', async () => {
      renderWithRouter(<App />, { route: url });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('12-Verificando se o botão EXPLORE redireciona para /explore', async () => {
      const { history } = renderWithRouter(<App />, { route: '/foods' });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      userEvent.click(EXPLORE_BUTTON);
      expect(history.location.pathname).toBe('/explore');
    });

    test('13-Verificando se o botão FOOD existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const EXPLORE_BUTTON = await screen.findByTestId('food-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('14-Verificando se o botão FOOD redireciona para /foods', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const FOOD_BUTTON = await screen.findByTestId('food-bottom-btn');
      userEvent.click(FOOD_BUTTON);
      expect(history.location.pathname).toBe('/foods');
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
