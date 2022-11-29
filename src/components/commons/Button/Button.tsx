import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  isLoading,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {children}
      {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="1em" thickness={3} />}
    </Button>
  )
}

export default CustomButton
