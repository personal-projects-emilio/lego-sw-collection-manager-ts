import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from 'api';
import { TagOrCharacNameList, MinifigsList, MinifigsFilters } from 'interfaces/minifigs';
import { getTagsAndCharacNames } from 'utils';

// Define a type for the slice state
interface MinifigsState {
  list: null | MinifigsList;
  tags: null | TagOrCharacNameList;
  characNames: null | TagOrCharacNameList;
  filters: MinifigsFilters;
}

const initialState: MinifigsState = {
  list: null,
  tags: null,
  characNames: null,
  filters: {
    show: 'all',
    characName: null,
    tag: null
  }
}

export const fetchMinifigs = createAsyncThunk('minifigs/fetchMinifigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('minifigs.json').json();
      return response as MinifigsList;
    } catch (err) {
      console.error('Unable to fetch minifigs', err);
      return rejectWithValue(err.response.data)
    }

  }
)

export const minifigsSlice = createSlice({
  name: 'minifigs',
  initialState,
  reducers: {
    setMinifigsFilters: (state, action: PayloadAction<MinifigsFilters>) => {
      state.filters = action.payload
    },
    resetMinifigsFilters: state => {
      state.filters = { show: 'all', tag: null, characName: null }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMinifigs.fulfilled, (state, { payload: list }) => ({
      ...state,
      list,
      ...getTagsAndCharacNames(list)
    }))
  }
})

// Action creators are generated for each case reducer function
export const { setMinifigsFilters, resetMinifigsFilters } = minifigsSlice.actions

export default minifigsSlice.reducer
