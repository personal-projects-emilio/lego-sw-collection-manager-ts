import { configureStore, combineReducers } from '@reduxjs/toolkit'
import minifigsReducer from './minifigs'
import setsReducer from './sets'
import authReducer, { authMiddleware } from './auth'

export const reducer = combineReducers({
  minifigs: minifigsReducer,
  sets: setsReducer,
  auth: authReducer,
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
