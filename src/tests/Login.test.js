import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Provider from '../Context/Context';
import renderWithRouter from './renderWithRouter';

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
