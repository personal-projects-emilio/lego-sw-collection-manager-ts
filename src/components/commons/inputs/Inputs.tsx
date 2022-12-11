import React from 'react'
import RadioButtons from './RadioButtons'
import { InputsProps } from './interface'
import AutoComplete from './AutoComplete'
import TextField from './TextField'
import Switch from './Switch'
import Checkbox from './Checkbox'

export const Inputs = React.forwardRef<any, InputsProps>((props, ref) => {
  if (props.type === 'textfield') {
    const { type, ...passedProps } = props
    return <TextField {...passedProps} ref={ref} />
  }
  if (props.type === 'switch') {
    const { type, ...passedProps } = props
    return <Switch {...passedProps} ref={ref} />
  }
  if (props.type === 'autocomplete') {
    const { type, ...passedProps } = props
    return <AutoComplete {...passedProps} ref={ref} />
  }
  if (props.type === 'radiobuttons') {
    const { type, ...passedProps } = props
    return <RadioButtons {...passedProps} ref={ref} />
  }

  if (props.type === 'checkbox') {
    const { type, ...passedProps } = props
    return <Checkbox {...passedProps} ref={ref} />
  }

  return <span>Input not supported</span>
})

export default Inputs
