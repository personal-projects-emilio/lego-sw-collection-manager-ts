import { configureStore, combineReducers } from '@reduxjs/toolkit'
import minifigsReducer from './minifigs';

export const reducer = combineReducers({
  minifigs: minifigsReducer
})

// Helper function used for testing
export const initStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer,
  preloadedState
})

export const store = initStore();

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
