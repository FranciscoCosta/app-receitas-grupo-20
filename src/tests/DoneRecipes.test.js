import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

const dataMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

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
    const { history } = renderWithRouter(
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

  test('Test if text `Done Recipes` is rendered', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/done-recipes'],
    );
    const title = screen.getByTestId('page-title');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const image1 = screen.getByTestId('0-horizontal-image');
    const text = screen.getByTestId('0-horizontal-top-text');
    const name = screen.getByTestId('0-horizontal-name');
    const date = screen.getByTestId('0-horizontal-done-date');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    const tags = screen.getByTestId('0-Pasta-horizontal-tag');

    expect(title).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(image1).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
    userEvent.click(allBtn);
    userEvent.click(mealBtn);
    expect(name.id).toBe('Spicy Arrabiata Penne');
    userEvent.click(image1);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52771');
    });
  });

  test('Test if text `Done Recipes` is rendered', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/done-recipes'],
    );
    const name = screen.getByTestId('0-horizontal-name');
    expect(name).toBeInTheDocument();
    userEvent.click(name);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52771');
    });
  });

  test('Test if text `Done Recipes` is rendered', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(dataMock));
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/done-recipes'],
    );
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const name = screen.getByTestId('0-horizontal-name');

    expect(drinkBtn).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    userEvent.click(drinkBtn);
    const image1 = screen.getByTestId('0-horizontal-image');
    const drink = await screen.findByText(/Aquamarine/i, {}, { timeout: 4000 });
    expect(drink).toBeInTheDocument();
    userEvent.click(image1);
    const alcool = await screen.findByText(/Alcoholic/i, {}, { timeout: 4000 });
    expect(alcool).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });
});
