import React from 'react'
import { fireEvent, render, screen } from 'utils/test'
import NameAndTags, { NameAndTagsProps } from './NameAndTags'

const initialProps: NameAndTagsProps = {
  tags: ['Sith', 'Galactic Empire'],
  characterName: 'Darth Vader',
}
test('render character name chip and set/delete the filter', async () => {
  render(<NameAndTags {...initialProps} />)
  expect(screen.getByTestId(/character-name-chip/i).className).not.toMatch(/colorPrimary/i)
  fireEvent.click(screen.getByTestId(/character-name-chip/i))
  expect(screen.getByTestId(/character-name-chip/i).className).toMatch(/colorPrimary/i)
  fireEvent.keyUp(screen.getByTestId(/character-name-chip/i), {
    key: 'Delete',
  })
  expect(screen.getByTestId(/character-name-chip/i).className).not.toMatch(/colorPrimary/i)
})

test('render tag chip and set/delete the filter', async () => {
  render(<NameAndTags {...initialProps} />)
  expect(screen.getByTestId(/sith/i).className).not.toMatch(/colorPrimary/i)
  fireEvent.click(screen.getByTestId(/sith/i))
  expect(screen.getByTestId(/sith/i).className).toMatch(/colorPrimary/i)
  fireEvent.keyUp(screen.getByTestId(/sith/i), {
    key: 'Delete',
  })
  expect(screen.getByTestId(/sith/i).className).not.toMatch(/colorPrimary/i)
})
