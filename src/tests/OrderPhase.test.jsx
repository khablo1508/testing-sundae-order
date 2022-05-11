import { toHaveTextContent } from '@testing-library/jest-dom/dist/matchers';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for golden path', async () => {
  // render App
  render(<App />);

  // add ice cream scoops and toppings
  const vanillaScoops = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaScoops);
  userEvent.type(vanillaScoops, '2');

  const cherriesTopping = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(cherriesTopping);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: 'Submit order' });
  userEvent.click(orderButton);

  // check if summary is correct based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const summaryScoopsTotal = screen.getByRole('heading', {
    name: /scoops: \$/i,
  });
  expect(screen.getByText('2 * Vanilla')).toBeInTheDocument();

  const toppingsTotal = screen.getByRole('heading', { name: /toppings: \$/i });
  expect(toppingsTotal).toHaveTextContent('1.50');
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  const summaryTotal = screen.getByRole('heading', { name: /total: \$/i });
  expect(summaryTotal).toHaveTextContent('5.50');

  // accept the conditions and click button to confirm
  const termsAndConditions = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole('button', {
    name: 'Confirm order',
  });
  expect(confirmOrderButton).toBeDisabled();

  userEvent.click(termsAndConditions);
  expect(confirmOrderButton).toBeEnabled();

  userEvent.click(confirmOrderButton);

  // freaking loading that I kept forgetting!!!
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // // confirm order number on confirmation page
  const thankYou = await screen.findByLabelText('thankYou');
  expect(thankYou), toHaveTextContent('Thank you!');
  expect(thankYou).toBeInTheDocument();

  // loading disappears
  const notLoading = screen.queryByText(/loading/i);
  await waitFor(() => {
    expect(notLoading).not.toBeInTheDocument();
  });

  const orderNumber = await screen.findByRole('heading', {
    name: /order number/i,
  });
  expect(orderNumber).toBeInTheDocument();

  // click new order on confirmation page
  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);
  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText(/scoops total: \$/i);
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  const toppingsSubtotal = screen.getByText(/toppings total: \$/i);
  expect(toppingsSubtotal).toHaveTextContent('0.00');
  expect(await screen.getByText('Grand total: $0.00')).toBeInTheDocument();
});
