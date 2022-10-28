import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

describe('Profile page tests', () => {
  test('Test if icon profile is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const perfilIcon = screen.getByTestId('profile-top-btn');
    expect(perfilIcon).toBeInTheDocument();
  });

  test('Test if name `Profile` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const profileText = screen.getByTestId('page-title');
    expect(profileText).toBeInTheDocument();
  });

  test('Test if email is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
  });

  test('Test if button `Done Recipes` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(btnDoneRecipes).toBeInTheDocument();
  });

  test('Test if button `Favorite Recipes` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(btnFavoriteRecipes).toBeInTheDocument();
  });

  test('Test if button `Logout` is showed', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    expect(btnLogout).toBeInTheDocument();
  });

  test('Test if input `email` is valid', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const userEmail = screen.getByText(/\S+@\S+\.\S+/);
    expect(userEmail).toBeInTheDocument();
  });

  test('Test if when clicked in `Done Recipes` the route is changed', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnDoneRecipes = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDoneRecipes);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/done-recipes');
    });
  });

  test('Test if when clicked in `Favorite Recipes` the route is changed', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavoriteRecipes);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/favorite-recipes');
    });
  });

  test('Test if when clicked in `Logout` the route is changed', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/profile'],
    );
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  });
});
