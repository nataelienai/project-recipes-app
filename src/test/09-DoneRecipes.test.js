import React from 'react';
import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const url = '/done-recipes';

describe(
  'Testa todos os elementos da página DONE RECIPES', () => {
    test('01-Verificando se o icone profile existe.', () => {
      renderWithRouter(<App />, { route: url });
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo Done Recipes existe.', () => {
      renderWithRouter(<App />, { route: url });
      const TITLE_DONE = screen.getByText(/Done Recipes/i);
      expect(TITLE_DONE).toBeInTheDocument();
    });

    test('03-Verificando se o botão ALL existe', () => {
      renderWithRouter(<App />, { route: url });
      const ALL_BUTTON = screen.getByTestId('filter-by-all-btn');
      expect(ALL_BUTTON).toBeInTheDocument();
    });

    test('04-Verificando se o botão ALL existe', () => {
      renderWithRouter(<App />, { route: url });
      const FOOD_BUTTON = screen.getByTestId('filter-by-food-btn');
      expect(FOOD_BUTTON).toBeInTheDocument();
    });

    test('05-Verificando se o botão ALL existe', () => {
      renderWithRouter(<App />, { route: url });
      const DRINKS_BUTTON = screen.getByTestId('filter-by-drink-btn');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
