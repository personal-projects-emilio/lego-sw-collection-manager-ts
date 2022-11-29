import { getFilteredMinifigsList } from 'utils'
import { RootState } from '../index'

export const selectMinifigsList = (state: RootState) => state.minifigs.list
export const selectTagsAndCharacNames = (state: RootState) => ({
  tags: state.minifigs.tags,
  characNames: state.minifigs.characNames,
})
export const selectMinifigsFilters = (state: RootState) => state.minifigs.filters

export const selectMinifigsPagination = (state: RootState) => state.minifigs.pagination

export const selectMinifigsAreLoading = (state: RootState) => state.minifigs.isLoading

export const selectPaginatedMinifigsList = (state: RootState) => {
  const { nbPerPage, activePage } = state.minifigs.pagination
  const filteredList = getFilteredMinifigsList(state.minifigs.list, state.minifigs.filters)
  const begin = activePage * nbPerPage
  const end = begin + nbPerPage
  const paginatedList = filteredList?.slice(begin, end)
  return paginatedList
}
