import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test('display image for each scoop from server', async () => {
  render(<Options optionType='scoops' />);

  // find the images
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const scoopAltText = scoopImages.map((element) => element.alt);
  expect(scoopAltText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('display image for every topping from server', async () => {
  render(<Options optionType='toppings' />);

  // find the images
  const toppingImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  const toppingAltText = toppingImages.map((element) => element.alt);
  expect(toppingAltText).toEqual([
    'Cherries topping',
    'M&Ms topping',
    'Hot fudge topping',
  ]);
});
