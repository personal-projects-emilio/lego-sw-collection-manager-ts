import { RootState } from "store";
import { selectFilteredMinifigsList } from './minifigsSelectors'

test("filter minifigs with a tag, character name and missing filters", () => {
  const initialeState: RootState = {
    minifigs: {
      list: [{
        id: "sw0001",
        possessed: true,
        tags: ["droid"],
        characterName: "R2-D2",
        name: "R2-D2"
      },
      {
        id: "sw0002",
        possessed: false,
        tags: ["droid"],
        characterName: "R2-D2",
        name: "R2-D2"
      },
      {
        id: "sw0003",
        possessed: false,
        tags: ["droid"],
        characterName: "R2-D2",
        name: "R2-D2"
      },
      {
        id: "sw0004",
        possessed: false,
        tags: ["sith"],
        characterName: "Darth Vader",
        name: "Darth Vader"
      }],
      characNames: null,
      tags: null,
      filters: {
        show: "missing",
        tag: "droid",
        characName: "R2-D2"
      }
    }
  }

  const expectedResult = [
    {
      id: "sw0002",
      possessed: false,
      tags: ["droid"],
      characterName: "R2-D2",
      name: "R2-D2"
    },
    {
      id: "sw0003",
      possessed: false,
      tags: ["droid"],
      characterName: "R2-D2",
      name: "R2-D2"
    }
  ]

  expect(selectFilteredMinifigsList(initialeState)).toEqual(expectedResult);
});
