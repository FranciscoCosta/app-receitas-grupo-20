import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// beforeEach(() => {
//   renderWithRouter(<App />);
// });
test('Login Page elements', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  const { history } = renderWithRouter(<App />);
  // elements Login Page
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const btnLogin = screen.getByTestId('login-submit-btn');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(btnLogin).toBeInTheDocument();

  userEvent.type(emailInput, 'teste@gmail.com');
  userEvent.type(passwordInput, '123456A');
  userEvent.click(btnLogin);
  const { pathname } = history.location;
  expect(pathname).toBe('/meals');
});
