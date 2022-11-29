import api from 'api'
import { LabelAndAmount } from 'types/misce'
import { SetsList, SetsFilters } from 'types/sets'

export const restUpdateSetsList = async (updatedSetsList: SetsList, token: string) =>
  await api
    .put(`sets.json?auth=${token}`, {
      json: updatedSetsList,
    })
    .json<SetsList>()

/**
 * Return the filtered list of sets
 * @param  {SetsList|null} list
 * @param  {SetsFilters} filters
 */
export const getFilteredSetsList = (list: SetsList | null, filters: SetsFilters) =>
  list?.filter((set) => {
    const { subtheme: filterSubtheme, tag, search, noLocation } = filters
    const { subtheme, tags, name, id, location, note } = set
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterSubtheme = filterSubtheme ? subtheme === filterSubtheme : true
    const searchString = `${name} ${id} ${location} ${note}`.trim().toLowerCase()
    const isSearch = search ? searchString.includes(search.trim().toLowerCase()) : true
    const gotNoLocation = noLocation ? !Boolean(location) : true
    return hasFilterSubtheme && hasFilterTag && isSearch && gotNoLocation
  })

/**
 * Return the tags and subthemes alphabetically sorted lists from a SetsList
 * @param  {SetsList} setsList
 */
export const getTagsAndSubthemes = (setsList: SetsList) => {
  const tagsAndSubthemesLists = setsList.reduce<Record<'tags' | 'subthemes', LabelAndAmount[]>>(
    (accumulator, currentSet) => {
      const { subtheme, tags } = currentSet

      const subthemeIndex = accumulator.subthemes.findIndex((el) => el.label === subtheme)
      // If it is a new character name we had it to the accumulator
      if (subthemeIndex === -1) {
        accumulator.subthemes.push({ label: subtheme, amount: 1 })
      } else {
        // Or else we increment the amount of the existing one
        accumulator.subthemes[subthemeIndex].amount++
      }

      if (tags?.length) {
        tags.forEach((tag) => {
          const tagIndex = accumulator.tags.findIndex((el) => el.label === tag)
          // If it is a new tag we had it to the accumulator
          if (tagIndex === -1) {
            accumulator.tags.push({ label: tag, amount: 1 })
          } else {
            // Or else we increment the amount of the existing one
            accumulator.tags[tagIndex].amount++
          }
        })
      }

      return accumulator
    },
    { tags: [], subthemes: [] }
  )
  tagsAndSubthemesLists.tags.sort((a, b) => (a.label > b.label ? 1 : -1))
  tagsAndSubthemesLists.subthemes.sort((a, b) => (a.label > b.label ? 1 : -1))
  return tagsAndSubthemesLists
}

/**
 * Return the prices statistics of the sets list
 * @param  {SetsList} setsList
 */
export const getSetsPricesStatistics = (setsList: SetsList) => {
  const partialSetsPricesStatistics = setsList.reduce<
    Record<'totalBought' | 'totalStoreValue' | 'totalMarketValue', number>
  >(
    (accumulator, currentSet) => {
      const { bought, marketValue, storeValueFR } = currentSet.prices
      if (bought !== 'Gift') {
        accumulator.totalBought = accumulator.totalBought + parseInt(bought as any)
      }
      accumulator.totalMarketValue = accumulator.totalMarketValue + parseInt(marketValue as any)
      if (storeValueFR && storeValueFR !== 'polybag' && storeValueFR !== 'Gift') {
        accumulator.totalStoreValue = accumulator.totalStoreValue + parseInt(storeValueFR as any)
      }

      return accumulator
    },
    { totalBought: 0, totalStoreValue: 0, totalMarketValue: 0 }
  )
  return {
    ...partialSetsPricesStatistics,
    percentage: Math.trunc(
      (partialSetsPricesStatistics.totalMarketValue / partialSetsPricesStatistics.totalBought) *
        100 -
        100
    ),
  }
}
