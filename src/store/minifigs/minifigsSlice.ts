import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from 'api';
import { TagOrCharacName, MinifigsList } from 'interfaces/minifigs';
import { getTagsAndCharacNames } from 'utils';

// Define a type for the slice state
interface MinifigsState {
  list: null | MinifigsList;
  tags: null | TagOrCharacName[];
  characNames: null | TagOrCharacName[];
}

const initialState: MinifigsState = {
  list: null,
  tags: null,
  characNames: null
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
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchMinifigs.fulfilled, (state, { payload: list }) => ({
      list,
      ...getTagsAndCharacNames(list)
    }))
  }
})

// Action creators are generated for each case reducer function
// export const { } = minifigsSlice.actions

export default minifigsSlice.reducer
