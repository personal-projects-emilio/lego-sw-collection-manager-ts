import React from 'react'
import { fireEvent, render, screen } from 'utils/test'
import { SwitchProps } from '../interface'
import Switch from './Switch'

const initialProps: SwitchProps = {
  value: true,
  onChange: jest.fn(),
}

test('render switch with label', async () => {
  render(<Switch {...initialProps} label="Switch with label" />)
  expect(screen.getByText('Switch with label')).toBeInTheDocument()
  expect(screen.getByDisplayValue('true')).toBeInTheDocument()
  fireEvent.click(screen.getByDisplayValue('true'))
  expect(initialProps.onChange).toHaveBeenCalled()
})

test('render switch without label', async () => {
  render(<Switch {...initialProps} />)
  expect(screen.queryByText('Switch with label')).not.toBeInTheDocument()
})
