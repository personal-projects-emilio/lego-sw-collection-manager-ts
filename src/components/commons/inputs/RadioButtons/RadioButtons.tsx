import React from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { RadioButtonsProps } from '../interface'

export const RadioButtons = React.forwardRef<any, RadioButtonsProps>(
  ({ value, label, options, row, ...props }, ref) => (
    <FormControl>
      <FormLabel id={label}>{label}</FormLabel>
      <RadioGroup
        ref={ref}
        row={row}
        aria-labelledby={label}
        name={label}
        value={value}
        {...props}
        // onChange={(_e, value) => changeHandler(value)}
      >
        {options.map((option) => (
          <FormControlLabel
            sx={{ textTransform: 'capitalize' }}
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
)

export default RadioButtons
