import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

const searchButton = 'search-top-btn';
describe('RecipeDetails page tests', () => {
  test('Test if only 1 element is called goes to page details`', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const searchBtn = screen.getByTestId(searchButton);
    userEvent.click(searchBtn);
    const inputRadioName = screen.getByTestId('name-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.click(inputRadioName);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(btnCall);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52771');
    });
  });
  test('Test if only 1 element is called goes to page details`', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const firstElement = await screen.findByTestId(
      '0-recipe-card',
      {},
      { timeout: 4000 },
    );
    expect(firstElement).toBeInTheDocument();

    userEvent.click(firstElement);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52977');
    });
  });
  test('Test if meals route is render with key Meal`', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    const divDrinks = await screen.findByTestId(
      'Meal__cards',
      {},
      { timeout: 4000 },
    );
    expect(divDrinks).toBeInTheDocument();
  });
  test('Test if drinks route is render with key Drink', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const divDrinks = await screen.findByTestId(
      'Drink__cards',
      {},
      { timeout: 4000 },
    );
    expect(divDrinks).toBeInTheDocument();
  });
  test('Test if only 1 elment send to right page id', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const searchBtn = screen.getByTestId(searchButton);
    userEvent.click(searchBtn);
    const inputRadioName = screen.getByTestId('name-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');

    userEvent.click(inputRadioName);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(btnCall);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319');
      const title = screen.getByTestId('recipe-title');
      expect(title).toBeInTheDocument();
    });
  });
  test('Test if sends to in pogress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks/178319'],
    );

    const start = screen.getByTestId('start-recipe-btn');
    userEvent.click(start);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/178319/in-progress');
    });
  });
});
