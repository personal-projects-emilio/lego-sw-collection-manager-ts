import {
  createSlice,
  createAsyncThunk,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import api from 'api'
import { FramesList } from 'interfaces/frames'

interface MinifigsState {
  list: null | FramesList
  isLoading: boolean
  error: any
}

const initialState: MinifigsState = {
  list: null,
  isLoading: false,
  error: null,
}

export const fetchFrames = createAsyncThunk<FramesList>(
  'minifigs/fetchFrames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('frames.json').json<FramesList>()
      const sortedList = response.sort((a, b) => (a.name > b.name ? 1 : -1))
      return sortedList
    } catch (err: any) {
      console.error('Unable to fetch frames', err)
      return rejectWithValue(err.message)
    }
  }
)

const isAPendingAction = isPending(fetchFrames)
const isAFulfilledAction = isFulfilled(fetchFrames)
const isARejectedWithValueAction = isRejectedWithValue(fetchFrames)

export const framesSlice = createSlice({
  name: 'frames',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(fetchFrames), (state, { payload: list }) => {
      state.list = list
    })
    builder.addMatcher(isAPendingAction, (state) => {
      state.isLoading = true
    })
    builder.addMatcher(isAFulfilledAction, (state) => {
      state.isLoading = false
    })
    builder.addMatcher(isARejectedWithValueAction, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
// export const { setMinifigsFilters, resetMinifigsFilters, setMinifigsPagination } = minifigsSlice.actions

export default framesSlice.reducer
