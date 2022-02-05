import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const url = '/explore';

describe(
  'Testa todos os elementos da página Explore', () => {
    test('01-Verificando se o icone profile existe.', () => {
      renderWithRouter(<App />, { route: url });
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo Done Recipes existe.', () => {
      renderWithRouter(<App />, { route: url });
      const TITLE_EXP = screen.getByText('Explore');
      expect(TITLE_EXP).toBeInTheDocument();
    });

    test('03-Verificando se o botão Explore Foods existe', () => {
      renderWithRouter(<App />, { route: url });
      const EXP_FOODS_BUTTON = screen.getByTestId('explore-foods');
      expect(EXP_FOODS_BUTTON).toBeInTheDocument();
    });

    test('04-Verificando se o botão Exp. Foods redireciona', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const EXP_FOODS_BUTTON = await screen.findByTestId('explore-foods');
      userEvent.click(EXP_FOODS_BUTTON);
      expect(history.location.pathname).toBe('/explore/foods');
    });

    test('05-Verificando se o botão Explore Drinks existe', async () => {
      renderWithRouter(<App />, { route: url });
      const EXP_DRINKS_BUTTON = await screen.findByTestId('explore-drinks');
      expect(EXP_DRINKS_BUTTON).toBeInTheDocument();
    });

    test('06-Verificando se o botão Exp. Drinks redireciona', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const EXP_DRINKS_BUTTON = await screen.findByTestId('explore-drinks');
      userEvent.click(EXP_DRINKS_BUTTON);
      expect(history.location.pathname).toBe('/explore/drinks');
    });

    test('07-Verificando se o botão DRINKS existe', async () => {
      renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    test('08-Verificando se o botão DRINKS redireciona para /drinks', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      userEvent.click(DRINKS_BUTTON);
      expect(history.location.pathname).toBe('/drinks');
    });

    test('09-Verificando se o botão EXPLORE existe', async () => {
      renderWithRouter(<App />, { route: url });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('10-Verificando se o botão EXPLORE redireciona para /explore', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      userEvent.click(EXPLORE_BUTTON);
      expect(history.location.pathname).toBe('/explore');
    });

    test('11-Verificando se o botão FOOD existe', async () => {
      renderWithRouter(<App />, { route: url });
      const EXPLORE_BUTTON = await screen.findByTestId('food-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('12-Verificando se o botão FOOD redireciona para /foods', async () => {
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
