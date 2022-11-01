import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

describe('Test page Details Drinks', () => {
  it('Test if route `/meals` is rendered', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
    });
    // const firstElement = screen.getByTestId('0-recipe-card');
    // expect(firstElement).toBeInTheDocument();
  });

  it('Test if `RecipeDetails` is rendered', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals');
      const firstElement = screen.getByTestId('0-recipe-card');
      expect(firstElement).toBeInTheDocument();
    });
  });

  it('Test if route `/recipe-details` is changed when click in element', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const firstElement = await screen.findByTestId('0-recipe-card');
    userEvent.click(firstElement);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52977');
    });
  });
});
