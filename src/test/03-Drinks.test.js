import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from '../App';

import renderWithRouter from './renderWithRouter';

const url = '/drinks';

describe(
  'Testa todos os elementos da página DRINKS', () => {
    test('01-Verificando se o icone profile existe.', () => {
      renderWithRouter(<App />, { route: url });
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo drinks existe.', () => {
      renderWithRouter(<App />, { route: url });
      const TITLE_DRINKS = screen.getByText(/drinks/i);
      expect(TITLE_DRINKS).toBeInTheDocument();
    });

    test('03-Verificando se o icone search existe.', async () => {
      renderWithRouter(<App />, { route: url });
      const SEARCH_ICON = await screen.findByTestId('search-top-btn');
      expect(SEARCH_ICON).toBeInTheDocument();
    });

    test('04-Verificando se o botão ALL existe', () => {
      renderWithRouter(<App />, { route: url });
      const ALL_BUTTON = screen.getByTestId('All-category-filter');
      expect(ALL_BUTTON).toBeInTheDocument();
    });

    test('05-Verificando se o botão Ordinary Drink existe', async () => {
      renderWithRouter(<App />, { route: url });
      const ORD_BUTTON = await screen.findByTestId('Ordinary Drink-category-filter');
      expect(ORD_BUTTON).toBeInTheDocument();
    });

    test('06-Verificando se o botão COCKTAIL existe', async () => {
      renderWithRouter(<App />, { route: url });
      const COCKTAIL_BUTTON = await screen.findByTestId('Cocktail-category-filter');
      expect(COCKTAIL_BUTTON).toBeInTheDocument();
    });

    test('07-Verificando se o botão MILK existe', async () => {
      renderWithRouter(<App />, { route: url });
      const MILK_BUTTON = await screen
        .findByTestId('Milk / Float / Shake-category-filter');
      expect(MILK_BUTTON).toBeInTheDocument();
    });

    test('08-Verificando se o botão OTHER existe', async () => {
      renderWithRouter(<App />, { route: url });
      const OTHER_BUTTON = await screen.findByTestId('Other/Unknown-category-filter');
      expect(OTHER_BUTTON).toBeInTheDocument();
    });

    test('09-Verificando se o botão COCOA existe', async () => {
      renderWithRouter(<App />, { route: url });
      const COCOA_BUTTON = await screen.findByTestId('Cocoa-category-filter');
      expect(COCOA_BUTTON).toBeInTheDocument();
    });

    test('10-Verificando se existe 12 drinks cards', async () => {
      renderWithRouter(<App />, { route: url });
      const MAIN_SECTION = await screen.findAllByTestId(/[0-9]-recipe-card/);
      const size = 12;
      expect(MAIN_SECTION).toHaveLength(size);
    });

    test('11-Verificando se o botão DRINKS existe', async () => {
      renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    test('12-Verificando se o botão DRINKS redireciona para /drinks', async () => {
      const { history } = renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-btn');
      userEvent.click(DRINKS_BUTTON);
      expect(history.location.pathname).toBe('/drinks');
    });

    test('13-Verificando se o botão EXPLORE existe', async () => {
      renderWithRouter(<App />, { route: url });
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
