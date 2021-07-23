import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import api from 'api';
import { TagOrCharacNameList, MinifigsList, MinifigsFilters, MinifigsPagination } from 'interfaces/minifigs';
import { getFilteredMinifigsList, getTagsAndCharacNames } from 'utils';

interface MinifigsState {
  list: null | MinifigsList;
  tags: null | TagOrCharacNameList;
  characNames: null | TagOrCharacNameList;
  filters: MinifigsFilters;
  pagination: MinifigsPagination;
}

const initialState: MinifigsState = {
  list: null,
  tags: null,
  characNames: null,
  filters: {
    show: 'all',
    characName: null,
    tag: null
  },
  pagination: {
    activePage: 0,
    total: 0,
    nbPerPage: 50
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
    setMinifigsFilters: (state, action: PayloadAction<Partial<MinifigsFilters>>) => {
      const updatedFilter = { ...state.filters, ...action.payload }
      const filteredList = getFilteredMinifigsList(state.list, updatedFilter);
      state.filters = updatedFilter;
      state.pagination.activePage = 0;
      state.pagination.total = filteredList?.length || 0;
    },
    resetMinifigsFilters: state => {
      state.filters = { show: 'all', tag: null, characName: null }
      state.pagination.total = state.list?.length || 0;
      state.pagination.activePage = 0;
    },
    setMinifigsPagination: (state, action: PayloadAction<MinifigsPagination>) => {
      state.pagination = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMinifigs.fulfilled, (state, { payload: list }) => ({
      ...state,
      list,
      pagination: {
        ...state.pagination,
        total: list.length
      },
      ...getTagsAndCharacNames(list)
    }))
  }
})

// Action creators are generated for each case reducer function
export const { setMinifigsFilters, resetMinifigsFilters, setMinifigsPagination } = minifigsSlice.actions

export default minifigsSlice.reducer
