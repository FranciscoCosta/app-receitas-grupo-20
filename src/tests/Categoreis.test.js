import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Meals } from '../Pages';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

describe('Categoreis component tests', () => {
  test('Test if footer component and icons are rendered', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const categoreis = await screen.findByTestId('Beef-category-filter');
    console.log(categoreis);
    expect(categoreis).toBeInTheDocument();
    const allCategoreis = await screen.findByTestId('All-category-filter');

    userEvent.click(categoreis);

    expect(allCategoreis.checked).toBe(false);
    expect(categoreis.checked).toBe(true);
    const catFiltered = await screen.findByTestId('0-recipe-card');
    expect(catFiltered).toBeInTheDocument();

    userEvent.click(categoreis);

    expect(allCategoreis.checked).toBe(true);
    expect(categoreis.checked).toBe(false);

    userEvent.click(allCategoreis);
  });

  test('', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const beefCat = await screen.findByTestId('Beef-category-filter');
    const breakfastCat = await screen.findByTestId('Breakfast-category-filter');

    userEvent.click(beefCat);

    expect(beefCat.checked).toBe(true);
    expect(breakfastCat.checked).toBe(false);

    userEvent.click(breakfastCat);

    expect(beefCat.checked).toBe(false);
    expect(breakfastCat.checked).toBe(true);
  });
});
