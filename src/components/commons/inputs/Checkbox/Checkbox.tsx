import React from 'react'
import { CheckboxProps } from '../interface'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

export const CustomCheckbox = React.forwardRef<any, CheckboxProps>(
  ({ value, label, muiProps, onChange }, ref) => {
    const switchElement = (
      <Checkbox
        ref={ref}
        checked={Boolean(value)}
        value={Boolean(value)}
        indeterminate={value == null}
        color="primary"
        {...muiProps}
        onChange={(e, checked) => {
          if (checked === true && value === false) {
            return onChange?.({ ...e, target: { value: null } })
          }
          return onChange?.(e)
        }}
      />
    )
    if (label)
      return <FormControlLabel control={switchElement} labelPlacement="start" label={label} />
    return switchElement
  }
)

export default CustomCheckbox
