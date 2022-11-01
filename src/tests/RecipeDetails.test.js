import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Provider from '../Context/Context';

test('Test shareBtn`', async () => {
  renderWithRouter(
    <Provider>
      <App />
    </Provider>,
    ['meals/52977'],
  );
  const shareBtn = screen.getByTestId('share-btn');
  expect(shareBtn).toBeInTheDocument();

  userEvent.click(shareBtn);
  const msg = screen.getByText('Link copied!');
  expect(msg).toBeInTheDocument();
});
