import { configureStore, combineReducers } from '@reduxjs/toolkit'
import minifigsReducer from './minifigs'
import authReducer, { authMiddleware } from './auth'
import framesReducer from './frames'

export const reducer = combineReducers({
  minifigs: minifigsReducer,
  auth: authReducer,
  frames: framesReducer,
})

// Helper function used for testing
export const initStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  })

export const store = initStore()

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export default store
