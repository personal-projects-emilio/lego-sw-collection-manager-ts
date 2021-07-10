import { render, } from '@testing-library/react'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'

export const renderWithMemoryRouter = (ui: JSX.Element) => render(ui, { wrapper: MemoryRouter })

export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}