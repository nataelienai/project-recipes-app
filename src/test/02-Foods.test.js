import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe(
  'Testa todos os elementos da página FOODS', () => {
    test('01-Verificando se o icone profile existe.', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo foods existe.', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const TITLE_FOODS = screen.getByTestId('page-title');
      expect(TITLE_FOODS).toBeInTheDocument();
    });

    test('03-Verificando se o icone search existe.', async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const SEARCH_ICON = await screen.findByTestId('search-top-btn');
      expect(SEARCH_ICON).toBeInTheDocument();
    });

    test('04-Verificando se o botão ALL existe', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const ALL_BUTTON = screen.getByTestId('All-category-filter');
      expect(ALL_BUTTON).toBeInTheDocument();
    });

    test('05-Verificando se o botão BEFF existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const BEEF_BUTTON = await screen.findByTestId('Beef-category-filter');
      expect(BEEF_BUTTON).toBeInTheDocument();
    });

    test('06-Verificando se o botão BREAKFAST existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const BREAKFAST_BUTTON = await screen.findByTestId('Breakfast-category-filter');
      expect(BREAKFAST_BUTTON).toBeInTheDocument();
    });

    test('07-Verificando se o botão CHICKEN existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const CHICKEN_BUTTON = await screen.findByTestId('Chicken-category-filter');
      expect(CHICKEN_BUTTON).toBeInTheDocument();
    });

    test('08-Verificando se o botão DESSERT existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const DESSERT_BUTTON = await screen.findByTestId('Dessert-category-filter');
      expect(DESSERT_BUTTON).toBeInTheDocument();
    });

    test('09-Verificando se o botão GOAT existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const GOAT_BUTTON = await screen.findByTestId('Goat-category-filter');
      expect(GOAT_BUTTON).toBeInTheDocument();
    });

    test('10-Verificando se existe 12 meals cards', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const MAIN_SECTION = await screen.findAllByTestId(/[0-9]-recipe-card/);
      const size = 12;
      expect(MAIN_SECTION).toHaveLength(size);
    });

    test('11-Verificando se o botão DRINKS existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    test('12-Verificando se o botão DRINKS redireciona para /drinks', async () => {
      const { history } = renderWithRouter(<App />, { route: '/foods' });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      userEvent.click(DRINKS_BUTTON);
      expect(history.location.pathname).toBe('/drinks');
    });

    test('13-Verificando se o botão EXPLORE existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('14-Verificando se o botão EXPLORE redireciona para /explore', async () => {
      const { history } = renderWithRouter(<App />, { route: '/foods' });
      const EXPLORE_BUTTON = await screen.findByTestId('explore-bottom-btn');
      userEvent.click(EXPLORE_BUTTON);
      expect(history.location.pathname).toBe('/explore');
    });

    test('15-Verificando se o botão FOOD existe', async () => {
      renderWithRouter(<App />, { route: '/foods' });
      const EXPLORE_BUTTON = await screen.findByTestId('food-bottom-btn');
      expect(EXPLORE_BUTTON).toBeInTheDocument();
    });

    test('16-Verificando se o botão FOOD redireciona para /foods', async () => {
      const { history } = renderWithRouter(<App />, { route: '/drinks' });
      const FOOD_BUTTON = await screen.findByTestId('food-bottom-btn');
      userEvent.click(FOOD_BUTTON);
      expect(history.location.pathname).toBe('/foods');
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
