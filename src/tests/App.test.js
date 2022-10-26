import React from 'react';
import { findByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Meals } from '../Pages';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

// beforeEach(() => {
//   renderWithRouter(<App />);
// });

describe('Login page tests', () => {
  test('Test if elements are showed', () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
    );

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
});

describe('Header component tests', () => {
  test('Test Header is render and changes to route profile', () => {
    const { history } = renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId('search-top-btn');

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();

    userEvent.click(searchLink);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    userEvent.click(profileLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Test Header is render and click on search creates input-search', async () => {
    renderWithRouter(
      <Provider>
        <Meals />
      </Provider>,
    );

    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId('search-top-btn');

    expect(profileLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();

    userEvent.click(searchLink);
    const searchInput = screen.getByTestId('search-input');

    const inputRadioIngredient = screen.getByTestId('ingredient-search-radio');
    const inputRadioName = screen.getByTestId('name-search-radio');
    const inputRadioFirst = screen.getByTestId('first-letter-search-radio');
    const btnCall = screen.getByTestId('exec-search-btn');

    expect(searchInput).toBeInTheDocument();
    expect(inputRadioIngredient).toBeInTheDocument();
    expect(inputRadioName).toBeInTheDocument();
    expect(inputRadioFirst).toBeInTheDocument();
    expect(btnCall).toBeInTheDocument();
    userEvent.click(inputRadioName);
    userEvent.click(inputRadioFirst);

    userEvent.type(searchInput, 'chicken');
    userEvent.click(inputRadioIngredient);
    userEvent.click(btnCall);

    const card0 = await screen.findByText(
      /Brown Stew Chicken/i,
      {},
      { timeout: 4000 },
    );
    expect(card0).toBeInTheDocument();
  });
});

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

  test('Test if only 1 element is called goes to page details`', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/meals'],
    );
    console.log(history);
    const searchBtn = screen.getByTestId('search-top-btn');
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
  // test('Test if only 1 element is called goes to page details`', async () => {
  //   const { history } = renderWithRouter(
  //     <Provider>
  //       <App />
  //     </Provider>,
  //     ['/meals'],
  //   );
  //   const firstElement = await findByTestId('0-recipe-card', {}, { timeout: 4000 });
  //   expect(firstElement).toBeInTheDocument();

  //   userEvent.click(firstElement);
  //   await waitFor(() => {
  //     const { pathname } = history.location;
  //     expect(pathname).toBe('/meals/52977');
  //   });
  // });
});
