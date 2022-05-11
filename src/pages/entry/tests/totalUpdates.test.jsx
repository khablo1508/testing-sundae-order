import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');
  // update the chocolate scoops to 2 and scheck the subtotal again
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings total when toppings change', async () => {
  render(<Options optionType='toppings' />);
  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  const cherries = await screen.findByRole('checkbox', {
    name: 'Cherries',
    exact: false,
  });
  const mAndMs = await screen.findByRole('checkbox', {
    name: 'M&Ms',
    exact: false,
  });
  const hotFudge = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
    exact: false,
  });

  // check if topping subtotal starts with 0.00$
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // update cherries topping to 1 and check the subtotal
  userEvent.click(cherries);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
  // update M&Ms topping to 1 and check the subtotal
  userEvent.click(mAndMs);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
  // update hot fudge topping to 1 and check the subtotal
  userEvent.click(hotFudge);
  expect(toppingsSubtotal).toHaveTextContent('4.50');
  // uncheck hot fudge and check the subtotals
  userEvent.click(hotFudge);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });
    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly with scoops added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /Grand total:/i });

    // add 1 vanilla scoop and check the grand total
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    expect(grandTotal).toHaveTextContent('2.00');

    // add cherries topping and check the grand total
    const cherriesTopping = await screen.findByRole('checkbox', {
      name: 'Cherries',
      exact: false,
    });
    userEvent.click(cherriesTopping);
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly with toppings added first', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // add hot fudge topping and check the grand total
    const hotFudgeTopping = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent('1.50');

    // add 1 chocolate scoop
    const chocolateScoop = await screen.findByRole('spinbutton', {
      name: 'Chocolate',
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly after deleting 1 scoop and a topping', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    // add 2 vanilla scoops(grand total should equal 4.00)
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');

    // add hot fudge topping(grand total should equal 5.50)
    const hotFudgeTopping = await screen.findByRole('checkbox', {
      name: 'Hot fudge',
    });
    userEvent.click(hotFudgeTopping);

    // delete 1 scoop (grand total should be 3.50)
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');

    // remove topping and check grand total
    userEvent.click(hotFudgeTopping);
    expect(grandTotal).toHaveTextContent('2.00');
  });
});
