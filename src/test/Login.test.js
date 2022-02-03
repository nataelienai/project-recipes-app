/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

import renderWithRouter from './renderWithRouter';

const email = 'email@email.com';
const password = '1234567';

describe(
  'Testa todos os elementos da página de PROFILE', () => {
    test('01-Verificando se o input email existe.', () => {
      renderWithRouter(<App />);

      const INPUT_EMAIL = screen.getByTestId('email-input');

      expect(INPUT_EMAIL).toBeInTheDocument();
    });

    test('02-Verificando se é possivel escreve no input email', () => {
      renderWithRouter(<App />);

      const INPUT_EMAIL = screen.getByTestId('email-input');
      userEvent.type(INPUT_EMAIL, email);

      expect(INPUT_EMAIL.value).toBe(email);
    });

    test('03-Verificando se o input password existe.', () => {
      renderWithRouter(<App />);

      const INPUT_PASSWORD = screen.getByTestId('password-input');

      expect(INPUT_PASSWORD).toBeInTheDocument();
    });

    test('04-Verificando se é possivel escreve no input password', () => {
      renderWithRouter(<App />);

      const INPUT_PASSWORD = screen.getByTestId('password-input');
      userEvent.type(INPUT_PASSWORD, password);

      expect(INPUT_PASSWORD.value).toBe(password);
    });

    test('05-O botão deve estar desabilitado.', () => {
      renderWithRouter(<App />);

      const BUTTON_ENTER = screen.getByTestId('login-submit-btn');
      expect(BUTTON_ENTER.disabled).toBe(true);

      const INPUT_EMAIL = screen.getByTestId('email-input');
      userEvent.type(INPUT_EMAIL, email);

      const INPUT_PASSWORD = screen.getByTestId('password-input');
      userEvent.type(INPUT_PASSWORD, password);

      expect(BUTTON_ENTER.disabled).toBe(false);
    });

    test('06-Verificando info no localStorage', () => {
      renderWithRouter(<App />);

      const INPUT_EMAIL = screen.getByTestId('email-input');
      userEvent.type(INPUT_EMAIL, email);

      const INPUT_PASSWORD = screen.getByTestId('password-input');
      userEvent.type(INPUT_PASSWORD, password);

      const BUTTON_ENTER = screen.getByTestId('login-submit-btn');
      userEvent.click(BUTTON_ENTER);

      expect(localStorage.getItem('user')).toBe('{"email":"email@email.com"}');
      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
    });

    test('07-Clickar no ENTER redireciona pra /foods ?', () => {
      const { history } = renderWithRouter(<App />);

      const INPUT_EMAIL = screen.getByTestId('email-input');
      userEvent.type(INPUT_EMAIL, email);

      const INPUT_PASSWORD = screen.getByTestId('password-input');
      userEvent.type(INPUT_PASSWORD, password);

      const BUTTON_ENTER = screen.getByTestId('login-submit-btn');
      userEvent.click(BUTTON_ENTER);

      expect(history.location.pathname).toBe('/foods');

      const TITLE_FOODS = screen.getByTestId('page-title');
      expect(TITLE_FOODS).toBeInTheDocument();
    });

    // test('?', () => {
    //   renderWithRouter(<App />);
    // });
  },
);
