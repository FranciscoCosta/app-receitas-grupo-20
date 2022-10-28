import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Meals } from '../Pages';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

describe('Footer component tests', () => {
  test('Test if footer component and icons are rendered', () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    expect(mealsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();
  });

  test('Test if route is changed when click on link `Meals`', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });

  test('Test if route is changed when click on link `Drinks`', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
});
