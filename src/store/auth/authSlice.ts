import { createSlice, createAsyncThunk, PayloadAction, createAction } from '@reduxjs/toolkit'
import ky from 'ky'
import history from 'appHistory'

interface AuthState {
  token: null | string
  userId: null | string
  error: any
  isLoading: boolean
}

interface AuthResponse {
  idToken: string
  displayName: string
  kind: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

interface AuthPayload {
  email: string
  password: string
}

type AutoSignIn = {
  token: string
  userId: string
}

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  isLoading: false,
}

export const authenticate = createAsyncThunk<AuthResponse, AuthPayload>(
  'auth/authenticate',
  async (payload, { rejectWithValue }) => {
    try {
      const response: AuthResponse = await ky
        .post(process.env.REACT_APP_AUTH_BASEURL, {
          json: {
            ...payload,
            returnSecureToken: true,
          },
        })
        .json()
      // TODO: Add redirectRoute when starting working on other mages than /minifigs
      history.push('/minifigs')
      return response
    } catch (err: any) {
      console.error('Unable to authenticate', err)
      return rejectWithValue(err.response.data)
    }
  }
)

// Empty action that get intercepted by the middleware
export const tryAutoSignIn = createAction('auth/tryAutoSignIn')

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    autoSignIn: (state, action: PayloadAction<AutoSignIn>) => {
      const { userId, token } = action.payload
      state.token = token
      state.userId = userId
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(authenticate.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.token = payload.idToken
      state.userId = payload.localId
    })
    builder.addCase(authenticate.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload
    })
  },
})

// Action creators are generated for each case reducer function
export const { logout, autoSignIn } = authSlice.actions

export default authSlice.reducer
