import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

describe('Done Recipes page tests', () => {
  test('Test if pathname `/done-recipes` exists', async () => {
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

  test('Test if text `Done Recipes` is rendered', () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/done-recipes'],
    );
    const doneRecipesText = screen.getByRole('heading', {
      name: /done recipes/i,
    });
    expect(doneRecipesText).toBeInTheDocument();
  });
});

// test('', () => {

// });
