import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Inputs from 'components/commons/inputs'
import { useAppDispatch, useAppSelector, useToggle } from 'hooks'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from 'components/commons/Button'
import { authenticate, selectAuthIsLoading } from 'store/auth'

export type AuthInputs = {
  email: string
  password: string
}

export const Auth: React.FC = () => {
  const [showPassword, toggleShowPassword] = useToggle()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthIsLoading)
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AuthInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<AuthInputs> = (data) => dispatch(authenticate(data))

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: 2,
        margin: 2,
        boxSizing: 'border-box',
        minHeight: (theme) => `calc(100% - ${theme.spacing(4)})`,
      }}
    >
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'This field is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: 'This need to be a valid email',
              },
            }}
            render={({ field, fieldState }) => {
              return (
                <Inputs
                  {...field}
                  label="Email"
                  id="email"
                  placeholder="Email@exemple.com"
                  type="textfield"
                  muiProps={{
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    required: true,
                    fullWidth: true,
                  }}
                />
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'This field is required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Inputs
                  {...field}
                  label="Password"
                  id="password"
                  type="textfield"
                  muiProps={{
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                    required: true,
                    fullWidth: true,
                    type: showPassword ? 'text' : 'password',
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => toggleShowPassword()}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )
            }}
          />
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!isValid}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  )
}

export default Auth
