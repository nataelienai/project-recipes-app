import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './renderWithRouter';

const INPUT_EMAIL_ID = 'email-input';
const INPUT_PASSWORD_ID = 'password-input';
const BUTTON_ID = 'login-submit-btn';
const email = 'email@email.com';
const password = '1234567';

describe(
  'Testa todos os elementos da página de PROFILE', () => {
    test('01 - Testando o caminho até o Profile ? ?', () => {
      renderWithRouter(<App />);

      const INPUT_EMAIL = screen.getByTestId(INPUT_EMAIL_ID);
      expect(INPUT_EMAIL).toBeInTheDocument();
      userEvent.type(INPUT_EMAIL, email);
      expect(INPUT_EMAIL.value).toBe(email);

      const INPUT_PASSWORD = screen.getByTestId(INPUT_PASSWORD_ID);
      expect(INPUT_PASSWORD).toBeInTheDocument();
      userEvent.type(INPUT_PASSWORD, password);
      expect(INPUT_PASSWORD.value).toBe(password);

      const BUTTON_ENTER = screen.getByTestId(BUTTON_ID);
      userEvent.click(BUTTON_ENTER);
      expect(screen.getByText(/foods/i)).toBeInTheDocument();

      const BUTTON_PROFILE = screen.getByTestId('profile-top-btn');
      userEvent.click(BUTTON_PROFILE);
      expect(screen.getByText(/profile/i)).toBeInTheDocument();

      const paragraph = screen.getByTestId('profile-email');
      expect(paragraph).toBeInTheDocument();
    });

    test('02-O email do usuario esta visivel ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const { pathname } = history.location;
      expect(pathname).toBe('/profile');

      const p = {
        value: email,
      };

      expect(p.value).toBe(email);
    });

    test('03-Existe o botão DONE RECIPES ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const { pathname } = history.location;
      expect(pathname).toBe('/profile');

      const DONE = screen.getByText(/done recipes/i);
      expect(DONE).toBeInTheDocument();
    });

    test('04-Ao clickar no botão DONE RECIPES redirecionado pra /done-recipes ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const DONE_RECIPES = screen.getByTestId('profile-done-btn');
      userEvent.click(DONE_RECIPES);

      expect(screen.getByText(/done recipes/i)).toBeInTheDocument();
    });

    test('05 - Existe o botão FAVORITE RECIPES ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const { pathname } = history.location;
      expect(pathname).toBe('/profile');

      expect(screen.getByText(/favorite recipes/i)).toBeInTheDocument();
    });

    test('06-Ao clickar no botão FAVORITE, redirecionado pra /favorite-recipes ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const FAVORITE_RECIPES = screen.getByTestId('profile-favorite-btn');
      userEvent.click(FAVORITE_RECIPES);

      expect(screen.getByText(/Favorite Recipes/i)).toBeInTheDocument();
    });

    test('07 - Existe o botão LOGOUT ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const { pathname } = history.location;
      expect(pathname).toBe('/profile');

      expect(screen.getByText(/logout/i)).toBeInTheDocument();
    });

    test('08-Ao clickar no LOGOUT, redirecionado pra / (home) ?', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/profile');

      const LOGOUT = screen.getByTestId('profile-logout-btn');
      userEvent.click(LOGOUT);

      const INPUT_EMAIL = screen.getByTestId(INPUT_EMAIL_ID);
      expect(INPUT_EMAIL).toBeInTheDocument();
    });
  },
);
