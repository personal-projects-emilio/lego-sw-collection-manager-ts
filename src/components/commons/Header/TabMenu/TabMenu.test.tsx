import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import TabMenu from './TabMenu'
import { render } from 'utils/test'

const logoutHandler = jest.fn()
test('renders the tab menu', () => {
  render(<TabMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: '/minifigs',
  })
  const authTabElement = screen.getByText(/Authentication/i)
  expect(authTabElement).toBeInTheDocument()
})

test('renders the tab menu with logout option', () => {
  render(<TabMenu isAuthenticate={true} logoutHandler={logoutHandler} />)
  const logoutTabElement = screen.getByText(/Logout/i)
  expect(logoutTabElement).toBeInTheDocument()
  fireEvent.click(logoutTabElement)
  expect(logoutHandler).toHaveBeenCalled()
})

test('render the minifigs as selected', () => {
  render(<TabMenu isAuthenticate={false} logoutHandler={logoutHandler} />, {
    route: '/minifigs',
  })

  const minifigsTabElement = screen.getByTestId('minifigs')
  expect(minifigsTabElement).toHaveAttribute('aria-selected', 'true')
})
