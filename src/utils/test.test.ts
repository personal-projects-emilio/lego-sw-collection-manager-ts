import { generateMockedMinifigsList } from './test';


test('generateMockedMinifigsList', () => {
  const mockedMinifigsList = generateMockedMinifigsList(10);
  expect(mockedMinifigsList).toHaveLength(10);
  expect(mockedMinifigsList.find(el => el.id === 'sw1')).toBeTruthy();
})
