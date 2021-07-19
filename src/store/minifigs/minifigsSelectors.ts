import { RootState } from "../index"

export const selectMinifigsList = (state: RootState) => state.minifigs.list;
export const selectTagsAndCharacNames = (state: RootState) => ({
  tags: state.minifigs.tags,
  characNames: state.minifigs.characNames
})
export const selectMinifigsFilters = (state: RootState) => state.minifigs.filters;

export const selectFilteredMinifigsList = (state: RootState) => state.minifigs.list?.filter(minifig => {
  const { show, characName, tag } = state.minifigs.filters;
  const { possessed, tags, characterName } = minifig;
  const showFiltered = show === "all" ||
    (show === "owned" && possessed) ||
    (show === "missing" && !possessed);
  const hasFilterTag = tag ? tags?.includes(tag) : true;
  const hasFilterCharacName = characName ? characName === characterName : true;
  return showFiltered && hasFilterCharacName && hasFilterTag
})