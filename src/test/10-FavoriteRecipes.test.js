import React from 'react';
import { screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const url = '/favorite-recipes';

describe(
  'Testa todos os elementos da página FAVORITE RECIPES', () => {
    test('01-Verificando se o icone profile existe.', () => {
      renderWithRouter(<App />, { route: url });
      const PROFILE_ICON = screen.getByTestId('profile-top-btn');
      expect(PROFILE_ICON).toBeInTheDocument();
    });

    test('02-Verificando se o titulo Done Recipes existe.', () => {
      renderWithRouter(<App />, { route: url });
      const TITLE_DONE = screen.getByText(/Favorite Recipes/i);
      expect(TITLE_DONE).toBeInTheDocument();
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
