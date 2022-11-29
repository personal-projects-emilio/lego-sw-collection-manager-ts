import { RootState } from '../index'

export const selectIsAuthenticate = (state: RootState) => !!state.auth.token

export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading
