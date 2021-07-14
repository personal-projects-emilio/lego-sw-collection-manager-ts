import { getStatistics, getTagsAndCharacNames } from "./minifigs";

const minifigsListMock = [{
  characterName: 'Battle Droid',
  id: 'sw0001a',
  name: 'Battle Droid Tan with Back Plate',
  possessed: true,
  tags: [
    'Battle Droid',
    'CIS',
    'Droid'
  ]
},
{
  characterName: 'Battle Droid',
  id: 'sw0001b',
  name: 'Battle Droid Tan without Back Plate',
  possessed: true,
  tags: [
    'Battle Droid',
    'CIS',
    'Droid'
  ]
},
{
  characterName: 'Boba Fett',
  id: 'sw0002',
  name: 'Boba Fett - Classic Grays',
  possessed: true,
  tags: [
    'Bounty Hunter',
    'Fett',
    'Mandalorian'
  ]
},
{
  characterName: 'Aldar Beedo',
  id: 'sw0006',
  name: 'Aldar Beedo',
  possessed: true,
  tags: []
}
]

test("give the minifigs list statistics", () => {
  const statistics = getStatistics(minifigsListMock);
  const expectedResult = { totalNumber: 4, numberOwned: 4, percentageOwned: 100 }
  expect(statistics).toStrictEqual(expectedResult)
});

test("render the minifigs as selected", () => {
  const tagsAndCharacNames = getTagsAndCharacNames(minifigsListMock);
  const expectedResult = {
    tags: [
      { name: 'Battle Droid', amount: 2 },
      { name: 'Bounty Hunter', amount: 1 },
      { name: 'CIS', amount: 2 },
      { name: 'Droid', amount: 2 },
      { name: 'Fett', amount: 1 },
      { name: 'Mandalorian', amount: 1 }
    ],
    characNames: [
      { name: 'Aldar Beedo', amount: 1 },
      { name: 'Battle Droid', amount: 2 },
      { name: 'Boba Fett', amount: 1 }
    ]
  }
  expect(tagsAndCharacNames).toStrictEqual(expectedResult)
});
