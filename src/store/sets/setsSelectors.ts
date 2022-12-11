import { getFilteredSetsList } from 'utils/sets'
import { RootState } from '../index'

export const selectSetsList = (state: RootState) => state.sets.list
export const selectTagsAndSubhtemes = (state: RootState) => ({
  tags: state.sets.tags,
  subthemes: state.sets.subthemes,
})
export const selectSetsFilters = (state: RootState) => state.sets.filters

export const selectSetsPagination = (state: RootState) => state.sets.pagination

export const selectSetsAreLoading = (state: RootState) => state.sets.isLoading

export const selectPaginatedSetsList = (state: RootState) => {
  const { nbPerPage, activePage } = state.sets.pagination
  const filteredList = getFilteredSetsList(state.sets.list, state.sets.filters)
  const begin = activePage * nbPerPage
  const end = begin + nbPerPage
  const paginatedList = filteredList?.slice(begin, end)
  return paginatedList
}
