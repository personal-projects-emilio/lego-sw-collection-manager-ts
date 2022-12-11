import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'store'
import { LabelAndAmount, Pagination } from 'types/misce'
import { Set, SetsFilters, SetsList } from 'types/sets'
import { findIndexById } from 'utils/array'
import { getFilteredSetsList, getTagsAndSubthemes, restUpdateSetsList } from 'utils/sets'

interface SetsState {
  list: null | SetsList
  tags: null | LabelAndAmount[]
  subthemes: null | LabelAndAmount[]
  filters: SetsFilters
  pagination: Pagination
  isLoading: boolean
  error: any
}

const initialState: SetsState = {
  list: null,
  tags: null,
  subthemes: null,
  isLoading: false,
  error: null,
  filters: {
    subtheme: null,
    tag: null,
    search: null,
    noLocation: false,
  },
  pagination: {
    activePage: 0,
    total: 0,
    nbPerPage: 25,
  },
}

export const fetchSets = createAsyncThunk<SetsList>(
  'sets/fetchSets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('sets.json').json<SetsList>()
      return response
    } catch (err: any) {
      console.error('Unable to fetch sets', err)
      return rejectWithValue(err.message)
    }
  }
)

export const editSet = createAsyncThunk<
  SetsList,
  { set: Set; previousId: Set['id'] },
  { state: RootState }
>('sets/editSet', async ({ set, previousId }, { getState, rejectWithValue }) => {
  const state = getState()
  const { token } = state.auth
  const { list } = state.sets
  if (!Array.isArray(list)) return rejectWithValue('No minifigs list in the store')
  const id = previousId ?? set.id
  const updatedSetsList = list.map((existingSet) => (existingSet.id === id ? set : existingSet))

  if (!token) return updatedSetsList

  try {
    return await restUpdateSetsList(updatedSetsList, token)
  } catch (err: any) {
    console.error('Unable to edit the set', err)
    return rejectWithValue(err.message)
  }
})

export const addSet = createAsyncThunk<SetsList, Set, { state: RootState }>(
  'sets/addSet',
  async (set, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    const { list } = state.sets
    if (!Array.isArray(list)) return rejectWithValue('No sets list in the store')

    const updatedSetsList = list.concat(set).sort((a, b) => (a.id > b.id ? 1 : -1))
    if (!token) return updatedSetsList

    try {
      return await restUpdateSetsList(updatedSetsList, token)
    } catch (err: any) {
      console.error('Unable to add the set', err)
      return rejectWithValue(err.message)
    }
  }
)

export const deleteSet = createAsyncThunk<SetsList, string, { state: RootState }>(
  'sets/deleteSet',
  async (setId, { getState, rejectWithValue }) => {
    const state = getState()
    const { token } = state.auth
    const { list } = state.sets

    const indexOfSet = findIndexById(list, setId)
    if (indexOfSet === undefined || indexOfSet === -1 || !list)
      return rejectWithValue('No minifig with that id')

    const updatedSetsList = list.filter(({ id }) => id !== setId)
    if (!token) return updatedSetsList

    try {
      return await restUpdateSetsList(updatedSetsList, token)
    } catch (err: any) {
      console.error('Unable to delete minifig', err)
      return rejectWithValue(err.message)
    }
  }
)

const isAPendingAction = isPending(fetchSets, editSet, addSet, deleteSet)
const isAFulfilledAction = isFulfilled(fetchSets, editSet, addSet, deleteSet)
const isARejectedWithValueAction = isRejectedWithValue(fetchSets, editSet, addSet, deleteSet)

export const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    setSetsFilters: (state, action: PayloadAction<Partial<SetsFilters>>) => {
      const updatedFilter = { ...state.filters, ...action.payload }
      const filteredList = getFilteredSetsList(state.list, updatedFilter)
      state.filters = updatedFilter
      state.pagination.activePage = 0
      state.pagination.total = filteredList?.length || 0
    },
    resetSetsFilters: (state) => {
      state.filters = initialState.filters
      state.pagination.total = state.list?.length || 0
      state.pagination.activePage = 0
    },
    setSetsPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(fetchSets, editSet, addSet, deleteSet),
      (state, { payload: list }) => {
        const { tags, subthemes } = getTagsAndSubthemes(list)
        state.list = list
        state.tags = tags
        state.subthemes = subthemes
        const updatedFilters = {
          ...state.filters,
          subtheme: subthemes.map(({ label }) => label).includes(state.filters.subtheme || '')
            ? state.filters.subtheme
            : null,
          tag: tags.map(({ label }) => label).includes(state.filters.tag || '')
            ? state.filters.tag
            : null,
        }
        const filteredList = getFilteredSetsList(list, updatedFilters)
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
export const { setSetsPagination, setSetsFilters, resetSetsFilters } = setsSlice.actions

export default setsSlice.reducer
