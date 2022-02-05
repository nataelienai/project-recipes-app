import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from '../App';

import renderWithRouter from './renderWithRouter';

// const INPUT_EMAIL_ID = 'email-input';
// const INPUT_PASSWORD_ID = 'password-input';
// const BUTTON_ID = 'login-submit-btn';
// const email = 'email@email.com';
// const password = '1234567';

describe(
  'Testa todos os elementos da página de FOODS', () => {
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
      const DRINKS_BUTTON = await screen.findByTestId('drinks-bottom-filter');
      expect(DRINKS_BUTTON).toBeInTheDocument();
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
