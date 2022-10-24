import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Meals } from '../Pages';
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
test('Test Header is render and changes to route profile', () => {
  const { history } = renderWithRouter(<Meals />);

  const profileLink = screen.getByTestId('profile-top-btn');
  const searchLink = screen.getByTestId('search-top-btn');

  expect(profileLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();

  userEvent.click(profileLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/profile');
});

test('Test Header is render and click on search creates input-search', () => {
  renderWithRouter(<Meals />);

  const profileLink = screen.getByTestId('profile-top-btn');
  const searchLink = screen.getByTestId('search-top-btn');

  expect(profileLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();

  userEvent.click(searchLink);

  const searchInput = screen.getByTestId('search-input');

  expect(searchInput).toBeInTheDocument();
});
