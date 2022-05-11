import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('disabled button and unchecked checkbox', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const orderButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(orderButton).toBeDisabled();
});

test('enabling and disabling button by checking checkbox', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole('button', { name: 'Confirm order' });
  // enable button by checking checkbox
  userEvent.click(checkbox);
  expect(orderButton).toBeEnabled();
  // disabling button by checking checkbox again
  userEvent.click(checkbox);
  expect(orderButton).toBeDisabled();
});

test('popover response to hover', async () => {
  render(<SummaryForm />);
  // popover hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  // popover appears on mouseover of checked label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  // disapperas when moused out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
