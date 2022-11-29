import api from 'api'
import { MinifigsFilters, MinifigsList, TagOrCharacNameList } from 'interfaces/minifigs'

/**
 * Return the statistics from the MinifigsList (totalNumber, numberOwned and percentageOwned)
 * @param  {MinifigsList} minifigsList
 */
export const getStatistics = (minifigsList: MinifigsList) => {
  const totalNumber = minifigsList.length
  const numberOwned = minifigsList.filter((minifig) => minifig.possessed).length
  const percentageOwned = Math.round((numberOwned / totalNumber) * 10000) / 100
  return { totalNumber, numberOwned, percentageOwned }
}
/**
 * Return the tags and character names alphabetically sorted lists from a MinifigsList
 * @param  {MinifigsList} minifigsList
 */
export const getTagsAndCharacNames = (minifigsList: MinifigsList) => {
  const tagsAndCharacNamesLists = minifigsList.reduce<
    Record<'tags' | 'characNames', TagOrCharacNameList>
  >(
    (accumulator, currentMinifig) => {
      const { characterName, tags } = currentMinifig

      const characNameIndex = accumulator.characNames.findIndex((el) => el.name === characterName)
      // If it is a new character name we had it to the accumulator
      if (characNameIndex === -1) {
        accumulator.characNames.push({ name: characterName, amount: 1 })
      } else {
        // Or else we increment the amount of the existing one
        accumulator.characNames[characNameIndex].amount++
      }

      if (tags && tags.length) {
        tags.forEach((tag) => {
          const tagIndex = accumulator.tags.findIndex((el) => el.name === tag)
          // If it is a new tag we had it to the accumulator
          if (tagIndex === -1) {
            accumulator.tags.push({ name: tag, amount: 1 })
          } else {
            // Or else we increment the amount of the existing one
            accumulator.tags[tagIndex].amount++
          }
        })
      }

      return accumulator
    },
    { tags: [], characNames: [] }
  )
  tagsAndCharacNamesLists.tags.sort((a, b) => (a.name > b.name ? 1 : -1))
  tagsAndCharacNamesLists.characNames.sort((a, b) => (a.name > b.name ? 1 : -1))
  return tagsAndCharacNamesLists
}
/**
 * Return the filtered list of minifigs
 * @param  {MinifigsList|null} list
 * @param  {MinifigsFilters} filters
 */
export const getFilteredMinifigsList = (list: MinifigsList | null, filters: MinifigsFilters) =>
  list?.filter((minifig) => {
    const { show, characName, tag } = filters
    const { possessed, tags, characterName } = minifig
    const showFiltered =
      show === 'all' || (show === 'owned' && possessed) || (show === 'missing' && !possessed)
    const hasFilterTag = tag ? tags?.includes(tag) : true
    const hasFilterCharacName = characName ? characName === characterName : true
    return showFiltered && hasFilterCharacName && hasFilterTag
  })

export const restUpdateMinifigsList = async (updatedMinifigsList: MinifigsList, token: string) =>
  await api
    .put(`minifigs.json?auth=${token}`, {
      json: updatedMinifigsList,
    })
    .json<MinifigsList>()
