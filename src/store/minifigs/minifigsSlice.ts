import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import api from 'api'
import { MinifigsList, MinifigsFilters, Minifig } from 'types/minifigs'
import { RootState } from 'store'
import { getFilteredMinifigsList, getTagsAndCharacNames, restUpdateMinifigsList } from 'utils'
import { findIndexById } from 'utils/array'
import { LabelAndAmount, Pagination } from 'types/misce'

interface MinifigsState {
  list: null | MinifigsList
  tags: null | LabelAndAmount[]
  characNames: null | LabelAndAmount[]
  filters: MinifigsFilters
  pagination: Pagination
  isLoading: boolean
  error: any
}

const initialState: MinifigsState = {
  list: null,
  tags: null,
  characNames: null,
  isLoading: false,
  error: null,
  filters: {
    show: 'all',
    characName: null,
    tag: null,
  },
  pagination: {
    activePage: 0,
    total: 0,
    nbPerPage: 50,
  },
}

export const fetchMinifigs = createAsyncThunk<MinifigsList>(
  'minifigs/fetchMinifigs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('minifigs.json').json<MinifigsList>()
      return response
    } catch (err: any) {
      console.error('Unable to fetch minifigs', err)
      return rejectWithValue(err.message)
    }
  }
)

export const toggleMinifigOwned = createAsyncThunk<string, string, { state: RootState }>(
  'minifigs/toggleMinifigOwned',
  async (minifigId, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    if (!token) return minifigId

    const { list } = state.minifigs
    const indexOfMinifig = findIndexById(list, minifigId)
    if (indexOfMinifig === undefined || indexOfMinifig === -1 || !list)
      return rejectWithValue('No minifig with that id')

    try {
      await api.patch(`minifigs/${indexOfMinifig}.json?auth=${token}`, {
        json: {
          possessed: !list[indexOfMinifig].possessed,
        },
      })
      return minifigId
    } catch (err: any) {
      console.error('Unable to toggle minifig owned', err)
      return rejectWithValue(err.message)
    }
  }
)

export const editMinifig = createAsyncThunk<MinifigsList, Minifig, { state: RootState }>(
  'minifigs/editMinifig',
  async (minifig, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    const { list } = state.minifigs
    if (!Array.isArray(list)) return rejectWithValue('No minifigs list in the store')

    const updatedMinifigsList = list.map((existingMinifig) =>
      existingMinifig.id === minifig.id ? minifig : existingMinifig
    )

    if (!token) return updatedMinifigsList

    try {
      return await restUpdateMinifigsList(updatedMinifigsList, token)
    } catch (err: any) {
      console.error('Unable to edit the minifig', err)
      return rejectWithValue(err.message)
    }
  }
)

export const addMinifig = createAsyncThunk<MinifigsList, Minifig, { state: RootState }>(
  'minifigs/addMinifig',
  async (minifig, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    const { list } = state.minifigs
    if (!Array.isArray(list)) return rejectWithValue('No minifigs list in the store')

    const updatedMinifigsList = list.concat(minifig).sort((a, b) => (a.id > b.id ? 1 : -1))
    if (!token) return updatedMinifigsList

    try {
      return await restUpdateMinifigsList(updatedMinifigsList, token)
    } catch (err: any) {
      console.error('Unable to add the minifig', err)
      return rejectWithValue(err.message)
    }
  }
)

export const deleteMinifig = createAsyncThunk<MinifigsList, string, { state: RootState }>(
  'minifigs/deleteMinifig',
  async (minifigId, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    const { list } = state.minifigs

    const indexOfMinifig = findIndexById(list, minifigId)
    if (indexOfMinifig === undefined || indexOfMinifig === -1 || !list)
      return rejectWithValue('No minifig with that id')

    const updatedMinifigsList = list.filter(({ id }) => id !== minifigId)
    if (!token) return updatedMinifigsList

    try {
      return await restUpdateMinifigsList(updatedMinifigsList, token)
    } catch (err: any) {
      console.error('Unable to delete minifig', err)
      return rejectWithValue(err.message)
    }
  }
)

const isAPendingAction = isPending(
  fetchMinifigs,
  toggleMinifigOwned,
  editMinifig,
  addMinifig,
  deleteMinifig
)
const isAFulfilledAction = isFulfilled(
  fetchMinifigs,
  toggleMinifigOwned,
  editMinifig,
  addMinifig,
  deleteMinifig
)
const isARejectedWithValueAction = isRejectedWithValue(
  fetchMinifigs,
  toggleMinifigOwned,
  editMinifig,
  addMinifig,
  deleteMinifig
)

export const minifigsSlice = createSlice({
  name: 'minifigs',
  initialState,
  reducers: {
    setMinifigsFilters: (state, action: PayloadAction<Partial<MinifigsFilters>>) => {
      const updatedFilter = { ...state.filters, ...action.payload }
      const filteredList = getFilteredMinifigsList(state.list, updatedFilter)
      state.filters = updatedFilter
      state.pagination.activePage = 0
      state.pagination.total = filteredList?.length || 0
    },
    resetMinifigsFilters: (state) => {
      state.filters = { show: 'all', tag: null, characName: null }
      state.pagination.total = state.list?.length || 0
      state.pagination.activePage = 0
    },
    setMinifigsPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleMinifigOwned.fulfilled, (state, { payload: minifigId }) => {
      const index = state.list?.findIndex(({ id }) => id === minifigId)
      if (index !== -1 && state.list && index !== undefined)
        state.list[index].possessed = !state.list[index].possessed
    })
    builder.addMatcher(
      isFulfilled(addMinifig, fetchMinifigs, deleteMinifig, editMinifig),
      (state, { payload: list }) => {
        const { tags, characNames } = getTagsAndCharacNames(list)
        state.list = list
        state.tags = tags
        state.characNames = characNames
        const updatedFilters = {
          ...state.filters,
          characNames: characNames
            .map(({ label }) => label)
            .includes(state.filters.characName || '')
            ? state.filters.characName
            : null,
          tag: tags.map(({ label }) => label).includes(state.filters.tag || '')
            ? state.filters.tag
            : null,
        }
        state.filters = updatedFilters

        const filteredList = getFilteredMinifigsList(list, updatedFilters)

        state.pagination.activePage = 0
        state.pagination.total = filteredList?.length || 0
      }
    )
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
export const { setMinifigsFilters, resetMinifigsFilters, setMinifigsPagination } =
  minifigsSlice.actions

export default minifigsSlice.reducer
