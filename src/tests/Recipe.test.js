import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

const drinksURl = '/drinks/15997';

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
    const searchInput = screen.getByTestId(searchButton);

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
    const firstElement = await screen.findByTestId('0-recipe-card', {}, { timeout: 2000 });
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
    const divDrinks = await screen.findByTestId('Meal__cards', {}, { timeout: 2000 });
    expect(divDrinks).toBeInTheDocument();
  });
  test('Test if drinks route is render with key Drink', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );
    const divDrinks = await screen.findByTestId('Drink__cards', {}, { timeout: 2000 });
    expect(divDrinks).toBeInTheDocument();
  });

  // test('', () => {

  // })
});

describe('testa os componentes da tela de ingredientes', () => {
  test('testa se o ingredientes aparecem da forma correta', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks'],
    );

    const firstElement = await screen.findByTestId('0-recipe-card', {}, { timeout: 4000 });
    expect(firstElement).toBeInTheDocument();

    userEvent.click(firstElement);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe(drinksURl);
    });
    const instruction = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(instruction).toBeInTheDocument();

    expect(instruction.innerHTML).toBe('Galliano 2 1/2 shots ');
  });
  // test('testa se o link é copiado ao clicar no botao de copiar ', async () => {
  //   renderWithRouter(
  //     <Provider>
  //       <App />
  //     </Provider>,
  //     [drinksURl],
  //   );

  //   const copiarBtn = await screen.findByTestId('share-btn');
  //   expect(copiarBtn).toBeInTheDocument();

  //   userEvent.click(copiarBtn);

  //   const copiarText = await screen.findByText('Link copied!');
  //   expect(copiarText).toBeInTheDocument();
  // });
  test('testa se ao clicar no botao de start recipe é redirecionando para a pagina de in progress', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      [drinksURl],
    );
    const iniciarBtn = await screen.findByTestId('start-recipe-btn');
    expect(iniciarBtn).toBeInTheDocument();

    userEvent.click(iniciarBtn);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/15997/in-progress');
    });
  });
  test('testa se o carousel de recomendacoes existe', async () => {
    renderWithRouter(
      <Provider>
        <App />
      </Provider>,
      ['/drinks/15997'],
    );
    const recomendation = await screen.findByTestId('0-recommendation-card');
    expect(recomendation).toBeInTheDocument();
  });
});
