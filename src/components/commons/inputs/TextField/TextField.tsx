import React from 'react'
import TextField from '@mui/material/TextField'
import { TextFieldProps } from '../interface'

export const CustomTextField = React.forwardRef<any, TextFieldProps>(
  ({ muiProps, ...props }, ref) => (
    <TextField
      variant="outlined"
      ref={ref}
      InputLabelProps={{ shrink: true }}
      {...muiProps}
      {...props}
    />
  )
)

export default CustomTextField
